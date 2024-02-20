import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { calendarOutline, listOutline, chatbubbleEllipsesOutline, settingsOutline } from 'ionicons/icons';

const MainDashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>Welcome back, [User Name]!</IonCardContent>
        </IonCard>

        {/* Quick Summary or Widgets for Today's Events/Tasks */}
        {/* This could be a horizontal scroll or a set of cards */}

        {/* Quick Access Buttons */}
        <IonButton expand="block" routerLink="/tasks">
          <IonIcon slot="start" icon={listOutline} />
          View Tasks
        </IonButton>
        <IonButton expand="block" routerLink="/calendar">
          <IonIcon slot="start" icon={calendarOutline} />
          Open Calendar
        </IonButton>
        <IonButton expand="block" routerLink="/messages">
          <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
          Messages
        </IonButton>
        <IonButton expand="block" routerLink="/settings">
          <IonIcon slot="start" icon={settingsOutline} />
          Settings
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MainDashboard;
