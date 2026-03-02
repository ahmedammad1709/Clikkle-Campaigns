import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { MdOutlineEdit, MdOutlineTimer } from "react-icons/md";
import { ProfileOrganizationDropDown } from "./Navbar";
import { RiBuilding2Line } from "react-icons/ri";
import { IoPersonOutline, IoPlaySkipBackCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { PiSignOut } from "react-icons/pi";
import { useUser } from "../hooks/Authorize";
// import EditProfileModal from "./EditProfileModal";
import useModal from "../hooks/useModal";
// import GettingStartedModal from "../pages/Dashboard/MySpace/GettingStartedModal";
import axios from "axios";

// import camera from "../assetss/Interductionimages/cameraaicon2.png";
import Feedback from "./Feedback";
import { clearCookie } from "../utilities/cookies";
import { useTheme } from "../styles/theme";
import { env } from "../utilities/function";
import dayjs from "dayjs";
import { Camera, ContrastIcon, Moon, Sun } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { BiPlanet } from "react-icons/bi";
// import useSignOut from "react-auth-kit/hooks/useSignOut";

const ProfileMenuModal = ({
  anchorElProfile,
  closeProfileMenu,
  hide,
  setRecruiterOpen,
}) => {
  const colors = [
    "#1e90ff",
    "#f97316",
    "#22c55e",
    "#facc15",
    "#ef4444",
    "#8b5cf6",
    "#a855f7",
    "#6b7280",
    "#ec4899",
    "#d97706",
    "#14b8a6",
    "#38bdf8",
    "#b45309",
    "#a855f7",
    "#84cc16",
  ];

  const platformUser = JSON.parse(localStorage.getItem("user"));
  const [openGettingStarted, setOpenGettingStarted] = useState(false);
  const [themeToggle, setThemeToggle] = useState("dark");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const { toggleTheme, mode } = useTheme();
  const [activeTheme, setActiveTheme] = useState(mode);
  // const signOut = useSignOut();
  

  const [feedbackState, setFeedbackState] = useState(false);

  const openFeedback = () => setFeedbackState(true);
  const closeFeedback = () => setFeedbackState(false);





  const setSearchParams = useSearchParams()[1];
  const user = JSON.parse(localStorage.getItem("user"));
  const themeButtons = [
    { label: "Light", value: "light", icon: <Sun size={14} /> },
    { label: "Dark", value: "dark", icon: <Moon size={14} /> },
    {
      label: "System",
      value: "system",
      icon: <ContrastIcon sx={{ fontSize: "14px" }} size={14} />,
    },
  ];

  useEffect(() => {
    setActiveTheme(mode);
  }, [mode]);

  let currentOrg = JSON.parse(localStorage.getItem("org"));
  const [currentUserStorage, setCurrentUserStorage] = useState({
    usedSpace: 0,
  });

  const used = currentUserStorage?.usedSpace || 0;

  useEffect(() => {
    const fetchUserStorage = async () => {
      // Disabled fetching storage for now to prevent 404 errors for new users
      // try {
      //   if (!user || !user._id) return;
      //   const response = await axios.get(
      //     `https://api.files.clikkle.com:4500/api/user/${user._id}`
      //   );
      //   setCurrentUserStorage({ usedSpace: response.data.usedSpace });
      // } catch (error) {
      //   if (error.response && error.response.status === 404) {
      //     // User not found in storage service - ignore
      //   } else {
      //     // console.error("Error fetching user storage:", error);
      //   }
      // }
    };

    fetchUserStorage();
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  const convertToBytes = (value, unit) => {
    const units = {
      Bytes: 1,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4,
    };
    return value * (units[unit] || 1);
  };

  const limit = convertToBytes(5, "GB");
  const percentage = limit > 0 ? (used / limit) * 100 : 0;

  const handleClose = () => {
    window.open(
      "https://store.clikkle.com/subscription/campaigns/purchase",
      "_blank" // new tab
    );
  };

  const handleProfileMove = () => {
    window.open(
      `https://myaccount.clikkle.com`,
      "_blank" // new tab
    );
  };

  // Calculate trial end date (14 days after createdAt)
  const trialEnd = dayjs(currentOrg?.createdAt).add(14, "day");
  // Calculate days left from today
  const daysLeft = trialEnd.diff(dayjs(), "day");
  // Optionally: clamp to 0 if expired
  const remainingDays = Math.max(daysLeft, 0);

  const handleSignOut = async () => {
    try {
      // await signOut();
    } catch (error) {
      // console.error("Error during sign-out:", error);
    }
    localStorage.clear();
    setSearchParams({});
    window.location.href =
      "https://accounts.clikkle.com/logout?redirectto=https://clikkle.com/campaigns";
  };

  // const signOut = () => {
  //   clearCookie("accessToken");
  //   localStorage.removeItem("subscriptionId");
  //   localStorage.removeItem("org");
  //   localStorage.removeItem("user");
  //   // clearCookie('role');
  //   // clearCookie('setupCompleted');

  //   const redirectTo =
  //     env("AUTHENTICATION_CLIENT") +
  //     "/logout?redirectto=" +
  //     encodeURIComponent(env("DOMAIN")) +
  //     "&&referrer=" +
  //     encodeURIComponent(env("DOMAIN"));
  //   window.location.replace(redirectTo);
  // };

  // useMenu
  //   const {
  //     anchorEl: anchorElProfile,
  //     openMenu: openProfileMenu,
  //     closeMenu: closeProfileMenu,
  //   } = useMenu();

  // const {
  //   modalState: feedbackState,
  //   openModal: openFeedback,
  //   closeModal: closeFeedback,
  // } = useModal();

  const getInitials = () => {
    if (platformUser?.firstName && platformUser?.lastName) {
      return `${platformUser?.firstName
        .charAt(0)
        .toUpperCase()}${platformUser?.lastName?.charAt(0).toUpperCase()}`;
    }
    return "?";
  };

  const [image, setImage] = useState(platformUser?.profilePicture || "");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("type", "file");
      formData.append("userId", platformUser._id);

      try {
        const response = await axios.post(
          `https://api.files.clikkle.com:4500/api/fs/upload-profile-picture?id=${platformUser?._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        let newUser = { ...platformUser };
        newUser.profilePicture = response.data.profilePictureUrl;

        // console.log(response.data.profilePictureUrl);
        localStorage.setItem("user", JSON.stringify(newUser));
      } catch (error) {
        // console.error(error);
      }
    }
  };

  return (
    <>
      <Dialog
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={closeProfileMenu}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "400px" },
            margin: 0,
            minHeight: "100%",
            right: 0,
            position: "fixed",
            overflow: "visible",
          },
        }}
      >
        <Box className="absolute top-4 left-[0px] sm:left-[-50px] z-40">
          <Box
            onClick={closeProfileMenu}
            className="p-2 rounded-full cursor-pointer"
            sx={{ bgcolor: mode == "dark" ? "#171717" : "#ffff" }}
          >
            <IoMdClose size={20} />
          </Box>
        </Box>
        <Grid
          alignItems="center"
          justifyContent="space-between" // Added to horizontally center content
          flexWrap="nowrap"
          flexDirection="column"
          sx={{ backgroundColor: mode == "dark" ? "#171717" : "#ffff" }}
          className="h-screen pt-4 pb-2 flex flex-col justify-between overflow-y-auto"
        >
          <Grid>
            <Box
              sx={{
                position: "relative",
                margin: "auto",
                width: "55px",
                height: "55px",
                borderRadius: image ? "50%" : "50%",
                overflow: "hidden",
                border: image ? "2px solid #3B84D9" : "2px solid #3B84D9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: image ? "transparent" : "background.view",
                backgroundImage: image ? `url(${image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                "&:hover .camera-icon": { opacity: 1 },
              }}
            >
              {/* <Box
                className="absolute right-0 bottom-0 p-1 z-50 cursor-pointer rounded-full"
                sx={{
                  backgroundColor: mode === "dark" ? "#252525" : "#e5e5e5",
                }}
                onClick={() => setEditModalOpen(!editModalOpen)}
              >
                <MdOutlineEdit size={16} />
              </Box> */}
              {/* Grid Container for Initials */}
              {!image && (
                <Grid
                  sx={{
                    width: "110px",
                    height: "50px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // p: "3px",
                  }}
                >
                  <Typography
                    variant="subtitle1" // Corrected 'substitle1' to 'subtitle1'
                    component="div"
                    fontWeight={600}
                    sx={{
                      fontSize: "30px",
                      fontFamily: "sans-serif",
                      marginLeft: "-12px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      margin: "auto",
                    }}
                  >
                    {getInitials()}
                  </Typography>
                </Grid>
              )}

              {/* Camera Icon */}
              <IconButton
                className="camera-icon"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                size="small"
                component="label"
              >
                <Camera style={{ width: "40px", height: "40px" }} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </IconButton>
            </Box>
          </Grid>

          <div className="flex justify-center w-full items-center gap-3 px-3 flex-col mt-[10px]">
            <div
              className="flex flex-col items-center w-full justify-center"
              style={{ textAlign: "center" }}
            >
              <Typography
                variant="substitle1"
                component="div"
                fontWeight={600}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "14px",
                }}
              >
                {platformUser?.firstName + " " + platformUser?.lastName}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                color="primary.main"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {platformUser?.email}
              </Typography>

              <div
                className="my-2 w-[60%] py-1 px-3 rounded-lg"
                style={{
                  backgroundColor: mode == "dark" ? "#141414" : "",
                }}
              >
                <ProfileOrganizationDropDown />
              </div>
            </div>
          </div>

          <div
            className={`bg-[#0080FF1A] px-4 py-2 w-full flex flex-col gap-3`}
          >
            <div className="flex items-center gap-3">
              <MdOutlineTimer />
              <p className="text-[10px]">
                Your trial version{" "}
                <span className="font-semibold">
                  {" "}
                  expires in {remainingDays} day (s){" "}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[10px]">Current Plan</p>
                <div className="flex items-center gap-2">
                  <div className="bg-[#0080FF] p-2 rounded-full w-fit">
                    <RiBuilding2Line className={`text-white`} />
                  </div>
                  <p className="text-[10px] font-semibold">
                    {currentOrg?.plan}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px]">Try other plans</p>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleClose}
                      sx={{
                        fontSize: "12px",
                        color: "#0080FF",
                        borderColor: "#0080FF",
                        borderRadius: "20px",
                      }}
                      variant="outlined"
                    >
                      Upgrade
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 w-full">
            <div
              style={{
                // borderWidth: "1px",
                // borderStyle: "solid",
                // borderColor: "#2a2a2a",
                borderRadius: "10px",
                backgroundColor: mode == "dark" ? "#141414" : "#fff",
              }}
              className="w-full flex flex-col my-2 items-center justify-start mt-2"
            >
              <button
                onClick={handleProfileMove}
                className="text-start p-3 ps-4 w-full flex items-center text-[12px] gap-2"
                // onClick={signOut}
                style={{ borderBottom: "1px solid #2a2a2a" }}
              >
                <IoPersonOutline size={18} />
                <Link to={"https://myaccount.clikkle.com"}>My Profile</Link>
              </button>
              <button
                // style={{ borderBottom: "1px solid #2a2a2a" }}
                className="text-start text-[12px] p-3 w-full ps-4 flex items-center gap-2"
              >
                <IoIosAddCircleOutline size={18} />
                <p
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("refreshToken");
                    localStorage.clear();
                    clearCookie("accessToken");
                    clearCookie("userId");
                    clearCookie("fullName");
                    clearCookie("role");
                    window.location.href = "/login";
                  }}
                >
                  log in to another account
                </p>




              </button>
              {/* <button
                          className="text-start p-3 ps-4 w-full flex items-center text-[14px] gap-2"
                          onClick={signOut}
                        >
                          <PiSignOut size={24} />
                          <span>Sign out </span>
                        </button> */}
            </div>
          </div>

          <div className="px-4 w-full">
            <p className="text-[12px]">Mode</p>
            <div
              style={{
                backgroundColor: mode == "dark" ? "#141414" : "",
              }}
              className="flex items-center justify-between p-1 rounded-full w-full"
            >
              {themeButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => {
                    setActiveTheme(btn.value);
                    if (btn.value !== "system" && btn.value !== mode) {
                      toggleTheme();
                      window.location.reload();
                    }
                  }}
                  className={`flex items-center gap-1 px-5 py-1 rounded-full text-[12px] font-medium transition-all
                ${
                  activeTheme === btn.value
                    ? "bg-[#0080FF] text-white"
                    : `${
                        mode === "dark" ? "text-white/80 hover:bg-zinc-700" : ""
                      } `
                }
              `}
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-md w-full px-4">
            <div>
              <div className="flex justify-between">
                <h3 className="font-semibold mb-2 text-[12px]">Themes</h3>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1 cursor-pointer text-[12px]">
                    <input
                      type="radio"
                      value="dark"
                      checked={themeToggle === "dark"}
                      onChange={() => setThemeToggle("dark")}
                      className="accent-blue-500"
                    />
                    Dark
                  </label>
                  <label className="inline-flex items-center gap-1 cursor-pointer text-[12px]">
                    <input
                      type="radio"
                      value="light"
                      checked={themeToggle === "light"}
                      onChange={() => setThemeToggle("light")}
                      className="accent-blue-500"
                    />
                    Light
                  </label>
                </div>
              </div>
              <div className="flex gap-1 justify-between flex-wrap">
                {colors?.map((color) => (
                  <div
                    key={color}
                    className="relative w-5 h-5 rounded-full cursor-pointer border-2 border-transparent"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <FaCheck size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 w-full">
            <p className="text-[12px] mt-1">Need Help?</p>
            <div className="flex items-center gap-10">
              {hide ? (
                <></>
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setOpenGettingStarted(true)}
                >
                  <IoPlaySkipBackCircleOutline />
                  <Link
                    to={"https://support.clikkle.com"}
                    className={`${
                      mode == "dark" ? "text-[#a5a5a5]" : ""
                    } text-[10px]`}
                  >
                    Getting Started
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-2">
                <BsQuestionCircle />
                <Link
                  to={"https://support.clikkle.com"}
                  className={`${
                    mode == "dark" ? "text-[#a5a5a5]" : ""
                  } text-[10px]`}
                >
                  Help
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-9">
              <div className="flex items-center gap-2 mt-1">
                <img src="/images/personIcon.png" alt="" />
                <Link
                  to={"https://support.clikkle.com"}
                  className={`${
                    mode == "dark" ? "text-[#a5a5a5]" : ""
                  } text-[10px]`}
                >
                  Contact Support
                </Link>
              </div>

              {hide ? (
                <></>
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setRecruiterOpen(true);
                    closeProfileMenu();
                  }}
                >
                  <BiPlanet />
                  <Link
                    to={"https://support.clikkle.com"}
                    className={`${
                      mode == "dark" ? "text-[#a5a5a5]" : ""
                    } text-[10px]`}
                  >
                    Plan tutorial
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Box className="w-full flex items-center gap-2 px-3">
            <div
              style={{
                position: "relative",
                width: "30px",
                height: "30px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  background: "linear-gradient(to bottom, #3767B1, #670E69)",
                  WebkitMaskImage:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M12 6a5 5 0 00-5 5h-1a3 3 0 00-3 3 3 3 0 003 3h12a4 4 0 000-8c-.128 0-.253.007-.377.02A5.002 5.002 0 0012 6z"/></svg>\')',
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskImage:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M12 6a5 5 0 00-5 5h-1a3 3 0 00-3 3 3 3 0 003 3h12a4 4 0 000-8c-.128 0-.253.007-.377.02A5.002 5.002 0 0012 6z"/></svg>\')',
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="caption"
                component="div"
                mt={1}
                className="text-[14px]"
              >
                {formatBytes(currentUserStorage.usedSpace)} used of 5 GB
              </Typography>
              <LinearProgress
                variant="determinate"
                value={percentage}
                color="primary"
                sx={{ borderRadius: "2px" }}
              />
            </div>
          </Box>
          <div className="px-4 flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <IoPersonOutline />
              <Link
                to={"https://myaccount.clikkle.com"}
                className="text-[12px] mt-1"
              >
                My Clikkle Account
              </Link>
            </div>
            <div
              onClick={handleSignOut}
              className="flex items-center gap-2 cursor-pointer"
            >
              <PiSignOut color="#F13B3B" />
              <p className="text-[12px] text-[#F13B3B]">Sign out</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 w-full">
            <p
              onClick={openFeedback}
              className="text-[#A5A5A5] text-[12px] cursor-pointer"
            >
              Give Feedback
            </p>
            <div className="bg-[#A5A5A5] w-[5px] h-[5px] rounded-full" />
            <Link
              to={"https://clikkle.com/privacy-policy"}
              className="text-[#A5A5A5] text-[12px]"
            >
              Privacy Policy
            </Link>
          </div>
        </Grid>
      </Dialog>

      {/* <EditProfileModal
        editModalOpen={editModalOpen}
        closeEditModal={() => setEditModalOpen(false)}
      /> */}

      {/* <GettingStartedModal
        open={openGettingStarted}
        setOpen={setOpenGettingStarted}
        step={step}
        setStep={setStep}
        setRecruiterOpen={setRecruiterOpen}
      /> */}



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
    </>
  );
};

export default ProfileMenuModal;
