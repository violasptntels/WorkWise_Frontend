import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, Paper, Box, TextField, InputAdornment
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import API from "../../services/api";
import Layout from "../../components/layouts/Layout";
import ListKaryawanTable from "../../components/organisms/ListKaryawanTable";


export default function ListKaryawan() {
  return (
    <Layout>
      <ListKaryawanTable />
    </Layout>
  );
}
