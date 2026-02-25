import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    InputBase,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import Typography from '../../../components/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useEffect, useState } from 'react';

import SubjectIcon from '@mui/icons-material/Subject';
import ConditionalLoading from '../../../components/ConditionalLoading';
import useHttpErrorHandler from '../../../utilities/httpErrorHandler';
import { useMessage } from '../../../components/Header';
import api from '../../../utilities/axios';

export default function MarketPlace() {
    const [marketplaceTemplates, setMarketplaceTemplates] = useState([]);
    const [search, setSearch] = useState('');
    const { showSuccess } = useMessage();

    const sx = {
        root: {
            cursor: 'default',
        },
        tabsRoot: {
            flexGrow: 1,
        },
        appBar: {
            background: 'inherit',
        },
        divider: {
            marginTop: 2,
            marginBottom: 3.15,
        },

        box: {
            marginTop: 3,
            border: ' 1px solid #626A76',
            padding: 4,
        },

        entriesText: {
            '& .MuiTypography-body1': {
                paddingLeft: 1,
            },
        },

        sortBy: {
            outlined: 'inherit',
            '& .MuiSelect-outlined.MuiSelect-outlined': {
                padding: (1.4, 4.5, 1.4, 1),
            },
            '& .MuiSelect-select.MuiSelect-select': {
                padding: (1.4, 4.5, 1.4, 1),
            },
        },

        list: {
            flexGrow: 1,
            width: '100%',
            paddingTop: '0',
        },
        listItem: {
            padding: '8px ',
            '& .MuiTypography-root': {
                fontSize: '14px',
            },
            '& .MuiListItemIcon-root': {
                minWidth: 0,
                marginRight: 2,
                '& svg': {
                    color: 'rgba(0, 0, 0, 0.3)',
                    fontSize: '1.5rem',
                },
            },
            '&:hover': {
                background: 'rgba(25, 118, 210, 0.12)',
            },
        },

        search: {
            position: 'relative',
            paddingLeft: 1,
            borderRadius: '10px',
            border: ' 1px solid #626A76',
            backgroundColor: 'inherit',
            '&:hover': {
                backgroundColor: 'inherit',
            },
            marginRight: 2,
            marginBottom: 1,
            marginLeft: 0,
            width: '100%',
        },
        searchIcon: {
            padding: (1, 1),
            height: '100%',
            position: 'absolute',

            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        inputInput: {
            padding: (1, 1, 1, 1),
            paddingLeft: `calc(1em + ${20}px)`,
            transition: 'ease',
            width: '100%',
        },

        // Entries Css
    };

    const httpErrorHandler = useHttpErrorHandler();

    const getMarketplace = useCallback(async () => {
        setMarketplaceTemplates(null);
        try {
            const response = await api.get( `/user/templates/for-sale?search=${search}`, {});
            //
            setMarketplaceTemplates(response.data.templates);
        } catch (e) {
            httpErrorHandler(e);
        }
    }, [search, httpErrorHandler]);

    const buyTemplate = async templateId => {
        try {
            const response = await api.post( `/user/templates/purchase`, { templateId });
            if (response.data.success) showSuccess('Successfully purchased');
        } catch (e) {
            httpErrorHandler(e);
        }
    };

    useEffect(() => {
        getMarketplace();
    }, [getMarketplace]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <Typography variant='h5' gutterBottom>
                    MarketPlace
                </Typography>
                <List component='nav' sx={sx.list}>
                    <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        style={{
                            fontWeight: '500',
                            marginBottom: '8px',
                            textAlign: 'left',
                        }}>
                        Categories
                    </Typography>

                    <ListItem button variant='NavListLight'>
                        <ListItemIcon>
                            <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText>All</ListItemText>
                    </ListItem>
                    <ListItem button variant='NavListLight'>
                        <ListItemIcon>
                            <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText>Ongoing</ListItemText>
                    </ListItem>
                    <ListItem button variant='NavListLight'>
                        <ListItemIcon>
                            <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText>Draft</ListItemText>
                    </ListItem>
                    <ListItem button variant='NavListLight'>
                        <ListItemIcon>
                            <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText>Completed</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
                <Box sx={sx.search}>
                    <IconButton sx={sx.searchIcon}>
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        placeholder='You can also search by all audiences.'
                        onChange={e => setSearch(e.target.value)}
                        sx={{
                            width: '100%',
                            input: sx.inputInput,
                        }}
                    />
                </Box>
                <>
                    <ConditionalLoading
                        condition={marketplaceTemplates}
                        style={{ margin: '15% 50% 0% 50%' }}>
                        <Grid
                            container
                            spacing={2}
                            style={{ marginTop: '16px', marginBottom: '8px' }}>
                            {marketplaceTemplates
                                ? marketplaceTemplates.map((item, i) => (
                                      <Grid item xs={12} sm={12} md={4} lg={3} activeKey={i}>
                                          <Card style={{ borderRadius: '8px' }}>
                                              <CardActionArea>
                                                  <CardMedia
                                                      style={{ height: '130px' }}
                                                      component='img'
                                                      image={item.cover}
                                                      title='randomImage'></CardMedia>

                                                  <CardContent style={{ padding: '16px' }}>
                                                      <Typography variant='subtitle1'>
                                                          {item.name}
                                                      </Typography>
                                                      <Typography variant='subtitle3'>
                                                          This is the caption of the card you can
                                                          use it to describe the contents
                                                      </Typography>
                                                  </CardContent>
                                              </CardActionArea>
                                              <CardActions
                                                  style={{
                                                      paddingRight: '16px',
                                                      paddingLeft: '16px',
                                                      paddingBottom: '16px',
                                                  }}>
                                                  <Typography variant='subtitle1' component='span'>
                                                      $
                                                  </Typography>
                                                  <Typography variant='h6' component='span'>
                                                      {item.price}
                                                  </Typography>

                                                  <Button
                                                      variant='contained'
                                                      color='primary'
                                                      size='small'
                                                      onClick={() => buyTemplate(item._id)}
                                                      style={{ marginLeft: 'auto' }}>
                                                      Buy
                                                  </Button>
                                              </CardActions>
                                          </Card>
                                      </Grid>
                                  ))
                                : null}
                        </Grid>
                    </ConditionalLoading>
                </>
            </Grid>
        </Grid>
    );
}
