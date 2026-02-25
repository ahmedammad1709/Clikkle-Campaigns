import ContactsIcon from '@mui/icons-material/Contacts';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
const Methods = [
	{
		method: "CONTACT LIST AUTOMATION",
		text: "Send Welcome Emails to new subscribers or send automated Birthday, Anniversary or Reminder Emails based on dates.",
		icon: <ContactsIcon />,
		value: "CreateByContactList",
		className:"add-by-contact-list",
	},
	 
	{
		method: "EMAIL ENGAGEMENT AUTOMATION",
		text: "This feature is available for paid plans.",
		icon: <AttachEmailIcon />,
		value: "CreateByEmailEngagement",
        className:"add-by-email-engagement"
	},
];
export default Methods;
