import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import StateTab from './StateTab';
import DistrictTab from './DistrictTab';
import { Box } from '@mui/system';



function Sidebar() {
    const { store } = useContext(GlobalStoreContext);

    // CHANGE TAB ACCORDINGLY IN STORE
    function handleTabChange(event, newTab) 
	{
		store.setTab(newTab);
	}
    
    return (
        <Container sx={{backgroundColor: "#fafafa", width: 1, height: 1,
                        display: 'block', justifyContent: "center", zIndex: 1, 
                        background: "#0000", color: "black", borderRight: 12, borderColor: '#272727'
                    }}>
            <TabContext value = {store.tab}>
                <TabList aria-label='Sidebar Tabs' onChange={handleTabChange} centered variant="fullWidth" textColor='#514aac' >
                    <Tab 
                    sx={{fontSize:'18px', fontWeight: 'bold'}}
                    label={!store.currentState ? "State" : "State (" + store.currentState + ")"} value={1}/> 
                    <Tab
                    sx={{fontSize:'18px', fontWeight: 'bold'}} 
                    label={!store.currentDistrict ? "District" : "District (" + store.currentDistrict + ")"} value={2} disabled={!store.currentState}/>
                </TabList>
                <TabPanel value={1} sx={{maxHeight:'calc(100vh - 156px)', overflowY:'auto'}}> 
                    <StateTab/>                 
                </TabPanel>
                <TabPanel value={2} sx={{maxHeight:'calc(100vh - 156px)', overflowY:'auto'}}> 
                    <DistrictTab/>
                </TabPanel>
            </TabContext>
        </Container>
    );
}

export default Sidebar;