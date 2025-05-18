import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import API from "../services/api";

export default function Dashboard() {
  const [tugas, setTugas] = useState([]);
  const [karyawan, setKaryawan] = useState([]);

  useEffect(() => {
    // Ambil data tugas
    API.get("/tugas")
      .then((res) => setTugas(res.data))
      .catch((err) => console.error("Gagal fetch tugas:", err));

    // Ambil data karyawan
    API.get("/karyawan")
      .then((res) => setKaryawan(res.data))
      .catch((err) => console.error("Gagal fetch karyawan:", err));
  }, []);

  const totalKaryawan = karyawan.length;
  const totalTugas = tugas.length;
  const tugasSelesai = tugas.filter(
    (item) => item.status?.toLowerCase() === "selesai"
  ).length;
  const tugasTertunda = totalTugas - tugasSelesai;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 12, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Selamat Datang di WorkWise
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sistem pengelolaan tugas karyawan yang efisien
          </Typography>

          <Grid container spacing={3} sx={{ mt: 6, mb: 6 }}>
            {[
              {
                title: "Karyawan",
                value: totalKaryawan,
                color: "#e3f2fd",
                link: "/karyawan",
              },
              {
                title: "Tugas",
                value: totalTugas,
                color: "#f3e5f5",
                link: "/tugas",
              },
              {
                title: "Selesai",
                value: tugasSelesai,
                color: "#e8f5e9",
                extra: "Tugas selesai",
              },
              {
                title: "Tertunda",
                value: tugasTertunda,
                color: "#fff3e0",
                extra: "Tugas tertunda",
              },
            ].map(({ title, value, color, link, extra }) => (
              <Grid item xs={12} sm={6} md={3} key={title}>
                <Card sx={{ backgroundColor: color }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {value}
                    </Typography>
                    {link && (
                      <Button size="small" component={Link} to={link}>
                        Lihat {title.toLowerCase()}
                      </Button>
                    )}
                    {extra && (
                      <Typography variant="body2" mt={1}>
                        {extra}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Tingkatkan produktivitas tim Anda
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              WorkWise membantu Anda memantau produktivitas secara menyeluruh,
              menyederhanakan koordinasi tugas antar anggota tim, dan meningkatkan
              kolaborasi dengan komunikasi yang mudah serta alur kerja yang terintegrasi
              untuk mencapai hasil yang optimal.
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Tetap fokus, selesaikan tugas tepat waktu, dan capai target bersama!
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
