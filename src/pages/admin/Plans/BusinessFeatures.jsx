import { Card, Grid } from '@mui/material';
import React, { useContext } from 'react';
import Typography from '../../../components/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';

import { id } from './Plans';
import useHttpErrorHandler from './../../../utilities/httpErrorHandler';
import { useMessage } from '../../../components/Header';
import api from '../../../utilities/axios';

export default function BusinessFeatures(props) {
    const { showSuccess, showError } = useMessage();
    const { lite, plus, professional, enterprise, suiteName, section, suite } = props;
    const {
        lite: liteId,
        plus: plusId,
        professional: professionalId,
        enterprise: enterpriseId,
        getPlans,
    } = useContext(id);

    const onInputHandler = (e, index, id) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();
        const text = e.target.innerHTML;
        const name = `${section}.${suite}.${index}`;
        updatePlan(name, id, text);
    };
    const httpErrorHandler = useHttpErrorHandler();

    const lists = [
        { name: 'lite', list: lite, id: liteId },
        { name: 'plus', list: plus, id: plusId },
        { name: 'professional', list: professional, id: professionalId },
        { name: 'enterprise', list: enterprise, id: enterpriseId },
    ];

    const updatePlan = async (name, id, text) => {
        try {
            const response = await api.post(
                `/admin/plans/update`,
                { id, update: { [name]: text } },
                {}
            );
            if (response.data.success) {
                showSuccess(response.data.message);
            } else {
                showError(response.data.message);
            }
            setTimeout(() => {
                getPlans();
            }, 3000);
        } catch (e) {
            httpErrorHandler(e);
        }
    };
    return (
        <>
            <Card style={{ marginTop: '24px' }}>
                <Typography variant='h6' align='center' style={{ margin: '24px' }}>
                    {suiteName}
                </Typography>
            </Card>
            <Grid container spacing={2} style={{ marginTop: '8px' }}>
                {lists.map(list => (
                    <Grid item xs={12} sm={6} md={3} style={{ height: '100%' }}>
                        <Card
                            style={{
                                padding: '16px',
                                height: '100%',
                            }}>
                            {list.list.map((item, i) => (
                                <li
                                    style={{ listStyleType: 'none', padding: '12px' }}
                                    sx={{
                                        '&:hover .MuiSvgIcon-root': {
                                            display: 'inline',
                                        },
                                    }}>
                                    <CheckIcon style={{ paddingRight: '8px', height: '15px' }} />
                                    <span
                                        contentEditable
                                        onKeyPress={e => onInputHandler(e, i, list.id)}>
                                        {item}
                                    </span>
                                    <BorderColorIcon
                                        style={{ fontSize: '15px', float: 'right' }}
                                        sx={{ display: 'none' }}
                                    />
                                </li>
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
