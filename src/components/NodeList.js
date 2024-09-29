import React from 'react';

const NodeList = ({ nodes, onNodeSelect, onNodeRename }) => {
  return (
    <div className="node-list">
      <ul>
        {nodes.map((node) => (
          <li key={node.id} className="mb-2">
            <button
              onClick={() => onNodeSelect(node)}
              className="text-left py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              {node.data.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NodeList;