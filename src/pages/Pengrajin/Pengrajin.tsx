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
        (async () => {
            try {
                const response = await api.get("/admin/pengrajin");
                setPengrajin(response.data.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#f5f1eb]">
            <Sidebar />

            <div className="flex-1 min-w-0">
                <Navbar title="Kelola Pengrajin" />

                <div className="p-8">
                    {/* SEARCH + BUTTON */}
                    <div className="flex items-center justify-between gap-5 mb-8">
                        <div className="bg-white rounded-3xl shadow-sm px-6 py-5 w-full md:w-[450px]">
                            <div className="relative">
                                <Search
                                    size={22}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Cari pengrajin..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-base outline-none focus:border-[#9b6b43] transition-all"
                                />
                            </div>
                        </div>

                        <Link
                            to="/tambah-pengrajin"
                            className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-7 py-4 rounded-2xl text-base font-semibold whitespace-nowrap transition-all"
                        >
                            + Tambah Pengrajin
                        </Link>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full" style={{ tableLayout: "fixed", minWidth: "1100px" }}>
                                <colgroup>
                                    <col style={{ width: "55px" }} />
                                    <col style={{ width: "80px" }} />
                                    <col style={{ width: "130px" }} />
                                    <col style={{ width: "200px" }} />
                                    <col style={{ width: "160px" }} />
                                    <col style={{ width: "150px" }} />
                                    <col style={{ width: "110px" }} />
                                    <col style={{ width: "170px" }} />
                                    <col style={{ width: "145px" }} />
                                    <col style={{ width: "100px" }} />
                                </colgroup>
                                <thead className="bg-[#f8f5f1]">
                                    <tr>
                                        {[
                                            "No",
                                            "Foto",
                                            "Nama",
                                            "Email",
                                            "No Telepon",
                                            "Alamat",
                                            "Pengalaman",
                                            "Deskripsi",
                                            "Tgl Bergabung",
                                            "Aksi",
                                        ].map((h, i) => (
                                            <th
                                                key={h}
                                                className={`px-4 py-5 text-base font-semibold text-[#5b3a29] ${i === 9 ? "text-center" : "text-left"}`}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPengrajin.length > 0 ? (
                                        filteredPengrajin.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="border-t border-gray-100 hover:bg-[#faf7f3] transition-all"
                                            >
                                                <td className="px-4 py-5 text-base text-gray-500">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-5">
                                                    <img
                                                        src={
                                                            item.photo
                                                                ? item.photo.startsWith("http")
                                                                    ? item.photo
                                                                    : `https://anyam.onrender.com/uploads/${item.photo.replace("/uploads/", "")}`
                                                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                        }
                                                        alt={item.name}
                                                        className="w-14 h-14 rounded-xl object-cover border border-[#e7d8c9]"
                                                    />
                                                </td>
                                                <td className="px-4 py-5 font-semibold text-base text-[#5b3a29] truncate">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 py-5 text-base text-gray-600 truncate">
                                                    {item.email}
                                                </td>
                                                <td className="px-4 py-5 text-base text-gray-600">
                                                    {item.phone || "-"}
                                                </td>
                                                <td className="px-4 py-5 text-base text-gray-600 truncate">
                                                    {item.address || "-"}
                                                </td>
                                                <td className="px-4 py-5 text-base text-gray-600">
                                                    {item.experience || "-"}
                                                </td>
                                                <td className="px-4 py-5 text-base text-gray-600">
                                                    <p className="line-clamp-2">
                                                        {item.description || "-"}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-5 text-base text-gray-600">
                                                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link
                                                            to={`/edit-pengrajin/${item.id}`}
                                                            className="bg-yellow-400 hover:bg-yellow-500 text-white p-2.5 rounded-xl transition-all"
                                                        >
                                                            <Pencil size={18} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={10}
                                                className="text-center py-16 text-gray-400 text-lg"
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