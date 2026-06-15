import { useEffect, useState, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api, { imageUrl, updatePengrajinApi } from "../../services/api";

export default function EditPengrajin() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [photo, setPhoto] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    description: "",
  });

  // GET DETAIL
  const getDetailPengrajin = useCallback(async () => {
    try {
      const response = await api.get(`/admin/pengrajin/${id}`);

      const data = response.data.data;

      setForm({
        name: data.name || "",

        email: data.email || "",

        phone: data.phone || "",

        address: data.address || "",

        experience: data.experience || "",

        description: data.description || "",
      });

      // PREVIEW FOTO
      if (data.photo) {
        setPreview(imageUrl(data.photo));
      }
    } catch (error) {
      console.log(error);

      alert("Gagal mengambil detail pengrajin");
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getDetailPengrajin();
      }
    };

    fetchData();
  }, [id, getDetailPengrajin]);

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE PHOTO
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhoto(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: unknown) => {
    (e as React.FormEvent<HTMLFormElement>).preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("email", form.email);

      formData.append("phone", form.phone);

      formData.append("address", form.address);

      formData.append("experience", form.experience);

      formData.append("description", form.description);

      if (photo) {
        formData.append("photo", photo);
      }

      await updatePengrajinApi(id as string, formData);

      alert("Pengrajin berhasil diupdate");

      navigate("/pengrajin");
    } catch (error) {
      console.log(error);

      alert("Gagal update pengrajin");
    }
  };
  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Edit Pengrajin" />

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
                    className="w-32 h-32 rounded-xl object-cover mt-4 border"
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
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
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
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
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
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
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
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
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
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
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
                  placeholder="Masukkan deskripsi"
                  rows={5}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none resize-none focus:border-[#9b6b43]"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all"
              >
                Update Pengrajin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
