import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Toolbar } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function FilterToolbar() {

    const { store } = useContext(GlobalStoreContext);

    // SELECT PLAN FROM RANDOM PLAN SELECTOR
    const handleChange = (event) => {
        store.setPlan(event.target.value);
    };

    // SET PLAN FROM 2020 OR 2022 BUTTONS
    const setPlan = (plan) => {
        console.log(plan);
        store.setPlan(plan);
    }

    // RESET BUTTON
    const resetGUI = () => {
        store.reset();
    }

    return (
        <Toolbar sx={{ position: 'fixed', bottom: '2%', left: '50%', transform: 'translate(-50%,0)', background: '#202124', opacity: 0.8, boxShadow:2  }}
        >
            <IconButton onClick={() => setPlan("2020")} disabled={store.currentPlan == "2020"}>
                <h1 style={{fontSize:'85%'}}>2020</h1>
            </IconButton>
            <IconButton onClick={() => setPlan("2022")} disabled={store.currentPlan == "2022"}>
                <h1 style={{fontSize:'85%'}}>2022</h1>
            </IconButton>
            <FormControl style={{minWidth: 160}}>
                <InputLabel>Interesting Plans</InputLabel>
                    <Select 
                    value={store.currentPlan}
                    label="I"
                    onChange={handleChange}
                    onOpen={()=>store.getPlansList()}
                    fullWidth>
                {
                    store.plansList.map(function(item,i){
                        return <MenuItem key={i} value={"Random_Plan_"+i}>{item}</MenuItem>
                    })
                }
                    </Select>
            </FormControl>
            {/* <Select
                value={store.currentPlan}
                label="a"
                onChange={handleChange}
                // style={{ marginRight: "auto" }}
                onOpen={()=>store.getPlansList()}
            >
                {
                    store.plansList.map(function(item,i){
                        return <MenuItem key={i} value={"Random_Plan_"+i}>{item}</MenuItem>
                    })
                }
            </Select> */}
            <IconButton onClick={resetGUI} disabled={store.currentState==""}>
                <RestartAltIcon></RestartAltIcon> <h1 style={{fontSize:'80%'}}>RESET</h1>
            </IconButton>
        </Toolbar>
    );
}
