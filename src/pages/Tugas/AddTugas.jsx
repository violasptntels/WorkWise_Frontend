import { useState, useEffect } from "react";
import {
  Container, TextField, Button, Typography, Alert, Box,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";
import { Paper } from "@mui/material"; // tambahkan ini

export default function AddTugas() {
  const [form, setForm] = useState({
    id: "",
    judul: "",
    deskripsi: "",
    karyawan_id: "",
    status: "",
    deadline: "",
    nama: "",
    email: "",
    posisi: ""
  });

  const [karyawanList, setKaryawanList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch data karyawan
  useEffect(() => {
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, []);

  // Handle input form
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit tugas
  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.id || !form.judul || !form.karyawan_id || !form.deadline || !form.status) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const dataToSend = {
        id: form.id,
        judul: form.judul,
        deskripsi: form.deskripsi,
        karyawan_id: form.karyawan_id,
        status: form.status,
        deadline: form.deadline
      };

      await API.post("/tugas", dataToSend);
      setSuccess("Tugas berhasil ditambahkan.");
      setForm({
        id: "", judul: "", deskripsi: "", karyawan_id: "", status: "",
        deadline: "", nama: "", email: "", posisi: ""
      });
    } catch {
      setError("Gagal menyimpan tugas.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>
          Tambah Tugas
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Paper elevation={3} sx={{ p: 3, backgroundColor: "#fff" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="ID Tugas" name="id" value={form.id} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Judul Tugas" name="judul" value={form.judul} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} margin="normal" />

          <FormControl fullWidth margin="normal">
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
                  nama: selected?.nama_lengkap || "",
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

          <TextField fullWidth disabled label="Nama" value={form.nama} margin="normal" />
          <TextField fullWidth disabled label="Email" value={form.email} margin="normal" />
          <TextField fullWidth disabled label="Posisi" value={form.posisi} margin="normal" />

          <TextField fullWidth label="Status" name="status" value={form.status} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Deadline (YYYY-MM-DD)" name="deadline" value={form.deadline} onChange={handleChange} margin="normal" />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Simpan
          </Button>
        </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
