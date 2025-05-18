import { useEffect, useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, Paper, Box, TextField, InputAdornment, Chip
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import API from "../../services/api";
import Layout from "../../components/layouts/Layout";

export default function ListTugas() {
  const [data, setData] = useState([]);
  const [karyawanList, setKaryawanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTugas = () => {
    API.get("/tugas")
      .then(res => setData(res.data))
      .catch(() => alert("Gagal mengambil data tugas"));
  };

  const fetchKaryawan = () => {
    API.get("/karyawan")
      .then(res => setKaryawanList(res.data))
      .catch(() => alert("Gagal mengambil data karyawan"));
  };

  useEffect(() => {
    fetchTugas();
    fetchKaryawan();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus tugas ini?")) {
      try {
        // Gunakan id tugas yang benar untuk menghapus
        await API.delete(`/tugas/${id}`);
        fetchTugas();
      } catch (err) {
        alert(
          err?.response?.data?.message ||
          "Gagal menghapus tugas. Pastikan Anda memiliki akses dan ID tugas benar."
        );
      }
    }
  };

  // Helper untuk cari nama/email dari id karyawan
  const getKaryawan = (id) => karyawanList.find(k => k.id === id) || {};

  const filteredData = data.filter(tugas => {
    const karyawan = getKaryawan(tugas.karyawan_id);
    return (
      karyawan.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusChip = (status) => {
    let color = "default";
    switch (status?.toLowerCase()) {
      case "belum dikerjakan":
        color = "warning";
        break;
      case "sedang dikerjakan":
        color = "info";
        break;
      case "selesai":
        color = "success";
        break;
      case "dibatalkan":
        color = "error";
        break;
      default:
        color = "default";
    }
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Manajemen Tugas
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Lihat dan kelola semua tugas karyawan di sistem Anda
          </Typography>
        </Box>

        {/* Action Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <TextField
            placeholder="Cari berdasarkan nama karyawan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "300px",
              '& .MuiInputBase-input': { color: 'white' },
              '& ::placeholder': { color: 'white', opacity: 1 },
              '& .MuiOutlinedInput-root': {
                borderColor: 'white',
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            component={Link}
            to="/tugas/add"
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            + Tambah Tugas
          </Button>
        </Box>

        {/* Table Section */}
        <Paper sx={{ borderRadius: 2 }}>
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                  {/* <TableCell><strong>ID Tugas</strong></TableCell> */}
                  <TableCell><strong>Nama</strong></TableCell>
                  <TableCell><strong>Judul Tugas</strong></TableCell>
                  <TableCell><strong>Deskripsi</strong></TableCell>
                  <TableCell><strong>Tenggat Waktu</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell align="right"><strong>Aksi</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => {
                  const karyawan = getKaryawan(item.karyawan_id);
                  return (
                    <TableRow key={item._id}>
                      {/* <TableCell>{item.tugas_id}</TableCell> */}
                      <TableCell>{karyawan.nama_lengkap || "-"}</TableCell>
                      <TableCell>{item.judul}</TableCell>
                      <TableCell>{item.deskripsi}</TableCell>
                      <TableCell>{item.deadline}</TableCell>
                      <TableCell>{getStatusChip(item.status)}</TableCell>
                      <TableCell>{karyawan.email || "-"}</TableCell>
                      <TableCell align="right">
                        <Box display="flex" justifyContent="flex-end" gap={1}>
                          <Button
                            component={Link}
                            to={`/tugas/edit/${item.tugas_id}`}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            sx={{ textTransform: "none", borderRadius: "6px" }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(item.tugas__id)}
                            sx={{ textTransform: "none", borderRadius: "6px" }}
                          >
                            Hapus
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

