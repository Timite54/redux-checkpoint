import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/slices/tasksSlice';

const AddTask: React.FC = () => {
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      dispatch(addTask(description.trim()));
      setDescription('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 mb-6 p-3 bg-white rounded-lg shadow-sm transition-all focus-within:shadow-md"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 p-2 outline-none text-gray-700"
        data-testid="task-input"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
        disabled={!description.trim()}
        data-testid="add-button"
      >
        <Plus size={20} />
      </button>
    </form>
  );
};

export default AddTask;