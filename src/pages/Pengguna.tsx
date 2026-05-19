import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Pengguna() {
  const users = [
    {
      id: 1,
      nama: "afni",
      email: "afni@gmail.com",
      telepon: "08971234567",
      tanggal: "2026-05-09",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Kelola Pengguna" />

        {/* PAGE */}
        <div className="p-8">
          {/* TOP BAR */}
          <div className="bg-white rounded-[30px] shadow-sm p-8 flex items-center justify-between gap-6">
            <input
              type="text"
              placeholder="Cari pengguna..."
              className="w-full md:w-[420px] border border-gray-200 rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-[#9b6b43]"
            />

            <Link
              to="/tambah-pengguna"
              className="bg-[#9b6b43] hover:bg-[#835937] transition-all duration-300 text-white px-8 py-4 rounded-2xl text-lg font-semibold whitespace-nowrap"
            >
              + Tambah Pengguna
            </Link>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-[30px] shadow-sm p-8 mt-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-6 text-xl font-bold">No</th>

                  <th className="pb-6 text-xl font-bold">Foto</th>

                  <th className="pb-6 text-xl font-bold">Nama</th>

                  <th className="pb-6 text-xl font-bold">Email</th>

                  <th className="pb-6 text-xl font-bold">No Telepon</th>

                  <th className="pb-6 text-xl font-bold">Tanggal</th>

                  <th className="pb-6 text-xl font-bold text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-[#faf7f3]"
                  >
                    <td className="py-6 text-lg">{index + 1}</td>

                    <td className="py-6">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                        alt="google"
                        className="w-14 h-14 object-cover"
                      />
                    </td>

                    <td className="py-6 text-lg">{user.nama}</td>

                    <td className="py-6 text-lg">{user.email}</td>

                    <td className="py-6 text-lg">{user.telepon}</td>

                    <td className="py-6 text-lg">{user.tanggal}</td>

                    <td className="py-6">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to="/edit-pengguna"
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-3 rounded-xl"
                        >
                          ✏️
                        </Link>

                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
