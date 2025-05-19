import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField, Button, Typography, Alert, Box, MenuItem, Paper
} from "@mui/material";
import InputText from "../atoms/InputText";
import SelectInput from "../atoms/SelectInput";
import API from "../../services/api";

export default function EditKaryawanForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_lengkap: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    telepon: "",
    posisi: "",
    email: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    API.get(`/karyawan/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.nama_lengkap || !form.email || !form.posisi) {
      setError("Field wajib harus diisi.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    try {
      await API.put(`/karyawan/${id}`, form);
      setSuccess("Karyawan berhasil diperbarui.");
      setTimeout(() => navigate("/karyawan"), 1000);
    } catch {
      setError("Gagal update karyawan.");
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Edit Karyawan</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component={Paper} elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: "white" }}>
        <Box component="form" onSubmit={handleSubmit}>
            <MenuItem value="Laki-laki">Laki-laki</MenuItem>
            <MenuItem value="Perempuan">Perempuan</MenuItem>
          <TextField fullWidth label="Telepon" name="telepon" value={form.telepon} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Posisi" name="posisi" value={form.posisi} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} margin="normal" />

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">Simpan</Button>
            <Button variant="outlined" color="error" onClick={() => navigate("/karyawan")}>
              Batal
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
