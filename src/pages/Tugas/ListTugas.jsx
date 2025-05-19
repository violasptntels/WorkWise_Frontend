import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Layout from "../../components/layouts/Layout";
import API from "../../services/api";
import SearchBar from "../../components/molecules/SearchBar";
import TambahTugasButton from "../../components/molecules/TambahTugasButton";
import TugasTable from "../../components/organisms/TugasTable";

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
        await API.delete(`/tugas/${id}`);
        fetchTugas();
      } catch {
        alert("Gagal menghapus tugas.");
      }
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Manajemen Tugas
          </Typography>
          <Typography variant="subtitle1">
            Lihat dan kelola semua tugas karyawan di sistem Anda
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <TambahTugasButton />
        </Box>

        <TugasTable
          data={data}
          karyawanList={karyawanList}
          searchTerm={searchTerm}
          onDelete={handleDelete}
        />
      </Container>
    </Layout>
  );
}
