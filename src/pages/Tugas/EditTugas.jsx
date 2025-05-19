import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Alert } from "@mui/material";
import Layout from "../../components/layouts/Layout";
import TugasForm from "../../components/organisms/TugasForm";
import API from "../../services/api";

export default function EditTugas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID tugas tidak ditemukan.");
      return;
    }

    API.get(`/tugas/${id}`)
      .then(res => {
        setInitialData(res.data);
      })
      .catch(() => setError("Gagal mengambil data tugas."));
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await API.put(`/tugas/${id}`, formData);
      setSuccess("Tugas berhasil diperbarui.");
      setTimeout(() => navigate("/tugas"), 1000);
    } catch (err) {
      if (err?.response?.data) {
        setError(typeof err.response.data === "string" ? err.response.data : JSON.stringify(err.response.data));
      } else {
        setError("Gagal update tugas. Silakan coba lagi.");
      }
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Edit Tugas
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Perbarui data tugas yang telah ada
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Form Edit Tugas
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
            Ubah detail tugas sesuai kebutuhan
          </Typography>

          {initialData && (
            <TugasForm
              initialData={initialData}
              onSubmit={handleSubmit}
              mode="edit"
            />
          )}
        </Paper>
      </Container>
    </Layout>
  );
}
