import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function Margin(props) {
    const { controls, get } = props;

    return (
        <div>
            margin:
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "marginTop", suffix: "px" }}
                        value={parseInt(get.style("margin-top"))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "marginRight", suffix: "px" }}
                        value={parseInt(get.style("margin-right"))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "marginBottom", suffix: "px" }}
                        value={parseInt(get.style("margin-bottom"))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "marginLeft", suffix: "px" }}
                        value={parseInt(get.style("margin-left"))}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Margin;
