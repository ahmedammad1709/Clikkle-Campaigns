import Add from "@mui/icons-material/Add";
// import Code from "@mui/icons-material/Code";
import TableChart from "@mui/icons-material/TableChart";

const Methods = [
	{
		method: "Add Manually",
		text: "Import your contacts using the add contacts from by filling out the common fields",
		icon: <Add />,
		value: "ADDMANUALLY",
		className: "add-manually",
	},
	// {
	// 	method: "JSON",
	// 	text: "Import your contacts using the JSON file, the file should only be in .json format",
	// 	icon: <Code />,
	// 	value: "JSON",
	// },
	{
		method: "CSV",
		text: "Import your contacts using the CSV file, the file should contain rows and columns",
		icon: <TableChart />,
		value: "CSV",
		className: "import-csv"
	},
];
export default Methods;
