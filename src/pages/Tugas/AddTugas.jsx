import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Paper,
  Grid,
  Autocomplete,
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function AddTugas() {
  const [form, setForm] = useState({
    _id: "", // disesuaikan dengan backend
    judul: "",
    deskripsi: "",
    karyawan_id: "",
    status: "",
    deadline: "",
    email: "",
    posisi: "",
    nama_lengkap: "",
  });

  const [karyawanList, setKaryawanList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    API.get("/karyawan")
      .then((res) => setKaryawanList(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKaryawanChange = (event, newValue) => {
    if (newValue) {
      setForm({
        ...form,
        karyawan_id: newValue.id,
        email: newValue.email || "",
        posisi: newValue.posisi || "",
        nama_lengkap: newValue.nama_lengkap || "",
      });
    } else {
      setForm({
        ...form,
        karyawan_id: "",
        email: "",
        posisi: "",
        nama_lengkap: "",
      });
    }
  };

  const handleStatusChange = (event, newValue) => {
    setForm({ ...form, status: newValue || "" });
  };

  const handleReset = () => {
    setForm({
      _id: "",
      judul: "",
      deskripsi: "",
      karyawan_id: "",
      status: "",
      deadline: "",
      email: "",
      posisi: "",
      nama_lengkap: "",
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form._id ||
      !form.judul ||
      !form.deskripsi ||
      !form.karyawan_id ||
      !form.status ||
      !form.deadline
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (form.email && !form.email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    try {
      await API.post("/tugas", {
        _id: form._id,
        judul: form.judul,
        deskripsi: form.deskripsi,
        karyawan_id: form.karyawan_id,
        status: form.status,
        deadline: form.deadline,
      });
      setSuccess("Tugas berhasil ditambahkan.");
      handleReset();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Gagal menyimpan tugas. Pastikan data sudah benar dan server aktif."
      );
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

        <Paper elevation={3} sx={{ p: 6, mt: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Form Tugas Baru
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
            Masukkan detail tugas yang akan diberikan
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ID Tugas"
                  name="_id"
                  value={form._id}
                  onChange={handleChange}
                  placeholder="Contoh: TGS001"
                  size="medium"
                  InputProps={{ sx: { minHeight: 56, fontSize: 18 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Judul Tugas"
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  placeholder="Judul tugas"
                  size="medium"
                  InputProps={{ sx: { minHeight: 56, fontSize: 18 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tenggat Waktu"
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="medium"
                  InputProps={{ sx: { minHeight: 56, fontSize: 18 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Deskripsi Tugas"
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  multiline
                  rows={8}
                  placeholder="Deskripsi tugas"
                  size="medium"
                  InputProps={{ sx: { fontSize: 18 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={karyawanList}
                  getOptionLabel={(option) =>
                    option.nama_lengkap
                      ? `${option.nama_lengkap} (${option.posisi})`
                      : ""
                  }
                  value={
                    karyawanList.find((k) => k.id === form.karyawan_id) || null
                  }
                  onChange={handleKaryawanChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Lengkap"
                      name="karyawan_id"
                      placeholder="Pilih karyawan"
                      size="medium"
                      InputProps={{
                        ...params.InputProps,
                        sx: { minHeight: 56, fontSize: 18 }
                      }}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={[
                    "Belum Dikerjakan",
                    "Sedang Dikerjakan",
                    "Selesai",
                  ]}
                  value={form.status}
                  onChange={handleStatusChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status"
                      name="status"
                      placeholder="Pilih status"
                      size="medium"
                      InputProps={{
                        ...params.InputProps,
                        sx: { minHeight: 56, fontSize: 18 }
                      }}
                    />
                  )}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={form.email}
                  disabled
                  placeholder="Email karyawan"
                  size="medium"
                  InputProps={{ sx: { minHeight: 56, fontSize: 18 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Posisi"
                  value={form.posisi}
                  disabled
                  placeholder="Posisi karyawan"
                  size="medium"
                  InputProps={{ sx: { minHeight: 56, fontSize: 18 } }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end", gap: 3 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleReset}
                sx={{ px: 4, py: 1.5, fontSize: 16 }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#2563eb", px: 4, py: 1.5, fontSize: 16 }}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
