import { Box, Button, Card, Divider, Grid, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import ActionIcon from "../../components/ActionIcon";

import Typography from "../../components/Typography";
import Sync from "@mui/icons-material/Sync";
import FilterList from "@mui/icons-material/FilterList";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";

const InputField = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1.3),
    },
}));
export default function AddNewTemplate() {
    const classes = {
        root: {},
        titleGrid: {},
        divider: {
            marginTop: 2,
            marginBottom: 3.15,
        },
        divider2: {
            marginTop: 1,
            marginBottom: 1,
        },
        uploadImage: {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            transition: "300ms",
            "&:hover": {
                background: "rgba(0, 0, 0, 0.5)",
            },
        },
    };
    const [image, setImage] = useState(null);

    const onImageChange = e => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImage(url);
    };

    return (
        <Box sx={classes.root}>
            <Grid container spacing={3} sx={classes.titleGrid}>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        Add New Template
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage your users from here
                    </Typography>
                </Grid>
                <Grid item xs align="right">
                    <ActionIcon color="primary" title="Sync" icon={<Sync />} />
                    <ActionIcon color="primary" title="Filter" icon={<FilterList />} />
                </Grid>
            </Grid>
            <Divider light sx={classes.divider} />
            <Card>
                <Grid container>
                    <Grid item xs={9}>
                        <Grid container style={{ padding: "40px" }} alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" color="textPrimary">
                                    Name
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <InputField fullWidth variant="outlined" />
                            </Grid>
                            <Divider light sx={classes.divider2} />
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" color="textPrimary">
                                    Price
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <InputField fullWidth variant="outlined" />
                            </Grid>
                            <Divider light sx={classes.divider2} />
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" color="textPrimary">
                                    HTML Template
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    style={{ margin: "10px 0" }}>
                                    Upload File
                                    <input type="file" hidden onChange={onImageChange} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} style={{ padding: "24px" }}>
                        <div sx={classes.uploadImage}>
                            <CameraEnhanceIcon style={{ fontSize: "50px" }} />
                            <Typography variant="subtitle1" style={{ letterSpacing: "2px" }}>
                                Upload Photo
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                {image ? (
                    <Box p={3} style={{ height: "250px" }}>
                        <img src={image} style={{ height: "100%" }} alt="template display" />
                    </Box>
                ) : (
                    ""
                )}
            </Card>
        </Box>
    );
}
