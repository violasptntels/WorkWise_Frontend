import { Autocomplete, TextField } from "@mui/material";

export default function AutocompleteKaryawan({ value, onChange, options }) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        option.nama_lengkap ? `${option.nama_lengkap} (${option.posisi})` : ""
      }
      value={options.find((opt) => (opt.id || opt._id) === value) || null}
      onChange={onChange}
      isOptionEqualToValue={(option, value) =>
        (option.id || option._id) === (value?.id || value?._id)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Nama Karyawan"
          placeholder="Pilih karyawan"
          fullWidth
          size="medium"
          InputProps={{
            ...params.InputProps,
            sx: { minHeight: 56, fontSize: 16 },
          }}
        />
      )}
    />
  );
}
