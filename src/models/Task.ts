export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // User ID
  dueDate: Date;
  complexity: 'Low' | 'Medium' | 'High';
  completed: boolean;
}
