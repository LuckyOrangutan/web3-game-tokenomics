import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import NodeSettings from './NodeSettings.js';
import NodeList from './NodeList.js';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'New Node', settings: {} },
    position: { x: 250, y: 150 },
    style: { width: 150, height: 50 },
  },
];

const initialEdges = [];

const GameLogic = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeSettings = useCallback((nodeId, settings) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, settings };
        }
        return node;
      })
    );
  }, [setNodes]);

  const closeNodeSettings = () => {
    setSelectedNode(null);
  };

  const addNewNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'default',
      data: { label: `New Node ${nodes.length + 1}`, settings: {} },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      style: { width: 150, height: 50 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  const onNodeRename = useCallback((nodeId) => {
    const newLabel = prompt('Enter new node name:');
    if (newLabel) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, label: newLabel };
          }
          return node;
        })
      );
    }
  }, [setNodes]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nodes</h2>
          <button
            onClick={addNewNode}
            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-blue-600 transition-colors duration-300"
          >
            +
          </button>
        </div>
        <NodeList
          nodes={nodes}
          onNodeSelect={setSelectedNode}
          onNodeRename={onNodeRename}
        />
      </div>
      <div className="w-3/4 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        {selectedNode && (
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Node Settings</h2>
              <button
                onClick={closeNodeSettings}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Close
              </button>
            </div>
            <NodeSettings
              node={selectedNode}
              onUpdate={updateNodeSettings}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLogic;