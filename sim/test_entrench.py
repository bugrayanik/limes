"""C-058b Entrenchment rule tests. Plain runner (matches test_audit_*.py).
Run: python3 test_entrench.py
"""
import os, sys, traceback
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import engine, bots


def _game(**ov):
    b = bots.make_bot('HONEST')
    return engine.Game([b, b], seed=1, overrides=(ov or None))


# -- Task 1: constant + state ------------------------------------------------

def test_entrench_defaults_off_and_empty():
    g = _game()
    assert g.C['ENTRENCH_HOLD'] == 0, g.C.get('ENTRENCH_HOLD')
    assert g.entrench == {}


# -- Task 2: round-end growth ------------------------------------------------

def test_growth_caps_at_hold_p1_side():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 6                       # P1 advanced col0 to k=6 -> forward rows 4,5
    g.update_entrench()                   # round-end 1
    assert g.entrench[(0, 4)] == 1 and g.entrench[(0, 5)] == 1, g.entrench
    g.update_entrench()                   # round-end 2 -> entrenched
    assert g.entrench[(0, 4)] == 2 and g.entrench[(0, 5)] == 2, g.entrench
    g.update_entrench()                   # capped
    assert g.entrench[(0, 4)] == 2, g.entrench


def test_growth_p2_side_and_no_home_entrench():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 2                       # P2 advanced col0 to k=2 -> P2 forward rows 2,3
    g.update_entrench()
    assert g.entrench[(0, 2)] == 1 and g.entrench[(0, 3)] == 1, g.entrench
    assert (0, 1) not in g.entrench and (0, 0) not in g.entrench, g.entrench


def test_growth_disabled_when_off():
    g = _game()                           # ENTRENCH_HOLD=0
    g.stakes[0] = 6
    g.update_entrench()
    assert g.entrench == {}, g.entrench


def test_no_count_inheritance_on_flip():
    g = _game(ENTRENCH_HOLD=2)
    g.entrench[(0, 5)] = 2
    g.stakes[0] = 4                       # back to original line: no forward tiles
    g.update_entrench()
    assert (0, 5) not in g.entrench, g.entrench


# -- Task 3: reclaim friction ------------------------------------------------

def test_entrenched_tile_absorbs_one_reclaim():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 6
    g.entrench[(0, 5)] = 2
    g.column_claims = lambda c: (False, True) if c == 0 else (False, False)
    g.frontier()
    assert g.stakes[0] == 6, g.stakes[0]            # held: absorbed
    assert g.entrench[(0, 5)] == 0, g.entrench       # cracked
    assert g.rows_lost_round[0] == 0, g.rows_lost_round


def test_unentrenched_tile_steps_normally():
    g = _game(ENTRENCH_HOLD=2)
    g.stakes[0] = 6
    g.entrench[(0, 5)] = 1                            # below cap
    g.column_claims = lambda c: (False, True) if c == 0 else (False, False)
    g.frontier()
    assert g.stakes[0] == 5, g.stakes[0]
    assert g.rows_lost_round[0] == 1, g.rows_lost_round


def test_off_means_no_absorb():
    g = _game()                                      # ENTRENCH_HOLD=0
    g.stakes[0] = 6
    g.entrench[(0, 5)] = 9                            # stale value must be ignored
    g.column_claims = lambda c: (False, True) if c == 0 else (False, False)
    g.frontier()
    assert g.stakes[0] == 5, g.stakes[0]


# -- Task 4: round-cycle wiring ----------------------------------------------

def test_full_match_runs_with_entrench_on():
    from engine import play_match
    b0, b1 = bots.make_bot('SANDBAGGER'), bots.make_bot('HONEST')
    r1 = play_match([b0, b1], seed=7, overrides={'ENTRENCH_HOLD': 2})
    b0, b1 = bots.make_bot('SANDBAGGER'), bots.make_bot('HONEST')
    r2 = play_match([b0, b1], seed=7, overrides={'ENTRENCH_HOLD': 2})
    assert r1['winner'] == r2['winner'], (r1['winner'], r2['winner'])
    assert r1['rounds'] == r2['rounds'], (r1['rounds'], r2['rounds'])


def test_entrench_actually_forms_in_a_match():
    from engine import Game, GameOver
    b0, b1 = bots.make_bot('HONEST'), bots.make_bot('AGGRO')
    g = Game([b0, b1], seed=3, overrides={'ENTRENCH_HOLD': 2})
    for p in (0, 1):
        [b0, b1][p].reset(3, p)
    g.setup()
    seen_entrenched = False
    try:
        for _ in range(30):
            g.play_round()
            if any(v >= 2 for v in g.entrench.values()):
                seen_entrenched = True
    except GameOver:
        pass
    assert seen_entrenched


TESTS = [
    test_entrench_defaults_off_and_empty,
    test_growth_caps_at_hold_p1_side,
    test_growth_p2_side_and_no_home_entrench,
    test_growth_disabled_when_off,
    test_no_count_inheritance_on_flip,
    test_entrenched_tile_absorbs_one_reclaim,
    test_unentrenched_tile_steps_normally,
    test_off_means_no_absorb,
    test_full_match_runs_with_entrench_on,
    test_entrench_actually_forms_in_a_match,
]


def main():
    passed = failed = 0
    for t in TESTS:
        try:
            t()
            print(f"PASS  {t.__name__}")
            passed += 1
        except AssertionError as e:
            print(f"FAIL  {t.__name__}: {e}")
            failed += 1
        except Exception:
            print(f"ERROR {t.__name__}:")
            traceback.print_exc()
            failed += 1
    print(f"\n{passed} passed, {failed} failed")
    return failed


if __name__ == '__main__':
    sys.exit(0 if main() == 0 else 1)
