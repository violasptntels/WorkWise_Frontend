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
    karyawan_id: "",
  });
  const [karyawanList, setKaryawanList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID tugas tidak ditemukan.");
      return;
    }
    API.get(`/tugas/${id}`)
      .then(res => {
        setForm({
          judul: res.data.judul || "",
          deskripsi: res.data.deskripsi || "",
          status: res.data.status || "",
          deadline: res.data.deadline || "",
          karyawan_id: res.data.karyawan_id || "",
        });
      })
      .catch(() => setError("Gagal mengambil data tugas"));
    // Ambil daftar karyawan
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => setKaryawanList([]));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    // Validasi field wajib
    if (!form.judul || !form.deskripsi || !form.status || !form.deadline || !form.karyawan_id) {
      setError("Semua field wajib diisi.");
      return;
    }

    // Validasi format deadline (YYYY-MM-DD)
    const deadlineRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!deadlineRegex.test(form.deadline)) {
      setError("Format deadline harus YYYY-MM-DD.");
      return;
    }

    // Validasi status (harus sama persis dengan backend)
    const allowedStatus = ["Belum Dikerjakan", "Sedang Dikerjakan", "Selesai"];
    if (!allowedStatus.includes(form.status)) {
      setError("Status tidak valid.");
      return;
    }

    // Kirim data dengan tipe yang benar (karyawan_id dan id tugas sebagai string)
    const updateData = {
      judul: form.judul,
      deskripsi: form.deskripsi,
      status: form.status,
      deadline: form.deadline,
      karyawan_id: form.karyawan_id, // string
    };

    console.log("Data yang dikirim ke backend:", updateData);

    try {
      // pastikan id juga dikirim sebagai string pada endpoint
      const res = await API.put(`/tugas/${String(id)}`, updateData);
      console.log("Respon backend:", res.data);
      setSuccess("Tugas berhasil diperbarui.");
      setTimeout(() => navigate("/tugas"), 1000);
    } catch (err) {
      console.error("Edit tugas error:", err);
      if (err?.response?.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : JSON.stringify(err.response.data)
        );
      } else if (err?.response?.status === 500) {
        setError(
          "Terjadi kesalahan pada server (500). Silakan coba lagi nanti atau hubungi admin."
        );
      } else {
        setError(
          "Gagal update tugas. Pastikan data yang dimasukkan benar."
        );
      }
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
              select
              label="Karyawan"
              name="karyawan_id"
              value={form.karyawan_id}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="">Pilih Karyawan</MenuItem>
              {karyawanList.map(k => (
                <MenuItem key={k.id} value={k.id}>
                  {k.nama_lengkap} ({k.email})
                </MenuItem>
              ))}
            </TextField>
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