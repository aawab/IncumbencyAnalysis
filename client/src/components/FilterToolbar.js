import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Toolbar } from '@mui/material';

export default function FilterToolbar() {

    const { store } = useContext(GlobalStoreContext);

    const handleChange = (event) => {
        store.setPlan(event.target.value);
    };

    const setPlan = (plan) =>{
        store.setPlan(plan);
    }

    return (
        <Toolbar sx={{position:'fixed', bottom:'2%', left:'50%', transform: 'translate(-50%,0)', background: '#202124'}}
        >
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
                <MenuItem value={"Random_Plan_1"}>District Plan (Party Variation)</MenuItem>
                <MenuItem value={"Random_Plan_2"}>District Plan (Ethnicity Variation)</MenuItem>
                <MenuItem value={"Random_Plan_3"}>District Plan (Age Variation)</MenuItem>    
            </Select>
        </Toolbar>
    );
}