import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 10,
    p: 2,
};

export default function FilterToolbar() {
    return (
        <Toolbar
            
        >
            <Box sx={style}>
                uwu move the district selection here, along with any filters we decide to implement
            </Box>
        </Toolbar>
    );
}