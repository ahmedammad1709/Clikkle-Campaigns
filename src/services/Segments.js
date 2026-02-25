import { FormControl, MenuItem, TextField, Select } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { useState } from "react";

const InputField = styled(TextField)(({ theme }) => ({
	width: "200px",
	margin: theme.spacing(0, 2, 0, 0),
	"& .MuiOutlinedInput-input": {
		padding: theme.spacing(1.3),
	},
}));

let Segments = [
	{
		name: "address",
		label: "Address",
		options: [
			{
				name: "contains",
				field: <InputField variant="outlined" />,
				getFilters: contains,
			},
			{
				name: "does not contain",
				field: <InputField variant="outlined" />,
				getFilters: doesNotContains,
			},
			{ name: "is blank", field: null, getFilters: isBlank },
			{ name: "is not blank", field: null, getFilters: isNotBlank },
		],
	},
	{
		name: "birthday",
		label: "Birthday",
		options: [
			{
				name: "year is",
				field: <InputField type="number" variant="outlined" />,
				getFilters: yearIs,
			},
			{
				name: "month is",
				field: <InputField type="number" variant="outlined" />,
				getFilters: monthIs,
			},
			{
				name: "day is",
				field: <InputField variant="outlined" />,
				getFilters: dayIs,
			},
			{ name: "is blank", field: null, getFilters: isBlank },
			{ name: "is not blank", field: null, getFilters: isNotBlank },
		],
	},
	{
		name: "rating",
		label: "Contact rating",
		options: [
			{
				name: "is",
				field: <InputField type="number" variant="outlined" />,
				getFilters: is,
			},
			{
				name: "is not",
				field: <InputField type="number" variant="outlined" />,
				getFilters: isNot,
			},
			{
				name: "is greater than",
				field: <InputField type="number" variant="outlined" />,
				getFilters: isGreaterThan,
			},
			{
				name: "is less than",
				field: <InputField type="number" variant="outlined" />,
				getFilters: isLessThan,
			},
		],
	},
	{
		name: "email",
		label: "Email Address",
		options: [
			{
				name: "is",
				field: <InputField variant="outlined" />,
				getFilters: is,
			},
			{
				name: "is not",
				field: <InputField variant="outlined" />,
				getFilters: isNot,
			},
			{
				name: "contains",
				field: <InputField variant="outlined" />,
				getFilters: contains,
			},
			{
				name: "does not contain",
				field: <InputField variant="outlined" />,
				getFilters: doesNotContains,
			},
			{
				name: "starts with",
				field: <InputField variant="outlined" />,
				getFilters: startsWith,
			},
			{
				name: "ends with",
				field: <InputField variant="outlined" />,
				getFilters: endsWith,
			},
		],
	},
	{
		name: "engagement",
		label: "Email marketing engagement",
		options: [
			{
				name: "is",
				field: <SelectOptions options={["New", "Rarely", "Sometimes", "Often"]} />,
				getFilters: is,
			},
			{
				name: "is not",
				field: <SelectOptions options={["New", "Rarely", "Sometimes", "Often"]} />,
				getFilters: isNot,
			},
		],
	},
	{
		name: "subscribed",
		label: "Email marketing status",
		options: [
			{
				name: "is",
				field: <SelectOptions options={["Subscribed", "Unsubscribed"]} />,
				getFilters: isSubscribed,
			},
		],
	},
	{
		name: "firstName",
		label: "First Name",
		options: [
			{
				name: "is",
				field: <InputField variant="outlined" />,
				getFilters: is,
			},
			{
				name: "is not",
				field: <InputField variant="outlined" />,
				getFilters: isNot,
			},
			{
				name: "contains",
				field: <InputField variant="outlined" />,
				getFilters: contains,
			},
			{
				name: "does not contain",
				field: <InputField variant="outlined" />,
				getFilters: doesNotContains,
			},
			{
				name: "starts with",
				field: <InputField variant="outlined" />,
				getFilters: startsWith,
			},
			{
				name: "ends with",
				field: <InputField variant="outlined" />,
				getFilters: endsWith,
			},
			{
				name: "is blank",
				field: null,
				getFilters: isBlank,
			},
			{
				name: "is not blank",
				field: null,
				getFilters: isNotBlank,
			},
		],
	},
	{
		name: "lastName",
		label: "Last Name",
		options: [
			{
				name: "is",
				field: <InputField variant="outlined" />,
				getFilters: is,
			},
			{
				name: "is not",
				field: <InputField variant="outlined" />,
				getFilters: isNot,
			},
			{
				name: "contains",
				field: <InputField variant="outlined" />,
				getFilters: contains,
			},
			{
				name: "does not contain",
				field: <InputField variant="outlined" />,
				getFilters: doesNotContains,
			},
			{
				name: "starts with",
				field: <InputField variant="outlined" />,
				getFilters: startsWith,
			},
			{
				name: "ends with",
				field: <InputField variant="outlined" />,
				getFilters: endsWith,
			},
			{
				name: "is blank",
				field: null,
				getFilters: isBlank,
			},
			{
				name: "is not blank",
				field: null,
				getFilters: isNotBlank,
			},
		],
	},
	{
		name: "phone",
		label: "Phone Number",
		options: [
			{
				name: "is",
				field: <InputField variant="outlined" />,
				getFilters: is,
			},
			{
				name: "is not",
				field: <InputField variant="outlined" />,
				getFilters: isNot,
			},
			{
				name: "contains",
				field: <InputField variant="outlined" />,
				getFilters: contains,
			},
			{
				name: "does not contain",
				field: <InputField variant="outlined" />,
				getFilters: doesNotContains,
			},
			{
				name: "starts with",
				field: <InputField variant="outlined" />,
				getFilters: startsWith,
			},
			{
				name: "ends with",
				field: <InputField variant="outlined" />,
				getFilters: endsWith,
			},
			{
				name: "is blank",
				field: null,
				getFilters: isBlank,
			},
			{
				name: "is not blank",
				field: null,
				getFilters: isNotBlank,
			},
		],
	},
	// {
	//     name: "vipStatus",
	//     label: "VIP status",
	//     options: [
	//         {
	//             name: "is a VIP",
	//             field: <InputField  variant="outlined" />,
	//         },
	//         { name: "is not a VIP", field: <InputField  variant="outlined" /> },
	//     ],
	// },
];

