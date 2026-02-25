import React ,{useState}from 'react';
import Sync from '@mui/icons-material/Sync';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link, } from 'react-router-dom';
import { Box ,Grid,Typography,Button,CircularProgress,Divider, Paper} from '@mui/material';
import ActionIcon from '../../../components/ActionIcon';


function AutomationReport() {
	const [loading, ] = useState(false);
    const sx={
        divider: {
			marginTop: 2,
			marginBottom: 3.15,
		},
        typoValue:{
          marginLeft:{
            xs:'2rem',
            md:'0rem'
          }
        }
    }
    return (
        <Box sx={{ cursor: 'default', width: '100%' }}>
            	<Grid container spacing={1}  >
					<Grid item md xs={12}>
						<Typography variant='h5' gutterBottom>
							Automation Report
						</Typography>
						<Typography variant='body1' color='textSecondary'>
							 My automation 1
						</Typography>
					</Grid>

					<Grid item md xs={12} align='right'>
						<ActionIcon
							color='primary'
							title='Sync'
							icon={<Sync />}
						/>

						<Button
							variant='contained'
							size='small'
							color='primary'
							disabled={loading}
              component={Link}
              to={"/automation/new"}
							startIcon={<AddCircle />}>
							Create Automation
							{loading ? (
								<CircularProgress
									size='20px'
									style={{ marginLeft: '8px', color: 'white' }}
								/>
							) : null}
						</Button>
					</Grid>
				</Grid>
                <Divider light sx={sx.divider} />
                <Grid container spacing={1} display={'flex'} justifyContent={'space-around'}>
                   <Box  sx={{padding:'1rem',width:'100%'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={1.5}>
                            <Typography variant='subtitle'>Subject Line</Typography>
                            <Typography sx={sx.typoValue}>subject</Typography>
                        </Grid>
                        <Grid item xs={12} md={1.5}>
                            <Typography variant='subtile'>Delay</Typography>
                            <Typography sx={sx.typoValue}>3 days</Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Typography variant='subtitle'>Sends</Typography>
                            <Typography sx={sx.typoValue}>10</Typography>
                        </Grid>
                       
                        <Grid item xs={12} md={1}>
                            <Typography variant='subtitle'>Clicks</Typography>
                            <Typography sx={sx.typoValue}>2</Typography>
                        </Grid>
                        <Grid item xs={12} md={1.5}>
                            <Typography variant='subtitle'>Opens</Typography>
                            <Typography sx={sx.typoValue}>0</Typography>
                        </Grid>
                        <Grid item xs={12} md={1.5}>
                            <Typography variant='subtitle'>Bounces</Typography>
                            <Typography sx={sx.typoValue}>3</Typography>
                        </Grid>
                        <Grid item xs={12} md={1.5}>
                            <Typography variant='subtitle'>Unsubscribed</Typography>
                            <Typography sx={sx.typoValue}>1</Typography>
                        </Grid>
                        <Grid item xs={12} md={1.5}>
                            <Typography variant='subtitle'>Complaints</Typography>
                            <Typography sx={sx.typoValue}>3</Typography>
                        </Grid>
                    </Grid>
                   </Box>
                </Grid>
        </Box>
    )
}

export default AutomationReport;