import { useEffect, useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, Paper, Box
} from "@mui/material";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Layout from "../../components/layouts/Layout";

export default function ListKaryawan() {
  const [data, setData] = useState([]);

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

  return (
    <Layout>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Data Karyawan</Typography>
          <Button variant="contained" component={Link} to="/karyawan/add">
            Tambah Karyawan
          </Button>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nama Lengkap</TableCell>
                <TableCell>Tanggal Lahir</TableCell>
                <TableCell>Jenis Kelamin</TableCell>
                <TableCell>Telepon</TableCell>
                <TableCell>Posisi</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((karyawan) => (
                <TableRow key={karyawan.id}>
                  <TableCell>{karyawan.id}</TableCell>
                  <TableCell>{karyawan.nama_lengkap}</TableCell>
                  <TableCell>{karyawan.tanggal_lahir}</TableCell>
                  <TableCell>{karyawan.jenis_kelamin}</TableCell>
                  <TableCell>{karyawan.telepon}</TableCell>
                  <TableCell>{karyawan.posisi}</TableCell>
                  <TableCell>{karyawan.email}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/karyawan/edit/${karyawan.id}`}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(karyawan.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Layout>
  );
}
