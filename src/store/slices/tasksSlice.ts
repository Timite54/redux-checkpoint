import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, FilterStatus } from '../../types';

interface TasksState {
  tasks: Task[];
  filterStatus: FilterStatus;
}

// Load tasks from localStorage
const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TasksState = {
  tasks: loadTasks(),
  filterStatus: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        description: action.payload,
        isDone: false,
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
        saveTasks(state.tasks);
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; description: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.description = action.payload.description;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask, setFilterStatus } = tasksSlice.actions;

export default tasksSlice.reducer;