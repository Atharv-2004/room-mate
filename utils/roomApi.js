const axios = require('axios');

const BASE_URL = 'https://bot9assignement.deno.dev';

async function getRoomOptions() {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room options:', error);
    throw error;
  }
}

async function bookRoom(roomId, fullName, email, nights) {
  try {
    const response = await axios.post(`${BASE_URL}/book`, {
      roomId,
      fullName,
      email,
      nights
    });
    return response.data;
  } catch (error) {
    console.error('Error booking room:', error);
    throw error;
  }
}

module.exports = { getRoomOptions, bookRoom };