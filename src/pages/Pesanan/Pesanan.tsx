import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
    getPesananApi,
    kirimPesananApi,
} from "../../services/api";

type Pesanan = {
    id: string;
    orderId: string;
    namaPenerima: string;
    noTelpon: string;
    alamat: string;
    totalBayar: number;
    statusBayar: string;
    statusPesanan: string;
    nomorResi?: string;
    createdAt: string;
};

export default function Transaksi() {
    const [pesanan, setPesanan] = useState<Pesanan[]>([]);
    const [search, setSearch] = useState("");

    const getPesanan = async () => {
        try {
            const response = await getPesananApi();

            setPesanan(response.pesanan);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getPesanan();
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleKirim = async (
        pesananId: string
    ) => {
        const nomorResi = prompt(
            "Masukkan Nomor Resi"
        );

        if (!nomorResi) return;

        try {
            await kirimPesananApi(
                pesananId,
                nomorResi
            );

            alert("Pesanan berhasil dikirim");

            getPesanan();
        } catch (error) {
            console.log(error);

            alert("Gagal mengirim pesanan");
        }
    };

    const filteredPesanan = pesanan.filter(
        (item) =>
            item.namaPenerima
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#f5f1eb]">
            <Sidebar />

            <div className="flex-1">
                <Navbar title="Kelola Pesanan" />

                <div className="p-8">

                    <div className="bg-white rounded-3xl shadow-sm px-8 py-6 mb-8 w-full md:w-[470px]">
                        <div className="relative w-full md:w-[400px]">
                            <Search
                                size={22}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Cari pesanan..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-lg outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">

                                <thead className="bg-[#f8f5f1]">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            No
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Order ID
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Penerima
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Telepon
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Total
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Bayar
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredPesanan.length > 0 ? (
                                        filteredPesanan.map(
                                            (item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-t"
                                                >
                                                    <td className="px-6 py-4">
                                                        {index + 1}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {item.orderId}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {item.namaPenerima}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {item.noTelpon}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        Rp{" "}
                                                        {item.totalBayar.toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {item.statusBayar}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {item.statusPesanan}
                                                    </td>

                                                    <td className="px-6 py-4">

                                                        {item.statusPesanan ===
                                                            "diproses" ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleKirim(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                                            >
                                                                Kirim
                                                            </button>
                                                        ) : (
                                                            <span className="text-green-600 font-semibold">
                                                                Sudah Dikirim
                                                            </span>
                                                        )}

                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="text-center py-10"
                                            >
                                                Belum ada pesanan
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