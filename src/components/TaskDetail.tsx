import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import { User } from '../models/User';
import { calculatePointsForTaskCompletion } from '../calculations/reward-calcs';
import { Task } from '../models/Task';

// Placeholder for a single task; in a real app, this would come from state management or API call
const taskDetail: Task = {
  id: '1',
  title: 'Grocery Shopping',
  description: 'Buy groceries for the week',
  dueDate: new Date(),
  completed: false,
  assignedTo: '1',
  complexity: 'Low',
};
// Placeholder for a single user; in a real app, this would come from state management or API call
const user: User = {
  id: '1',
  name: 'John Doe',
  email: '',
  role: 'parent',
  age: 35,
  points: 0,
  preferences: {
    notification: true,
    locationSharing: false,
  },
};

const TaskDetailView: React.FC = () => {
  const markTaskAsCompleted = async (taskId: string, userId: string) => {
    calculatePointsForTaskCompletion(taskDetail, user);
  taskDetail.completed = true
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
              <p>Due: {taskDetail.dueDate.toUTCString()}</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonButton fill="solid" color="success" onClick={() => markTaskAsCompleted(taskDetail.id, user.id)}>
              Mark as Completed
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetailView;

