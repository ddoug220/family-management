import { suggestedChorePoints } from './logic/points';
import type { AppState, Chore, Complexity, Reward } from './types';

function id(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function chore(title: string, complexity: Complexity): Chore {
  return {
    id: id('chore'),
    title,
    complexity,
    points: suggestedChorePoints(complexity),
    completed: false,
  };
}

function reward(title: string): Reward {
  return { id: id('reward'), title };
}

export function createDefaultState(): AppState {
  return {
    version: 1,
    kidName: 'Aliyah',
    points: 0,
    spinCost: 25,
    chores: [
      chore('Make the bed', 'Low'),
      chore('Put dirty clothes in the hamper', 'Low'),
      chore('Clear the dinner dishes', 'Medium'),
      chore('Tidy the bedroom floor', 'Medium'),
      chore('Homework time', 'High'),
    ],
    rewards: [
      reward('15 extra minutes'),
      reward('Pick dessert'),
      reward('Later bedtime'),
      reward('Saturday movie'),
      reward('Store treat'),
      reward('Skip a chore'),
    ],
    wins: [],
  };
}

export function newChore(title: string, complexity: Complexity): Chore {
  return chore(title, complexity);
}

export function newReward(title: string): Reward {
  return reward(title);
}

export function newId(prefix: string): string {
  return id(prefix);
}
