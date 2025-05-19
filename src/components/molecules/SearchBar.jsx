import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      placeholder="Cari berdasarkan nama karyawan"
      value={value}
      onChange={onChange}
      sx={{
        width: "300px",
        '& .MuiInputBase-input': { color: 'white' },
        '& ::placeholder': { color: 'white', opacity: 1 },
        '& .MuiOutlinedInput-root': {
          borderColor: 'white',
          '& fieldset': { borderColor: 'white' },
          '&:hover fieldset': { borderColor: 'white' },
          '&.Mui-focused fieldset': { borderColor: 'white' },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: 'white' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
