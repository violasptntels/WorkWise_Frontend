import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Alert, Box, MenuItem
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function EditKaryawan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_lengkap: "", tanggal_lahir: "", jenis_kelamin: "",
    telepon: "", posisi: "", email: ""
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
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>Edit Karyawan</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
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

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">Simpan</Button>
            <Button variant="outlined" color="error" onClick={() => navigate("/karyawan")}>
              Batal
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
