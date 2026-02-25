import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Modal,
} from "@mui/material";
import Typography from "../../../components/Typography";
import ActionIcon from "../../../components/ActionIcon";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useContext } from "react";

import { functions } from "./SignUpForm";
import { Link } from "react-router-dom";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import api from "../../../utilities/axios";

export default function Entries(props) {
    const [deleteMsg, setDeleteMsg] = useState(false);
    const { label, lastEditOn, id, index, onChange, selected } = props;
    const [deleting, setDeleting] = useState(false);
    const { getForms, showMessage } = useContext(functions);
    const httpErrorHandler = useHttpErrorHandler();

    const openDeleteModal = () => {
        setDeleteMsg(true);
    };

    const closeDeleteModal = () => {
        setDeleteMsg(false);
    };

    const deleteForm = async () => {
        setDeleting(true);
        try {
            const response = await api.patch(
                 `/user/signupforms/delete`,
                {
                    ids: id,
                },
                {}
            );

            if (response.data.success) {
                showMessage({ success: response.data.message });
            } else {
                showMessage({ error: response.data.message });
            }
        } catch (e) {
            httpErrorHandler(e);
        }
        getForms();
        closeDeleteModal();
        setDeleting(false);
    };

    return (
        <>
            <div
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    cursor: "default",
                }}>
                <Grid container spacing={1} justifyContent="flex-start" alignItems="flex-start">
                    <Grid item>
                        <FormControlLabel
                            value="end"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={selected}
                                    onChange={e => onChange(e.target.checked, index)}
                                />
                            }
                            sx={{ mr: 0 }}
                        />
                    </Grid>
                    <Grid item>
                        <Box
                            component="img"
                            src="/images/formimg.svg"
                            style={{ maxWidth: "50px" }}
                        />
                    </Grid>
                    <Grid item style={{ paddingLeft: "8px" }}>
                        <Typography variant="h5" color="primary">
                            {label}
                        </Typography>
                        <Typography variant="body2" component="div">
                            <b>Created </b> on {lastEditOn}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm align="right" sx={{ mt: 1 }}>
                        <Button
                            variant="contained"
                            component={Link}
                            to={`/contacts/signup-forms/view/${id}`}
                            color="secondary"
                            disableRipple
                            disableTouchRipple>
                            View
                        </Button>
                        <ActionIcon
                            // color="secondary"
                            title="Delete"
                            icon={<DeleteOutlined />}
                            onClick={openDeleteModal}
                        />
                    </Grid>
                </Grid>
            </div>
            <Divider
                light
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                }}
            />
            <Modal
                open={deleteMsg}
                onClose={closeDeleteModal}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Container maxWidth="sm">
                    <Card style={{ width: "100%", padding: "32px" }}>
                        <Typography variant="h6">Do you want to delete {label} ?</Typography>
                        <div style={{ paddingTop: "16px", float: "right" }}>
                            <Button
                                variant="secondary"
                                onClick={closeDeleteModal}
                                disableRipple
                                disabled={deleting}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginLeft: "16px" }}
                                onClick={deleteForm}
                                disabled={deleting}
                                startIcon={<DeleteIcon />}>
                                Delete
                                {deleting ? (
                                    <CircularProgress
                                        size="20px"
                                        style={{ marginLeft: "8px", color: "white" }}
                                    />
                                ) : null}
                            </Button>
                        </div>
                    </Card>
                </Container>
            </Modal>
        </>
    );
}
