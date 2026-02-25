import {
    TableContainer,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Checkbox,
} from "@mui/material";
import React, { useState } from "react";

function formatName(name) {
    const newName = name.replace(/([a-z]+)([A-Z])/, function (match, $1, $2) {
        return $1 + " " + $2;
    });
    return newName.charAt(0).toUpperCase() + newName.slice(1);
}

export default function Table(props) {
    const { fields, data, ...rest } = props;
    const [checkboxes, setCheckboxes] = useState({});

    const handleCheckboxChange = (e, _id) => {
        const newSelection = { ...checkboxes, [_id]: !checkboxes[_id] };

        setCheckboxes(newSelection);
        console.log(Object.keys(newSelection).filter(checkbox => newSelection[checkbox]));
    };

    return (
        <TableContainer component={Paper} elevation={0} sx={{ p: 1 }} {...rest}>
            <MuiTable size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        {fields.map(field => (
                            <TableCell>{formatName(field)}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((data, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                <Checkbox
                                    checked={checkboxes[data._id] || false}
                                    onChange={e => handleCheckboxChange(e, data._id)}
                                />
                            </TableCell>
                            {fields.map((field, i) => (
                                <TableCell key={i}>{data[field]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}
