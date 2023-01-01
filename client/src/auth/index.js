import axios from 'axios';

const url = 'http://localhost:5000/api';

export async function getProtectedRoute() {
    try {
      const response = await axios.get(`${url}/protected-route`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      return response;
    } catch(error) {
      
      throw error;
    }
  }
  