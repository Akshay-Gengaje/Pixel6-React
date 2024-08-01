import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const CountryOptions = () => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
    <InputLabel id="demo-select-small-label">Country</InputLabel>
    <Select
      labelId="demo-select-small-label"
      id="demo-select-small"
      // value={age}
      // onChange={handleChange}
      label="Country"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
  )
}

export default CountryOptions