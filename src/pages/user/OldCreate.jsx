import React from 'react';
import {
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	Avatar,
	Chip,
	Paper,
} from '@mui/material';

import { Link } from 'react-router-dom';
import Typography from '../../components/Typography';
import { useTheme } from '@mui/material/styles';
export default function Create() {

    const {palette} = useTheme();
    const {background,primary} = palette

	// const [tourOpen,setTourOpen] = useState(null)
	// const navigation = useNavigate();
	// const handleNavigation = ()=>{
	//     setTimeout(()=>{
	//         navigation('/contacts/all')
	//     },2000)
	// }
	// const steps = [
	// 	{
	// 		selector: '.contacts',
	// 		content: () => (
	// 		  <div>
	// 			<h3>Welcome! Campaigns Dashboard </h3>
	// 			{/* {handleNavigation()} */}
	// 			<p> now to create Contacts click on create button</p>
	// 		  </div>
	// 		),
	// 	  },
	//   ];

	const sx = {
		divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
		cardPara: {
			marginTop: 1,
		},
		link: {
			textDecoration: 'none',
		},
	};

	// useEffect(() => {
	//     setTourOpen(localStorage.getItem('tourOpen')==='true')
	// }, [ ]);

	return (
		<Box sx={sx.root}>
			{/* {tourOpen &&<GuidedTour steps={steps} open={tourOpen}/>} */}
			<Grid container spacing={3} sx={sx.titleGrid}>
				<Grid item xs>
					<Typography variant='h5' gutterBottom>
						Create
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						Great innovation always starts with small steps
					</Typography>
				</Grid>
			</Grid>
			<Divider light sx={sx.divider} />

            <Grid
                container
                spacing={6}
                display={'flex'}
                justifyContent={'center'}
                alignItems="stretch"
                sx={{
                    ".MuiPaper-root": {
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        ".MuiCardContent-root": { flexGrow: 1 },
                    },
                }}>
                    <Grid item xs={4} sm={5} md={4}>
                        <Stack>
                            <Chip label="start"  sx={{width:'90px',}} />
                            <Box style={{height:'20px',width:'15px',backgroundColor:background.default,marginLeft:5,marginTop:'.5rem'}}></Box>
                            <Box display={'flex'} marginY={'.5rem'}>
                                <Avatar  sx={{ width: 30, height: 30,marginRight:1 ,color:'#ffff',backgroundColor:primary.main}}>
                                    1
                                </Avatar>
                                <Chip label="Add Contacts" variant="outlined"  />
                            </Box>
                           <Box style={{height:'290px',width:'15px',backgroundColor:background.default,marginLeft:5}}></Box>
                           <Box display={'flex '} marginY={'.5rem'}>
                                 <Avatar  sx={{ width: 30, height: 30,marginRight:1 ,color:'#ffff',backgroundColor:primary.main}}>
                                    2
                                </Avatar>
                                <Chip label="Create Campaign and Design the Newsletter" variant="outlined"  />
                                <Typography></Typography>
                           </Box>
                           <Box style={{height:'270px',width:'15px',backgroundColor:background.default,marginLeft:5}}></Box>
                           <Box display={'flex'} marginY={'.5rem'}>
                                  <Avatar  sx={{ width: 30, height: 30,marginRight:1,color:'#ffff' ,backgroundColor:primary.main}}>
                                    3
                                </Avatar>
                                <Chip label="Performing the AB Split testing" variant="outlined"  />
                           </Box>
                           <Box style={{height:'270px',width:'15px',backgroundColor:background.default,marginLeft:5}}></Box>

                           <Box display={'flex'} marginY={'.5rem'}>
                                  <Avatar  sx={{ width: 30, height: 30,marginRight:1 ,color:'#ffff',backgroundColor:primary.main}}>
                                    4
                                </Avatar>
                                <Chip label="Sending the Actual Campaign" variant="outlined"  />
                           </Box>
                           <Box style={{height:'280px',width:'15px',backgroundColor:background.default,marginLeft:5}}></Box>
                           <Box display={'flex'} marginY={'.5rem'}>
                                  <Avatar  sx={{ width: 30, height: 30,marginRight:1 ,color:'#ffff',backgroundColor:primary.main}}>
                                    5
                                </Avatar>
                                <Chip label="Monitoring the Campaigns" variant="outlined"  />
                           </Box>
                           <Box style={{height:'210px',width:'15px',backgroundColor:background.default,marginLeft:5,marginBottom:'.5rem'}}></Box>
                            <Chip label="End"  sx={{width:'90px',}} />
                        </Stack>
                         
                    </Grid>
                      <Grid item xs={8} sm={7} md={8}>
                            <Stack>
                                    <Grid item  xs={12} md={7} marginTop={'4.7rem'}>
                                                    <Box elevation={2} sx={{padding:'1rem'}}>
                                                            <Box display={'flex'} justifyContent={'center'} marginBottom={'1rem'} >
                                                            <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/images/contacts.jpg"
                                                                        sx={{ width: 56, height: 56 }}
                                                                        />
                                                            </Box>
                                                            
                                                            <Button
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    component={Link}
                                                                    to="/contacts/all">
                                                                    Add Contacts
                                                            </Button>
                                                            <Typography variant='h6' component='h6'>Contacts</Typography>
                                                            <Typography variant="subtitle2" component="p" sx={sx.cardPara}>
                                                        Add one or more contacts as campaign members. To add a single
                                                        campaign member, choose Add to Campaign from the Actions menu next
                                                        to the contact.
                                                    </Typography>
                                                    </Box>
                                    </Grid>
                                    <Grid item  xs={12} md={7} marginTop={'5rem'}>
                                                    <Box elevation={2} sx={{padding:'1rem'}}>
                                                            <Box display={'flex'} justifyContent={'center'} paddingBottom={'1rem'}>
                                                            <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/images/campaigns.png"
                                                                        sx={{ width: 56, height: 56 }}
                                                                        />
                                                            </Box>
                                                            
                                                            <Button
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    component={Link}
                                                                    to="/campaigns/all">
                                                                    Create Campaign
                                                            </Button>
                                                            <Typography variant='h6' component='h6'>Campaigns</Typography>
                                                            <Typography variant="subtitle2" component="p" sx={sx.cardPara}>
                                                            Marketing campaigns promote products through different types of
                                                    media, such as television, radio, print, and online platforms
                                                    </Typography>
                                                    </Box>
                                    </Grid>
                                    <Grid item  xs={12} md={7} marginTop={'5rem'}>
                                                    <Box elevation={2} sx={{padding:'1rem'}}>
                                                            <Box display={'flex'} justifyContent={'center'} paddingBottom={'1rem'}>
                                                            <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/images/email.jpg"
                                                                        sx={{ width: 56, height: 56 }}
                                                                        />
                                                            </Box>
                                                            
                                                            <Button
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    component={Link}
                                                                    to="/contacts/all">
                                                                    Create Emails Templates
                                                            </Button>
                                                            <Typography variant='h6' component='h6'> Email Templates</Typography>
                                                            <Typography variant="subtitle2" component="p" sx={sx.cardPara}>
                                                            Marketing is all about making each customer feel special, so improve
                                                    your email campaigns with a human touch.
                                                    </Typography>
                                                    </Box>
                                    </Grid>
                                    <Grid item  xs={12} md={7} marginTop={'5rem'}>
                                                    <Box elevation={2} sx={{padding:'1rem'}}>
                                                            <Box display={'flex'} justifyContent={'center'} paddingBottom={'1rem'}>
                                                            <Avatar
                                                                        alt="Signup Forms"
                                                                        src="/images/form.png"
                                                                        sx={{ width: 56, height: 56 }}
                                                                        />
                                                            </Box>
                                                            
                                                            <Button
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    component={Link}
                                                                    to="/contacts/all">
                                                                    Crete Signup forms
                                                            </Button>
                                                            <Typography variant='h6' component='h6'>Subscription Form</Typography>
                                                            <Typography variant="subtitle2" component="p" sx={sx.cardPara}>
                                                            Turn visitors into valuable leads and automate their customer
                                                    experience. Through forms across your website, you can gather
                                                    crucial information from visitors ...
                                                    </Typography>
                                                    </Box>
                                    </Grid>
                                    <Grid item  xs={12} md={7} marginTop={'5rem'}>
                                                    <Box elevation={2} sx={{padding:'1rem'}}>
                                                            <Box display={'flex'} justifyContent={'center'} paddingBottom={'1rem'}>
                                                            <Avatar
                                                                        alt="Monitoring"
                                                                        src="/images/contact.jpg"
                                                                        sx={{ width: 56, height: 56 }}
                                                                        />
                                                            </Box>
                                                            
                                                            <Button
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    component={Link}
                                                                    to="/contacts/all">
                                                                    Monitoring
                                                            </Button>
                                                            <Typography variant='h6' component='h6'>Monitoring the Campaigns</Typography>
                                                            <Typography variant="subtitle2" component="p" sx={sx.cardPara}>
                                                        Up comming .....
                                                    </Typography>
                                                    </Box>
                                    </Grid>
                            </Stack>
                    </Grid>  
               
            </Grid>
        </Box>
    );
}
