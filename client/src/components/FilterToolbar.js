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
        store.setPlan(plan, store.currentState);
    }

    // Fix interesting plans select
    let interestingPlan = ''
    if (store.currentPlan != "2020" && store.currentPlan != "2022")
    {
        interestingPlan = store.currentPlan
        console.log(interestingPlan)
    }

    return (
        <Toolbar sx={{ position: 'absolute', bottom: '0%', left: '50%', transform: 'translate(-50%,0)', background: '#CDCDCD', opacity: 0.8, boxShadow:2  }}
        >
            <IconButton onClick={() => setPlan("2020")} disabled={store.currentPlan == "2020"}>
                <h1 style={{fontSize:'85%'}}>2020</h1>
            </IconButton>
            <IconButton onClick={() => setPlan("2022")} disabled={store.currentPlan == "2022"}>
                <h1 style={{fontSize:'85%'}}>2022</h1>
            </IconButton>
            <FormControl style={{minWidth: 160, color:"white"}}>
                <InputLabel>Interesting Plans</InputLabel>
                    <Select 
                    value={interestingPlan}
                    label="Interesting Plans"
                    onChange={handleChange}
                    onOpen={()=>store.getPlansList()}
                    fullWidth>
                {
                    
                    store.plansList.map(function(item,i){
                        return <MenuItem key={i} value={item}>{item}</MenuItem>
                    })
                }
                    </Select>
            </FormControl>
        </Toolbar>
    );
}
