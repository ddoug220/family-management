import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonBackButton, IonButtons } from '@ionic/react';

// Placeholder for a single task; in a real app, this would come from state management or API call
const taskDetail = {
  id: '1',
  title: 'Grocery Shopping',
  description: 'Buy groceries for the week',
  dueDate: '2023-09-01',
  completed: false,
};

const TaskDetailView: React.FC = () => {
  const handleCompleteTask = () => {
    // Logic to mark the task as completed
    console.log('Task completed');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Task Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>{taskDetail.title}</h2>
              <p>{taskDetail.description}</p>
              <p>Due: {taskDetail.dueDate}</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonButton fill="solid" color="success" onClick={handleCompleteTask}>
              Mark as Completed
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetailView;
