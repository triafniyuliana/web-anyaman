import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { Search, Pencil, Trash2 } from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api, { deletePengrajinApi } from "../../services/api";

type PengrajinType = {
  id: string;
  photo: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  description: string;
  createdAt: string;
};

export default function Pengrajin() {
  const [pengrajin, setPengrajin] = useState<PengrajinType[]>([]);

  const [search, setSearch] = useState("");

  const getPengrajin = async () => {
    try {
      const response = await api.get("/admin/pengrajin");

      setPengrajin(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPengrajin();
    };

    fetchData();
  }, []);

  // DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus pengrajin?");

    if (!confirmDelete) return;

    try {
      await deletePengrajinApi(id);

      alert("Pengrajin berhasil dihapus");

      getPengrajin();
    } catch (error) {
      console.log(error);

      alert("Gagal menghapus pengrajin");
    }
  };

  const filteredPengrajin = pengrajin.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Kelola Pengrajin" />

        {/* PAGE */}
        <div className="p-8">
          {/* SEARCH + BUTTON */}
          <div className="flex items-center justify-between gap-5 mb-8">
            <div className="bg-white rounded-3xl shadow-sm px-8 py-6 w-full md:w-[470px]">
              <div className="relative w-full md:w-[400px]">
                <Search
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Cari pengrajin..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-lg outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20 transition-all"
                />
              </div>
            </div>

            <Link
              to="/tambah-pengrajin"
              className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-5 rounded-2xl text-lg font-semibold whitespace-nowrap transition-all shadow-sm"
            >
              + Tambah Pengrajin
            </Link>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f5f1]">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      No
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Foto
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Nama
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Email
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      No Telepon
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Alamat
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Pengalaman
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Deskripsi
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Tanggal Bergabung
                    </th>

                    <th className="px-8 py-6 text-center text-lg font-bold text-[#5b3a29]">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPengrajin.length > 0 ? (
                    filteredPengrajin.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 hover:bg-[#faf7f3] transition-all"
                      >
                        <td className="px-8 py-5 text-gray-700 text-lg">
                          {index + 1}
                        </td>

                        <td className="px-8 py-5">
                          <img
                            src={
                              item.photo
                                ? `http://localhost:3000/uploads/${item.photo}`
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-[#e7d8c9]"
                          />
                        </td>

                        <td className="px-8 py-5">
                          <p className="text-lg font-semibold text-[#5b3a29]">
                            {item.name}
                          </p>
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg">
                          {item.email}
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg">
                          {item.phone || "-"}
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg">
                          {item.address || "-"}
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg">
                          {item.experience || "-"}
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg max-w-[250px]">
                          <p className="line-clamp-3">
                            {item.description || "-"}
                          </p>
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </td>

                        <td className="px-8 py-5">
                          <div className="flex items-center justify-center gap-3">
                            {/* EDIT */}
                            <Link
                              to={`/edit-pengrajin/${item.id}`}
                              className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl transition-all"
                            >
                              <Pencil size={20} />
                            </Link>

                            {/* DELETE */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-16 text-gray-400 text-xl"
                      >
                        Belum ada data pengrajin
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
