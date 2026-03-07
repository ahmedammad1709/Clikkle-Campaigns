import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import "./utilities/axios";
import "./index.css";
import CampaignEmailBuilder from "./pages/user/Campaigns/CampaignEmailBuilder";
import ThemeContextProvider from "./styles/theme";
import Loading from "./components/Loading";
// login signup form
import LoginForm from "./pages/auth/Login";
import SignupForm from "./pages/auth/Signup";

import CreateOrganization from "./pages/organization/CreateOrganization";
import ListOrganization from "./pages/organization/ListOrganization";
import EditOrganization from "./pages/organization/EditOrganization";
import { OrganizationProvider, useOrganization } from "./hooks/useOrganization";

// Pages
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const AllContacts = lazy(() => import("./pages/user/AllContacts/AllContacts"));
const ContactsDashboard = lazy(() => import("./pages/user/ContactsDashboard"));
const ContactsImport = lazy(() => import("./pages/user/ContactsImport"));
const Tags = lazy(() => import("./pages/user/Tags/Tags"));
const Campaigns = lazy(() => import("./pages/user/Campaigns/Campaigns"));
const ViewReport = lazy(() => import("./pages/user/Campaigns/ViewReport"));
const EmailTemplates = lazy(() =>
  import("./pages/user/EmailTemplatesOld/EmailTemplates")
);
const Segments = lazy(() => import("./pages/user/Segments/Segments"));
const Automation = lazy(() => import("./pages/user/Automation"));
const AutomationReport = lazy(() =>
  import("./pages/user/Automation/AutomationReport")
);
const CreateAutomation = lazy(() =>
  import("./pages/user/Automation/CreateAutomation")
);
const AutomationBuilder = lazy(() => import("./pages/user/Automation/Builder"));
const Website = lazy(() => import("./pages/user/Website"));
const ContentStudio = lazy(() => import("./pages/user/ContentStudio"));
const Integration = lazy(() => import("./pages/user/Integration"));
const Users = lazy(() => import("./pages/admin/Users"));

