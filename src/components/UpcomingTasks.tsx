import React from 'react';
import { IonList, IonItem, IonLabel, IonBadge } from '@ionic/react';

// Placeholder for tasks; in a real app, this would come from app state or props
const tasks = [
  { id: '1', title: 'Grocery Shopping', dueDate: 'Today' },
  { id: '2', title: 'Doctor Appointment', dueDate: 'Tomorrow' },
  { id: '3', title: 'School Meeting', dueDate: 'Friday' },
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
