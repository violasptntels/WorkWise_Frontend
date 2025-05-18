import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function AddTugas() {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    karyawan_id: "",
    status: "",
    deadline: "",
    email: "",
    posisi: ""
  });

  const [karyawanList, setKaryawanList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch data karyawan saat pertama kali render
  useEffect(() => {
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, []);

  // Handle input form
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    const { judul, deskripsi, karyawan_id, status, deadline } = form;

    if (!judul || !deskripsi || !karyawan_id || !status || !deadline) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const dataToSend = {
        judul,
        deskripsi,
        karyawan_id,
        status,
        deadline
      };

      await API.post("/tugas", dataToSend);
      setSuccess("Tugas berhasil ditambahkan.");
      setForm({
        judul: "",
        deskripsi: "",
        karyawan_id: "",
        status: "",
        deadline: "",
        email: "",
        posisi: ""
      });
    } catch {
      setError("Gagal menyimpan tugas.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Tambah Tugas
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tambahkan tugas baru ke karyawan
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Form Tugas Baru
          </Typography>
          <Typography variant="body2" gutterBottom>
            Masukkan detail tugas yang akan diberikan
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Judul Tugas"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Deskripsi Tugas"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tenggat Waktu"
                  name="deadline"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.deadline}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={form.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Belum Dikerjakan">Belum Dikerjakan</MenuItem>
                    <MenuItem value="Sedang Dikerjakan">Sedang Dikerjakan</MenuItem>
                    <MenuItem value="Selesai">Selesai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Pilih Karyawan</InputLabel>
                  <Select
                    name="karyawan_id"
                    value={form.karyawan_id}
                    label="Pilih Karyawan"
                    onChange={e => {
                      const selectedID = e.target.value;
                      const selected = karyawanList.find(k => k.id === selectedID);
                      setForm({
                        ...form,
                        karyawan_id: selectedID,
                        email: selected?.email || "",
                        posisi: selected?.posisi || ""
                      });
                    }}
                  >
                    {karyawanList.map(karyawan => (
                      <MenuItem key={karyawan.id} value={karyawan.id}>
                        {karyawan.nama_lengkap} ({karyawan.posisi})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={form.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Posisi"
                  value={form.posisi}
                  disabled
                />
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="secondary">
                Batal
              </Button>
              <Button type="submit" variant="contained">
                Simpan
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
