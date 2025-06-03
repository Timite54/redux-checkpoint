import React from 'react';
import { useAppSelector } from '../store/hooks';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const { tasks, filterStatus } = useAppSelector((state) => state.tasks);

  const getFilteredTasks = (): Task[] => {
    switch (filterStatus) {
      case 'active':
        return tasks.filter((task) => !task.isDone);
      case 'completed':
        return tasks.filter((task) => task.isDone);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks found</p>
      </div>
    );
  }

  return (
    <ul data-testid="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;