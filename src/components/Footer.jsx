import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "../styles/theme";
import { BsGrid3X3GapFill } from "react-icons/bs";

import {
  DashboardOutlined,
  PeopleOutlined,
  Autorenew,
} from "@mui/icons-material";
import { MdCampaign } from "react-icons/md";

const Footer = () => {
  const theme = useTheme();
  const [activeIcon, setActiveIcon] = useState("");

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName === activeIcon ? null : iconName);
  };

  const Apps = ({ active }) => (
    <BsGrid3X3GapFill
      size={20}
      //   style={{
      //     filter: active
      //       ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1548%) hue-rotate(187deg) brightness(101%) contrast(101%)"
      //       : "none",
      //   }}
    />
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.mode === "dark" ? "#141414" : "#FFFFFF",
        color: theme.mode === "dark" ? "#FFFFFF" : "#000000",
        height: "82px",
      }}
      className="fixed bottom-0 text-gray-500 w-full text-[10px] px-2 flex flex-row gap-4 items-center justify-between md:hidden right-0 left-0 z-[100]"
    >
      <NavLink to="/">
        {({ isActive }) => (
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => handleIconClick("sign")}
          >
            <div
              style={{
                color: isActive ? "#fff" : "",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`p-1 rounded-xl ${
                theme.mode === "dark" ? "bg-[#181818]" : "bg-neutral-200"
              }`}
            >
              <DashboardOutlined
                fontSize="small"
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1548%) hue-rotate(187deg) brightness(101%) contrast(101%)"
                    : "none",
                }}
              />
            </div>
            <p className={`${isActive && "text-[#0080ff]"} text-[10px]`}>
              Dashboard
            </p>
          </div>
        )}
      </NavLink>

      <NavLink to="/contacts/dashboard">
        {({ isActive }) => (
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => handleIconClick("overview")}
          >
            <div
              style={{
                color: isActive ? "#fff" : "",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`p-1 rounded-xl ${
                theme.mode === "dark" ? "bg-[#181818]" : "bg-neutral-200"
              }`}
            >
              <PeopleOutlined
                fontSize="small"
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1548%) hue-rotate(187deg) brightness(101%) contrast(101%)"
                    : "none",
                }}
              />
            </div>
            <p className={`${isActive && "text-[#0080ff]"} text-[10px]`}>
              Contacts
            </p>
          </div>
        )}
      </NavLink>

      <NavLink to="https://apps.clikkle.com/">
        {({ isActive }) => (
          <div
            className="flex flex-col items-center justify-center "
            onClick={() => handleIconClick("app")}
          >
            <div
              className={`${
                isActive &&
                "text-white rounded-3xl bg-blue-500/[.15] w-[90%] flex justify-center "
              } px-2 py-1`}
            >
              <Apps active={isActive} size={"20px"} />
            </div>
          </div>
        )}
      </NavLink>

      <NavLink to="/campaigns/all">
        {({ isActive }) => (
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => handleIconClick("document")}
          >
            <div
              style={{
                color: isActive ? "#fff" : "",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`p-1 rounded-xl ${
                theme.mode === "dark" ? "bg-[#181818]" : "bg-neutral-200"
              }`}
            >
              <MdCampaign
                fontSize="medium"
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1548%) hue-rotate(187deg) brightness(101%) contrast(101%)"
                    : "none",
                }}
              />
            </div>
            <p className={`${isActive && "text-[#0080ff]"} text-[10px]`}>
              Document
            </p>
          </div>
        )}
      </NavLink>

      <NavLink to="/automation">
        {({ isActive }) => (
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => handleIconClick("template")}
          >
            <div
              style={{
                color: isActive ? "#fff" : "",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`p-1 rounded-xl ${
                theme.mode === "dark" ? "bg-[#181818]" : "bg-neutral-200"
              }`}
            >
              <Autorenew
                fontSize="small"
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(1548%) hue-rotate(187deg) brightness(101%) contrast(101%)"
                    : "none",
                }}
              />
            </div>
            <p className={`${isActive && "text-[#0080ff]"} text-[10px]`}>
              Automation
            </p>
          </div>
        )}
      </NavLink>
    </Box>
  );
};

export default Footer;
