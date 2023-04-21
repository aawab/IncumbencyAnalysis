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


function createData(districtNum, incumbent, party, result, geoVar, popVar, votePercentage) {
  return { districtNum, incumbent, party, result, geoVar, popVar, votePercentage };
}

function IncumbentTable() {
  const { store } = useContext(GlobalStoreContext);

  let rows = []

  rows = //interesting test data
  [
    createData(1, "Tom O'Halleran", "D", "W", 0.9, 1.1, "52%"),
    createData(2, "Ann Kirkpatrick", "D", "W",  0.8, 1.2, "67%"),
    createData(3, "Raul Grijalva", "D", "W", 0.6, 1.9, "51%"),
    createData(4, "Paul Gosar", "R", "L", 0.4, 1.2, "43%"),
    createData(5, "Andy Biggs", "R", "W",  0.6, 1.1, "52%"),
    createData(6, "David Schweikert", "R", "L", 0.7, 1.3, "35%"),
    createData(7, "Ruben Gallego", "D", "W", 1.1, 0.8, "57%"),
    createData(8, "Debbie Lesko", "R", "W", 0.7, 0.9, "85%"),
    createData(9, "Greg Stanton", "D", "W", 0.9, 0.6, "59%")
  ]

  // SETUP DATA ACCORDING TO PLAN AND STATE
  if (store.currentState == "Ohio")
  {
    if (store.currentPlan == "2020")
    {
      rows = 
      [
      createData(1, "Steve Chabot", "R", "W", 0.9, 1.1),
      createData(2, "Brad Wenstrup", "R", "W", 0.8, 1.2),
      createData(3, "Joyce Beatty", "D", "W", 0.6, 1.9),
      createData(4, "Jim Jordan", "R", "W", 0.4, 1.2),
      createData(5, "Bob Latta", "R", "W", 0.6, 1.1),
      createData(6, "Bill Johnson", "R", "W", 0.7, 1.3),
      createData(7, "Bob Gibbs", "R", "W", 1.1, 0.8),
      createData(8, "Warren Davidson", "R", "W", 0.7, 0.9),
      createData(9, "Marcy Kaptur", "D", "W", 0.9, 0.6),
      createData(10, "Michael Turner", "R", "W", 0.9, 1.1),
      createData(11, "Marcia Fudge", "D", "W", 1.2, 1.3),
      createData(12, "Troy Balderson", "R", "W", 1.3, 1.5),
      createData(13, "Tim Ryan", "D", "W", 0.8, 1.7),
      createData(14, "David Joyce", "R", "W", 0.8, 0.8),
      createData(15, "Steve Stivers", "R", "W", 0.7, 0.9),
      createData(16, "Anthony Gonzalez", "R", "W", 0.7, 0.9)
      ]
    }
    else if (store.currentPlan == "2022") //2022
    {
      rows = 
    [
    createData(1, "Steve Chabot", "R", "L", 0.9, 1.1),
    createData(2, "Brad Wenstrup", "R", "W", 0.8, 1.2),
    createData(3, "Joyce Beatty", "D", "W", 0.6, 1.9),
    createData(4, "Jim Jordan", "R", "W", 0.4, 1.2),
    createData(5, "Bob Latta", "R", "W", 0.6, 1.1),
    createData(6, "Bill Johnson", "R", "W", 0.7, 1.3),
    createData(7, "Bob Gibbs", "R", "W", 1.1, 0.8),
    createData(8, "Warren Davidson", "R", "W", 0.7, 0.9),
    createData(9, "Marcy Kaptur", "D", "W", 0.9, 0.6),
    createData(10, "Michael Turner", "R", "W", 0.9, 1.1),
    createData(11, "Shontel Brown", "D", "W", 1.2, 1.3),
    createData(12, "Troy Balderson", "R", "W", 1.3, 1.5),
    createData(13, "Anthony Gonzalez", "R", "L", 0.8, 1.7),
    createData(14, "David Joyce", "R", "W", 0.8, 0.8),
    createData(15, "Mike Carey", "R", "W", 0.7, 0.9)
    ]
    }
  }
  else if (store.currentState == "Arizona")
  {
    if (store.currentPlan == "2020")
    {
      rows =
      [
      createData(1, "Tom O'Halleran", "D", "W", 0.9, 1.1),
      createData(2, "Ann Kirkpatrick", "D", "W", 0.8, 1.2),
      createData(3, "Raul Grijalva", "D", "W", 0.6, 1.9),
      createData(4, "Paul Gosar", "R", "W", 0.4, 1.2),
      createData(5, "Andy Biggs", "R", "W", 0.6, 1.1),
      createData(6, "David Schweikert", "R", "W", 0.7, 1.3),
      createData(7, "Ruben Gallego", "D", "W", 1.1, 0.8),
      createData(8, "Debbie Lesko", "R", "W", 0.7, 0.9),
      createData(9, "Greg Stanton", "D", "W", 0.9, 0.6)
      ]
    }
    else if (store.currentPlan == "2022") //2022
    {
      rows =
    [
    createData(1, "David Schweikert", "R", "W", 0.9, 1.1),
    createData(2, "Tom O'Halleran", "D", "L", 0.8, 1.2),
    createData(3, "Ruben Gallego", "D", "W", 0.6, 1.9),
    createData(4, "Greg Stanton", "D", "W", 0.4, 1.2),
    createData(5, "Andy Biggs", "R", "W", 0.6, 1.1),
    createData(6, "Ann Kirkpatrick", "D", "L", 0.7, 1.3),
    createData(7, "Raul Grijalva", "D", "W", 1.1, 0.8),
    createData(8, "Debbie Lesko", "R", "W", 0.7, 0.9),
    createData(9, "Paul Gosar", "R", "W", 0.9, 0.6)
    ]
    }
  }
  else if (store.currentState == "Colorado")
  {
    if (store.currentPlan == "2020")
    {
      rows =
      [
      createData(1, "Diana DeGette", "D", "W", 0.9, 1.1),
      createData(2, "Joe Neguse", "D", "W", 0.8, 1.2),
      createData(3, "Scott Tipton", "R", "W", 0.6, 1.9),
      createData(4, "Ken Buck", "R", "W", 0.4, 1.2),
      createData(5, "Doug Lamborn", "R", "W", 0.6, 1.1),
      createData(6, "Jason Crow", "D", "W", 0.7, 1.3),
      createData(7, "Ed Perlmutter", "D", "W", 1.1, 0.8)
      ]
    }
    else if (store.currentPlan == "2022") //2022
    {
    rows =
    [
    createData(1, "Diana DeGette", "D", "W", 0.9, 1.1),
    createData(2, "Joe Neguse", "D", "W", 0.8, 1.2),
    createData(3, "Lauren Boebert", "R", "W", 0.6, 1.9),
    createData(4, "Ken Buck", "R", "W", 0.4, 1.2),
    createData(5, "Doug Lamborn", "R", "W", 0.6, 1.1),
    createData(6, "Jason Crow", "D", "W", 0.7, 1.3),
    createData(7, "Ed Perlmutter", "D", "W", 1.1, 0.8),
    createData(8, "Yadira Caraveo", "D", "W", 0.7, 0.9)
    ]
    }
  }

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
            <TableCell sx={{width: "5%", fontWeight: 'bold'}} align="center"><span>District</span></TableCell>
            <TableCell sx={{width: "45%", fontWeight: 'bold'}} align="left"><span>Incumbent</span></TableCell>
            <TableCell sx={{width: "5%", fontWeight: 'bold'}} align="center"><span>Result</span></TableCell>
            <TableCell sx={{width: "22.5%", fontWeight: 'bold'}} align="center"><span>Geo. Var</span></TableCell>
            <TableCell sx={{width: "22.5%", fontWeight: 'bold'}} align="center"><span>Pop. Var</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map((row) => (
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
              <TableCell align="left"><span className={ row.party == "R" ? "republican" : 'democrat'}>{row.incumbent}</span></TableCell>
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
            count={rows.length}
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
            <TableCell sx={{width: "5%", fontWeight: 'bold'}} align="center"><span>District</span></TableCell>
            <TableCell sx={{width: "45%", fontWeight: 'bold'}} align="left"><span>Incumbent</span></TableCell>
            <TableCell sx={{width: "2.5%", fontWeight: 'bold'}} align="center"><span>Estimated Result</span></TableCell>
            <TableCell sx={{width: "2.5%", fontWeight: 'bold'}} align="center"><span>Estimated Vote %</span></TableCell>
            <TableCell sx={{width: "22.5%", fontWeight: 'bold'}} align="center"><span>Geo. Var</span></TableCell>
            <TableCell sx={{width: "22.5%", fontWeight: 'bold'}} align="center"><span>Pop. Var</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map((row) => (
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
              <TableCell align="left"><span className={ row.party == "R" ? "republican" : 'democrat'}>{row.incumbent}</span></TableCell>
              <TableCell align="center">{row.result}</TableCell>
              <TableCell align="center">{row.votePercentage}</TableCell>
              <TableCell align="center">{row.geoVar}</TableCell>
              <TableCell align="center">{row.popVar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            component="div"
            count={rows.length}
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