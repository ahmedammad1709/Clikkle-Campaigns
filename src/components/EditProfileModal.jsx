import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Button,
  Paper,
  Box,
  InputAdornment,
} from "@mui/material";
import { IoCalendarOutline, IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlusCircle, FiPlusSquare } from "react-icons/fi";
import { useTheme } from "../styles/theme";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PlusCircle } from "lucide-react";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineCalendarMonth } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaCaretUp } from "react-icons/fa";
import {
  TextField,
  Grid,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
// import Textarea from "../pages/DashComponents/TextArea";

const WorkingAgainModal = ({ workingAgainModal, setworkingAgainModal }) => {
  const arr = [
    "Better Employment Conditions",
    "Career Prospects",
    "Desertion",
    "Dismissed",
    "Health",
    "Dissatisfaction with the job",
    "Death",
    "Personality conflicts",
  ];
  const { mode } = useTheme();
  return (
    <Dialog
      open={workingAgainModal}
      onClose={() => setworkingAgainModal(true)}
      fullWidth
      maxWidth="md"
      maxHeight="full"
    >
      {/* Sticky Top Section */}
      <div
        className={`sticky flex justify-between items-center top-0 ${
          mode === "light" ? "bg-[#edf0f4]" : "bg-[#1F1F1F]"
        }  z-10 py-4 px-4 `}
      >
        <DialogTitle sx={{ padding: "0px" }}>Edit Quick Add</DialogTitle>
        <div
          className={`${
            mode === "light" ? "bg-[#dcdcdc]" : ""
          } p-2 rounded-md cursor-pointer`}
          onClick={() => setworkingAgainModal(false)}
        >
          <CgClose />
        </div>
      </div>

      {/* Dialog Content */}
      <DialogContent sx={{ padding: "0px" }}>
        <div
          className={` flex flex-col gap-3 ${
            mode === "light" ? "bg-[#edf0f4]" : "bg-[#1F1F1F]"
          } `}
        >
          <div
            className={`${
              mode === "light" ? "bg-[#fff]" : "bg-[#1F1F1F]"
            } mx-4 sm:px-2 pt-1 pb-5 rounded-md relative`}
          >
            <label className={`block text-[14px] font-[500] mb-2 mt-4`}>
              Add value <span className="text-red-500">*</span>
            </label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              placeholder="Text"
              InputLabelProps={{ style: { color: "#A5A5A5" } }}
            />
            <Box
              sx={{
                p: "15px",
                borderRadius: "8px",
                marginTop: "10px",
                marginBottom: "20px",
                backgroundColor: mode === "light" ? "#fff" : "#171717",
                position: "sticky", // Sticky position
                top: "0px", // Adjust this based on where you want it to stick
                zIndex: 1000,
              }}
            >
              {arr.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  p={1}
                  gap="5px"
                  sx={{
                    borderRadius: "8px",
                    marginTop: "15px",
                    backgroundColor: mode === "light" ? "#ffffff" : "",
                    border: "1px solid #333333",
                  }}
                >
                  <PiDotsSixVerticalBold size={"24px"} color="#A5A5A5" />
                  <div className="text-[12px] sm:text-[16px] font-[400]">
                    {item}
                  </div>
                </Box>
              ))}
            </Box>
          </div>
        </div>
      </DialogContent>

      {/* Sticky Footer */}
      <div
        className={`sticky flex gap-3 items-center top-0 ${
          mode === "light" ? "bg-[#edf0f4]" : "bg-[#1F1F1F]"
        }  z-10 py-4 px-4`}
      >
        <Button
          variant="outlined"
          sx={{
            backgroundColor: mode === "light" ? "#fff" : "",
            border: mode === "light" ? "1px solid #0088ff" : "1px solid white",
            color: mode === "light" ? "#0088ff" : "white",
            width: {
              xs: "95px", // for extra small screens
              sm: "156px", // for small and up
            },
            height: {
              xs: "37px",
              sm: "47px",
            },
          }}
          onClick={() => setworkingAgainModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0088ff",
            width: {
              xs: "95px", // for extra small screens
              sm: "156px", // for small and up
            },
            height: {
              xs: "37px",
              sm: "47px",
            },
          }}
        >
          Done
        </Button>
      </div>
    </Dialog>
  );
};

