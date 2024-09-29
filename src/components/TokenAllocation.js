import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import '../styles/TokenAllocation.css';
import CustomTooltip from './Tooltips';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const TokenAllocation = ({ allocations, setAllocations }) => {
  const [view, setView] = useState('display');

  const handleAllocationChange = (index, field, value) => {
    const newAllocations = [...allocations];
    newAllocations[index][field] = value;
    if (field === 'percentage') {
      newAllocations[index].totalSupply = Math.round(value / 100 * getTotalSupply());
    } else if (field === 'totalSupply') {
      newAllocations[index].percentage = Math.round((value / getTotalSupply()) * 100);
    }
    setAllocations(newAllocations);
  };

  const getTotalSupply = () => allocations.reduce((sum, allocation) => sum + allocation.totalSupply, 0);

  const renderSettings = () => (
    <div className="token-allocation__settings">
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
  );

  const renderDisplay = () => (
    <div className="token-allocation__chart">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={allocations}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="percentage"
            labelLine={false}
            label={null}
          >
            {allocations.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="token-allocation__total-supply">
        <div className="token-allocation__total-supply-title">Total Supply</div>
        <div className="token-allocation__total-supply-value">{getTotalSupply().toLocaleString()}</div>
      </div>
    </div>
  );

  return (
    <div className="token-allocation">
      <div className="token-allocation__controls">
        <button
          className={`button ${view === 'display' ? 'active' : ''}`}
          onClick={() => setView('display')}
        >
          Display
        </button>
        <button
          className={`button ${view === 'settings' ? 'active' : ''}`}
          onClick={() => setView('settings')}
        >
          Settings
        </button>
      </div>
      {view === 'display' ? renderDisplay() : renderSettings()}
    </div>
  );
};

export default TokenAllocation;