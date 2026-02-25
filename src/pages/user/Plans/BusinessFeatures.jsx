import { Card, Grid } from "@mui/material";
import React from "react";
import Typography from "../../../components/Typography";
import CheckIcon from "@mui/icons-material/Check";

export default function BusinessFeatures(props) {
    const { List01, List02, List03, List04, suiteName } = props;
    const lists = [List01, List02, List03, List04];
    return (
        <>
            <Card style={{ marginTop: "24px" }}>
                <Typography variant="h6" align="center" style={{ margin: "24px" }}>
                    {suiteName}
                </Typography>
            </Card>
            <Grid container spacing={2} style={{ marginTop: "8px" }}>
                {lists.map((list, i) => (
                    <Grid item xs={12} md={3} key={i} style={{ height: "100%" }}>
                        <Card
                            style={{
                                padding: "16px",
                                height: "100%",
                            }}>
                            {list.map((item, i) => (
                                <li key={i} style={{ listStyleType: "none", padding: "12px" }}>
                                    <CheckIcon style={{ paddingRight: "8px", height: "15px" }} />
                                    {item}
                                </li>
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
