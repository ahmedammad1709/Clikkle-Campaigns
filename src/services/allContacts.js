
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ActionIcon from '../components/ActionIcon';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import api from '../utilities/axios';

export const columns = [
	{
		field: 'subscribed',
		headerName: 'Actions',
		width: '100',
		renderCell: (params) => {
			return (
				<>
					<ActionIcon
						title={params.value ? 'Subscribed' : 'Unsubscribed'}
						style={{ padding: '8px' }}
						icon={
							<FiberManualRecordIcon
								fontSize='small'
								style={{ color: params.value ? '#74b54d' : '#cf3737' }}
							/>
						}
					/>
					<ActionIcon
						color='primary'
						style={{ padding: '8px' }}
						component={Link}
						to={`/contact/edit/${params.row._id}`}
						title='Edit'
						icon={<Edit fontSize='small' />}
					/>
				</>
			);
		},
	},
	{ field: 'companyName', headerName: 'Company Name', width: '150' },
	{ field: 'address', headerName: 'Address', width: '150' },
	{ field: 'city', headerName: 'City', width: '150' },
	{ field: 'state', headerName: 'State', width: '150' },
	{ field: 'country', headerName: 'Country', width: '150' },
	{ field: 'zipCode', headerName: 'Zip Code', width: '150' },
	{ field: 'faxNumber', headerName: 'Fax Number', width: '150' },
	{ field: 'sicCode', headerName: 'SIC Code', width: '150' },
	{ field: 'sicDescription', headerName: 'SIC Description', width: '150' },
	{ field: 'phone', headerName: 'Phone', width: '150' },
	{ field: 'webAddress', headerName: 'Web Address', width: '150' },
	{ field: 'firstName', headerName: 'First Name', width: '150' },
	{ field: 'lastName', headerName: 'Last Name', width: '150' },
	{ field: 'email', headerName: 'Email', width: '130' },
	{ field: 'source', headerName: 'Source', width: '130' },
	{ field: 'engagement', headerName: 'Engagement', width: '130' },
	{ field: 'rating', headerName: 'Rating', width: '130' },
	{ field: 'dateAdded', headerName: 'Date Added', width: '130' },
	{ field: 'birthday', headerName: 'Birthday', width: '130' },
	{
		field: 'tags',
		headerName: 'Tags',
		width: '130',
		renderCell: (params) => {
			return params.value.map((tag) => tag.name).join(', ');
		},
	},
	{ field: 'lastChanged', headerName: 'Last Changed', width: '130' },
];

export async function getRows(page, size, filter, engagement, source) {
	try {
		const response = await api.get(
			 `/user/contacts?page=${page}&pageSize=${size}${filter && '&_subscribed=' + filter
			}${engagement && '&engagement=' + engagement}${source && '&source=' + source
			}`,
			{}
		);
		// response.data.data._id;
		response.data.contacts = createRows(response.data.contacts);
		// console.log(response.data.contacts);
		return response.data;
	} catch (err) { }
}

export const createRows = (contacts) =>
	contacts.map((contact, index) => ({
		...contact,
		id: index,
		dateAdded: new Date(contact.dateAdded).toLocaleDateString(),
	}));
