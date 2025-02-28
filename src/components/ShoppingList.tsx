import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Paper, CircularProgress, Alert } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import { RootState } from '../store/index.ts';
import { undoLastAction, loadItems, setLoading, setError } from '../store/shoppingListSlice.ts';
import { storage } from '../services/storage.ts';
import AddItemForm from './AddItemForm.tsx';
import ItemList from './ItemList.tsx';
import SearchFilter from './SearchFilter.tsx';

const ShoppingList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, history, loading, error } = useSelector((state: RootState) => state.shoppingList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPurchased, setShowPurchased] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load items on mount
  useEffect(() => {
    const loadStoredItems = async () => {
      dispatch(setLoading(true));
      try {
        const savedItems = await storage.getItems();
        dispatch(loadItems(savedItems));
      } catch (error) {
        dispatch(setError('Failed to load shopping list'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadStoredItems();
  }, [dispatch]);

  useEffect(() => {
    const saveStoredItems = async () => {
      try {
        await storage.saveItems(items);
        setSaveError(null);
      } catch (error) {
        setSaveError('Failed to save changes');
      }
    };

    const isInitialRender = history.length === 0;
    if (!isInitialRender) {
      saveStoredItems();
    }
  }, [items, history]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPurchased = showPurchased || !item.purchased;
    return matchesSearch && matchesCategory && matchesPurchased;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping List
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {saveError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {saveError}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <AddItemForm />
      </Paper>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showPurchased={showPurchased}
          onShowPurchasedChange={setShowPurchased}
        />

        <Button
          startIcon={<UndoIcon />}
          onClick={() => dispatch(undoLastAction())}
          disabled={history.length === 0}
        >
          Undo
        </Button>
      </Box>

      <ItemList items={filteredItems} />
    </Box>
  );
};

export default ShoppingList;
