import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';

const EventForm: React.FC = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    participants: []
  });

  const handleSubmit = () => {
    // Logic to save event details to Firebase
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add/Edit Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Form Fields */}
        <IonInput placeholder="Title" onIonChange={e => setEventDetails({ ...eventDetails, title: e.detail.value || '' })} />
        <IonDatetime onIonChange={e => setEventDetails({ ...eventDetails, startTime: e.detail.value?.toString() || '' })} />
        <IonDatetime onIonChange={e => setEventDetails({ ...eventDetails, endTime: e.detail.value?.toString() || '' })} />
        <IonInput placeholder="Location" onIonChange={e => setEventDetails({ ...eventDetails, location: e.detail.value || '' })} />
        {/* More fields as needed */}
        <IonButton onClick={handleSubmit}>Save Event</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EventForm;