const EditUser = lazy(() => import("./pages/admin/EditUser"));
const CreateSignUpForm = lazy(() =>
  import("./pages/user/SignupForm/CreateSignUpForm")
);
const SignUpForm = lazy(() => import("./pages/user/SignupForm/SignUpForm"));
const Create = lazy(() => import("./pages/user/Create"));
const UpgradePlans = lazy(() => import("./pages/user/Plans/UpgradePlans"));
const AdminEmailTemplates = lazy(() => import("./pages/admin/EmailTemplates"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ServerStatus = lazy(() => import("./pages/admin/ServerStatus"));
const AdminPlans = lazy(() => import("./pages/admin/Plans/Plans"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Queue = lazy(() => import("./pages/admin/Queue"));
const AddNewTemplate = lazy(() => import("./pages/admin/AddNewTemplate"));
const ContactEdit = lazy(() => import("./pages/user/AllContacts/ContactEdit"));
const ViewSignUpForm = lazy(() =>
  import("./pages/user/SignupForm/ViewSignUpForm")
);
const CreateCampaigns = lazy(() =>
  import("./pages/user/Campaigns/CreateCampaigns")
);
const Builder = lazy(() => import("./pages/user/Builder/Builder"));
// const CreateTemplate = lazy(() => import('./pages/user/EmailTemplatesOld/CreateTemplate'));
const TemplateBuilder = lazy(() => import("./pages/user/templateBuilder"));
const Test = lazy(() => import("./pages/Test"));
const SignupTrial = lazy(() => import("./pages/SignupTrial"));
const TrialActivate = lazy(() => import("./pages/TrialActivate"));

function App() {
  const location = useLocation();

  // Routes that don't require organization selection
  const publicRoutes = [
    "/register",
    "/register/trialactivate", 
    "/login",
    "/signup",
    "/create-organization",
    "/ListOrganization",
    "/edit-organization"
  ];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (location.pathname === "/register") {
    return (
      <ThemeContextProvider>
        <Suspense fallback={<Loading />}>
          <SignupTrial />
        </Suspense>
      </ThemeContextProvider>
    );
  }

  if (location.pathname === "/register/trialactivate") {
    return (
      <ThemeContextProvider>
        <Suspense fallback={<Loading />}>
          <TrialActivate />
        </Suspense>
      </ThemeContextProvider>
    );
  }
  if (location.pathname === "/login") {
    return (
      <ThemeContextProvider>
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </ThemeContextProvider>
    );
  }

  if (location.pathname === "/signup") {
    return (
      <ThemeContextProvider>
        <Suspense fallback={<Loading />}>
          <SignupForm />
        </Suspense>
      </ThemeContextProvider>
    );
  }


  if (location.pathname === "/create-organization") {
    return (
      <ThemeContextProvider>
        <ProtectedRoute>
          <Suspense fallback={<Loading />}>
            <CreateOrganization />
          </Suspense>
        </ProtectedRoute>
      </ThemeContextProvider>
    );
  }

  if (location.pathname === "/ListOrganization") {
    return (
      <ThemeContextProvider>
        <OrganizationProvider>
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <ListOrganization />
            </Suspense>
          </ProtectedRoute>
        </OrganizationProvider>
      </ThemeContextProvider>
    );
  }

  if (location.pathname === "/edit-organization") {
    return (
      <ThemeContextProvider>
        <ProtectedRoute>
          <Suspense fallback={<Loading />}>
            <EditOrganization />
          </Suspense>
        </ProtectedRoute>
      </ThemeContextProvider>
    );
  }

  // For all other routes, wrap with OrganizationProvider and check organization selection
  return (
    <ThemeContextProvider>
      <OrganizationProvider>
        <ProtectedRoute>
          <AppWithOrganizationCheck />
        </ProtectedRoute>
      </OrganizationProvider>
    </ThemeContextProvider>
  );
}

// Component that checks organization selection before rendering main app
function AppWithOrganizationCheck() {
  const { hasSelectedOrganization, isLoading } = useOrganization();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  // If no organization is selected, redirect to organization list
  if (!hasSelectedOrganization()) {
    return (
      <Suspense fallback={<Loading />}>
        <ListOrganization />
      </Suspense>
    );
  }

  // Render main app with Header
  return (
    <Header>
      <Suspense fallback={<h6>Loading...</h6>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Contacts */}
          <Route path="/create" element={<Create />} />
          <Route path="/contacts/dashboard" element={<ContactsDashboard />} />
          <Route path="/contacts/import" element={<ContactsImport />} />
          <Route path="/contacts/tags" element={<Tags />} />
          <Route path="/contacts/tags/:tagId" element={<AllContacts />} />

          <Route path="/contacts/all" element={<AllContacts />} />
          <Route
            path="/contacts/all/subscribed"
            element={<AllContacts subscribed={true} />}
          />
          <Route
            path="/contacts/all/unsubscribed"
            element={<AllContacts subscribed={false} />}
          />
          <Route
            path="/contacts/all/manual"
            element={<AllContacts source={"manual"} />}
          />
          <Route
            path="/contacts/all/imported"
            element={<AllContacts source={"imported"} />}
          />
          <Route
            path="/contacts/all/form"
            element={<AllContacts source={"form"} />}
          />
          <Route
            path="/contacts/all/rarely"
            element={<AllContacts engagement={"rarely"} />}
          />
          <Route
            path="/contacts/all/sometimes"
            element={<AllContacts engagement={"sometimes"} />}
          />
          <Route
            path="/contacts/all/often"
            element={<AllContacts engagement={"often"} />}
          />

          <Route
            path="/contacts/create-signup-forms"
            element={<CreateSignUpForm />}
          />
          <Route
            path="/contacts/signup-forms/view/:id"
            element={<ViewSignUpForm />}
          />
          <Route
            path="/contact/segments/view/:segmentId"
            element={<AllContacts />}
          />
          <Route path="/contact/edit/:id" element={<ContactEdit />} />
          <Route path="/contacts/signup-forms" element={<SignUpForm />} />
          <Route path="/contacts/segments" element={<Segments />} />

          {/* Campaigns */}
          <Route path="/campaigns/all" element={<Campaigns />} />
          <Route
            path="/campaigns/create/:campaignName/:newId"
            element={<CreateCampaigns />}
          />
          <Route path="/campaigns/edit/:id" element={<CreateCampaigns />} />
          <Route path="/campaigns/report/:id" element={<ViewReport />} />
          <Route path="/campaigns/templates" element={<EmailTemplates />} />
          <Route
            path="/campaigns/templates/create/"
            element={<TemplateBuilder />}
          />
          <Route
            path="/campaigns/templates/create/:id"
            element={<TemplateBuilder />}
          />
          <Route path="/email-builder/:id" element={<CampaignEmailBuilder />} />

          <Route path="/automation" element={<Automation />} />
          <Route path="/automation/new" element={<CreateAutomation />} />
          <Route path="/automation/builder" element={<AutomationBuilder />} />
          <Route path="/automation/builder/:id" element={<AutomationBuilder />} />
          <Route path="/automation/report" element={<AutomationReport />} />

          <Route path="/website" element={<Website />} />
          <Route path="/content-studio" element={<ContentStudio />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/upgrade-plans" element={<UpgradePlans />} />

          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/edit" element={<EditUser />} />
          <Route
            path="/admin/email-templates"
            element={<AdminEmailTemplates />}
          />
          <Route path="/admin/server-status" element={<ServerStatus />} />
          <Route path="/admin/plans" element={<AdminPlans />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/queue" element={<Queue />} />
          <Route path="/admin/add-new-template" element={<AddNewTemplate />} />

          {/* test */}
          <Route path="/builder" element={<Builder />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>
    </Header>
  );
}

export default App;
