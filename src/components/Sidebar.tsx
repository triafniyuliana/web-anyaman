import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  const menuClass = (path: string) => {
    return `block px-5 py-4 rounded-2xl transition-all duration-300 text-xl ${
      location.pathname === path
        ? "bg-[#6f4e37] font-semibold"
        : "hover:bg-[#6f4e37] font-medium"
    }`;
  };

  return (
    <div className="w-72 min-h-screen bg-[#5b3d2a] text-white p-7 flex flex-col justify-between shadow-2xl">
      <div>
        {/* LOGO */}
        <div className="mb-14">
          <h1 className="text-5xl font-extrabold tracking-wide">Admin</h1>

          <p className="text-[#e7d3c1] mt-3 text-lg">Dashboard Panel</p>
        </div>

        {/* MENU */}
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" className={menuClass("/dashboard")}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/pengguna" className={menuClass("/pengguna")}>
              Pengguna
            </Link>
          </li>

          <li>
            <Link to="/pengrajin" className={menuClass("/pengrajin")}>
              Pengrajin
            </Link>
          </li>

          <li>
            <Link to="/tutorial-video" className={menuClass("/tutorial-video")}>
              Video Tutorial
            </Link>
          </li>

          <li>
            <Link to="/produk" className={menuClass("/produk")}>
              Produk
            </Link>
          </li>

          <li>
            <Link to="/pesanan" className={menuClass("/pesanan")}>
              Pesanan
            </Link>
          </li>
        </ul>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full bg-[#8b2e2e] hover:bg-[#a83a3a] transition-all duration-300 text-white py-4 rounded-2xl text-xl font-bold shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}
