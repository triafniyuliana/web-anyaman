import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { createTutorialVideoApi } from "../../services/api";

export default function TambahTutorialVideo() {
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
  });

  // HANDLE CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE THUMBNAIL
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setThumbnail(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);

      formData.append("videoUrl", form.videoUrl);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await createTutorialVideoApi(formData);

      alert("Video berhasil ditambahkan");

      navigate("/tutorial-video");
    } catch (error) {
      console.log(error);

      alert("Gagal menambahkan video");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Tambah Tutorial Video" />

        {/* PAGE */}
        <div className="p-8">
          <div className="bg-white rounded-3xl shadow-sm p-10 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* THUMBNAIL */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Thumbnail
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnail}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-28 rounded-xl object-cover mt-4 border"
                  />
                )}
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Judul Video
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul video"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
                />
              </div>

              {/* VIDEO URL */}
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  URL Video
                </label>

                <input
                  type="text"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleChange}
                  placeholder="Masukkan link video"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Simpan Video
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
