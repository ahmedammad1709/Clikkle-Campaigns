import Box from "@mui/material/Box";
import React from "react";

function ServerImage(props) {
    props.src = serverImageUrl(props.src);
    return <Box component="img" {...props} />;
}

function serverImageUrl(src) {
    return process.env.REACT_APP_SERVER + "/static/" + src;
}

export default ServerImage;
export { serverImageUrl };
