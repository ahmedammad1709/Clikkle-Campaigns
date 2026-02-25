import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
    Typography,
    AppBar,
    Button,
    Toolbar,
    IconButton,
    Avatar,
    Box,
    Drawer,
    Collapse,
    Hidden,
    Badge,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { ExpandMore, Add, ExpandLess, Menu as MenuIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { adminMenuItems, userMenuItems } from '../data/links';
import { useMenu, Menu } from '../hooks/useMenu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import If from './If';
import { useAuthorize, useUser } from '../hooks/Authorize';
import Profile from './Profile';
import { serverImageUrl } from './ServerImage';
import { clearCookie } from '../utilities/cookies';
import useHttpErrorHandler from '../utilities/httpErrorHandler';
import NotificationIcon from '@mui/icons-material/Notifications';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';


const drawerWidth = 230;

const MainLayout = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    cursor: 'default',
    [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
    },
}));

function Header(props) {
    const theme = useTheme();
    const primaryMain = 'linear-gradient(90deg, rgb(51,77,124),rgb(23,45,90))';
    const primaryContrast = theme.palette.primary.contrastText;

    const { role, picture, firstName, lastName = '' } = useUser();
    const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;
    const [collapsesState, setCollapsesState] = useState(menuItemsStates(menuItems));
    const [notifications, setNotifications] = useState(null);
    const [mobileDrawer, setMobileDrawer] = useState(false);
    const { anchorEl, openMenu, closeMenu } = useMenu();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const httpErrorHandler = useHttpErrorHandler();
    const authorize = useAuthorize();
    const location = useLocation();

    const title = useMemo(() => {
        const page = location.pathname;
        for (const link of menuItems) {
            if (Array.isArray(link.to)) {
                const found = link.to.find(sublink => sublink.to === page);
                if (found) return found.label;
            } else if (link.to === page) {
                return link.label;
            }
        }
    }, [menuItems, location.pathname]);

    // const fetchNotification = useCallback(async () => {
    //     try {
    //         const response = await axios.get('/user/notifications');
    //         setNotifications(response.data.notifications);
    //     } catch (e) {
    //         httpErrorHandler(e);
    //     }
    // }, [setNotifications, httpErrorHandler]);

    const modifyCollapsesState = key => {
        setCollapsesState(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleMobileDrawer = () => {
        setMobileDrawer(prev => !prev);
    };

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    // useEffect(() => {
    //     fetchNotification();
    // }, [fetchNotification]);

    const drawerContents = (
        <>
            <Box py={2.5} px={3}>
                <Box component='img' src='/images/clikkle-logo-b.png' sx={{ maxHeight: 50 }} />
            </Box>
            <Button
                component={Link}
                to='/create'
                variant='contained'
                color='secondary'
                sx={{
                    my: 1,
                    mx: 3,
                    textTransform: 'none',
                }}
                endIcon={<Add />}>
                Create
            </Button>
            <List
                component='nav'
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    overflowY: 'auto',
                }}>
                {menuItems.map(menuItem => (
                    <React.Fragment key={menuItem.label}>
                        <ListItem
                            variant='NavList'
                            button
                            sx={{
                                pl: 3,
                                '& .MuiTypography-root': {
                                    fontSize: '13px',
                                },
                                '& .MuiListItemIcon-root': {
                                    minWidth: 0,
                                    mr: 2,
                                    '& svg': {
                                        fontSize: '1.5rem',
                                    },
                                },
                            }}
                            {...(Array.isArray(menuItem.to)
                                ? {
                                      onClick: () => modifyCollapsesState(menuItem.label),
                                  }
                                : {
                                      to: menuItem.to,
                                      component: NavLink,
                                      style: ({ isActive }) => ({
                                          background: isActive ? primaryMain : '',
                                          color: isActive ? primaryContrast : '',
                                      }),
                                  })}>
                            <ListItemIcon>{menuItem.icon}</ListItemIcon>
                            <ListItemText>{menuItem.label}</ListItemText>
                            <If
                                condition={Array.isArray(menuItem.to)}
                                so={
                                    <If
                                        condition={collapsesState[menuItem.label]}
                                        so={<ExpandLess />}
                                        otherwise={<ExpandMore />}
                                    />
                                }
                                otherwise
                            />
                        </ListItem>
                        {Array.isArray(menuItem.to) ? (
                            <Collapse
                                in={collapsesState[menuItem.label]}
                                timeout='auto'
                                unmountOnExit>
                                <List component='div' disablePadding>
                                    {menuItem.to.map(submenu => (
                                        <ListItem
                                            variant='NavList'
                                            button
                                            sx={{
                                                padding: '8px 28px 8px 50px',
                                                '& .MuiTypography-root': {
                                                    fontSize: '13px',
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    minWidth: 0,
                                                    marginRight: '16px',
                                                },
                                            }}
                                            key={submenu.label}
                                            component={NavLink}
                                            to={submenu.to}
                                            style={({ isActive }) => ({
                                                background: isActive ? primaryMain : '',
                                                color: isActive ? primaryContrast : '',
                                            })}>
                                            <ListItemIcon>{submenu.icon}</ListItemIcon>
                                            <ListItemText>{submenu.label}</ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        ) : (
                            ''
                        )}
                    </React.Fragment>
                ))}
            </List>
            {/* <Box
                sx={{
                    padding: 1.5,
                    "& .MuiTypography-subtitle1": {
                        fontSize: "0.9rem",
                    },
                    "& .MuiTypography-subtitle2": {
                        fontSize: "0.7rem",
                    },
                    color: "white",
                    backgroundImage: "linear-gradient(90deg, rgb(51,77,124),rgb(23,45,90))",
                }}
                component={Paper}
                elevation={4}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar
                            onClick={openModal}
                            style={{ cursor: "pointer" }}
                            src={serverImageUrl(picture)}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="subtitle1"
                            onClick={openModal}
                            style={{ cursor: "pointer" }}>
                            {firstName + " " + lastName ?? ""}
                        </Typography>
                        <Typography variant="subtitle2">{role}</Typography>
                    </Grid>
                </Grid>
            </Box> */}
            <List>
                <ListItem
                    variant='NavList'
                    sx={{
                        padding: '8px 28px 16px',
                        cursor: 'pointer',
                        '& .MuiTypography-root': {
                            fontSize: '13px',
                        },
                        '& .MuiListItemIcon-root': {
                            minWidth: 0,
                            marginRight: '16px',
                        },
                        '&:hover': {
                            background: 'transparent',
                        },
                    }}
                    onClick={logout}>
                    <ListItemIcon>
                        <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText>Log out </ListItemText>
                    {loading ? (
                        <CircularProgress size={20} color='white' style={{ marginLeft: '8px' }} />
                    ) : null}
                </ListItem>
            </List>
        </>
    );

    function logout() {
        setLoading(true);
        clearCookie('role');
        clearCookie('accessToken');
        authorize(false);
        setLoading(false);
    }

    return (
        <>
            <Hidden mdDown implementation='js'>
                <Drawer
                    variant='permanent'
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            background: '#172D5A',
                        },
                    }}>
                    {drawerContents}
                </Drawer>
            </Hidden>
            <Hidden mdUp implementation='js'>
                <Drawer
                    variant='temporary'
                    open={mobileDrawer}
                    onClose={toggleMobileDrawer}
                    sx={{
                        width: drawerWidth,
                        color: 'rgba(255, 255, 255, 0.95)',
                        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        boxShadow: 'none',
                        backgroundImage: 'none',
                        left: '0px',
                        borderRight: 'none',
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            background: '#172D5A',
                        },
                    }}>
                    {drawerContents}
                </Drawer>
            </Hidden>

            <MainLayout>
                <AppBar
                    position='fixed'
                    elevation={0}
                    sx={{
                        pl: { md: `${drawerWidth}px`, xs: 'none' },
                    }}>
                    <Toolbar sx={{ py: 2.5, px: { xs: 2, md: 5 } }}>
                        <Grid container alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={toggleMobileDrawer}
                                    sx={{
                                        marginRight: 2,
                                        p: 0,
                                        pt: '5px',
                                        display: { xs: 'block', md: 'none' },
                                    }}>
                                    <MenuIcon sx={{ fontSize: '30px' }} />
                                </IconButton>
                            </Grid>

                            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                            <SearchOutlined sx={{ mr: 1 }} color="primary" />
                            <TextField
                                placeholder="Enter the search"
                                size="small"
                                variant="standard"
                                color="primary"
                            />
                        </Box> */}
                            <Grid item>
                                <Typography
                                    variant='h4'
                                    color='primary'
                                    sx={{
                                        fontWeight: '500',
                                        fontSize: { xs: '25px', sm: '35px' },
                                    }}>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs align='right'>
                                <IconButton onClick={openMenu} color='primary'>
                                    <Badge
                                        badgeContent={notifications?.length}
                                        color='secondary'
                                        showZero>
                                        <NotificationsOutlinedIcon />
                                    </Badge>
                                </IconButton>
                                <Menu
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={closeMenu}
                                    sx={{
                                        '& .MuiMenu-paper': {
                                            background: 'transparent',
                                            mt: 1,
                                            px: 3,
                                            pb: 3,
                                            boxShadow: 'none',
                                        },
                                    }}>
                                    {notifications?.map((item, i) => (
                                        <MenuItem
                                            sx={{
                                                border: '1px solid rgba(0,0,0, 0.08)',
                                                width: '300px',
                                                borderRadius: '5px',
                                                paddingTop: '8px',
                                                paddingBottom: '12px',
                                                px: 1.5,

                                                background: 'white',
                                                '&:hover': {
                                                    background: 'white',
                                                },
                                                boxShadow:
                                                    'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                                marginBottom: 1,
                                                flexDirection: 'column',
                                            }}
                                            key={i}>
                                            <Grid container>
                                                <Grid item>
                                                    {item.type !== 'contact' ? (
                                                        <NotificationIcon
                                                            color='primary'
                                                            sx={{
                                                                fontSize: '1rem',
                                                                mt: 0.5,
                                                            }}
                                                        />
                                                    ) : (
                                                        <PersonIcon
                                                            color='primary'
                                                            sx={{
                                                                fontSize: '1rem',
                                                                mt: 0.5,
                                                            }}
                                                        />
                                                    )}
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='caption' pl={1}>
                                                        {item.title}{' '}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <ArrowRightIcon
                                                        sx={{
                                                            color: '#aaabad',
                                                            fontSize: '1.2rem',
                                                            mt: 0.5,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant='caption'
                                                        sx={{
                                                            color: '#aaabad',
                                                            fontSize: '0.6em',
                                                        }}>
                                                        {new Date(item.date).toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Typography
                                                variant='caption'
                                                component='p'
                                                color='textSecondary'
                                                sx={{
                                                    width: '95%',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                {item.description}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <IconButton onClick={openModal}>
                                    <Avatar
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                        src={serverImageUrl(picture)}
                                    />
                                </IconButton>
                                <Typography
                                    component='span'
                                    variant='subtitle1'
                                    color='primary'
                                    sx={{
                                        pl: 1.5,
                                        display: {
                                            xs: 'none',
                                            sm: 'inline-block',
                                        },
                                    }}>
                                    {firstName + ' ' + lastName}
                                </Typography>

                                <Profile modal={modal} closeModal={closeModal} />
                                {/* {loading ? (
                                    <CircularProgress
                                        size={20}
                                        color="primary"
                                        style={{ marginLeft: "8px" }}
                                    />
                                ) : (
                                    <Button
                                        variant="text"
                                        onClick={logout}
                                        color="primary"
                                        startIcon={<ExitToAppOutlined />}
                                        sx={{ textTransform: "none" }}>
                                        Log Out
                                    </Button>
                                )} */}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        display: 'flex',
                        minHeight: '100vh',
                        pt: 13,
                        pb: 4,
                        px: { xs: 2, md: 5 },
                    }}>
                    {props.children}
                </Box>
            </MainLayout>
        </>
    );
}

function menuItemsStates(menuItems) {
    const states = {};
    menuItems.forEach(menuItem => {
        if (Array.isArray(menuItem.to)) states[menuItem.label] = false;
    });
    return states;
}

export default Header;
