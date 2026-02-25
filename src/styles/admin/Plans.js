const useStyles = theme => ({
    root: {
        cursor: "default",
    },
    titleGrid: {},
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3.15),
    },
    cardTextDivider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    cardBorder: {
        padding: "0 0 8px 0",
        fontWeight: "500",
    },
    cardPrice: {
        paddingTop: theme.spacing(4),
    },

    link: {
        textDecoration: "none",
    },

    li: {
        listStyleType: "none",
        paddingBottom: theme.spacing(1),
    },
    button: {
        padding: theme.spacing(1, 2),

        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: 300,
    },

    tabsRoot: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
        cursor: "default",
    },
    appBar: {
        background: "inherit",
    },
    divider01: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    divider02: {
        width: "70%",
        height: "2px",
    },
});
export default useStyles;
