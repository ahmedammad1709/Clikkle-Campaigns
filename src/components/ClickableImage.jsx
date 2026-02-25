import { Box, ButtonBase, styled } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: "100%",
    borderRadius: "1000px",
    p: 0,
    width: "100%",
    overflow: "hidden",
}));
const ImageHover = styled("div")({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0,
    transition: ".5s ease",
    ":hover": {
        opacity: 1,
    },
});

export default function ClickableImage(props) {
    const { src, onClick, ...rest } = props;
    return (
        <ImageButton onClick={onClick} {...rest}>
            <Box component="img" sx={{ width: "100%", borderRadius: "8px" }} src={src} />
            <ImageHover>
                <Box
                    sx={{
                        position: "absolute",
                        // color: "#fff",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",

                        opacity: 1,
                    }}>
                    <PhotoCameraIcon sx={{ fontSize: "69px" }} />
                </Box>
            </ImageHover>
        </ImageButton>
    );
}
