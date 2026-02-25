import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
 
const documentSubTabs = [
  
              {
                  label: 'Dashboard',
                  // icon: <DashboardOutlined fontSize='small' />,
                  to: '/contacts/dashboard',
              },
              {
                  label: 'All Contacts',
                  // icon: <ContactMailOutlined fontSize='small' />,
                  to: '/contacts/all',
              },
              {
                  label: 'Signup Forms',
                  // icon: <LinkSharp fontSize='small' />,
                  to: '/contacts/signup-forms',
              },
              {
                  label: 'Tags',
                  // icon: <LocalOfferOutlined fontSize='small' />,
                  to: '/contacts/tags',
              },
              {
                  label: 'Segments',
                  // icon: <LinkSharp fontSize='small' />,
                  to: '/contacts/segments',
              },
              {
                  label: 'Import ',
                  // icon: <ImportContacts fontSize='small' />,
                  to: '/contacts/import',
              },
];

const templatesSubTabs = [  {
                label: 'All Campaigns',
                // icon: <DashboardOutlined fontSize='small' />,
                to: '/campaigns/all',
            },
            {
                label: 'Email Templates',
                // icon: <ContactMailOutlined fontSize='small' />,
                to: '/campaigns/templates',
            },
];

const signSubTabs = [
  { label: "Dashboard", to: "/" },
  // { label: "Overview", to: "/sign/overview" },
];


const automationSubTabs = [
  { label: "Automation", to: "/automation" },
  // { label: "Overview", to: "/sign/overview" },
];

export default function TopNavigation() {
  const { pathname } = useLocation();

  const [showDocumentsTabs, setShowDocumentsTabs] = useState(false);
  const [showTemplatesTabs, setShowTemplatesTabs] = useState(false);
  const [showSignTabs, setShowSignTabs] = useState(false);
  const [automationSubTabs, setAutomationSubTabs] = useState(false);

  useEffect(() => {
    setShowDocumentsTabs(pathname?.startsWith("/contacts"));
    setShowTemplatesTabs(pathname?.startsWith("/campaigns"));
    setShowSignTabs(
      pathname === "/" ||
      // pathname?.startsWith("/overview") ||
      pathname?.startsWith("/otherSigner") ||
      pathname?.startsWith("/sign")
    );
    setAutomationSubTabs(pathname?.startsWith("/automation"))
  }, [pathname]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      {showDocumentsTabs && (
        <Tabs
          value={pathname}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              minWidth: "unset",
              px: { xs: 1, sm: 2 },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        >
          {documentSubTabs.map((sub) => (
            <Tab
              key={sub.to}
              label={sub.label}
              value={sub.to}
              component={NavLink}
              to={sub.to}
              disableRipple
            />
          ))}
        </Tabs>
      )}

      {showTemplatesTabs && (
        <Tabs
          value={pathname}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              minWidth: "unset",
              px: { xs: 1, sm: 2 },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        >
          {templatesSubTabs.map((sub) => (
            <Tab
              key={sub.to}
              label={sub.label}
              value={sub.to}
              component={NavLink}
              to={sub.to}
              disableRipple
            />
          ))}
        </Tabs>
      )}

      {showSignTabs && (
        <Tabs
          value={pathname}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              minWidth: "unset",
              px: { xs: 1, sm: 2 },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        >
          {signSubTabs.map((sub) => (
            <Tab
              key={sub.to}
              label={sub.label}
              value={sub.to}
              component={NavLink}
              to={sub.to}
              disableRipple
            />
          ))}
        </Tabs>
      )}

      
      {automationSubTabs && (
        <Tabs
          value={pathname}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              minWidth: "unset",
              px: { xs: 1, sm: 2 },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        >
          {/* {automationSubTabs?.map((sub) => (
            <Tab
              key={sub.to}
              label={sub.label}
              value={sub.to}
              component={NavLink}
              to={sub.to}
              disableRipple
            />
          ))} */}
        </Tabs>
      )}

    </Box>
  );
}
