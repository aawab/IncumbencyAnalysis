import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import './Sidebar.css';
import SelectState from './SelectState';
import IncumbentTable from './IncumbentTable';
import { Container } from '@mui/system';
import IncumbentSummary from './IncumbentSummary';

/*
    This toolbar is a functional React component that
    manages any buttons
    
*/
function Sidebar() {
    const { store } = useContext(GlobalStoreContext);

    let data = ""
    
    if (store.state != "")
    {
        data = 
        <>
            <IncumbentSummary
				numDistrictPlans={12}
				numIncumbents={5}
                numIncumbentsPredictedWin={4}
                meanGeoVar={0.9}
                meanPopVar={1.1}/>
            <IncumbentTable></IncumbentTable> 
        </>
    }
    
    return (
        <>
            <div className={store.sidebarOpen ? 'sidebar-menu active' : 'sidebar-menu'}>
                <Container sx={{paddingTop: "18px"}}>
                    {/* might need a grid here */}
                    <SelectState/> 
                    {data}
                </Container>
            </div>
        </>
    );
}

export default Sidebar;