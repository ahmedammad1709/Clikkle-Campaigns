import MuiTypography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import { memo } from "react";

const Subtitle3 = styled(MuiTypography)({
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
    fontWeight: 300,
    fontSize: "0.8rem",
    lineHeight: 1.57,
    letterSpacing: "0.00714em",
});

const H6 = styled(MuiTypography)({
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
    fontWeight: "300",
    fontSize: "1.25rem",
    lineHeight: "1.6",
    letterSpacing: "0.0075em",
});

export default memo(props => {
    const { children, variant, ...rest } = props;

    if (props.variant === "subtitle3") {
        return <Subtitle3 {...rest}>{children}</Subtitle3>;
    } else if (props.variant === "H6") {
        return <H6 {...rest}>{children}</H6>;
    } else {
        return (
            <MuiTypography variant={variant} {...rest}>
                {children}
            </MuiTypography>
        );
    }
});
