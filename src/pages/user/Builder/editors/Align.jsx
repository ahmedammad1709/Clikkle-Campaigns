import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from "@mui/icons-material";
import { memo } from "react";

function Align(props) {
    const { controls } = props;

    return (
        <div>
            Alignment:
            <br />
            <button
                type="button"
                onClick={e => controls.setStyle(e)} // calling the function this way will keep this (this keyword) set on the controls object
                edit="textAlign"
                setvalue="left">
                <FormatAlignLeft />
            </button>
            <button
                type="button"
                onClick={e => controls.setStyle(e)}
                edit="textAlign"
                setvalue="center">
                <FormatAlignCenter />
            </button>
            <button
                type="button"
                onClick={e => controls.setStyle(e)}
                edit="textAlign"
                setvalue="right">
                <FormatAlignRight />
            </button>
        </div>
    );
}

export default memo(Align);
