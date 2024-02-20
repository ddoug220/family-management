export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  age: number;
  points: number;
  preferences: {
    notification: boolean;
    locationSharing: boolean;
  };
}
