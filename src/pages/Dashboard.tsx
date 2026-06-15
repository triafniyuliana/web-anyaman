import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Users,
  Video,
  Package,
  ShoppingCart,
} from "lucide-react";

export default function Dashboard() {
  const dashboardData = [
    {
      title: "Total User",
      total: 120,
      icon: <Users size={35} />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Video",
      total: 45,
      icon: <Video size={35} />,
      bg: "bg-red-500",
    },
    {
      title: "Total Produk",
      total: 78,
      icon: <Package size={35} />,
      bg: "bg-green-500",
    },
    {
      title: "Total Transaksi",
      total: 230,
      icon: <ShoppingCart size={35} />,
      bg: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Dashboard" />

        {/* ISI DASHBOARD */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-[#5b3a29] mb-8">
            Dashboard Admin
          </h1>

          {/* CARD DASHBOARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {dashboardData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:scale-[1.02] transition"
              >
                <div>
                  <p className="text-gray-500 text-lg">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-[#5b3a29]">
                    {item.total}
                  </h2>
                </div>

                <div
                  className={`${item.bg} text-white p-4 rounded-xl`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* TABEL ATAU CHART */}
          <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#5b3a29] mb-4">
              Statistik
            </h2>

            <div className="h-64 flex items-center justify-center text-gray-400 text-xl">
              Grafik atau tabel nanti di sini
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}