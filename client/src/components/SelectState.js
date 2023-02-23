import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectState() {

  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event) => {
    store.setState(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="select-state-label">State</InputLabel>
        <Select
          labelId="select-state-label"
          id="select-state"
          value={store.state}
          label="State"
          onChange={handleChange}
        >
          <MenuItem value={"AZ"}>Arizona</MenuItem>
          <MenuItem value={"CO"}>Colorado</MenuItem>
          <MenuItem value={"OH"}>Ohio</MenuItem>
        </Select>
      </FormControl>
  );
}