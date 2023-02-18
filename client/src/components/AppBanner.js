import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

export default function AppBanner() {
    const { store } = useContext(GlobalStoreContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <Box component="img" sx={{
                        maxHeight: { xs: 100},
                        maxWidth: { xs: 200 },
                        }}
                    /> */}
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}