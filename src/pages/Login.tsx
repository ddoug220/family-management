import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login with:', email, password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} type="email" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput value={password} onIonChange={e => setPassword(e.detail.value!)} type="password" />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin}>Log In</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
