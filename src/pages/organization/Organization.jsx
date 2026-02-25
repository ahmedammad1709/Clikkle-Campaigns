import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import api from '../../utilities/axios';

const columns = [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true },
    { field: 'Email', headerName: 'Email', flex: 1, sortable: true },
    { field: 'Website', headerName: 'Website', flex: 1, sortable: true },
    { field: 'Address', headerName: 'Address', flex: 1, sortable: true },
    { field: 'Country', headerName: 'Country', flex: 1, sortable: true },
    { field: 'ZipCode', headerName: 'ZipCode', flex: 1, sortable: true },
    { field: 'City', headerName: 'City', flex: 1, sortable: true },
    { field: 'CompanyIndustry', headerName: 'CompanyIndustry', flex: 1, sortable: true },
];

const OrganizationList = () => {
    const navigate = useNavigate();
    const [organizationList, setOrganizationList] = useState([]);
    
    const getOrganizationList = async () => {
        try {
            const response = await api.get("/user/organizations", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                },
                withCredentials: true, // Optional, if backend uses cookies
            });
            setOrganizationList(response.data.organizations)
        } catch (err) {
            console.error("Error fetching user:", err.response?.data || err.message);
        }
    };

    const handleNavigation = () => {
        navigate('/');
    }


    useEffect(() => {
        getOrganizationList()
    }, [])
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-white p-8 overflow-auto">
            <div className="max-w-7xl mx-auto   p-6 rounded-2xl shadow-xl">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">Organization List</h1>
                <p className="text-gray-600 mb-6 text-lg">Total Organizations: {organizationList.length}</p>

                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={organizationList}
                        columns={columns}
                        getRowId={(row) => row._id} // ✅ THIS FIXES THE ERROR
                        pageSize={5}
                        onRowClick={handleNavigation}
                        rowsPerPageOptions={[5, 10]}
                        checkboxSelection={false}
                        disableSelectionOnClick
                        sortingOrder={['asc', 'desc']}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f3f4f6',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                fontSize: '1rem',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrganizationList;
