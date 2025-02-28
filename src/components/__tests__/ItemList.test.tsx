import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import ItemList from '../ItemList';
import { mockShoppingItem } from '../../utils/test-utils';

describe('ItemList', () => {
  it('renders empty state message when no items', () => {
    renderWithProviders(<ItemList items={[]} />);
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });

  it('renders shopping items correctly', () => {
    renderWithProviders(<ItemList items={[mockShoppingItem]} />);

    expect(screen.getByText(mockShoppingItem.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockShoppingItem.quantity} × ${mockShoppingItem.category}`)
    ).toBeInTheDocument();
  });

  it('opens edit dialog when clicking edit button', () => {
    renderWithProviders(<ItemList items={[mockShoppingItem]} />);

    fireEvent.click(screen.getByLabelText(/edit/i));

    expect(screen.getByText(/edit item/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockShoppingItem.name)).toBeInTheDocument();
  });

  it('removes item when clicking delete button', () => {
    const { store } = renderWithProviders(<ItemList items={[mockShoppingItem]} />);

    fireEvent.click(screen.getByLabelText(/delete/i));

    const state = store.getState();
    expect(state.shoppingList.items).toHaveLength(0);
  });
});
