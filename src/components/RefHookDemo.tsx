import React, { useRef, useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function RefHookDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  // Example of ref persisting between renders
  useEffect(() => {
    countRef.current += 1;
    setRenderCount(prev => prev + 1);
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">useRef Hook</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">DOM Reference Example</h3>
          <div className="flex gap-4">
            <input
              ref={inputRef}
              type="text"
              className="p-2 border rounded"
              placeholder="Focus me!"
            />
            <button 
              onClick={focusInput}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Focus Input
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Mutable Value Example</h3>
          <div className="space-y-2">
            <p>Render Count (state): {renderCount}</p>
            <p>Render Count (ref): {countRef.current}</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="text-yellow-600" />
            Common Gotchas
          </h3>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Changing ref.current doesn't trigger re-renders</li>
            <li>Refs might be null on initial render</li>
            <li>Don't use refs for values that should trigger re-renders</li>
            <li>Refs persist between renders unlike regular variables</li>
          </ul>
        </div>
      </div>
    </div>
  );
}