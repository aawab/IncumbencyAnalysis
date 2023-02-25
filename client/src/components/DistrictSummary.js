import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import { Box } from '@mui/system';

function DistrictSummary(props) {
    const { store } = useContext(GlobalStoreContext);
    
    return (
        <div id = "district-summary" >
            <Box>
                <b> Name of Representative, </b> Name here <br/> 
                <b> 2022 Election Results: </b> Info here <br/>
                <b> 2020 vs 2022 District Details: </b> <br/>
                Probably another table here
            </Box>
        </div>
    );
}

export default DistrictSummary;