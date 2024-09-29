// src/components/ProfileSimulation.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';
import { fetchGameData } from '../api/gameData';

const ProfileSimulation = ({ profile, gameSettings, onBack }) => {
  const [simulationData, setSimulationData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Simulate data for the current profile
    const data = simulateProfileData(profile, gameSettings);
    setSimulationData(data);

    // Fetch comparison data from an API
    const getComparisonData = async () => {
      try {
        const data = await fetchGameData();
        setComparisonData(data);
      } catch (error) {
        console.error('Error fetching comparison data:', error);
        setComparisonData([]);  // Set to empty array or some default value
      }
    };

    // Fetch historical data (this would be replaced with a real API call)
    const getHistoricalData = async () => {
      const data = await fetchHistoricalData();
      setHistoricalData(data);
    };

    getComparisonData();
    getHistoricalData();
  }, [profile, gameSettings]);

  const simulateProfileData = (profile, settings) => {
    // Implement your simulation logic here
    // This is a placeholder implementation
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      players: Math.floor(1000 * Math.pow(1.1, i)),
      revenue: Math.floor(10000 * Math.pow(1.15, i)),
      tokenPrice: 1 + Math.random() * i * 0.1,
    }));
  };

  const fetchHistoricalData = async () => {
    // This would be replaced with a real API call
    return [
      { month: 'Jan', game1: 100000, game2: 150000, game3: 80000 },
      { month: 'Feb', game1: 120000, game2: 160000, game3: 90000 },
      // ... more months
    ];
  };

  return (
    <div className="profile-simulation">
      <button onClick={onBack} className="mb-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
        &larr; Back to Profiles
      </button>
      <h2 className="text-2xl font-bold mb-4">{profile.name} - Detailed Simulation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Player Growth</h3>
          <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={simulationData} 
                margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Month', position: 'insideBottom', offset: -10 }} 
                />
                <YAxis 
                  label={{ 
                    value: 'Number of Players', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: -5, 
                    dy: 50 
                  }} 
                />
                <Tooltip />
                <Legend verticalAlign="bottom" align="left" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="players" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Revenue</h3>
          <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={simulationData} 
                margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Month', position: 'insideBottom', offset: -10 }} 
                />
                <YAxis 
                  label={{ 
                    value: 'Revenue ($)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: -5, 
                    dy: 10 
                  }} 
                />
                <Tooltip />
                <Legend verticalAlign="bottom" align="left" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Token Price</h3>
          <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={simulationData} 
                margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Month', position: 'insideBottom', offset: -10 }} 
                />
                <YAxis 
                  label={{ 
                    value: 'Token Price ($)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: -5, 
                    dy: 10 
                  }} 
                />
                <Tooltip />
                <Legend verticalAlign="bottom" align="left" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="tokenPrice" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Comparison to Other Games</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th>Game</th>
                <th>Monthly Players</th>
                <th>Token Price</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((game) => (
                <tr key={game.name}>
                  <td>{game.name}</td>
                  <td>{game.monthlyPlayers.toLocaleString()}</td>
                  <td>${game.tokenPrice.toFixed(2)}</td>
                  <td>${game.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 col-span-2">
          <h3 className="text-xl font-bold mb-4">Historical Data</h3>
          <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft', offset: 0 }} />
                <Tooltip />
                <Legend verticalAlign="bottom" align="left" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="game1" fill="#8884d8" />
                <Bar dataKey="game2" fill="#82ca9d" />
                <Bar dataKey="game3" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSimulation;