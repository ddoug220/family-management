export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // User ID
  dueDate: Date;
  completed: boolean;
}
