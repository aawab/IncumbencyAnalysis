import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function DistrictTable() {
  const { store } = useContext(GlobalStoreContext);

  let district = store.stateInfo.districts[store.currentDistrict-1]

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
          {district.detailChangeTable.map((row) => (
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
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DistrictTable;