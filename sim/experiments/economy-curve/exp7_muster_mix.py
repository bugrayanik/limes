"""EXP7: muster pricing -- do the shared 6-copy cap and +1/copy surcharge
actually bind, producing mixed comps?

HONEST mirror (300 seeds) + HONEST vs AGGRO (300 seeds): distribution of
copies bought per archetype per match, how often the shared cap is hit,
and per-player comp spread.
"""

from collections import defaultdict

from econlib import run_battery


def report(label, res):
    cap_hits = defaultdict(int)
    tot = defaultdict(int)
    for r in res:
        for a, c in r['copies_bought'].items():
            tot[a] += c
            if c >= 6:
                cap_hits[a] += 1
    n = len(res)
    print('%s (n=%d)' % (label, n))
    print('  mean copies bought/match:',
          {a: round(tot[a] / n, 2) for a in tot if tot[a]})
    print('  matches hitting the 6-copy shared cap:', dict(cap_hits))


def main():
    report('HONEST vs HONEST',
           run_battery('HONEST', 'HONEST', 300, seed0=1, keep_tel=False))
    report('HONEST vs AGGRO',
           run_battery('HONEST', 'AGGRO', 300, seed0=1, keep_tel=False))
    report('AGGRO vs TURTLE',
           run_battery('AGGRO', 'TURTLE', 300, seed0=1, keep_tel=False))


if __name__ == '__main__':
    main()
