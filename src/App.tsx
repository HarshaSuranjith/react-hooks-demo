import React from 'react';
import { StateHookDemo } from './components/StateHookDemo';
import { EffectHookDemo } from './components/EffectHookDemo';
import { RefHookDemo } from './components/RefHookDemo';
import { MemoHookDemo } from './components/MemoHookDemo';
import { ReducerHookDemo } from './components/ReducerHookDemo';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">React Hooks Demo</h1>
        
        <StateHookDemo />
        <EffectHookDemo />
        <RefHookDemo />
        <MemoHookDemo />
        <ReducerHookDemo />
      </div>
    </div>
  );
}

export default App;