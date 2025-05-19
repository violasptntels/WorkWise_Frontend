import { TextField, MenuItem } from "@mui/material";

// Komponen atomik SelectInput, menerima options dan props lain
export default function SelectInput({ options = [], ...props }) {
  return (
    <TextField fullWidth select margin="normal" {...props}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
