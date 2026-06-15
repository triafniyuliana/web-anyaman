import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { createPengrajinApi } from "../../services/api";

export default function TambahPengrajin() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    experience: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhoto(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("email", form.email);

      formData.append("password", form.password);

      formData.append("phone", form.phone);

      formData.append("address", form.address);

      formData.append("experience", form.experience);

      formData.append("description", form.description);

      if (photo) {
        formData.append("photo", photo);
      }

      await createPengrajinApi(formData);

      alert("Pengrajin berhasil ditambahkan");

      navigate("/pengrajin");
    } catch (error) {
      console.log(error);

      alert("Gagal menambahkan pengrajin");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Tambah Pengrajin" />

        {/* PAGE */}
        <div className="p-8">
          {/* FORM */}
          <div className="bg-white rounded-3xl shadow-sm p-10 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* FOTO */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Foto Pengrajin
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-32 h-32 rounded-2xl object-cover mt-4 border"
                  />
                )}
              </div>

              {/* NAMA */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Nama
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* TELEPON */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  No Telepon
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Masukkan no telepon"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* ALAMAT */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Alamat
                </label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Masukkan alamat"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* PENGALAMAN */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Pengalaman
                </label>

                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Contoh: 5 Tahun"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Deskripsi
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi pengrajin"
                  rows={5}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none resize-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all"
              >
                Simpan Pengrajin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
