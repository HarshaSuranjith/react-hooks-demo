import React, { useState, useMemo, useCallback } from 'react';
import { AlertTriangle } from 'lucide-react';

// Expensive calculation simulation
const calculateFactorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * calculateFactorial(n - 1);
};

export function MemoHookDemo() {
  const [number, setNumber] = useState(5);
  const [darkMode, setDarkMode] = useState(false);

  // useMemo example - memoizing expensive calculation
  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    return calculateFactorial(number);
  }, [number]);

  // useCallback example - memoizing function
  const handleCalculate = useCallback(() => {
    console.log('Calculating with:', number);
    return calculateFactorial(number);
  }, [number]);

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4">useMemo & useCallback Hooks</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Factorial Calculator</h3>
          <div className="space-y-4">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
              className="p-2 border rounded text-black"
              min="0"
              max="10"
            />
            <p>Factorial of {number} is: {factorial}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Theme Toggle</h3>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className={`px-4 py-2 rounded ${
              darkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            Toggle Theme
          </button>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
            <AlertTriangle className="text-yellow-600" />
            Common Gotchas
          </h3>
          <ul className="list-disc ml-6 mt-2 space-y-2 text-black">
            <li>Over-memoization can hurt performance</li>
            <li>Missing dependencies can cause stale closures</li>
            <li>Memoizing simple calculations is unnecessary</li>
            <li>useCallback is mainly useful for passing callbacks to optimized child components</li>
          </ul>
        </div>
      </div>
    </div>
  );
}