/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import { Button } from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../styles/theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FacebookTwoTone } from "@mui/icons-material";
import Loading from "../components/Loading";
import axios from "axios";

import { setCookie } from "../utilities/cookies";
import { useFirstVisitRedirect } from "../services/userFirstRedirect";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
} from "../utilities/firebase.config";

const API_BASE_URL = "https://accounts.clikkle.com:5000/api";

const SignupTrial = () => {
  const [formData, setFormData] = useState({
    gender: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    password: "",
    recoveryEmail: "",
    fullName: "",
    emailAddress: "",
  });

  const [plan, setPlan] = useState(null);
  const [cycle, setCycle] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const cycleParam = params.get("cycle");

    if (planParam) setPlan(planParam);
    if (cycleParam) setCycle(cycleParam);
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (messageObj) => {
    if (messageObj.error) {
      setSnackbar({ open: true, message: messageObj.error, severity: "error" });
    } else if (messageObj.success) {
      setSnackbar({
        open: true,
        message: messageObj.success,
        severity: "success",
      });
    } else {
      setSnackbar({ open: true, message: messageObj, severity: "info" });
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const [formErrors, setFormErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendCountdown, setResendCountdown] = useState(30);
  const [otpConfirmed, setOtpConfirmed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const { mode } = useTheme();
  console.log(mode);

  const formRef = useRef(null);
  const modalRef = useRef(null);
  const firstInvalidFieldRef = useRef(null);
  const slidesRef = useRef(null);
  const intervalRef = useRef(null);
  const otpInputRefs = useRef([]);
  const initialEmail = JSON.parse(localStorage.getItem("userData"))?.email || "";
  const [username, setUsername] = useState(
    initialEmail.includes("@") ? initialEmail.split("@")[0] : initialEmail
  );
  const [userclikkmail, setUserclikkmail] = useState(initialEmail);  
  const slides = [
    <section className="text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-4 text-gray-900 dark:text-gray-100">
          <h3 className="text-lg font-semibold">Reach the Right Audience</h3>
          <p className="text-base italic  max-w-[450px] mx-auto">
            "Clikkle Campaigns helped us deliver targeted emails that boosted
            our open rates and conversions. It’s simple but powerful."
          </p>

          <div className="flex items-center justify-center space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/28.jpg"
              alt="Michael Green"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <div className="text-left">
              <p className="text-sm font-semibold">Michael Green</p>
              <p className="text-xs">Marketing Director at GrowthHive</p>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 w-2/3 mx-auto"></div>
        <div className="text-center space-y-4 text-gray-900 dark:text-gray-100">
          <h3 className="text-lg font-semibold">Easy to Use, Easy to Scale</h3>
          <p className="text-base italic max-w-[450px] mx-auto">
            "With Clikkle Campaigns, launching email campaigns takes minutes.
            The automation saves us hours every week."
          </p>

          <div className="flex items-center justify-center space-x-2">
            <img
              src="https://randomuser.me/api/portraits/women/39.jpg"
              alt="Emily Davis"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <div className="text-left">
              <p className="text-sm font-semibold">Emily Davis</p>
              <p className="text-xs">Founder at Startup Studio</p>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </section>,
    <div className="flex flex-col items-center text-center p-8">
      <img
        src={
          "https://cdn.clikkle.com/images/campaigns/illustration/campaigns2.png"
        }
        alt="clikkle campaigns dashboard"
        className="w-auto h-full relative md:max-h-[420px] max-h-[350px]"
      />
      <h2 className="text-2xl md:text-3xl font-bold my-4 text-gray-900 dark:text-gray-100">
        Create Campaigns in Minutes
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Design beautiful, mobile-ready campaigns with drag-and-drop simplicity.
        No coding required — just create, send, and grow.
      </p>
    </div>,
    <div className="flex flex-col items-center text-center p-8">
      <img
        src={
          "https://cdn.clikkle.com/images/campaigns/illustration/campaigns3.png"
        }
        alt="clikkle campaigns analytics"
        className="w-auto h-full relative md:max-h-[420px] max-h-[350px]"
      />
      <h2 className="text-2xl md:text-3xl font-bold my-4 text-gray-900 dark:text-gray-100">
        Automate & Measure Your Success
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Schedule emails, trigger personalized follow-ups, and track results with
        real-time analytics — all in one place.
      </p>
    </div>,
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option
          key={i}
          value={i}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {i}
        </option>
      );
    }
    return options;
  };

  const checkPasswordStrength = (password) => {
    let strength = "weak";
    if (password.length >= 8) {
      if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
      ) {
        strength = "strong";
      } else if (password.length >= 8) {
        strength = "ok";
      }
    }
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep1 = () => {
    const errors = {};
    let firstInvalidField = null;

    if (!formData.fullName) {
      errors.fullName = "Full name is required.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("fullName");
    } else if (formData.fullName.trim().split(/\s+/).length < 2) {
      errors.fullName = "Please enter both first and last name.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("fullName");
    }

    if (!formData.emailAddress) {
      errors.emailAddress = "Email address is required.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("emailAddress");
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = "Email address is invalid.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("emailAddress");
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("password");
    }

    setFormErrors(errors);
    if (firstInvalidField) {
      firstInvalidFieldRef.current = firstInvalidField;
      firstInvalidFieldRef.current.focus();
    }

    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    let firstInvalidField = null;

    if (!formData.recoveryEmail) {
      errors.recoveryEmail = "Recovery email is required.";
      if (!firstInvalidField)
        firstInvalidField =
          formRef.current?.elements.namedItem("recoveryEmail");
    } else if (!/\S+@\S+\.\S+/.test(formData.recoveryEmail)) {
      errors.recoveryEmail = "Email address is invalid.";
      if (!firstInvalidField)
        firstInvalidField =
          formRef.current?.elements.namedItem("recoveryEmail");
    }
    if (!formData.dobMonth || !formData.dobDay || !formData.dobYear) {
      errors.dob = "Date of birth is required.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("dobMonth");
    }
    if (!formData.gender) {
      errors.gender = "Gender is required.";
      if (!firstInvalidField)
        firstInvalidField = formRef.current?.elements.namedItem("gender");
    }

    setFormErrors(errors);
    if (firstInvalidField) {
      firstInvalidFieldRef.current = firstInvalidField;
      firstInvalidFieldRef.current.focus();
    }

    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (validateStep1()) {
      try {
        setIsSubmitting(true);
        const existingData = JSON.parse(localStorage.getItem("userData")) || {};

        const randomDay = Math.floor(Math.random() * 28) + 1;
        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const randomYear = Math.floor(Math.random() * (2004 - 1950 + 1)) + 1950;

        const updatedData = {
          ...existingData,
          firstName: formData.fullName.split(" ")[0].trim(),
          lastName:
            formData.fullName.split(" ").slice(1).join(" ").trim() || "",
          phoneNumber: "",
          day: randomDay,
          month: randomMonth,
          year: randomYear,
          emailAddress: formData.emailAddress,
          password: formData.password,
        };

        localStorage.setItem("userData", JSON.stringify(updatedData));

        const formDataObj = new FormData();
        formDataObj.append("firstName", updatedData.firstName);
        formDataObj.append("lastName", updatedData.lastName);
        formDataObj.append("day", updatedData.day);
        formDataObj.append("month", updatedData.month);
        formDataObj.append("year", updatedData.year);

        const response = await fetch(
          "https://accounts.clikkle.com:5000/api/auth/suggest_name",
          {
            method: "POST",
            body: formDataObj,
          }
        );

        const responseData = await response.json();

        if (responseData.success) {
          const finalData = {
            ...updatedData,
            email: responseData.data[0] + "@clikkmail.com",
          };

          localStorage.setItem("userData", JSON.stringify(finalData));
          setFormData((prevData) => ({
            ...prevData,
            recoveryEmail: prevData.emailAddress,
          }));
          setCurrentStep(2);
        } else {
          const finalData = {
            ...updatedData,
            email: formData.emailAddress,
          };
          localStorage.setItem("userData", JSON.stringify(finalData));
          setFormData((prevData) => ({
            ...prevData,
            recoveryEmail: prevData.emailAddress,
          }));
          setCurrentStep(2);
        }
      } catch (error) {
        console.error("Error:", error);
        setCurrentStep(2);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsSubmitting(true);

      try {
        const existingData = JSON.parse(localStorage.getItem("userData")) || {};
        const updatedData = {
          ...existingData,
          gender: formData.gender,
          dobDay: formData.dobDay,
                    email: userclikkmail, // Use the updated userclikkmail

          dobMonth: formData.dobMonth,
          dobYear: formData.dobYear,
          recoveryEmail: formData.recoveryEmail || formData.emailAddress,
        };
        localStorage.setItem("userData", JSON.stringify(updatedData));

        const {
          firstName,
          lastName,
          phoneNumber = "",
          email,
          password,
          day,
          month,
          year,
          recoveryEmail = formData.emailAddress,
        } = updatedData;

        const dob = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        const username = email?.split("@")[0] || "";
        const gender = formData.gender.toLowerCase();
        const referred_by = localStorage.getItem("referrer") || "onWebsite";

        const body = {
          recoveryEmail: recoveryEmail,
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          gender,
          dob,
          username,
          referred_by,
          accountType: "personal",
        };

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
          localStorage.setItem(
            "credentials",
            JSON.stringify({
              recoveryEmail: recoveryEmail,
              email: email,
            })
          );

          setShowModal(true);
          setResendCountdown(30);
        } else {
          console.error("Registration failed:", resData.error);
          showMessage({
            error: resData.error || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        showMessage({ error: "Network error. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (showModal && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showModal, resendCountdown]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setOtpConfirmed(false);
        setOtp("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const trapFocus = () => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modalRef.current.addEventListener("keydown", (e) => {
          const isTabPressed = e.key === "Tab";
          if (!isTabPressed) return;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        });
      }
    };

    if (showModal) {
      trapFocus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const handleOtpChange = (element, index) => {
    if (isNaN(Number(element.value))) return;

    setOtp((prevOtp) => {
      const otpString = typeof prevOtp === "string" ? prevOtp : "";
      return (
        otpString.substring(0, index) +
        element.value +
        otpString.substring(index + 1)
      );
    });

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleOtpKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !e.currentTarget.value &&
      e.currentTarget.previousSibling
    ) {
      e.currentTarget.previousSibling.focus();
    }
  };

  const handleConfirmOtp = async () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      showMessage({ error: "Please enter a valid 6-digit code" });
      return;
    }

    try {
      setIsSubmitting(true);
      const credentials = JSON.parse(localStorage.getItem("credentials")) || {};

      const response = await fetch(
        "https://accounts.clikkle.com:5000/api/auth/register_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loginCode: otp,
            recoveryEmail: credentials.recoveryEmail || credentials.email,
          }),
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        setOtpConfirmed(true);
        setTimeout(() => {
          setShowModal(false);
          setOtpConfirmed(false);
          setOtp("");
          window.location.href = `/register/trialactivate?plan=${plan}&cycle=${cycle}`;
        }, 1500);
      } else {
        showMessage({ error: result.error || "Invalid or expired OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showMessage({ error: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  const isDarkMode = mode === "dark";
  console.log("isDarkMode");
  console.log(isDarkMode);

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
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900 ">
      <div className="w-full mx-auto flex flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-900 h-full">
        <div className="w-full md:w-[45%] p-8 md:p-6 flex justify-center items-center flex-col h-full relative">
          {" "}
          <div className="flex justify-between items-center mb-10 w-full absolute top-8 z-5 px-8   ">
            <div className="flex items-center space-x-2 justify-between w-full">
              <span>
                <Link to={"https://clikkle.com/campaigns"}>
                  <img
                    src={
                      isDarkMode
                        ? "https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20White%20Text).png"
                        : "https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20Black%20Text).png"
                    }
                    alt="Clikkle campaigns Logo"
                    className="w-[100px] md:w-[100px]"
                  />
                </Link>
              </span>
              <span className="gap-2 flex justify-center items-center">
                <span className="text-xs md:text-sm text-gray-400 dark:text-gray-300">
                  Have an account?
                </span>
                <Link to={"/login"}>
                  <Button
                    variant="ghost"
                    className="text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-1 h-[24px] md:h-[32px]"
                  >
                    <span className="text-xs md:text-md">Sign In</span>
                  </Button>
                </Link>
              </span>
            </div>
          </div>
          <div className="flex space-x-2 mb-8 mt-4 justify-center">
            <div
              className={`flex items-center p-2 md:p-3 gap-3 py-1.5 md:py-2 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm transition-colors duration-200`}
            >
              <span className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                1
              </span>
              <span className="font-semibold text-xs md:text-sm">
                Create an account
              </span>
            </div>

            <div
              className={`cursor-not-allowed flex items-center p-2 md:p-3 gap-3 py-1.5 md:py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 shadow-inner transition-colors duration-200`}
            >
              <span className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-gray-500 text-white text-xs  font-bold">
                2
              </span>
              <span className="font-semibold text-xs md:text-sm">
                Activate your trial
              </span>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 md:w-96 mx-auto text-center">
            Create a new account
          </h1>
          <div className="flex flex-col gap-4 w-full mt-4 md:w-96 mx-auto">
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
          <div className="my-4 flex items-center w-full md:w-96 mx-auto">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-3 md:mx-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div
            className={`transition-all duration-500 ease-in-out w-full md:w-96 mx-auto ${
              currentStep === 1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full absolute"
            }`}
          >
            <form
              onSubmit={handleStep1Submit}
              noValidate
              className="w-full md:w-96 mx-auto"
            >
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="fullName"
                  className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`mt-1 block border border-gray-300 dark:border-gray-600 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                    formErrors.fullName ? "border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.fullName && (
                  <p className="mt-2 text-xs md:text-sm text-red-500">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="emailAddress"
                  className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={`mt-1 block border border-gray-300 dark:border-gray-600 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                    formErrors.emailAddress ? "border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.emailAddress && (
                  <p className="mt-2 text-xs md:text-sm text-red-500">
                    {formErrors.emailAddress}
                  </p>
                )}
              </div>

              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="password"
                  className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className={`block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                      formErrors.password ? "border-red-500" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center text-gray-500 dark:text-gray-400"
                  >
                    {isPasswordVisible ? (
                      <FiEye className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <FiEyeOff className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mb-3 md:mb-4 mt-2">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols.
                </p>

                {formErrors.password && (
                  <p className="mt-2 text-xs md:text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
                {formData.password && (
                  <div className="mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    <span
                      className={`inline-block w-full h-1 rounded-full ${
                        passwordStrength === "strong"
                          ? "bg-green-500"
                          : passwordStrength === "ok"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="ml-2 capitalize">{passwordStrength}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 md:py-3 px-3 md:px-4 border border-transparent rounded-full shadow-sm text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Create account"}
              </button>
            </form>
          </div>
          <div
            className={`transition-all duration-500 w-full ease-in-out ${
              currentStep === 2
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full absolute"
            }`}
          >
            <form
              onSubmit={handleStep2Submit}
              noValidate
              className="w-full md:w-96 mx-auto"
            >
              <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                      formErrors.gender ? "border-red-500" : ""
                    }`}
                    required
                  >
                    <option
                      value=""
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      Select Gender
                    </option>
                    <option
                      value="Male"
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      Female
                    </option>
                    <option
                      value="Other"
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      Other
                    </option>
                  </select>
                  {formErrors.gender && (
                    <p className="mt-2 text-xs md:text-sm text-red-500">
                      {formErrors.gender}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of birth
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <select
                      id="dobMonth"
                      name="dobMonth"
                      value={formData.dobMonth}
                      onChange={handleChange}
                      className={`block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                        formErrors.dob ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option
                        value=""
                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                      >
                        Month
                      </option>
                      {generateOptions(1, 12)}
                    </select>
                    <select
                      id="dobDay"
                      name="dobDay"
                      value={formData.dobDay}
                      onChange={handleChange}
                      className={`block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                        formErrors.dob ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option
                        value=""
                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                      >
                        Day
                      </option>
                      {generateOptions(1, 31)}
                    </select>
                    <select
                      id="dobYear"
                      name="dobYear"
                      value={formData.dobYear}
                      onChange={handleChange}
                      className={`block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base p-2 md:p-3 dark:bg-gray-800 dark:text-gray-200 transition duration-150 ease-in-out ${
                        formErrors.dob ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option
                        value=""
                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                      >
                        Year
                      </option>
                      {generateOptions(
                        new Date().getFullYear() - 100,
                        new Date().getFullYear() - 16
                      )}
                    </select>
                  </div>
                  {formErrors.dob && (
                    <p className="mt-2 text-xs md:text-sm text-red-500">
                      {formErrors.dob}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="recoveryEmail"
                  className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your clikkmail address
                </label>
<div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        const newUsername = e.target.value;
                        setUsername(newUsername);
                        setUserclikkmail(`${newUsername}@clikkmail.com`);
                      }}
                      className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm 
    focus:ring-blue-500 focus:border-blue-500 
    text-sm md:text-base p-2 md:p-3 pr-32
    dark:bg-gray-800 dark:text-gray-200 
    transition duration-150 ease-in-out`}
                      placeholder="username"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm md:text-base pointer-events-none">
                      @clikkmail.com
                    </span>
                  </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-1 md:py-2 px-3 md:px-4 border flex flex-row justify-center items-center gap-1 md:gap-2 border-gray-300 dark:border-gray-600 rounded-full shadow-sm text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <FiArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <button
                  type="submit"
                  className="py-2 md:py-3 px-4 md:px-6 border border-transparent rounded-full shadow-sm text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Send OTP to Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="relative hidden md:flex md:w-[55%] bg-gray-50 dark:bg-gray-800 rounded-tl-3xl rounded-bl-3xl">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-950 opacity-50 rounded-tl-3xl rounded-bl-3xl" />
          </div>
          <div
            ref={slidesRef}
            className="relative z-10 w-full h-screen flex items-center justify-center"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-1000 ease-in-out w-full h-screen flex items-center justify-center
          ${
            index === activeSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-80 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
              ref={modalRef}
            >
              <div className="bg-white dark:bg-gray-800 px-3 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-2 md:mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg md:text-2xl leading-6 font-bold text-gray-900 dark:text-gray-100"
                      id="modal-title"
                    >
                      The OTP has been sent to your email.
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Kindly check your email and enter it here.
                    </p>
                    <div className="mt-4 md:mt-5">
                      <div className="flex justify-center space-x-1 md:space-x-2">
                        {[...Array(6)].map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otp[index] || ""}
                            onChange={(e) => handleOtpChange(e.target, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            onPaste={(e) => {
                              e.preventDefault();
                              const pasted = e.clipboardData
                                .getData("text")
                                .trim();
                              if (!/^\d+$/.test(pasted)) return;
                              const otpArray = pasted.split("").slice(0, 6);
                              setOtp(otpArray.join(""));
                              otpArray.forEach((digit, i) => {
                                if (otpInputRefs.current[i]) {
                                  otpInputRefs.current[i].value = digit;
                                }
                              });
                            }}
                            className="w-8 h-10 md:w-10 md:h-12 text-center text-lg md:text-xl font-mono rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition-colors duration-200"
                            required
                            aria-label={`OTP digit ${index + 1}`}
                            ref={(el) => {
                              if (el) otpInputRefs.current[index] = el;
                            }}
                          />
                        ))}
                      </div>
                      {otpConfirmed && (
                        <p className="mt-3 md:mt-4 text-xs md:text-sm font-medium text-green-500 text-center">
                          OTP confirmed successfully!
                        </p>
                      )}
                      <div className="mt-3 md:mt-4 text-center">
                        <button
                          type="button"
                          className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
                          disabled={resendCountdown > 0}
                          onClick={() => setResendCountdown(30)}
                        >
                          Resend OTP{" "}
                          {resendCountdown > 0 ? `(${resendCountdown}s)` : ""}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-3 md:px-6 py-2 md:py-3 sm:flex sm:flex-row-reverse sm:space-x-4 sm:space-x-reverse">
                <button
                  type="button"
                  className="mt-2 md:mt-3 w-full inline-flex items-center justify-center rounded-full border border-transparent shadow-sm px-3 md:px-4 py-2 md:py-3 bg-blue-600 text-sm md:text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleConfirmOtp}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm"}
                </button>

                <button
                  type="button"
                  className="mt-2 md:mt-3 w-full inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm px-3 md:px-4 py-2 md:py-3 bg-white dark:bg-gray-800 text-sm md:text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    setShowModal(false);
                    setOtpConfirmed(false);
                    setOtp("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SignupTrial;
