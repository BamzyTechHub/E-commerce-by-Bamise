import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import products from '../data/products.json';
import { ACTIONS } from './actions';
import { reducer } from './reducer';
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage';
import { calculateTotals } from '../utils/calcTotals';

const StoreContext = createContext(null);

const buildInitialState = () => ({
  products,
  cart: readStorage(STORAGE_KEYS.cart, []),
  wishlist: readStorage(STORAGE_KEYS.wishlist, []),
  promoCode: readStorage(STORAGE_KEYS.promoCode, ''),
  recentViewed: readStorage(STORAGE_KEYS.recentViewed, []),
  toasts: []
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, state.cart);
  }, [state.cart]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.wishlist, state.wishlist);
  }, [state.wishlist]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.promoCode, state.promoCode);
  }, [state.promoCode]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.recentViewed, state.recentViewed);
  }, [state.recentViewed]);

  const notify = (message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    dispatch({
      type: ACTIONS.ADD_TOAST,
      payload: { toast: { id, message, type } }
    });

    window.setTimeout(() => {
      dispatch({ type: ACTIONS.REMOVE_TOAST, payload: { id } });
    }, 2200);
  };

  const value = useMemo(() => {
    const totals = calculateTotals(state.cart, state.promoCode);

    return {
      ...state,
      totals,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: ACTIONS.ADD_TO_CART, payload: { product, quantity } }),
      removeFromCart: (id) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { id } }),
      incrementQty: (id) => dispatch({ type: ACTIONS.INCREMENT_QTY, payload: { id } }),
      decrementQty: (id) => dispatch({ type: ACTIONS.DECREMENT_QTY, payload: { id } }),
      setCartQty: (id, quantity) => dispatch({ type: ACTIONS.SET_CART_QTY, payload: { id, quantity } }),
      clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),
      toggleWishlist: (product) => dispatch({ type: ACTIONS.TOGGLE_WISHLIST, payload: { product } }),
      moveWishlistToCart: (id) => dispatch({ type: ACTIONS.MOVE_WISHLIST_TO_CART, payload: { id } }),
      applyPromo: (code) => dispatch({ type: ACTIONS.APPLY_PROMO, payload: { code } }),
      clearPromo: () => dispatch({ type: ACTIONS.CLEAR_PROMO }),
      addRecentView: (id) => dispatch({ type: ACTIONS.ADD_RECENT_VIEW, payload: { id } }),
      placeOrder: () => dispatch({ type: ACTIONS.PLACE_ORDER }),
      notify
    };
  }, [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
