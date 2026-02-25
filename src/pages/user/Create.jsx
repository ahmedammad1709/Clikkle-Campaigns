import React, { useState } from "react";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineCampaign, MdPermIdentity } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { FaRegCircleCheck } from "react-icons/fa6";
import { SlCloudUpload } from "react-icons/sl";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useTheme } from "../../styles/theme";

const steps = [
  {
    id: 1,
    label: "Add Contacts",
    icon: <RiContactsBook3Line size={20} />,
  },
  {
    id: 2,
    label: "Create a Campaign",
    icon: <MdOutlineCampaign size={20} />,
  },
  {
    id: 3,
    label: "Automate your Workflow",
    icon: <MdPermIdentity size={20} />,
  },
  {
    id: 4,
    label: "Invite your Team",
    icon: <GoPeople size={20} />,
  },
];

const Create = () => {
  const { mode } = useTheme();
  const isLight = mode === "light";

  const theme = useTheme(); // custom theme
  const [currentStep, setCurrentStep] = useState(1);

  const colors = {
    primary: "#3B84D9",
    secondary: "#ffb300",
    background: isLight ? "#FFFFFF" : "#141414",
    border: isLight ? "#e7e3e3" : "#616161",
    textPrimary: isLight ? "#2C4069" : "#FFFFFF",
    textSecondary: isLight ? "#6E798D" : "#818991",
    card: isLight ? "#FFFFFF" : "#2F2F2F",
    hoverCard: isLight ? "#F3F6FA" : "#3a3a3a",
    stepActive: isLight ? "#EDF2FC" : "#44b5e899",
    stepPending: isLight ? "#F0F0F0" : "#2f2e2e",
    response: isLight ? "#2f2e2e" : "#fff",
    gradientStart: "#1b3c8c",
    gradientEnd: "#972bc4",
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2
              style={{ color: colors.textPrimary }}
              className="text-xl font-semibold mb-2"
            >
              Add Contacts
            </h2>
            <p style={{ color: colors.textSecondary }} className="mb-4">
              Import your existing contacts from Clikkle Apps or upload them
              from your contact list.
            </p>

            {/* App Cards */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { name: "Clikkle HR", url: "hr" },
                { name: "Clikkle CRM", url: "cmail" },
                { name: "Clikkle E-sign", url: "e-sign" },
                { name: "Clikkle Host", url: "host" },
                { name: "Clikkle Launch", url: "launch" },
                { name: "Clikkle Pitch", url: "pitch" },
              ].map((app) => (
                <div
                  key={app.name}
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                  className="border rounded-md p-4 flex items-center hover:shadow-sm transition"
                >
                  <img
                    src={`https://cdn.clikkle.com/images/${app.url}/logo/2023/${app.url}.png`}
                    alt={app.name}
                    className="w-8 h-8 mr-2"
                  />
                  <p
                    style={{ color: colors.textPrimary }}
                    className="font-medium"
                  >
                    {app.name}
                  </p>
                </div>
              ))}
            </div>

            {/* OR Divider */}
            <div className="flex items-center my-5">
              <hr
                className="flex-grow"
                style={{ borderColor: colors.border }}
              />
              <span
                className="mx-4 text-sm"
                style={{ color: colors.textSecondary }}
              >
                OR
              </span>
              <hr
                className="flex-grow"
                style={{ borderColor: colors.border }}
              />
            </div>

            {/* Upload Box */}
            <div
              style={{
                border: `2px dashed ${colors.primary}`,
                backgroundColor: isLight ? "#EDF2FA" : "#1A1A1A",
              }}
              className="rounded-md p-4 text-center"
            >
              <div className="flex items-start gap-5">
                <SlCloudUpload size={40} color={colors.primary} />
                <div className="text-left">
                  <p
                    className="font-semibold"
                    style={{ color: colors.textPrimary }}
                  >
                    Import Contacts
                  </p>
                  <p
                    style={{ color: colors.textSecondary }}
                    className="text-sm"
                  >
                    Supported file formats include CSV, XLS, and XLSX, max size
                    25MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: colors.textPrimary }}
            >
              Create a Campaign
            </h2>
            <p style={{ color: colors.textSecondary }} className="mb-4">
              Craft and deliver impactful email and SMS campaigns to enhance
              engagement.
            </p>
            {/* Email Campaign Card */}
            <div className="flex items-start border rounded-lg p-4 mb-4 shadow-sm hover:shadow transition">
              <img
                src="/images/walkover/pana.png"
                alt="Email"
                className="w-28 h-auto mr-6"
              />
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  Email
                </h3>
                <p style={{ color: colors.textSecondary }} className="mb-4">
                  Create personalized campaigns with merge tags and design
                  innovative layouts using our drag-and-drop template editor.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Learn more
                  </button>
                  <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                    Create
                  </button>
                </div>
              </div>
            </div>

            {/* SMS Campaign Card */}
            <div className="flex items-start border rounded-lg p-4 shadow-sm hover:shadow transition">
              <img
                src="/images/screen1.png"
                alt="SMS"
                className="w-28 h-auto mr-6"
              />
              <div className="flex-1">
                <h3
                  style={{ color: colors.textPrimary }}
                  className="text-lg font-semibold mb-1"
                >
                  SMS
                </h3>
                <p style={{ color: colors.textSecondary }} className="mb-4">
                  Enhance audience engagement and grow your business with SMS
                  campaigns.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Learn more
                  </button>
                  <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: colors.textPrimary }}
            >
              Automate your Workflow
            </h2>
            <p style={{ color: colors.textSecondary }} className="mb-4">
              Set up workflow automation to engage contacts even while you're
              away.
            </p>

            {/* Card: Pre-built templates */}
            <div className="flex items-start border rounded-lg p-4 mb-6 shadow-sm hover:shadow transition">
              <img
                src="/images/login-img01.png"
                alt="Pre-built templates"
                className="w-24 h-auto mr-6"
              />
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  Pre-built templates
                </h3>
                <p style={{ color: colors.textSecondary }} className="mb-4">
                  Choose from our pre-built templates to design a workflow
                  tailored to any business need.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Learn more
                  </button>
                  <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                    Create
                  </button>
                </div>
              </div>
            </div>

            {/* Card: Start from scratch */}
            <div className="flex items-start border rounded-lg p-4 shadow-sm hover:shadow transition">
              <img
                src="/images/amico.png"
                alt="Start from scratch"
                className="w-24 h-auto mr-6"
              />
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  Start from scratch
                </h3>
                <p style={{ color: colors.textSecondary }} className="mb-4">
                  Build your workflow from scratch and set multiple business
                  goals.
                </p>
                <div className="flex items-center space-x-4">
                  <IoMdInformationCircleOutline color="blue" />
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Learn more
                  </button>
                </div>
                <button className="bg-blue-600 text-white w-40 text-sm font-medium px-4 py-1.5 mt-2 rounded hover:bg-blue-700 transition">
                  Create
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: colors.textPrimary }}
            >
              Invite your Team
            </h2>
            <p style={{ color: colors.textSecondary }} className="mb-4">
              Invite your team members to Clikkle Campaigns.
            </p>
            <div className="space-y-5">
              <div>
                <label
                  className="text-sm font-medium mb-1 block"
                  style={{ color: colors.textPrimary }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter teammate’s email"
                  className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium mb-1 block"
                  style={{ color: colors.textPrimary }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter teammate’s name"
                  className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium mb-1 block"
                  style={{ color: colors.textPrimary }}
                >
                  Assign Role
                </label>
                <select
                  className="w-full border px-4 py-2 rounded-md text-sm"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    color: colors.textPrimary,
                  }}
                >
                  <option>Select a role</option>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                style={{ color: colors.primary }}
                className="text-sm font-medium hover:underline"
              >
                Mark as complete
              </button>
              <button
                className="px-5 py-2 text-sm font-medium rounded text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Invite
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Welcome Banner */}
      <div
        style={{
          background: `linear-gradient(to right, ${colors.gradientStart}, ${colors.gradientEnd})`,
          color: colors.response,
        }}
        className="rounded-lg p-4 flex items-center space-x-4 mb-4"
      >
        <div className="text-5xl bg-white/10 rounded-full px-4 py-3">🎉</div>
        <div>
          <h2 className="font-semibold text-2xl">
            Hello, BCG Technologies! 👋
          </h2>
          <p className="text-sm text-white/80">
            Complete the checklist below to maximize your Clikkle Campaign
            experience.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex gap-4 h-[70vh]">
        {/* Stepper */}
        <div
          className="w-64 border rounded-md shadow-sm p-5 overflow-y-auto"
          style={{ borderColor: colors.border }}
        >
          <h2 style={{ color: colors.textPrimary }} className="font-bold mb-4">
            Get started
          </h2>
          <ol className="space-y-5">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <li
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className="cursor-pointer relative pl-10"
                >
                  <span
                    className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-white"
                    style={{
                      backgroundColor: isCompleted
                        ? "#44b5e899"
                        : isActive
                        ? colors.stepActive
                        : colors.stepPending,
                      color: isCompleted ? "#22C55E" : colors.textPrimary,
                    }}
                  >
                    {isCompleted ? <FaRegCircleCheck /> : step.icon}
                  </span>
                  <div>
                    <h3
                      className="text-sm font-medium"
                      style={{ color: colors.textPrimary }}
                    >
                      {step.label}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: colors.textSecondary }}
                    >
                      {isCompleted
                        ? "Completed"
                        : isActive
                        ? "In Progress"
                        : "Pending"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Step content */}
        <div
          className="flex-1 border rounded-md shadow-sm p-6 overflow-y-auto"
          style={{
            backgroundColor: isLight ? "#F9FAFB" : "#141414",
            borderColor: colors.border,
          }}
        >
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default Create;
