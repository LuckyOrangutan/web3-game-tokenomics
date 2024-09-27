import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const TokenAllocation = () => {
  const [allocations, setAllocations] = useState([
    { name: 'Play to Earn Incentives', percentage: 55, totalSupply: 55000000, unlockSchedule: '5m tokens unlocked, 50m tokens to be unlocked linearly over 5 years.' },
    { name: 'Ecosystem Fund', percentage: 5, totalSupply: 5000000, unlockSchedule: 'Tokens to be unlocked linearly over 3 years.' },
    { name: 'Team', percentage: 15, totalSupply: 15000000, unlockSchedule: 'Tokens to begin unlocking linearly after 12 months, fully unlocked after 5 years.' },
    { name: 'Private Sale', percentage: 5, totalSupply: 5000000, unlockSchedule: 'Tokens to be unlocked linearly over 3 years.' },
    { name: 'Initial DEX Offering', percentage: 5, totalSupply: 5000000, unlockSchedule: 'Fully unlocked for initial sale and liquidity.' },
    { name: 'Liquidity & Market Making', percentage: 15, totalSupply: 15000000, unlockSchedule: 'Tokens to be unlocked linearly over 18 months.' },
  ]);

  const [totalSupply, setTotalSupply] = useState(100000000);

  useEffect(() => {
    const newTotalSupply = allocations.reduce((sum, allocation) => sum + allocation.totalSupply, 0);
    setTotalSupply(newTotalSupply);
  }, [allocations]);

  const handleAllocationChange = (index, field, value) => {
    const newAllocations = [...allocations];
    newAllocations[index][field] = value;
    if (field === 'percentage') {
      newAllocations[index].totalSupply = Math.round(value / 100 * totalSupply);
    } else if (field === 'totalSupply') {
      newAllocations[index].percentage = Math.round((value / totalSupply) * 100);
    }
    setAllocations(newAllocations);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Token Allocation</h2>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={allocations}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="percentage"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {allocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h3 className="text-xl font-semibold mb-2">Adjust Allocations</h3>
          <div className="space-y-4">
            {allocations.map((allocation, index) => (
              <div key={index} className="flex flex-wrap items-center">
                <div className="w-full sm:w-1/3 font-medium">{allocation.name}</div>
                <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
                  <input
                    type="number"
                    value={allocation.percentage}
                    onChange={(e) => handleAllocationChange(index, 'percentage', Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                  <div className="text-sm text-gray-500">Percentage</div>
                </div>
                <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
                  <input
                    type="number"
                    value={allocation.totalSupply}
                    onChange={(e) => handleAllocationChange(index, 'totalSupply', Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                  <div className="text-sm text-gray-500">Total Supply</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Unlock Schedules</h3>
        <ul className="list-disc pl-5 space-y-2">
          {allocations.map((allocation, index) => (
            <li key={index}>
              <span className="font-medium">{allocation.name}:</span> {allocation.unlockSchedule}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-center text-xl font-bold">
        Total Supply: {totalSupply.toLocaleString()}
      </div>
    </div>
  );
};

export default TokenAllocation;