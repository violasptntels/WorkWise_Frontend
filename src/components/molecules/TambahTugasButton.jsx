import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function TambahTugasButton() {
  return (
    <Button
      variant="contained"
      component={Link}
      to="/tugas/add"
      sx={{ textTransform: "none", borderRadius: "8px" }}
    >
      + Tambah Tugas
    </Button>
  );
}
