import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pengguna from "./pages/Pengguna";
import Pengrajin from "./pages/Pengrajin/Pengrajin";
import TambahPengrajin from "./pages/Pengrajin/TambahPengrajin";
import EditPengrajin from "./pages/Pengrajin/EditPengrajin";
import TutorialVideo from "./pages/Video/TutorialVideo";
import TambahTutorialVideo from "./pages/Video/TambahTutorialVideo";
import EditTutorialVideo from "./pages/Video/EditTutorialVideo";
import Produk from "./pages/Produk/Produk";
import TambahProduk from "./pages/Produk/TambahProduk";
import EditProduk from "./pages/Produk/EditProduk";
import Pesanan from "./pages/Pesanan/Pesanan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/pengguna" element={<Pengguna />} />

      <Route path="/pengrajin" element={<Pengrajin />} />

      <Route path="/tambah-pengrajin" element={<TambahPengrajin />} />

      <Route path="/edit-pengrajin/:id" element={<EditPengrajin />} />

      <Route path="/tutorial-video" element={<TutorialVideo />} />

      <Route path="/tambah-tutorial-video" element={<TambahTutorialVideo />} />

      <Route path="/edit-tutorial-video/:id" element={<EditTutorialVideo />} />

      <Route
        path="/produk"
        element={<Produk />}
      />

      <Route
        path="/tambah-produk"
        element={<TambahProduk />}
      />

      <Route
        path="/edit-produk/:id"
        element={<EditProduk />}
      />
      <Route
        path="/pesanan"
        element={<Pesanan />}
      />

    </Routes>
  );
}

export default App;
