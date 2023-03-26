import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(trait, data2020, dataCurrentPlan) {
  return { trait, data2020, dataCurrentPlan };
}

// DUMMY DATA FOR DISTRICT DETAILS
const rows = [
  createData("Added Geometric Area (mi\u00B2)", 90, 90),
  createData("Removed Geometric Area (mi\u00B2)", 123, 135),
  createData("Common Geometric Area (mi\u00B2)", 4213, 4631),
  createData("Added Population", 4512, 5123),
  createData("Removed Population", 253, 212),
  createData("Common Population", 912367, 923456),
]

function DistrictTable() {
  const { store } = useContext(GlobalStoreContext);

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ 
        padding: 1
        }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "50%", fontWeight: 'bold'}} align="center"><span>Difference in: </span></TableCell>
            <TableCell sx={{width: "15%", fontWeight: 'bold'}} align="center"><span>2020</span></TableCell>
            <TableCell sx={{width: "15%", fontWeight: 'bold'}} align="center"><span>{store.currentPlan}</span></TableCell>
            <TableCell sx={{width: "20%", fontWeight: 'bold'}} align="center"><span>2020 → {store.currentPlan}</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={row.trait}
            >
              <TableCell component="th" scope="row" align="center">
                {row.trait}
              </TableCell>
              <TableCell align="center">{row.data2020}</TableCell>
              <TableCell align="center">{row.dataCurrentPlan}</TableCell>
              <TableCell align="center">
                <span style={ 
                  (Math.round((row.dataCurrentPlan - row.data2020) * 10) / 10) <= 0 ? {display: 'none'} : {display: 'visible'}}>
                  +
                </span>
                {row.dataCurrentPlan - row.data2020}
                {/* <span style={ 
                  (Math.round((row.dataCurrentPlan - row.data2020) * 10) / 10) > 0 ? {color: '#40fc00'} 
                  : (Math.round((row.dataCurrentPlan - row.data2020) * 10) / 10) < 0 ? {color: '#FF3131'}
                  : {color: 'white'}}>
                  {Math.round((row.dataCurrentPlan - row.data2020) * 10) / 10}
                </span> */}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DistrictTable;