import React,{useState,useMemo} from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { Input } from '../../../hooks/useForm/inputs';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import validators from '../../../hooks/useForm/validators';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import {
    Box,
    Button,
    Card,
    Divider,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
    Modal,
    Chip,
    IconButton,
    Switch,FormGroup, Container, Avatar, TextField, MenuItem, CardContent, Select,FormControl,InputLabel
} from '@mui/material';
import { Menu,useMenu } from '../../../hooks/useMenu';

function ContactListAutomationModal({open,closeModal}) {
    const {palette} = useTheme()
	const {background,text,primary} = palette
    const [addListOpen,setAddListOpen] = useState(false);
    const [viewContactOpen,setViewContactsOpen] = useState(false);
    const [selectedList,setSelectedList] = useState(null);
    const [trigger,setTrigger]  = useState(null);
	const { anchorEl, openMenu, closeMenu } = useMenu();
    const [contacts] = useState(["john@gmail.com","mark@gmail.com","bob@gmail.com"])

    const handleContactListSelection = (e)=>{
          setSelectedList(e.target.value);
    }
    const handleTrigger = (e)=>{
        setTrigger(e.target.value)
    }
    const handleViewContactClose = ()=>{
        setViewContactsOpen(false)
    }
    const handleViewContactModal = ()=>{
        closeMenu()
        setViewContactsOpen(true);
    }
    const handleAddListClose = ()=>[
        setAddListOpen(false)
    ]
    const handleAddListModal = ()=>{
        setAddListOpen(true)
    }
    
	const [contactList] = useState([
        {title:'my contact 1',users:['john@gmail.com','mark@gmail.com'],createdAt:'20 may 2023'},
        {title:'my contact 2',users:['john@gmail.com'],createdAt:'20 march 2023'},
        {title:'my contact 3',users:[],createdAt:'20 may 2023'},
    ])
    const [triggerText] = useState([
        {
            value:'addToList',
            title:"Send emails when contact is added to a list",
            body:"You can choose to send immediately or delay sending by several days from the time a subscriber has been added to your list. If you choose to send immediately, all contacts who have been added to your list within last 24 hours before activating your automation will also receive this email.",
            rest:'Use for welcome emails, sales pitch sequences, new customer surveys and more'
        },
        {
            value:'anniversaryBirthday',
            title:"Send birthday, anniversary and other annual emails",
            body:"Send annual messages based on a date field from your list details.",
            rest:"These emails send every year on a specified month and day so they're perfect for birthdays, anniversaries or any other annual occasion."
        },

        {
         value:'timed',
         title:"Send timed emails based on an exact date",
         body:"Send emails on an exact date or any number of days before or after a specified date based on a field from your list details.",
         rest:"Use for subscription or membership renewals, sale follow-ups, or any timed marketing campaigns."

        }
    ])
    const handlers = useForm(
        useMemo(
            ()=>({
              automationName:{required:true},
              automationDescription:{required:false},
              contactList:{required:true},
              fromName:{required:true},
              fromEmail:{required:true,validator:validators.email}
            }),
            []
        )
    )
   const sx = {
            avatar:{
                marginRight:1 ,color:'#ffff',backgroundColor:primary.main
            },
   }
   const renderDateSelect = (item,trigger)=>{
      if((trigger==="anniversaryBirthday"&&item.value==="anniversaryBirthday")||(trigger==="timed"&&item.value==="timed")){
        return(
            <Box marginY={'1.5rem'}>
            <Typography> Date Field</Typography>
            <FormControl fullWidth>
                    <InputLabel id="trigger-select">Select Date</InputLabel>
                        <Select sx={{width:'100%'}} label={"Select date"} labelId='trigger-select'>
                        <MenuItem value={1}>Date1</MenuItem>
                        <MenuItem value={2}>Date2</MenuItem>
                        </Select>
                    
            </FormControl>
        </Box>
        );
      }
   }

    return (
        <Modal
        open={open}
        onClose={closeModal}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            
        }}>
            <Container maxWidth='md' fixed style={{border:'none',outline:'none'}}>
                    <Card style={{ width:"100%",height:'85vh', padding: "32px",border:'none',overflow:'scroll',backgroundColor:background.default }} square>
                    
                    <Typography variant='h5' marginTop={'1rem'} marginBottom={'1rem'}> Create automation using contact list</Typography>
                    <Divider light marginTop={'1rem'}/>
                    <Form
                        handlers={handlers}>
                    <Grid container display={'flex'} spacing={1} marginY={'1.2rem'} >
                        <Grid item xs={12} md={4} >
                            <Chip label="Section " avatar={<Avatar sx={sx.avatar}>1</Avatar>} variant='outlined' />
                            <Typography variant='h6' marginTop={'.5rem'}>Automation Details</Typography>
                            <Typography variant='body' component={'p'} sx={{fontSize:'.7rem'}}>
                                This will only be seen by you and is used to organize your automations.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box >
                                    <Typography variant='subtitle3'>Automation Name</Typography>
                                    <Input
                                    type='text'
                                    variant='outlined'
                                    fullWidth
                                    style={{backgroundColor:background.default,color:text.secondary,width:'100%'}}
                                    name='automationName'/>
                            </Box>
                            <Box>
                                    <Typography variant='subtitle3'>Automation Description</Typography>
                                    <Input 
                                        type='text'
                                        variant='outlined'
                                        fullWidth
                                        style={{backgroundColor:background.default,color:text.secondary,width:'100%'}}
                                        name='automationDescription'/>
                            </Box>
                        </Grid>
                    </Grid>
                        <Divider light marginTop={'2rem'} marginBottom={'2rem'}/>
                    <Grid container display={'flex'} spacing={1} marginY={'1.2rem'}>
                            <Grid item xs={12} md={4}>
                                <Chip label="Section " avatar={<Avatar sx={sx.avatar}>2</Avatar>} variant='outlined' />
                                <Typography variant='h6' marginTop={'.5rem'}>Contact List Selection</Typography>
                            </Grid>
                            <Grid xs={12} md={8} sx={{marginLeft:{xs:'.5rem',md:'0rem'}}}>
                                <Box display={'flex'} justifyContent={'end'} sx={{placeItems:'center'}}>
                                    <Typography variant='subtitle3' marginRight={'.4rem'}> Add new list</Typography>
                                    <IconButton onClick={handleAddListModal}> <AddCircleIcon/></IconButton>
                                </Box>
                                <Box>
                                    <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={selectedList}
                                            onChange={handleContactListSelection}
                                        >
                                            {contactList.map((item,index)=>(
                                                <Box key={index} display={'flex'} justifyItems={'center'} justifyContent={'space-between'} marginBottom={'.7rem'}>
                                                    <Box>
                                                    <FormControlLabel value={item.title} control={<Radio  />} label={item.title} />
                                                        
                                                        <Typography variant="body2" component="div" style={{fontSize:'.6rem'}} color="textSecondary" paddingLeft={'1.8rem'}>
                                                        <b>Created: </b>{item.createdAt}
                                                        </Typography>
                                                    </Box>
                                                        <Typography variant='body' paddingTop={'.5rem'}>Contacts: {item.users.length}</Typography> 
                                                    <IconButton onClick={openMenu}><MoreHorizIcon/></IconButton>
                                                    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
                                                        <MenuItem onClick={handleViewContactModal}>View Contacts</MenuItem>
                                                    </Menu>
                                                </Box>
                                            ))}
                                    </RadioGroup>
                                </Box>
                            </Grid>
                    </Grid>
                        <Divider light marginTop={'2rem'} marginBottom={'2rem'}/>
                    <Grid container display={'flex'} spacing={1} marginY={'1.2rem'}>
                            <Grid item xs={12} md={4}>
                                <Chip label={`section `}  avatar={<Avatar sx={sx.avatar}>3</Avatar>}variant='outlined' />
                                <Typography variant='h6' marginTop={'.5rem'}>Trigger Selection</Typography>
                            </Grid>
                            <Grid xs={12} md={8} sx={{marginLeft:{xs:'.5rem',md:'0rem'}}}>
                                <Box>
                                    <RadioGroup
                                      value={trigger}
                                      onChange={handleTrigger}>
                                        {triggerText?.map((item,index)=>(
                                            <Box key={index}>
                                                <FormControlLabel value={item.value} control={<Radio/>} label={item.title} />
                                                <Card style={{backgroundColor:background.default,marginTop:'.5rem'}}>
                                                    <CardContent>
                                                    {item.body}
                                                    <Typography>{item.rest}</Typography>
                                                    {
                                                        renderDateSelect(item,trigger)
                                                    }
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        ))}
                                    </RadioGroup>
                                </Box>
                            </Grid>
                    </Grid>
                        <Divider light marginTop={'2rem'} marginBottom={'2rem'}/>
                    <Grid container display={'flex'} spacing={1} marginY={'1.2rem'}>
                            <Grid item xs={12} md={4}>
                                <Chip label="Section" avatar={<Avatar sx={sx.avatar}>4</Avatar>} variant='outlined' />
                                <Typography variant='h6' marginTop={'.5rem'} >Sequence Email Details</Typography>
                            </Grid>
                            <Grid xs={12} md={8} sx={{marginLeft:{xs:'.5rem',md:'0rem'}}}>
                                <Box >
                                    <Typography variant='subtitle3'>From Name</Typography>
                                    <Input
                                    type='text'
                                    variant='outlined'
                                    fullWidth
                                    style={{backgroundColor:background.default,color:text.secondary,width:'100%'}}
                                    name='fromName'/>
                                </Box>
                                <Box >
                                    <Typography variant='subtitle3'>From Email</Typography>
                                    <Input
                                    type='email'
                                    variant='outlined'
                                    fullWidth
                                    style={{backgroundColor:background.default,color:text.secondary,width:'100%'}}
                                    name='fromEmail'/>
                                </Box>
                                <Box>
                                <FormGroup>
                                        <FormControlLabel required control={<Switch />} label="Permission Reminder" />
                                        <FormControlLabel required control={<Switch />} label="Include webpage version link in email" />
                                </FormGroup>
                                </Box>
                            </Grid>
                    </Grid>
                        <Divider light marginTop={'2rem'} marginBottom={'2rem'}/>
                        <Grid item display={'flex'} justifyContent={'end'} marginTop={'1.9rem'}>
                            <Button variant='contained'>Save & Next</Button>
                        </Grid>
                        <AddContactListModal open={addListOpen} closeModal={handleAddListClose}/>
                        <ViewContactModal open={viewContactOpen} closeModal={handleViewContactClose} contacts={contacts}/>
                    </Form> 
                    </Card>
            </Container>
         
       </Modal>
    );
}

