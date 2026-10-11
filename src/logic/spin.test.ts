import { describe, expect, it } from 'vitest';
import type { Reward } from '../types';
import {
  canAffordSpin,
  chooseRewardIndex,
  extraTurnsFromRandom,
  nextWheelRotation,
  prepareSpin,
} from './spin';

const rewards: Reward[] = [
  { id: 'a', title: 'Dessert' },
  { id: 'b', title: 'Movie' },
  { id: 'c', title: 'Later bedtime' },
  { id: 'd', title: 'Treat' },
];

describe('chooseRewardIndex', () => {
  it('maps a seeded roll onto a slice', () => {
    expect(chooseRewardIndex(4, () => 0)).toBe(0);
    expect(chooseRewardIndex(4, () => 0.249)).toBe(0);
    expect(chooseRewardIndex(4, () => 0.25)).toBe(1);
    expect(chooseRewardIndex(4, () => 0.999)).toBe(3);
  });

  it('throws when the wheel is empty', () => {
    expect(() => chooseRewardIndex(0, () => 0.5)).toThrow(/at least one reward/);
  });
});

describe('nextWheelRotation', () => {
  it('lands the first slice under the top pointer after extra turns', () => {
    expect(nextWheelRotation(0, 0, 4, 5)).toBe(5 * 360 + 315);
  });

  it('always spins forward from the current rotation', () => {
    const first = nextWheelRotation(0, 1, 4, 5);
    const second = nextWheelRotation(first, 1, 4, 5);
    expect(second).toBeGreaterThan(first);
    expect(second % 360).toBeCloseTo(first % 360);
  });
});

describe('prepareSpin', () => {
  it('spends tickets and returns the landed reward', () => {
    const result = prepareSpin(40, 25, rewards, () => 0.6);
    expect(result).toEqual({
      ok: true,
      index: 2,
      remaining: 15,
      reward: rewards[2],
    });
  });

  it('blocks a spin the kid cannot afford', () => {
    expect(prepareSpin(10, 25, rewards, () => 0.1)).toEqual({
      ok: false,
      reason: 'insufficient',
    });
    expect(canAffordSpin(10, 25)).toBe(false);
    expect(canAffordSpin(25, 25)).toBe(true);
  });

  it('blocks a spin with no prizes on the wheel', () => {
    expect(prepareSpin(50, 25, [], () => 0.1)).toEqual({ ok: false, reason: 'no-rewards' });
  });

  it('rejects a zero or negative spin cost', () => {
    expect(prepareSpin(50, 0, rewards, () => 0.1)).toEqual({ ok: false, reason: 'invalid-cost' });
  });
});

describe('extraTurnsFromRandom', () => {
  it('picks 5, 6, or 7 full turns', () => {
    expect(extraTurnsFromRandom(() => 0)).toBe(5);
    expect(extraTurnsFromRandom(() => 0.34)).toBe(6);
    expect(extraTurnsFromRandom(() => 0.99)).toBe(7);
  });
});
