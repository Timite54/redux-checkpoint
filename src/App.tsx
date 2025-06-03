import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="flex justify-center items-center mb-2">
              <CheckSquare className="text-indigo-600 mr-2" size={32} />
              <h1 className="text-3xl font-bold text-indigo-900">Task Manager</h1>
            </div>
            <p className="text-gray-600">Organize your tasks efficiently</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <AddTask />
            <TaskFilter />
            <TaskList />
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Drag anywhere to reorder • Double-click to edit</p>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;