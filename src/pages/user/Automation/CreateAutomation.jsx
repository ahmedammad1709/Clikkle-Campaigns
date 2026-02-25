import React, { createContext, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
    Modal,
    } from '@mui/material';
import Methods from '../../../services/automationMethod';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import ContactListAutomationModal from './ContactListAutomationModal';

const Function = createContext();

const sx = {
    divider: {
        marginTop: 2,
        marginBottom: 3.15,
    },
    topHeading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 15,
    },
    topCaption: {
        maxWidth: '600px',
        textAlign: 'center',
    },
    card: {
        padding: 2,
    },
    radio: {
        float: 'right',
        '& .MuiButtonBase-root': {
            padding: 0,
        },
    },
    continueBox: {
        marginTop: 3,
        marginBottom: 2,
    },
    button: {
        borderRadius: 0,
    },

    formControl: {
        width: '100%',
        mb: 1,
    },
    select01: {
        width: '100%',
        margin: (0, 2, 0, 0),
        '& .MuiOutlinedInput-input': {
            padding: 1.3,
            fontSize: '14px',
        },
    },
};

export default function CreateAutomation() {
    
    const [value, setValue] = useState('');
   // const [tourOpen,setTourOpen] = useState(false);
    const httpErrorHandler = useHttpErrorHandler();
     
    const [contactListModal,setContactListModal] = useState(false);
    const [emailModal,setEmailModal]  = useState(false);

    const handleOpenContactListModal = ()=>{
        setContactListModal(true);
    }
    const handleCloseContactListModal = ()=>{
        setContactListModal(false);
    }
    const handleOpenEmailModal = ()=>{
        setEmailModal(true);
    }
    const handleCloseEmailModal = ()=>{
        setEmailModal(false);
    }
    const handleChange = event => {
        setValue(event.target.value);
    };


    const Continue = () => {
        console.log(value)
        if(value==="CreateByContactList"){
            handleOpenContactListModal();
        }else{
            handleOpenEmailModal();
        }

    };
    
    return (
        <Function.Provider value={{ httpErrorHandler }}>
            <Box sx={{ width: '100%', cursor: 'default' }}>
            {/* {tourOpen && <GuidedTour steps={steps} open={tourOpen}/>} */}
                <Typography variant='h5' gutterBottom>
                Create New Automation
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                Select your automation type
                </Typography>

                <Divider light sx={sx.divider} />
                
                <RadioGroup value={value} onChange={handleChange}>
                    <Container maxWidth='lg'>
                        <Grid container spacing={4}>
                            {Methods.map((item, i) => (
                                <Grid item xs={12} key={i} className={item.className}>
                                    <Card variant='outlined' sx={sx.card}>
                                        <CardContent>
                                            {item.icon}
                                            <FormControlLabel
                                                value={item.value}
                                                control={<Radio />}
                                                sx={sx.radio}
                                            />
                                            <Typography
                                                variant='h6'
                                                style={{ marginTop: '16px' }}
                                                gutterBottom>
                                                {item.method}
                                            </Typography>
                                            <Typography variant='body1' align='justify'>
                                                {item.text}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Box align='right' sx={sx.continueBox}>
                            <Button variant='contained' color='secondary' onClick={Continue} className='continue'>
                                Continue
                            </Button>
                        </Box>
                    </Container>
                </RadioGroup>
                <ContactListAutomationModal open={contactListModal} closeModal={handleCloseContactListModal}/>
                <EmailEngagementAutomationModal open={emailModal} closeModal={handleCloseEmailModal}/>
            </Box>
        </Function.Provider>
    );
}

const EmailEngagementAutomationModal = ({open,closeModal})=>{
    return(
        <Modal
        open={open}
        onClose={closeModal}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Card style={{ width:"40%", padding: "32px",border:'none' }} square>
             
              <Typography>Email Engagement Automation Comming soon..</Typography>     
            </Card>
    </Modal>
    )
}
 