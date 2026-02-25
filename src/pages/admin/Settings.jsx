import { Box, Divider, FormControl, Grid, MenuItem, TextField, Select } from "@mui/material";
import styled from "@mui/material/styles/styled";
import React, { useState } from "react";
import ActionIcon from "../../components/ActionIcon";
import Typography from "../../components/Typography";
import Sync from "@mui/icons-material/Sync";
import FilterList from "@mui/icons-material/FilterList";
import Add from "@mui/icons-material/Add";

const InputField = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1.3),
    },
}));

export default function Settings() {
    const sx = {
        divider: {
            marginTop: 2,
            marginBottom: 4,
        },

        select: {
            width: "120px",
            margin: (2.5, 0),
            "& .MuiOutlinedInput-input": {
                padding: 1.3,
            },
        },
    };
    const [server, setServer] = useState("");
    const [select, setSelect] = useState(false);

    const openSelect = () => {
        setSelect(true);
    };

    const closeSelect = () => {
        setSelect(false);
    };

    const onSelectHandler = e => {
        setServer(e.target.value);
    };

    return (
        <Box sx={sx.root}>
            <Grid container spacing={3} sx={sx.titleGrid}>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        Settings
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage your settings from here
                    </Typography>
                </Grid>
                <Grid item xs align="right">
                    <ActionIcon color="primary" title="Sync" icon={<Sync />} />
                    <ActionIcon color="primary" title="Filter" icon={<FilterList />} />
                    <ActionIcon color="primary" title="Add Contact" icon={<Add />} />
                </Grid>
            </Grid>
            <Divider light sx={sx.divider} />
            <Typography
                variant="subtitle1"
                gutterBottom
                style={{ textTransform: "uppercase", color: "#B8BCC1", fontWeight: "500" }}>
                Payment Gateway
            </Typography>
            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Public key
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <InputField fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={4}></Grid>
                <Divider light sx={sx.divider2} />
                <Grid item xs={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Secret key
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <InputField fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Divider light sx={sx.divider} />
            <Typography
                variant="subtitle1"
                gutterBottom
                style={{ textTransform: "uppercase", color: "#B8BCC1", fontWeight: "500" }}>
                server
            </Typography>

            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Select Server
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <FormControl sx={sx.formControl}>
                        <Select
                            variant="outlined"
                            sx={sx.select}
                            open={select}
                            onClose={closeSelect}
                            onOpen={openSelect}
                            value={server}
                            onChange={onSelectHandler}>
                            <MenuItem value={"server1"}>Server 1</MenuItem>
                            <MenuItem value={"server2"}>Server 2</MenuItem>
                            <MenuItem value={"server3"}>Server 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Box>
    );
}
