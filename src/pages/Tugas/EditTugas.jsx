import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Alert, Box, MenuItem, Paper
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function EditTugas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    status: "",
    deadline: "",
  });
  const [original, setOriginal] = useState(null); // simpan data asli
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID tugas tidak ditemukan.");
      return;
    }
    API.get(`tugas/${id}`)
      .then(res => {
        setForm({
          judul: res.data.judul || "",
          deskripsi: res.data.deskripsi || "",
          status: res.data.status || "",
          deadline: res.data.deadline || "",
        });
        setOriginal(res.data); // simpan data asli
      })
      .catch(() => setError("Gagal mengambil data tugas"));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.judul && !form.deskripsi && !form.status && !form.deadline) {
      setError("Minimal satu field harus diubah.");
      return;
    }

    // Siapkan objek update hanya dengan field yang diubah
    const updateData = {};
    if (form.judul !== original?.judul) updateData.judul = form.judul;
    if (form.deskripsi !== original?.deskripsi) updateData.deskripsi = form.deskripsi;
    if (form.status !== original?.status) updateData.status = form.status;
    if (form.deadline !== original?.deadline) updateData.deadline = form.deadline;

    if (Object.keys(updateData).length === 0) {
      setError("Tidak ada perubahan data.");
      return;
    }

    try {
      await API.put(`tugas/${id}`, updateData);
      setSuccess("Tugas berhasil diperbarui.");
      setTimeout(() => navigate("/tugas"), 1000);
    } catch {
      setError("Gagal update tugas.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>Edit Tugas</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
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
              label="Deskripsi"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Belum Dikerjakan">Belum Dikerjakan</MenuItem>
              <MenuItem value="Sedang Dikerjakan">Sedang Dikerjakan</MenuItem>
              <MenuItem value="Selesai">Selesai</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained">Simpan</Button>
              <Button variant="outlined" color="error" onClick={() => navigate("/tugas")}>
                Batal
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}