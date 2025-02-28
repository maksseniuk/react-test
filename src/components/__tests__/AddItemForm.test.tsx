import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import AddItemForm from '../AddItemForm';

describe('AddItemForm', () => {
  it('renders all form fields', () => {
    renderWithProviders(<AddItemForm />);

    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', () => {
    renderWithProviders(<AddItemForm />);

    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    expect(screen.getByText(/item name is required/i)).toBeInTheDocument();
  });

  it('shows error when quantity is less than 1', () => {
    renderWithProviders(<AddItemForm />);

    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
  });

  it('successfully submits form with valid data', () => {
    const { store } = renderWithProviders(<AddItemForm />);

    fireEvent.change(screen.getByLabelText(/item name/i), {
      target: { value: 'Test Item' },
    });
    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    const state = store.getState();
    expect(state.shoppingList.items).toHaveLength(1);
    expect(state.shoppingList.items[0].name).toBe('Test Item');
    expect(state.shoppingList.items[0].quantity).toBe(2);
  });
});
