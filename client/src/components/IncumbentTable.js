import { useContext, useEffect, useState, Fragment } from 'react';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AppBar, Toolbar } from '@mui/material';


function IncumbentTable() {
  const { store } = useContext(GlobalStoreContext);
  const [incumbentFilter, setIncumbentFilter] = useState(false)

  const toggle = () =>{
    setIncumbentFilter(!incumbentFilter);
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
  let data = store.stateInfo.districts
  let sample = []
  for (let item in data)
  {
    if (incumbentFilter)
    {
      if (data[item].incumbent.name == data[item].winner.name || data[item].incumbent.name == data[item].loser.name)
      {
        sample.push({districtNum: data[item].number, 
          detail:[
            {"candidate": data[item].winner.name, "result": "W", "incumbent": data[item].incumbent.name == data[item].winner.name, "party": data[item].winner.party}, 
          {"candidate": data[item].loser.name, "result": "L", "incumbent": data[item].incumbent.name == data[item].loser.name, "party": data[item].loser.party}
        ]})
      }
    }
    else
    {
      sample.push({districtNum: data[item].number, 
        detail:[
          {"candidate": data[item].winner.name, "result": "W", "incumbent": data[item].incumbent.name == data[item].winner.name, "party": data[item].winner.party}, 
        {"candidate": data[item].loser.name, "result": "L", "incumbent": data[item].incumbent.name == data[item].loser.name, "party": data[item].loser.party}
      ]})
    }
  }

  if (store.currentPlan == "2020" || store.currentPlan == "2022") //not an interesting plan
  {
    table =
    <Box>
              <AppBar position="static">
            <Toolbar sx={{bgcolor: '#0000'}}>
                <Box style={{ marginRight: "auto"}}>
                <h3>District Details</h3>
                </Box>
                <Box style={{marginLeft: 'auto'}}>
                  <FormControlLabel control={<Switch onChange={toggle} size="small"/>} label="Only incumbents"/>
                </Box>
            </Toolbar>
        </AppBar>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ padding: 1}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: "20%"}} align="center"><span>District</span></TableCell>
            <TableCell sx={{width: "60%"}} align="left"><span>Candidate</span></TableCell>
            <TableCell sx={{width: "10%"}} align="center"><span>Incumbent</span></TableCell>
            <TableCell sx={{width: "10%"}} align="center"><span>Result</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {sample.slice(store.currentIncumbentTablePage * 5, store.currentIncumbentTablePage * 5 + 5).map(row => (
        <Fragment>
            <TableRow
              hover={true}
              onClick={() => clickDistrict(row.districtNum)} 
              key={row.districtNum + row.detail.candidate}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              selected={store.currentDistrict == row.districtNum}
            >
            <TableCell rowSpan={row.detail.length + 1} component="th" scope="row" align="center">
              {row.districtNum}
            </TableCell>
          </TableRow>
          {row.detail.map(district => (
            <TableRow>
              <TableCell align="left"><span className={ district.party == "R" ? "republican" : district.party == "D" ? 'democrat': 'white'}>{district.candidate}</span></TableCell>
              <TableCell>{district.incumbent === true ? <CheckCircleIcon> </CheckCircleIcon> : ""}</TableCell>
              <TableCell>{district.result}</TableCell>
            </TableRow>
          ))}
        </Fragment>
      ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            component="div"
            count={sample.length}
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
            <TableCell sx={{width: "45%"}} align="left"><span>Candidate</span></TableCell>
            <TableCell sx={{width: "45%"}} align="left"><span>Incumbent</span></TableCell>
            <TableCell sx={{width: "2.5%"}} align="center"><span>Estimated Result</span></TableCell>
            <TableCell sx={{width: "2.5%"}} align="center"><span>Estimated Vote %</span></TableCell>
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