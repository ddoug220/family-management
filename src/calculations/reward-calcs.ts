import { Task } from "../models/Task";
import { User } from "../models/User";


const basePoints = 10; // Base points for completing any task

const complexityFactor = (complexity: string) => {
  switch (complexity) {
    case 'High': return 2;
    case 'Medium': return 1.5;
    default: return 1;
  }
};

const urgencyFactor = (dueDate: Date) => {
  const hoursToDeadline = (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60);
  return hoursToDeadline < 24 ? 1.5 : 1;
};

const ageAdjustmentFactor = (age: number) => {
  if (age < 12) return 1.2;
  if (age >= 12 && age <= 18) return 1;
  return 0.8; // Adults get fewer points as tasks are expected of them
};

export const calculatePointsForTaskCompletion = (task: Task, user: User) => {
  const points = basePoints * complexityFactor(task.complexity) * urgencyFactor(task.dueDate) * ageAdjustmentFactor(user.age);
  // Update the user's points balance with the calculated points
  user.points += points;
  // Save the update in the database
};
