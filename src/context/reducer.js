import { ACTIONS } from './actions';

const upsertCartItem = (cart, product, quantity = 1) => {
  const existing = cart.find((item) => item.id === product.id);

  if (!existing) {
    const safeQty = Math.max(1, Math.min(quantity, product.stock));
    return [...cart, { ...product, quantity: safeQty }];
  }

  return cart
    .map((item) => {
      if (item.id !== product.id) {
        return item;
      }

      const nextQty = Math.max(0, Math.min(item.quantity + quantity, item.stock));
      return nextQty > 0 ? { ...item, quantity: nextQty } : null;
    })
    .filter(Boolean);
};

const setCartItemQty = (cart, id, quantity) =>
  cart
    .map((item) => {
      if (item.id !== id) {
        return item;
      }

      const nextQty = Math.max(0, Math.min(quantity, item.stock));
      return nextQty > 0 ? { ...item, quantity: nextQty } : null;
    })
    .filter(Boolean);

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return {
        ...state,
        cart: upsertCartItem(state.cart, action.payload.product, action.payload.quantity)
      };

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };

    case ACTIONS.INCREMENT_QTY:
      return {
        ...state,
        cart: setCartItemQty(
          state.cart,
          action.payload.id,
          (state.cart.find((item) => item.id === action.payload.id)?.quantity || 0) + 1
        )
      };

    case ACTIONS.DECREMENT_QTY:
      return {
        ...state,
        cart: setCartItemQty(
          state.cart,
          action.payload.id,
          (state.cart.find((item) => item.id === action.payload.id)?.quantity || 0) - 1
        )
      };

    case ACTIONS.SET_CART_QTY:
      return {
        ...state,
        cart: setCartItemQty(state.cart, action.payload.id, action.payload.quantity)
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTIONS.TOGGLE_WISHLIST: {
      const exists = state.wishlist.some((item) => item.id === action.payload.product.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== action.payload.product.id)
          : [...state.wishlist, action.payload.product]
      };
    }

    case ACTIONS.MOVE_WISHLIST_TO_CART: {
      const product = state.wishlist.find((item) => item.id === action.payload.id);
      if (!product) {
        return state;
      }

      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload.id),
        cart: upsertCartItem(state.cart, product, 1)
      };
    }

    case ACTIONS.APPLY_PROMO:
      return {
        ...state,
        promoCode: action.payload.code
      };

    case ACTIONS.CLEAR_PROMO:
      return {
        ...state,
        promoCode: ''
      };

    case ACTIONS.ADD_RECENT_VIEW: {
      const nextRecent = [action.payload.id, ...state.recentViewed.filter((id) => id !== action.payload.id)].slice(0, 6);
      return {
        ...state,
        recentViewed: nextRecent
      };
    }

    case ACTIONS.PLACE_ORDER:
      return {
        ...state,
        cart: [],
        promoCode: ''
      };

    case ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload.toast]
      };

    case ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id)
      };

    default:
      return state;
  }
};
