import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Toolbar } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function FilterToolbar() {

    const { store } = useContext(GlobalStoreContext);

    const handleChange = (event) => {
        store.setPlan(event.target.value);
    };

    const setPlan = (plan) => {
        console.log(plan);
        store.setPlan(plan);
    }

    const resetGUI = () => {
        store.reset();
    }

    return (
        <Toolbar sx={{ position: 'fixed', bottom: '2%', left: '50%', transform: 'translate(-50%,0)', background: '#202124', opacity: 0.8 }}
        >
            <IconButton onClick={() => setPlan("2020")} disabled={store.currentPlan == "2020"}>
                <h1 style={{fontSize:'85%'}}>2020</h1>
            </IconButton>
            <IconButton onClick={() => setPlan("2022")} disabled={store.currentPlan == "2022"}>
                <h1 style={{fontSize:'85%'}}>2022</h1>
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
            <IconButton onClick={resetGUI} disabled={store.currentState==""}>
                <RestartAltIcon></RestartAltIcon> <h1 style={{fontSize:'80%'}}>RESET</h1>
            </IconButton>
        </Toolbar>
    );
}
