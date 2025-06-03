import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilterStatus } from '../store/slices/tasksSlice';
import { FilterStatus } from '../types';

const TaskFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterStatus } = useAppSelector((state) => state.tasks);

  const filters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => dispatch(setFilterStatus(filter.value))}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filterStatus === filter.value
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            data-testid={`filter-${filter.value}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;