import { rgbToHex } from "@mui/material";

function Color(props) {
    const { controls, get } = props;

    return (
        <div>
            Color : <br />
            <input
                type="color"
                onChange={controls.editStyle}
                edit="color"
                value={rgbToHex(get.style("color"))}
            />
        </div>
    );
}

export default Color;
