import { TextField } from "@mui/material";

export default function DisabledTextInfo({ label, value }) {
  return (
    <TextField
      label={label}
      value={value}
      fullWidth
      disabled
      size="medium"
      InputProps={{
        sx: { minHeight: 56, fontSize: 16 },
      }}
    />
  );
}
