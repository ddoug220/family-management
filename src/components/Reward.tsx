// Example of a simple Rewards Catalog Component
import React from 'react';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { Reward } from '../models/Reward';

const RewardItem: React.FC<{ reward: Reward }> = ({ reward }) => {
  return (
    <IonItem>
      <IonLabel>
        {reward.title} - {reward.pointsRequired} Points
      </IonLabel>
      <IonButton color="success">Redeem</IonButton>
    </IonItem>
  );
};
