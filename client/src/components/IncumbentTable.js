import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from "@mui/material/TablePagination";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './IncumbentTable.css';

function createData(districtNum, incumbent, party, result, geoVar, popVar) {
  return { districtNum, incumbent, party, result, geoVar, popVar };
}

const rows = [
    // https://www.270towin.com/2020-house-election/states/ohio
  createData(1, "Steve Chabot", "R", "W", 0.9, 1.1),
  createData(2, "Androo", "D", "W", 0.8, 1.2),
  createData(3, "Steve Chabot", "R", "W", 0.9, 1.1),
  createData(4, "Androo", "D", "W", 0.8, 1.2),
  createData(5, "Steve Chabot", "R", "W", 0.9, 1.1),
  createData(6, "Androo", "D", "W", 0.8, 1.2),
  createData(7, "Steve Chabot", "R", "W", 0.9, 1.1),
  createData(8, "Androo", "D", "W", 0.8, 1.2),
  createData(9, "Steve Chabot Steve", "R", "W", 0.9, 1.1),
]

function IncumbentTable() {
  const [selectedDistrict, setDistrict] = useState(-1);
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  return (
    <>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ 
        padding: 1
        }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "5%"}} align="center"><span class="table-header">District</span></TableCell>
            <TableCell sx={{width: "45%"}} align="left"><span class="table-header">Incumbent</span></TableCell>
            <TableCell sx={{width: "5%"}} align="center"><span class="table-header">Result</span></TableCell>
            <TableCell sx={{width: "22.5%"}} align="center"><span class="table-header">Geo. Var</span></TableCell>
            <TableCell sx={{width: "22.5%"}} align="center"><span class="table-header">Pop. Var</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * 5, page * 5 + 5).map((row) => (
            <TableRow
              hover="true"
              onClick={() => setDistrict(row.districtNum)} 
              key={row.districtNum}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              selected={selectedDistrict == row.districtNum}
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
            page={page}
            onPageChange={handleChangePage}
    />
    </>
  );
}

export default IncumbentTable;