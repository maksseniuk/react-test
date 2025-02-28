const STORAGE_KEY = 'shopping-list';
const SIMULATED_DELAY = 500; // milliseconds

export const storage = {
  async getItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const items = localStorage.getItem(STORAGE_KEY);
          resolve(items ? JSON.parse(items) : []);
        } catch (error) {
          reject(new Error('Failed to load shopping list'));
        }
      }, SIMULATED_DELAY);
    });
  },

  async saveItems(items: []) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
          resolve(true);
        } catch (error) {
          reject(new Error('Failed to save shopping list'));
        }
      }, SIMULATED_DELAY);
    });
  },
};
