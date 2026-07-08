import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Users,
  Video,
  Package,
  ShoppingCart,
  TrendingUp,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  getDashboardSummaryApi,
  getBigdataSummaryApi,
  getTopViewedProdukApi,
} from "../services/api";
interface Top3Item {
  ranking: number;
  keyword: string;
  jumlahDicari: number;
  persentase: number;
}

interface TrendsItem {
  keyword: string;
  jumlahDicari: number;
  rataMinat: number;
  maxMinat: number;
}

interface TopViewedProduk {
  id: string;
  namaProduk: string;
  viewCount: number;
}

interface SummaryData {
  totalUser: number;
  totalVideo: number;
  totalProduk: number;
  totalTransaksi: number;
}

interface BigdataData {
  totalPencarian: number;
  top3Produk: Top3Item[];
  googleTrends: TrendsItem[];
}

const RANKING_COLOR = ["#c0392b", "#e67e22", "#27ae60"];
const RANKING_LABEL = ["🥇", "🥈", "🥉"];

export default function Dashboard() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [bigdata, setBigdata] = useState<BigdataData | null>(null);
  const [topViewedProduk, setTopViewedProduk] = useState<TopViewedProduk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, b, t] = await Promise.all([
          getDashboardSummaryApi(),
          getBigdataSummaryApi(),
          getTopViewedProdukApi(),
        ]);

        setSummary(s.data);
        setBigdata(b.data);
        setTopViewedProduk(t.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const dashboardData = [
    {
      title: "Total User",
      total: summary?.totalUser ?? "-",
      icon: <Users size={35} />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Video",
      total: summary?.totalVideo ?? "-",
      icon: <Video size={35} />,
      bg: "bg-red-500",
    },
    {
      title: "Total Produk",
      total: summary?.totalProduk ?? "-",
      icon: <Package size={35} />,
      bg: "bg-green-500",
    },
    {
      title: "Total Transaksi",
      total: summary?.totalTransaksi ?? "-",
      icon: <ShoppingCart size={35} />,
      bg: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Dashboard" />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-[#5b3a29] mb-8">
            Dashboard Admin
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {dashboardData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:scale-[1.02] transition"
              >
                <div>
                  <p className="text-gray-500 text-lg">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2 text-[#5b3a29]">
                    {loading ? "..." : item.total}
                  </h2>
                </div>

                <div className={`${item.bg} text-white p-4 rounded-xl`}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={22} className="text-[#5b3a29]" />
                <h2 className="text-2xl font-bold text-[#5b3a29]">
                  Top 3 Produk Dicari
                </h2>
              </div>

              {loading ? (
                <div className="h-40 flex items-center justify-center text-gray-400">
                  Memuat data...
                </div>
              ) : (
                <div className="space-y-4">
                  {(bigdata?.top3Produk ?? []).map((item) => (
                    <div key={item.ranking} className="flex items-center gap-4">
                      <span className="text-2xl w-8 text-center">
                        {RANKING_LABEL[item.ranking - 1]}
                      </span>

                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-[#5b3a29] capitalize">
                            {item.keyword}
                          </span>

                          <span className="text-sm text-gray-500">
                            {item.jumlahDicari}x · {item.persentase}%
                          </span>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-700"
                            style={{
                              width: `${item.persentase}%`,
                              backgroundColor:
                                RANKING_COLOR[item.ranking - 1] ?? "#8884d8",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-500">
                <Search size={16} />
                <span className="text-sm">
                  Total pencarian:{" "}
                  <span className="font-semibold text-[#5b3a29]">
                    {bigdata?.totalPencarian ?? 0}x
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={22} className="text-[#5b3a29]" />
                <h2 className="text-2xl font-bold text-[#5b3a29]">
                  Total Pencarian Google Trends
                </h2>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  layout="vertical"
                  data={bigdata?.googleTrends ?? []}
                  margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#888" }}
                  />

                  <YAxis
                    type="category"
                    dataKey="keyword"
                    tick={{ fontSize: 11, fill: "#5b3a29" }}
                    width={110}
                  />

                  <Tooltip
                    formatter={(value) => [`${value}x`, "Jumlah Dicari"]}
                  />

                  <Bar dataKey="jumlahDicari" radius={[0, 6, 6, 0]}>
                    {(bigdata?.googleTrends ?? []).map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          index < 3
                            ? RANKING_COLOR[index % 3]
                            : "#8884d8"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
  <div className="flex items-center gap-2 mb-6">
    <Package size={22} className="text-[#5b3a29]" />
    <h2 className="text-2xl font-bold text-[#5b3a29]">
      Produk Paling Banyak Dilihat
    </h2>
  </div>

  <ResponsiveContainer width="100%" height={350}>
    <BarChart
      layout="vertical"
      data={topViewedProduk}
      margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#f0f0f0"
        horizontal={false}
      />

      <XAxis
        type="number"
        tick={{ fontSize: 11, fill: "#888" }}
      />

      <YAxis
        type="category"
        dataKey="namaProduk"
        tick={{ fontSize: 11, fill: "#5b3a29" }}
        width={120}
      />

      <Tooltip
        formatter={(value) => [`${value}x`, "Jumlah Dilihat"]}
      />

      <Bar
        dataKey="viewCount"
        radius={[0, 6, 6, 0]}
      >
        {topViewedProduk.map((_, index) => (
          <Cell
            key={index}
            fill={
              index < 3
                ? RANKING_COLOR[index % 3]
                : "#8884d8"
            }
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
        </div>
      </div>
    </div>
  );
}