function is(name, value) {
	return { [name]: { $regex: `^${value}$`, $options: "i" } };
}

function isNot(name, value) {
	return { [name]: { $not: { $regex: `^${value}$`, $options: "i" } } };
}

function contains(name, value) {
	return { [name]: { $regex: value, $options: "i" } };
}

function doesNotContains(name, value) {
	return { [name]: { $not: { $regex: value, $options: "i" } } };
}

function startsWith(name, value) {
	return { [name]: { $regex: `^${value}`, $options: "i" } };
}

function endsWith(name, value) {
	return { [name]: { $regex: `${value}$`, $options: "i" } };
}

function isBlank(name) {
	return { [name]: "" };
}

function isNotBlank(name) {
	return { [name]: { $ne: "" } };
}

function dayIs(name, value) {
	return { $expr: { $eq: [{ $dayOfMonth: `$${name}` }, value] } };
}

function monthIs(name, value) {
	return { $expr: { $eq: [{ $month: `$${name}` }, value] } };
}

function yearIs(name, value) {
	return { $expr: { $eq: [{ $year: `$${name}` }, value] } };
}

function isGreaterThan(name, value) {
	return { [name]: { $gt: value } };
}

function isLessThan(name, value) {
	return { [name]: { $lt: value } };
}

function isSubscribed(name, value) {
	return { [name]: value === "S" };
}

const useStyles = (theme) => ({
	select01: {
		width: "200px",
		margin: theme?.spacing(0, 2, 0, 0),
		"& .MuiOutlinedInput-input": {
			padding: theme?.spacing(1.3),
			fontSize: "14px",
		},
	},
});

function SelectOptions(props) {
	let { options } = props;
	const classes = useStyles();
	const [option, setOption] = useState(options?.[0])
	const onSelectHandler = e => {
		setOption(e.target.value);
	};

	console.log({ option })
	return (
		<FormControl>
			<Select
				value={option}
				variant="outlined"
				sx={{ minWidth: "150px" }}
				className={classes.select01}
				onChange={onSelectHandler}>
				{options.map((option, i) => (
					<MenuItem value={option[i]}>{option}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default Segments;
