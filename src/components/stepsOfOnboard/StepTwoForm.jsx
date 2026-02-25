import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useSnack from "../../hooks/useSnack";
import axiosInstance from "../../utilities/axios";
import { useSearchParams } from "react-router-dom";
const StepThreeForm = () => {
  const theme = useTheme();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    recoveryEmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { SnackBar, showMessage } = useSnack();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token"); // e.g., "active"

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data?.email && data?.recovery_email && data?.password) {
      setCredentials({
        email: data.email,
        recoveryEmail: data.recovery_email,
        password: data.password,
      });
    }
  }, []);

  const validate = () => {
    let temp = {};
    temp.otp =
      otp.length === 6 && /^\d+$/.test(otp)
        ? ""
        : "Enter a valid 6-digit verification code";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Email: ${credentials.email}\nPassword: ${credentials.password}`
    );
    showMessage({ success: "Credentials copied to clipboard!" });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showMessage({ error: "Please enter a valid 6-digit code" });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://accounts.clikkle.com:5000/api/auth/register_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loginCode: otp,
            recoveryEmail: credentials.recoveryEmail,
          }),
        }
      );

      const result = await response.json();
       // console.log(result.user, "result");

      // const signupData = {
      //   userName: result.user.username,
      //   firstName: result.user.firstName,
      //   lastName: result.user.lastName,
      //   email: result.user.recoveryEmail,
      //   password: credentials.password,
      // };
      if (response.ok && result.success) {
        // const result = await axiosInstance.post(
        //   "/api/v2/auth/register",
        //   signupData
        // );
        // if (result.status === 200) {
          if (token) {
            navigate(`/invite?token=${token}`);
          }
          setPopupOpen(true);
        // }
      } else {
        showMessage({ error: result.message || "Invalid or expired OTP" });
      }
    } catch (error) {
      showMessage({ error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleChangeEmail = () => {
    navigate("/signup");
    window.location.reload();
  };

  return (
    <>
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
          mx: { xs: 2, md: 0 },
        }}
      >
        {/* Left Side Form */}
        <Box flex={1} p={4}>
          <Typography variant="body2" color="text.secondary">
            3 / 3
          </Typography>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Check your email
          </Typography>
          <Typography variant="body1" gutterBottom>
            A confirmation code was sent to{" "}
            <b>{credentials.recoveryEmail || "your email"}</b>
          </Typography>

          <TextField
            fullWidth
            label="6 Digit Verification Code *"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 2 }}
            error={Boolean(errors.otp)}
            helperText={errors.otp}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Verify"}
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Didn’t receive the code?{" "}
            <Link component="button" onClick={handleChangeEmail}>
              Change email
            </Link>
          </Typography>
        </Box>

        {/* Right Side - Placeholder */}
        <Box
          flex={1}
          p={4}
          sx={{
            bgcolor: "background.default",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderLeft: {
              xs: "none",
              md: `1px solid ${theme.palette.divider}`,
            },
            borderTop: { xs: `1px solid ${theme.palette.divider}`, md: "none" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              opacity: 0.3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box height={25} bgcolor="divider" borderRadius={1} width="80%" />
            <Box height={25} bgcolor="divider" borderRadius={1} width="60%" />
            <Box height={25} bgcolor="divider" borderRadius={1} width="70%" />
          </Box>

          <Box
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 24,
              color: "text.primary",
              mt: 4,
            }}
          >
            {otp}
          </Box>
        </Box>
      </Box>

      {/* 🎉 Popup for credentials */}
      <Dialog open={popupOpen} onClose={handleClosePopup}>
        <DialogTitle>Registration Successful 🎉</DialogTitle>
        <DialogContent sx={{ bgcolor: "background.default" }}>
          <Typography gutterBottom>Here are your login credentials:</Typography>
          <Box
            sx={{
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 1,
              p: 2,
              bgcolor: "background.default",
              mt: 1,
            }}
          >
            <Typography>
              <b>Email:</b> {credentials.email}
            </Typography>
            <Typography>
              <b>Password:</b> {credentials.password}
            </Typography>

            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "background.default" }}>
          <Button onClick={handleClosePopup} variant="contained">
            Go to Login
          </Button>
        </DialogActions>
        {SnackBar}
      </Dialog>
    </>
  );
};

export default StepThreeForm;