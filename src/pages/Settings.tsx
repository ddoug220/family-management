import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle } from '@ionic/react';

const SettingsPage: React.FC = () => {
  const [enableNotifications, setEnableNotifications] = React.useState(true);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle checked={enableNotifications} onIonChange={e => setEnableNotifications(e.detail.checked)} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
