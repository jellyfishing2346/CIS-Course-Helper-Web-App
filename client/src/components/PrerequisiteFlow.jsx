import React, { useState } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';

const PrerequisiteFlow = () => {
  const initialNodes = [
    {
      id: 'cisc1115',
      type: 'default',
      position: { x: 250, y: 25 },
      data: { label: 'CISC 1115\nIntro to Java' },
      style: { backgroundColor: '#2ecc71', color: 'white' }
    },
    {
      id: 'cisc2210',
      position: { x: 100, y: 125 },
      data: { label: 'CISC 2210\nDiscrete Structures' }
    },
    {
      id: 'cisc3115',
      position: { x: 400, y: 125 },
      data: { label: 'CISC 3115\nModern Programming' }
    },
    {
      id: 'cisc3130',
      position: { x: 250, y: 225 },
      data: { label: 'CISC 3130\nData Structures' }
    },
    {
      id: 'cisc3220',
      position: { x: 100, y: 325 },
      data: { label: 'CISC 3220\nAlgorithms' }
    },
    {
      id: 'cisc3320',
      position: { x: 400, y: 325 },
      data: { label: 'CISC 3320\nOperating Systems' }
    }
  ];

  const initialEdges = [
    { id: 'e1-2', source: 'cisc1115', target: 'cisc2210' },
    { id: 'e1-3', source: 'cisc1115', target: 'cisc3115' },
    { id: 'e3-4', source: 'cisc3115', target: 'cisc3130' },
    { id: 'e2-5', source: 'cisc2210', target: 'cisc3220' },
    { id: 'e4-5', source: 'cisc3130', target: 'cisc3220' },
    { id: 'e4-6', source: 'cisc3130', target: 'cisc3320' }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        🔗 Course Prerequisite Flow
      </h3>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default PrerequisiteFlow;
