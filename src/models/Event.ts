export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  participants: string[]; // Array of User IDs
  location?: string;
}
