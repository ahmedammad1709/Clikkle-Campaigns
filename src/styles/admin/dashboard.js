const useStyles = theme => ({
    root: {},
    titleGrid: {},
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    metricCard: {
        "& .MuiCardContent-root:last-child": {
            padding: theme.spacing(2),
        },
        boxShadow: "none",
    },
    metricChip: {
        borderRadius: "3px",
        height: "20px",
    },
    metricNumber: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2.5),
    },
    metricPercentChipGreen: {
        borderRadius: "3px",
        marginRight: theme.spacing(1),
        height: "20px",
        background: "rgba(76, 175, 80, 0.1)",
        color: "#4caf50",
        fontWeight: "500",
    },
    metricPercentChipRed: {
        borderRadius: "3px",
        marginRight: theme.spacing(1),
        height: "20px",
        background: "rgba(244, 67, 54, 0.1)",
        color: "#f44336",
        fontWeight: "500",
    },
    metricPercentChipLabel: {
        padding: theme.spacing(0.5),
    },
});
export default useStyles;
