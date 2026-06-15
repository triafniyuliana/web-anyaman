import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { getUsersProfileApi } from "../services/api";

type User = {
  id: string;
  photo: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function Pengguna() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try {
      const response = await getUsersProfileApi();

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

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
          {/* SEARCH */}
          <div className="bg-white rounded-3xl shadow-sm px-8 py-6 mb-8 w-full md:w-[470px]">
            <div className="relative w-full md:w-[400px]">
              <Search
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari pengguna..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-lg outline-none focus:border-[#9b6b43] focus:ring-2 focus:ring-[#9b6b43]/20 transition-all"
              />
            </div>
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
                      Tanggal Bergabung
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className="border-t border-gray-100 hover:bg-[#faf7f3] transition-all"
                      >
                        <td className="px-8 py-5 text-gray-700 text-lg">
                          {index + 1}
                        </td>

                        <td className="px-8 py-5">
                          <img
                            src={
                              user.photo
                                ? `http://localhost:3000${user.photo}`
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt={user.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-[#f0e6dc]"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                            }}
                          />
                        </td>

                        <td className="px-8 py-5">
                          <p className="text-lg font-semibold text-[#5b3a29]">
                            {user.name}
                          </p>
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg">
                          {user.email}
                        </td>

                        <td className="px-8 py-5 text-gray-600 text-lg">
                          {new Date(user.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-16 text-gray-400 text-xl"
                      >
                        Belum ada data pengguna
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
