import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonRouterOutlet, useIonRouter } from '@ionic/react';
import { Redirect, Route, Router } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import TaskDetailView from './TaskDetail';

// Placeholder tasks array; in a real app, this would come from state management or props
const tasks = [
  { id: '1', title: 'Grocery Shopping', dueDate: '2023-09-01' },
  { id: '2', title: 'Doctor Appointment', dueDate: '2023-09-02' },
  { id: '3', title: 'School Meeting', dueDate: '2023-09-03' },
];

const TaskListView: React.FC = () => {
  const router = useIonRouter();
  const handleTaskClick = (taskId: string) => {
    // Navigate to Task Detail View with taskId
    router.push(`/tasks/${taskId}`)
    console.log('Navigate to task detail view', taskId);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id} button onClick={() => handleTaskClick(task.id)}>
              <IonLabel>
                <h2>{task.title}</h2>
                <p>Due: {task.dueDate}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TaskListView;
