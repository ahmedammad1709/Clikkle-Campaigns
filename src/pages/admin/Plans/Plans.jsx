import { useEffect, useState, createContext, useCallback } from "react";
import { AppBar, Box, Button, Card, Divider, Grid, Tab, Tabs } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Typography from "../../../components/Typography";
import ConditionalLoading from "../../../components/ConditionalLoading";
import Plans from "../../../services/Plans";
import Sync from "@mui/icons-material/Sync";
import BusinessFeatures from "./BusinessFeatures";
import Slider from "@mui/material/Slider";

import ActionIcon from "../../../components/ActionIcon";
import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import api from "../../../utilities/axios";

const PrettoSlider = styled(Slider)({
    root: {
        color: "#52af77",
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
});

function TabPanel(props) {
    const { children, value, index } = props;
    const isHidden = value !== index;

    return <div hidden={isHidden}>{!isHidden && <Box>{children}</Box>}</div>;
}
const id = createContext();
export default function UpgradePlans() {
    const [value, setValue] = useState(0);
    const [plans, setPlans] = useState(null);
    const classes = {
        divider: {
            marginTop: "16px",
            marginBottom: "26px",
        },
        divider2: {
            marginTop: "8px",
            marginBottom: "8px",
        },
        cardTextDivider: {
            marginTop: "8px",
            marginBottom: "8px",
        },
        cardBorder: {
            padding: "0 0 8px 0",
            fontWeight: "500",
        },
        cardPrice: {
            paddingTop: "32px",
        },

        link: {
            textDecoration: "none",
        },

        li: {
            listStyleType: "none",
            paddingBottom: "8px",
        },
        button: {
            padding: "8px, 16px",

            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 300,
        },

        tabsRoot: {
            flexGrow: 1,
            marginTop: "16px",
        },
        appBar: {
            background: "inherit",
        },
        divider01: {
            marginTop: "8px",
            marginBottom: "8px",
        },
        divider02: {
            width: "70%",
            height: "2px",
        },
    };
    const httpErrorHandler = useHttpErrorHandler();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getPlans = useCallback(async () => {
        setPlans(null);
        try {
            const response = await api.get(`/plans`, {});
            setPlans(response.data.data);
        } catch (e) {
            httpErrorHandler(e);
        }
    }, [setPlans, httpErrorHandler]);

    useEffect(() => {
        getPlans();
    }, [getPlans]);

    const B2CSection = plans ? (
        <Box my={4} style={{ cursor: "default" }}>
            <BusinessFeatures
                suiteName="Marketing Suite"
                suite="marketingSuite"
                section="b2c"
                lite={plans[0].b2c.marketingSuite}
                plus={plans[1].b2c.marketingSuite}
                professional={plans[2].b2c.marketingSuite}
                enterprise={plans[3].b2c.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Sales Suite"
                suite="salesSuite"
                section="b2c"
                lite={plans[0].b2c.salesSuite}
                plus={plans[1].b2c.salesSuite}
                professional={plans[2].b2c.salesSuite}
                enterprise={plans[3].b2c.salesSuite}
            />

            <BusinessFeatures
                suiteName="Service Suite"
                suite="serviceSuite"
                section="b2c"
                lite={plans[0].b2c.serviceSuite}
                plus={plans[1].b2c.serviceSuite}
                professional={plans[2].b2c.serviceSuite}
                enterprise={plans[3].b2c.serviceSuite}
            />

            <BusinessFeatures
                suiteName="Platform and Support"
                suite="platformAndSupport"
                section="b2c"
                lite={plans[0].b2c.platformAndSupport}
                plus={plans[1].b2c.platformAndSupport}
                professional={plans[2].b2c.platformAndSupport}
                enterprise={plans[3].b2c.platformAndSupport}
            />
        </Box>
    ) : null;
    const EcommerceSection = plans ? (
        <Box my={4} style={{ cursor: "default" }}>
            <BusinessFeatures
                suiteName="Marketing Suite"
                suite="marketingSuite"
                section="ecommerce"
                lite={plans[0].ecommerce.marketingSuite}
                plus={plans[1].ecommerce.marketingSuite}
                professional={plans[2].ecommerce.marketingSuite}
                enterprise={plans[3].ecommerce.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Sales Suite"
                suite="salesSuite"
                section="ecommerce"
                lite={plans[0].ecommerce.marketingSuite}
                plus={plans[1].ecommerce.marketingSuite}
                professional={plans[2].ecommerce.marketingSuite}
                enterprise={plans[3].ecommerce.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Service Suite"
                suite="serviceSuite"
                section="ecommerce"
                lite={plans[0].ecommerce.marketingSuite}
                plus={plans[1].ecommerce.marketingSuite}
                professional={plans[2].ecommerce.marketingSuite}
                enterprise={plans[3].ecommerce.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Platform and Support"
                suite="platformAndSupport"
                section="ecommerce"
                lite={plans[0].ecommerce.marketingSuite}
                plus={plans[1].ecommerce.marketingSuite}
                professional={plans[2].ecommerce.marketingSuite}
                enterprise={plans[3].ecommerce.marketingSuite}
            />
        </Box>
    ) : null;
    const B2BSection = plans ? (
        <Box my={4} style={{ cursor: "default" }}>
            <BusinessFeatures
                suiteName="Marketing Suite"
                suite="marketingSuite"
                section="b2b"
                lite={plans[0].b2b.marketingSuite}
                plus={plans[1].b2b.marketingSuite}
                professional={plans[2].b2b.marketingSuite}
                enterprise={plans[3].b2b.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Sales Suite"
                suite="salesSuite"
                section="b2b"
                lite={plans[0].b2b.marketingSuite}
                plus={plans[1].b2b.marketingSuite}
                professional={plans[2].b2b.marketingSuite}
                enterprise={plans[3].b2b.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Service Suite"
                suite="serviceSuite"
                section="b2b"
                lite={plans[0].b2b.marketingSuite}
                plus={plans[1].b2b.marketingSuite}
                professional={plans[2].b2b.marketingSuite}
                enterprise={plans[3].b2b.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Platform and Support"
                suite="platformAndSupport"
                section="b2b"
                lite={plans[0].b2b.marketingSuite}
                plus={plans[1].b2b.marketingSuite}
                professional={plans[2].b2b.marketingSuite}
                enterprise={plans[3].b2b.marketingSuite}
            />
        </Box>
    ) : null;
    return (
        <id.Provider
            value={
                plans
                    ? {
                          lite: plans[0]._id,
                          plus: plans[1]._id,
                          professional: plans[2]._id,
                          enterprise: plans[3]._id,
                          getPlans,
                      }
                    : null
            }>
            <Box sx={classes.root}>
                <Grid container spacing={3} sx={classes.titleGrid} alignItems="center">
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                            Upgrade Plans
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Pick a plan, Start your strategy.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ActionIcon
                            color="primary"
                            onClick={getPlans}
                            title="Sync"
                            icon={<Sync />}
                        />
                    </Grid>
                </Grid>
                <Divider light sx={classes.divider} />
                <ConditionalLoading
                    condition={plans}
                    message="No Plans found"
                    style={{ margin: "25% 50%" }}>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        defaultValue={20}
                    />
                    <Grid container spacing={2}>
                        {Plans.map(item => (
                            <Grid item xs={12} sm={6} md={3} align="center">
                                <Card style={{ padding: "32px" }}>
                                    <Typography
                                        variant="h4"
                                        color="primary"
                                        sx={classes.cardBorder}>
                                        {item.name}
                                    </Typography>
                                    <Divider sx={classes.divider02} />
                                    <div style={{ padding: "24px" }}>
                                        <Typography
                                            component="span"
                                            variant="h6"
                                            style={{ paddingRight: "8px" }}>
                                            $
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="h3"
                                            sx={classes.cardPrice}>
                                            {item.price}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="h6"
                                            style={{ paddingLeft: "8px" }}>
                                            /mo
                                        </Typography>
                                        <Typography variant="subtitle3">
                                            Per month, paid yearly (USD)
                                        </Typography>
                                    </div>
                                    <Button variant="contained" color="primary" sx={classes.button}>
                                        Talk To Sales
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div sx={classes.tabsRoot}>
                        <AppBar position="static" sx={classes.appBar} elevation={0}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab
                                    label="B2C"
                                    disableRipple
                                    style={{ textTransform: "capitalize" }}
                                />
                                <Tab
                                    label="B2B"
                                    disableRipple
                                    style={{ textTransform: "capitalize" }}
                                />
                                <Tab
                                    label="Ecommerce"
                                    disableRipple
                                    style={{ textTransform: "capitalize" }}
                                />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            {B2CSection}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {B2BSection}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {EcommerceSection}
                        </TabPanel>
                    </div>
                </ConditionalLoading>
            </Box>
        </id.Provider>
    );
}
export { id };
