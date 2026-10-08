import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cedar-cart-v1';

function readSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((line) => line?.product?.id && Number.isInteger(line.quantity) && line.quantity > 0) : [];
  } catch { return []; }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((line) => line.product.id === action.product.id);
      return existing
        ? state.map((line) => line.product.id === action.product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...state, { product: action.product, quantity: 1 }];
    }
    case 'change':
      return state.map((line) => line.product.id === action.id ? { ...line, quantity: Math.max(1, line.quantity + action.amount) } : line);
    case 'remove': return state.filter((line) => line.product.id !== action.id);
    case 'clear': return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readSavedCart);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);
  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: items.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    add: (product) => dispatch({ type: 'add', product }),
    change: (id, amount) => dispatch({ type: 'change', id, amount }),
    remove: (id) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
