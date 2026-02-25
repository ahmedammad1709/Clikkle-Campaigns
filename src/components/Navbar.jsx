import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Stack,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
  ListItemButton,
  Menu,
  Link as MuiLink,
  MenuItem,
  Modal,
  useTheme as useMuiTheme,
  Skeleton,
  LinearProgress,
  Collapse,
  styled,
  useMediaQuery,
} from "@mui/material";

//mui icons
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";

//react component
import Image from "../components/Image";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

//services
import { useTheme } from "../styles/theme";
import { useMenu } from "../hooks/useMenu";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import SearchBar from "./SearchBar";

import { useMessage } from "./Header";
import { useUser } from "../hooks/Authorize";
import useModal from "./../hooks/useModal";
import ActionIcon from "./ActionIcon";
import { clearCookie, getCookie, setCookie } from "../utilities/cookies";
import { env, handleAxiosError, parseKB } from "../utilities/function";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Feedback from "./Feedback";
import { adminMenuItems, userMenuItems } from "../data/sidebarLinks";
import If from "./If";
import useHttpErrorHandler from "../utilities/httpErrorHandler";
import Notification from "@mui/icons-material/NotificationsNoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MicrophoneIcon from "./MicrophoneIcon";
import Edit from "@mui/icons-material/Edit";
import { BsBuildings } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Footer from "./Footer";
import api from "../utilities/axios";

