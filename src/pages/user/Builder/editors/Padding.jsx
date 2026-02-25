import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function Padding(props) {
    const { controls, get } = props;

    return (
        <div>
            Padding:
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "paddingTop", suffix: "px" }}
                        value={parseInt(get.style("padding-top"))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "paddingRight", suffix: "px" }}
                        value={parseInt(get.style("padding-right"))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "paddingBottom", suffix: "px" }}
                        value={parseInt(get.style("padding-bottom"))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="number"
                        onChange={controls.editStyle}
                        inputProps={{ edit: "paddingLeft", suffix: "px" }}
                        value={parseInt(get.style("padding-left"))}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Padding;