export default ContactListAutomationModal;

const AddContactListModal = ({open,closeModal})=>{
    const {palette} = useTheme()
	const {background,} = palette
   
    return(
        <Modal
        open={open}
        onClose={closeModal}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin:'2rem'
        }}>
             <Container maxWidth='md' fixed style={{border:'none',outline:'none'}}>
                <Card style={{ width:"90%", padding: "32px",backgroundColor:background.default,margin:'2rem' }} square>
                
                <Typography variant='h5' marginBottom={'1.5rem'}>Add new Contact List </Typography>
                <Divider light />
                <Box marginY={'1.5rem'}>
                    <TextField placeholder='New contact list name' fullWidth required sx={{backgroundColor:background.default}}/>
                </Box>
                <Box display={'flex'} justifyContent={'end'}>
                    <Button variant='contained'>Add</Button>
                </Box>     
                </Card>
            </Container>
    </Modal>
    )
}

const ViewContactModal = ({open,closeModal,contacts})=>{
    const {palette} = useTheme()
	const {background,} = palette
   
    return(
        <Modal
        open={open}
        onClose={closeModal}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
              <Container maxWidth='md' fixed style={{border:'none',outline:'none'}}> 
                    <Card style={{ width:"80%", padding: "16px",border:'none',backgroundColor:background.default,margin:'2rem' }} square>
                    <Box display={'flex'} justifyContent={"end"}>
                        <IconButton  onClick={closeModal}>
                             <CancelPresentationIcon />
                        </IconButton>
                    </Box>
                    <Typography variant='h5' marginBottom={'1.5rem'}>Contacts</Typography>
                    <Divider light/>
                    <Box marginY={'1rem'} style={{height:'100%',overflow:'scroll'}}>
                         {contacts?.map((item,index)=>(
                                     <Box>
                                         <Typography variant='subtitle' key={index} padding={'.5rem'}>{item}</Typography>
                                     </Box>   
                                ))}
                    </Box>     
                    </Card>
              </Container>
    </Modal>
    )
}
