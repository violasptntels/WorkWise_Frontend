import { useState, useEffect } from "react";
import { Grid, Box, Alert, Typography, Button, Autocomplete, TextField, Paper } from "@mui/material";
import API from "../../services/api"; // tambahkan import API

export default function TugasForm({ initialData = null, onSubmit, mode = "add" }) {
  const [form, setForm] = useState({
    id: "",
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
    // Ambil data karyawan untuk autocomplete
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => setError("Gagal mengambil data karyawan"));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || "",
        judul: initialData.judul || "",
        deskripsi: initialData.deskripsi || "",
        karyawan_id: initialData.karyawan_id || "",
        status: initialData.status || "",
        deadline: initialData.deadline || "",
        email: initialData.email || "",
        posisi: initialData.posisi || "",
        nama_lengkap: initialData.nama_lengkap || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKaryawanChange = (event, newValue) => {
    if (newValue) {
      setForm({
        ...form,
        karyawan_id: (newValue.id || newValue._id)?.toString(),
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
      id: "",
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
      !form.id ||
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
      if (onSubmit) {
        await onSubmit(form);
        setSuccess(mode === "edit" ? "Tugas berhasil diperbarui." : "Tugas berhasil ditambahkan.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Gagal menyimpan tugas."
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ID Tugas"
            name="id"
            value={form.id}
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
              karyawanList.find((k) => (k.id || k._id) === form.karyawan_id) || null
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
              (option.id || option._id) === (value?.id || value?._id)
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
          {mode === "edit" ? "Update" : "Simpan"}
        </Button>
      </Box>
    </Box>
  );
}
