import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import "./organization.css";
import api from "../../utilities/axios";

const plans = {
  "Lite Plan": "Includes onboarding, support, drag‑and‑drop email editor, basic templates, social posts, 1 automation, basic analytics, and 300+ integrations.",
  "Standard Plan": "Adds email scheduling, advanced templates, detailed reporting, 3 automations, 10 segments, ad targeting, SEO recommendations, and 300+ integrations.",
  "Premium Plan": "Offers priority onboarding/support, dynamic email content, unlimited automations, ecommerce tools, advanced targeting, premium SEO, and 300+ integrations."
};
// Tabs Section
const EditOrganization = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [organizationList, setOrganizationList] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState("");
  const totalSteps = 4;
  const [isOpen, setIsOpen] = useState(false);
  let id = '';
  const user = JSON.parse(localStorage.getItem("user"))
  const toggleDropdown = () => setIsOpen(!isOpen);
  const location = useLocation();

  const getEditData = () => {
    console.log('location :', location.state.org);
    setFormInfo(location.state.org);
    id = location.state.org._id
    console.log('id :', id);
    setImage(`${process.env.REACT_APP_SERVER}/static/${location.state.org.logo}`)
  }

  const getOrganizationList = async () => {
    try {
      const response = await api.get("/user/organizations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
        withCredentials: true, // Optional, if backend uses cookies
      });
      setOrganizationList(response.data.organizations)

    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/organization');
  }

  const handleSelect = (plan) => {
    alert(`Selected: ${plan}`);
    setIsOpen(false);
  };

  const [formInfo, setFormInfo] = useState({
    name: '',
    Email: '',
    Website: '',
    Address: '',
    Country: '',
    ZipCode: '',
    City: '',
    CompanyIndustry: '',
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
    setFormInfo(formInfo => ({
      ...formInfo,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, Email, Website, Address, Country, ZipCode, City, CompanyIndustry, PlatformList } = formInfo;

    // Validate required fields
    if (!name || !Email) {
      toast.warning('Organization Name and Email are required', { position: "top-center" });
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|co\.in|info)$/;
    if (!emailRegex.test(Email)) {
      toast.warning('Please enter a valid email address', { position: "top-center" });
      return;
    }

    // Validate website (if provided)
    if (Website && !validateWebsite(Website)) {
      toast.warning('Please enter a valid website URL', { position: "top-center" });
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

      if (picture) {
        formData.append("logo", picture);
      }

      const accessToken = localStorage.getItem("refreshToken");

      const response = await api.post(`/user/organizations/${location.state.org._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status) {

        toast.success('Organization Updated Successfully', { position: "top-center" });
      } else {
        toast.error(`Error - ${response.message}`, { position: "top-center" });
      }
            navigate('/organization');
      
    } catch (e) {
      console.error("Organization method error:", e.response?.data || e.message);
      toast.error('Something went wrong while creating organization', { position: "top-center" });
    }
  };

  const validateWebsite = (website) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(website);
  };

  const handlePhotoChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      toast.warning('No file selected', {
        position: "top-center",
      })
      return;
    }

    const file = files[0];
    const isValidExtension = ["PNG", "JPEG", "JPG", "AVIF", "WEBP"].some(
      (ext) => new RegExp(`(${ext})$`, "i").test(file.name)
    );

    if (!isValidExtension) {
      toast.warning('Please provide a valid photo file format (PNG, JPEG, JPG, AVIF, WEBP).', {
        position: "top-center",
      })
      return;
    }

    toast.success('Photo update successfully', {
      position: "top-center",
    })
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setPicture(file);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  useEffect(() => {
    getOrganizationList();
    getEditData();
  }, [])

  return (

 <Dialog
      open={isModalOpen}
      onClose={handleCancel}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle sx={{ position: 'relative', pr: 2 }}>
        <Stepper activeStep={step - 1} alternativeLabel>
          {['Welcome', 'Address', 'Contacts', 'Migration'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {organizationList.length > 0 && (
          <IconButton
            onClick={handleCancel}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            ×
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers>
        <form id="edit-org-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Hello, {user.firstName + " " + user.lastName}! 👋</Typography>
                <Typography gutterBottom>
                  We’re delighted to have you with us 🎉
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {/* your toggleDropdown */}}
                  sx={{ mb: 1 }}
                >
                  Select Plan
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Let’s get you started by filling your organization’s details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Name"
                  name="name"
                  value={formInfo.name}
                  onChange={handleChange}
                  fullWidth
                  required
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organization Size"
                  name="Size"
                  type="number"
                  value={formInfo.Size}
                  onChange={handleChange}
                  fullWidth
                  required
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
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                      <Avatar sx={{ width: 64, height: 64, bgcolor: 'background.paper' }}>
                        <AddOutlinedIcon />
                      </Avatar>
                    )}
                  </IconButton>
                </label>
                <Typography variant="body2" color="text.secondary">
                  Upload your logo (1:1 ratio preferred)
                </Typography>
              </Grid>
            </Grid>
          )}

          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Company Address 📍</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  We require your company's address for compliance with anti‑spam laws.
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
                />
              </Grid>
            </Grid>
          )}

          {step === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">How Large Is Your Contact List? 📘</Typography>
              </Grid>
              {['Less than 500','500 to 1000','1000 to 2500','2500 to 5000','5000 to 10,000','10,000 to 25,000','25,000 to 50,000','50,000 to 100,000','Above 100,000']
                .map((label, idx) => (
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
                  <InputLabel id="industry-label">Company Industry</InputLabel>
                  <Select
                    labelId="industry-label"
                    label="Company Industry"
                    name="CompanyIndustry"
                    value={formInfo.CompanyIndustry}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value=""><em>Select Industry</em></MenuItem>
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
                <Typography variant="h6">Free Migration Support (Optional)</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Select your current platform to get expert migration help.
                </Typography>
              </Grid>
              {[...Array(9)].map((_, i) => (
                <Grid item xs={4} key={i}>
                  <Avatar
                    variant="square"
                    src={`/images/Group/Group_200${i}.png`}
                    onClick={() => handlePlatformList(i)}
                    sx={{
                      width: '100%',
                      height: 80,
                      cursor: 'pointer',
                      border: formInfo.platform === i ? '2px solid' : 'none',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {step > 1 && (
          <Button onClick={prevStep}>Previous Step</Button>
        )}

        {step < totalSteps ? (
          <Button
            onClick={nextStep}
            variant="contained"
            disabled={
              (step === 1 && (!formInfo.name || !formInfo.Email || !formInfo.Size || !formInfo.Website || !image)) ||
              (step === 2 && (!formInfo.Address || !formInfo.Country || !formInfo.ZipCode || !formInfo.City)) ||
              (step === 3 && !formInfo.CompanyIndustry)
            }
          >
            Next
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel}>Skip & Continue</Button>
            <Button type="submit" form="edit-org-form" variant="contained">
              Finish
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
 

    // <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
    //   <div className="  rounded-lg shadow-xl w-full max-w-lg h-[80vh] overflow-y-auto flex flex-col justify-between">
    //     {organizationList.length > 0 && (
    //       <button
    //         type="button"
    //         className="flex self-end mr-3 text-xl"
    //         onClick={(e) => handleCancel(e)}
    //       >
    //         ×
    //       </button>
    //     )}
    //     <div className="px-6 flex-1">
    //       <StepIndicator currentStep={step} totalSteps={totalSteps} />

    //       <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
    //         {/* === Step 1 === */}
    //         {step === 1 && (
    //           <>
    //             <div className="space-y-1">
    //               <h2 className="text-base font-semibold leading-tight">Hello, BCG Technologies! 👋</h2>
    //               <h2 className="text-base font-semibold leading-tight">We're delighted to have you with us 🎉</h2>
    //               <div className="flex items-center flex-wrap gap-2">
    //                 <h2 className="text-base font-semibold text-black leading-tight">
    //                   Start your <span className="text-blue-500">Forever Free Plan</span> of our
    //                 </h2>
    //                 <button
    //                   onClick={() => toggleDropdown()}
    //                   type="button"
    //                   className="bg-sky-400 text-black px-3 py-1 rounded-lg shadow hover:bg-sky-300 transition"
    //                 >
    //                   Select Plan
    //                 </button>
    //               </div>
    //               <p className="text-sm text-gray-600 leading-snug">
    //                 Let’s get you started by filling your organization’s details
    //               </p>
    //             </div>

    //             <div>
    //               <label htmlFor="Name">Organization Name</label>
    //               <input
    //                 id="Name"
    //                 name="name"
    //                 value={formInfo.name}
    //                 onChange={(e) => handleChange(e)}
    //                 placeholder="Enter Name"
    //                 className="w-full border p-1 rounded"
    //               />
    //             </div>

    //             <div className="grid grid-cols-2 gap-2">
    //               <div>
    //                 <label htmlFor="Email">Organization Email</label>
    //                 <input
    //                   id="Email"
    //                   name="Email"
    //                   type="email"
    //                   value={formInfo.Email}
    //                   onChange={(e) => handleChange(e)}
    //                   placeholder="Enter Email"
    //                   className="w-full border p-1 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="Size">Organization Size</label>
    //                 <input
    //                   id="Size"
    //                   name="Size"
    //                   type="number"
    //                   value={formInfo.Size}
    //                   onChange={(e) => handleChange(e)}
    //                   placeholder="Enter Size"
    //                   className="w-full border p-1 rounded"
    //                 />
    //               </div>
    //             </div>

    //             <div>
    //               <label htmlFor="Website">Organization Website URL</label>
    //               <input
    //                 id="Website"
    //                 name="Website"
    //                 type="url"
    //                 value={formInfo.Website}
    //                 onChange={(e) => handleChange(e)}
    //                 placeholder="Enter Website URL"
    //                 className="w-full border p-1 rounded"
    //               />
    //             </div>

    //             <div>
    //               <label className="block mb-1 text-sm font-medium">Organization Logo</label>
    //               <div className="flex items-center gap-4 ">
    //                 <label className="cursor-pointer flex items-center justify-center w-16 h-16 border-2  rounded-full">
    //                   {image ? (
    //                     <img src={image} alt="Logo" className="w-full h-full object-cover p-1 rounded-full" />
    //                   ) : (
    //                     <AddOutlinedIcon className="text-gray-400" />
    //                   )}
    //                   <input
    //                     type="file"
    //                     accept="image/*"
    //                     onChange={(e) => handlePhotoChange(e)}
    //                     className="hidden"
    //                   />
    //                 </label>
    //                 <span className="text-sm text-gray-500">Upload your logo (1:1 ratio preferred)</span>
    //               </div>
    //             </div>
    //           </>
    //         )}

    //         {step === 2 && (
    //           <div>
    //             {/* Step 2 content */}
    //             <h2 className="text-xl font-semibold mb-2">
    //               Company Address 📍
    //             </h2>
    //             <p className="mb-4 text-gray-600">
    //               We require your company's physical address to include in the footer of all your emails.
    //             </p>
    //             <p className="mb-4 text-gray-600">
    //               This would ensure compliance with anti-spam laws.                    </p>
    //             <label htmlFor="Address">Address</label>
    //             <input
    //               type="text"
    //               placeholder="Enter Address" id='Address' name='Address' value={formInfo.Address} onChange={(e) => handleChange(e)}
    //               className="w-full border p-2 mb-3 rounded"
    //             />
    //             <div className="grid grid-cols-2 gap-2">
    //               <div>
    //                 <label htmlFor="Country">Country</label>
    //                 <input
    //                   type="text"
    //                   placeholder="Enter Country" id='Country' name='Country' value={formInfo.Country} onChange={(e) => handleChange(e)}
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="ZipCode">Zip Code</label>
    //                 <input
    //                   type="text"
    //                   placeholder="Enter Zip Code" id='ZipCode' name='ZipCode' value={formInfo.ZipCode} onChange={(e) => handleChange(e)}
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //             </div>
    //             <label htmlFor="City">City</label>
    //             <input
    //               type="text"
    //               placeholder="Enter City" id='City' name='City' value={formInfo.City} onChange={(e) => handleChange(e)}
    //               className="w-full border p-2 mb-3 rounded"
    //             />
    //           </div>
    //         )}
    //         {step === 3 && (
    //           <div>
    //             {/* Step 2 content */}
    //             <h2 className="text-xl font-semibold mb-2">
    //               How Large Is Your Contact List? 📘
    //             </h2>
    //             <p className="mb-6 text-gray-600">
    //               This would help us onboard you better.
    //             </p>
    //             <h3 className="mb-2 font-bold text-gray-600">
    //               What is the current size of your contact list?
    //             </h3>
    //             <div className="grid grid-cols-3 mb-4 gap-2">
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize1' name='CurrencySize1' value={formInfo.CurrencySize1} onChange={(e) => handleChange(e)}
    //                   placeholder="Less then 500"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize2' name='CurrencySize2' value={formInfo.CurrencySize2} onChange={(e) => handleChange(e)}
    //                   placeholder="500 to 1000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize3' name='CurrencySize3' value={formInfo.CurrencySize3} onChange={(e) => handleChange(e)}
    //                   placeholder="1000 to 2500"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize4' name='CurrencySize4' value={formInfo.CurrencySize4} onChange={(e) => handleChange(e)}
    //                   placeholder="2500 to 5000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize5' name='CurrencySize5' value={formInfo.CurrencySize5} onChange={(e) => handleChange(e)}
    //                   placeholder="5000 to 10,000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize6' name='CurrencySize6' value={formInfo.CurrencySize6} onChange={(e) => handleChange(e)}
    //                   placeholder="10,000 to 25,000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize7' name='CurrencySize7' value={formInfo.CurrencySize7} onChange={(e) => handleChange(e)}
    //                   placeholder="25,000 to 50,000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize8' name='CurrencySize8' value={formInfo.CurrencySize8} onChange={(e) => handleChange(e)}
    //                   placeholder="50,000 to 100,000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="text"
    //                   id='CurrencySize9' name='CurrencySize9' value={formInfo.CurrencySize9} onChange={(e) => handleChange(e)}
    //                   placeholder="Above 100,000"
    //                   className="w-full border p-2 mb-3 rounded"
    //                 />
    //               </div>
    //             </div>
    //             <label htmlFor="CompanyIndustry">Company Industry</label>
    //             <select id="CompanyIndustry" name='CompanyIndustry' value={formInfo.CompanyIndustry} onChange={(e) => handleChange(e)} className="  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    //               <option selected>Select Industry</option>
    //               <option value="ABC">ABC</option>
    //               <option value="XYZ">XYZ</option>
    //               <option value="PQR">PQR</option>
    //             </select>
    //           </div>
    //         )}

    //         {step === 4 && (
    //           <div>
    //             {/* Step 2 content */}
    //             <h2 className="text-xl font-semibold mb-2">
    //               Free Migration Support (Optional)
    //             </h2>
    //             <p className="mb-4 text-gray-600">
    //               Our product experts are here to assist you in migrating from your current email
    //               marketing platform (if applicable) to Clikkle Campaigns and will handle the complete
    //               setup of your account.
    //             </p>

    //             <label htmlFor="">Select your Platform</label>
    //             <div className="grid grid-cols-3 mb-4 gap-1">
    //               <div>
    //                 <img src='/images/Group/Group_2000.png' name="Group_2000.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2001.png' name="Group_2001.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2002.png' name="Group_2002.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2003.png' name="Group_2003.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2004.png' name="Group_2004.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2005.png' name="Group_2005.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2006.png' name="Group_2006.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2007.png' name="Group_2007.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //               <div>
    //                 <img src='/images/Group/Group_2008.png' name="Group_2008.png" alt="Logo" onClick={(e) => handlePlatformList(e)} className="w-full h-full object-cover p-1" />
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         <div className="p-2 flex justify-end  ">
    //           {step > 1 && (
    //             <button
    //               type="button"
    //               onClick={() => prevStep()}
    //               className="text-gray-600 mr-4"
    //             >
    //               Previous Step
    //             </button>
    //           )}
    //           {step < totalSteps ? (
    //             <button
    //               type="button"
    //               onClick={() => nextStep()}
    //               disabled={(step === 1 && (!formInfo.name || !formInfo.Email || !formInfo.Size || !formInfo.Website || !image)) || (step === 2 && (!formInfo.Address || !formInfo.Country || !formInfo.ZipCode || !formInfo.City)) || (step === 3 && (!formInfo.CompanyIndustry))}
    //               className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
    //             >
    //               Next
    //             </button>
    //           ) : (
    //             <div className="flex gap-2">
    //               <button
    //                 type="button"
    //                 className=" text-gray-500 border-2 px-5 py-2 rounded"
    //               >
    //                 Skip & Continue
    //               </button>
    //               <button
    //                 type="submit"
    //                 className="bg-blue-600 text-white px-5 py-2 rounded"
    //               >
    //                 Finish
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       </form>
    //     </div>


    //   </div>
    // </div>
  );
};

export default EditOrganization;


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
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${isActive ? "bg-blue-500" : "bg-gray-200"
                }`}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

