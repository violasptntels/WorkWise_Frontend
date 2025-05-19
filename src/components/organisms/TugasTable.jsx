import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";

const getStatusChip = (status) => {
  let color = "default";
  switch (status?.toLowerCase()) {
    case "belum dikerjakan": color = "warning"; break;
    case "sedang dikerjakan": color = "info"; break;
    case "selesai": color = "success"; break;
    case "dibatalkan": color = "error"; break;
    default: color = "default";
  }
  return <Chip label={status} color={color} size="small" />;
};

export default function TugasTable({ data, karyawanList, searchTerm, onDelete }) {
  const getKaryawan = (id) => karyawanList.find(k => k.id === id) || {};

  const filteredData = data.filter(tugas => {
    const karyawan = getKaryawan(tugas.karyawan_id);
    return karyawan.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
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
                <TableRow key={item.id}>
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
                        to={`/tugas/edit/${item.id}`}
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
                        onClick={() => onDelete(item.id)}
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
  );
}
