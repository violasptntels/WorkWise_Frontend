import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Alert, Box,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function EditTugas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "", judul: "", deskripsi: "", karyawan_id: "",
    status: "", deadline: "", nama: "", email: "", posisi: ""
  });
  const [karyawanList, setKaryawanList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch data tugas by ID
  useEffect(() => {
    API.get(`/tugas/${id}`)
      .then(res => {
        setForm({ ...res.data, nama: "", email: "", posisi: "" });
      })
      .catch(() => setError("Gagal mengambil data tugas"));
  }, [id]);

  // Fetch karyawan
  useEffect(() => {
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.judul || !form.karyawan_id || !form.deadline || !form.status) {
      setError("Field wajib tidak boleh kosong.");
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
      setTimeout(() => navigate("/"), 1000);
    } catch {
      setError("Gagal update tugas.");
    }
  };

  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus tugas ini?")) {
      try {
        await API.delete(`/tugas/${id}`);
        alert("Tugas berhasil dihapus.");
        navigate("/");
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

        <Box component="form" onSubmit={handleUpdate}>
          <TextField fullWidth label="Judul Tugas" name="judul" value={form.judul} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} margin="normal" />

          <FormControl fullWidth margin="normal">
            <InputLabel>Karyawan</InputLabel>
            <Select
              name="karyawan_id"
              value={form.karyawan_id}
              onChange={e => {
                const selected = karyawanList.find(k => k.id === e.target.value);
                setForm({
                  ...form,
                  karyawan_id: e.target.value,
                  nama: selected?.nama_lengkap || "",
                  email: selected?.email || "",
                  posisi: selected?.posisi || ""
                });
              }}
              label="Karyawan"
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
          <TextField fullWidth label="Deadline (yyyy-mm-dd)" name="deadline" value={form.deadline} onChange={handleChange} margin="normal" />

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">Simpan</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Hapus</Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
