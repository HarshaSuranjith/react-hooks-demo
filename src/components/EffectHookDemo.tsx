import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function EffectHookDemo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect with no dependencies - runs on every render
  useEffect(() => {
    console.log('Effect runs on every render');
  });

  // Effect with empty dependencies - runs once on mount
  useEffect(() => {
    console.log('Effect runs only on mount');
    const timer = setTimeout(() => {
      setData('Data loaded!');
    }, 2000);

    // Cleanup function
    return () => {
      console.log('Cleanup runs on unmount');
      clearTimeout(timer);
    };
  }, []);

  // Effect with dependencies - runs when dependencies change
  useEffect(() => {
    console.log('Effect runs when count changes:', count);
  }, [count]);

  // Window resize effect with cleanup
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">useEffect Hook</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Counter with Effect</h3>
          <button 
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Count: {count}
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Async Data Loading</h3>
          <div className="p-4 bg-gray-100 rounded">
            {data ? data : 'Loading...'}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Window Width Tracker</h3>
          <div className="p-4 bg-gray-100 rounded">
            Current width: {windowWidth}px
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="text-yellow-600" />
            Common Gotchas
          </h3>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Missing dependency array can cause infinite loops</li>
            <li>Not cleaning up subscriptions can cause memory leaks</li>
            <li>Running effects too often can impact performance</li>
            <li>Async functions can't be directly used in useEffect</li>
          </ul>
        </div>
      </div>
    </div>
  );
}