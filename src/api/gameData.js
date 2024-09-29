// src/api/gameData.js
import axios from 'axios';

export const fetchGameData = async () => {
  // Replace this with your actual API endpoint
  const response = await axios.get('https://api.example.com/game-data');
  return response.data;
};