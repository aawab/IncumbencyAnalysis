import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { Box } from '@mui/system';
import './IncumbentSummary.css';

function IncumbentSummary(props) {
    const { store } = useContext(GlobalStoreContext);
    
    return (
        <div id = "incumbent-summary" >
            <Box>
                <b> Number of District Plans: </b> {props.numDistrictPlans} <br/> 
                <b> Number of Incumbents: </b> {props.numIncumbents} <br/>
                <b> Incumbents Predicted to Win: </b> {props.numIncumbentsPredictedWin} <br/>
                <b> Average Geographic Variation in Incumbent Districts: </b> {props.meanGeoVar} <br/>
                <b> Average Population Variation in Incumbent Districts: </b> {props.meanPopVar} <br/>
            </Box>
        </div>
    );
}

export default IncumbentSummary;