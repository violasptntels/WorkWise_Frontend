import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTugas from "./pages/Tugas/AddTugas";
import EditTugas from "./pages/Tugas/EditTugas";
import DetailTugas from "./pages/Tugas/DetailTugas";
import ListKaryawan from "./pages/Karyawan/ListKaryawan";
import AddKaryawan from "./pages/Karyawan/AddKaryawan";
import EditKaryawan from "./pages/Karyawan/EditKaryawan";
import Layout from "./components/layouts/Layout";
import ListTugas from "./pages/Tugas/ListTugas";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tugas/add" element={<AddTugas />} />
        <Route path="/tugas/edit/:id" element={<EditTugas />} />
        <Route path="/tugas" element={<ListTugas />} />
        <Route path="/tugas/detail/:id" element={<DetailTugas />} />
        <Route path="/tugas/:id" element={<DetailTugas />} />
        <Route path="/karyawan" element={<ListKaryawan />} />
        <Route path="/karyawan/add" element={<AddKaryawan />} />
        <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />
      </Routes>
    </Router>
  );
}
