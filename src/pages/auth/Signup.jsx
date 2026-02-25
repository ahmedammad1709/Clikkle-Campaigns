/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Link,
  Modal,
  Backdrop,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import StepOneForm from "../../components/stepsOfOnboard/StepOneForm";
import StepTwoForm from "../../components/stepsOfOnboard/StepTwoForm";
import StepThreeForm from "../../components/stepsOfOnboard/StepThreeForm";
import useSnack from "../../hooks/useSnack";
import { useFirstVisitRedirect } from "../../services/userFirstRedirect";
import Loading from "../../components/Loading";
import { FacebookTwoTone } from "@mui/icons-material";
import axios from "axios";

import { setCookie } from "../../utilities/cookies";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
} from "../../utilities/firebase.config";

const API_BASE_URL = "https://accounts.clikkle.com:5000/api";

const CombinedOnboarding = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const { SnackBar, showMessage } = useSnack(); // Add this

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    // Make async
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      showMessage({ error: "Please enter a valid email address" }); // Add message
      return;
    }

    try {
      setLoading(true);
      setEmailError(false);
      const userData = { recovery_email: email.trim() };
      localStorage.setItem("userData", JSON.stringify(userData));
      setOpen(true);
      showMessage({ success: "Email verified successfully!" }); // Success feedback
    } catch (error) {
      showMessage({ error: "Failed to save email. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOpen(false);
      setLoading(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

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
      // If in a React component, you could do:
      //   const navigate = useNavigate();
      // window.location.href = "/"; // Redirect to home page
      // Or for a plain redirect:
      // window.location.href = "/ListOrganization";
    } catch (err) {
      console.error("Error in handleUserLoginById:", err);
      // handle errors (e.g. show notification)
    }
  }

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

      const response = await fetch(`${API_BASE_URL}/auth/socialLogin`, {
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
        window.location.href = target.toString();
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
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress />
          <Typography mt={2}>Redirecting to dashboard...</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Try Clikkle Campaigns{" "}
            <span
              style={{
                display: "inline-block",
                backgroundImage:
                  'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1412 136"><path d="M2.9 51.31c1.54 1.59 3.55 2.42 5.67 2.93 9.55 2.69 12.36 4.04 30.44 7.8-3 .3-5.73.44-8.57 3.08a9.83 9.83 0 0 0-2.07 10.92c.83 2.7 3.33 4.22 5.31 6.05 10.97 9.24 37.74 12.54 57.74 16.6 28.32 5.7 56.66 11.52 85.37 14.86 23.26 11.61 80.27 14.32 103.75 15.4 34.52 2.19 69.08 3.36 103.65 3.76 121.04 6.36 242.43.51 363.58.82 271.97-15.76 111.74-7.14 354.24-27.85 46.28-2.18 92.54-4.84 138.71-8.85 12.39-1.12 31.77-2.4 34.68-3.76 3.32-1.16 5.52-4.34 6.02-7.77 123.48-7.79 121.13-7.18 123.45-8.4 4.59-1.61 7.1-7.14 5.79-11.8a10.12 10.12 0 0 0-9.64-7.34c-46.89.01-33.59-2.78-103.06 3.46l10.94-1.87c1.99-.76 4.08-1.67 5.19-3.58 4.19-4.72 2.14-13.98-5.64-15.77-3.38-2.63-6.42-2-14.13-2.11-4.56-.7-9.13-1.34-13.72-1.81 34.64-5.34 46.49-8.03 55.99-12.31 2.43-1.11 4.63-2.64 6.94-3.97 14.45-7.01 3.34-24.98-8.18-18.36-2.71 1.43-5.2 3.25-7.94 4.62-11.02 4.17-22.83 5.68-34.36 7.85-36.51 6.23-65.21 9.47-105.27 13.24-39.97 3.44-79.94 7.17-120.01 9.1-112.89 6.65-225.89 10.72-338.92 13.94-139.42 4.28-72.29 2.74-238.74 3.83-152.12.02-105.22.84-209.3-3.14-24.84-.9-33.26-1.91-65.79-4.63-17.2-1.82-43.29-7.05-66.97-9.27-4.21-.16-8.68-1.39-12.64.37a9.33 9.33 0 0 0-5.97 7.81l-.03.26c-68.56-8.07-86.97-8.7-119.44-11.18a7.6 7.6 0 0 0-3.85.86 9.31 9.31 0 0 0-5.97 7.81c-.59 3.07.64 6.15 2.75 8.4Z" fill="%23326FF9"/></svg>\')',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom left",
                backgroundSize: "100% auto",
                paddingBottom: "0.1em",
              }}
            >
              free
            </span>{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            No credit card required
          </Typography>

          <div className="flex flex-col gap-4 w-full mt-4">
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

          <Box component="form" onSubmit={handleEmailSubmit} sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography
                  variant="body2"
                  sx={{ width: { xs: "auto", md: 500 } }}
                >
                  I agree to receive marketing communications from Clikkle
                  Campaigns and acknowledge that I can opt out at any time by
                  visiting the{" "}
                  <Link href="https://myaccount.clikkle.com/" underline="hover">
                    Preference Centre
                  </Link>
                  .
                </Typography>
              }
              sx={{ alignItems: "flex-start", mb: 2 }}
            />

            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              By clicking the Get Started, you agree to Clikkle Campaigns's{" "}
              <Link href="https://clikkle.com/privacy-policy" underline="hover">
                Privacy Notice
              </Link>{" "}
              and{" "}
              <Link
                href="https://clikkle.com/terms-of-service"
                underline="hover"
              >
                Terms & Conditions
              </Link>
              .
            </Typography>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{
                bgcolor: "#0080FF",
                fontWeight: "bold",
                py: 1.2,
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Get Started"}
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link component="button" onClick={() => navigate("/login")}>
                Log In
              </Link>
            </Typography>
          </Box>
        </>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backdropFilter: "blur(5px)" },
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {step === 1 && (
            <StepOneForm
              firstName={firstName}
              lastName={lastName}
              phone={phone}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhone={setPhone}
              handleNext={handleNext}
            />
          )}
          {step === 2 && <StepTwoForm handleNext={handleNext} />}
          {step === 3 && (
            <StepThreeForm
              email={email}
              setEmail={setEmail}
              handleNext={handleNext}
            />
          )}
          {SnackBar}
        </Box>
      </Modal>
    </Container>
  );
};

export default CombinedOnboarding;
