import { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Typography, Button, Paper, Container
} from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/tugas")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Gagal fetch tugas:", err));
  }, []);

  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Dashboard Tugas Karyawan
        </Typography>
        <Button component={Link} to="/tugas/add" variant="contained" sx={{ mb: 2 }}>
          Tambah Tugas
        </Button>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Karyawan</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Judul Tugas</TableCell>
                <TableCell>Deskripsi</TableCell>
                <TableCell>Tenggat Waktu</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.karyawan_id}</TableCell>
                  <TableCell>{item.nama_lengkap}</TableCell>
                  <TableCell>{item.judul}</TableCell>
                  <TableCell>{item.deskripsi}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      component={Link}
                      to={`/tugas/${item.id}`}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    >
                      Detail
                    </Button>
                    <Button
                      size="small"
                      component={Link}
                      to={`/tugas/edit/${item.id}`}
                      variant="outlined"
                      color="secondary"
                    >
                      Edit
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
