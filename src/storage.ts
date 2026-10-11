import { createDefaultState } from './defaults';
import type { AppState, Chore, Complexity, PrizeWin, Reward } from './types';

export const STORAGE_KEY = 'family-management:v1';

function isComplexity(value: unknown): value is Complexity {
  return value === 'Low' || value === 'Medium' || value === 'High';
}

function isChore(value: unknown): value is Chore {
  if (!value || typeof value !== 'object') return false;
  const item = value as Chore;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.points === 'number' &&
    Number.isFinite(item.points) &&
    isComplexity(item.complexity) &&
    typeof item.completed === 'boolean'
  );
}

function isReward(value: unknown): value is Reward {
  if (!value || typeof value !== 'object') return false;
  const item = value as Reward;
  return typeof item.id === 'string' && typeof item.title === 'string' && item.title.length > 0;
}

function isWin(value: unknown): value is PrizeWin {
  if (!value || typeof value !== 'object') return false;
  const item = value as PrizeWin;
  return (
    typeof item.id === 'string' &&
    typeof item.rewardTitle === 'string' &&
    typeof item.spent === 'number' &&
    typeof item.wonAt === 'string'
  );
}

export function parseState(raw: unknown): AppState | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Partial<AppState>;
  if (data.version !== 1) return null;
  if (typeof data.kidName !== 'string' || data.kidName.trim().length === 0) return null;
  if (typeof data.points !== 'number' || !Number.isFinite(data.points) || data.points < 0)
    return null;
  if (typeof data.spinCost !== 'number' || !Number.isFinite(data.spinCost) || data.spinCost < 1) {
    return null;
  }
  if (!Array.isArray(data.chores) || !data.chores.every(isChore)) return null;
  if (!Array.isArray(data.rewards) || !data.rewards.every(isReward)) return null;
  if (!Array.isArray(data.wins) || !data.wins.every(isWin)) return null;
  return {
    version: 1,
    kidName: data.kidName.trim(),
    points: Math.floor(data.points),
    spinCost: Math.floor(data.spinCost),
    chores: data.chores,
    rewards: data.rewards,
    wins: data.wins.slice(0, 12),
  };
}

export function loadState(): AppState {
  if (typeof localStorage === 'undefined') return createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return parseState(JSON.parse(raw)) ?? createDefaultState();
  } catch {
    return createDefaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
