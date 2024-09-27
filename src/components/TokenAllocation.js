import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import '../styles/TokenAllocation.css';
import CustomTooltip from './Tooltips';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

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
    <div className="token-allocation grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="token-allocation__chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={allocations}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="percentage"
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
      <div className="token-allocation__settings">
        <h3 className="text-xl font-semibold mb-4">Adjust Allocations</h3>
        {allocations.map((allocation, index) => (
          <div key={index} className="input-group mb-4">
            <label className="label-text flex items-center">
              {allocation.name}
              <CustomTooltip content={allocation.unlockSchedule}>
                <span className="ml-2 inline-block w-5 h-5 bg-gray-300 rounded-full text-gray-600 font-bold text-xs flex items-center justify-center cursor-help">
                  ?
                </span>
              </CustomTooltip>
            </label>
            <input
              type="number"
              value={allocation.percentage}
              onChange={(e) => handleAllocationChange(index, 'percentage', Number(e.target.value))}
              className="input-field mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenAllocation;