const useStylesDrawer = theme => ({
    root: {
        // overflow: "hidden",
    },
    icon: {
        fontSize: "30px",
        marginRight: theme.spacing(1),
    },
    list: {
        flexGrow: 1,
        width: "100%",
    },
    listItem: {
        padding: "8px 28px 8px 32px",
        "& .MuiTypography-root": {
            fontSize: "14px",
        },
        "& .MuiListItemIcon-root": {
            minWidth: 0,
            marginRight: theme.spacing(2),
            "& svg": {
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "1.5rem",
            },
        },
        "&:hover": {
            background: "#1e293a",
        },
    },
});

const useStylesEntries = theme => ({
    rowDivider: {
        margin: theme.spacing(2, 3),
    },
    entries: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    entriesText: {
        "& .MuiTypography-body1": {
            paddingLeft: theme.spacing(1),
        },
    },
    Button: {
        padding: "3px 14px",
        fontSize: "0.8rem",
        textTransform: "capitalize",
        borderRadius: "0px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    viewButton: {
        padding: "5px 24px",
        borderRadius: "0px",

        "&:hover": {
            backgroundColor: "#4782da",
        },
    },
    toggleButton: {
        padding: "5px 0",
        borderRadius: "0px",
        minWidth: "30px",
    },
    timeLine: {
        marginLeft: theme.spacing(4),
        fontSize: "0.7rem",
        paddingLeft: theme.spacing(1),
    },
    sortBy: {
        outlined: "inherit",
        "& .MuiSelect-outlined.MuiSelect-outlined": {
            padding: theme.spacing(1.4, 4.5),
        },
        "& .MuiSelect-select.MuiSelect-select": {
            padding: theme.spacing(1.4, 4.5),
        },
    },
});
export { useStyles, useStylesDrawer, useStylesEntries };
