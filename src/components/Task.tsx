// Simplified example of a Task Component in React
import React from 'react';
import { IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonInput, IonDatetime } from '@ionic/react';
import { Task } from '../models/Task';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <IonItem>
      <IonLabel>{task.title}</IonLabel>
      <IonCheckbox slot="start" checked={task.completed} />
      <IonButton color="primary">Details</IonButton>
    </IonItem>
  );
};

// Extend this to include Task List View, Task Detail View, and Task Creation Form
