import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pengguna from "./pages/Pengguna";
import TambahPengguna from "./pages/TambahPengguna";
import EditPengguna from "./pages/EditPengguna";
import Pengrajin from "./pages/Pengrajin";
import TambahPengrajin from "./pages/TambahPengrajin";
import EditPengrajin from "./pages/EditPengrajin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/pengguna" element={<Pengguna />} />

      <Route path="/tambah-pengguna" element={<TambahPengguna />} />

      <Route path="/edit-pengguna" element={<EditPengguna />} />

      <Route path="/pengrajin" element={<Pengrajin />} />

      <Route path="/tambah-pengrajin" element={<TambahPengrajin />} />

      <Route path="/edit-pengrajin" element={<EditPengrajin />} />
    </Routes>
  );
}

export default App;
