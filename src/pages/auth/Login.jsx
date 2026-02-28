/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  CircularProgress,
} from "@mui/material";
import { Height, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getCookie, setCookie } from "../../utilities/cookies";
import useSnack from "../../hooks/useSnack";
import { useTheme } from "../../styles/theme";
import { useFirstVisitRedirect } from "../../services/userFirstRedirect";
import axios from "axios";

import Loading from "../../components/Loading";
import { env } from "../../utilities/function";
import { useSetUser } from "../../hooks/Authorize";
import { FacebookTwoTone } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
} from "../../utilities/firebase.config";
import api from "../../utilities/axios";

// const API_BASE_URL = "https://accounts.clikkle.com:5000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { SnackBar, showMessage } = useSnack();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userIdFromParam = searchParams.get("userId");

  async function HandleUserLoginById(userId) {
    try {
      // 1) Get the user profile
      const profileRes = await axios.post(
        "https://accounts.clikkle.com:5000/api/auth/get_user_profile",
        { id: userId }
      );
      const profileData = profileRes.data;
      if (!profileData?.user) {
        throw new Error("No user returned from profile API");
      }

      // Save profile to localStorage
      localStorage.setItem("user", JSON.stringify(profileData.user));

      setCookie("userId", profileData.user._id);
      setCookie("fullName", profileData.user.username);
      setCookie("role", profileData.user.role);
      showMessage({ success: "Login successful!" });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // useSetUser(profileData.user);

      // 4) Redirect to /ListOrganization
      navigate("/ListOrganization");
    } catch (err) {
      console.error("Error in handleUserLoginById:", err);
      // handle errors (e.g. show notification)
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) setEmail(value);
  };
  const { userId, loadinggg, user: userProfile } = useFirstVisitRedirect();

  useEffect(() => {
    if (userIdFromParam) {
      HandleUserLoginById(userIdFromParam);
      // window.location.href = "/"; // Redirect to home page
    }
  }, [userIdFromParam]);
  if (loadinggg) {
    return <Loading />;
  }
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleAction = async () => {
    setLoading(true);
    setErrors({});
    try {
      if (step === 1) {
        // Step 1: Check if email exists
        const res = await api.post(`/exist`, { email });
        if (res.data.success && res.data.exist) {
          setStep(2);
        } else {
          setErrors({ email: "Email not found" });
        }
      } else {
        // Step 2: Login with password
        const res = await api.post(`/login`, {
          email,
          password,
        });

        if (res.data.success) {
          const responseData = res.data;
          localStorage.setItem("user", JSON.stringify(responseData.user));
          
          if (responseData.accessToken) {
            localStorage.setItem("token", responseData.accessToken);
            setCookie("accessToken", responseData.accessToken);
          }
          
          setCookie("userId", responseData.user._id);
          setCookie("fullName", responseData.user.username);
          setCookie("role", responseData.user.role);
          showMessage({ success: "Login successful!" });
          responseData.sourceUrl = window.location.origin;
          const json = JSON.stringify(responseData);
          const encoded = btoa(json);
          console.log(responseData, "responseData");
          const target = new URL("https://accounts.clikkle.com/other-apps/");
          target.searchParams.set("user", encoded);
          // setTimeout(function() {
          navigate("/ListOrganization");
          // }, 5000);
        } else {
          const message = res.data.message || "Invalid login credentials.";
          setErrors({ password: message });
          showMessage({ error: message });
        }
      }
    } catch (error) {
      console.error("Action error:", error);
      const msg = error.response?.data?.message || "An error occurred. Please try again.";
      setErrors({ [step === 1 ? 'email' : 'password']: msg });
      showMessage({ error: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const { mode } = useTheme();

  const isDarkMode = mode === "dark";

  const [loadding, setLoadding] = useState(false);

  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadding(true);
    setLoading(true);
    setError("");

    try {
      let result;
      let providerName;

      if (provider === "google") {
        result = await signInWithPopup(auth, googleProvider);
        providerName = "google";
      } else if (provider === "facebook") {
        result = await signInWithPopup(auth, facebookProvider);
        providerName = "facebook";
      } else {
        throw new Error("Invalid provider");
      }

      const idToken = await result.user.getIdToken();

      const response = await fetch(`${ACCOUNTS_API_URL}/auth/socialLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          provider: providerName,
          login_app: "Clikkle Campaigns",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Social login failed");
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("sessionToken", data.sessionToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTokens({
          token: data.token,
          refreshToken: data.refreshToken,
          sessionToken: data.sessionToken,
        });
        setUser(data.user);
        showMessage({ success: "Login successful!" });
        data.sourceUrl = window.location.origin;
        const json = JSON.stringify(data);
        const encoded = btoa(json);
        const target = new URL("https://accounts.clikkle.com/other-apps/");
        target.searchParams.set("user", encoded);
        navigate("/ListOrganization");
        // console.log("Login successful:", data.user);
      }
    } catch (error) {
      console.error("Social login error:", error);
      setError(error.message || "An error occurred during login");
      showMessage({ error: error.message });

      try {
        await signOut(auth);
      } catch (signOutError) {
        console.error("Sign out error:", signOutError);
      }
    } finally {
      setLoadding(false);
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      // bgcolor="background.default"       // ← use theme background
    >
      <Box
        // bgcolor="background.paper"      // ← paper surface
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        maxWidth={400}
        px={3}
        py={4}
      >
        <Box mb={1}>
          <Link href="https://clikkle.com/campaigns">
            <img
              alt="Clikkle logo"
              style={{ height: "40px" }}
              src={
                isDarkMode
                  ? "https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20White%20Text).png"
                  : "https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20Black%20Text).png"
              }
            />
          </Link>
        </Box>
        <Typography
          variant="body1"
          // color="text.secondary"
          textAlign="center"
          sx={{ mb: 2 }} 
        >
          Sign in to continue to your dashboard and access all features.
        </Typography>
        <div className="flex flex-col gap-4 w-full">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loadding}
            className={`w-full flex items-center justify-center py-2 md:py-3 px-3 md:px-4 border rounded-full shadow-sm text-sm md:text-sm font-medium transition duration-150 ease-in-out
    border-gray-300 dark:border-gray-600 
    text-gray-700 dark:text-gray-200 
    hover:bg-gray-50 dark:hover:bg-gray-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
          >
            <FcGoogle className="h-4 w-4 md:h-5 md:w-5 mr-4" />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            disabled={loadding}
            className={`w-full flex items-center justify-center py-2 md:py-3 px-3 md:px-4 border rounded-full shadow-sm text-sm md:text-sm font-medium transition duration-150 ease-in-out
    border-gray-300 dark:border-gray-600 
    text-gray-700 dark:text-gray-200 
    hover:bg-gray-50 dark:hover:bg-gray-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
          >
            <FacebookTwoTone className="h-4 w-4 md:h-5 md:w-5 mr-4 text-[#3b5998] dark:text-[#1877f2]" />
            Continue with Facebook
          </button>
        </div>

        <div className="my-4 flex items-center w-full">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="flex-shrink mx-3 md:mx-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        {step === 1 ? (
          <>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              Use your Clikkle account
            </Typography>
          </>
        ) : (
          <Typography
            variant="h6"
            fontWeight="medium"
            sx={{
              px: 2,
              pb: 1.5,
              borderRadius: "6px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {email}@clikkmail.com
          </Typography>
        )}

        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {step === 1
            ? "Step 1 of 2: Enter your email"
            : "Step 2 of 2: Enter your password"}
        </Typography>

        {step === 1 && (
          <TextField
            size="small"
            fullWidth
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2">@clikkmail.com</Typography>
                </InputAdornment>
              ),
            }}
          />
        )}

        {step === 2 && (
          <>
            <TextField
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText sx={{ mb: 2, fontSize: "0.9rem" }}>
              Password must be at least 6 characters long and should not include
              &lt;, &gt;, or spaces.
            </FormHelperText>
            <Box width="100%" textAlign="right" mb={2}>
              <Link
                href="https://accounts.clikkle.com/account-recovery-forgot-password"
                underline="hover"
                variant="body2"
                target="_blank"
                sx={{ fontWeight: "bold" }}
              >
                Forgot password?
              </Link>
            </Box>
          </>
        )}

        <Button
          variant="contained" // ← this uses theme.palette.primary
          color="primary"
          fullWidth
          sx={{ mt: 1, py: 1.2, bgcolor: "#006AFF" }}
          onClick={handleAction}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : step === 1 ? (
            "Next"
          ) : (
            "Login"
          )}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <Link component={RouterLink} to="/register" underline="hover">
            Sign up
          </Link>
        </Typography>

        {SnackBar}
      </Box>
    </Box>
  );
};

export default Login;
