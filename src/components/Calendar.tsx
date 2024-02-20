import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonList, IonItem, IonLabel, IonBadge } from '@ionic/react';

// Placeholder data structure for events/tasks
interface EventTask {
  id: string;
  title: string;
  startTime: string; // ISO string format
  endTime?: string; // ISO string format
}

// Example events/tasks data - replace with dynamic data from your backend or state management
const eventsTasksSample: EventTask[] = [
  { id: '1', title: 'Math Homework', startTime: new Date().toISOString(), endTime: new Date().toISOString() },
  { id: '2', title: 'Family Dinner', startTime: new Date().toISOString() },
  // Add more sample events/tasks
];

const DetailedCalendarView: React.FC = (children) => {
  console.log(children)
  const [selectedDate, setSelectedDate] = useState<string | number>(new Date().toISOString());
  const [dailyEvents, setDailyEvents] = useState<EventTask[]>([]);

  useEffect(() => {
    // Filter events/tasks for the selected date
    const selectedDay = new Date(selectedDate).setHours(0, 0, 0, 0);
    const filteredEvents = eventsTasksSample.filter(event => {
      const eventDay = new Date(event.startTime).setHours(0, 0, 0, 0);
      return eventDay === selectedDay;
    });
    setDailyEvents(filteredEvents);
  }, [selectedDate]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detailed Calendar View</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonDatetime
          onIonChange={e => setSelectedDate(e.target.value ? e.target.value.toString() : '')}
          value={selectedDate.toString()} // Convert selectedDate to string
        ></IonDatetime>
        <IonList>
          {dailyEvents.length > 0 ? (
            dailyEvents.map(event => (
              <IonItem key={event.id}>
                <IonLabel>
                  <h2>{event.title}</h2>
                  <p>Start: {new Date(event.startTime).toLocaleTimeString()}</p>
                  {event.endTime && <p>End: {new Date(event.endTime).toLocaleTimeString()}</p>}
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No events or tasks for this day.</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DetailedCalendarView;
