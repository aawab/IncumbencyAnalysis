import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from "@mui/material/TablePagination";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';


function IncumbentTable() {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    if(store.currentDistrict === null)
    {
      store.setIncumbentTablePage(0)
    }
    else
    {
      store.setIncumbentTablePage(Math.floor((store.currentDistrict-1)/5))
    }
  }, [store.currentDistrict]);

  // CHANGE THE INCUMBENT TABLE PAGE
  const handleChangePage = (event, newPage) => {
    store.setIncumbentTablePage(newPage);
  };

  // SELECT A DISTRICT FROM TABLE AND SHOW DETAILS
  function clickDistrict(districtNum)
  {
    store.setDistrictAndChangeTab(districtNum)
  }

  let table = ""
  if (store.currentPlan == "2020" || store.currentPlan == "2022") //not an interesting plan
  {
    table =
    <Box>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ 
        padding: 1
        }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "5%"}} align="center"><span>District</span></TableCell>
            <TableCell sx={{width: "45%"}} align="left"><span>Incumbent</span></TableCell>
            <TableCell sx={{width: "5%"}} align="center"><span>Result</span></TableCell>
            <TableCell sx={{width: "22.5%"}} align="center"><span>Geo. Var</span></TableCell>
            <TableCell sx={{width: "22.5%"}} align="center"><span>Pop. Var</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.stateInfo.incumbentTable.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map((row) => (
            <TableRow
              hover={true}
              onClick={() => clickDistrict(row.districtNum)} 
              key={row.districtNum}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              selected={store.currentDistrict == row.districtNum}
            >
              <TableCell component="th" scope="row" align="center">
                {row.districtNum}
              </TableCell>
              <TableCell align="left"><span className={ row.party == "R" ? "republican" : row.party == "D" ? 'democrat': 'white'}>{row.incumbent}</span></TableCell>
              <TableCell align="center">{row.result}</TableCell>
              <TableCell align="center">{row.geoVar}</TableCell>
              <TableCell align="center">{row.popVar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            component="div"
            count={store.stateInfo.incumbentTable.length}
            rowsPerPage={5}
            rowsPerPageOptions={[]}
            page={store.currentIncumbentTablePage}
            onPageChange={handleChangePage}
    />
    </Box>
  }
  else //interesting plan
  {
    table =
    <Box>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ 
        padding: 1
        }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "5%"}} align="center"><span>District</span></TableCell>
            <TableCell sx={{width: "45%"}} align="left"><span>Incumbent</span></TableCell>
            <TableCell sx={{width: "2.5%"}} align="center"><span>Estimated Result</span></TableCell>
            <TableCell sx={{width: "2.5%"}} align="center"><span>Estimated Vote %</span></TableCell>
            <TableCell sx={{width: "22.5%"}} align="center"><span>Geo. Var</span></TableCell>
            <TableCell sx={{width: "22.5%"}} align="center"><span>Pop. Var</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.stateInfo.incumbentTable.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map((row) => (
            <TableRow
              hover={true}
              onClick={() => clickDistrict(row.districtNum)} 
              key={row.districtNum}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              selected={store.currentDistrict == row.districtNum}
            >
              <TableCell component="th" scope="row" align="center">
                {row.districtNum}
              </TableCell>
              <TableCell align="left"><span className={ row.party == "R" ? "republican" : row.party == "D" ? 'democrat': 'white'}>{row.incumbent}</span></TableCell>
              <TableCell align="center">{row.result}</TableCell>
              <TableCell align="center">{row.estVotePercentage}</TableCell>
              <TableCell align="center">{row.geoVar}</TableCell>
              <TableCell align="center">{row.popVar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            component="div"
            count={store.stateInfo.incumbentTable.length}
            rowsPerPage={5}
            rowsPerPageOptions={[]}
            page={store.currentIncumbentTablePage}
            onPageChange={handleChangePage}
    />
    </Box>
  }
  
  return (
    <>
      {table}
    </>
  );
}

export default IncumbentTable;