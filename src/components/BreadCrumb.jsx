export default function BreadCrumb() {
    return (
        <>
            <Grid container spacing={3} className={classes.titleGrid}>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        Analytics Dashboard
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Welcome back, Lucy! We've missed you. 👋
                    </Typography>
                </Grid>
                <Grid item xs align="right">
                    <IconButton>
                        <Sync />
                    </IconButton>
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider light className={classes.divider} />
        </>
    );
}
