import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  MenuItem,
  Paper,
  Grid,
  Autocomplete,
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function AddKaryawan() {
  const [form, setForm] = useState({
    id: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    nomor_telepon: "",
    jabatan: "",
    posisi: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.id ||
      !form.nama_lengkap ||
      !form.email ||
      !form.jabatan ||
      !form.posisi
    ) {
      setError("Semua field wajib diisi.");
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
        id: "",
        nama_lengkap: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        nomor_telepon: "",
        jabatan: "",
        posisi: "",
        email: "",
      });
    } catch {
      setError("Gagal menyimpan karyawan.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Tambah Karyawan
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tambahkan data karyawan baru ke sistem
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Form Karyawan Baru
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
            Masukkan informasi karyawan dengan lengkap
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  name="nama_lengkap"
                  value={form.nama_lengkap}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contoh@email.com"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nomor Telepon"
                  name="nomor_telepon"
                  value={form.nomor_telepon}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  freeSolo
                  options={["Manager", "Staff", "HRD"]}
                  value={form.jabatan}
                  onChange={(e, newValue) =>
                    setForm({ ...form, jabatan: newValue || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Jabatan"
                      name="jabatan"
                      onChange={handleChange}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  freeSolo
                  options={[
                    "Frontend Developer",
                    "Backend Developer",
                    "Marketing",
                  ]}
                  value={form.posisi}
                  onChange={(e, newValue) =>
                    setForm({ ...form, posisi: newValue || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Posisi"
                      name="posisi"
                      onChange={handleChange}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ID (Karyawan)"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  placeholder="IT001 / MKT001"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tanggal Lahir"
                  name="tanggal_lahir"
                  type="date"
                  value={form.tanggal_lahir}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  value={form.jenis_kelamin}
                  onChange={handleChange}
                >
                  <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                  <MenuItem value="Perempuan">Perempuan</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" color="inherit">
                Batal
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#2563eb" }}>
                Simpan
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
