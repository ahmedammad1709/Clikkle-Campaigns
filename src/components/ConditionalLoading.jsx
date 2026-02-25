import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React from "react";
import Typography from "./Typography";

export default function ConditionalLoading(props) {
	const { condition, children, message, ...rest } = props;
	return condition ? (
		condition?.length === 0 ? (
			<Box align="center" style={{ height: "50vh" }}>
				<Box
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						justifyContent: "center",
					}}>
					<Typography variant="h4" style={{ fontWeight: "500", letterSpacing: "3px" }}>
						{message}
					</Typography>
				</Box>
			</Box>
		) : (
			children
		)
	) : (
		<CircularProgress {...rest} />
	);
}
