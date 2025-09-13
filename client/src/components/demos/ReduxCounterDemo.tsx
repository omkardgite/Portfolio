import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaRedo } from "react-icons/fa";

interface CounterState {
  value: number;
  history: number[];
}

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET';
}

// Simple Redux-like reducer
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        value: state.value + 1,
        history: [...state.history, state.value + 1]
      };
    case 'DECREMENT':
      return {
        value: state.value - 1,
        history: [...state.history, state.value - 1]
      };
    case 'RESET':
      return {
        value: 0,
        history: [0]
      };
    default:
      return state;
  }
};

export function ReduxCounterDemo() {
  const [state, dispatch] = useState<CounterState>({ value: 0, history: [0] });
  
  const handleAction = (actionType: CounterAction['type']) => {
    const newState = counterReducer(state, { type: actionType });
    dispatch(newState);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 max-w-sm">
      <h4 className="font-semibold mb-4 text-center">Redux Counter Demo</h4>
      
      {/* Counter Display */}
      <div className="text-center mb-6">
        <motion.div
          key={state.value}
          initial={{ scale: 1.2, color: '#6366f1' }}
          animate={{ scale: 1, color: 'currentColor' }}
          className="text-4xl font-bold mb-2"
        >
          {state.value}
        </motion.div>
        <div className="text-sm text-muted-foreground">Current Value</div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-3 mb-4">
        <motion.button
          onClick={() => handleAction('DECREMENT')}
          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 p-3 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="counter-decrement"
        >
          <FaMinus />
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('RESET')}
          className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 p-3 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="counter-reset"
        >
          <FaRedo />
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('INCREMENT')}
          className="bg-green-500/10 text-green-500 hover:bg-green-500/20 p-3 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="counter-increment"
        >
          <FaPlus />
        </motion.button>
      </div>

      {/* History Display */}
      <div>
        <div className="text-xs text-muted-foreground mb-2">Action History:</div>
        <div className="bg-muted rounded-lg p-2 max-h-20 overflow-y-auto">
          <AnimatePresence>
            {state.history.slice(-5).map((value, index) => (
              <motion.div
                key={`${value}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs py-1"
              >
                {index === 0 ? 'Initial' : `Action ${index}`}: {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground text-center">
        Demonstrates: State management, Actions, Reducers
      </div>
    </div>
  );
}