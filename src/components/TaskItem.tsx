import React, { useState } from 'react';
import { Pencil, Check, Trash, X } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { toggleTask, editTask, deleteTask } from '../store/slices/tasksSlice';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = () => {
    if (editedDescription.trim()) {
      dispatch(editTask({ id: task.id, description: editedDescription.trim() }));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <li className="bg-white rounded-lg shadow-sm p-4 mb-3 flex items-center gap-3 group hover:shadow-md transition-shadow duration-200">
      <div 
        className={`w-6 h-6 rounded-md border cursor-pointer flex items-center justify-center ${
          task.isDone 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 hover:border-indigo-500'
        }`}
        onClick={handleToggle}
        data-testid="task-checkbox"
      >
        {task.isDone && <Check size={16} />}
      </div>
      
      {isEditing ? (
        <div className="flex-1 flex items-center">
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="flex-1 p-1 border border-gray-300 rounded-md outline-none focus:border-indigo-500"
            autoFocus
            data-testid="edit-input"
          />
          <div className="flex ml-2 gap-1">
            <button
              onClick={handleSaveEdit}
              className="p-1.5 text-green-600 hover:bg-green-100 rounded-md transition-colors"
              data-testid="save-button"
            >
              <Check size={18} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
              data-testid="cancel-button"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <p 
            className={`flex-1 ${task.isDone ? 'text-gray-500 line-through' : 'text-gray-700'}`}
            data-testid="task-description"
          >
            {task.description}
          </p>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
              data-testid="edit-button"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
              data-testid="delete-button"
            >
              <Trash size={18} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;