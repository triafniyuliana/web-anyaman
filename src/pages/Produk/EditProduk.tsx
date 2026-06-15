import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getDetailProdukApi,
  updateProdukApi,
  imageUrl,
} from "../../services/api";

export default function EditProduk() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [foto, setFoto] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] =
    useState({
      namaProduk: "",
      deskripsi: "",
      harga: "",
      stok: "",
      kategori: "",
      ukuran: "",
      bahan: "",
    });

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          if (!id) return;

          const response =
            await getDetailProdukApi(
              id,
            );

          const data =
            response.data;

          setForm({
            namaProduk:
              data.namaProduk ||
              "",
            deskripsi:
              data.deskripsi ||
              "",
            harga:
              data.harga
                ?.toString() ||
              "",
            stok:
              data.stok
                ?.toString() ||
              "",
            kategori:
              data.kategori ||
              "",
            ukuran:
              data.ukuran ||
              "",
            bahan:
              data.bahan ||
              "",
          });

          if (data.foto) {
            setPreview(
              imageUrl(
                data.foto,
              ),
            );
          }
        } catch (error) {
          console.log(error);

          alert(
            "Gagal mengambil detail produk",
          );
        }
      };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleFoto = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (file) {
      setFoto(file);

      setPreview(
        URL.createObjectURL(
          file,
        ),
      );
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      const formData =
        new FormData();

      formData.append(
        "namaProduk",
        form.namaProduk,
      );

      formData.append(
        "deskripsi",
        form.deskripsi,
      );

      formData.append(
        "harga",
        form.harga,
      );

      formData.append(
        "stok",
        form.stok,
      );

      formData.append(
        "kategori",
        form.kategori,
      );

      formData.append(
        "ukuran",
        form.ukuran,
      );

      formData.append(
        "bahan",
        form.bahan,
      );

      if (foto) {
        formData.append(
          "foto",
          foto,
        );
      }

      await updateProdukApi(
        id as string,
        formData,
      );

      alert(
        "Produk berhasil diupdate",
      );

      navigate("/produk");
    } catch (error) {
      console.log(error);

      alert(
        "Gagal update produk",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Edit Produk" />

        <div className="p-8">
          <div className="bg-white rounded-3xl shadow-sm p-10 max-w-5xl mx-auto">
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Foto Produk
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleFoto
                  }
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

              <input
                type="text"
                name="namaProduk"
                value={
                  form.namaProduk
                }
                onChange={
                  handleChange
                }
                placeholder="Nama Produk"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <textarea
                name="deskripsi"
                value={
                  form.deskripsi
                }
                onChange={
                  handleChange
                }
                placeholder="Deskripsi"
                className="w-full border rounded-2xl px-5 py-4 h-32"
              />

              <input
                type="number"
                name="harga"
                value={
                  form.harga
                }
                onChange={
                  handleChange
                }
                placeholder="Harga"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="number"
                name="stok"
                value={
                  form.stok
                }
                onChange={
                  handleChange
                }
                placeholder="Stok"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                name="kategori"
                value={
                  form.kategori
                }
                onChange={
                  handleChange
                }
                placeholder="Kategori"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                name="ukuran"
                value={
                  form.ukuran
                }
                onChange={
                  handleChange
                }
                placeholder="Ukuran"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                name="bahan"
                value={
                  form.bahan
                }
                onChange={
                  handleChange
                }
                placeholder="Bahan"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <button
                type="submit"
                className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Update Produk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}