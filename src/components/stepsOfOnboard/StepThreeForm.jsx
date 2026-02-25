import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useSnack from "../../hooks/useSnack";

const StepTwoForm = ({ handleNext }) => {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const { SnackBar, showMessage } = useSnack();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData?.email) {
      setEmail(storedData.email);
    }
  }, []);

  const validate = () => {
    let temp = {};
    temp.password = password
      ? password.length >= 6 && !/[<> ]/.test(password)
        ? ""
        : "Password must be at least 6 characters long and must not contain <, >, or spaces"
      : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      const existingData = JSON.parse(localStorage.getItem("userData")) || {};
      const updatedData = { ...existingData, password };
      localStorage.setItem("userData", JSON.stringify(updatedData));

      const {
        recovery_email,
        firstName,
        lastName,
        phoneNumber,
        email,
        password: storedPassword,
        day,
        month,
        year,
      } = updatedData;

      const dob = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const username = email?.split("@")[0] || "";
      const gender = "male";

      const body = {
        recoveryEmail: recovery_email,
        firstName,
        lastName,
        phoneNumber,
        email,
        password: storedPassword,
        gender,
        dob,
        username,
        accountType: "personal",
        referred_by: "onWebsite",
      };

      try {
        const res = await fetch(
          "https://accounts.clikkle.com:5000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const resData = await res.json();
        if (resData.success) {
          showMessage({ success: resData.message || "Registration successful" });
          handleNext();
        } else {
          showMessage({ error: resData.message || "Registration failed" });
        }
      } catch (error) {
        showMessage({ error: error || "Registration failed" });
      } finally {
        setLoading(false);
      }
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
        mx: { xs: 2, md: 0 },
      }}
    >
      <Box flex={1} p={4}>
        <Typography variant="body2" color="text.secondary">
          2 / 3
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Set your password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your account login will be <b>{email || "..."}</b>
        </Typography>

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText sx={{ mt: 2, mx: 2, mb: 0 }}>
          <ul>
            <li>Must be at least 6 characters long.</li>
            <li>Must not contain &lt;, &gt;, or spaces.</li>
          </ul>
        </FormHelperText>

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
{/* 
        <Box
          textAlign="center"
          width="100%"
          pt={4}
          pb={2}
          borderTop={`1px solid ${theme.palette.divider}`}
        >
          <Typography variant="caption" color="text.secondary">
            Signature
          </Typography>
        </Box>
         */}
      </Box>
      {SnackBar}
    </Box>
  );
};

export default StepTwoForm;