import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import useSnack from "../../hooks/useSnack";

const StepOneForm = ({
  firstName,
  lastName,
  phone,
  setFirstName,
  setLastName,
  setPhone,
  handleNext,
}) => {
  const theme = useTheme();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { SnackBar, showMessage } = useSnack();
  const fullName = `${firstName} ${lastName}`.trim();

  const validate = () => {
    let temp = {};
    temp.firstName = firstName ? "" : "First name is required";
    temp.lastName = lastName ? "" : "Last name is required";
    temp.phone = phone
      ? /^[0-9]{10,15}$/.test(phone)
        ? ""
        : "Enter a valid phone number"
      : "Phone number is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showMessage({ error: "Please fix the form errors before proceeding" });
      return;
    }

    try {
      setLoading(true);
      const existingData = JSON.parse(localStorage.getItem("userData")) || {};

      // Generate random DOB
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomYear =
        Math.floor(Math.random() * (2004 - 1950 + 1)) + 1950;

      const updatedData = {
        ...existingData,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone.trim(),
        day: randomDay,
        month: randomMonth,
        year: randomYear,
      };

      localStorage.setItem("userData", JSON.stringify(updatedData));

      // Generate suggested email
      const formData = new FormData();
      formData.append("firstName", updatedData.firstName);
      formData.append("lastName", updatedData.lastName);
      formData.append("day", updatedData.day);
      formData.append("month", updatedData.month);
      formData.append("year", updatedData.year);

      const response = await fetch(
        "https://accounts.clikkle.com:5000/api/auth/suggest_name",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        const finalData = {
          ...updatedData,
          email: responseData.data[0] + '@clikkmail.com',
        };

        localStorage.setItem("userData", JSON.stringify(finalData));
        showMessage({ success: "Profile information saved successfully!" });
        handleNext();
      } else {
        showMessage({ error: responseData.error || "Failed to generate email" });
      }
    } catch (error) {
       // console.error("Error:", error);
      showMessage({ error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection={{ xs: "column-reverse", md: "row" }}
      sx={{
        bgcolor: "background.default",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        width: { xs: "100%", md: 900 },
        minHeight: 400,
        zIndex: 1000,
      }}
    >
      {/* Left Side Form */}
      <Box flex={1} p={4}>
        <Typography variant="body2" color="text.secondary">
          1 / 3
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Let's start!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Let’s get the basics. Enter your info below.
        </Typography>

        <Box
          display="flex"
          gap={2}
          mt={2}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <TextField
            fullWidth
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            fullWidth
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
        </Box>

        <TextField
          fullWidth
          label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mt: 2 }}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Next"}
        </Button>
      </Box>

      {/* Right Side - Signature Preview */}
      <Box
        flex={1}
        p={4}
        sx={{
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          borderLeft: { xs: "none", md: `1px solid ${theme.palette.divider}` },
          borderTop: { xs: `1px solid ${theme.palette.divider}`, md: "none" },
        }}
      >
        {/* Simulated Placeholder Content */}
        <Box
          sx={{
            width: "100%",
            opacity: 0.3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box height={25} bgcolor="divider" borderRadius={1} />
          <Box height={25} bgcolor="divider" width="70%" borderRadius={1} />
          <Box height={25} bgcolor="divider" width="90%" borderRadius={1} />
          <Box height={25} bgcolor="divider" width="60%" borderRadius={1} />
        </Box>

        {/* Signature Display
        <Box
          textAlign="center"
          width="100%"
          pt={4}
          pb={2}
          borderTop={`1px solid ${theme.palette.divider}`}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 28,
              color: "text.primary",
              minHeight: "40px",
            }}
          >
            {fullName || "__"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Signature Preview
          </Typography>
        </Box> */}
      </Box>
      {SnackBar}
    </Box>
  );
};

export default StepOneForm;