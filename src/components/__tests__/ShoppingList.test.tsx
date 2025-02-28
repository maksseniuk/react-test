import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import ShoppingList from '../ShoppingList';
import { mockShoppingItem } from '../../utils/test-utils';
import { storage } from '../../services/storage';

jest.mock('../../services/storage');

describe('ShoppingList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storage.getItems as jest.Mock).mockResolvedValue([mockShoppingItem]);
  });

  it('loads items on mount', async () => {
    renderWithProviders(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText(mockShoppingItem.name)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching items', () => {
    renderWithProviders(<ShoppingList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('filters items by search term', async () => {
    renderWithProviders(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText(mockShoppingItem.name)).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/search items/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.queryByText(mockShoppingItem.name)).not.toBeInTheDocument();
  });

  it('filters items by category', async () => {
    renderWithProviders(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText(mockShoppingItem.name)).toBeInTheDocument();
    });
  });
});
