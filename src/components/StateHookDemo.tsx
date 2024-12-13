import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export function StateHookDemo() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', age: 0 });

  // Example of incorrect state update with objects
  const incorrectUpdate = () => {
    user.age += 1; // This won't trigger a re-render!
    setUser(user);
  };

  // Correct way to update object state
  const correctUpdate = () => {
    setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">useState Hook</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Basic Counter Example</h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCount(c => c - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <span className="text-xl">{count}</span>
          <button 
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Object State Example</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter name"
            className="w-full p-2 border rounded"
          />
          <div>Age: {user.age}</div>
          <button 
            onClick={correctUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Age (Correct)
          </button>
          <button 
            onClick={incorrectUpdate}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
          >
            Increment Age (Incorrect)
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="text-yellow-600" />
          Common Gotchas
        </h3>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>State updates are asynchronous - don't rely on immediate updates</li>
          <li>Objects and arrays need to be properly copied when updating</li>
          <li>Using the previous state value requires the callback form</li>
        </ul>
      </div>
    </div>
  );
}