import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { createProdukApi } from "../../services/api";

export default function TambahProduk() {
  const navigate = useNavigate();

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    namaProduk: "",
    keywordTrend: "",
    deskripsi: "",
    harga: "",
    stok: "",
    kategori: "",
    ukuran: "",
    bahan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("namaProduk", form.namaProduk);
      formData.append("keywordTrend", form.keywordTrend);
      formData.append("deskripsi", form.deskripsi);
      formData.append("harga", form.harga);
      formData.append("stok", form.stok);
      formData.append("kategori", form.kategori);
      formData.append("ukuran", form.ukuran);
      formData.append("bahan", form.bahan);

      if (foto) {
        formData.append("foto", foto);
      }

      await createProdukApi(formData);

      alert("Produk berhasil ditambahkan");
      navigate("/produk");
    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Tambah Produk" />

        <div className="p-8">
          <div className="bg-white rounded-3xl shadow-sm p-10 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Foto Produk
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFoto}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-40 rounded-xl object-cover mt-4 border"
                  />
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Nama Produk
                </label>

                <input
                  type="text"
                  name="namaProduk"
                  value={form.namaProduk}
                  onChange={handleChange}
                  placeholder="Contoh: Caping Bambu"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Keyword Google Trends
                </label>

                <input
                  type="text"
                  name="keywordTrend"
                  value={form.keywordTrend}
                  onChange={handleChange}
                  placeholder="Contoh: caping bambu"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Keyword ini digunakan untuk mengambil data Google Trends.
                </p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Deskripsi
                </label>

                <textarea
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Harga
                </label>

                <input
                  type="number"
                  name="harga"
                  value={form.harga}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Stok
                </label>

                <input
                  type="number"
                  name="stok"
                  value={form.stok}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Kategori
                </label>

                <input
                  type="text"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Ukuran
                </label>

                <input
                  type="text"
                  name="ukuran"
                  value={form.ukuran}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Bahan
                </label>

                <input
                  type="text"
                  name="bahan"
                  value={form.bahan}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />
              </div>

              <button
                type="submit"
                className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Simpan Produk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}