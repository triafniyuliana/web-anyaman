import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
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
          <h1 className="text-5xl font-bold">contoh</h1>
        </div>
      </div>
    </div>
  );
}
