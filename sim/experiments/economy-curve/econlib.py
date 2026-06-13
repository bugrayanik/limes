"""Economy-curve instrumentation harness for LIMES v3 baseline sim.

Drives engine.Game directly (mirrors engine.play_match) but records per-round
per-player economy telemetry:
  harvest income (supply/crop), upkeep paid, supply-strain exposure & paid,
  exhausted counts, army on board / in reserve, field counts by type,
  farmstead count & bonus income, annexed fields held, recruits by archetype,
  trample (raid/annex) picks, Last Stand boon picks, resources after muster.

Also provides Policy variants (cfg tweaks, scatter field placement, no-crop
builds, forced Last Stand boons) for counterfactual batteries.

All runs are deterministic: seed0 + i per match, seats alternate (even i:
bot_a is P1) exactly like run.py.
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__),
                                                '..', '..')))

import engine
import bots
from engine import neighbors


# ---------------------------------------------------------------------------
# Policy variants
# ---------------------------------------------------------------------------

class VariantPolicy(bots.Policy):
    """HONEST-based policy with optional behavioural overrides."""

    def __init__(self, base='HONEST', cfg_updates=None, scatter_fields=False,
                 no_crop_fields=False, force_boon=None, label=None):
        super().__init__(base)
        if cfg_updates:
            self.cfg.update(cfg_updates)
        self._scatter = scatter_fields
        self._no_crop = no_crop_fields
        self._force_boon = force_boon
        self.label = label or base
        self.rec = None                       # attached per match by harness

    # --- recording taps ----------------------------------------------------

    def trample_choice(self, g, me, pos, field):
        ch = super().trample_choice(g, me, pos, field)
        if self.rec is not None:
            self.rec['trample'].append(
                {'round': g.round, 'player': me, 'choice': ch,
                 'ftype': field['type']})
        return ch

    def last_stand(self, g, me):
        boon = self._force_boon if self._force_boon is not None \
            else super().last_stand(g, me)
        if self.rec is not None:
            self.rec['boons'].append(
                {'round': g.round, 'player': me, 'boon': boon})
        return boon

    # --- counterfactual behaviours ------------------------------------------

    def _field_spot(self, g, me, ftype, exclude=frozenset()):
        if not self._scatter:
            return super()._field_spot(g, me, ftype, exclude)
        # adjacency-blind placement: same legality + safety, no clustering,
        # actively avoids same-type adjacency so farmsteads never form
        best, bests = None, None
        for c in range(8):
            for r in range(8):
                pos = (c, r)
                if g.territory_of(pos) != me or pos in g.fields \
                        or pos in g.wagon_at or pos in exclude:
                    continue
                adj_same = sum(1 for nb in neighbors(pos)
                               if nb in g.fields
                               and g.fields[nb]['type'] == ftype
                               and g.fields[nb]['owner'] == me
                               and g.fields[nb]['annexed'] is None)
                safe = 2 if r in g.heartland_rows(me) else 0
                s = -2 * adj_same + safe + self.tb('field', pos)
                if bests is None or s > bests:
                    best, bests = pos, s
        return best

    def build(self, g, me):
        if not self._no_crop:
            return super().build(g, me)
        # copy of Policy.build with the crop branch disabled (supply only)
        cfg = self.cfg
        C = g.C
        acts = []
        supply = g.res[me]['supply']
        nfields = sum(1 for f in g.fields.values()
                      if f['owner'] == me and f['annexed'] is None)
        if cfg['palisades'] and supply >= C['PALISADE_COST'] + C['FIELD_COST']:
            danger = self.danger_cols(g, me)
            cand = sorted((c for c in range(8)
                           if c not in g.palisades and danger[c] >= 2),
                          key=lambda c: (-danger[c], self.tb('pal', c)))
            if cand:
                acts.append(('palisade', cand[0]))
                supply -= C['PALISADE_COST']
        planned = []
        while len(acts) < C['BUILD_ACTIONS'] and supply >= C['FIELD_COST'] \
                and nfields < cfg['fields_target']:
            ftype = 'supply'
            pos = self._field_spot(g, me, ftype, {p for (p, _) in planned})
            if pos is None:
                break
            acts.append(('field', pos, ftype))
            planned.append((pos, ftype))
            supply -= C['FIELD_COST']
            nfields += 1
        if cfg['palisades'] and len(acts) < C['BUILD_ACTIONS'] \
                and supply >= C['PALISADE_COST'] + 4:
            danger = self.danger_cols(g, me)
            cand = sorted((c for c in range(8)
                           if c not in g.palisades and danger[c] >= 1),
                          key=lambda c: (-danger[c], self.tb('pal2', c)))
            if cand:
                acts.append(('palisade', cand[1] if len(cand) > 1 else cand[0]))
        return acts


def make_policy(spec):
    """spec: a POLICY_NAMES string, or a dict for VariantPolicy kwargs."""
    if isinstance(spec, str):
        return bots.make_bot(spec)
    return VariantPolicy(**spec)


# ---------------------------------------------------------------------------
# Instrumented game
# ---------------------------------------------------------------------------

def farmstead_stats(g, p):
    """(n_farmsteads, supply_bonus, crop_bonus_pre_penalty) for player p."""
    C = g.C
    own = {pos: f['type'] for pos, f in g.fields.items()
           if f['owner'] == p and f['annexed'] is None
           and g.territory_of(pos) == p}
    seen = set()
    n = sup = crop = 0
    for pos, t in own.items():
        if pos in seen:
            continue
        comp = [pos]
        seen.add(pos)
        stack = [pos]
        while stack:
            cur = stack.pop()
            for nb in neighbors(cur):
                if nb not in seen and own.get(nb) == t:
                    seen.add(nb)
                    comp.append(nb)
                    stack.append(nb)
        if len(comp) >= C['FARMSTEAD_SIZE']:
            n += 1
            if t == 'crop':
                crop += C['FARMSTEAD_BONUS']
            else:
                sup += C['FARMSTEAD_BONUS']
    return n, sup, crop


class InstrumentedGame(engine.Game):

    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)
        self.tel = []                         # per (round, player) muster rows
        self.round_snaps = []                 # per-round post-round snapshots

    def muster_player(self, p):
        C = self.C
        crop_pre = self.res[p]['crop']
        sup_pre = self.res[p]['supply']
        h_sup, h_crop = self.compute_harvest(p)
        beyond_pre = {u.uid for u in self.on_board(p) if self.beyond_own(u)}
        rush_cands = {u.uid for u in self.reserve(p)
                      if u.wounded_round == self.round - 1}
        super().muster_player(p)
        onb = self.on_board(p)
        exhausted = [u for u in onb if u.exhausted]
        fed_beyond = sum(1 for u in onb
                         if u.uid in beyond_pre and not u.exhausted)
        rushed = sum(1 for uid in rush_cands
                     if self.units[uid].pos is not None
                     and self.units[uid].wounded_round is None)
        recruits = {}
        for u in onb:
            if u.face_down:
                recruits[u.arch] = recruits.get(u.arch, 0) + 1
        upkeep_paid = (crop_pre + h_crop - self.res[p]['crop']
                       - rushed * C['RUSH_RETURN_COST'])
        nf_sup = nf_crop = annexed_held = 0
        for pos, f in self.fields.items():
            ctrl = f['annexed'] if f['annexed'] is not None else f['owner']
            if ctrl != p or self.territory_of(pos) != p:
                continue
            if f['annexed'] == p:
                annexed_held += 1
            elif f['type'] == 'crop':
                nf_crop += 1
            else:
                nf_sup += 1
        nfarm, fb_sup, fb_crop = farmstead_stats(self, p)
        self.tel.append({
            'round': self.round, 'player': p,
            'harvest_supply': h_sup, 'harvest_crop': h_crop,
            'farmsteads': nfarm,
            'farmstead_supply_bonus': fb_sup,
            'farmstead_crop_bonus': fb_crop,
            'upkeep_paid': upkeep_paid,
            'strain_exposed': len(beyond_pre),
            'strain_paid': fed_beyond,        # fed units beyond own limes
            'exhausted': len(exhausted),
            'army_onboard': len(onb),
            'reserve': len(self.reserve(p)),
            'recruits': recruits,
            'rushed': rushed,
            'fields_supply': nf_sup, 'fields_crop': nf_crop,
            'fields_annexed_held': annexed_held,
            'supply_pre': sup_pre, 'crop_pre': crop_pre,
            'supply_post': self.res[p]['supply'],
            'crop_post': self.res[p]['crop'],
            'tribute_post': self.res[p]['tribute'],
        })

    def play_round(self):
        rnd = self.round
        try:
            super().play_round()
        finally:
            self.round_snaps.append({
                'round': rnd,
                'army': [len(self.on_board(0)), len(self.on_board(1))],
                'stakes': list(self.stakes),
                'wagons': [self.wagons_alive(0), self.wagons_alive(1)],
            })


def play_instrumented(bot_p1, bot_p2, seed, overrides=None, terrain_seed=None):
    rec = {'trample': [], 'boons': []}
    for b in (bot_p1, bot_p2):
        if hasattr(b, 'rec'):
            b.rec = rec
    g = InstrumentedGame([bot_p1, bot_p2], seed, overrides, terrain_seed)
    for p in (0, 1):
        bot_p1.reset(seed, 0) if p == 0 else bot_p2.reset(seed, 1)
    g.setup()
    winner = wtype = None
    try:
        while True:
            g.play_round()
    except engine.GameOver as e:
        winner, wtype = e.winner, e.wtype
    copies = dict(g.copies)
    arch_counts = [{}, {}]
    for u in g.units.values():
        if u.arch == 'hero':
            continue
        d = arch_counts[u.owner]
        d[u.arch] = d.get(u.arch, 0) + 1
    return {
        'seed': seed, 'winner': winner, 'win_type': wtype, 'rounds': g.round,
        'tel': g.tel, 'snaps': g.round_snaps, 'events': rec,
        'copies_bought': copies, 'arch_counts': arch_counts,
        'final_res': [dict(g.res[0]), dict(g.res[1])],
        'final_wagons': [g.wagons_alive(0), g.wagons_alive(1)],
    }


def run_battery(spec_a, spec_b, n, seed0=1, overrides=None,
                terrain_seed0=None, keep_tel=True):
    """Alternating-seat battery like run.py. Returns list of match records,
    each annotated with bot_winner 'A'/'B' and a_seat."""
    out = []
    for i in range(n):
        seed = seed0 + i
        a_is_p1 = (i % 2 == 0)
        pa, pb = make_policy(spec_a), make_policy(spec_b)
        p1, p2 = (pa, pb) if a_is_p1 else (pb, pa)
        ts = terrain_seed0 + i if terrain_seed0 is not None else None
        r = play_instrumented(p1, p2, seed, overrides, ts)
        r['a_seat'] = 'P1' if a_is_p1 else 'P2'
        r['bot_winner'] = 'A' if (r['winner'] == 0) == a_is_p1 else 'B'
        if not keep_tel:
            r.pop('tel'), r.pop('snaps')
        out.append(r)
    return out


def winrate(results):
    n = len(results)
    w = sum(1 for r in results if r['bot_winner'] == 'A')
    return w, n, w / n if n else None


def median(xs):
    xs = sorted(xs)
    n = len(xs)
    if not n:
        return None
    return xs[n // 2] if n % 2 else (xs[n // 2 - 1] + xs[n // 2]) / 2
