import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonDatetime, IonSelect, IonSelectOption, IonLabel, IonItem } from '@ionic/react';


const familyMembers = [
  { id: '1', name: 'Jane Doe' },
  { id: '2', name: 'John Doe' },
];

const AddTaskPage: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = () => {
    console.log('Submitting new task:', { taskTitle, taskDescription, dueDate, assignee });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Task Title</IonLabel>
          <IonInput value={taskTitle} onIonChange={e => setTaskTitle(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonInput value={taskDescription} onIonChange={e => setTaskDescription(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Due Date</IonLabel>
          <IonDatetime value={dueDate} onIonChange={e => setDueDate(e.detail.value?.toString() ?? '')} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Assignee</IonLabel>
          <IonSelect value={assignee} placeholder="Select One" onIonChange={e => setAssignee(e.detail.value)}>
            {familyMembers.map(member => (
              <IonSelectOption key={member.id} value={member.id}>{member.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonButton expand="block" onClick={handleSubmit}>Add Task</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddTaskPage;
