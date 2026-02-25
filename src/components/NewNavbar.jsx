import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoPersonOutline, IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { PiChatTeardropText, PiSignOut } from "react-icons/pi";
import { IoVideocamOutline } from "react-icons/io5";
import DoneIcon from "@mui/icons-material/Done";

import { TbGridDots } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSearch,
  IoMdArrowBack,
} from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CgMenuGridR } from "react-icons/cg";
import {
  AppBar,
  Box,
  Stack,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  ListItemButton,
  Menu,
  MenuItem,
  useTheme as useMuiTheme,
  styled,
  useMediaQuery,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../components/AnimatedBell";
import Clikklebrand from "../assets/esignlogo.png";
import { useTheme } from "../styles/theme";
import { useMenu } from "../hooks/useMenu";
import SearchBar from "./SearchBar";

import { useMessage } from "./Header";
import { useUser } from "../hooks/Authorize";
import { clearCookie, getCookie, setCookie } from "../utilities/cookies";
import { env } from "../utilities/function";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import Footer from "../pages/Footer";
import ClikkleAds from "../assets/ClikkleFavicons/Clikkle Ads favicon.png";
import ClikkleMail from "../assets/ClikkleFavicons/Clikkle Mail-01.png";
import ClikkleCampaigns from "../assets/ClikkleFavicons/Clikkle Campaigns favicon.png";
import ClikkleHr from "../assets/ClikkleFavicons/hr favicon.png";
import ClikkleFiles from "../assets/ClikkleFavicons/Clikkle Files favicon.png";
import ClikkleHost from "../assets/ClikkleFavicons/Clikkle Host-favicon.png";
import ClikklePitch from "../assets/ClikkleFavicons/Clikkle Pitch-favicon.png";
import ClikkleProject from "../assets/ClikkleFavicons/Clikkle Projects-01.png";
import ClikkleCrew from "../assets/ClikkleFavicons/Clikkle Crew Logo.png";
import ClikkleLaunch from "../assets/ClikkleFavicons/Clikkle Launch favicon.png";

import ActionIcon from "./ActionIcon";
import ProfileMenuModal from "./ProfileMenuModal";
// import TrialEndModal from "./TrialEndModal";
import { FiSettings } from "react-icons/fi";
import TopNavigation from "./TopNavigation";
// import SignIcon from "../style/icons/icon-sign.png";
// import DocIcon from "../style/icons/icon-doc.png";
// import TempIcon from "../style/icons/icon-template.png";
import GradientButton from "./GradientButton";
import { Save } from "@mui/icons-material";
import { userMenuItems } from "../data/sidebarLinks";

// const userMenuItems = [
//   {
//     label: "Sign",
//     to: "/",
//     icon: SignIcon,
//     subItems: [
//       { label: "Sign", to: "/sign" },
//       // { label: "Overview", to: "/sign/overview" },
//     ],
//   },
//   {
//     label: "Documents",
//     to: "/documents",
//     icon: DocIcon,
//     subItems: [
//       { label: "All", to: "/documents" },
//       { label: "Completed", to: "/documents/completed" },
//       { label: "Awaiting", to: "/documents/awaiting" },
//       { label: "Voided", to: "/documents/voided" },
//       { label: "Draft", to: "/documents/draft" },
//       { label: "Received", to: "/documents/received" },
//       { label: "Trash", to: "/documents/trash" },
//     ],
//   },
//   {
//     label: "Templates",
//     to: "/templates",
//     icon: TempIcon,
//     subItems: [
//       { label: "Manage", to: "/templates" },
//       { label: "New", to: "/templates/new" },
//     ],
//   },
// ];
// Clikkle apps


const clikkleApps = [
  {
    name: "Worksuite",
    url: "https://worksuite.clikkle.com",
    logo: "https://cdn.clikkle.com/images/worksuite/2025/clikkle%20worksuite.png",
  },
  {
    name: "Campaigns",
    url: "https://campaigns.clikkle.com/",
    logo: "https://cdn.clikkle.com/images/campaigns/logo/2025/clikkle%20campaigns.png",
  },
  {
    name: "Chat",
    url: "https://chat.clikkle.com/",
    logo: "https://cdn.clikkle.com/images/chat/logo/2025/clikkle%20chat.png",
  },
  {
    name: "eSign",
    url: "https://esign.clikkle.com/",
    logo: "https://cdn.clikkle.com/images/e-sign/logo/2025/clikkle%20esign.png",
  },
  {
    name: "Files",
    url: "https://files.clikkle.com/",
    logo: "https://cdn.clikkle.com/images/files/logo/2025/clikkle%20files.png",
  },
  {
    name: "HR",
    url: "https://hr.clikkle.com/",
    logo: "https://cdn.clikkle.com/images/hr/logo/2025/clikkle%20hr.png",
  },
  {
    name: "Projects",
    url: "https://projects.clikkle.com/",
    logo: "https://cdn.clikkle.com/images/projects/logo/2025/clikkle%20projects.png",
  },
];

const drawerWidth = 260;
const appsWidth = 48;
const miniDrawerWidth = 105;

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
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
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

export default function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarApps, setSidebarApps] = useState(clikkleApps);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState(null);
  const [collapseDrawer, setCollapseDrawer] = useState(false);
  const [drawerHover, setDrawerHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  const requiredPath = pathname?.split("/").pop();
  const hasMultipleSlashes = (pathname?.match(/\//g) || []).length > 1;
  const [themeToggle, setThemeToggle] = useState("dark");
  const { toggleTheme, mode } = useTheme();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { showError, showResponse } = useMessage();
  const platformUser = JSON.parse(localStorage.getItem("user"));
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });
  const themee = useTheme();
  const theme = useMuiTheme();
  const {
    anchorEl: anchorElProfile,
    openMenu: openProfileMenu,
    closeMenu: closeProfileMenu,
  } = useMenu();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerOpen = () => {
    setCollapseDrawer(!collapseDrawer);
  };
  const handleSetting = () => {
    navigate("/settings");
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
  // const getProfile = useCallback(async () => {
  //   const role = getCookie("role");
  //   const accessToken = getCookie("accessToken");
  //   if (!(accessToken && role)) return;
  //   try {
  //     const response = await axios.get(`/${role}/profile`, {
  //       baseURL: env("AUTHENTICATION_SERVER"),
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     });
  //     const user = response.data.user;
  //     setUser(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setUser]);

  // const getPlatforms = useCallback(async () => {
  //   try {
  //     const response = await axios.get("/platforms?sortBy=name&direction=1", {
  //       baseURL: env("AUTHENTICATION_SERVER"),
  //     });
  //     const { success, errors, platforms } = response.data;
  //     if (!success) return showError(errors);
  //     const SidebarApps = platforms?.filter(
  //       (platform) => platform.slug !== "e-sign"
  //     );
  //     SidebarApps.forEach((app, i) => (app.order = i + 1));
  //     const arrangedOrder = [];
  //     user?.personalize?.appsOrder.forEach((order) => {
  //       SidebarApps.forEach((app, i) => {
  //         if (order === app.order) {
  //           arrangedOrder.push(app);
  //           SidebarApps.splice(i, 1);
  //         }
  //       });
  //     });
  //     if (arrangedOrder.length)
  //       setSidebarApps([...arrangedOrder, ...SidebarApps]);
  //     else setSidebarApps(SidebarApps);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [user, showError]);

  // const saveOrder = async () => {
  //   const accessToken = getCookie("accessToken");
  //   const appsOrder = sidebarApps.map((app) => app.order);
  //   try {
  //     const response = await axios.patch(
  //       "/user/personalize",
  //       { appsOrder },
  //       {
  //         baseURL: env("AUTHENTICATION_SERVER"),
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     );
  //     const { success, errors } = response.data;
  //     if (!success) return showError(errors);
  //     setCookie("side_apps_order", appsOrder);
  //     showResponse("Setting updated");
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setIsOrderChanged(false);
  //   }
  // };
  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    clearCookie("accessToken");
    clearCookie("userId");
    clearCookie("fullName");
    clearCookie("role");
    window.location.href = "/login"; // or a custom route
    // clearCookie("accessToken");
    // localStorage.removeItem("subscriptionId");
    // localStorage.removeItem("org");
    // localStorage.removeItem("user");
    // const redirectTo =
    //   env("AUTHENTICATION_CLIENT") +
    //   "/logout?redirectto=" +
    //   encodeURIComponent(env("DOMAIN")) +
    //   "&&referrer=" +
    //   encodeURIComponent(env("DOMAIN"));
    // window.location.replace(redirectTo);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // useEffect(() => {
  //   getProfile();
  // }, [getProfile]);

  // useEffect(() => {
  //   user && getPlatforms();
  // }, [user, getPlatforms]);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
  const SideBarLinkButton = ({ menus }) => {
    return (
      <>
        {menus.map((link, index) => (
          <div key={index}>
            <NavLink
              to={link.to}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <>
                  <ListItemButton
                    selected={isActive}
                    onClick={() => {
                      setCollapseDrawer(false);
                      setDrawerHover(false);
                    }}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                  {/* {link.subItems && (
                    <Collapse in={isActive}>
                      <List>
                        {link.subItems.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.to}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <ListItemButton>
                              <ListItemText primary={subItem.label} />
                            </ListItemButton>
                          </NavLink>
                        ))}
                      </List>
                    </Collapse>
                  )} */}
                </>
              )}
            </NavLink>
          </div>
        ))}
      </>
    );
  };

  const drawer = (
    <Box
      minHeight="100dvh"
      color="text.secondary"
      display="flex"
      flexDirection="column"
      className="w-full gap-4 p-3 items-center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="gap-2 justify-center items-center"
      >
        <div
          className="relative cursor-pointer"
          onMouseOver={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
        >
          <img
            src={
              "https://cdn.clikkle.com/images/campaigns/logo/2025/clikkle%20campaigns.png"
            }
            alt="Clikkle campaigns"
            style={{ height: "40px" }}
            // className={`${menuHover ? "opacity-25" : ""}`}
            onClick={handleDrawerToggle}
          />
        </div>
        <h1 className="font-semibold">Clikkle Campaigns</h1>
      </Box>
      <Divider variant="middle" sx={{ margin: 0, padding: 0, width: "100%" }} />
      <Box
        className="w-full"
        sx={{ overflowY: "auto", height: "calc(100dvh - 90px)", flexGrow: 1 }}
      >
        <List className="w-full">
          <GradientButton />
          <br />
          <SideBarLinkButton menus={userMenuItems} />
        </List>
      </Box>
    </Box>
  );

  const [visibleCount, setVisibleCount] = useState(9);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const menuRef = useRef(null);
  const [trialEndOpen, setTrialEndOpen] = useState(false);

  const handleMoreClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseSideMenu = () => {
    setAnchorElMenu(null);
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      if (menuRef.current) {
        const height = menuRef.current.clientHeight;
        const iconHeight = 60;
        const count = Math.floor(height / iconHeight);
        setVisibleCount(
          count >= userMenuItems.length ? userMenuItems.length : count
        );
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [userMenuItems.length]);

  const miniDrawer = (
    <Box
      color="text.secondary"
      display="flex"
      flexDirection="column"
      className="h-full justify-between gap-6 items-center p-3 overflow-auto no-scrollbar"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <div
          className="relative cursor-pointer"
          onMouseOver={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
        >
          <div onClick={() => navigate("/")}>
            <img
              src={
                "https://cdn.clikkle.com/images/campaigns/logo/2025/clikkle%20campaigns.png"
              }
              alt="Clikkle Campaigns"
              style={{ height: "35px" }}
              // className={`${menuHover ? "opacity-25" : ""}`}
            />
          </div>
        </div>
      </Box>
      <div
        className="h-full w-full flex flex-col gap-3 items-center justify-start"
        ref={menuRef}
      >
        {/* {userMenuItems
          .filter((link) => link !== false)
          .slice(0, visibleCount)
          .map((link, index) => {
            const isActive =
              location.pathname === link.to ||
              (Array.isArray(link.to) &&
                link.to.some((subLink) => location.pathname === subLink.to)) ||
              (link.subItems &&
                link.subItems.some(
                  (subItem) => location.pathname === subItem.to
                )) ||
              location.pathname?.startsWith(link.to + "/");
            return (
              <div
                key={index}
                onClick={() => navigate(link.to)}
                className="w-full flex flex-col gap-1 justify-center items-center cursor-pointer"
              >
                <div
                  style={{
                    padding: "4px",
                    // backgroundColor: isActive ? "#121d27" : "",
                    color: isActive ? "#fff" : "",
                  }}
                  className={`p-1 rounded-lg ${
                    themee.mode === "dark" ? "bg-[#181818]" : "bg-neutral-200"
                  }`}
                >
                  <img
                    src={link.icon}
                    alt="Template"
                    className="w-6 h-6"
                    style={{
                      filter: isActive
                        ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1548%) hue-rotate(187deg) brightness(101%) contrast(101%)"
                        : "none",
                    }}
                  />
                </div>
                <h1
                  className="text-[10px]"
                  style={{ color: isActive ? "#0080FF" : "" }}
                >
                  {link.label}
                </h1>
              </div>
            );
          })} */}
        <List sx={{ px: 2 }}>
          {userMenuItems.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.subTabs &&
                link.subTabs.some((sub) =>
                  location.pathname?.startsWith(sub.to)
                ));

            return (
              <NavLink
                to={link.to}
                key={link.label}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem
                  sx={{ width: "70px", height: "70px", position: "relative" }}
                >
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor: isActive ? "primary.100" : "transparent",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                      // px: 1.5,
                      position: "relative", // Needed for absolute text
                      // height: "100%",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "primary.main" : "text.secondary",
                        minWidth: "unset",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>

                    {/* Visually move the text out */}
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontSize: "10px",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                      sx={{
                        position: "absolute",
                        bottom: "-20px", // Move it below the box
                        color: isActive ? "primary.main" : "text.secondary",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            );
          })}
        </List>

        {visibleCount < userMenuItems.length && (
          <>
            <div
              onClick={handleMoreClick}
              className="w-full flex flex-col gap-1 justify-center items-center cursor-pointer"
            >
              <div
                style={{
                  backgroundColor:
                    themee.mode === "dark" ? "#181818" : "#F3F3F3",
                }}
                className="p-1 rounded-lg"
              >
                <MoreHorizIcon />
              </div>
              <h1 className="text-[10px]">More</h1>
            </div>
            <Menu
              className="left-10"
              anchorEl={anchorElMenu}
              open={Boolean(anchorElMenu)}
              onClose={handleCloseSideMenu}
            >
              {userMenuItems
                .filter((link) => link !== false)
                .slice(visibleCount)
                .map((link, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      navigate(link.to);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img src={link.icon} alt="" />

                      <span>{link.label}</span>
                    </div>
                  </MenuItem>
                ))}
            </Menu>
          </>
        )}
      </div>
    </Box>
  );

  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [openPlusIcon, setOpenPlusIcon] = useState(false);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [previewItems, setPreviewItems] = useState([]);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenPlusIcon(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                : `calc(100% - ${miniDrawerWidth}px)`,
          },
          ml: {
            xm:
              collapseDrawer && !drawerHover
                ? `${drawerWidth}px`
                : `${miniDrawerWidth}px`,
          },
          backgroundColor: "background.default",
          borderBottom: "1px solid custom.border",
          color: "text.primary",
          transition: "ease-in-out 225ms, background-color 0s",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            padding: 0,
            "&": {
              minHeight: "55px",
              px: 0,
              py: 0,
            },
          }}
        >
          <div
            style={{ borderBottom: { xs: "1px solid #1F1F1F", md: "none" } }}
            className="w-full flex gap-3 justify-between items-center p-2 sm:p-2 md:p-2 lg:p-0"
          >
            <div className="md:hidden">
              <VscMenu
                className="text-2xl mx-4"
                onClick={matches ? handleDrawerOpen : handleDrawerToggle}
              />
            </div>
            {/* 
            <div className="hidden lg:flex">
              <div className="flex items-center gap-2">
                {hasMultipleSlashes ? (
                  <IoMdArrowBack size={20} onClick={() => navigate(-1)} />
                ) : (
                  <></>
                )}
                <p className="w-fit text-[14px]">
                  {requiredPath
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
              </div>
            </div> */}
            <span className="sm:block hidden">
              <TopNavigation />
            </span>

            <div className="w-full md:hidden flex flex-row gap-1 justify-between items-center rounded-[20px] h-[40px]">
              <SearchBar />
            </div>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={0}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <div className="w-fit hidden md:flex flex-row gap-3 justify-center items-center px-1 text-nowrap">
                {isSearchOpen && <SearchBar />}

                <GradientButton />
                <div className="relative inline-block">
                  <button
                    className="p-1 bg-[#0080FF14] bg-opacity-25 rounded-lg"
                    title="Create Campaign"
                    onClick={() => navigate("/create")}
                  >
                    <BsPlusLg size={"20px"} color="#0080FF" />
                  </button>
                  {openPlusIcon && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-50 mt-2 w-60 rounded-lg shadow-lg"
                      style={{
                        backgroundColor:
                          themee.mode === "dark" ? "#171717" : "#fff",
                      }}
                    >
                      <div className="flex justify-between items-center px-4 py-2 border-b">
                        <h3 className="font-medium text-sm">Quick Actions</h3>
                        <IconButton
                          onClick={() => setOpenActionModal(true)}
                          sx={{ bgColor: "transparent" }}
                        >
                          <FiSettings
                            className="cursor-pointer text-[#0080ff]"
                            size={16}
                          />
                        </IconButton>
                      </div>
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring bg-transparent"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {previewItems?.map((item, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 text-sm cursor-pointer"
                            onClick={() => {
                              setOpenPlusIcon(false);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* <QuickActionModal
                    previewItems={previewItems}
                    setPreviewItems={setPreviewItems}
                    open={openActionModal}
                    setOpen={setOpenActionModal}
                  /> */}
                </div>
                <IconButton
                  title="Search"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <IoIosSearch />
                </IconButton>
                <Notification
                // setTrialEndOpen={setTrialEndOpen}
                />
                {/* <Link> */}
                  <IconButton title="chat clikkle" href={"https://chat.clikkle.com"}>
                    <PiChatTeardropText />
                  </IconButton>
                {/* </Link> */}
                {/* <Link > */}
                  <IconButton title="Video Call" href={"https://crew.clikkle.com"}>
                    <IoVideocamOutline />
                  </IconButton>
                {/* </Link> */}
                <IconButton
                  title="App"
                  target="_blank"
                  href={"https://apps.clikkle.com/"}
                >
                  <CgMenuGridR />
                </IconButton>
                <IconButton
                  onClick={() => {
                    window.location.reload();
                    toggleTheme();
                    window.location.reload();
                  }}
                >
                  <IoSettingsOutline
                    size={"20px"}
                    // onClick={handleSetting}
                  />
                </IconButton>
                <IconButton
                  onClick={openProfileMenu}
                  sx={{
                    width: "45px",
                    height: "45px",
                    padding: 0,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#3b84d9",
                    borderRadius: "50%", // makes it round
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {platformUser.profilePicture ? (
                    <img
                      src={platformUser.profilePicture}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="subtitle1"
                      fontWeight={500}
                      fontSize={14}
                      sx={{
                        color: "#3b84d9",
                      }}
                    >
                      {platformUser?.firstName && platformUser?.lastName
                        ? platformUser.firstName.charAt(0).toUpperCase() +
                          platformUser.lastName.charAt(0).toUpperCase()
                        : "?"}
                    </Typography>
                  )}
                </IconButton>

                <ProfileMenuModal
                  anchorElProfile={anchorElProfile}
                  closeProfileMenu={closeProfileMenu}
                />
              </div>
            </Stack>
            <div className="flex md:hidden">
              <IconButton
                onClick={openProfileMenu}
                sx={{
                  width: "45px",
                  height: "45px",
                  padding: 0,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "#3b84d9",
                  borderRadius: "50%", // makes it round
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {platformUser.profilePicture ? (
                  <img
                    src={platformUser.profilePicture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    fontSize={14}
                    sx={{
                      color: "#3b84d9",
                    }}
                  >
                    {platformUser?.firstName && platformUser?.lastName
                      ? platformUser.firstName.charAt(0).toUpperCase() +
                        platformUser.lastName.charAt(0).toUpperCase()
                      : "?"}
                  </Typography>
                )}
              </IconButton>
            </div>
          </div>
          {/* <div className="max-w-full w-full flex lg:hidden justify-start items-center p-1 sm:p-2 md:p-2 lg:p-0 overflow-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {hasMultipleSlashes ? (
                <IoMdArrowBack size={20} onClick={() => navigate(-1)} />
              ) : (
                <></>
              )}
              <p className="w-fit text-[14px]">
                {requiredPath
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
            </div>
          </div> */}
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
            height: "80vh",
          }}
          className="mt-1"
        >
          <Stack
            direction="column"
            justifyContent={leftMenuOpen ? "start" : "end"}
            alignItems="center"
            spacing={1}
            px={0.8}
            height={"100%"}
            overflowY="auto"
          >
            {leftMenuOpen && (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="apps" isDropDisabled={!editable}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {sidebarApps.map((app, i) => (
                          <Draggable
                            key={i}
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
                                  sx={{ mt: 0.8, width: "35px" }}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <Divider variant="middle" sx={{ my: 2, width: "80%" }} />
                {editable ? (
                  <ActionIcon
                    title="Save"
                    icon={<DoneIcon className="w-5" />}
                    onClick={() => {
                      setEditable(false);
                      // if (isOrderChanged) saveOrder();
                    }}
                  />
                ) : (
                  <ActionIcon
                    title="Edit"
                    icon={<EditIcon className="w-5" />}
                    onClick={() => setEditable(true)}
                  />
                )}
              </>
            )}
            <Box className="h-[80vh] flex justify-end items-end">
              {leftMenuOpen ? (
                <div
                  style={{
                    padding: "7px",
                    borderTop: "1px solid #1e2734",
                    borderLeft: "1px solid #1e2734",
                    borderBottom: "1px solid #1e2734",
                    cursor: "pointer",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                    marginLeft: "15px",
                  }}
                  onClick={() => setLeftMenuOpen(!leftMenuOpen)}
                  className="h-fit w-fit"
                >
                  <IoIosArrowForward />
                </div>
              ) : (
                <div
                  style={{
                    padding: "7px",
                    borderTop: "1px solid #1e2734",
                    borderLeft: "1px solid #1e2734",
                    borderBottom: "1px solid #1e2734",
                    marginLeft: "10px",
                    cursor: "pointer",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}
                  className="h-fit w-fit"
                  onClick={() => setLeftMenuOpen(!leftMenuOpen)}
                >
                  <IoIosArrowBack />
                </div>
              )}
            </Box>
          </Stack>
        </Box>
      </AppBar>

      <span className="block sm:hidden">
        <TopNavigation />
      </span>
      <Box
        component="nav"
        sx={{
          width: { xm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "custom.menu",
        }}
      >
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
                : `calc(100% - ${appsWidth + miniDrawerWidth}px)`,
          },
          ml: {
            xm:
              collapseDrawer && !drawerHover
                ? `${drawerWidth}px`
                : `${miniDrawerWidth}px`,
          },
          mt: 1,
          mb: { xs: 7, sm: 0 },
          height: {
            xs: "calc(var(--vh, 1vh) * 100 - 125px)",
            sm: "calc(var(--vh, 1vh) * 100 - 75px)",
          },
          backgroundColor: "background.paper",
          overflowY: "auto",
          borderRadius: "12px",
        p:"20px"

        }}
      >
        {children}
      </Box>
      {/* <TrialEndModal
        open={trialEndOpen}
        onClose={() => setTrialEndOpen(false)}
      /> */}
      {/* <Footer /> */}
    </Box>
  );
}
