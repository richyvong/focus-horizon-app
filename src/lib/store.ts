
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Project, Priority } from './types';

interface TaskStore {
  tasks: Task[];
  projects: Project[];
  activeFilter: string;
  
  // Task actions
  addTask: (task: Omit<Task, 'id'>) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  
  // Project actions
  addProject: (project: Omit<Project, 'id'>) => void;
  editProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Filter actions
  setActiveFilter: (filter: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [
        { id: 'inbox', name: 'Inbox', color: '#0ea5e9' },
        { id: 'personal', name: 'Personal', color: '#8b5cf6' },
        { id: 'work', name: 'Work', color: '#10b981' },
      ],
      activeFilter: 'inbox',

      addTask: (task) => 
        set((state) => ({ 
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
        })),
        
      editTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map(task => 
            task.id === id ? { ...task, ...updates } : task
          )
        })),
        
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),
        
      toggleTaskCompletion: (id) =>
        set((state) => ({
          tasks: state.tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        })),

      addProject: (project) =>
        set((state) => ({ 
          projects: [...state.projects, { ...project, id: Date.now().toString() }]
        })),
        
      editProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === id ? { ...project, ...updates } : project
          )
        })),
        
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter(project => project.id !== id)
        })),
        
      setActiveFilter: (filter) =>
        set({ activeFilter: filter }),
    }),
    {
      name: 'task-storage',
    }
  )
);
