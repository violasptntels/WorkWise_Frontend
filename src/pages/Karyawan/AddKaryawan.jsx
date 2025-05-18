import { useState } from "react";
import {
  Container, TextField, Button, Typography, Alert, Box, MenuItem
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";
import { Paper } from "@mui/material"; // tambahkan ini


export default function AddKaryawan() {
  const [form, setForm] = useState({
    id: "", nama_lengkap: "", tanggal_lahir: "", jenis_kelamin: "",
    telepon: "", posisi: "", email: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.id || !form.nama_lengkap || !form.email || !form.posisi) {
      setError("Field wajib harus diisi.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    try {
      await API.post("/karyawan", form);
      setSuccess("Karyawan berhasil ditambahkan.");
      setForm({
        id: "", nama_lengkap: "", tanggal_lahir: "", jenis_kelamin: "",
        telepon: "", posisi: "", email: ""
      });
    } catch {
      setError("Gagal menyimpan karyawan.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>Tambah Karyawan</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper elevation={3} sx={{ p: 3, backgroundColor: "#fff" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="ID" name="id" value={form.id} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Nama Lengkap" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Tanggal Lahir" name="tanggal_lahir" type="date" value={form.tanggal_lahir} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
          
          <TextField
            fullWidth select
            label="Jenis Kelamin"
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Laki-laki">Laki-laki</MenuItem>
            <MenuItem value="Perempuan">Perempuan</MenuItem>
          </TextField>

          <TextField fullWidth label="Telepon" name="telepon" value={form.telepon} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Posisi" name="posisi" value={form.posisi} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} margin="normal" />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Simpan
          </Button>
        </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
