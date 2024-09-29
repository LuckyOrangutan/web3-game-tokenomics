import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

const NodeList = ({ nodes, onNodeSelect, onNodeRename }) => {
  return (
    <div className="node-list">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="mb-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-100 flex items-center"
        >
          <PencilIcon
            className="h-4 w-4 mr-2 text-gray-500 hover:text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onNodeRename(node.id);
            }}
          />
          <div onClick={() => onNodeSelect(node)}>{node.data.label}</div>
        </div>
      ))}
    </div>
  );
};

export default NodeList;