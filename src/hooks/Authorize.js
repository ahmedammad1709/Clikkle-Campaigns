import React, { createContext, useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { getCookie } from '../utilities/cookies';
import { env, handleAxiosError } from '../utilities/function';

// import Setup from '../components/Setup';
import { useMessage } from '../components/Header';
import { setCookie } from "../utilities/cookies";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const authorizeContext = createContext();

const authServer = axios.create({
    baseURL: env('AUTHENTICATION_SERVER'),
});

const accessToken = getCookie('accessToken');
authServer.defaults.withCredentials = false;
authServer.defaults.headers.Authorization = `Bearer ${accessToken}`;

const AuthorizationProvider = ({ children }) => {
    const [content, setContent] = useState(<Loading message='Please wait, logging you in...' />);
    const [user, setUser] = useState({});
    const { showError } = useMessage();
  const navigate = useNavigate();

    const authorize = async (loggedIn, cb) => {
        if (loggedIn) { 
          setContent(children);
        } else {
            const redirectTo = "/register"
            setContent(
                <Loading
                    message='Please wait, redirecting you to Register page...'
                    redirectTo={redirectTo}
                />
            );
        }
        if (typeof cb === 'function') cb(setUser);
    };
    const createSession = async (refreshToken, user) => {
        // try {
        //   const response = await axios.post(`/open/session`, {
        //     refreshToken,
        //     userId: user._id,
        //     userType: "hr",
        //   });
        //   let data = response.data;
        //   if (data.success) {
        //     setCookie("accessToken", data.token);
           
        //     authorize(true, (setUser) => setUser(user));
        //   } else {

        //     authorize(true, (setUser) => setUser(user));

        //     //  setTimeout(() => {
        //     //   signOut();
        //     // }, [6000]);
        //   }
        // } catch (e) {
          
          authorize(true, (setUser) => setUser(user));
          // navigate("/ListOrganization");
        //  setTimeout(() => {
        //    signOut();
        //    }, [6000]);
        // }
      };
      // const signOut = () => {
      //   clearCookie("accessToken");
      //   localStorage.removeItem("user");
      //   const redirectTo =
      //     env("AUTHENTICATION_CLIENT") +
      //     "/logout?redirectto=" +
      //     encodeURIComponent(env("DOMAIN")) +
      //     "&&referrer=" +
      //     encodeURIComponent(env("DOMAIN"));
    
      //   setContent(
      //     <Loading
      //       message="Some thing went worng please try again some time later"
      //       redirectTo={redirectTo}
      //     />
      //   );
      // };

    useEffect(() => {
        (async () => {
            try {
                // const role = getCookie('role');
                // if (!role) throw new Error('role not found');
                // const response = await authServer.get(`/${role}/profile`);
                // const user = response.data.user;

                // authorize(true, setUser => setUser(user));
                const queryParameters = new URLSearchParams(window.location.search);
                const userId = queryParameters.get("userId");
                const refreshToken = queryParameters.get("refreshToken");
                if (userId) {
                    var formData = new FormData();
                    formData.append("id", userId);
                    const response = await fetch(
                      "https://accounts.clikkle.com:5000/api/auth/get_user_profile",
                     
                      {
                        method: "POST",
                        body: formData,
                      }
                    );
          
                    if (response.ok) {
                      console.log("user found ...");
                      const responseData = await response.json();
                      let { user } = responseData;
                      user.refreshToken = refreshToken;
                      console.log(user);
                      localStorage.setItem("user", JSON.stringify(user));
                      await createSession(refreshToken, user);
                      navigate("/ListOrganization");

                      // authorize(true, (setUser) => setUser(user));
                    } else {
                      console.log("user not found");
                    }
                  } else if (localStorage.getItem("user")) {
                    let user = JSON.parse(localStorage.getItem("user"));
                    await createSession(user.refreshToken, user);
                  } else {
                    authorize(false);
                  }
            } catch (err) {
                console.log(err);
                handleAxiosError(err, showError);
                authorize(false);
            }
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <authorizeContext.Provider value={{ authorize, setUser, user, setContent }}>
            {content}
        </authorizeContext.Provider>
    );
};

const useAuthorize = () => useContext(authorizeContext).authorize;
const useUser = () => useContext(authorizeContext)?.user;
const useSetUser = () => useContext(authorizeContext).setUser;
const useSetContent = () => useContext(authorizeContext).setContent;

export default AuthorizationProvider;
export { useAuthorize, useUser, useSetUser, useSetContent };