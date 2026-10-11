export type Complexity = 'Low' | 'Medium' | 'High';

export type Chore = {
  id: string;
  title: string;
  points: number;
  complexity: Complexity;
  completed: boolean;
};

export type Reward = {
  id: string;
  title: string;
};

export type PrizeWin = {
  id: string;
  rewardTitle: string;
  spent: number;
  wonAt: string;
};

export type AppState = {
  version: 1;
  kidName: string;
  points: number;
  spinCost: number;
  chores: Chore[];
  rewards: Reward[];
  wins: PrizeWin[];
};

export type TabId = 'chores' | 'wheel' | 'parent';
