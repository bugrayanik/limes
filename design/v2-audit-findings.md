# LIMES v2 — Quantitative Balance Audit Findings (June 10, 2026)

Simulation-verified findings from the v2 design audit (damage model `dmg = round(10 × 2^((effAtk−effDef)/12))`, full economy + pacing sims). These are the problems any v3 design MUST solve. Source: multi-agent audit, ~431k tokens of simulation work.

## Critical spec gaps (game cannot be implemented as written)
1. **Starting Village HP is never specified** — the single most load-bearing pacing number. Sims: one-sided games end r9 (50 HP) to r17 (150 HP); traded games r15–r24. Recommended 60–80 HP + post-r15 sudden death.
2. **Scouting rule unspecified** — can you see the opponent's board during planning? In a deterministic game this single rule decides everything (full visibility → counter-adjust standoff; zero → blind RPS).
3. **Starvation contradiction** — formula (line 98) subtracts −6 from effDef only; text says "−6 CS to all units" (both Atk and Def = 2.0× throughput swing vs 1.41×). Three locations disagree.
4. **Ranged-defender retaliation ambiguity** — "ranged attacks take no retaliation" doesn't say whether a ranged unit retaliates when meleed. The answer flips Siege-vs-Cavalry entirely.
5. **Tie-breaks underspecified** — mirrored boards decided by leftmost-then-frontmost convention (a coin flip); exact-HP ties at turn cap have no rule.

## Balance failures (sim-proven)
6. **Counter-triangle fails at its key edge**: Spear (+8 anti-cav) LOSES 1v1 to Cavalry unfortified — cavalry initiative first-strike wins with 9 HP left. Needs +12 to flip. The designated counter-pick doesn't work.
7. **First-actor advantage is game-deciding**: 5v5 mirrors — side acting first wins 3–0 with 131 HP remaining (cav), 117 (archer); ABBA-alternating initiative flips several outcomes outright. The act-order tiebreak is hidden RNG in a "no RNG" game.
8. **Unkillable walls**: defensive stacking reaches effDef 64 (Spartan Pikeman: base 22 + fortify 4 + hills 4 + support 8 + Phalanx 8 + Bulwark 4 + trait 3 + banner 3 + Smithy 6 + artifact 2). Best possible attack stack (49) deals 4 dmg/hit → 18 turns to kill vs 15-turn cap. Turn cap's "most HP wins" + village damage rule double-reward stalling.
9. **Alpha-strike one-shots, risk-free**: dead units never retaliate. Bare Cataphract+counter+Smithy (38 atk) one-shots a 45 HP archer (57 dmg). Full Hun dive stack = 269 dmg, 598% overkill, zero counterplay.
10. **Modifier oversizing**: ±30 CS realistic stack = 32× damage ratio (Civ6: 11×). One tile of repositioning swings damage 60%+. D=12 denominator is fine; the flat bonuses are too big.
11. **Deterministic snowball, zero catch-up**: +2 CS (one Smithy level) converts an even 6v6 into a 2–0 wipe. A transient +1 CS advantage at round 2 won 100% of clashes r2–r15 in sim. Loser pays a "rebuy tax" (~40% of income rebuying army) while winner banks Smithy. Teuton (+2 res/win) and Viking (+1 res/kill) passives further pay the winner. No loser-streak bonus, no salvage, nothing.
12. **Teuton unbounded scaler**: +1 Atk/round banner has no cap → ×2.38 army-wide damage by r15.
13. **Smithy is mandatory**: +6 global CS (×1.41 damage for a whole unit class) for Iron only, no upkeep — most efficient purchase in the game; collapses build diversity to "who maxes Smithy first".
14. **Egyptian economy passive is broken**: +3 crop +1/field ≈ +7/rd ≈ 105 free resources over 15 rounds (other passives: 5–10 total) with zero combat downside (unit stats identical across tribes). Banner-7 zero-upkeep removes the game's master limiter entirely.
15. **Starving-archer exploit**: starvation hits defense only; ranged units take no retaliation → deliberately starved archer armies fight at ZERO penalty while skipping all crop investment. Fed and starved archer builds converge to identical armies by r15.
16. **Crop upgrade trap**: new cropland +6/rd vs upgrade +2/rd — Lv2 upgrade strictly worse than a new field. Granary is a trap too (base hold cap 8 already exceeds max per-round recruiting need; protected promoted units are its only real value).
17. **Khan/Taunt knife-edge**: Khan's Steppe Rush (ZoC-bypass backline leap) wins in 5 turns vs unprepared boards; vs 4-Spearman Taunt the outcome is IDENTICAL with or without casting the ability (T10, 1 survivor). Hero power entirely binary on one enemy threshold.
18. **Hero durability vs cap**: at equal CS a hero takes 12 turns to kill; fortified+supported, 20 turns — beyond the 15-turn cap. Heroes are 2× harder to kill than units; Sebek's ability ≈ 216 damage-equivalent vs Khan's 108 (kits not power-budgeted).

## Strategic/experience failures
19. **The game is solvable**: only 6,062 possible comps (5–12 units from 5 archetypes), identical stats across 8 tribes, open recruitment (everyone can field the solved deck every round), deterministic resolution → community solver cracks a dominant net-deck within weeks. TFT gates with shop RNG; The Bazaar gates with hidden info; LIMES has neither.
20. **Dead spectacle**: zero variance, damage band 4–40, min 3 hits to kill anything, mirrors run to the 15-turn cap → 2–3 min of foregone-conclusion watching per round × 10–15 rounds ≈ half the match is dead time. No drama curve.
21. **Matches are decided by r5–6** then play out 5+ foregone rounds.

## What's worth keeping (audit-confirmed good)
- Four-limiter economy concept (afford / feed / hold / fit) — the *idea* is sound, numbers aren't.
- Village HP loss = round# + survivors (scales punishment to margin) — good shape.
- Deploy slot curve (caps exactly at r15) — well-tuned.
- Deterministic lockstep netcode model — cheap, cheat-resistant.
- Hero kits each having a designed built-in counter — right instinct, wrong magnitudes.
- 8 tribes × (passive + banner) identity layer kept OUT of base unit stats — patch-light by construction.
- Diagnosis quote: "chess's determinism without chess's depth; TFT's spectacle without variance-driven drama. Needs a hidden-information reveal to make deterministic resolution exciting rather than redundant."
