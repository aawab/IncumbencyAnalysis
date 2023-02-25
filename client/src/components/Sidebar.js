import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import './Sidebar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SelectDistrict from './SelectDistrict';
import SelectState from './SelectState';
import IncumbentTable from './IncumbentTable';
import IncumbentSummary from './IncumbentSummary';
import Tab from '@mui/material/Tab';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import DistrictSummary from './DistrictSummary';


function Sidebar() {
    const { store } = useContext(GlobalStoreContext);

    function handleTabChange(event, newTab) 
	{
		store.setTab(newTab);
	}

    let data = ""
    
    if (store.state !== "")
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
        <div className={store.sidebarOpen ? 'sidebar-menu active' : 'sidebar-menu'}>
            <Container>
                <TabContext value = {store.tab}>
                    <Container>
                        <TabList aria-label='Sidebar Tabs' onChange={handleTabChange} centered variant="fullWidth">
                            <Tab label={!store.state ? "State" : "State (" + store.state + ")"} value={1}/> 
                            <Tab label="District" value={2} disabled={!store.state}/>
                            {/* <Tab label="Plan" value={3}/>  */}
                        </TabList>
                    </Container>
                    <TabPanel value={1}> 
                        <Container>
                            {/* might need a grid here */}
                            <SelectState/> 
                            {data}
                        </Container>                   
                    </TabPanel>
                    
                    <TabPanel value={2}> 
                         <Container>
                            <SelectDistrict/> 
                            <DistrictSummary/>
                        </Container>
                    </TabPanel>
                    {/* <TabPanel value={3}> 
                    
                    </TabPanel> */}
                </TabContext>
            </Container>
        </div>
    );
}

export default Sidebar;