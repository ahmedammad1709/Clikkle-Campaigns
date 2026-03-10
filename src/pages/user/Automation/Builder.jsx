import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactFlow, ReactFlowProvider, Background, Controls, addEdge, useNodesState, useEdgesState, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import api from '../../../utilities/axios';
import useSnack from '../../../hooks/useSnack';
import useHttpErrorHandler from '../../../utilities/httpErrorHandler';
import { useNavigate, useParams } from 'react-router-dom';

const NodeStyle = { padding: 10, borderRadius: 6, border: '1px solid #777', background: '#fff', minWidth: 170, textAlign: 'center' };

function TriggerNode({ data }) {
  return (
    <div style={{ ...NodeStyle, border: '2px solid #2e7d32' }}>
      <Handle type="source" position={Position.Bottom} />
      <Typography variant="subtitle2">Trigger</Typography>
      <Typography variant="body2">{data.label}</Typography>
    </div>
  );
}

function DelayNode({ data }) {
  return (
    <div style={{ ...NodeStyle, border: '2px solid #f57c00' }}>
      <Handle type="target" position={Position.Top} />
      <Typography variant="subtitle2">Delay</Typography>
      <Typography variant="body2">{data.label}</Typography>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function ConditionNode({ data }) {
  return (
    <div style={{ ...NodeStyle, border: '2px solid #7b1fa2' }}>
      <Handle type="target" position={Position.Top} />
      <Typography variant="subtitle2">Condition</Typography>
      <Typography variant="body2">{data.label}</Typography>
      <Handle type="source" id="true" position={Position.Bottom} style={{ left: 45, background: '#2e7d32' }} />
      <Handle type="source" id="false" position={Position.Bottom} style={{ left: 125, background: '#d32f2f' }} />
    </div>
  );
}

function ActionNode({ data }) {
  return (
    <div style={{ ...NodeStyle, border: '2px solid #1976d2' }}>
      <Handle type="target" position={Position.Top} />
      <Typography variant="subtitle2">Action</Typography>
      <Typography variant="body2">{data.label}</Typography>
    </div>
  );
}

const nodeTypes = { trigger: TriggerNode, delay: DelayNode, condition: ConditionNode, action: ActionNode };

function BuilderInner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const httpErrorHandler = useHttpErrorHandler();
  const { showMessage } = useSnack();

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [name, setName] = useState('New Automation');
  const [status, setStatus] = useState('draft');
  const [triggerType, setTriggerType] = useState('contact_added');

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId) || null, [nodes, selectedNodeId]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/user/automations/${id}`);
        if (!res.data.success) return;
        const automation = res.data.automation;
        setName(automation.name || 'Automation');
        setStatus(automation.status || 'draft');
        setTriggerType(automation.triggerType || 'contact_added');
        setNodes(automation.workflow?.nodes || []);
        setEdges(automation.workflow?.edges || []);
      } catch (e) {
        httpErrorHandler(e);
      }
    })();
  }, [id, httpErrorHandler, setEdges, setNodes]);

  const onConnect = useCallback(
    (params) => {
      const edge = {
        ...params,
        label: params.sourceHandle || '',
        data: { branch: params.sourceHandle || null },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const makeDefaultNode = (type, position) => {
    const nodeId = `${type}-${Date.now()}`;
    if (type === 'trigger') {
      return { id: nodeId, type, position, data: { label: 'New Contact Added' } };
    }
    if (type === 'delay') {
      return { id: nodeId, type, position, data: { label: 'Wait 1 hour', delayMs: 60 * 60 * 1000 } };
    }
    if (type === 'condition') {
      return {
        id: nodeId,
        type,
        position,
        data: { label: 'If subscribed = true', condition: { field: 'subscribed', operator: 'equals', value: 'true' } },
      };
    }
    return {
      id: nodeId,
      type,
      position,
      data: { label: 'Send Email', actionType: 'send_email', subject: 'Welcome', html: '<p>Hello!</p>', text: 'Hello!' },
    };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const clientPoint = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      const position = typeof reactFlowInstance.project === 'function' ? reactFlowInstance.project(clientPoint) : clientPoint;

      setNodes((nds) => nds.concat(makeDefaultNode(type, position)));
    },
    [reactFlowInstance, setNodes]
  );

  const updateSelectedNodeData = (patch) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id !== selectedNode.id) return n;
        return { ...n, data: { ...n.data, ...patch } };
      })
    );
  };

  const saveWorkflow = async () => {
    try {
      if (nodes.length === 0) return showMessage({ error: 'Workflow cannot be empty' });
      const payload = {
        name,
        status,
        triggerType,
        workflow: { nodes, edges, conditions: [] },
      };
      const res = id ? await api.patch(`/user/automations/${id}`, payload) : await api.post('/user/automations', payload);
      if (res.data.success) {
        showMessage({ success: 'Automation saved successfully!' });
        navigate('/automation');
      } else {
        showMessage({ error: res.data.message || 'Failed to save automation' });
      }
    } catch (e) {
      httpErrorHandler(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '82vh' }}>
      <Box sx={{ width: 260, borderRight: '1px solid #ddd', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Builder
        </Typography>
        <TextField fullWidth label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)} />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="draft">draft</MenuItem>
              <MenuItem value="active">active</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Trigger</InputLabel>
            <Select label="Trigger" value={triggerType} onChange={(e) => setTriggerType(e.target.value)}>
              <MenuItem value="contact_added">New Contact Added</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Drag Nodes
        </Typography>
        <Box
          draggable
          onDragStart={(e) => onDragStart(e, 'trigger')}
          sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1, mb: 1, cursor: 'grab' }}
        >
          Trigger
        </Box>
        <Box
          draggable
          onDragStart={(e) => onDragStart(e, 'delay')}
          sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1, mb: 1, cursor: 'grab' }}
        >
          Delay
        </Box>
        <Box
          draggable
          onDragStart={(e) => onDragStart(e, 'condition')}
          sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1, mb: 1, cursor: 'grab' }}
        >
          Condition
        </Box>
        <Box
          draggable
          onDragStart={(e) => onDragStart(e, 'action')}
          sx={{ border: '1px solid #ddd', borderRadius: 1, p: 1, mb: 2, cursor: 'grab' }}
        >
          Action
        </Box>

        <Button fullWidth variant="contained" onClick={saveWorkflow}>
          Save Workflow
        </Button>

        {selectedNode && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Selected Node
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Label"
              value={selectedNode.data?.label || ''}
              onChange={(e) => updateSelectedNodeData({ label: e.target.value })}
              sx={{ mb: 1 }}
            />

            {selectedNode.type === 'delay' && (
              <TextField
                fullWidth
                size="small"
                label="Delay (ms)"
                type="number"
                value={selectedNode.data?.delayMs || 0}
                onChange={(e) => updateSelectedNodeData({ delayMs: Number(e.target.value || 0) })}
                sx={{ mb: 1 }}
              />
            )}

            {selectedNode.type === 'condition' && (
              <Box>
                <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                  <InputLabel>Field</InputLabel>
                  <Select
                    label="Field"
                    value={selectedNode.data?.condition?.field || 'subscribed'}
                    onChange={(e) =>
                      updateSelectedNodeData({
                        condition: { ...(selectedNode.data?.condition || {}), field: e.target.value },
                      })
                    }
                  >
                    <MenuItem value="subscribed">subscribed</MenuItem>
                    <MenuItem value="email">email</MenuItem>
                    <MenuItem value="firstName">firstName</MenuItem>
                    <MenuItem value="lastName">lastName</MenuItem>
                    <MenuItem value="engagement">engagement</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                  <InputLabel>Operator</InputLabel>
                  <Select
                    label="Operator"
                    value={selectedNode.data?.condition?.operator || 'equals'}
                    onChange={(e) =>
                      updateSelectedNodeData({
                        condition: { ...(selectedNode.data?.condition || {}), operator: e.target.value },
                      })
                    }
                  >
                    <MenuItem value="equals">equals</MenuItem>
                    <MenuItem value="contains">contains</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  label="Value"
                  value={selectedNode.data?.condition?.value ?? ''}
                  onChange={(e) =>
                    updateSelectedNodeData({
                      condition: { ...(selectedNode.data?.condition || {}), value: e.target.value },
                    })
                  }
                  sx={{ mb: 1 }}
                />
              </Box>
            )}

            {selectedNode.type === 'action' && (
              <Box>
                <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                  <InputLabel>Action Type</InputLabel>
                  <Select
                    label="Action Type"
                    value={selectedNode.data?.actionType || 'send_email'}
                    onChange={(e) => updateSelectedNodeData({ actionType: e.target.value })}
                  >
                    <MenuItem value="send_email">send_email</MenuItem>
                    <MenuItem value="send_campaign">send_campaign</MenuItem>
                  </Select>
                </FormControl>
                {selectedNode.data?.actionType === 'send_campaign' ? (
                  <TextField
                    fullWidth
                    size="small"
                    label="Campaign ID"
                    value={selectedNode.data?.campaignId || ''}
                    onChange={(e) => updateSelectedNodeData({ campaignId: e.target.value })}
                    sx={{ mb: 1 }}
                  />
                ) : (
                  <Box>
                    <TextField
                      fullWidth
                      size="small"
                      label="Subject"
                      value={selectedNode.data?.subject || ''}
                      onChange={(e) => updateSelectedNodeData({ subject: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Text"
                      value={selectedNode.data?.text || ''}
                      onChange={(e) => updateSelectedNodeData({ text: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="HTML"
                      value={selectedNode.data?.html || ''}
                      onChange={(e) => updateSelectedNodeData({ html: e.target.value })}
                      multiline
                      minRows={3}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
    </Box>
  );
}

export default function AutomationBuilder() {
  return (
    <ReactFlowProvider>
      <BuilderInner />
    </ReactFlowProvider>
  );
}
