import { useCallback, useEffect, useMemo, useState } from 'react';
import { newChore, newId, newReward } from '../defaults';
import { completeChore, remainingToSpin, resetDailyChores } from '../logic/points';
import { extraTurnsFromRandom, nextWheelRotation, prepareSpin } from '../logic/spin';
import { loadState, saveState } from '../storage';
import type { Complexity, Reward } from '../types';

const SPIN_MS = 4400;

export function useFamilyStore() {
  const [state, setState] = useState(loadState);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [latestWin, setLatestWin] = useState<string | null>(null);
  const [spinMessage, setSpinMessage] = useState<string | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const finishChore = useCallback((choreId: string) => {
    setState((current) => {
      const result = completeChore(current.chores, choreId, current.points);
      if (!result.ok) return current;
      return {
        ...current,
        points: result.nextPoints,
        chores: current.chores.map((chore) =>
          chore.id === choreId ? { ...chore, completed: true } : chore,
        ),
      };
    });
    setSpinMessage(null);
  }, []);

  const addChore = useCallback((title: string, complexity: Complexity) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setState((current) => ({
      ...current,
      chores: [...current.chores, newChore(trimmed, complexity)],
    }));
  }, []);

  const updateChore = useCallback((choreId: string, title: string, points: number) => {
    const trimmed = title.trim();
    const safePoints = Math.max(1, Math.floor(points));
    if (!trimmed) return;
    setState((current) => ({
      ...current,
      chores: current.chores.map((chore) =>
        chore.id === choreId ? { ...chore, title: trimmed, points: safePoints } : chore,
      ),
    }));
  }, []);

  const removeChore = useCallback((choreId: string) => {
    setState((current) => ({
      ...current,
      chores: current.chores.filter((chore) => chore.id !== choreId),
    }));
  }, []);

  const addReward = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setState((current) => ({
      ...current,
      rewards: [...current.rewards, newReward(trimmed)],
    }));
  }, []);

  const updateReward = useCallback((rewardId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setState((current) => ({
      ...current,
      rewards: current.rewards.map((reward) =>
        reward.id === rewardId ? { ...reward, title: trimmed } : reward,
      ),
    }));
  }, []);

  const removeReward = useCallback((rewardId: string) => {
    setState((current) => ({
      ...current,
      rewards: current.rewards.filter((reward) => reward.id !== rewardId),
    }));
  }, []);

  const setKidName = useCallback((kidName: string) => {
    const trimmed = kidName.trim();
    if (!trimmed) return;
    setState((current) => ({ ...current, kidName: trimmed }));
  }, []);

  const setSpinCost = useCallback((spinCost: number) => {
    const safe = Math.max(1, Math.floor(spinCost));
    setState((current) => ({ ...current, spinCost: safe }));
  }, []);

  const resetChores = useCallback(() => {
    setState((current) => ({ ...current, chores: resetDailyChores(current.chores) }));
    setLatestWin(null);
    setSpinMessage(null);
  }, []);

  const resetPoints = useCallback(() => {
    setState((current) => ({ ...current, points: 0, wins: [] }));
    setLatestWin(null);
    setSpinMessage(null);
  }, []);

  const spin = useCallback(() => {
    if (spinning) return;
    const result = prepareSpin(state.points, state.spinCost, state.rewards);
    if (!result.ok) {
      const copy: Record<typeof result.reason, string> = {
        insufficient: `Need ${remainingToSpin(state.points, state.spinCost)} more tickets to spin.`,
        'no-rewards': 'Ask a grown-up to add prizes to the wheel.',
        'invalid-cost': 'Ask a grown-up to set a spin cost.',
      };
      setSpinMessage(copy[result.reason]);
      return;
    }

    const nextRotation = nextWheelRotation(
      rotation,
      result.index,
      state.rewards.length,
      extraTurnsFromRandom(),
    );
    const reward: Reward = result.reward;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setSpinning(true);
    setLatestWin(null);
    setSpinMessage(null);
    setRotation(nextRotation);
    setState((current) => ({ ...current, points: result.remaining }));

    const finish = () => {
      setSpinning(false);
      setLatestWin(reward.title);
      setState((current) => ({
        ...current,
        wins: [
          {
            id: newId('win'),
            rewardTitle: reward.title,
            spent: current.spinCost,
            wonAt: new Date().toISOString(),
          },
          ...current.wins,
        ].slice(0, 12),
      }));
    };

    if (prefersReduced) {
      finish();
      return;
    }

    window.setTimeout(finish, SPIN_MS);
  }, [rotation, spinning, state.points, state.rewards, state.spinCost]);

  const ticketsNeeded = useMemo(
    () => remainingToSpin(state.points, state.spinCost),
    [state.points, state.spinCost],
  );

  const doneCount = useMemo(
    () => state.chores.filter((chore) => chore.completed).length,
    [state.chores],
  );

  return {
    state,
    rotation,
    spinning,
    latestWin,
    spinMessage,
    ticketsNeeded,
    doneCount,
    spinDurationMs: SPIN_MS,
    finishChore,
    addChore,
    updateChore,
    removeChore,
    addReward,
    updateReward,
    removeReward,
    setKidName,
    setSpinCost,
    resetChores,
    resetPoints,
    spin,
    dismissWin: () => setLatestWin(null),
  };
}

export type FamilyStore = ReturnType<typeof useFamilyStore>;
