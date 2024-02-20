import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

const MessagesPage: React.FC = () => {
  // Placeholder messages array; in a real app, this would be fetched from a backend
  const messages = [
    { id: '1', from: 'Jane Doe', subject: 'Dinner Plans', body: 'What do you think about pizza tonight?' },
    { id: '2', from: 'John Smith', subject: 'Homework Help', body: 'Can you help me with my math homework?' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {messages.map(message => (
            <IonItem key={message.id}>
              <IonLabel>
                <h2>{message.from}</h2>
                <h3>{message.subject}</h3>
                <p>{message.body}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MessagesPage;
