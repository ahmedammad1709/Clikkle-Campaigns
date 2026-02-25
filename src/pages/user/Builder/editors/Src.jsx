import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

function Src(props) {
    const { controls, get } = props;
    const [value, setValue] = useState(get.attribute("src"));

    return (
        <div>
            Source:
            <TextField type="text" value={value} onChange={e => setValue(e.target.value)} />
            <Button
                type="button"
                variant="contained"
                color="primary"
                edit="src"
                setvalue={value}
                onClick={e => controls.setAttribute(e)}>
                Save
            </Button>
        </div>
    );
}

export default Src;
