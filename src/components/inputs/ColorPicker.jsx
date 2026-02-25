import React from "react";

export default function ColorPicker(props) {
    const ColorPickerStyle = {
        padding: 0,
        border: "none",
        height: "27px",
        width: "27px",
        borderRadius: "10px",
        WebkitAppearance: "none",
        "&::WebkitColorSwatchWrapper": {
            padding: 0,
        },
        "&::WebkitColorSwatch": {
            border: "none",
            borderRadius: "7px",
        },
    };

    return <input type="color" defaultValue="#00FF00" style={ColorPickerStyle} {...props} />;
}
