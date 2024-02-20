import React from 'react';
import { IonList, IonItem, IonLabel, IonBadge } from '@ionic/react';

const tasks = [
  { id: '1', title: 'Grocery Shopping', dueDate: new Date().toLocaleDateString() },
  // Add a new task with a due date of 2 days from now
  { id: '2', title: 'Doctor Appointment', dueDate: new Date().toLocaleDateString() + 2},
  // Add a new task with a due date of a week from now
  { id: '3', title: 'School Meeting', dueDate: new Date().toLocaleDateString() + 7 },
];

const UpcomingTasksComponent: React.FC = () => {
  return (
    <IonList>
      <IonItem lines="full">
        <IonLabel className="ion-text-wrap">
          <h2>Upcoming Tasks</h2>
        </IonLabel>
      </IonItem>
      {tasks.map(task => (
        <IonItem key={task.id}>
          <IonLabel>{task.title}</IonLabel>
          <IonBadge slot="end" color="success">{task.dueDate}</IonBadge>
        </IonItem>
      ))}
    </IonList>
  );
};

export default UpcomingTasksComponent;
