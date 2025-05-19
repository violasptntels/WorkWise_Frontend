import { TextField } from "@mui/material";

export default function DateInput({ label, name, value, onChange }) {
  return (
    <TextField
      label={label}
      name={name}
      type="date"
      value={value}
      onChange={onChange}
      fullWidth
      size="medium"
      InputLabelProps={{ shrink: true }}
      InputProps={{
        sx: { minHeight: 56, fontSize: 16 },
      }}
    />
  );
}
