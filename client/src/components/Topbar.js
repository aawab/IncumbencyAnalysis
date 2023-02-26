import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Topbar()
{
    const { store } = useContext(GlobalStoreContext);

    const handleChange = (event) => {
        store.setPlan(event.target.value);
    };

    const setPlan = (plan) =>{
        store.setPlan(plan);
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{bgcolor: '#00004f'}}>
                <IconButton onClick={()=>setPlan("2020")} disabled={store.currentPlan!="2020"}>
                    2020
                </IconButton>
                <IconButton onClick={()=>setPlan("2022")} disabled={store.currentPlan!="2022"}>
                    2022
                </IconButton>
                <Select
                    value={store.currentPlan}
                    label="Random District Plan"
                    onChange={handleChange}
                    style={{ marginRight: "auto" }}
                    >   
                    <MenuItem value={"Random_Plan_1"}>District Plan 1</MenuItem>
                    <MenuItem value={"Random_Plan_2"}>District Plan 2</MenuItem>
                    <MenuItem value={"Random_Plan_3"}>District Plan 3</MenuItem>    
                </Select>
                REDISTRICTING SIMULATOR
                <IconButton style={{ marginLeft: "auto" }}>
                <InfoIcon> </InfoIcon>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;