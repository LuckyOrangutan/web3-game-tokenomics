import React, { useState } from 'react';
import NodeSettings from './NodeSettings';

const NodeList = ({ nodes, onNodeSelect, onUpdateNode }) => {
  const [expandedNode, setExpandedNode] = useState(null);

  const handleNodeClick = (node) => {
    if (expandedNode === node.id) {
      setExpandedNode(null);
    } else {
      setExpandedNode(node.id);
      onNodeSelect(node);
    }
  };

  return (
    <div className="node-list">
      {nodes.map((node) => (
        <div key={node.id} className="mb-4">
          <div
            className="bg-gray-200 p-2 cursor-pointer"
            onClick={() => handleNodeClick(node)}
          >
            {node.data.label}
          </div>
          {expandedNode === node.id && (
            <NodeSettings node={node} onUpdate={onUpdateNode} />
          )}
        </div>
      ))}
    </div>
  );
};

export default NodeList;