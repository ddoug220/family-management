export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  preferences: {
    notification: boolean;
    locationSharing: boolean;
  };
}
