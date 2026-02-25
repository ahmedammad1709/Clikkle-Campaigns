import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { setCookie } from "../utilities/cookies";
import useSnack from "../hooks/useSnack";
import {useSetUser} from "../hooks/Authorize";

export const useFirstVisitRedirect = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const { SnackBar, showMessage } = useSnack();
 
  useEffect(() => {
    const params = new URLSearchParams(search);
    const urlHasUserId = params.has("userId");
    const alreadySent = sessionStorage.getItem("sentToApp2");

    if (!urlHasUserId && !alreadySent) {
      sessionStorage.setItem("sentToApp2", "true");
      const currentFullUrl = `${window.location.origin}${pathname}${search}`;
      const app2Url = `https://accounts.clikkle.com/check-user?redirect=${encodeURIComponent(
        currentFullUrl
      )}`;
      window.location.replace(app2Url);
      return;
    }

    if (urlHasUserId) {
      const id = params.get("userId");
      setUserId(id);
    }
  }, [search, pathname]);

  // useEffect(() => {
  //   const handleUserLoginById = async (userId) => {
  //     try {
  //       setLoading(true);

  //       const profileRes = await api.post(
  //         "https://accounts.clikkle.com:5000/api/auth/get_user_profile",
  //         { id: userId }
  //       );
  //       let profileData = profileRes.data
  //       setUser(profileRes.data);

  //       if (!profileData?.user) {
  //         console.log("No user returned from profile API");
  //         setLoading(false);
  //         return;
  //       }

  //       localStorage.setItem("user", JSON.stringify(profileData.user));

  //       setCookie("userId", profileData.user._id);
  //       setCookie("fullName", profileData.user.username);
  //       setCookie("role", profileData.user.role);
  //       // useSetUser(profileData.user);
  //       showMessage({ success: "Login successful!" });

  //       window.location.href = "/"; // Redirect to home page
  //     } catch (err) {
  //       console.error("Error in handleUserLoginById:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (userId) {
  //     handleUserLoginById(userId);
  //   }
  // }, [userId, navigate]);

  return { userId, loadinggg:loading,user };
};