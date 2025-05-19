import { useState, useEffect } from "react";
import { Box, Grid, Alert, Typography, Autocomplete, Button, Paper } from "@mui/material";
import InputText from "../atoms/InputText";
import SelectInput from "../atoms/SelectInput";
import FormRow from "../molecules/FormRow";
import SubmitButton from "../atoms/SubmitButton";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddKaryawanForm({ initialData = null, onSubmit, mode = "add" }) {
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
  const navigate = useNavigate();

  // Set form state dari initialData jika ada (mode edit)
  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || "",
        nama_lengkap: initialData.nama_lengkap || "",
        tanggal_lahir: initialData.tanggal_lahir || "",
        jenis_kelamin: initialData.jenis_kelamin || "",
        nomor_telepon: initialData.nomor_telepon || "",
        jabatan: initialData.jabatan || "",
        posisi: initialData.posisi || "",
        email: initialData.email || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.id || !form.nama_lengkap || !form.email || !form.jabatan || !form.posisi) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    // Jika ada onSubmit (mode edit), gunakan itu
    if (onSubmit) {
      try {
        await onSubmit(form);
      } catch {
        setError("Gagal update karyawan.");
      }
      return;
    }

    // Jika tidak ada onSubmit (mode tambah), lakukan POST
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
      setTimeout(() => navigate("/karyawan"), 800);
    } catch {
      setError("Gagal menyimpan karyawan.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
      <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
        {mode === "edit" ? "Edit Karyawan" : "Form Karyawan Baru"}
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
        Masukkan informasi karyawan dengan lengkap
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <FormRow>
            <InputText label="Nama Lengkap" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} />
          </FormRow>
          <FormRow>
            <InputText label="Email" name="email" value={form.email} onChange={handleChange} />
          </FormRow>
          <FormRow>
            <InputText label="Nomor Telepon" name="nomor_telepon" value={form.nomor_telepon} onChange={handleChange} />
          </FormRow>
          <FormRow>
            <Autocomplete
              freeSolo
              options={["Manager", "Staff", "HRD"]}
              value={form.jabatan}
              onChange={(e, newValue) =>
                setForm({ ...form, jabatan: newValue || "" })
              }
              renderInput={(params) => (
                <InputText {...params} label="Jabatan" name="jabatan" onChange={handleChange} />
              )}
            />
          </FormRow>
          <FormRow>
            <Autocomplete
              freeSolo
              options={["Frontend Developer", "Backend Developer", "Marketing"]}
              value={form.posisi}
              onChange={(e, newValue) =>
                setForm({ ...form, posisi: newValue || "" })
              }
              renderInput={(params) => (
                <InputText {...params} label="Posisi" name="posisi" onChange={handleChange} />
              )}
            />
          </FormRow>
          <FormRow>
            <InputText label="ID (Karyawan)" name="id" value={form.id} onChange={handleChange} placeholder="IT001 / MKT001" />
          </FormRow>
          <FormRow>
            <InputText label="Tanggal Lahir" name="tanggal_lahir" type="date" value={form.tanggal_lahir} onChange={handleChange} />
          </FormRow>
          <FormRow>
            <SelectInput
              label="Jenis Kelamin"
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={handleChange}
              options={["Laki-laki", "Perempuan"]}
            />
          </FormRow>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" color="inherit">Batal</Button>
          <SubmitButton>{mode === "edit" ? "Update" : "Simpan"}</SubmitButton>
        </Box>
      </Box>
    </Paper>
  );
}
