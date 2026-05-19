import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function EditPengrajin() {
  const [preview, setPreview] = useState<string>(
    "https://cdn-icons-png.flaticon.com/512/281/281764.png",
  );

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
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
          <div className="bg-white rounded-[30px] shadow-sm p-10 max-w-5xl mx-auto">
            

            <form className="space-y-8">
              {/* FOTO */}
              <div>
                <label className="block text-xl font-semibold mb-4 text-[#5b3d2a]">
                  Foto Profil
                </label>

                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-[#d6c2af] flex items-center justify-center">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePreview}
                    className="text-lg"
                  />
                </div>
              </div>

              {/* NAMA */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-[#5b3d2a]">
                  Nama Pengrajin
                </label>

                <input
                  type="text"
                  defaultValue="Budi"
                  className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-[#5b3d2a]">
                  Email
                </label>

                <input
                  type="email"
                  defaultValue="budi@gmail.com"
                  className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
                />
              </div>

              {/* TELEPON */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-[#5b3d2a]">
                  Nomor Telepon
                </label>

                <input
                  type="text"
                  defaultValue="08971234567"
                  className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
                />
              </div>

              {/* ALAMAT */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-[#5b3d2a]">
                  Alamat
                </label>

                <textarea
                  rows={4}
                  defaultValue="Jepara"
                  className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
                />
              </div>

              {/* PENGALAMAN */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-[#5b3d2a]">
                  Lama Pengalaman
                </label>

                <input
                  type="text"
                  defaultValue="5 Tahun"
                  className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-[#5b3d2a]">
                  Password
                </label>

                <input
                  type="password"
                  defaultValue="123456"
                  className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
                />
              </div>

              {/* BUTTON */}
              <div className="flex items-center gap-5 pt-4">
                <button
                  type="submit"
                  className="bg-[#9b6b43] hover:bg-[#835937] text-white px-10 py-4 rounded-2xl text-lg font-semibold"
                >
                  Simpan Perubahan
                </button>

                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-10 py-4 rounded-2xl text-lg font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
