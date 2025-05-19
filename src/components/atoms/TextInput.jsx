import { TextField } from "@mui/material";

export default function TextInput({ label, name, value, onChange, multiline = false, rows = 1, type = "text" }) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      size="medium"
      type={type}
      placeholder={label}
      multiline={multiline}
      rows={rows}
      InputProps={{
        sx: { minHeight: 56, fontSize: 16 },
      }}
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
    />
  );
}
