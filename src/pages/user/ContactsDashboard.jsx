import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
} from "@mui/material";
import Sync from "@mui/icons-material/Sync";
import EqualizerIcon from "@mui/icons-material/EqualizerOutlined";
import MailIcon from "@mui/icons-material/MailOutlined";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Typography from "../../components/Typography";

import { useCallback, useEffect, useState } from "react";
import ConditionalLoading from "../../components/ConditionalLoading";
import ActionIcon from "../../components/ActionIcon";
import useHttpErrorHandler from "./../../utilities/httpErrorHandler";
import api from "../../utilities/axios";

const StyledLink = styled(Link)({
    textDecoration: "none",
    " &:focus, &:hover, &:visited, &:StyledLink, &:active": {
        textDecoration: "none",
    },
});

export default function ContactsDashboard() {
    const sx = {
        titleGrid: {},
        divider: {
            marginTop: 1,
            marginBottom: 2,
        },
        card: {
            marginTop: 5,
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        cardCaption: {
            maxWidth: "600px",
            textAlign: "center",
        },
        cardButton: {
            fontSize: "small",
            marginTop: 3,
        },
        quesText: {
            fontSize: "x-large",
            fontWeight: "400",
            marginTop: 7,
        },
        optionTextSection: {
            paddingLeft: 2,
            paddingRight: 2,
        },
        optionSubText: {
            fontWeight: 300,
        },
        cardPadding: {
            padding: 2,
        },
    };
    const [data, setData] = useState(null);
    const httpErrorHandler = useHttpErrorHandler();

    const getDashboardData = useCallback(async () => {
        setData(null);
        try {
            const response = await api.get(`/user/contacts/dashboard`, {});
            // const tags = [];
            // const tag = response.data.tags;
            // for (const key in tag) {
            //     let obj = {
            //         tagName: key,
            //         tags: tag[key],
            //     };
            //     tags.push(obj);
            // }
            // response.data.tags = tags;

            setData(response.data);
        } catch (e) {
            httpErrorHandler(e);
        }
    }, [setData, httpErrorHandler]);

    useEffect(() => {
        getDashboardData();
    }, [getDashboardData]);

    // const contacts = data ? data.sources.imported + data.sources.form + data.sources.manual : null;

    return (
        <Box sx={{ mt: 1, cursor: "default", width: "100%" }}>
            <Grid container spacing={1} sx={sx.titleGrid}>
                <Grid item md xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Overview
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage your audience through this dashboard 📈
                    </Typography>
                </Grid>
                <Grid item md xs={12} align="right">
                    <ActionIcon
                        color="primary"
                        title="Sync"
                        icon={<Sync />}
                        onClick={getDashboardData}
                    />
                </Grid>
            </Grid>
            <Divider light sx={sx.divider} />
            <ConditionalLoading
                condition={data}
                message=""
                style={{ marginTop: "25%", marginLeft: "50%" }}>
                {Object.keys(data || {}).length ? (
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mb: 4,
                            ".MuiPaper-root": {
                                height: "100%",
                            },
                        }}>
                        <Grid item md={6} xs={12}>
                            <Card sx={sx.cardPadding}>
                                <CardContent>
                                    <ListItem style={{ padding: "0" }}>
                                        <ListItemIcon style={{ minWidth: "10px" }}>
                                            <EqualizerIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                color="primary"
                                                component="span"
                                                style={{
                                                    fontWeight: "500",
                                                    marginLeft: "1rem",
                                                }}>
                                                Recent Growth
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <Typography variant="subtitle3">
                                        New contacts added to this audience in the last 30 days
                                    </Typography>
                                    <Divider light sx={sx.divider} />
                                    <Typography variant="h6" gutterBottom component="span">
                                        {data.newContacts.subscribed +
                                            data.newContacts.unsubscribed}
                                    </Typography>

                                    <Typography variant="body1" color="primary" gutterBottom>
                                        New Contacts
                                    </Typography>
                                    <Typography variant="subtitle3">
                                        From jul 21, 2019 to Aug 30, 2019
                                    </Typography>

                                    <Grid container spacing={2} mt={3}>
                                        <Grid item xs>
                                            <Typography variant="body1">
                                                {data ? data.newContacts.subscribed : null}
                                            </Typography>
                                            <Typography
                                                variant="subtitle3"
                                                color="primary"
                                                component={StyledLink}
                                                to="/contacts/all/subscribed"
                                                style={{ TextDecoration: "none" }}>
                                                Subscribed
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="body1">
                                                {data ? data.newContacts.unsubscribed : null}
                                            </Typography>
                                            <Typography
                                                variant="subtitle3"
                                                color="primary"
                                                component={StyledLink}
                                                to="/contacts/all/unsubscribed"
                                                sx={{ TextDecoration: "none" }}>
                                                Non-subscribed
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card sx={sx.cardPadding}>
                                <CardContent>
                                    <ListItem style={{ padding: "0" }}>
                                        <ListItemIcon style={{ minWidth: "10px" }}>
                                            <PersonIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                color="primary"
                                                component="span"
                                                style={{
                                                    fontWeight: "500",
                                                    marginLeft: "1rem",
                                                }}>
                                                Contacts
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <Typography variant="subtitle3">
                                        Where your contacts come from:
                                    </Typography>
                                    <Divider light sx={sx.divider} />
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={2}
                                        style={{ padding: "7px" }}>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">
                                                {data ? data.sources.imported : null}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="body1" color="text.primary">
                                                imported Contacts
                                            </Typography>
                                        </Grid>
                                        <Grid item align="center">
                                            <IconButton
                                                component={Link}
                                                to="/contacts/all/imported">
                                                <SendIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider light sx={sx.divider} />
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={2}
                                        style={{ padding: "7px" }}>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">
                                                {data ? data.sources.form : null}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="body1" color="text.primary">
                                                Hosted SignUp Form
                                            </Typography>
                                        </Grid>
                                        <Grid item align="center">
                                            <IconButton component={Link} to="/contacts/all/form">
                                                <SendIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider light sx={sx.divider} />
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={2}
                                        style={{ padding: "7px" }}>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">
                                                {data ? data.sources.manual : null}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="body1" color="text.primary">
                                                Manually Added
                                            </Typography>
                                        </Grid>
                                        <Grid item align="center">
                                            <IconButton component={Link} to="/contacts/all/manual">
                                                <SendIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card sx={sx.cardPadding} style={{ height: "100%" }}>
                                <CardContent>
                                    <ListItem style={{ padding: "0" }}>
                                        <ListItemIcon style={{ minWidth: "10px" }}>
                                            <MailIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                component="span"
                                                color="primary"
                                                style={{
                                                    fontWeight: "500",
                                                    marginLeft: "1rem",
                                                }}>
                                                Emails engagement
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <Typography variant="subtitle3">
                                        Your subscribers, broken down by how often they open and
                                        click your emails.
                                    </Typography>
                                    <Divider light sx={sx.divider} />
                                    <Grid container alignItems="center" sx={{ padding: "8px" }}>
                                        <Grid item xs={3}>
                                            <Typography variant="h6" align="center">
                                                {data ? data.engagementPercents.often : null}%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                sx={{ fontWeight: "500" }}>
                                                Often
                                            </Typography>
                                            <Typography variant="subtitle3">
                                                Your percentage of subscribers, who are highly
                                                engaged and often open and click your emails
                                            </Typography>
                                        </Grid>
                                        <Grid item align="center">
                                            <IconButton component={Link} to="/contacts/all/often">
                                                <SendIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider light sx={sx.divider} />
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={2}
                                        style={{ padding: "8px" }}>
                                        <Grid item xs={3}>
                                            <Typography variant="h6" align="center">
                                                {data ? data.engagementPercents.sometimes : null}%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                sx={{ fontWeight: "500" }}>
                                                Sometimes
                                            </Typography>
                                            <Typography variant="subtitle3">
                                                Your percentage of subscribers, who are moderately
                                                engaged and ocassionally open and click your emails
                                            </Typography>
                                        </Grid>
                                        <Grid item align="center">
                                            <IconButton
                                                component={Link}
                                                to="/contacts/all/sometimes">
                                                <SendIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider light sx={sx.divider} />
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                        style={{ padding: "8px" }}>
                                        <Grid item xs={3}>
                                            <Typography variant="h6" align="center">
                                                {data ? data.engagementPercents.rarely : null}%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                sx={{ fontWeight: "500" }}>
                                                Rarely
                                            </Typography>
                                            <Typography variant="subtitle3">
                                                Your percentage of subscribers, who are rarely
                                                engaged, open and click your emails
                                            </Typography>
                                        </Grid>
                                        <Grid item align="center">
                                            <IconButton component={Link} to="/contacts/all/rarely">
                                                <SendIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card
                                sx={sx.cardPadding}
                                style={{
                                    position: "relative",
                                    height: "100%",
                                }}>
                                <CardContent
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        width: "100%",
                                        display: "flex",
                                        height: "100%",
                                        flexDirection: "column",
                                    }}>
                                    <ListItem style={{ padding: "0" }}>
                                        <ListItemIcon style={{ minWidth: "10px" }}>
                                            <LocalOfferOutlinedIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                color="primary"
                                                component="span"
                                                style={{
                                                    fontWeight: "500",
                                                    marginLeft: "1rem",
                                                }}>
                                                Tags
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>

                                    <Typography variant="subtitle3">
                                        Your contacts organized by your tags.
                                    </Typography>

                                    <Box flexGrow={1} sx={{ overflowY: "scroll" }}>
                                        {data
                                            ? data.tags.map((tag, i) => (
                                                  <Box key={i}>
                                                      <Divider light sx={sx.divider} />
                                                      <Grid
                                                          container
                                                          alignItems="center"
                                                          spacing={2}
                                                          style={{ padding: "8px" }}>
                                                          <Grid item xs={2}>
                                                              <Typography variant="h5">
                                                                  {tag.contacts}
                                                              </Typography>
                                                          </Grid>
                                                          <Grid item xs>
                                                              <Typography variant="body1">
                                                                  {tag.name}
                                                              </Typography>
                                                          </Grid>
                                                          <Grid item xs={1.5} align="center">
                                                              <IconButton
                                                                  component={Link}
                                                                  to={`/contacts/tags/${tag._id}`}>
                                                                  <SendIcon color="primary" />
                                                              </IconButton>
                                                          </Grid>
                                                      </Grid>
                                                  </Box>
                                              ))
                                            : null}
                                    </Box>
                                    <div align="center">
                                        <Button
                                            variant="text"
                                            color="primary"
                                            style={{ marginTop: "24px" }}
                                            component={StyledLink}
                                            to="/contacts/tags">
                                            Show all
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        <Card sx={sx.card}>
                            <CardContent align="center">
                                <Typography
                                    variant="h4"
                                    align="center"
                                    style={{ fontWeight: "300" }}
                                    gutterBottom>
                                    Grow Your Clikkle Audience
                                </Typography>
                                <div sx={sx.cardCaption}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        When you are speaking, you want listeners to understand and
                                        respond favorably to what you are saying. An audience is one
                                        or more people who come together to listen to the speaker.
                                        Audience members may be face to face with the speaker or
                                        they may be connected by communication technology such as
                                        computers or other media.
                                    </Typography>
                                </div>
                                <Button
                                    component={StyledLink}
                                    to="/contacts/import"
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    sx={sx.cardButton}>
                                    Add Your Contacts
                                </Button>
                            </CardContent>
                        </Card>
                        <Typography variant="h5" sx={sx.quesText} gutterBottom>
                            No contacts? No problem.
                        </Typography>
                        <Typography variant="body1">
                            We'll show you how to grow your audience and add contacts quickly.
                        </Typography>
                        <Divider light sx={sx.divider} />
                        <Grid container spacing={2}>
                            <Grid item md={3} xs={12}>
                                <Box
                                    component="img"
                                    style={{ width: "100%" }}
                                    src="data:image/png;base64,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"
                                />
                            </Grid>
                            <Grid item md xs={12} sx={sx.optionTextSection}>
                                <Typography variant="h5" gutterBottom>
                                    Create a subscribe form
                                </Typography>
                                <Typography variant="body1" sx={sx.optionSubText}>
                                    Capture contacts and collects the data you need to grow your
                                    Mailchimp audience. Capture contacts and collects the data you
                                    need to grow your Mailchimp audience. Capture contacts and
                                    collects the data you need to grow your Mailchimp audience.
                                </Typography>
                            </Grid>
                            <Grid item align="left">
                                <Button
                                    variant="outlined"
                                    component={StyledLink}
                                    to="/contacts/create-signup-forms"
                                    color="secondary"
                                    size="small"
                                    sx={sx.optionText}>
                                    Create Form
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider light sx={sx.divider} />
                    </>
                )}

                {/* Second Dashboard Section  */}
            </ConditionalLoading>
        </Box>
    );
}