const AddExitModal = ({ open, setOpen }) => {
  const [workingAgainModal, setworkingAgainModal] = useState();
  const { mode } = useTheme();
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth fullScreen>
      <div
        className={`${
          mode === "light" ? "bg-[#ffffff]" : "bg-[#141414]"
        } px-4 py-4`}
      >
        <div className="flex items-center justify-between w-full mb-6">
          <DialogTitle
            style={{ padding: 0 }}
            className="text-lg font-semibold p-0"
          >
            Add Exit Details
          </DialogTitle>
          <div onClick={() => setOpen(false)}>
            <Close />
          </div>
        </div>
        <DialogContent style={{ padding: 0 }} className="p-0">
          {/* Separation Section */}
          <div className="text-sm sm:text-[22px] font-[600] mb-6 p-0">
            Separation
          </div>
          <Grid container spacing={2} className="mb-6">
            <Grid item xs={12} md={6}>
              <label>Staff ID</label>
              <TextField
                variant="outlined"
                fullWidth
                select
                defaultValue=""
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
                SelectProps={{
                  displayEmpty: true, // 👈 Yeh placeholder ko show karne ke liye zaroori hai
                }}
              >
                <MenuItem value="" disabled>
                  Jonathan Snow S24
                </MenuItem>
                <MenuItem value="Bera  Snow S24">Bera Snow S24</MenuItem>
                <MenuItem value="Jackson  Snow S24">Jackson Snow S24</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Separation Date</label>

              <TextField
                type="date" // <-- important to make it a date input
                fullWidth
                variant="outlined"
                size="small"
                defaultValue="2024-12-27" // Optional: set a default date
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Set input height
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Interviewer</label>

              <TextField
                variant="outlined"
                fullWidth
                select
                defaultValue=""
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
                SelectProps={{
                  displayEmpty: true, // 👈 Yeh placeholder ko show karne ke liye zaroori hai
                }}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value="Bera  Snow S24">Bera Snow S24</MenuItem>
                <MenuItem value="Jackson  Snow S24">Jackson Snow S24</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Reason for Leaving</label>
              <div className="flex gap-2 items-center">
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue=""
                  sx={{
                    height: "40px",
                    margin: 0, // Remove outer margin
                    mb: 0, // Just in case any margin-bottom is there
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Bera  Snow S24">Bera Snow S24</MenuItem>
                  <MenuItem value="Jackson  Snow S24">
                    Jackson Snow S24
                  </MenuItem>
                </TextField>

                <div
                  onClick={() => setworkingAgainModal(true)}
                  className="border border-[#1F1F1F] rounded flex items-center justify-center text-gray-400 w-[40px] h-[40px]"
                >
                  <GoPlus size={20} />
                </div>
              </div>
            </Grid>
          </Grid>

          {/* Questionnaire Section */}
          <div className="text-sm sm:text-[22px] font-[600] mb-6">
            Questionnaire
          </div>
          <Grid container spacing={2} className="mb-6">
            <Grid item xs={12} md={6}>
              <label>Working for this organization again</label>
              <div className="flex gap-2 items-center">
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue=""
                  sx={{
                    height: "40px",
                    margin: 0, // Remove outer margin
                    mb: 0, // Just in case any margin-bottom is there
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Bera  Snow S24">Bera Snow S24</MenuItem>
                  <MenuItem value="Jackson  Snow S24">
                    Jackson Snow S24
                  </MenuItem>
                </TextField>

                <div className="border border-[#1F1F1F] rounded flex items-center justify-center text-gray-400 w-[40px] h-[40px]">
                  <GoPlus size={20} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>What did you like the most of the organization</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={3}
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Things the organization do to improve staff welfare</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={3}
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Anything you wish to share with us</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={3}
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
              />
            </Grid>
          </Grid>

          {/* Checklist Section */}
          <div className="text-sm sm:text-[22px] font-[600] mb-6">
            Checklist for Exit Interview
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label>Company Vehicle handed in</label>

              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>All equipments handed in</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>All library books submitted</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Exit interview conducted</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Notice period followed</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Resignation letter submitted</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Resignation letter submitted</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Manager/Supervisor clearance</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                multiline
                placeholder="Text"
                InputLabelProps={{ style: { color: "#A5A5A5" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Apply height to the root of the input
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            onclick={() => setOpen(false)}
            className={`border rounded-md w-[156px] h-[47px] ${
              mode === "light" ? "border-[#0088ff]" : "border-[#FFFFFF]"
            }`}
          >
            Cancel
          </button>
          <button
            className={` bg-[#0088ff] w-[156px] h-[47px] rounded-md text-[#fff]`}
          >
            Submit
          </button>
        </div>
      </div>

      {workingAgainModal && (
        <WorkingAgainModal
          workingAgainModal={workingAgainModal}
          setworkingAgainModal={setworkingAgainModal}
        />
      )}
    </Dialog>
  );
};

const EditProfileModal = ({ editModalOpen, closeEditModal }) => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      institute: "Caleb University",
      degree: "Bachelors of Science",
      startDate: "2022-06-12",
      endDate: "2024-03-19",
      specialization: "Computer Science",
    },
  ]);

  const [workExperienceRows, setWorkExperienceRows] = useState([
    {
      company: "TechExports",
      jobTitle: "Software Engineer",
      startDate: "2022-06-12",
      endDate: "2024-03-19",
      jobDescription: "Enter Job Description",
    },
  ]);

  const [departmentRows, setDepartmentRows] = useState([
    {
      name: "Edwin Mark",
      relationShip: "Brother",
      dateOfBirth: "2025-06-12",
    },
  ]);

  // ✅ **Add New Work Experience Row**
  const addWorkExperienceRow = () => {
    setWorkExperienceRows([
      ...workExperienceRows,
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        jobDescription: "",
      },
    ]);
  };

  // ✅ **Delete Work Experience Row**
  const removeWorkExperienceRow = (index) => {
    const updatedRows = [...workExperienceRows];
    updatedRows.splice(index, 1);
    setWorkExperienceRows(updatedRows);
  };

  // ✅ **Add New Row Function**
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        institute: "",
        degree: "",
        startDate: "",
        endDate: "",
        specialization: "",
      },
    ]);
  };

  // ✅ **Delete Row Function**
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const addDepartmentRow = () => {
    setDepartmentRows([
      ...departmentRows,
      {
        company: "",
        jobTitle: "",
        startDate: "",
      },
    ]);
  };

  // ✅ **Delete Work Experience Row**
  const removeDepartmentRow = (index) => {
    const updatedRows = [...departmentRows];
    updatedRows.splice(index, 1);
    setDepartmentRows(updatedRows);
  };

  const { mode } = useTheme();

  const [showExitTable, setShowExitTable] = useState(false);
  const [showTravelExpTable, setShowTravelExpTable] = useState(false);
  const [showTravelReqable, setShowTravelReqTable] = useState(false);

  const toggleExitTable = () => {
    setShowExitTable(!showExitTable);
  };

  const toggleExpTable = () => {
    setShowTravelExpTable(!showTravelExpTable);
  };

  const toggleReqTable = () => {
    setShowTravelReqTable(!showTravelReqable);
  };

  return (
    <Dialog open={editModalOpen} onClose={closeEditModal} fullScreen>
      {/* Modal Background with Theme */}
      <div
        className={`${
          mode === "light" ? "bg-[#ffffff]" : "bg-[#141414]"
        }  px-4 py-4`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4">
          <DialogTitle style={{ padding: 0 }} className="text-xl font-semibold">
            Edit Profile
          </DialogTitle>
          <IconButton onClick={closeEditModal} className="">
            <IoClose size={20} />
          </IconButton>
        </div>

        {/* Modal Content */}
        <DialogContent style={{ padding: 0 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-medium text-[16px]">Staff ID</p>
                <TextField
                  variant="outlined"
                  placeholder="Enter staff ID"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Username</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Username"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Emergency Contact</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Emergency Contact"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Marital Status</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue=""
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                  SelectProps={{
                    displayEmpty: true, // 👈 Yeh placeholder ko show karne ke liye zaroori hai
                  }}
                >
                  <MenuItem value="" disabled>
                    Enter Marital Status
                  </MenuItem>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                </TextField>
              </div>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-medium text-[16px]">First Name</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                  placeholder="Enter First Name"
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Date of Birth</p>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdOutlineCalendarMonth  className={`${mode === "light"?"text-[#484848]" :"text-[#fff]"}`} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                    // Hide the default icon
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      opacity: 0,
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Blood Group</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Blood Group"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Gender</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue=""
                  SelectProps={{
                    displayEmpty: true, // 👈 Placeholder ko visible banata hai
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Enter Gender
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-medium text-[16px]">Last Name</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Last Name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Email Address</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Email Address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Address</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">About Me</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  placeholder="Enter description"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium text-[16px]">Designation</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue=""
                  SelectProps={{
                    displayEmpty: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Department</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // important to show placeholder initially
                  SelectProps={{
                    displayEmpty: true, // allows empty value to be visible
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Source of Hire</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // Show placeholder initially
                  SelectProps={{
                    displayEmpty: true, // Allow empty value to display
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Date of Joining</p>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdOutlineCalendarMonth  className={`${mode === "light"?"text-[#484848]" :"text-[#fff]"}`} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                    // Hide the default icon
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      opacity: 0,
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Role</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // Show placeholder initially
                  SelectProps={{
                    displayEmpty: true, // Allow displaying empty option
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Years of Experience</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // ensures placeholder is shown initially
                  SelectProps={{
                    displayEmpty: true, // allows displaying the empty value (placeholder)
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Employment Type</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // Initial empty value for placeholder
                  SelectProps={{
                    displayEmpty: true, // Allows the empty value (placeholder) to be visible
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Employment Status</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // Sets initial value to empty, showing placeholder
                  SelectProps={{
                    displayEmpty: true, // Allows showing the empty value (placeholder)
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </div>

              <div>
                <p className="font-medium text-[16px]">Reporting Manager</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  defaultValue="" // Sets initial value to empty, showing placeholder
                  SelectProps={{
                    displayEmpty: true, // Allows showing the empty value (placeholder)
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                </TextField>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium text-[16px]">
                  Personal Email Address
                </p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter email address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Work Email Address</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter email address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Tags</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter tags"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Apply height to the root of the input
                    },
                  }}
                />
              </div>

              <div>
                <p className="font-medium text-[16px]">Personal Phone Number</p>
                <div className="flex gap-2">
                  <div
                    className={`border rounded-md h-[40px] w-[140px] ${
                      mode === "light" ? "border-[#c4c4c4]" : "border-[#4a4a4a]"
                    }`}
                  >
                    <PhoneInput
                      country={"ng"}
                      enableSearch={true}
                      specialLabel="" // This removes the "Phone" label
                      inputStyle={{
                        height: "38px",
                        width: "100%",
                        fontSize: "14px",
                        border: "none",
                        backgroundColor:
                          mode === "light" ? "#fff" : "transparent", // Dark mode or light mode
                        color: mode === "light" ? "#000" : "#fff", // Text color
                      }}
                      buttonStyle={{
                        border: "none",
                        height: "40px",
                        backgroundColor:
                          mode === "light" ? "#fff" : "transparent", // Dark mode or light mode
                        color: mode === "light" ? "#000" : "#fff", // Button text color
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      dropdownStyle={{
                        zIndex: 9999,
                        backgroundColor: mode === "light" ? "#fff" : "#000", // 👈 Set dark/light mode background
                        color: mode === "light" ? "#000" : "#fff", // Optional: set text color
                      }}
                    />
                  </div>

                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="000 000 0000"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px", // Apply height to the root of the input
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="font-medium text-[16px]">Work Phone Number</p>
                <div className="flex gap-2">
                  <div
                    className={`border rounded-md h-[40px] w-[140px] ${
                      mode === "light" ? "border-[#c4c4c4]" : "border-[#4a4a4a]"
                    }`}
                  >
                    <PhoneInput
                      country={"ng"}
                      enableSearch={true}
                      specialLabel="" // This removes the "Phone" label
                      inputStyle={{
                        height: "38px",
                        width: "100%",
                        fontSize: "14px",
                        border: "none",
                        backgroundColor:
                          mode === "light" ? "#fff" : "transparent", // Dark mode or light mode
                        color: mode === "light" ? "#000" : "#fff", // Text color
                      }}
                      buttonStyle={{
                        border: "none",
                        height: "40px",
                        backgroundColor:
                          mode === "light" ? "#fff" : "transparent", // Dark mode or light mode
                        color: mode === "light" ? "#000" : "#fff", // Button text color
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      dropdownStyle={{
                        zIndex: 9999,
                        backgroundColor: mode === "light" ? "#fff" : "#000", // 👈 Set dark/light mode background
                        color: mode === "light" ? "#000" : "#fff", // Optional: set text color
                      }}
                    />
                  </div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="000 000 0000"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px", // Apply height to the root of the input
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="font-medium text-[16px]">Current Address</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Enter description"
                />
              </div>
            </div>

            {/* Permanent Address */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Permanent Address</h3>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sameAddress"
                  className="bg-transparent"
                />
                <label
                  htmlFor="sameAddress"
                  className="font-medium text-[16px]"
                >
                  Same as current address
                </label>
              </div>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter description"
                multiline
                rows={3}
              />
            </div>

            {/* Termination Information */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Termination Information
              </h3>
              <div>
                <p className="font-medium text-[16px]">Date of Exit</p>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdOutlineCalendarMonth  className={`${mode === "light"?"text-[#484848]" :"text-[#fff]"}`} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                    // Hide the default icon
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      opacity: 0,
                    },
                  }}
                />
              </div>
            </div>

            {/* System Field */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">System Field</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="font-medium text-[16px]">
                    Information Was Added By
                  </p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    defaultValue="Jonathan"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px", // Apply height to the root of the input
                      },
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-[16px]">
                    Information Was Added At
                  </p>
                  <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdOutlineCalendarMonth  className={`${mode === "light"?"text-[#484848]" :"text-[#fff]"}`} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                    // Hide the default icon
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      opacity: 0,
                    },
                  }}
                />
                </div>
                <div>
                  <p className="font-medium text-[16px]">
                    Information Was Modified By
                  </p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    defaultValue="Jonathan"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px", // Apply height to the root of the input
                      },
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-[16px]">Onboarding Status</p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    select
                    defaultValue="" // Initial empty value for placeholder
                    SelectProps={{
                      displayEmpty: true, // Allows the empty value (placeholder) to be visible
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px", // Apply height to the root of the input
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    <MenuItem value="Full-time">John Doe</MenuItem>
                    <MenuItem value="Part-time">John Smith</MenuItem>
                  </TextField>
                </div>
                <div>
                  <p className="font-medium text-[16px]">
                    Information Was Modified At
                  </p>
                  <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdOutlineCalendarMonth  className={`${mode === "light"?"text-[#484848]" :"text-[#fff]"}`} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                    },
                    // Hide the default icon
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      opacity: 0,
                    },
                  }}
                />
                </div>
              </div>

              {/* Work Experience Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse overflow-x-auto">
                    <thead>
                      <tr className={`${mode === "light" ? "bg-[#F3F3F3]  text-[#000]":"bg-[#191919]  text-[#fff]"} rounded-[5px]`}>
                        <th className="p-3 text-left whitespace-nowrap">
                          Company Name
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Job Title
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Start Date
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          End Date
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Job Description
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {workExperienceRows.map((row, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              variant="standard"
                              defaultValue={row.company}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                  color:"#333333"
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              variant="standard"
                              defaultValue={row.jobTitle}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              type="date"
                              fullWidth
                              variant="standard"
                              defaultValue={row.startDate}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              type="date"
                              fullWidth
                              defaultValue={row.endDate}
                              variant="standard"
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              defaultValue={row.jobDescription}
                              variant="standard" // Use "standard" to remove the border
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => removeWorkExperienceRow(index)}
                            >
                              <RiDeleteBinLine size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add New Row Button */}
                <div className="bg-[#0080FF0A] bg-opacity-5 rounded-[5px] w-full px-5 py-3">
                  <button
                    onClick={addWorkExperienceRow}
                    className="flex items-center gap-3 text-blue-500"
                  >
                    <FiPlusSquare size={20} />
                    <span className="text-sm">Add New Row</span>
                  </button>
                </div>
              </div>

              {/* Educational section Section */}
              <div className="mt-[50px]">
                <h3 className="text-lg font-semibold mb-4">
                  Educational History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#191919] rounded-[5px] text-[#fff]">
                        <th className="p-3 text-left whitespace-nowrap">
                          Name of Institute
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Degree
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Start Date
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          End Date
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Specialization
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id}>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              defaultValue={row.institute}
                              variant="standard"
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              defaultValue={row.degree}
                              variant="standard"
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              type="date"
                              variant="standard"
                              fullWidth
                              defaultValue={row.startDate}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              type="date"
                              variant="standard"
                              fullWidth
                              defaultValue={row.endDate}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              variant="standard"
                              defaultValue={row.specialization}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button onClick={() => deleteRow(row.id)}>
                              <RiDeleteBinLine size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add New Row Button */}
                <div className="bg-[#0080FF0A] w-full bg-opacity-5 rounded-[5px] px-5 py-3">
                  <button
                    onClick={addRow}
                    className="flex items-center gap-3 text-blue-500"
                  >
                    <FiPlusSquare size={20} />
                    <span className="text-sm">Add New Row</span>
                  </button>
                </div>
              </div>

              <div className="mt-[50px]">
                <h3 className="text-lg font-semibold mb-4">
                  Dependent Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#191919] rounded-[5px] text-[#fff]">
                        <th className="p-3 text-left whitespace-nowrap">
                          Name
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Relationship
                        </th>
                        <th className="p-3 text-left whitespace-nowrap">
                          Date of Birth
                        </th>
                        <th className="p-3 text-center whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentRows.map((row) => (
                        <tr key={row.id}>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              defaultValue={row.name}
                              variant="standard"
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              fullWidth
                              defaultValue={row.relationShip}
                              variant="standard"
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              type="date"
                              variant="standard"
                              fullWidth
                              defaultValue={row.dateOfBirth}
                              sx={{
                                "& .MuiInputBase-root": {
                                  border: "none", // Remove any border
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none", // Remove the bottom border
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none", // Remove the bottom border when focused
                                },
                              }}
                            />
                          </td>

                          <td className="p-2 text-center">
                            <button onClick={() => removeDepartmentRow(row.id)}>
                              <RiDeleteBinLine size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add New Row Button */}
                <div className="bg-[#0080FF0A] w-full bg-opacity-5 rounded-[5px] px-5 py-3">
                  <button
                    onClick={addDepartmentRow}
                    className="flex items-center gap-3 text-blue-500"
                  >
                    <FiPlusSquare size={20} />
                    <span className="text-sm">Add New Row</span>
                  </button>
                </div>
              </div>

              <div className="p-2 mt-[50px]">
                <h2 className="text-[22px] font-semibold mb-2">
                  Related Forms
                </h2>

                <div className="flex flex-col gap-2">
                  {/* Exit Details */}
                  <div
                    className="flex justify-between items-center border border-[#1F1F1F] rounded px-4 py-2 cursor-pointer"
                    onClick={toggleExitTable}
                  >
                    <span className="text-sm">Exit Details</span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <GoPlus
                        size={"24px"}
                        color="#A5A5A5"
                        onClick={() => setOpen(true)}
                      />
                      <div className="border border-[#A5A5A5] rounded-full">
                        {showExitTable ? (
                          <MdArrowDropUp />
                        ) : (
                          <MdArrowDropDown />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Table */}
                  {showExitTable && (
                    <div className="border border-[#1F1F1F] rounded p-4 overflow-x-auto mb-2">
                      <table className="min-w-[1400px] text-left text-xs">
                        <thead
                          className={`${
                            mode === "light" ? "bg-transparent" : "bg-[#191919]"
                          } rounded`}
                        >
                          <tr>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Employee ID
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Interviewer
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Separation Date
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Reason for Leaving
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Working for this organization again
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Think the organization do to improve staff welfare
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              What did you like the most of the organization
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Anything you wish to share with us
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Company vehicle handed in
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              All library books submitted
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Exit interview conducted
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Resignation letter submitted
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              All equipments handed in
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Security
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Notice period followed
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Manager/Supervisor clearance
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Added By
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Added Time
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Modified By
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Modified Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              colSpan={7}
                              className="text-center text-[#A5A5A5] pt-6 pb-2"
                            >
                              No record found
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Travel Expense */}
                  <div className="flex justify-between items-center border border-[#1F1F1F] rounded px-4 py-2 transition ">
                    <span className="text-sm">Travel Expense</span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <span className="text-sm">
                        <GoPlus size={"24px"} color={"#A5A5A5"} />
                      </span>
                      <div
                        className="border rounded-full border-[#A5A5A5]"
                        onClick={toggleExpTable}
                      >
                        {showTravelExpTable ? (
                          <MdArrowDropUp />
                        ) : (
                          <MdArrowDropDown />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Table */}
                  {showTravelExpTable && (
                    <div className="border border-[#1F1F1F] rounded p-4 overflow-x-auto mb-2">
                      <table className="min-w-[1400px] text-left text-xs">
                        <thead
                          className={`${
                            mode === "light" ? "bg-transparent" : "bg-[#191919]"
                          } rounded`}
                        >
                          <tr>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Employee ID
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Travel ID
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Added By
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Added Time
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Modified By
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center text-[#A5A5A5] pt-6 pb-2"
                            >
                              No record found
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Travel Request */}
                  <div className="flex justify-between items-center border border-[#1F1F1F] rounded px-4 py-2 transition">
                    <span className="text-sm">Travel Request</span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <span className="text-sm">
                        <GoPlus size={"24px"} color={"#A5A5A5"} />
                      </span>
                      <div
                        className="border border-[#A5A5A5] rounded-full"
                        onClick={toggleReqTable}
                      >
                        {showTravelReqable ? (
                          <MdArrowDropUp />
                        ) : (
                          <MdArrowDropDown />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Table */}
                  {showTravelReqable && (
                    <div className="border border-[#1F1F1F] rounded p-4 overflow-x-auto mb-2">
                      <table className="min-w-[1400px] text-left text-xs">
                        <thead
                          className={`${
                            mode === "light" ? "bg-transparent" : "bg-[#191919]"
                          } rounded`}
                        >
                          <tr>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Employee ID
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Travel ID
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Employee Department
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Place of visit
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Expected date of departure
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Expected date of arroval
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Purpose of visit
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Expected duration in days
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Is billable to customer
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Customer name
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Added By
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Added Time
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Modified By
                            </th>
                            <th className="px-4 py-2 whitespace-nowrap">
                              Modified Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              colSpan={9}
                              className="text-center text-[#A5A5A5] pt-6 pb-2"
                            >
                              No record found
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            onClick={closeEditModal}
            className={`border rounded-md w-[156px] h-[47px] ${
              mode === "light" ? "border-[#0088ff]" : "border-[#FFFFFF]"
            }`}
          >
            Cancel
          </button>
          <button
            className={` bg-[#0088ff] w-[156px] h-[47px] text-[#fff] rounded-md `}
          >
            Submit
          </button>
        </div>
      </div>

      {open && <AddExitModal open={open} setOpen={setOpen} />}
    </Dialog>
  );
};

export default EditProfileModal;
