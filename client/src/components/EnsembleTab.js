import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IncumbentTable from './IncumbentTable';
import BoxAndWhisker from './BoxAndWhisker';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

function EnsembleTab() {

  const { store } = useContext(GlobalStoreContext);

  return (
        <Container>
        <Box sx={{fontFamily:'Arial', fontSize: '11', marginTop: 2, marginBottom: 2, marginLeft: 37}}>
            <h1>Ensemble Summary Data</h1>
            <b> Number of District Plans: </b> {"use store.currentState to get nums"} <br/>
            <b> Number of Incumbents: </b> {"use store.currentState to get nums"} <br/>
            <b> Incumbents Predicted to Win: </b> {"use store.currentState to get nums"} <br/>
            <b> Average Geographic Variation in Incumbent Districts: </b> {"use store.currentState to get nums"} <br/>
            <b> Average Population Variation in Incumbent Districts: </b> {"use store.currentState to get nums"} <br/>
        </Box>
        <BoxAndWhisker></BoxAndWhisker>
        </Container>
  );

}

export default EnsembleTab;