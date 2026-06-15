import { Link } from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import {
    Search,
    Pencil,
    Trash2,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
    getProdukApi,
    deleteProdukApi,
    imageUrl,
} from "../../services/api";

type ProdukType = {
    id: string;

    namaProduk: string;

    deskripsi: string;

    harga: number;

    stok: number;

    foto: string;

    kategori: string;

    ukuran: string;

    bahan: string;

    createdAt: string;
};

export default function Produk() {
    const [produk, setProduk] =
        useState<ProdukType[]>([]);

    const [search, setSearch] =
        useState("");

    const getProduk =
        async () => {
            try {
                const response =
                    await getProdukApi();

                setProduk(
                    response.data,
                );
            } catch (error) {
                console.log(error);
            }
        };

    useEffect(() => {
        const fetchData = async () => {
            await getProduk();
        };

        fetchData();
    }, []);

    const handleDelete =
        async (
            id: string,
        ) => {
            const confirmDelete =
                window.confirm(
                    "Yakin ingin menghapus produk?",
                );

            if (!confirmDelete)
                return;

            try {
                await deleteProdukApi(
                    id,
                );

                alert(
                    "Produk berhasil dihapus",
                );

                getProduk();
            } catch (error) {
                console.log(error);

                alert(
                    "Gagal menghapus produk",
                );
            }
        };

    const filteredProduk =
        produk.filter((item) =>
            item.namaProduk
                .toLowerCase()
                .includes(
                    search.toLowerCase(),
                ),
        );

    return (
        <div className="flex min-h-screen bg-[#f5f1eb]">
            <Sidebar />

            <div className="flex-1">
                <Navbar title="Produk" />

                <div className="p-8">
                    {/* SEARCH */}
                    <div className="flex items-center justify-between gap-5 mb-8">
                        <div className="bg-white rounded-3xl shadow-sm px-8 py-6 w-full md:w-[470px]">
                            <div className="relative w-full md:w-[400px]">
                                <Search
                                    size={22}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-lg outline-none focus:border-[#9b6b43]"
                                />
                            </div>
                        </div>

                        <Link
                            to="/tambah-produk"
                            className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-5 rounded-2xl text-lg font-semibold whitespace-nowrap"
                        >
                            + Tambah Produk
                        </Link>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#f8f5f1]">
                                    <tr>
                                        <th className="px-6 py-5 text-left">
                                            No
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Foto
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Nama Produk
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Kategori
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Harga
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Stok
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Ukuran
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Bahan
                                        </th>

                                        <th className="px-6 py-5 text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredProduk.length >
                                        0 ? (
                                        filteredProduk.map(
                                            (
                                                item,
                                                index,
                                            ) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-t border-gray-100"
                                                >
                                                    <td className="px-6 py-5">
                                                        {index + 1}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <img
                                                            src={imageUrl(
                                                                item.foto,
                                                            )}
                                                            alt={
                                                                item.namaProduk
                                                            }
                                                            className="w-20 h-20 rounded-xl object-cover"
                                                        />
                                                    </td>

                                                    <td className="px-6 py-5 font-semibold text-[#5b3a29]">
                                                        {
                                                            item.namaProduk
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        {
                                                            item.kategori
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        Rp{" "}
                                                        {item.harga.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        {item.stok}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        {item.ukuran}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        {item.bahan}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex justify-center gap-3">
                                                            <Link
                                                                to={`/edit-produk/${item.id}`}
                                                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl"
                                                            >
                                                                <Pencil
                                                                    size={
                                                                        20
                                                                    }
                                                                />
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id,
                                                                    )
                                                                }
                                                                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        20
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="text-center py-16 text-gray-400 text-xl"
                                            >
                                                Belum ada produk
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