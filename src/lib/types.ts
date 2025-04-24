
export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}
