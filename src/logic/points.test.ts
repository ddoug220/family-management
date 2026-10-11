import { describe, expect, it } from 'vitest';
import type { Chore } from '../types';
import {
  ageAdjustmentFactor,
  calculatePointsForTaskCompletion,
  completeChore,
  complexityFactor,
  remainingToSpin,
  resetDailyChores,
  suggestedChorePoints,
  urgencyFactor,
} from './points';

const later = new Date('2024-02-20T12:00:00.000Z');
const now = new Date('2024-02-19T12:00:00.000Z');
const soon = new Date('2024-02-19T18:00:00.000Z');

function chore(overrides: Partial<Chore> = {}): Chore {
  return {
    id: 'chore-1',
    title: 'Make the bed',
    points: 12,
    complexity: 'Low',
    completed: false,
    ...overrides,
  };
}

describe('legacy point formula', () => {
  it('uses the 2024 complexity, urgency, and age multipliers', () => {
    expect(complexityFactor('Low')).toBe(1);
    expect(complexityFactor('Medium')).toBe(1.5);
    expect(complexityFactor('High')).toBe(2);
    expect(urgencyFactor(later, now)).toBe(1);
    expect(urgencyFactor(soon, now)).toBe(1.5);
    expect(ageAdjustmentFactor(10)).toBe(1.2);
    expect(ageAdjustmentFactor(15)).toBe(1);
    expect(ageAdjustmentFactor(35)).toBe(0.8);
  });

  it('returns whole tickets for a kid finishing an easy, non-urgent chore', () => {
    expect(calculatePointsForTaskCompletion('Low', later, 10, now)).toBe(12);
  });

  it('pays more for a hard chore that is due soon', () => {
    expect(calculatePointsForTaskCompletion('High', soon, 10, now)).toBe(36);
  });

  it('suggests parent defaults without the urgency bonus', () => {
    expect(suggestedChorePoints('Low', 10)).toBe(12);
    expect(suggestedChorePoints('Medium', 10)).toBe(18);
    expect(suggestedChorePoints('High', 10)).toBe(24);
  });
});

describe('completeChore', () => {
  it('awards the chore points once', () => {
    const result = completeChore([chore()], 'chore-1', 5);
    expect(result).toEqual({ ok: true, earned: 12, nextPoints: 17 });
  });

  it('does not pay again for an already finished chore', () => {
    expect(completeChore([chore({ completed: true })], 'chore-1', 5)).toEqual({
      ok: false,
      reason: 'already-done',
    });
  });

  it('rejects an unknown chore id', () => {
    expect(completeChore([chore()], 'missing', 5)).toEqual({ ok: false, reason: 'missing' });
  });
});

describe('resetDailyChores', () => {
  it('clears completion without changing point values', () => {
    const reset = resetDailyChores([
      chore({ completed: true }),
      chore({ id: 'chore-2', points: 24 }),
    ]);
    expect(reset.every((item) => item.completed === false)).toBe(true);
    expect(reset[0]?.points).toBe(12);
    expect(reset[1]?.points).toBe(24);
  });
});

describe('remainingToSpin', () => {
  it('returns tickets still needed, floored at zero', () => {
    expect(remainingToSpin(10, 25)).toBe(15);
    expect(remainingToSpin(25, 25)).toBe(0);
    expect(remainingToSpin(40, 25)).toBe(0);
  });
});
