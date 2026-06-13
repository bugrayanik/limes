// Phase 1 — static board renderer. Pure: Game -> HTML string (no interaction).
// Reads engine state and lays it out as an 8x8 grid in the locked styleguide
// skin. Row 7 (P1 heartland) renders at the top, row 0 (P0) at the bottom.
import type { Game, Unit } from './engine';
import { ROSTER } from './assets';

export const ARCH_LABEL: Record<string, string> = {
  spear: 'Spearman', sword: 'Swordsman', cav: 'Cavalry', archer: 'Archer', siege: 'Siege', hero: 'Hero',
};
export const TRIBE_COLOR: Record<string, string> = {
  roman: '#a32638', spartan: '#c4622d', hun: '#d9a418', gaul: '#3e7a3a',
  egyptian: '#2aa198', viking: '#2b4f81', persian: '#5b3a8e', teuton: '#6e7378',
};

export interface RenderOpts { p0tribe: string; p1tribe: string; }
const DEFAULTS: RenderOpts = { p0tribe: 'roman', p1tribe: 'viking' };

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function unitCell(g: Game, u: Unit, tribe: string): string {
  const img = ROSTER[`${tribe}_${u.arch}`] ?? '';
  const hpPct = Math.max(0, Math.round((u.hp / u.max_hp) * 100));
  const tier = u.tier2 ? '★★' : u.tier1 ? '★' : '';
  const flags = [
    u.exhausted ? '<span class="flag ex" title="Exhausted">∅</span>' : '',
    u.braced ? '<span class="flag br" title="Braced">⛨</span>' : '',
    u.face_down ? '<span class="flag fd" title="Face-down">?</span>' : '',
  ].join('');
  const art = img
    ? `<img class="billboard" src="${esc(img)}" alt="${esc(ARCH_LABEL[u.arch])}" loading="lazy">`
    : `<div class="billboard noimg">${esc(ARCH_LABEL[u.arch][0])}</div>`;
  return `<div class="unit owner${u.owner}" style="--c:${TRIBE_COLOR[tribe]}">
    ${art}
    <div class="hpbar"><i style="width:${hpPct}%"></i></div>
    <div class="ulabel">${esc(ARCH_LABEL[u.arch])}<span class="hp">${u.hp}/${u.max_hp}</span></div>
    ${tier ? `<span class="tier">${tier}</span>` : ''}
    ${flags ? `<div class="flags">${flags}</div>` : ''}
  </div>`;
}

function wagonCell(p: number, hp: number, maxHp: number, tribe: string): string {
  return `<div class="wagon owner${p}" style="--c:${TRIBE_COLOR[tribe]}" title="Supply Wagon">
    <div class="wgicon">▣</div><div class="wghp">${hp}/${maxHp}</div></div>`;
}

function fieldCell(f: any): string {
  const owner = f.annexed !== null ? f.annexed : f.owner;
  const sym = f.type === 'crop' ? '🌾' : '⛏';
  return `<div class="field f-owner${owner}${f.annexed !== null ? ' annexed' : ''}" title="${esc(f.type)} field">${sym}</div>`;
}

export function renderBoard(g: Game, opts: Partial<RenderOpts> = {}): string {
  const o = { ...DEFAULTS, ...opts };
  const tribeOf = (p: number) => (p === 0 ? o.p0tribe : o.p1tribe);

  // index live units / wagons / fields by tile
  const unitAt = new Map<string, Unit>();
  for (const u of g.units.values()) if (u.pos) unitAt.set(`${u.pos[0]},${u.pos[1]}`, u);
  const wagonAt = new Map<string, { p: number; hp: number }>();
  for (let p = 0; p < 2; p++) for (const w of g.wagons[p]) wagonAt.set(`${w.col},${w.row}`, { p, hp: w.hp });

  const cells: string[] = [];
  for (let r = 7; r >= 0; r--) {
    for (let c = 0; c < 8; c++) {
      const k = `${c},${r}`;
      const terr = r < g.stakes[c] ? 0 : 1;           // stake territory owner
      const stakeline = r === g.stakes[c] - 1;        // P0-frontmost row in this column
      const pal = g.palisades.get(c);
      const palHere = stakeline && pal !== undefined;
      const cls = ['cell', `terr${terr}`, stakeline ? 'stakeline' : '', palHere ? 'has-pal' : ''].filter(Boolean).join(' ');
      let inner = '';
      const u = unitAt.get(k), w = wagonAt.get(k), f = g.fields.get(k);
      let attrs = `data-pos="${k}"`;
      if (u) { inner = unitCell(g, u, tribeOf(u.owner)); attrs += ` data-uid="${u.uid}" data-owner="${u.owner}"`; }
      else if (w) inner = wagonCell(w.p, w.hp, g.C.WAGON_HP, tribeOf(w.p));
      else if (f) inner = fieldCell(f);
      const palEl = palHere ? `<span class="pal owner${pal}" style="--c:${TRIBE_COLOR[tribeOf(pal!)]}" title="Palisade"></span>` : '';
      cells.push(`<div class="${cls}" ${attrs}>${palEl}${inner}</div>`);
    }
  }

  const side = (p: number) => {
    const t = tribeOf(p), R = g.res[p];
    return `<div class="side owner${p}" style="--c:${TRIBE_COLOR[t]}">
      <div class="stitle">P${p + 1} · ${esc(t[0].toUpperCase() + t.slice(1))}${g.komi === p ? ' <span class="komi" title="Komi holder">⚖</span>' : ''}</div>
      <div class="stats">
        <span title="Supply">🛡 ${R.supply}</span><span title="Crop">🌾 ${R.crop}</span>
        <span title="Tribute">◆ ${R.tribute}</span><span title="Owned rows">▦ ${g.ownedRows(p)}</span>
        <span title="Wagons alive">▣ ${g.wagonsAlive(p)}/${g.wagons[p].length}</span>
      </div></div>`;
  };

  return `<div class="hud">
    <div class="round">Round ${g.round}</div>
    ${side(1)}${side(0)}
  </div>
  <div class="board-grid">${cells.join('')}</div>`;
}
