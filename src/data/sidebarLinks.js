import {
    DashboardOutlined,
    PeopleOutlined,
    ContactMailOutlined,
    Autorenew,
    ArrowUpward,
    Settings,
    Equalizer,
    EqualizerOutlined,
    LinkSharp,
    LocalOfferOutlined,
    Web,
    ChromeReaderMode,
    ViewQuilt,
    ImportContacts,
} from '@mui/icons-material';
import { MdCampaign } from "react-icons/md";

const adminMenuItems = [
    {
        label: 'Dashboard',
        icon: <DashboardOutlined fontSize='small' />,
        to: '/admin/dashboard',
    },
    {
        label: 'Email Templates',
        icon: <ContactMailOutlined fontSize='small' />,
        to: '/admin/email-templates',
    },
    {
        icon: <Equalizer fontSize='small' />,
        label: 'Server Status',
        to: '/admin/server-status',
    },
    {
        icon: <PeopleOutlined fontSize='small' />,
        label: 'Users',
        to: '/admin/users',
    },

    {
        icon: <Autorenew fontSize='small' />,
        label: 'Queue',
        to: '/admin/queue',
    },
    {
        icon: <ArrowUpward fontSize='small' />,
        label: 'Upgrade Plans',
        to: '/admin/plans',
    },
    {
        icon: <Settings fontSize='small' />,
        label: 'Settings',
        to: '/admin/settings',
    },
];

// const userMenuItems = [
//     {
//         icon: <EqualizerOutlined fontSize='small' />,
//         label: 'Dashboard',
//         to: '/',
//     },
//     {
//         icon: <PeopleOutlined fontSize='small' />,
//         label: 'Contacts',
//         to:"/contacts/dashboard"

//         // to: [
//         //     {
//         //         label: 'Dashboard',
//         //         icon: <DashboardOutlined fontSize='small' />,
//         //         to: '/contacts/dashboard',
//         //     },
//         //     {
//         //         label: 'All Contacts',
//         //         icon: <ContactMailOutlined fontSize='small' />,
//         //         to: '/contacts/all',
//         //     },
//         //     {
//         //         label: 'Signup Forms',
//         //         icon: <LinkSharp fontSize='small' />,
//         //         to: '/contacts/signup-forms',
//         //     },
//         //     {
//         //         label: 'Tags',
//         //         icon: <LocalOfferOutlined fontSize='small' />,
//         //         to: '/contacts/tags',
//         //     },
//         //     {
//         //         label: 'Segments',
//         //         icon: <LinkSharp fontSize='small' />,
//         //         to: '/contacts/segments',
//         //     },
//         //     {
//         //         label: 'Import ',
//         //         icon: <ImportContacts fontSize='small' />,
//         //         to: '/contacts/import',
//         //     },
//         // ],
//     },
//     {
//         icon: <PeopleOutlined fontSize='small' />,
//         label: 'Campaigns',
//         to:"/campaigns/all"
//         // to: [
//         //     {
//         //         label: 'All Campaigns',
//         //         icon: <DashboardOutlined fontSize='small' />,
//         //         to: '/campaigns/all',
//         //     },
//         //     {
//         //         label: 'Email Templates',
//         //         icon: <ContactMailOutlined fontSize='small' />,
//         //         to: '/campaigns/templates',
//         //     },
//         // ],
//     },

//     {
//         icon: <Autorenew fontSize='small' />,
//         label: 'Automation',
//         to: '/automation',
//     },
//     {
//         icon: <Web fontSize='small' />,
//         label: 'Website',
//         to: '/website',
//     },
//     {
//         icon: <ChromeReaderMode fontSize='small' />,
//         label: 'Content Studio',
//         to: '/content-studio',
//     },
//     {
//         icon: <ViewQuilt fontSize='small' />,
//         label: 'Integration',
//         to: '/integration',
//     },
//     {
//         icon: <ArrowUpward fontSize='small' />,
//         label: 'Upgrade Plans',
//         to: '/upgrade-plans',   
//     },
// ];



const userMenuItems = [
  {
    icon: <EqualizerOutlined fontSize='small' />,
    label: 'Dashboard',
    to: '/',
  },
  {
    icon: <PeopleOutlined fontSize='small' />,
    label: 'Contacts',
    to: '/contacts/dashboard',
    subTabs: [
      { label: 'Dashboard', to: '/contacts/dashboard' },
      { label: 'All Contacts', to: '/contacts/all' },
      { label: 'Signup Forms', to: '/contacts/signup-forms' },
      { label: 'Tags', to: '/contacts/tags' },
      { label: 'Segments', to: '/contacts/segments' },
      { label: 'Import', to: '/contacts/import' },
    ],
  },
  {
    icon: <MdCampaign  fontSize='medium' />,
    label: 'Campaigns',
    to: '/campaigns/all',
    subTabs: [
      { label: 'All Campaigns', to: '/campaigns/all' },
      { label: 'Email Templates', to: '/campaigns/templates' },
    ],
  },
  {
    icon: <Autorenew fontSize='small' />,
    label: 'Automation',
    to: '/automation',
  },
  // {
  //   icon: <Web fontSize='small' />,
  //   label: 'Website',
  //   to: '/website',
  // },
  // {
  //   icon: <ChromeReaderMode fontSize='small' />,
  //   label: 'Content Studio',
  //   to: '/content-studio',
  // },
  // {
  //   icon: <ViewQuilt fontSize='small' />,
  //   label: 'Integration',
  //   to: '/integration',
  // },
//   {
//     icon: <ArrowUpward fontSize='small' />,
//     label: 'Upgrade Plans',
//     to: '/upgrade-plans',
//   },
];

export { userMenuItems, adminMenuItems };
