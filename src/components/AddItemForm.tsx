import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, MenuItem, Stack } from '@mui/material';
import { addItem } from '../store/shoppingListSlice.ts';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Pantry', 'Other'];

const AddItemForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('Other');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Item name is required');
      return;
    }

    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    dispatch(
      addItem({
        id: uuidv4(),
        name: name.trim(),
        quantity,
        category,
        purchased: false,
      })
    );

    setName('');
    setQuantity(1);
    setCategory('Other');
    setError(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Box sx={{ flex: { sm: 4 } }}>
          <TextField
            fullWidth
            label="Item Name"
            value={name}
            onChange={e => setName(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </Box>
        <Box sx={{ flex: { sm: 2 } }}>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
          />
        </Box>
        <Box sx={{ flex: { sm: 4 } }}>
          <TextField
            fullWidth
            select
            label="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ flex: { sm: 2 } }}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Add Item
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddItemForm;
