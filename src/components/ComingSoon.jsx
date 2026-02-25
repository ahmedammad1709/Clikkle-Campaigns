import React from "react";
import Box from "@mui/material/Box";

export default function Construction() {
    return (
        <Box
            flexGrow={1}
            mt={2}
            sx={{
                backgroundImage: "url('/images/construction.webp')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
}
