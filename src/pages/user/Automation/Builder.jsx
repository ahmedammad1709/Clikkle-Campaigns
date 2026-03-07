import React, { useState, useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls, addEdge, useNodesState, useEdgesState, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Button, TextField, Typography, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import api from '../../../utilities/axios';
import useSnack from '../../../hooks/useSnack';
import { useNavigate } from 'react-router-dom';

// --- Custom Nodes ---

const NodeStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #777', background: '#fff', minWidth: '150px', textAlign: 'center' };

const TriggerNode = ({ data }) => (
  <div style={{ ...NodeStyle, border: '2px solid #2e7d32' }}>
    <Handle type="source" position={Position.Bottom} />
    <strong>⚡ Trigger</strong>
    <div>{data.label}</div>
  </div>
);

const DelayNode = ({ data }) => (
  <div style={{ ...NodeStyle, border: '2px solid #f57c00' }}>
    <Handle type="target" position={Position.Top} />
    <strong>⏳ Delay</strong>
    <div>{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const ActionNode = ({ data }) => (
  <div style={{ ...NodeStyle, border: '2px solid #1976d2' }}>
    <Handle type="target" position={Position.Top} />
    <strong>✉️ Action</strong>
    <div>{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodeTypes = {
  trigger: TriggerNode,
  delay: DelayNode,
  action: ActionNode,
};

// --- Builder Component ---

export default function AutomationBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [name, setName] = useState('New Automation');
  const { showMessage } = useSnack();
  const navigate = useNavigate();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = (type) => {
    const id = `${type}-${Date.now()}`;
    const newNode = {
      id,
      type,
      position: { x: 250, y: nodes.length * 100 + 50 },
      data: { label: type === 'trigger' ? 'New Contact' : type === 'delay' ? 'Wait 1 Hour' : 'Send Email' },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const saveWorkflow = async () => {
    try {
      if (nodes.length === 0) return showMessage({ error: "Workflow cannot be empty" });

      const payload = {
        name,
        workflow: { nodes, edges },
        status: 'active'
      };

      // Assuming we are creating a new one. For edit, we'd need an ID.
      const res = await api.post('/user/automations', payload);
      if (res.data.success) {
        showMessage({ success: "Automation saved successfully!" });
        navigate('/automation'); // Go back to list
      }
    } catch (error) {
      console.error(error);
      showMessage({ error: "Failed to save automation" });
    }
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <TextField 
          label="Automation Name" 
          variant="outlined" 
          size="small" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <Box>
           <Button variant="outlined" onClick={() => addNode('trigger')} sx={{ mr: 1 }}>+ Trigger</Button>
           <Button variant="outlined" onClick={() => addNode('delay')} sx={{ mr: 1 }}>+ Delay</Button>
           <Button variant="outlined" onClick={() => addNode('action')} sx={{ mr: 1 }}>+ Action</Button>
           <Button variant="contained" color="primary" onClick={saveWorkflow}>Save Workflow</Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
    </Box>
  );
}
