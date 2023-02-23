import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import './Sidebar.css';
import SelectState from './SelectState';
import IncumbentTable from './IncumbentTable';
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
                    <SelectState> </SelectState>
                    <IncumbentTable></IncumbentTable>
                </Container>
            </div>
        </>
    );
}

export default Sidebar;