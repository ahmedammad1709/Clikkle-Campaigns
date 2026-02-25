import { Box, Button, Chip, CircularProgress, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import React, { useCallback, useContext, useEffect, useState } from "react";
import Typography from "../../../components/Typography";
import fetchTags from "../../../services/fetchTags";
import { functions } from "./AllContacts";
import { useAuthorize } from "../../../hooks/Authorize";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import api from "../../../utilities/axios";

export default function AddTagDialog(props) {
    const { updateRows, handleClose } = props;
    const { selectedContacts } = useContext(functions);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showMessage } = useContext(functions);
    const [allTags, setAllTags] = useState([]);
    const httpErrorHandler = useHttpErrorHandler();

    const authorize = useAuthorize();

    const getTags = useCallback(async () => {
        try {
            const response = await fetchTags();
            setAllTags(response);
        } catch (e) {
            httpErrorHandler(e);
        }
    }, [setAllTags, httpErrorHandler]);

    useEffect(() => {
        getTags();
    }, [getTags]);

    const handleDelete = i => {
        const selectedTags = [...tags]; //use state tag
        const deletedElement = selectedTags.splice(i, 1);
        setAllTags([...allTags, ...deletedElement]);
        setTags(selectedTags);
    };

    const addTag = (e, newValue) => {
        setTags([...tags, newValue]);
        setAllTags(allTags.filter(tag => tag._id !== newValue._id));
    };

    const addTags = async () => {
        setLoading(true);
        try {
            const response = await api.patch(`/user/contacts/tag`, {
                tags: tags.map(tag => tag._id),
                contacts: selectedContacts.map(contact => contact._id),
            });
            if (response.data.success) {
                showMessage({ success: response.data.message });
            } else {
                showMessage({ error: response.data.message });
            }
        } catch (e) {
            authorize(false);
            httpErrorHandler(e);
        }
        setLoading(false);
        handleClose();
        updateRows();
    };
    return (
        <Box style={{ border: "1px solid rgba(255, 255, 255, 0.12)", width: "450px" }} p={1}>
            <Typography variant="h6" component="span">
                Add Tags
            </Typography>

            <Autocomplete
                options={allTags}
                getOptionLabel={option => option.name}
                style={{ marginTop: "16px" }}
                onChange={addTag}
                renderInput={params => (
                    <TextField {...params} label="Search tags" fullWidth variant="outlined" />
                )}
            />
            <div
                sx={{
                    width: "400px",
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    "& > *": {
                        margin: 0.5,
                    },
                }}>
                {tags.map((tag, i) => {
                    return (
                        <Chip
                            variant="outlined"
                            size="small"
                            label={tag.name}
                            color="primary"
                            onDelete={() => handleDelete(i)}
                            key={tag.id}
                        />
                    );
                })}
            </div>
            <div style={{ textAlign: "center", margin: "16px" }}>
                <Button variant="contained" color="primary" onClick={addTags} disabled={loading}>
                    Add Tags
                    {loading ? (
                        <CircularProgress size="20px" style={{ marginLeft: "8px" }} />
                    ) : null}
                </Button>
            </div>
        </Box>
    );
}
