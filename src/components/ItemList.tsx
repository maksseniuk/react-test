import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Dialog,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  ShoppingItem,
  updateItem,
  removeItem,
  togglePurchased,
} from '../store/shoppingListSlice.ts';

interface ItemListProps {
  items: ShoppingItem[];
}

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Pantry', 'Other'];

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const dispatch = useDispatch();
  const [editItem, setEditItem] = useState<ShoppingItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState(1);
  const [editCategory, setEditCategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEditOpen = (item: ShoppingItem) => {
    setEditItem(item);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditCategory(item.category);
    setError(null);
  };

  const handleEditClose = () => {
    setEditItem(null);
    setError(null);
  };

  const handleEditSave = () => {
    if (!editName.trim()) {
      setError('Item name is required');
      return;
    }

    if (editQuantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    if (editItem) {
      dispatch(
        updateItem({
          ...editItem,
          name: editName.trim(),
          quantity: editQuantity,
          category: editCategory,
        })
      );
      handleEditClose();
    }
  };

  if (items.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
        No items found. Add some items to your shopping list!
      </Typography>
    );
  }

  return (
    <>
      <List>
        {items.map(item => (
          <ListItem
            key={item.id}
            sx={{
              bgcolor: 'background.paper',
              mb: 1,
              borderRadius: 1,
              opacity: item.purchased ? 0.7 : 1,
            }}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditOpen(item)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={item.purchased}
              onChange={() => dispatch(togglePurchased(item.id))}
            />
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: item.purchased ? 'line-through' : 'none',
                  }}
                >
                  {item.name}
                </Typography>
              }
              secondary={`${item.quantity} × ${item.category}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={!!editItem} onClose={handleEditClose}>
        <Box sx={{ p: 3, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Edit Item
          </Typography>
          <TextField
            fullWidth
            label="Item Name"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={editQuantity}
            onChange={e => setEditQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={editCategory}
            onChange={e => setEditCategory(e.target.value)}
            sx={{ mb: 3 }}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ItemList;
