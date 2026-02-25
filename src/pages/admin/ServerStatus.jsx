import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import ActionIcon from "../../components/ActionIcon";
import Typography from "../../components/Typography";
import Sync from "@mui/icons-material/Sync";
import FilterList from "@mui/icons-material/FilterList";
import Add from "@mui/icons-material/Add";

export default function ServerStatus() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        Users
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage your users from here
                    </Typography>
                </Grid>
                <Grid item xs align="right">
                    <ActionIcon color="primary" title="Sync" icon={<Sync />} />
                    <ActionIcon color="primary" title="Filter" icon={<FilterList />} />
                    <ActionIcon color="primary" title="Add Contact" icon={<Add />} />
                </Grid>
            </Grid>
            <Divider
                light
                sx={{
                    marginTop: 2,
                    marginBottom: 4,
                }}
            />
        </Box>
    );
}
