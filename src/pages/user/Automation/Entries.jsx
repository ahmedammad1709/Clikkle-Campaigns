import {
	Button,
	Card,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	Modal,
    Box
} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Typography from "../../../components/Typography";
import { Link } from "react-router-dom";
import { useMenu, Menu } from "../../../hooks/useMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import {  useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { makeStyles } from "@mui/styles";
import actionText from "../../../services/automationActionText";
const useStyles = makeStyles((theme) => ({
    modal: {
      '& .MuiPaper-root': {
        outline: 'none',
        border: 'none',
        // Add any other styles you want for the modal here
      },
    },
  }));
  
export default function Entries(props) {
	 
	const { item } = props;
    const {title,isActive,contactList,email} = item;
    const classes = useStyles();
	const { anchorEl, openMenu, closeMenu } = useMenu();
	const [open, setOpen] = useState(false);
	const [deleting] = useState(false);
    const [action,setAction] = useState(null);
    const [activeFiled] = useState(actionText.filter(item=>item.id!==1))
    const [inActiveFiled] = useState(actionText.filter(item=>item.id!==4))

	const openModal = (e,actionType) => {
        console.log(actionType)
        setAction(actionType)
        closeMenu();
		setOpen(true);
	};
    
	const closeModal = () => {
		setOpen(false);
	};

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12}  md={4} lg>
                    <Typography variant='h6' color="primary">{title}</Typography> 
					<Typography variant="body2" component="div" color="textSecondary">
						<b>Modified</b>: {"20 may 2023"}
					</Typography>
				 </Grid>
                 <Grid item xs={12} md={2} >
                   <Chip label={isActive?"Active":"Inactive"} color={isActive?"success":"error"} variant="outlined"/>
                 </Grid>
                 <Grid item xs={12} md={3} >
                    <Typography>{contactList}</Typography>
                 </Grid>
                 <Grid item xs={12} md={2.5} >
                    <Typography>{email}</Typography>
                 </Grid>
				<Grid item xs={12} md={.5} sx={{ my: 1 }} align="right">
					 
                    <IconButton onClick={openMenu} 
                            
							>
                      <MoreHorizIcon color="secondary"/>
                    </IconButton>
                    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
                        {isActive&& <MenuItem><Link to={`/automation/report`}>View Report</Link></MenuItem>}
                        {isActive?activeFiled?.map((item)=>(
                            <MenuItem key={item.id} onClick={(e)=>openModal(e,item)}> {item.action}</MenuItem>
                        )):inActiveFiled.map((item)=>(
                            <MenuItem key={item.id} onClick={(e)=>openModal(e,item)}> {item.action}</MenuItem>
                        ))
                        }
							
						</Menu>
				</Grid>
			</Grid>

			<Divider light sx={{ my: 2 }} />
			<Modal
				open={open}
				onClose={closeModal}
                className={classes.modal}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
					<Card style={{ width:"40%",minHeight:'16rem', padding: "32px",border:'none' }} square>
                    <Box display={'flex'} justifyContent={"end"}>
                        <IconButton  onClick={closeModal}>
                             <CancelPresentationIcon color="error"/>
                        </IconButton>
                    </Box>
						<Typography variant="h5" marginBottom={'2rem'} color="primary">{action?.title}</Typography>
                        <Typography variant="body" component="p">{action?.content}</Typography>
						<div style={{ marginTop: "3rem", float: "right" }}>
							<Button
								variant="secondary"
								onClick={closeModal}
								disableRipple
								disabled={deleting}>
								Cancel
							</Button>
							<Button
                                size="small"
								variant="contained"
								color="secondary"
								style={{ marginLeft: "16px" }}
								disabled={deleting}
								startIcon={action?.action==="delete"&&<DeleteIcon />}>
								{action?.action}
								{deleting ? (
									<CircularProgress
										size="20px"
										style={{ marginLeft: "8px", color: "white" }}
									/>
								) : null}
							</Button>
						</div>
					</Card>
			</Modal>
		</>
	);
}
