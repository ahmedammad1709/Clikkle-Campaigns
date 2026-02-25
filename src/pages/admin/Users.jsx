import { Box, Divider, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import ActionIcon from "../../components/ActionIcon";
import Typography from "../../components/Typography";
import Sync from "@mui/icons-material/Sync";
import FilterList from "@mui/icons-material/FilterList";
import Add from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";

import useHttpErrorHandler from "./../../utilities/httpErrorHandler";
import api from "../../utilities/axios";

const columns = [
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: false,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: false,
    },
    {
        field: "phone",
        headerName: "Phone Number",
        type: "number",
        width: 180,
        editableL: false,
    },
];

const Users = () => {
    const [rows, setRows] = useState([]);
    const httpErrorHandler = useHttpErrorHandler();

    const getRows = useCallback(
        async function () {
            try {
                const response = await api.get(`/admin/users`, {});
                setRows(createRows(response.data.data));
            } catch (e) {
                httpErrorHandler(e);
            }
        },
        [setRows, httpErrorHandler]
    );

    function createRows(contacts) {
        return contacts.map((contacts, index) => ({ ...contacts, id: index }));
    }
    useEffect(() => {
        getRows();
    }, [getRows]);

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
            <Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    autoHeight
                    checkboxSelection
                    disableSelectionOnClick
                    style={{ width: "100%" }}
                />
            </Box>
        </Box>
    );
};

export default Users;
