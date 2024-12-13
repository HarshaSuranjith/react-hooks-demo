import React, { useReducer } from 'react';
import { AlertTriangle, ShoppingCart, Trash, Plus, Minus } from 'lucide-react';

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      };

    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: state.total + (state.items.find(item => item.id === action.payload)?.price || 0)
      };

    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        total: state.total - (
          state.items.find(item => item.id === action.payload && item.quantity > 1)?.price || 0
        )
      };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0
};

export function ReducerHookDemo() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = () => {
    const newItem: CartItem = {
      id: Date.now(),
      name: `Product ${state.items.length + 1}`,
      quantity: 1,
      price: Math.floor(Math.random() * 50) + 10
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ShoppingCart />
        useReducer Hook - Shopping Cart
      </h2>

      <div className="space-y-6">
        <button
          onClick={addItem}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Random Item
        </button>

        <div className="space-y-4">
          {state.items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch({ type: 'DECREMENT_QUANTITY', payload: item.id })}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: 'INCREMENT_QUANTITY', payload: item.id })}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xl font-bold">
          Total: ${state.total}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="text-yellow-600" />
            Common Gotchas
          </h3>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Always return a new state object, never mutate existing state</li>
            <li>Keep reducers pure - no side effects</li>
            <li>Don't call dispatch during reducer execution</li>
            <li>Complex state might need multiple reducers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}