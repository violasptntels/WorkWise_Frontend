import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container, Typography, Card, CardContent, CircularProgress, Button
} from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";

export default function DetailTugas() {
  const { id } = useParams();
  const [tugas, setTugas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/tugas/${id}`)
      .then(res => {
        setTugas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal ambil tugas:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Container sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (!tugas) {
    return (
      <Layout>
        <Container>
          <Typography variant="h6" color="error" mt={4}>
            Tugas tidak ditemukan.
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Detail Tugas</Typography>
        <Card>
          <CardContent>
            <Typography><strong>ID Tugas:</strong> {tugas.id}</Typography>
            <Typography><strong>Judul:</strong> {tugas.judul}</Typography>
            <Typography><strong>Deskripsi:</strong> {tugas.deskripsi}</Typography>
            <Typography><strong>Deadline:</strong> {tugas.deadline}</Typography>
            <Typography><strong>Status:</strong> {tugas.status}</Typography>
            <Typography><strong>Karyawan ID:</strong> {tugas.karyawan_id}</Typography>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          component={Link}
          to="/"
        >
          Kembali ke Dashboard
        </Button>
      </Container>
    </Layout>
  );
}
