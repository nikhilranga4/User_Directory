import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async fetchUsers(page = 1, limit = 10) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          _page: page,
          _limit: limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async fetchUserById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }
};