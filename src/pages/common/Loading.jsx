import { CircularProgress, CssBaseline, Grid } from "@mui/material";

export default function Loading() {
    return (
        <>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}>
                <Grid item>
                    <CircularProgress style={{ marginRight: "30px" }} />
                </Grid>
                <Grid item>Please wait, loggin you in...</Grid>
            </Grid>
        </>
    );
}
