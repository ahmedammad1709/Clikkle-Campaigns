import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Chip,
    CircularProgress
} from '@mui/material';
import { Add, PlayArrow, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../utilities/axios';
import useSnack from '../../../hooks/useSnack';
import useHttpErrorHandler from '../../../utilities/httpErrorHandler';

export default function Automation() {
    const [automations, setAutomations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showMessage } = useSnack();
    const httpErrorHandler = useHttpErrorHandler();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAutomations();
    }, []);

    const fetchAutomations = async () => {
        try {
            const res = await api.get('/user/automations');
            if (res.data.success) {
                setAutomations(res.data.automations);
            }
        } catch (error) {
            httpErrorHandler(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTestRun = async (automationId) => {
        const contactId = prompt("Enter a Contact ID to test with:");
        if (contactId === null) return;

        try {
            const res = await api.post('/user/automations/test-trigger', {
                automationId,
                contactId: contactId || undefined
            });
            if (res.data.success) {
                showMessage({ success: "Test run started! Check your email/logs." });
            }
        } catch (error) {
            httpErrorHandler(error);
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Automations</Typography>
                <Button 
                    variant="contained" 
                    startIcon={<Add />} 
                    component={Link} 
                    to="/automation/builder"
                >
                    Create Automation
                </Button>
            </Box>

            <Grid container spacing={3}>
                {automations.map((automation) => (
                    <Grid item xs={12} md={6} lg={4} key={automation._id}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start">
                                    <Box>
                                        <Typography variant="h6">{automation.name}</Typography>
                                        <Chip 
                                            label={automation.status} 
                                            color={automation.status === 'active' ? 'success' : 'default'} 
                                            size="small" 
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                    <Box>
                                        <IconButton onClick={() => navigate(`/automation/builder/${automation._id}`)}>
                                            <Edit />
                                        </IconButton>
                                    </Box>
                                </Box>
                                
                                <Box mt={2}>
                                    <Typography variant="body2" color="textSecondary">
                                        Nodes: {automation.workflow?.nodes?.length || 0}
                                    </Typography>
                                </Box>

                                <Box mt={3} display="flex" justifyContent="flex-end">
                                    <Button 
                                        variant="outlined" 
                                        size="small" 
                                        startIcon={<PlayArrow />}
                                        onClick={() => handleTestRun(automation._id)}
                                    >
                                        Test Run
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {automations.length === 0 && (
                    <Grid item xs={12}>
                        <Box textAlign="center" py={5}>
                            <Typography color="textSecondary">No automations found. Create one to get started!</Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
