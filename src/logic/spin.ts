import type { Reward } from '../types';

export type SpinFailure = 'insufficient' | 'no-rewards' | 'invalid-cost';

export type SpinPrep =
  | { ok: true; index: number; remaining: number; reward: Reward }
  | { ok: false; reason: SpinFailure };

export function canAffordSpin(points: number, spinCost: number): boolean {
  return spinCost > 0 && points >= spinCost;
}

export function chooseRewardIndex(count: number, random: () => number = Math.random): number {
  if (count < 1) {
    throw new Error('chooseRewardIndex requires at least one reward');
  }
  const roll = random();
  const unit = Number.isFinite(roll) ? Math.min(Math.max(roll, 0), 0.999999) : 0;
  return Math.floor(unit * count);
}

/**
 * Absolute rotation (degrees, clockwise) that lands `index` under a 12-o'clock pointer.
 * Slices are laid out clockwise from the top. Extra full turns keep the spin feeling like a wheel.
 */
export function nextWheelRotation(
  currentRotation: number,
  index: number,
  count: number,
  extraTurns: number,
): number {
  if (count < 1) {
    throw new Error('nextWheelRotation requires at least one slice');
  }
  const slice = 360 / count;
  const targetMod = (360 - (index * slice + slice / 2) + 360) % 360;
  const currentMod = ((currentRotation % 360) + 360) % 360;
  let delta = targetMod - currentMod;
  if (delta <= 0) delta += 360;
  const turns = Math.max(0, Math.floor(extraTurns));
  return currentRotation + turns * 360 + delta;
}

export function prepareSpin(
  points: number,
  spinCost: number,
  rewards: Reward[],
  random: () => number = Math.random,
): SpinPrep {
  if (spinCost <= 0) return { ok: false, reason: 'invalid-cost' };
  if (rewards.length === 0) return { ok: false, reason: 'no-rewards' };
  if (points < spinCost) return { ok: false, reason: 'insufficient' };

  const index = chooseRewardIndex(rewards.length, random);
  const reward = rewards[index];
  if (!reward) return { ok: false, reason: 'no-rewards' };

  return {
    ok: true,
    index,
    remaining: points - spinCost,
    reward,
  };
}

export function extraTurnsFromRandom(random: () => number = Math.random): number {
  return 5 + Math.floor(random() * 3);
}
