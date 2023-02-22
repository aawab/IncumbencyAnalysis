import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCountry() {

  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event) => {
    store.setCountry(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="select-country-label">Country</InputLabel>
        <Select
          labelId="select-country-label"
          id="select-country"
          value={store.country}
          label="Country"
          onChange={handleChange}
        >
          <MenuItem value={"AZ"}>Arizona</MenuItem>
          <MenuItem value={"CO"}>Colorado</MenuItem>
          <MenuItem value={"OH"}>Ohio</MenuItem>
        </Select>
      </FormControl>
  );
}