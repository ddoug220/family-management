export interface RewardPoint {
  userId: string;
  points: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
}

export interface RewardRedemption {
  userId: string;
  rewardId: string;
  dateRedeemed: Date;
}
