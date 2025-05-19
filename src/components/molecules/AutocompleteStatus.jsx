import { Autocomplete, TextField } from "@mui/material";

export default function AutocompleteStatus({ value, onChange }) {
  return (
    <Autocomplete
      options={["Belum Dikerjakan", "Sedang Dikerjakan", "Selesai"]}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Status"
          placeholder="Pilih status"
          fullWidth
          size="medium"
          InputProps={{
            ...params.InputProps,
            sx: { minHeight: 56, fontSize: 16 },
          }}
        />
      )}
      freeSolo
    />
  );
}
