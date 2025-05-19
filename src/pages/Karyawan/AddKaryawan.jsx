import { Container, Typography } from "@mui/material";
import Layout from "../../components/layouts/Layout";
import AddKaryawanForm from "../../components/organisms/AddKaryawanForm";

export default function AddKaryawan() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Tambah Karyawan
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tambahkan data karyawan baru ke sistem
        </Typography>
        <AddKaryawanForm />
      </Container>
    </Layout>
  );
}
