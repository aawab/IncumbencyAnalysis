import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import StateTab from './StateTab';
import DistrictTab from './DistrictTab';


function Sidebar() {
    const { store } = useContext(GlobalStoreContext);

    // CHANGE TAB ACCORDINGLY IN STORE
    function handleTabChange(event, newTab) 
	{
		store.setTab(newTab);
	}

    
    return (
        <Container sx={{paddingTop: "18px", backgroundColor: "#fafafa", width: 1, height: 1,
                        display: 'block', justifyContent: "center", top: "48px", zIndex: 1, 
                        background: "#0000", color: "#ddd"}}>
            <TabContext value = {store.tab}>
                <TabList aria-label='Sidebar Tabs' onChange={handleTabChange} centered variant="fullWidth" textColor='#514aac' >
                    <Tab 
                    sx={{fontSize:'18px', fontWeight: 'bold'}}
                    label={!store.currentState ? "State" : "State (" + store.currentState + ")"} value={1}/> 
                    <Tab
                    sx={{fontSize:'18px', fontWeight: 'bold'}} 
                    label={!store.currentDistrict ? "District" : "District (" + store.currentDistrict + ")"} value={2} disabled={!store.currentState}/>
                </TabList>
                <TabPanel value={1}> 
                    <StateTab/>                 
                </TabPanel>
                <TabPanel value={2}> 
                    <DistrictTab/>
                </TabPanel>
            </TabContext>
        </Container>
    );
}

export default Sidebar;