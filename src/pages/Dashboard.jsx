import { useEffect, useState } from "react";
import { Typography, Paper, Container, Box } from "@mui/material";
import Layout from "../components/layouts/Layout";
import DashboardStatsGrid from "../components/organisms/DashboardStatsGrid";
import API from "../services/api";

export default function Dashboard() {
  const [tugas, setTugas] = useState([]);
  const [karyawan, setKaryawan] = useState([]);

  useEffect(() => {
    API.get("/tugas")
      .then((res) => setTugas(res.data))
      .catch((err) => console.error("Gagal fetch tugas:", err));

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

  const statsData = [
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
  ];

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

          <Box sx={{ mt: 6, mb: 6 }}>
            <DashboardStatsGrid data={statsData} />
          </Box>

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
