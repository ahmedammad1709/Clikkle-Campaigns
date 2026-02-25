import { useState } from "react";
import CreditCard from "../components/images/creditcard.png";
import { useTheme } from "../styles/theme";
import { Link } from "react-router-dom";
import {
  Mail as MailIcon,
  Users as UserIcon,
  Phone as PhoneIcon,
  Layout as DragIcon,
  Zap as SparklesIcon,
  FileText as TemplateIcon,
  Calendar as CalendarIcon,
  BarChart as ChartIcon,
  Repeat as AutomationIcon,
  FilePlus as FormsIcon,
  Layers as SegmentIcon,
  Box as IntegrationIcon,
  CornerUpRight as ResendIcon,
  Globe as AdsIcon,
  Monitor as GoogleAdsIcon,
  Handshake as HandshakeIcon,
  Star as StarIcon,
  RefreshCw as DynamicIcon,
  Share2 as SocialAdvancedIcon,
  TrendingUp as ChartComprehensiveIcon,
  Repeat as AutomationUnlimitedIcon,
  ShoppingCart as EcommerceIcon,
  Send as WelcomeIcon,
  Layers as SegmentUnlimitedIcon,
  Megaphone as AdsAdvancedIcon,
  Search as SeoIcon,
} from "lucide-react";
import { Schedule } from "@mui/icons-material";

