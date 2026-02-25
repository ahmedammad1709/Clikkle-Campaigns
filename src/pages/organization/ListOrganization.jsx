import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Modal,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import useModal from "../../hooks/useModal";
import DeleteOrganization from "./DeleteOrganization";
import { setCookie } from "../../utilities/cookies";
// import edit from "../../assets/SidebarIcons/tabler_edit.png";
// import delet from "../../assets/SidebarIcons/Vector.png";
import { useMediaQuery, useTheme as useThemee } from "@mui/material";
// import OrganizationNavbar from "./OrganizationNavbar";
// import dotsIcon from "../../assets/SidebarIcons/proicons_more.png"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BsPlusLg } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useMenu } from "../../hooks/useMenu";
import ProfileMenuModal from "../../components/ProfileMenuModal";
import { useTheme } from "../../styles/theme";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import api from "../../utilities/axios";
import { useOrganization } from "../../hooks/useOrganization";

const EditIcon = () => <img src="/images/tabler_edit.png" alt="edit" />;
const DeleteIcon = () => <img src="/images/Vector.png" alt="delete" />;
const Dot = () => <img src="/images/proicons_more.png" alt="..." />;

const ListOrganization = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuOrg, setMenuOrg] = useState(null);
  const [deleteOrg, setDeleteOrg] = useState(null);
  const { selectOrganization } = useOrganization();
  const [editOrg, setEditOrg] = useState(null); // State for editing organization
  const { modalState, openModal, closeModal } = useModal();
  const [editModalState, setEditModalState] = useState(false); // Separate state for the edit modal
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { toggleTheme, mode } = useTheme();
  const theme = useThemee();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [theme, setTheme] = useState("system");
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }
  const [image, setImage] = useState(user?.userImage || "");

  const getOrganizationList = async () => {
    try {
      const response = await api.get("/user/organizations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
        withCredentials: true, // Optional, if backend uses cookies
      });
      setOrganizations(response.data.organizations);
    } catch (err) {
      navigate("/create-organization");
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };

  const handleDeleteClick = (org) => {
    setSelectedOrg(org);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedOrg) return;

    try {
      await api.delete(`/user/organizations/delete/${selectedOrg._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
        withCredentials: true,
      });

      toast.success("Organization Deleted Successfully", {
        position: "top-center",
      });

      getOrganizationList();
      setOpenDialog(false);
    } catch (err) {
      console.error(
        "Error deleting organization:",
        err.response?.data || err.message
      );
    } finally {
      setOpenDialog(false);
      setSelectedOrg(null);
    }
  };

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
  // Handle Organization Selection
  async function handleSelect(org) {
    try {
      // Set the selected organization in context
      selectOrganization(org);
      
      // Show success message
      toast.success(`Selected organization: ${org.name}`, {
        position: "top-center",
      });
      
      // Navigate to dashboard
      navigate("/");
    } catch (error) {
      console.error("Error selecting organization:", error);
      toast.error("Failed to select organization", {
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    getOrganizationList();
  }, []);

  const editClick = (org) => {
    navigate(`/edit-organization`, { state: { org: org } });
  };

  const handleMenuOpen = (event, organization) => {
    setMenuAnchor(event.currentTarget);
    setMenuOrg(organization);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuOrg(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <OrganizationNavbar /> */}

      <AppBar position="static" sx={{ backgroundColor: "background.default" }}>
        <Toolbar
          className="flex justify-end items-center gap-6"
          sx={{ backgroundColor: "background.default" }}
        >
          {/* Mobile Menu Icon */}
          <IconButton edge="end" className="md:hidden">
            <BsPlusLg
              onClick={() => {
                navigate("/create-organization");
                // setPage(2)
              }}
            />
          </IconButton>
          <IconButton edge="end" className="md:hidden">
            <BsBell />
          </IconButton>
          <IconButton
            edge="end"
            className="md:hidden"
            onClick={openSettingsMenu}
          >
            <IoSettingsOutline />
          </IconButton>
          <IconButton
            onClick={openProfileMenu}
            sx={{
              borderWidth: "2px",
              width: "45px",
              height: "45px",
              borderStyle: "solid",
              borderColor: "primary.main",
              // p: "3px",
            }}
            className="flex justify-center items-center place-content-center place-items-center place-self-center"
          >
            {!image ? (
              <Typography
                variant="subtitle1" // Corrected 'substitle1' to 'subtitle1'
                component="div"
                fontWeight={400}
                fontSize={14}
                sx={{
                  paddingTop: "1.9px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user && user.firstName && user.lastName
                  ? user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()
                  : "?"}
              </Typography>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  minWidth: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: image ? "" : "2px solid #3B84D9",
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
                &nbsp;
              </Box>
            )}
          </IconButton>
        </Toolbar>
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

        <ProfileMenuModal
          anchorElProfile={anchorElProfile}
          closeProfileMenu={closeProfileMenu}
          hide={true}
        />
      </AppBar>

      <Box
        sx={{
          backgroundColor: "background.default",
          paddingX: { xs: 3, sm: 5 },
          paddingY: 10,
        }}
      >
        <Box sx={{ paddingRight: { xs: 0, sm: 0 } }}>
          <div className="flex justify-between">
            <Typography variant="h4">Organization List</Typography>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/CreateOrganization')} // Change route as needed
              sx={{ textTransform: "none" }}
            >
              Add Organization
            </Button> */}
          </div>
          <Typography
            sx={{
              marginTop: ".7rem",
              color: "text.secondary",
              fontSize: isMobile ? "13px" : "",
            }}
          >
            Organization refers to the style of coordination, communication and
            management, a team or an employee uses throughout his/her contract
            with the organization.
          </Typography>
          <Typography sx={{ marginTop: 5, color: "text.secondary" }}>
            Total Organizations
          </Typography>
          <Typography
            variant="h4"
            sx={{
              marginTop: ".2rem",
              marginBottom: 5,
              color: "text.secondary",
            }}
          >
            {organizations.length}
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }} className="text-center">
          <Grid container wrap="nowrap" sx={{ p: 1, minWidth: 1000 }}>
            <Grid item xs={2.5}>
              Organization
            </Grid>
            <Grid item xs={2.5}>
              Status
            </Grid>
            <Grid item xs={2.5}>
              Subscription Status
            </Grid>
            <Grid item xs={2.5}>
              User
            </Grid>
            {/* <Grid item xs={2}>Email</Grid>
            <Grid item xs={2}>Website</Grid>
            <Grid item xs={2}>Address</Grid>
            <Grid item xs={1}>Country</Grid>
            <Grid item xs={1}>ZipCode</Grid>
            <Grid item xs={1}>City</Grid>
            <Grid item xs={2}>Industry</Grid> */}
            <Grid item xs={0.5}>
              Action
            </Grid>
          </Grid>
          <Divider sx={{ minWidth: 1000, mb: 3 }} />
          <Box>
            {organizations.map((org) => (
              <Grid
                key={org._id}
                container
                wrap="nowrap"
                sx={{ p: 1, minWidth: 1200 }}
              >
                <Grid
                  item
                  xs={2.5}
                  onClick={() => handleSelect(org)}
                  className="flex gap-3 cursor-pointer"
                >
                  {org.logo && (
                    <img
                      src={`${process.env.REACT_APP_SERVER}/static/${org.logo}`}
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => handleSelect(org)}
                      className="rounded-full"
                      alt="Logo"
                    />
                  )}
                  <div className="px-3 py-1 truncate rounded-lg hover:text-sky-600 active:text-blue-600 capitalize cursor-pointer">
                    <span className="capitalize">{org.name}</span>
                  </div>
                </Grid>
                <Grid item xs={2.5}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      className={`p-1 rounded-[20px] flex items-center gap-2 ${
                        mode === "dark"
                          ? "bg-[#102a43] px-3"
                          : "bg-[#cce6ff] px-3"
                      }`}
                      sx={{
                        color: mode === "dark" ? "white" : "black",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "120px",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#0080FF",
                        }}
                      />
                      Admin
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <CardMembershipIcon style={{ color: "#0080FF" }} />
                    {/* {org.plan || "No Plan"} */}
                    Lite
                  </Typography>
                </Grid>
                <Grid item xs={2.5}>
                  1
                </Grid>
                {/* <Grid item xs={2}>{org.Email}</Grid>
                <Grid item xs={2}>{org.Address}</Grid>
                <Grid item xs={2}>{org.Website}</Grid>
                <Grid item xs={2}>{org.Address}</Grid>
                <Grid item xs={1}>{org.Country}</Grid>
                <Grid item xs={1}>{org.ZipCode}</Grid> 
                <Grid item xs={1}>{org.City}</Grid>
                <Grid item xs={2}>{org.CompanyIndustry}</Grid>*/}
                <Grid item xs={0.5}>
                  {/* {!org.members.includes(user._id) && ( */}
                  <Box sx={{ textAlign: "center" }}>
                    <IconButton onClick={(e) => handleMenuOpen(e, org)}>
                      <MoreVertIcon sx={{ transform: "rotate(90deg)" }} />
                    </IconButton>
                  </Box>

                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => editClick(menuOrg)}>
                      <FaRegEdit className="mr-3" />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteClick(menuOrg)}>
                      <RiDeleteBin6Line className="mr-3" />
                      Delete
                    </MenuItem>
                  </Menu>

                  {/* // )} */}
                  {/* <div className="flex gap-2">
                    <FaRegEdit
                      onClick={() => editClick(org)}
                      className="w-4 h-4 mr-2 cursor-pointer"
                      color="blue"
                    />
                    <RiDeleteBin6Line
                      onClick={() => handleDeleteClick(org)}
                      className="w-5 h-5 cursor-pointer"
                      color="red"
                    />
                  </div> */}
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>
        <ToastContainer />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will permanently delete the organization. Do you want to
            continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListOrganization;
