import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginAdminApi } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // VALIDASI
    if (!email || !password) {
      alert("Email dan password wajib diisi");

      return;
    }

    try {
      setLoading(true);

      // LOGIN API
      const response = await loginAdminApi(email, password);

      console.log(response);

      // VALIDASI RESPONSE
      if (!response.success) {
        alert(response.message);

        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token", response.token);

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(response.user));

      alert("Login berhasil");

      // REDIRECT
      navigate("/dashboard");
    } catch (error: unknown) {
      console.log(error);

      alert(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Login gagal",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5eee6]">
      {/* LEFT */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#6f4e37] to-[#8b5e3c] text-white items-center justify-center relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/5 rounded-full -top-20 -left-20"></div>

        <div className="absolute w-72 h-72 bg-black/10 rounded-full bottom-0 right-0"></div>

        <div className="relative z-10 max-w-lg px-10">
          <h1 className="text-7xl font-extrabold leading-tight mb-6">
            Admin
            <br />
            Dashboard
          </h1>

          <p className="text-xl text-[#f5e6d3] leading-relaxed">
            Login untuk mengelola sistem admin, pengguna, kelas anyaman, dan
            produk.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 bg-[#f8f5f1]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10 border border-[#ead7c3]"
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#4b2e1e]">Login Admin</h1>

            <p className="text-[#8b6b52] mt-3">Masuk ke dashboard admin</p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-[#4b2e1e]">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl border border-[#d6bfa7] bg-[#fffaf5] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-7">
            <label className="block mb-2 text-sm font-semibold text-[#4b2e1e]">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl border border-[#d6bfa7] bg-[#fffaf5] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6f4e37] hover:bg-[#5b3d2a] transition-all duration-300 text-white font-semibold p-4 rounded-2xl shadow-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
