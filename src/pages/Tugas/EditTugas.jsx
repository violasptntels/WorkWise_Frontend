import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Alert, Box, Paper, MenuItem
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function EditTugas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    karyawan_id: "",
    status: "",
    deadline: "",
    nama_lengkap: "",
    email: "",
    posisi: "",
  });
  const [karyawanList, setKaryawanList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch data tugas by ID
  useEffect(() => {
    API.get(`/tugas/${id}`)
      .then(res => {
        setForm(prev => ({
          ...prev,
          ...res.data,
          nama_lengkap: res.data.nama_lengkap || "",
          email: res.data.email || "",
          posisi: res.data.posisi || "",
        }));
      })
      .catch(() => setError("Gagal mengambil data tugas"));
  }, [id]);

  // Fetch semua karyawan
  useEffect(() => {
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKaryawanChange = e => {
    const selected = karyawanList.find(k => k.id === e.target.value);
    setForm({
      ...form,
      karyawan_id: e.target.value,
      nama_lengkap: selected?.nama_lengkap || "",
      email: selected?.email || "",
      posisi: selected?.posisi || "",
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.judul || !form.karyawan_id || !form.deadline || !form.status) {
      setError("Field wajib tidak boleh kosong.");
      return;
    }
    if (form.email && !form.email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    try {
      const dataToSend = {
        judul: form.judul,
        deskripsi: form.deskripsi,
        karyawan_id: form.karyawan_id,
        status: form.status,
        deadline: form.deadline
      };
      await API.put(`/tugas/${id}`, dataToSend);
      setSuccess("Tugas berhasil diperbarui.");
      setTimeout(() => navigate("/tugas"), 1000);
    } catch {
      setError("Gagal update tugas.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Yakin ingin menghapus tugas ini?")) {
      try {
        await API.delete(`/tugas/${id}`);
        alert("Tugas berhasil dihapus.");
        navigate("/tugas");
      } catch {
        alert("Gagal menghapus tugas.");
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
              label="Karyawan"
              name="karyawan_id"
              value={form.karyawan_id}
              onChange={handleKaryawanChange}
              margin="normal"
            >
              {karyawanList.map(karyawan => (
                <MenuItem key={karyawan.id} value={karyawan.id}>
                  {karyawan.nama_lengkap} ({karyawan.posisi})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              disabled
              label="Nama Lengkap"
              value={form.nama_lengkap}
              margin="normal"
            />
            <TextField
              fullWidth
              disabled
              label="Email"
              value={form.email}
              margin="normal"
            />
            <TextField
              fullWidth
              disabled
              label="Posisi"
              value={form.posisi}
              margin="normal"
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
              <Button variant="outlined" color="inherit" onClick={() => navigate("/tugas")}>
                Batal
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>Hapus</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
