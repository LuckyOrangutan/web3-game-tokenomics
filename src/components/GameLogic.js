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
import PlayerJourneySimulation from './PlayerJourneySimulation';
import NodeList from './NodeList';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Player Action', settings: {} },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Token Reward', settings: {} },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    data: { label: 'XP Gain', settings: {} },
    position: { x: 400, y: 125 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Player Progress', settings: {} },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];

const GameLogic = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [view, setView] = useState('chart'); // 'chart' or 'list'

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

  const addNewNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `New Node ${nodes.length + 1}`, settings: {} },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  const renderLeftPanel = () => (
    <div className="left-panel bg-gray-100 p-4 w-64">
      <button
        onClick={addNewNode}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
      >
        Add New Node
      </button>
      <button
        onClick={() => setView(view === 'chart' ? 'list' : 'chart')}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        {view === 'chart' ? 'Switch to List View' : 'Switch to Chart View'}
      </button>
    </div>
  );

  const renderMainContent = () => (
    <div className="main-content flex-grow">
      {view === 'chart' ? (
        <div style={{ height: '500px', width: '100%' }}>
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
        </div>
      ) : (
        <NodeList nodes={nodes} onNodeSelect={setSelectedNode} onUpdateNode={updateNodeSettings} />
      )}
      {selectedNode && view === 'chart' && (
        <NodeSettings node={selectedNode} onUpdate={updateNodeSettings} />
      )}
      <PlayerJourneySimulation nodes={nodes} edges={edges} />
    </div>
  );

  return (
    <div className="game-logic flex">
      {renderLeftPanel()}
      {renderMainContent()}
    </div>
  );
};

export default GameLogic;