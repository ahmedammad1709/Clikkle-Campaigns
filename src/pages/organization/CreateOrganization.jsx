import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  useTheme,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import "./organization.css";
import api from "../../utilities/axios";
const plans = {
  "Lite Plan":
    "Includes onboarding, support, drag‑and‑drop Email editor, basic templates, social posts, 1 automation, basic analytics, and 300+ integrations.",
  "Standard Plan":
    "Adds Email scheduling, advanced templates, detailed reporting, 3 automations, 10 segments, ad targeting, SEO recommendations, and 300+ integrations.",
  "Premium Plan":
    "Offers priority onboarding/support, dynamic Email content, unlimited automations, ecommerce tools, advanced targeting, premium SEO, and 300+ integrations.",
};

// Tabs Section
const CreateOrganization = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [organizationList, setOrganizationList] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState("");
  const totalSteps = 4;
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedPlan, setSelectedPlan] = useState("Lite Plan");
  const [openBusiness, setOpenBusiness] = useState(false);
  const theme = useTheme();
  const toggleDropdown = () => setIsOpen(!isOpen);

  const getOrganizationList = async () => {
    try {
      const response = await api.get("/user/organizations", {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("refreshToken")}`, // Incorrect token type
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("accessToken")}`,
        },
        withCredentials: true, // Optional, if backend uses cookies
      });
      setOrganizationList(response.data.organizations);
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/ListOrganization");
  };

  useEffect(() => {
    getOrganizationList();
  }, []);

  const handleSelect = (plan) => {
    alert(`Selected: ${plan}`);
    setIsOpen(false);
  };

  const [formInfo, setFormInfo] = useState({
    name: "",
    Email: "",
    Website: "",
    Address: "",
    Country: "",
    ZipCode: "",
    City: "",
    CompanyIndustry: "",
    // PlatformList: []
  });

  const handlePlatformList = (e) => {
    // const platform = e.target.name;
    // setFormInfo((prev) => ({
    //     ...prev,
    //     PlatformList: prev.PlatformList.includes(platform)
    //         ? prev.PlatformList
    //         : [...prev.PlatformList, platform],
    // }));
  };

  const handleChange = (e) => {
    setFormInfo((formInfo) => ({
      ...formInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      Email,
      Website,
      Address,
      Country,
      ZipCode,
      City,
      CompanyIndustry,
      PlatformList,
    } = formInfo;
    console.log(formInfo);
    
    // Validate required fields
    if (!name || !Email) {
      toast.warning("Organization Name and Email are required", {
        position: "top-center",
      });
      return;
    }

    // Validate Email
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|co\.in|info)$/;
    if (!emailRegex.test(Email)) {
      toast.warning("Please enter a valid Email Address", {
        position: "top-center",
      });
      return;
    }

    // Validate website (if provided)
    if (Website && !validateWebsite(Website)) {
      toast.warning("Please enter a valid website URL", {
        position: "top-center",
      });
      return;
    }

    // Validate at least one platform selected
    // if (PlatformList.length === 0) {
    //     toast.warning('Please select at least one platform', { position: "top-center" });
    //     return;
    // }

    try {
      const formData = new FormData();
      Object.entries(formInfo).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const user = JSON.parse(localStorage.getItem("user"));
      formData.append("userId", user?._id);
      formData.append("ownerId", user?._id);

      if (picture) {
        formData.append("logo", picture);
      }

      // Let axios interceptor handle Authorization
      const response = await api.post(`/user/organizations`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Organization Created Successfully", {
        position: "top-center",
      });
      navigate("/ListOrganization");
    } catch (e) {
      console.error(
        "Organization method error:",
        e.response?.data || e.message
      );
      toast.error("Something went wrong while creating organization", {
        position: "top-center",
      });
      navigate("/ListOrganization");

    }
  };

  const validateWebsite = (Website) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(Website);
  };

  const handlePhotoChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      toast.warning("No file selected", {
        position: "top-center",
      });
      return;
    }

    const file = files[0];
    const isValidExtension = ["PNG", "JPEG", "JPG", "AVIF", "WEBP"].some(
      (ext) => new RegExp(`(${ext})$`, "i").test(file.name)
    );

    if (!isValidExtension) {
      toast.warning(
        "Please provide a valid photo file format (PNG, JPEG, JPG, AVIF, WEBP).",
        {
          position: "top-center",
        }
      );
      return;
    }

    toast.success("Photo update successfully", {
      position: "top-center",
    });
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setPicture(file);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formInfo.name || !formInfo.Email) {
        toast.warning("Please fill in all required fields", { position: "top-center" });
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formInfo.Email)) {
        toast.warning("Please enter a valid email address", { position: "top-center" });
        return;
      }
      // Website validation if provided
      if (formInfo.Website) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,63})([/\w .-]*)*\/?$/i;
        if (!urlRegex.test(formInfo.Website)) {
          toast.warning("Please enter a valid website URL", { position: "top-center" });
          return;
        }
      }
    }
    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
    <ToastContainer />
    <Dialog
      open={isModalOpen}
      onClose={handleCancel}
      fullWidth
      maxWidth="md"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <DialogTitle sx={{ pr: 1 }}>
        <Stepper activeStep={step - 1} alternativeLabel>
          {["Welcome", "Address", "Contacts", "Migration"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {organizationList.length > 0 && (
          <IconButton
            onClick={handleCancel}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            ×
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers>
        <form id="org-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <Grid container spacing={2}>

              {/* <Grid item xs={12}>
                <Typography variant="h5">
                  Hello, {user.firstName + " " + user.lastName}! 👋
                </Typography>
                <Typography>We’re delighted to have you with us 🎉</Typography>
                <Box sx={{ marginBottom: "10px" }}>
                  <Box
                    sx={{ fontWeight: 600, fontSize: 12, paddingTop: "5px" }}
                  >
                    Start your{" "}
                    <Box sx={{ display: "inline", color: "#0080FF" }}>
                      {selectedPlan === "Free Plan"
                        ? "Forever Free Plan"
                        : "14-Days Free Trial"}
                    </Box>{" "}
                    of our{" "}
                    <Box
                      onClick={() => setOpenBusiness(!openBusiness)}
                      style={{
                        backgroundColor:
                          theme === "dark" ? "rgb(18, 31, 43)" : "#e5f2ff",
                      }}
                      sx={{
                        display: "inline",
                        padding: "6px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      {selectedPlan}
                      {openBusiness && (
                        <Box
                          onMouseEnter={() => setOpenBusiness(true)}
                          onMouseLeave={() => setOpenBusiness(false)}
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#1c1c1c" : "#ffff",
                          }}
                          sx={{
                            position: "absolute",
                            zIndex: 40,
                            width: "200px",
                            padding: "5px",
                            marginTop: "6px",
                            borderRadius: "5px",
                            right: "-5px",
                            boxShadow:
                              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                          }}
                        >
                          <Box sx={{ padding: "2px" }}>
                            {Object.keys(plans).map((plan) => (
                              <Box
                                key={plan}
                                onClick={() => {
                                  setSelectedPlan(plan);
                                  setOpenBusiness(false);
                                }}
                                sx={{
                                  cursor: "pointer",
                                  padding: "6px",
                                  fontSize: 14,
                                }}
                              >
                                {plan}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Typography
                    style={{ color: "rgb(165, 165, 165)" }}
                    sx={{ fontSize: "14px", margin: "5px 0 6px 0" }}
                  >
                    {plans[selectedPlan]}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Let’s get you started by filling your organization’s details
                </Typography>
              </Grid> */}




    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4 }}
      sx={{ p: { xs: 2, sm: 2, md: 2 } }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 600,
          }}
        >
          Hello, {user.firstName} {user.lastName}! 👋
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1,
          }}
        >
          We’re delighted to have you with us 🎉
        </Typography>

        {/* <Box sx={{ mt: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
            }}
          >
            Start your{' '}
          </Typography>
          <Typography
            component="span"
            sx={{
              display: 'inline',
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            {selectedPlan === 'Free Plan'
              ? 'Forever Free Plan'
              : '14-Days Free Trial'}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              ml: 0.5,
            }}
          >
            of our{' '}
          </Typography>
          <Box
            onClick={() => setOpenBusiness(!openBusiness)}
            sx={{
              display: 'inline-block',
              p: { xs: '4px 8px', sm: '6px 12px' },
              borderRadius: 1,
              cursor: 'pointer',
              position: 'relative',
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgb(18, 31, 43)'
                  : '#e5f2ff',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                fontWeight: 500,
              }}
            >
              {selectedPlan}
            </Typography>

            {openBusiness && (
              <Box
                onMouseEnter={() => setOpenBusiness(true)}
                onMouseLeave={() => setOpenBusiness(false)}
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  mt: 1,
                  width: { xs: 180, sm: 200 },
                  bgcolor:
                    theme.palette.mode === 'dark' ? '#1c1c1c' : '#fff',
                  p: 1,
                  borderRadius: 1,
                  boxShadow: theme.shadows[3],
                  zIndex: 10,
                }}
              >
                {Object.keys(plans).map((plan) => (
                  <Box
                    key={plan}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpenBusiness(false);
                    }}
                    sx={{
                      p: { xs: 0.5, sm: 1 },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      cursor: 'pointer',
                    }}
                  >
                    {plan}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              mt: 1,
            }}
          >
            {plans[selectedPlan]}
          </Typography>
        </Box> */}

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Let’s get you started by filling your organization’s details
        </Typography>
      </Grid>
    </Grid>








              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Name"
                  name="name"
                  value={formInfo.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Email"
                  name="Email"
                  type="email"
                  value={formInfo.Email}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Size"
                  name="size"
                  type="number"
                  value={formInfo.size}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Website URL"
                  name="Website"
                  type="url"
                  value={formInfo.Website}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <FormControl>
                  <input
                    accept="image/*"
                    id="logo-upload"
                    type="file"
                    hidden
                    onChange={handlePhotoChange}
                  />
                  <label htmlFor="logo-upload">
                    <IconButton component="span">
                      {image ? (
                        <Avatar src={image} sx={{ width: 64, height: 64 }} />
                      ) : (
                        <Avatar
                          sx={{
                            width: 44,
                            height: 44,
                            bgcolor: "background.main",
                          }}
                        >
                          <AddOutlinedIcon />
                        </Avatar>
                      )}
                    </IconButton>
                  </label>
                  <Typography variant="body2" color="text.secondary">
                    Upload your logo (1:1 ratio preferred)
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Company Address 📍</Typography>
                <Typography variant="body2" color="text.secondary">
                  We require your company’s physical Address to include in the
                  footer of all your emails to ensure compliance with anti‑spam
                  laws.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="Address"
                  value={formInfo.Address}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Country"
                  name="Country"
                  value={formInfo.Country}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Zip Code"
                  name="ZipCode"
                  value={formInfo.ZipCode}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="City"
                  name="City"
                  value={formInfo.City}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
            </Grid>
          )}

          {step === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  How Large Is Your Contact List? 📘
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This would help us onboard you better.
                </Typography>
              </Grid>
              {[
                "Less than 500",
                "500 to 1000",
                "1000 to 2500",
                "2500 to 5000",
                "5000 to 10,000",
                "10,000 to 25,000",
                "25,000 to 50,000",
                "50,000 to 100,000",
                "Above 100,000",
              ].map((label, idx) => (
                <Grid item xs={4} key={idx}>
                  <TextField
                    label={label}
                    name={`CurrencySize${idx + 1}`}
                    value={formInfo[`CurrencySize${idx + 1}`]}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel size="small" id="industry-label">
                    Company Industry
                  </InputLabel>
                  <Select
                    labelId="industry-label"
                    label="Company Industry"
                    name="CompanyIndustry"
                    value={formInfo.CompanyIndustry}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">
                      <em>Select Industry</em>
                    </MenuItem>
                    <MenuItem value="ABC">ABC</MenuItem>
                    <MenuItem value="XYZ">XYZ</MenuItem>
                    <MenuItem value="PQR">PQR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {step === 4 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Free Migration Support (Optional)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our product experts are here to assist you in migrating from
                  your current Email marketing platform to Clikkle Campaigns.
                </Typography>
              </Grid>
              {/** Replace with mapped logos as clickable items */}
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {[...Array(9)].map((_, i) => (
                    <Grid item xs={4} key={i}>
                      <Avatar
                        variant="square"
                        src={`/images/Group/Group_200${i}.png`}
                        onClick={() =>
                          setFormInfo({ ...formInfo, platform: i })
                        }
                        sx={{
                          width: "100%",
                          height: 60,
                          cursor: "pointer",
                          border:
                            formInfo.platform === i ? "2px solid" : "none",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {step > 1 && <Button onClick={prevStep}>Previous Step</Button>}
        {step < totalSteps ? (
          <Button
            size="medium"
            onClick={nextStep}
            variant="contained"
            disabled={
              (step === 1 &&
                (!formInfo.name ||
                  !formInfo.Email ||
                  !formInfo.size ||
                  !formInfo.Website ||
                  !image)) ||
              (step === 2 &&
                (!formInfo.Address ||
                  !formInfo.Country ||
                  !formInfo.ZipCode ||
                  !formInfo.City)) ||
              (step === 3 && !formInfo.CompanyIndustry)
            }
          >
            Next
          </Button>
        ) : (
          <>
            <Button size="medium" onClick={handleSubmit} variant="outlined">
              Skip & Continue
            </Button>
            <Button
              size="medium"
              type="submit"
              form="org-form"
              variant="contained"
            >
              Finish
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
    </>
  );
};

export default CreateOrganization;

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-3">
      {/* Step text */}
      <div className="text-sm font-medium text-gray-600 mb-2">
        Step {currentStep} of {totalSteps}
      </div>

      {/* Progress bar with circles */}
      <div className="flex items-center space-x-2">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <div
              key={stepNumber}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                isActive ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};
