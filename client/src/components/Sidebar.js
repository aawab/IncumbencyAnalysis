import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import './Sidebar.css';
import SelectCountry from './SelectCountry';
import { Container } from '@mui/system';

/*
    This toolbar is a functional React component that
    manages any buttons
    
*/
function Sidebar() {
    const { store } = useContext(GlobalStoreContext);
    
    return (
        <>
            <div className={store.sidebarOpen ? 'sidebar-menu active' : 'sidebar-menu'}>
                <Container sx={{paddingTop: "18px"}}>
                    {/* might need a grid here */}
                    <SelectCountry> </SelectCountry>
                </Container>
            </div>
        </>
    );
}

export default Sidebar;