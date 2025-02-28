import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  purchased: boolean;
}

interface ShoppingListState {
  items: ShoppingItem[];
  history: ShoppingItem[][];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  items: [],
  history: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.history.push([...state.items]);
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.history.push([...state.items]);
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.history.push([...state.items]);
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      state.history.push([...state.items]);
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    undoLastAction: state => {
      const previousState = state.history.pop();
      if (previousState) {
        state.items = previousState;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loadItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
      state.history = [];
    },
  },
});

export const {
  addItem,
  updateItem,
  removeItem,
  togglePurchased,
  undoLastAction,
  setLoading,
  setError,
  loadItems,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
