import type { Chore, Complexity } from '../types';

const BASE_POINTS = 10;

/** Complexity multiplier from the 2024 family-management reward formula. */
export function complexityFactor(complexity: Complexity): number {
  switch (complexity) {
    case 'High':
      return 2;
    case 'Medium':
      return 1.5;
    default:
      return 1;
  }
}

/** Tasks due within 24 hours used to pay a 1.5x urgency bonus. */
export function urgencyFactor(dueDate: Date, now: Date = new Date()): number {
  const hoursToDeadline = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursToDeadline < 24 ? 1.5 : 1;
}

/** Kids under 12 earn a little more; adults a little less. */
export function ageAdjustmentFactor(age: number): number {
  if (age < 12) return 1.2;
  if (age <= 18) return 1;
  return 0.8;
}

/**
 * Original 2024 point formula, made pure (it used to mutate a User).
 * Tickets are whole numbers so kids never see fractions.
 */
export function calculatePointsForTaskCompletion(
  complexity: Complexity,
  dueDate: Date,
  age: number,
  now: Date = new Date(),
): number {
  const raw =
    BASE_POINTS *
    complexityFactor(complexity) *
    urgencyFactor(dueDate, now) *
    ageAdjustmentFactor(age);
  return Math.max(1, Math.round(raw));
}

export function suggestedChorePoints(complexity: Complexity, age = 10): number {
  const later = new Date(Date.now() + 48 * 60 * 60 * 1000);
  return calculatePointsForTaskCompletion(complexity, later, age);
}

export type CompleteChoreResult =
  | { ok: true; earned: number; nextPoints: number }
  | { ok: false; reason: 'already-done' | 'missing' };

export function completeChore(
  chores: Chore[],
  choreId: string,
  currentPoints: number,
): CompleteChoreResult {
  const chore = chores.find((item) => item.id === choreId);
  if (!chore) return { ok: false, reason: 'missing' };
  if (chore.completed) return { ok: false, reason: 'already-done' };
  return {
    ok: true,
    earned: chore.points,
    nextPoints: currentPoints + chore.points,
  };
}

export function reopenChore(chores: Chore[], choreId: string): Chore[] {
  return chores.map((chore) => (chore.id === choreId ? { ...chore, completed: false } : chore));
}

export function resetDailyChores(chores: Chore[]): Chore[] {
  return chores.map((chore) => ({ ...chore, completed: false }));
}

export function remainingToSpin(points: number, spinCost: number): number {
  return Math.max(0, spinCost - points);
}
