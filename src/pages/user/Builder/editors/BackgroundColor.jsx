import { memo } from "react";
import { rgbToHex } from "@mui/material";

function BackgroundColor(props) {
    const { controls, get } = props;

    return (
        <div>
            Background Color:
            <br />
            <input
                type="color"
                onChange={controls.editStyle}
                edit="backgroundColor"
                value={rgbToHex(get.style("background-color"))}
            />
        </div>
    );
}

export default memo(BackgroundColor);
