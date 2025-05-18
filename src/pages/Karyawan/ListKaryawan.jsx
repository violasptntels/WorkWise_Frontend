import { useEffect, useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, Paper, Box, TextField, InputAdornment
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import API from "../../services/api";
import Layout from "../../components/layouts/Layout";

export default function ListKaryawan() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchKaryawan = () => {
    API.get("/karyawan")
      .then(res => setData(res.data))
      .catch(() => alert("Gagal mengambil data karyawan"));
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      try {
        await API.delete(`/karyawan/${id}`);
        fetchKaryawan();
      } catch {
        alert("Gagal menghapus karyawan");
      }
    }
  };

  const filteredData = data.filter(karyawan =>
    karyawan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    karyawan.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    karyawan.posisi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Header Section */}
<Box mb={3}>
  <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Data Karyawan
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          lihat dan kelola semua karyawan di sistem Anda
        </Typography>
</Box>


        {/* Action Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
         <TextField
  placeholder="Cari berdasarkan ID, nama"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    width: "300px",
    '& .MuiInputBase-input': {
      color: 'white',             // teks input
    },
    '& ::placeholder': {
      color: 'white',             // placeholder
      opacity: 1,
    },
    '& .MuiOutlinedInput-root': {
      borderColor: 'white',       // border default
      '& fieldset': {
        borderColor: 'white',     // border kotak sebelum klik
      },
      '&:hover fieldset': {
        borderColor: 'white',     // border saat hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',     // border saat fokus
      },
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search sx={{ color: 'white' }} />  {/* ikon putih */}
      </InputAdornment>
    ),
  }}
/>

          <Button
            variant="contained"
            component={Link}
            to="/karyawan/add"
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            + Tambah Karyawan
          </Button>
        </Box>

        {/* Table Section */}
        <Paper sx={{ borderRadius: 2 }}>
  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
          <TableCell><strong>ID Karyawan</strong></TableCell>
          <TableCell><strong>Nama</strong></TableCell>
          <TableCell><strong>Tanggal Lahir</strong></TableCell>
          <TableCell><strong>Jenis Kelamin</strong></TableCell>
          <TableCell><strong>Jabatan</strong></TableCell>
          <TableCell><strong>Posisi</strong></TableCell>
          <TableCell><strong>Telepon</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell align="right"><strong>Aksi</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.map((karyawan) => (
          <TableRow key={karyawan.id}>
            <TableCell>{karyawan.id}</TableCell>
            <TableCell>{karyawan.nama_lengkap}</TableCell>
            <TableCell>{karyawan.tanggal_lahir}</TableCell>
            <TableCell>{karyawan.jenis_kelamin}</TableCell>
            <TableCell>{karyawan.jabatan}</TableCell>
            <TableCell>{karyawan.posisi}</TableCell>
            <TableCell>{karyawan.nomor_telepon}</TableCell>
            <TableCell>{karyawan.email}</TableCell>
            <TableCell align="right">
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  component={Link}
                  to={`/karyawan/edit/${karyawan.id}`}
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: "none", borderRadius: "6px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(karyawan.id)}
                  sx={{ textTransform: "none", borderRadius: "6px" }}
                >
                  Hapus
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
</Paper>

      </Container>
    </Layout>
  );
}
