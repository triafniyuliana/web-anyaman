import { useEffect, useState } from "react";
import { Search, SendHorizonal } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getPesananApi, kirimPesananApi } from "../../services/api";

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

const badgeStatusBayar = (status: string) => {
    const map: Record<string, string> = {
        settlement: "bg-green-100 text-green-700",
        lunas: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        menunggu: "bg-yellow-100 text-yellow-700",
        expire: "bg-red-100 text-red-700",
        cancel: "bg-gray-100 text-gray-500",
    };
    return map[status.toLowerCase()] ?? "bg-gray-100 text-gray-500";
};

const badgeStatusPesanan = (status: string) => {
    const map: Record<string, string> = {
        diproses: "bg-blue-100 text-blue-700",
        dikirim: "bg-purple-100 text-purple-700",
        selesai: "bg-green-100 text-green-700",
        dibatalkan: "bg-red-100 text-red-700",
    };
    return map[status.toLowerCase()] ?? "bg-gray-100 text-gray-500";
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
        (async () => {
            try {
                const response = await getPesananApi();
                setPesanan(response.pesanan);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleKirim = async (pesananId: string) => {
        const nomorResi = prompt("Masukkan Nomor Resi");
        if (!nomorResi) return;

        try {
            await kirimPesananApi(pesananId, nomorResi);
            alert("Pesanan berhasil dikirim");
            getPesanan();
        } catch (error) {
            console.log(error);
            alert("Gagal mengirim pesanan");
        }
    };

    const filteredPesanan = pesanan.filter((item) =>
        item.namaPenerima.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#f5f1eb]">
            <Sidebar />

            <div className="flex-1">
                <Navbar title="Kelola Pesanan" />

                <div className="p-8">
                    {/* SEARCH */}
                    <div className="mb-8">
                        <div className="bg-white rounded-3xl shadow-sm px-6 py-5 w-full md:w-[500px]">
                            <div className="relative">
                                <Search
                                    size={22}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Cari nama penerima..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-base outline-none focus:border-[#9b6b43]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-base">
                                <thead className="bg-[#f8f5f1]">
                                    <tr>
                                        {[
                                            "No",
                                            "Order ID",
                                            "Penerima",
                                            "Telepon",
                                            "Total",
                                            "Status Bayar",
                                            "Status Pesanan",
                                            "Aksi",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="px-6 py-5 text-left text-[#5b3a29] font-semibold whitespace-nowrap text-base"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredPesanan.length > 0 ? (
                                        filteredPesanan.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="border-t border-gray-100 hover:bg-[#fdf9f5] transition-colors"
                                            >
                                                <td className="px-6 py-5 text-gray-500 text-base">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-5 font-mono text-sm text-gray-600 whitespace-nowrap">
                                                    {item.orderId}
                                                </td>

                                                <td className="px-6 py-5 font-semibold text-[#5b3a29] whitespace-nowrap text-base">
                                                    {item.namaPenerima}
                                                </td>

                                                <td className="px-6 py-5 text-gray-600 whitespace-nowrap text-base">
                                                    {item.noTelpon}
                                                </td>

                                                <td className="px-6 py-5 font-semibold text-[#5b3a29] whitespace-nowrap text-base">
                                                    Rp{" "}
                                                    {item.totalBayar.toLocaleString("id-ID")}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${badgeStatusBayar(item.statusBayar)}`}
                                                    >
                                                        {item.statusBayar}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${badgeStatusPesanan(item.statusPesanan)}`}
                                                    >
                                                        {item.statusPesanan}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {item.statusPesanan === "diproses" ? (
                                                        <button
                                                            onClick={() => handleKirim(item.id)}
                                                            className="flex items-center gap-2 bg-[#9b6b43] hover:bg-[#7a5434] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                                                        >
                                                            <SendHorizonal size={16} />
                                                            Kirim
                                                        </button>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                                            ✓ Sudah Dikirim
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="text-center py-16 text-gray-400 text-lg"
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