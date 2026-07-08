import { useEffect, useState } from "react";
import { Search, SendHorizonal, X } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
    getPesananApi,
    kirimPesananApi,
    updateStatusPesananApi,
} from "../../services/api";

type DetailItem = {
    id: string;
    qty: number;
    harga: number;
    subtotal: number;
    produk: {
        namaProduk: string;
        foto: string | null;
    };
};

type Pesanan = {
    id: string;
    orderId: string;
    namaPenerima: string;
    noTelpon: string;
    alamat: string;
    kabupaten?: string;
    kecamatan?: string;
    ongkir?: number;
    totalBayar: number;
    metodeBayar?: string;
    statusBayar: string;
    statusPesanan: string;
    nomorResi?: string;
    createdAt: string;
    detailPesanan?: DetailItem[];
};

const STATUS_OPTIONS = ["diproses", "diterima", "dikemas", "dikirim", "selesai"];

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
        diterima: "bg-indigo-100 text-indigo-700",
        dikemas: "bg-orange-100 text-orange-700",
        dikirim: "bg-purple-100 text-purple-700",
        selesai: "bg-green-100 text-green-700",
        dibatalkan: "bg-red-100 text-red-700",
    };
    return map[status.toLowerCase()] ?? "bg-gray-100 text-gray-500";
};

const formatTanggal = (raw: string) => {
    try {
        return new Date(raw).toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "-";
    }
};

export default function Transaksi() {
    const [pesanan, setPesanan] = useState<Pesanan[]>([]);
    const [search, setSearch] = useState("");
    const [selectedPesanan, setSelectedPesanan] = useState<Pesanan | null>(null);

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
            await getPesanan();
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

    const handleUpdateStatus = async (
        pesananId: string,
        statusPesanan: string,
    ) => {
        if (statusPesanan === "dikirim") {
            handleKirim(pesananId);
            return;
        }

        try {
            await updateStatusPesananApi(pesananId, statusPesanan);
            getPesanan();
        } catch (error) {
            console.log(error);
            alert("Gagal memperbarui status pesanan");
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
                                            "Total",
                                            "Status Bayar",
                                            "Status Pesanan",
                                            "Ubah Status",
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
                                                onClick={() => setSelectedPesanan(item)}
                                                className="border-t border-gray-100 hover:bg-[#fdf9f5] transition-colors cursor-pointer"
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

                                                <td
                                                    className="px-6 py-5"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {item.statusPesanan === "selesai" ? (
                                                        <span className="text-gray-400 text-sm">
                                                            -
                                                        </span>
                                                    ) : (
                                                        <select
                                                            value={item.statusPesanan}
                                                            onChange={(e) =>
                                                                handleUpdateStatus(
                                                                    item.id,
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#9b6b43] capitalize"
                                                        >
                                                            {STATUS_OPTIONS.map((status) => (
                                                                <option
                                                                    key={status}
                                                                    value={status}
                                                                    className="capitalize"
                                                                >
                                                                    {status}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </td>

                                                <td
                                                    className="px-6 py-5"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {item.statusPesanan === "diproses" ||
                                                    item.statusPesanan === "diterima" ||
                                                    item.statusPesanan === "dikemas" ? (
                                                        <button
                                                            onClick={() => handleKirim(item.id)}
                                                            className="flex items-center gap-2 bg-[#9b6b43] hover:bg-[#7a5434] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                                                        >
                                                            <SendHorizonal size={16} />
                                                            Kirim
                                                        </button>
                                                    ) : item.statusPesanan === "dikirim" ? (
                                                        <span className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                                                            ✓ Dalam Pengiriman
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                                            ✓ Selesai
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

            {/* MODAL DETAIL PESANAN */}
            {selectedPesanan && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedPesanan(null)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white">
                            <div>
                                <p className="text-xs text-gray-400 font-mono">
                                    {selectedPesanan.orderId}
                                </p>
                                <h3 className="text-lg font-bold text-[#5b3a29]">
                                    Detail Pesanan
                                </h3>
                            </div>

                            <button
                                onClick={() => setSelectedPesanan(null)}
                                className="text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* STATUS */}
                            <div className="flex gap-3">
                                <span
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${badgeStatusBayar(selectedPesanan.statusBayar)}`}
                                >
                                    {selectedPesanan.statusBayar}
                                </span>
                                <span
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${badgeStatusPesanan(selectedPesanan.statusPesanan)}`}
                                >
                                    {selectedPesanan.statusPesanan}
                                </span>
                            </div>

                            {/* INFO PENERIMA */}
                            <div className="grid grid-cols-1 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400 mb-1">Nama Penerima</p>
                                    <p className="font-semibold text-[#5b3a29]">
                                        {selectedPesanan.namaPenerima}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-1">Nomor Telepon</p>
                                    <p className="font-semibold text-[#5b3a29]">
                                        {selectedPesanan.noTelpon || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-1">Alamat</p>
                                    <p className="font-semibold text-[#5b3a29]">
                                        {selectedPesanan.alamat || "-"}
                                        {selectedPesanan.kecamatan
                                            ? `, ${selectedPesanan.kecamatan}`
                                            : ""}
                                        {selectedPesanan.kabupaten
                                            ? `, ${selectedPesanan.kabupaten}`
                                            : ""}
                                    </p>
                                </div>

                                {selectedPesanan.nomorResi && (
                                    <div>
                                        <p className="text-gray-400 mb-1">Nomor Resi</p>
                                        <p className="font-semibold text-[#5b3a29]">
                                            {selectedPesanan.nomorResi}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-gray-400 mb-1">Tanggal Pesanan</p>
                                    <p className="font-semibold text-[#5b3a29]">
                                        {formatTanggal(selectedPesanan.createdAt)}
                                    </p>
                                </div>
                            </div>

                            {/* DAFTAR PRODUK */}
                            {selectedPesanan.detailPesanan &&
                                selectedPesanan.detailPesanan.length > 0 && (
                                    <div>
                                        <p className="text-gray-400 mb-2 text-sm">
                                            Produk Dipesan
                                        </p>

                                        <div className="space-y-3">
                                            {selectedPesanan.detailPesanan.map((detail) => (
                                                <div
                                                    key={detail.id}
                                                    className="flex items-center justify-between bg-[#f8f5f1] rounded-2xl px-4 py-3"
                                                >
                                                    <div>
                                                        <p className="font-semibold text-[#5b3a29] text-sm">
                                                            {detail.produk?.namaProduk ?? "-"}
                                                        </p>
                                                        <p className="text-gray-500 text-xs">
                                                            {detail.qty} x Rp
                                                            {detail.harga.toLocaleString("id-ID")}
                                                        </p>
                                                    </div>

                                                    <p className="font-semibold text-[#5b3a29] text-sm">
                                                        Rp{detail.subtotal.toLocaleString("id-ID")}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            {/* TOTAL */}
                            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                                {selectedPesanan.ongkir !== undefined && (
                                    <div className="flex justify-between text-gray-500">
                                        <span>Ongkir</span>
                                        <span>
                                            Rp{selectedPesanan.ongkir.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between text-base font-bold text-[#5b3a29]">
                                    <span>Total Bayar</span>
                                    <span>
                                        Rp{selectedPesanan.totalBayar.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}