export default function TrialActivation({ onSuccess }) {
  const [billingCycle, setBillingCycle] = useState("annually");
  const [selectedPlan, setSelectedPlan] = useState("Business");

  const [form, setForm] = useState({
    fullName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    zip: "",
    coupon: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const spaced = digits.replace(/(.{4})/g, "$1 ").trim();
      setForm((s) => ({ ...s, [name]: spaced }));
      return;
    }

    if (name === "expDate") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      if (digits.length <= 2) {
        setForm((s) => ({ ...s, [name]: digits }));
      } else {
        const mm = digits.slice(0, 2);
        const yy = digits.slice(2);
        setForm((s) => ({ ...s, [name]: `${mm}/${yy}` }));
      }
      return;
    }

    if (name === "cvv") {
      const v = value.replace(/\D/g, "").slice(0, 4);
      setForm((s) => ({ ...s, [name]: v }));
      return;
    }

    if (name === "zip") {
      const v = value.replace(/\D/g, "").slice(0, 10);
      setForm((s) => ({ ...s, [name]: v }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (form.cardNumber.replace(/\s/g, "").length < 13)
      e.cardNumber = "Enter a valid card number";

    const expPattern = /^(\d{2})\/(\d{2})$/;
    if (!form.expDate || !expPattern.test(form.expDate)) {
      e.expDate = "Enter expiration as MM/YY";
    } else {
      const match = form.expDate.match(expPattern);
      if (match) {
        const [, mmStr, yyStr] = match;
        const mm = Number(mmStr);
        const yy = Number(yyStr);
        if (mm < 1 || mm > 12) e.expDate = "Invalid expiration month";
        else {
          const now = new Date();
          const currYear = now.getFullYear() % 100;
          const currMonth = now.getMonth() + 1;
          if (yy < currYear || (yy === currYear && mm < currMonth)) {
            e.expDate = "Card has expired";
          }
        }
      }
    }

    if (!form.cvv || form.cvv.length < 3) e.cvv = "Invalid CVV";
    if (!form.zip) e.zip = "Billing zip required";

    return e;
  }

  async function submitForm(e) {
    e?.preventDefault();
    setErrors({});
    setSuccessMessage("");
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    // const [mmStr, yyStr] = form.expDate.split("/");
    // const expMonth = mmStr;
    // const expYear = String(2000 + Number(yyStr));

    // const payload = {
    //   billingCycle,
    //   plan: planTab === "current" ? "current-plan" : "clickke-plus",
    //   billing: {
    //     name: form.fullName,
    //     number: form.cardNumber.replace(/\s/g, ""),
    //     expMonth,
    //     expYear,
    //     cvv: form.cvv,
    //     zip: form.zip,
    //     coupon: form.coupon || undefined,
    //   },
    // };

    try {
      setLoading(true);
      // const res = await fetch("/api/start-trial", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // if (!res.ok) {
      //   const text = await res.text();
      //   throw new Error(text || "Failed to start trial");
      // }

      // const data = await res.json();
      setSuccessMessage("Trial activated! Check your email for confirmation.");
      onSuccess?.("Trial activated! Check your email for confirmation.");
      // onSuccess?.(data);
    } catch (err) {
      console.error(err);
      setErrors({
        submit:
          err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  }

  const monthlyPlans = [
    {
      name: "Lite",
      description: "Ideal for beginners",
      price: "$17",
      pricePeriod: "per month",
      buttonText: "Start Lite",
      buttonVariant: "outline",
      badge: null,
      features: [
        { icon: MailIcon, text: "", subtext: "All Features Included" },
        { icon: UserIcon, text: "", subtext: "Live 1:1 onboarding" },
        { icon: PhoneIcon, text: "", subtext: "Phone & chat support" },
        { icon: DragIcon, text: "", subtext: "Drag-&-drop email editor" },
        { icon: SparklesIcon, text: "", subtext: "AI copy generator" },
        { icon: TemplateIcon, text: "", subtext: "Basic email templates" },
        { icon: CalendarIcon, text: "", subtext: "Social post automation" },
        { icon: ChartIcon, text: "", subtext: "Basic reporting analytics" },
        { icon: AutomationIcon, text: "", subtext: "1 automation template" },
        { icon: FormsIcon, text: "", subtext: "Web signup forms" },
        { icon: SegmentIcon, text: "", subtext: "1 custom segment" },
        { icon: IntegrationIcon, text: "", subtext: "300+ app integrations" },
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      description: "Great for most businesses",
      price: "$48",
      pricePeriod: "per month",
      buttonText: "Start Standard",
      buttonVariant: "primary",
      badge: "BEST VALUE",
      features: [
        { icon: MailIcon, text: "", subtext: "All Features Included" },
        { icon: UserIcon, text: "", subtext: "Live 1:1 onboarding" },
        { icon: PhoneIcon, text: "", subtext: "Phone & chat support" },
        { icon: Schedule, text: "", subtext: "Email scheduling & A/B" },
        { icon: TemplateIcon, text: "", subtext: "Advanced email templates" },
        { icon: CalendarIcon, text: "", subtext: "Social post scheduling" },
        {
          icon: ChartIcon,
          text: "",
          subtext: "Advanced reporting (opens/clicks)",
        },
        { icon: AutomationIcon, text: "", subtext: "3 automation templates" },
        { icon: ResendIcon, text: "", subtext: "Auto resend to non-openers" },
        { icon: SegmentIcon, text: "", subtext: "10 custom segments" },
        { icon: AdsIcon, text: "", subtext: "Facebook lookalike & ads" },
        { icon: GoogleAdsIcon, text: "", subtext: "Google Ad Manager" },
        { icon: IntegrationIcon, text: "", subtext: "300+ app integrations" },
      ],
      highlighted: true,
      backgroundImage: true,
    },
    {
      name: "Premium",
      description: "Ideal for pros",
      price: "$109",
      pricePeriod: "per month",
      buttonText: "Start Premium",
      buttonVariant: "outline",
      badge: null,
      features: [
        { icon: MailIcon, text: "", subtext: "All Features Included" },
        { icon: HandshakeIcon, text: "", subtext: "Priority onboarding" },
        { icon: StarIcon, text: "", subtext: "Dedicated priority support" },
        { icon: DynamicIcon, text: "", subtext: "Dynamic email content" },
        {
          icon: TemplateIcon,
          text: "",
          subtext: "All Standard email features",
        },
        {
          icon: SocialAdvancedIcon,
          text: "",
          subtext: "Advanced social tools",
        },
        {
          icon: ChartComprehensiveIcon,
          text: "",
          subtext: "Comprehensive reporting",
        },
        {
          icon: AutomationUnlimitedIcon,
          text: "",
          subtext: "Unlimited automation templates",
        },
        { icon: AutomationIcon, text: "", subtext: "Custom automations" },
        { icon: EcommerceIcon, text: "", subtext: "Ecommerce templates" },
        { icon: WelcomeIcon, text: "", subtext: "Auto-send welcome emails" },
        {
          icon: SegmentUnlimitedIcon,
          text: "",
          subtext: "Unlimited custom segments",
        },
        { icon: AdsAdvancedIcon, text: "", subtext: "Advanced ad targeting" },
        { icon: SeoIcon, text: "", subtext: "Premium SEO tools" },
        { icon: IntegrationIcon, text: "", subtext: "300+ app integrations" },
      ],
      highlighted: false,
    },
  ];
  const annualPlans = [
    {
      name: "Lite",
      description: "Ideal for beginners",
      price: "$8.50",
      pricePeriod: "per month (billed annually)",
      buttonText: "Start Lite",
      buttonVariant: "outline",
      badge: null,
      features: [
        { icon: MailIcon, text: "", subtext: "All Features Included" },
        { icon: UserIcon, text: "", subtext: "Live 1:1 onboarding" },
        { icon: PhoneIcon, text: "", subtext: "Phone & chat support" },
        { icon: DragIcon, text: "", subtext: "Drag-&-drop email editor" },
        { icon: SparklesIcon, text: "", subtext: "AI copy generator" },
        { icon: TemplateIcon, text: "", subtext: "Basic email templates" },
        { icon: CalendarIcon, text: "", subtext: "Social post automation" },
        { icon: ChartIcon, text: "", subtext: "Basic reporting analytics" },
        { icon: AutomationIcon, text: "", subtext: "1 automation template" },
        { icon: FormsIcon, text: "", subtext: "Web signup forms" },
        { icon: SegmentIcon, text: "", subtext: "1 custom segment" },
        { icon: IntegrationIcon, text: "", subtext: "300+ app integrations" },
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      description: "Great for most businesses",
      price: "$24",
      pricePeriod: "per month (billed annually)",
      buttonText: "Start Standard",
      buttonVariant: "primary",
      badge: "BEST VALUE",
      features: [
        { icon: MailIcon, text: "", subtext: "All Features Included" },
        { icon: UserIcon, text: "", subtext: "Live 1:1 onboarding" },
        { icon: PhoneIcon, text: "", subtext: "Phone & chat support" },
        { icon: Schedule, text: "", subtext: "Email scheduling & A/B" },
        { icon: TemplateIcon, text: "", subtext: "Advanced email templates" },
        { icon: CalendarIcon, text: "", subtext: "Social post scheduling" },
        {
          icon: ChartIcon,
          text: "",
          subtext: "Advanced reporting (opens/clicks)",
        },
        { icon: AutomationIcon, text: "", subtext: "3 automation templates" },
        { icon: ResendIcon, text: "", subtext: "Auto resend to non-openers" },
        { icon: SegmentIcon, text: "", subtext: "10 custom segments" },
        { icon: AdsIcon, text: "", subtext: "Facebook lookalike & ads" },
        { icon: GoogleAdsIcon, text: "", subtext: "Google Ad Manager" },
        { icon: IntegrationIcon, text: "", subtext: "300+ app integrations" },
      ],
      highlighted: true,
      backgroundImage: true,
    },
    {
      name: "Premium",
      description: "Ideal for pros",
      price: "$54.50",
      pricePeriod: "per month (billed annually)",
      buttonText: "Start Premium",
      buttonVariant: "outline",
      badge: null,
      features: [
        { icon: MailIcon, text: "", subtext: "All Features Included" },
        { icon: HandshakeIcon, text: "", subtext: "Priority onboarding" },
        { icon: StarIcon, text: "", subtext: "Dedicated priority support" },
        { icon: DynamicIcon, text: "", subtext: "Dynamic email content" },
        {
          icon: TemplateIcon,
          text: "",
          subtext: "All Standard email features",
        },
        {
          icon: SocialAdvancedIcon,
          text: "",
          subtext: "Advanced social tools",
        },
        {
          icon: ChartComprehensiveIcon,
          text: "",
          subtext: "Comprehensive reporting",
        },
        {
          icon: AutomationUnlimitedIcon,
          text: "",
          subtext: "Unlimited automation templates",
        },
        { icon: AutomationIcon, text: "", subtext: "Custom automations" },
        { icon: EcommerceIcon, text: "", subtext: "Ecommerce templates" },
        { icon: WelcomeIcon, text: "", subtext: "Auto-send welcome emails" },
        {
          icon: SegmentUnlimitedIcon,
          text: "",
          subtext: "Unlimited custom segments",
        },
        { icon: AdsAdvancedIcon, text: "", subtext: "Advanced ad targeting" },
        { icon: SeoIcon, text: "", subtext: "Premium SEO tools" },
        { icon: IntegrationIcon, text: "", subtext: "300+ app integrations" },
      ],
      highlighted: false,
    },
  ];

  const currentPlans = billingCycle === "monthly" ? monthlyPlans : annualPlans;
  const currentPlan =
    currentPlans.find((plan) => plan.name === selectedPlan) || currentPlans[1];

  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const today = new Date();

  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 7);

  const options = { month: "long", day: "numeric" };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-start md:w-[245px] w-auto">
                  <Link to={"https://clikkle.com/campaigns"}>
                    <img
                      className="object-cover md:h-[40px] h-[32px]"
                      alt="Clikkle campaigns logo"
                      src={
                        isDarkMode
                          ? "https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20White%20Text).png"
                          : "https://cdn.clikkle.com/images/campaigns/logo/2025/Clikkle%20Campaigns%20Blue%20(%20Black%20Text).png"
                      }
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Ali R.
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedPlan} Plan
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white font-medium text-sm">
                AR
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className=" bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 py-8 pt-0 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center flex flex-col justify-center items-center py-4">
            <div className="flex space-x-2 mt-6 justify-center ">
              <div
                className={`shadow-lg cursor-not-allowed flex items-center p-2 md:p-3 gap-3 py-1.5 md:py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500  transition-colors duration-200`}
              >
                <span className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-gray-500 text-white text-xs  font-bold">
                  1
                </span>
                <span className="font-semibold text-xs md:text-sm">
                  Create an account
                </span>
              </div>

              <div
                className={`shadow-lg flex items-center p-2 md:p-3 gap-3 py-1.5 md:py-2 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-white transition-colors duration-200`}
              >
                <span className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                  2
                </span>
                <span className="font-semibold text-xs md:text-sm">
                  Activate your trial
                </span>
              </div>
            </div>
            <div className="my-3 text-xs text-gray-500 dark:text-gray-400">
              Kindly add your payment details to begin the free trial. You can
              cancel anytime before the free trial ends to avoid being charged.
            </div>

            <div className=" flex items-center gap-3">
              <div className="inline-flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-md shadow-lg">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-3 py-1 rounded ${
                    billingCycle === "monthly"
                      ? "bg-blue-900 text-white"
                      : "bg-transparent text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Bill Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annually")}
                  className={`px-3 py-1 rounded ${
                    billingCycle === "annually"
                      ? "bg-blue-900 text-white"
                      : "bg-transparent text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Bill Annually
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1 min-w-[220px]">
                <div className="rounded-xl p-6 h-full">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected Plan
                    </label>
                    <div className="relative">
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="w-full p-1 pr-7 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4e73b3] focus:border-[#4e73b3] appearance-none transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        {currentPlans.map((plan) => (
                          <option
                            key={plan.name}
                            value={plan.name}
                            className="bg-white dark:bg-gray-700 text-xs hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            {plan.name} - {plan.price}/month
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400 dark:text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {currentPlan.name} Plan
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    7-day free trial, then {currentPlan.price}/month
                  </p>

                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    {currentPlan.features.slice(0, 9).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <feature.icon className="w-4 h-4 mt-[2px] text-blue-900 dark:text-blue-500 shrink-0" />
                        <span>{feature.subtext}</span>
                      </li>
                    ))}
                  </ul>
                  {currentPlan.features.length > 9 && (
                    <div className="mt-[0.5rem] group cursor-pointer ">
                      <div className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hidden md:block ">
                        + {currentPlan.features.length - 9} more features
                      </div>

                      <div className="hidden md:block group-hover:block absolute left-0 z-10 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                          All Features:
                        </div>
                        <ul className="space-y-1">
                          {currentPlan.features
                            .slice(9)
                            .map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"
                              >
                                <feature.icon className="w-3 h-3 mt-[1px] text-blue-900 dark:text-blue-500 shrink-0" />
                                <span>{feature.subtext}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="md:hidden rounded-lg text-sm">
                        <ul className="space-y-1">
                          {currentPlan.features
                            .slice(9)
                            .map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <feature.icon className="w-4 h-4 mt-[2px] text-blue-900 dark:text-blue-500 shrink-0" />
                                <span>{feature.subtext}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[505px]">
                <div className="bg-blue-900 rounded-xl p-6 md:p-8 text-white">
                  <h3 className="text-lg font-semibold mb-6">
                    Billing Information
                  </h3>

                  <form onSubmit={submitForm} className="space-y-4">
                    <div>
                      <label className="block text-xs text-white mb-1">
                        Full Name on Card
                      </label>
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`w-full rounded-xl p-2 bg-white text-gray-900 
                     dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border 
                    ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-400"
                    } 
                    focus:outline-none`}
                        placeholder="Full Name"
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <div className="text-xs text-red-400 mt-1">
                          {errors.fullName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-white mb-1">
                        Card Number
                      </label>
                      <div
                        className={`w-full flex items-center gap-2 rounded-xl p-2 bg-white text-gray-900 
                     dark:bg-gray-800 dark:text-white border 
                    ${
                      errors.cardNumber
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-400"
                    } 
                    focus:outline-none`}
                      >
                        <img src={CreditCard} alt="card" className="w-4" />
                        <input
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={handleChange}
                          inputMode="numeric"
                          className="w-full bg-transparent placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none"
                          placeholder="1234 5678 9012 3333"
                          aria-invalid={!!errors.cardNumber}
                        />
                      </div>
                      {errors.cardNumber && (
                        <div className="text-xs text-red-400 mt-1">
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <label className="block text-xs text-white mb-1">
                          Expiration
                        </label>
                        <input
                          name="expDate"
                          value={form.expDate}
                          onChange={handleChange}
                          inputMode="numeric"
                          className={`w-full rounded-xl p-2 bg-white text-gray-900  dark:bg-gray-800 dark:text-white 
                      placeholder-gray-400 dark:placeholder-gray-300 border 
                      ${
                        errors.expDate
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-400"
                      } 
                      focus:outline-none`}
                          placeholder="MM/YY"
                          aria-invalid={!!errors.expDate}
                        />
                        {errors.expDate && (
                          <div className="text-xs text-red-400 mt-1">
                            {errors.expDate}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs text-white mb-1">
                          CVV
                        </label>
                        <input
                          name="cvv"
                          value={form.cvv}
                          onChange={handleChange}
                          inputMode="numeric"
                          className={`w-full rounded-xl p-2 bg-white text-gray-900  dark:bg-gray-800 dark:text-white 
                      placeholder-gray-400 dark:placeholder-gray-300 border 
                      ${
                        errors.cvv
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-400"
                      } 
                      focus:outline-none`}
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <div className="text-xs text-red-400 mt-1">
                            {errors.cvv}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs text-white mb-1">
                          Billing Zip Code
                        </label>
                        <input
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          inputMode="numeric"
                          className={`w-full rounded-xl p-2 bg-white text-gray-900  dark:bg-gray-800 dark:text-white 
                      placeholder-gray-400 dark:placeholder-gray-300 border 
                      ${
                        errors.zip
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-400"
                      } 
                      focus:outline-none`}
                          placeholder="00000"
                        />
                        {errors.zip && (
                          <div className="text-xs text-red-400 mt-1">
                            {errors.zip}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white mb-1">
                        Coupon (Optional)
                      </label>
                      <input
                        name="coupon"
                        value={form.coupon}
                        onChange={handleChange}
                        className="w-full rounded-xl p-2 bg-white text-gray-900  dark:bg-gray-800 dark:text-white 
                    placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-400 
                    focus:outline-none"
                        placeholder="Enter coupon code"
                      />
                    </div>

                    {errors.submit && (
                      <div className="text-sm text-red-400">
                        {errors.submit}
                      </div>
                    )}
                    {successMessage && (
                      <div className="text-sm text-green-400">
                        {successMessage}
                      </div>
                    )}

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full py-3 border border-gray-300 dark:border-gray-400 bg-gray-50 dark:bg-gray-800  text-gray-700 dark:text-gray-200 
                    disabled:opacity-60 font-semibold"
                      >
                        {loading ? "Processing…" : "Start My 7-day Free Trial"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1 min-w-[220px]">
                <div className="rounded-xl p-6 md:pl-0">
                  <h3 className="text-lg font-semibold mb-3">
                    How your free trial works
                  </h3>
                  <ol className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
                    {[
                      {
                        step: 1,
                        title: "Create an account",
                        desc: "You successfully created your free account.",
                      },
                      {
                        step: 2,
                        title: "Today: Get instant access",
                        desc: "Get instant access to all our packages and enjoy seamless flows.",
                      },
                      {
                        step: 3,
                        title: "Day 4: Free trial reminder",
                        desc: "You’ll get an email notification 3 days before billing. Cancel anytime.",
                      },
                      {
                        step: 4,
                        title: "Day 7: Free trial ends",
                        desc: `You will be billed for the ${selectedPlan} ${billingCycle} plan ${currentPlan.price} on ${formattedDate}`,
                      },
                    ].map(({ step, title, desc }) => (
                      <li key={step} className="flex gap-3">
                        <div className="w-6 h-6 p-3 flex items-center justify-center rounded-full text-xs bg-gray-200 dark:bg-gray-900">
                          {step}
                        </div>
                        <div>
                          <div className="font-medium">{title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {desc}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <div className="rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-blue-900 dark:text-white">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Active Users
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-blue-900 dark:text-white">
                    4.78/5
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Customer Rating
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-blue-900 dark:text-white">
                    45k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Positive Reviews
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secure Checkout
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    PCI Compliant
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Your payment information is encrypted and secure. Cancel anytime
                before your trial ends.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
