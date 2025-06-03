export interface Task {
  id: string;
  description: string;
  isDone: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';