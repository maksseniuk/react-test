import React from 'react';
import { Box, TextField, MenuItem, FormControlLabel, Switch } from '@mui/material';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  showPurchased: boolean;
  onShowPurchasedChange: (value: boolean) => void;
}

const categories = ['all', 'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Pantry', 'Other'];

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showPurchased,
  onShowPurchasedChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        size="small"
        label="Search items"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />

      <TextField
        size="small"
        select
        label="Category"
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
      >
        {categories.map(category => (
          <MenuItem key={category} value={category}>
            {category === 'all' ? 'All Categories' : category}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Switch checked={showPurchased} onChange={e => onShowPurchasedChange(e.target.checked)} />
        }
        label="Show Purchased"
      />
    </Box>
  );
};

export default SearchFilter;