const drawerWidth = 260;
const appsWidth = 54;
const miniDrawerWidth = 72;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
  borderRight: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: "none",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,

  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const ProfileOrganizationDropDown = () => {
  // const user = useAuthUser() || {};
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState({
    name: "Loading...",
    _id: "0",
  });
  const [organizations, setOrganization] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  // const changeOrganizationId = useChangeOrganizationId();
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const handleAddNew = () => {
    navigate("/create-organization");
  };

  const handleEdit = () => {
    navigate("/ListOrganization");
  };

  // const getOrganizations = useCallback(async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/v2/organizations/${user._id}`
  //     );

  //     let data = response.data.organizations;
  //     // console.log(data, "datass");

  //     setOrganization(data);

  //     let currentOrg = localStorage.getItem("org");
  //     if (currentOrg) {
  //       currentOrg = JSON.parse(currentOrg);
  //       setSelectedValue(currentOrg);
  //     } else {
  //       handleEdit();
  //     }
  //     // }
  //   } catch (e) {
  //     // console.log("Error List of Organization", e);
  //   }
  // }, [setSelectedValue]);

  const getOrganizations = async () => {
    try {
      const response = await api.get("/user/organizations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
        withCredentials: true, // Optional, if backend uses cookies
      });
      setOrganization(response.data.organizations);
      setSelectedValue(response.data.organizations[0]);
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };

  const handleChange = (organization) => {
    localStorage.setItem("org", JSON.stringify(organization));
    // changeOrganizationId(organization._id);
    // setTimeout(() => {
    //   startTransition(() =>
    //     organizations.length > 0
    //       ? navigate("/list-project")
    //       // : navigate("/project-selection", { state: { organization } })
    //   );
    // }, 500);
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  function getFirstCharacter(str) {
    if (str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase();
  }

  return (
    <div>
      <div
        onClick={toggleListVisibility}
        className="relative flex items-center justify-center gap-2 w-full"
      >
        <div className="flex items-center gap-1">
          <BsBuildings size={15} />
          <Avatar
            sx={{ bgcolor: "#FFFFFF", width: 15, height: 15, fontSize: 12 }}
          >
            {selectedValue?.logo && selectedValue?.log != "" ? (
              <img
                src={selectedValue?.logo}
                width="20"
                height="20"
                sx={{ p: 0.5 }}
              />
            ) : (
              getFirstCharacter(selectedValue?.name)
            )}
          </Avatar>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="bg-transparent text-[14px] truncate ... text-gray-500">
            {selectedValue?.name ?? "N/A"}
          </div>

          <div className="flex items-center text-gray-500 ms-6">
            <IoMdArrowDropdown size={20} />
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className={` mt-2 absolute transition-opacity duration-400 w-full ${
            isListVisible ? "opacity-100 z-50" : "opacity-0 z-0"
          }`}
          style={{ fontSize: "18px" }}
        >
          {isListVisible && (
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                backgroundColor: "background.default",
                border: 1,
                borderColor: "custom.border",
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
              }}
              className="shadow-lg"
            >
              <List sx={{ pb: 0 }}>
                {organizations.map((item, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    onClick={() => handleChange(item)}
                  >
                    <ListItemButton>
                      <Avatar
                        sx={{
                          bgcolor: "#FFFFFF",
                          width: 20,
                          height: 20,
                          fontSize: 12,
                          mr: 1,
                        }}
                      >
                        {item.logo && item.log != "" ? (
                          <img
                            src={item?.logo}
                            width="20"
                            height="20"
                            sx={{ p: 0.5 }}
                          />
                        ) : (
                          getFirstCharacter(item?.name)
                        )}
                      </Avatar>

                      <ListItemText
                        primary={
                          <div className="truncate text-[14px]">
                            {item.name}
                          </div>
                        }
                      />

                      {/* <ListItemText primary= {item.name} /> */}
                      {item?._id === selectedValue?._id &&
                        item?.type == selectedValue?.type && (
                          <DoneIcon sx={{ width: 16, height: 16 }} />
                        )}
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ justifyContent: "center" }}
                    className="flex justify-center gap-1 p-1"
                    onClick={handleAddNew}
                  >
                    <AddCircleOutlineOutlinedIcon
                      sx={{ width: 15, height: 15 }}
                    />

                    {/* <ListItemText  primary="Add " /> */}
                    <p className="text-[12px]">Add</p>
                  </ListItemButton>
                  <Divider orientation="vertical" flexItem />

                  <ListItemButton
                    sx={{ justifyContent: "center" }}
                    className="flex gap-1 p-1"
                    onClick={handleEdit}
                  >
                    <EditIcon sx={{ width: 15, height: 15 }} />
                    <p className="text-[12px]">Edit</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Navbar(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarApps, setSidebarApps] = useState(null);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const role = "user";
  const [editable, setEditable] = useState(false);
  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;
  const [collapsesState, setCollapsesState] = useState(
    menuItemsStates(menuItems)
  );
  const [notifications, setNotifications] = useState(null);
  const [collapseDrawer, setCollapseDrawer] = useState(true);
  const [drawerHover, setDrawerHover] = useState(false);
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });
  const [stats, setStats] = useState(null);
  const httpErrorHandler = useHttpErrorHandler();
  const {
    anchorEl: anchorElNotification,
    openMenu: openNotification,
    closeMenu: closeNotification,
  } = useMenu();
  // const {
  //   modalState: feedbackState,
  //   openModal: openFeedback,
  //   closeModal: closeFeedback,
  // } = useModal();
  const { showError, showResponse } = useMessage();
  // const user = useUser();
  const user = JSON.parse(localStorage.getItem("user"));


  const [feedbackState, setFeedbackState] = useState(false);

  const openFeedback = () => setFeedbackState(true);
  const closeFeedback = () => setFeedbackState(false);





  const { toggleTheme, mode } = useTheme();
  const theme = useMuiTheme();

  const {
    anchorEl: anchorElProfile,
    openMenu: openProfileMenu,
    closeMenu: closeProfileMenu,
  } = useMenu();

  const {
    anchorEl: anchorElSettings,
    openMenu: openSettingsMenu,
    closeMenu: closeSettingsMenu,
  } = useMenu();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setCollapseDrawer(!collapseDrawer);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    setIsOrderChanged(true);
    const draggingJob = sidebarApps[source.index];
    sidebarApps.splice(source.index, 1);
    sidebarApps.splice(destination.index, 0, draggingJob);
    setSidebarApps([...sidebarApps]);
  };

  // const getPlatforms = useCallback(async () => {
  // 	try {
  // 		const response = await axios.get('/platforms?sortBy=name&direction=1', {
  // 			baseURL: env('AUTHENTICATION_SERVER'),
  // 		});

  // 		const { success, errors, platforms } = response.data;
  // 		if (!success) return showError(errors);
  // 		const SidebarApps = platforms?.filter(
  // 			(platform) => platform.slug !== 'campaigns'
  // 		); // Platform to exclude from list
  // 		SidebarApps.forEach((app, i) => (app.order = i + 1));
  // 		const arrangedOrder = [];
  // 		user?.personalize?.appsOrder.forEach((order) => {
  // 			SidebarApps.forEach((app, i) => {
  // 				if (order === app.order) {
  // 					arrangedOrder.push(app);
  // 					SidebarApps.splice(i, 1);
  // 				}
  // 			});
  // 		});

  // 		if (arrangedOrder.length)
  // 			setSidebarApps([...arrangedOrder, ...SidebarApps]);
  // 		else setSidebarApps(SidebarApps);
  // 	} catch (e) {
  // 		console.log(e);
  // 	}
  // }, [user, showError]);

  const saveOrder = async () => {
    const accessToken = getCookie("accessToken");
    const appsOrder = sidebarApps.map((app) => app.order);

    try {
      const response = await api.patch(
        "/user/personalize",
        { appsOrder },
        {
          baseURL: env("AUTHENTICATION_SERVER"),
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const { success, errors } = response.data;

      if (!success) return showError(errors);

      setCookie("side_apps_order", appsOrder);
      showResponse("Setting updated");
    } catch (e) {
      handleAxiosError(e, showError);
    } finally {
      setIsOrderChanged(false);
    }
  };

  // const fetchNotification = useCallback(async () => {
  // 	try {
  // 		const response = await axios.get('/user/notifications',
  // 			{"Authorization": `Bearer ${localStorage.getItem('refreshToken')}`});
  // 		setNotifications(response.data.notifications);
  // 	} catch (e) {
  // 		httpErrorHandler(e);
  // 	}
  // }, [setNotifications, httpErrorHandler]);

  const modifyCollapsesState = (key) => {
    setCollapsesState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleClick = () => {
    if (localStorage.getItem("tourOpen")) {
      return;
    }
    localStorage.setItem("tourOpen", "true");
  };
  const signOut = () => {
    clearCookie("accessToken");
    clearCookie("role");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    const redirectTo =
      env("AUTHENTICATION_CLIENT") +
      "/logout?redirectto=" +
      "https://clikkle.com/campaigns";
    window.location.replace(redirectTo);
  };

  // const getStorage = useCallback(
  // 	async (id) => {
  // 		// console.log('Storage Stats...');
  // 		try {
  // 			const response = await axios.get(`/open/stats/${id}`, {
  // 				baseURL: env('FILES_SERVER'),
  // 				withCredentials: false,
  // 			});

  // 			const { success, errors, stats } = response.data;
  // 			if (!success) return showError(errors);

  // 			setStats(stats);
  // 		} catch (e) {
  // 			handleAxiosError(e, showError);
  // 		}
  // 	},
  // 	[setStats, showError]
  // );

  // useEffect(() => {
  // 	fetchNotification();
  // }, [fetchNotification]);

  // useEffect(() => {
  // 	user && getPlatforms();
  // }, [user, getPlatforms]);

  // useEffect(() => {
  // 	user && getStorage(user._id);
  // }, [user, getStorage]);

  const drawer = (
    <Box
      minHeight="100dvh"
      color="text.secondary"
      display="flex"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        component={Link}
        to="/"
        sx={{ textDecoration: "none", color: "text.primary", py: 1 }}
      >
        <Image
          cdn="https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20Black%20Text).png"
          sx={{ height: "45px" }}
        />
        <Typography
          color="text.secondary"
          variant="body2"
          fontWeight="bold"
          sx={{ position: "absolute", bottom: 0, left: "28%" }}
        >
          Beta
        </Typography>
      </Box>

      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100dvh - 90px)",
          flexGrow: 1,
        }}
      >
        <Button
          className="create"
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{
            mt: 1,
            mx: 3,
            display: "flex",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
          }}
          startIcon={<Edit />}
        >
          Create
        </Button>
        <Typography pl={3} mt={1.5} fontSize="14px" fontWeight={500}>
          Campaigns
        </Typography>
        <List sx={{ px: 3, py: 1 }}>
          {menuItems.map((link) => (
            <NavLink
              to={link.to}
              key={link.label}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {({ isActive }) => (
                <>
                  <ListItemButton
                    disableRipple
                    disableTouchRipple
                    variant="sidebarButton"
                    {...(Array.isArray(link.to)
                      ? {
                          selected: collapsesState[link.label],
                          variant: "sidebarDropDown",
                          onClick: () => modifyCollapsesState(link.label),
                          sx: { pr: 0 },
                        }
                      : {
                          to: link.to,
                          selected: isActive,
                        })}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "35px",
                        color: "text.secondary",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.label} />
                    <If
                      condition={Array.isArray(link.to)}
                      so={
                        <If
                          condition={collapsesState[link.label]}
                          so={<ExpandMore fontSize="small" />}
                          otherwise={
                            <ChevronRightOutlinedIcon fontSize="small" />
                          }
                        />
                      }
                      otherwise
                    />
                  </ListItemButton>
                  {Array.isArray(link.to) ? (
                    <Collapse
                      in={collapsesState[link.label]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        sx={{
                          p: "10px",
                          ml: 2,
                          py: 0,
                        }}
                      >
                        {link.to.map((subLink) => (
                          <NavLink
                            to={subLink.to}
                            key={subLink.name}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            {({ isActive }) => (
                              <ListItem disablePadding>
                                <ListItemButton
                                  selected={isActive}
                                  disableRipple
                                  disableTouchRipple
                                  variant="sidebarButton"
                                  sx={{ overflow: "hidden" }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: "35px",
                                      color: "text.secondary",
                                    }}
                                  >
                                    {subLink.icon}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={subLink.label}
                                    primaryTypographyProps={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            )}
                          </NavLink>
                        ))}
                      </List>
                    </Collapse>
                  ) : (
                    ""
                  )}
                </>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
      <Box>
        <Divider variant="middle" />
        {stats ? (
          <>
            <Typography
              variant="body2"
              pl={3}
              mt={1.5}
              fontSize="14px"
              fontWeight={500}
            >
              Storage
            </Typography>

            <Box px={3} pb={3}>
              <LinearProgress
                variant="determinate"
                value={(stats.used / stats.storage) * 100}
                color="primary"
                sx={{ borderRadius: "2px", mt: 1 }}
              />
              <Typography
                variant="caption"
                component="div"
                mt={1}
                color="primary.main"
              >
                {parseKB(stats.used)} used of {parseKB(stats.storage)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudOutlinedIcon fontSize="small" />}
                sx={{ mt: 1, color: "white" }}
                href={env("MY_ACCOUNT")}
                fullWidth
              >
                Upgrade storage
              </Button>
            </Box>
          </>
        ) : null}
        <Divider
          variant="middle"
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <List sx={{ px: 1, display: { xs: "block", sm: "none" } }}>
          <ListItem
            disablePadding
            onClick={openSettingsMenu}
            sx={{
              "&:hover": {
                backgroundColor: "custom.cardHover",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemButton
              disableRipple
              disableTouchRipple
              variant="sidebarButton"
            >
              <ListItemIcon
                sx={{
                  minWidth: "30px",
                  color: "text.secondary",
                }}
              >
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Stack
          direction="row"
          justifyContent="center"
          my={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <MuiLink
            display="inline-flex"
            alignItems="center"
            color="text.secondary"
            sx={{ cursor: "pointer" }}
            onClick={openFeedback}
          >
            <MicrophoneIcon />
            <Typography variant="caption" fontWeight="bold">
              Give feedback
            </Typography>
          </MuiLink>
        </Stack>
      </Box>
    </Box>
  );

  const miniDrawer = (
    <Box
      minHeight="100dvh"
      color="text.secondary"
      display="flex"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        component={Link}
        mb={3}
        to="/"
        sx={{ textDecoration: "none", color: "text.primary", py: 1 }}
      >
        <Image
          cdn="https://cdn.clikkle.com/images/campaigns/logo/2025/clikkle%20campaigns.png"
          sx={{ height: "50px" }}
        />
      </Box>

      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100dvh - 90px)",
          flexGrow: 1,
        }}
      >
        <List sx={{ px: 1 }}>
          {menuItems.map((link) => (
            <NavLink
              to={link.to}
              key={link.to}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton
                    disableRipple
                    disableTouchRipple
                    variant="sidebarButton"
                    {...(Array.isArray(link.to)
                      ? {
                          selected: collapsesState[link.label],
                          onClick: () => modifyCollapsesState(link.label),
                        }
                      : {
                          to: link.to,
                          selected: isActive,
                        })}
                    sx={{ height: "45px", my: "2px" }}
                  >
                    <ListItemIcon
                      sx={{
                        // minWidth: '35px',
                        color: "text.secondary",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        px: { xs: 0.5, xm: 0 },
        height: "100dvh",
        position: "relative",
      }}
    >
      <AppBar
        elevation={0}
        component={Box}
        position="sticky"
        sx={{
          width: {
            xs: "100%",
            xm:
              collapseDrawer && !drawerHover
                ? `calc(100% - ${drawerWidth}px)`
                : `calc(100% - ${miniDrawerWidth}px )`,
          },
          ml: {
            xm:
              collapseDrawer && !drawerHover
                ? `${drawerWidth}px`
                : `${miniDrawerWidth}px`,
          },
          backgroundColor: "background.default",

          borderBottom: "1px solid custom.border",
          transition: "225ms, background-color 0s",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            "&": {
              minHeight: "64px",
              px: 1,
            },
          }}
        >
          <Grid container alignItems="center" columnSpacing={1}>
            <Grid item>
              <IconButton
                onClick={matches ? handleDrawerOpen : handleDrawerToggle}
                edge="start"
                sx={{
                  ml: 0.2,
                  mr: 1,
                }}
              >
                <MenuIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Grid>

            <Grid item xs md={5} alignItems="start">
              <SearchBar />
            </Grid>
            <Grid item xs display={{ xs: "none", sm: "block" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0}
              >
                <IconButton onClick={openSettingsMenu}>
                  <SettingsIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElSettings}
                  open={Boolean(anchorElSettings)}
                  onClose={closeSettingsMenu}
                >
                  <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                      {mode === "dark" ? (
                        <LightModeIcon fontSize="small" />
                      ) : (
                        <DarkModeIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    Appearance
                  </MenuItem>
                </Menu>

                <IconButton onClick={openNotification}>
                  <Notification />
                </IconButton>
                <Menu
                  open={Boolean(anchorElNotification)}
                  anchorEl={anchorElNotification}
                  onClose={closeNotification}
                  sx={{
                    "& .MuiMenu-paper": {
                      background: "transparent",
                      mt: 1,
                      px: 3,
                      pb: 3,
                      boxShadow: "none",
                    },
                  }}
                >
                  {notifications?.map((item, i) => (
                    <MenuItem
                      sx={{
                        border: "1px solid rgba(0,0,0, 0.08)",
                        width: "300px",
                        borderRadius: "5px",
                        paddingTop: "8px",
                        paddingBottom: "12px",
                        px: 1.5,

                        background: "white",
                        "&:hover": {
                          background: "white",
                        },
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        marginBottom: 1,
                        flexDirection: "column",
                      }}
                      key={i}
                    >
                      <Grid container>
                        <Grid item>
                          {item.type !== "contact" ? (
                            <Notification
                              color="primary"
                              sx={{
                                fontSize: "1rem",
                                mt: 0.5,
                              }}
                            />
                          ) : (
                            <PersonIcon
                              color="primary"
                              sx={{
                                fontSize: "1rem",
                                mt: 0.5,
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item>
                          <Typography variant="caption" pl={1}>
                            {item.title}{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <ArrowRightIcon
                            sx={{
                              color: "#aaabad",
                              fontSize: "1.2rem",
                              mt: 0.5,
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#aaabad",
                              fontSize: "0.6em",
                            }}
                          >
                            {new Date(item.date).toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                        sx={{
                          width: "95%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <a href="https://apps.clikkle.com">
                  <IconButton>
                    <AppsIcon />
                  </IconButton>
                </a>
              </Stack>
            </Grid>
            <Grid item>
              <IconButton
                onClick={openProfileMenu}
                sx={{
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "primary.main",
                  p: "3px",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAmQMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAABAgMEBQYHAAj/xABAEAACAQMCAwUDCQYEBwAAAAABAgMABBEFIRIxQQYTUWFxIjKBBxQjM0KRobHBFVJi0eHwJHOCkhYlNDVTY3L/xAAaAQACAwEBAAAAAAAAAAAAAAADBAABAgUG/8QAIREAAgMAAgIDAQEAAAAAAAAAAAECAxESIQRBIjFRcTL/2gAMAwEAAhEDEQA/AJSGBcY2ArprQO2FOSOlRmuap80jAiXLscDNK6Bfy3TySTcKrgAUHpsGqpKHIlrWx4TlwPSn8cGB0oLaZJCVUjI507VaKhaUf0IsYxRwlHAowFWZwRkQYqPvrcvdWzBchW3p/e3EVrbvPO4SNBlmNUTWe2D3aFLJJEgzjK44n9azKSQWqiVj6LxKiKjEqNhnemcVgjN3kqjJ5DFZXd6xdzN3c00sgX3eMnJ+NL2N9daeqtazSCOU7YbGD4VlSfsNLxcXTNft4lAAAAFOQoU1SLXtdcRiJ54kmhcKAwBVgeud8Hr8Qat1jfRX0HeReO4PMUWLTAODj9j+Bx3q1MBthUFF9ctTAbYVbNVsVzQFqJxUBNUFDFqKW2NFJovFUKGb+8aLRnPtGi1YMomr2aSWbSNGWZRsBUJYxdy/HOWhhUem9WLVpriG14rYAtkZB8Ko11q17qN78yeMIXcAY2wKWS7HY2cYdl97PWxTjlR+JZDnc5qwpyphpVlHa20aR/u1IqKMhK2SnPUGAocUIoasxhRvlFvP+ns9iOEu438dvyqmxWc0wBhiYEEH2eXxFW/tham6189QsS7f360401Ut7RI0Xh8aStsxna8Wna0Uy9sJjH3hiIcHIwPChhaNrCeOQcLqQ0XmRg1oaxxyJhlBzTC/7N2tyAYR3b550ONu9MLOjPoo9tdiazSJmCqLkFfTmf1++rvouvJawuI7cvLM3FgHYDfA9etR3/BTrAVLhwMkcOxHpTDT7eez1MW8xJA6HY/0pmMu9QlZUsxmn6fP85jimMbR8X2W6VN52FQmn4EEPCMDAxtipjOwpkRgHzQZouaAmobBJopO1ATQE7VChufeNdRSfaNdvVmCr3kXHbuPKs+WJ11J2GeNW2NSATtVw8PEhB8jTP8AZGvd4ZO7XiPXNLOPYzCajHGaJ2feU2EffHLVLrVS7K/tkHgv0RIk5YO5q2LRkJ+xUUIoopjrtzPbaXLJaj6UkKDjOMnGajeLQldbsmor2Rs9qt1rl1xKcllUegUVD32o6daTd2LuLY4YcWSpzyNSOjpHNZXF5dKLiQMUMjjiJxjkT4VT5NLXu0uYbGGUyjjZpnO2d8cvh8K5vxnJtnoEpVRUV6LXZX1tKoaGeNwT0OakYT1znPnWbppyd6zwYtJFXJeN8qPWll1/W7e0hilhRONCyTSH7PiR8RW1V38TMrevkjTojsMnn5VC3FmbntCAqg5Vct4eJqv6b2m1aMJJMtrcwj3liJD49DVt0O/tL7U7hkdlnSJSYZFKsuevpuOXjR4LsRvkuPRPqAsgA5Cn+ajlP0gp9mmhCAcmgzRc0BNUaBzRSedcTQZqEETjJrqA8zXVegyuxXdocATJk8t6kERSM7ViWhOW1SzBY7SDrW1QvsPSsOOEl8Xg4UAUoKTBo4NRGRQGgmjE0Dxn7SkfHpQCjg1bW9GoycWmiA0+ERaO0DZjCuww3MDNRM1sLVGkt75IUO5ilTjTPkMgj7/hUh2iv0jkdDJgh8Y+6qfdm9W7+ccLSQKwCgEexnrv+dctRak0eiU+UVJ+ySNpJqhCzvEtspBaKNSpk6+1k54fLrUlrVirQ2t28btHCrRzCNcsqNghsdcED4E1CtY3zMk/dS8BIIePDY/25NJx38sYlju7x+7IICN7JYdedFjpUmsJK30/SJMSDUbdjF7uHVGXyO/LyqxaLCkl7eXqQKseEggkKYLqoJJ9CzH1xUJ2e1BLxEUxo7K/AHIBPlV0bCgKOQpij9Od5ksWAofpBT3NR6fWinpo7YjANmuzRc0FQ2CTXE7UFFNQoLQ5ouKGtAzENC0LURdWt13P0QcNnPStWiOMUw0Vl/ZVt7S5CYO9P48McqQfSs7pib1jtTtRwaRXYUcGqNCwNGFJA70fiVBl2CjONzzqbhaWvEUntnCV1NiGwxAkUDr0/Sm2k3iTSNAYwGIAwRzqX7YWg1RCImKzRZMbY5eX4VQEur3S7lTPEQYyaRaVjeHdg3XGKf4XFpDZTqsIki4z9knGaWuLC2dRd6hCJZIx7Jk3wfIGq7H22VHUtBy6kZ3pVdTve1F5FaWqFI2YEkjYDxrUa5r7JZdAmuzKrdasO4Xhgg9tjjqf1q6Od6Y6Rp8OmWqwQ79Xc82PjTxudM1rijk3T5y05PrBT2mSfWCnfFWmzMEGzXZohNBnappvAxoKLvXZ2qFYdQ0WhrYA89jVb6Ad0lzMqjkA1aN8nU81zpMsk8ryN3hGXOfCszuo+GdhjbOa0TsNdwaboJN2xR3kLJHj2mHiB4edMXNcMCWQwuuaaahqdnpqcV7cJGei5yx9Bzqna72tuSWitpEtI/4CHlP6D76pc99K0rNxMxbm7niY/fypZR0wol91Tt9HF7Fhbg7/AFk5wB8BzqJ0jtPdX+uW7X05KFmCDGArEbbfh8aplw/EVJznzronIbIJBHIjpVyhyi4hq2oSUjZ2Uvlm3zTG+0+GZfbQHzNNuy2srqljwyN/iIgBIv5MPI1MYGGB5VyHGUJYdpTU46VNdBtnkI7kLg5zirDosFnoULXMiPwkgO43IycD4b04WFWfbGfKg1iIr2c1FtuIQllPmNx+IpmqTb7Fr4pReEwuqae4DR3UZB5HiFKR3ME2TFIrAeBrGprjuLiVlHFGTl4iM5HLI8wPvqzdlNa02xjaK5jdBIeJJYzxKR6HcfjTjg/Rxo2J/wCjRo+EnIIpXNROny2904e0uUkXnhW3HqOYqSJwaxozDA5NdxUmTQiobwPmu4qr2sdqrLSLs292soIUNxKuRvn+VNF7eaMRnvJP9taxmW0W0UNVzS+1unanepaWveGR87ldtqsHFW0LGKxWkXzpp7of4aL2nGfePRf78KjNW1AXcrFURV6YUCh1nUu/k7iA/QRk7j7R6moomiDlsk5PBeOXuxgjKnp4UaQcIB5qdwabg7YpRGLQlDzVqgFoLJufSuXOM0PvOw8DQov0hXxFQg7sb64067S5tW4ZF3Hgw6g+VaToHaCx1iMRKwguTzhY7k/wnrWWqC0ZA95N/UVwzs8Zxj8DQbKY2fYWq6Vf0bhBbAHOefhUP2z1SK3sDp6OpeXBdeoUb7+tUG37Ua7DEIVv5uEbDKKzD/URmmUksrrNLKzMzj3mPtEmhw8fi+y7/K5RxAuTJdqFPtOjY/8ArmPyoLWVUkEL7QzHMefsP1Hof5V0h7u5tmHNCM0W8ixLNCR7LniQ+DU0c9Y1xZJaRqlxp14z27sskW653wcgH8DWq6DrcWtWzSKAs0e0iD8x5ViXfOwM5+tVcP5kb/kKtGg6uNM1O1vlOLe4AEo/h5H7iM1icdRqDdU1+M1mhBomQeRyOhFCKXOhhmfylf8AcpP8pPzNUuFwucrk4wKuPylt/wA0l/yk/M1SFNN+l/ALLn8n2/aGDPRGrVqyf5N2B7Swhv3G/Stg4Y6GwEovTzPnNdRRRh1oocEc6Uh95qSFKQ+8ahT+g0X13rRo/rs0WH38+dKR+/8ACphhhyTHLxAbZosqCGXbdGpWbkPSglGbZahQMZZDgNt0pSTLGNTzLAmkofqk+NK5JuI/QVDEkBN7bE+dOLle9i81ww9D/WkT9XS45xjxRgamA31gxbAdZPszLwuPPl+dHtJi1mIc7xS5Hoef5UnPtGQOh/lQWfKQ9aoM1sTXuxGqftHQowzZktz3TE9R0P3bfCrCrVmnydzSR3N4iOQphBI8w39TWhwMWUFjk0rYskMUy2JmvyksDrEg/wDUn61TENal8oNpbzJpzSRKWefgZuRIwTjNEtOyuiMkZaxBJUE/SP4etHU1xRHErPyecMnaaAFygCOeJfStV7xf/LN94/lUHb6HpmmH5zY2ixTLsHDEkA8+ZpTvpP3zSt9mS6HPG8dTjrZ//9k="
                  sx={{ width: 30, height: 30 }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorElProfile}
                open={Boolean(anchorElProfile)}
                onClose={closeProfileMenu}
                sx={{
                  ".MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                    width: "min(100%, 320px)",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                    border: "1px solid #00000017",
                    bgcolor: "custom.menu",
                    px: 0.5,
                    pt: 1.5,
                  },
                }}
              >
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://shorturl.at/fjqz9"
                      sx={{ width: 100, height: 100 }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="substitle1"
                      component="div"
                      fontWeight={600}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.firstName + " " + user.lastName}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="a"
                      href={env("MY_ACCOUNT")}
                      color="primary.main"
                      display="block"
                    >
                      My Clikkle account
                    </Typography>
                    <Typography
                      variant="caption"
                      component="a"
                      href="#"
                      color="primary.main"
                      display="block"
                    >
                      My Profile
                    </Typography>
                  </Grid>
                </Grid>
                <Stack direction="row" mt={2}>
                  <Button variant="text" fullWidth>
                    Add account
                  </Button>
                  <Button variant="text" onClick={signOut} fullWidth>
                    Sign out
                  </Button>
                </Stack>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>

        <Box
          sx={{
            width: appsWidth,
            display: { xs: "none", xm: "block" },
            backgroundColor: "background.default",
            zIndex: "1200",
            position: "absolute",
            right: 0,
            top: 65,
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            overflow="hidden"
            px={0.8}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="apps" isDropDisabled={!editable}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {sidebarApps ? (
                      sidebarApps.map((app, i) => (
                        <Draggable
                          key={app.order}
                          draggableId={app.name}
                          index={i}
                          isDragDisabled={!editable}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ActionIcon
                                title={editable ? "" : app.name}
                                href={app.url}
                                src={app.logo}
                                key={app.order}
                                sx={{
                                  mt: 0.8,
                                  width: "auto",
                                }}
                                // imageSx={{
                                //   filter:
                                //     editable &&
                                //     `drop-shadow(0px 2px 2px ${theme.palette.primary.main})`,
                                // }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <Box mt={2}>
                        {Array(8)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton
                              variant="circular"
                              animation="wave"
                              key={i}
                              width={35}
                              height={35}
                              sx={{ mb: 2 }}
                                                                imageSx={{
                                    filter:
                                      editable &&
                                      `drop-shadow(0px 2px 2px ${theme.palette.primary.main})`,
                                  }}
                            />
                          ))}
                      </Box>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Divider variant="middle" sx={{ my: 2, width: "80%" }} />
            {editable ? (
              <ActionIcon
                title="Save"
                icon={<DoneIcon fontSize="small" />}
                onClick={() => {
                  setEditable(false);
                  if (isOrderChanged) saveOrder();
                }}
              />
            ) : (
              <ActionIcon
                title="Edit"
                icon={<EditIcon fontSize="small" />}
                onClick={() => setEditable(true)}
              />
            )}
          </Stack>
        </Box>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { xm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "custom.menu",
        }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", xm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "custom.menu",
            },
          }}
        >
          {drawer}
        </MuiDrawer>
        <Drawer
          variant="permanent"
          open={collapseDrawer}
          hover={drawerHover}
          onMouseOver={() => {
            if (!collapseDrawer) {
              setCollapseDrawer(true);
              setDrawerHover(true);
            }
          }}
          onMouseLeave={() => {
            if (drawerHover) {
              setCollapseDrawer(false);
              setDrawerHover(false);
            }
          }}
          sx={{
            display: { xs: "none", xm: "block" },
            p: 0,
            "& .MuiDrawer-paper": {
              boxShadow: drawerHover
                ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                : "none",
            },
          }}
        >
          {collapseDrawer ? drawer : miniDrawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          width: {
            xs: "100%",
            xm:
              collapseDrawer && !drawerHover
                ? `calc(100% - ${drawerWidth + appsWidth}px)`
                : `calc(100% - ${appsWidth + miniDrawerWidth}px )`,
          },
          ml: {
            xm:
              collapseDrawer && !drawerHover
                ? `${drawerWidth}px`
                : `${miniDrawerWidth}px`,
          },
          mt: 1,
          p: 2,
          height: { xs: "calc(100dvh - 90px)" },
          backgroundColor: "background.default",
          borderRadius: "12px",
          overflowY: "auto",
          transition: "225ms, background-color 0s",
        }}
      >
        {children}
      </Box>



            <Modal
        open={feedbackState}
        onClose={closeFeedback}
        sx={{
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Feedback open={feedbackState} onClose={closeFeedback} />
      </Modal>
    </Box>
  );
}

function menuItemsStates(menuItems) {
  const states = {};
  menuItems.forEach((menuItem) => {
    if (Array.isArray(menuItem.to)) states[menuItem.label] = false;
  });
  return states;
}
