import { useCallback, useEffect, useState } from "react";
import { AppBar, Box, Button, Card, Divider, Grid, Switch, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "../../../components/Typography";
import ConditionalLoading from "../../../components/ConditionalLoading";
import BusinessFeatures from "./BusinessFeatures";
import Slider from "@mui/material/Slider";

import useHttpErrorHandler from "./../../../utilities/httpErrorHandler";
import api from "../../../utilities/axios";

const PrettoSlider = styled(Slider)({
    root: {
        color: "#004CFF",
        height: 10,
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
        height: 10,
        borderRadius: 4,
    },
    rail: {
        height: 10,
        borderRadius: 4,
    },
});

function TabPanel(props) {
    const { children, value, index } = props;
    const isHidden = value !== index;

    return <div hidden={isHidden}>{!isHidden && <Box>{children}</Box>}</div>;
}

export default function UpgradePlans() {
    const sx = {
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
            mt: 2,
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

    const [value, setValue] = useState(0);
    const [plans, setPlans] = useState(null);
    const [index, setIndex] = useState(null);
    const [priceIndex, setPriceIndex] = useState(0);
    const [isAnnual, setIsAnnual] = useState(false);
    const httpErrorHandler = useHttpErrorHandler();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getPlans = useCallback(async () => {
        try {
            const response = await api.get(`/plans`, {});
            setPlans(response.data.data);
            setIndex(response.data.index);
        } catch (e) {
            httpErrorHandler(e);
        }
    }, [setPlans, setIndex, httpErrorHandler]);

    useEffect(() => {
        getPlans();
    }, [getPlans]);

    const onSliderHandler = (e, val) => {
        setPriceIndex(val);
    };

    const onSwitchHandler = e => {
        setIsAnnual(e.target.checked);
    };

    const B2CSection = plans ? (
        <Box my={4} style={{ cursor: "default" }}>
            <BusinessFeatures
                suiteName="Marketing Suite"
                List01={plans[0].b2c.marketingSuite}
                List02={plans[1].b2c.marketingSuite}
                List03={plans[2].b2c.marketingSuite}
                List04={plans[3].b2c.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Sales Suite"
                List01={plans[0].b2c.salesSuite}
                List02={plans[1].b2c.salesSuite}
                List03={plans[2].b2c.salesSuite}
                List04={plans[3].b2c.salesSuite}
            />

            <BusinessFeatures
                suiteName="Service Suite"
                List01={plans[0].b2c.serviceSuite}
                List02={plans[1].b2c.serviceSuite}
                List03={plans[2].b2c.serviceSuite}
                List04={plans[3].b2c.serviceSuite}
            />

            <BusinessFeatures
                suiteName="Platform and Support"
                List01={plans[0].b2c.platformAndSupport}
                List02={plans[1].b2c.platformAndSupport}
                List03={plans[2].b2c.platformAndSupport}
                List04={plans[3].b2c.platformAndSupport}
            />
        </Box>
    ) : null;
    const EcommerceSection = plans ? (
        <Box my={4} style={{ cursor: "default" }}>
            <BusinessFeatures
                suiteName="Marketing Suite"
                List01={plans[0].ecommerce.marketingSuite}
                List02={plans[1].ecommerce.marketingSuite}
                List03={plans[2].ecommerce.marketingSuite}
                List04={plans[3].ecommerce.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Sales Suite"
                List01={plans[0].ecommerce.marketingSuite}
                List02={plans[1].ecommerce.marketingSuite}
                List03={plans[2].ecommerce.marketingSuite}
                List04={plans[3].ecommerce.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Service Suite"
                List01={plans[0].ecommerce.marketingSuite}
                List02={plans[1].ecommerce.marketingSuite}
                List03={plans[2].ecommerce.marketingSuite}
                List04={plans[3].ecommerce.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Platform and Support"
                List01={plans[0].ecommerce.marketingSuite}
                List02={plans[1].ecommerce.marketingSuite}
                List03={plans[2].ecommerce.marketingSuite}
                List04={plans[3].ecommerce.marketingSuite}
            />
        </Box>
    ) : null;
    const B2BSection = plans ? (
        <Box my={4} style={{ cursor: "default" }}>
            <BusinessFeatures
                suiteName="Marketing Suite"
                List01={plans[0].b2b.marketingSuite}
                List02={plans[1].b2b.marketingSuite}
                List03={plans[2].b2b.marketingSuite}
                List04={plans[3].b2b.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Sales Suite"
                List01={plans[0].b2b.marketingSuite}
                List02={plans[1].b2b.marketingSuite}
                List03={plans[2].b2b.marketingSuite}
                List04={plans[3].b2b.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Service Suite"
                List01={plans[0].b2b.marketingSuite}
                List02={plans[1].b2b.marketingSuite}
                List03={plans[2].b2b.marketingSuite}
                List04={plans[3].b2b.marketingSuite}
            />

            <BusinessFeatures
                suiteName="Platform and Support"
                List01={plans[0].b2b.marketingSuite}
                List02={plans[1].b2b.marketingSuite}
                List03={plans[2].b2b.marketingSuite}
                List04={plans[3].b2b.marketingSuite}
            />
        </Box>
    ) : null;

    return (
        <Box sx={sx.root}>
            <Grid container spacing={3} sx={sx.titleGrid}>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        Upgrade Plans
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Pick a plan, Start your strategy.
                    </Typography>
                </Grid>
            </Grid>
            <Divider light sx={sx.divider} />
            <ConditionalLoading condition={plans} message="" style={{ margin: "25% 50%" }}>
                {plans && index ? (
                    <>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <Card style={{ padding: "35px", marginBottom: "16px" }}>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        How many contacts do you have?
                                    </Typography>

                                    <Typography variant="h4" align="center">
                                        {index[priceIndex]}
                                    </Typography>
                                    <Typography variant="h6" align="center">
                                        Contacts
                                    </Typography>

                                    <PrettoSlider
                                        aria-labelledby="discrete-slider-restrict"
                                        aria-label="pretto slider"
                                        step={1}
                                        value={priceIndex}
                                        onChange={onSliderHandler}
                                        min={0}
                                        max={index.length - 1}
                                    />
                                    <Divider light sx={sx.divider2} />
                                    <Typography
                                        variant="h6"
                                        style={{
                                            display: "inline-block",
                                        }}>
                                        Billed Yearly
                                    </Typography>

                                    <Switch
                                        disableRipple
                                        checked={isAnnual}
                                        onChange={onSwitchHandler}
                                    />
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            {plans.map((plans, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i} align="center">
                                    <Card style={{ padding: "32px" }}>
                                        <Typography variant="h4" color="primary" sx={sx.cardBorder}>
                                            {plans.name}
                                        </Typography>
                                        <Divider sx={sx.divider02} />
                                        <div style={{ padding: "24px" }}>
                                            {isAnnual ? (
                                                plans.prices.year[priceIndex] === undefined ? (
                                                    <Typography
                                                        variant="subtitle1"
                                                        style={{
                                                            paddingTop: "4%",
                                                            paddingBottom: "4%",
                                                        }}>
                                                        Let's customise the plan that's <br /> right
                                                        for you
                                                    </Typography>
                                                ) : (
                                                    <>
                                                        <Typography
                                                            component="span"
                                                            variant="h6"
                                                            style={{ paddingRight: "8px" }}>
                                                            $
                                                        </Typography>
                                                        <Typography
                                                            component="span"
                                                            variant="h3"
                                                            sx={sx.cardPrice}>
                                                            {plans.prices.year[priceIndex]}
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
                                                    </>
                                                )
                                            ) : plans.prices.month[priceIndex] === undefined ? (
                                                <Typography
                                                    variant="subtitle1"
                                                    style={{
                                                        paddingTop: "4%",
                                                        paddingBottom: "4%",
                                                    }}>
                                                    Let's customise the plan that's <br /> right for
                                                    you
                                                </Typography>
                                            ) : (
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="h6"
                                                        style={{ paddingRight: "8px" }}>
                                                        $
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        variant="h3"
                                                        sx={sx.cardPrice}>
                                                        {plans.prices.month[priceIndex]}
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
                                                </>
                                            )}
                                        </div>
                                        <Button variant="contained" color="primary" sx={sx.button}>
                                            Talk To Sales
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <div sx={sx.tabsRoot}>
                            <AppBar position="static" sx={sx.appBar} elevation={0}>
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
                    </>
                ) : null}
            </ConditionalLoading>
        </Box>
    );
}
