import axios from 'axios';

// URL Backend Render Anda yang baru
export const API_URL = 'https://anyam.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`, // Sesuaikan dengan prefix routing backend Anda (misal /api)
});

// Interceptor untuk menyisipkan Token JWT otomatis ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// IMAGE URL
export const imageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path; // Jika sudah Cloudinary, kembalikan langsung
  return `${API_URL}${path}`; // Jika masih data lama, gunakan Ngrok
};

// LOGIN ADMIN
export const loginAdminApi = async (email: string, password: string) => {
  const response = await api.post("/auth/login-admin", {
    email,
    password,
  });

  return response.data;
};

// GET USERS PROFILE
export const getUsersProfileApi = async () => {
  const response = await api.get("/admin/users-profile");

  return response.data;
};

// GET PENGRAJIN
export const getPengrajinApi = async () => {
  const response = await api.get("/admin/pengrajin");

  return response.data;
};

// CREATE PENGRAJIN
export const createPengrajinApi = async (data: FormData | object) => {
  const response = await api.post("/admin/create-pengrajin", data);

  return response.data;
};

// UPDATE PENGRAJIN
export const updatePengrajinApi = async (
  id: string,
  data: FormData | object,
) => {
  const response = await api.put(`/admin/update-pengrajin/${id}`, data);

  return response.data;
};

// DELETE PENGRAJIN
export const deletePengrajinApi = async (id: string) => {
  const response = await api.delete(`/admin/delete-pengrajin/${id}`);

  return response.data;
};

// GET VIDEO
export const getTutorialVideoApi = async () => {
  const response = await api.get("/admin/tutorial-video");

  return response.data;
};

// GET DETAIL VIDEO
export const getDetailTutorialVideoApi = async (id: string) => {
  const response = await api.get(`/admin/tutorial-video/${id}`);

  return response.data;
};

// CREATE VIDEO
export const createTutorialVideoApi = async (data: FormData | object) => {
  const response = await api.post("/admin/create-tutorial-video", data);

  return response.data;
};

// UPDATE VIDEO
export const updateTutorialVideoApi = async (
  id: string,
  data: FormData | object,
) => {
  const response = await api.put(`/admin/update-tutorial-video/${id}`, data);

  return response.data;
};

// DELETE VIDEO
export const deleteTutorialVideoApi = async (id: string) => {
  const response = await api.delete(`/admin/delete-tutorial-video/${id}`);

  return response.data;
};

// GET PRODUK
export const getProdukApi = async () => {
  const response = await api.get("/admin/produk");

  return response.data;
};

// GET DETAIL PRODUK
export const getDetailProdukApi = async (id: string) => {
  const response = await api.get(`/admin/produk/${id}`);

  return response.data;
};

// CREATE PRODUK
export const createProdukApi = async (data: FormData | object) => {
  const response = await api.post("/admin/create-produk", data);

  return response.data;
};

// UPDATE PRODUK
export const updateProdukApi = async (id: string, data: FormData | object) => {
  const response = await api.put(`/admin/update-produk/${id}`, data);

  return response.data;
};

// DELETE PRODUK
export const deleteProdukApi = async (id: string) => {
  const response = await api.delete(`/admin/delete-produk/${id}`);

  return response.data;
};

// GET PESANAN
export const getPesananApi = async () => {
  const response = await api.get("/admin/pesanan");

  return response.data;
};

// KIRIM PESANAN
export const kirimPesananApi = async (pesananId: string, nomorResi: string) => {
  const response = await api.put(`/admin/pesanan/${pesananId}/kirim`, {
    nomorResi,
  });

  return response.data;
};

// UPDATE STATUS PESANAN
export const updateStatusPesananApi = async (
  pesananId: string,
  statusPesanan: string
) => {
  const response = await api.put(`/admin/pesanan/${pesananId}/status`, {
    statusPesanan,
  });

  return response.data;
};

// ── DASHBOARD ─────────────────────────────────────────────────────
export const getDashboardSummaryApi = async () => {
  const response = await api.get("/admin/dashboard/summary");
  return response.data;
};

export const getBigdataSummaryApi = async () => {
  const response = await api.get("/admin/dashboard/bigdata");
  return response.data;
};

export const getTopViewedProdukApi = async () => {
  const response = await api.get("/admin/produk/top-viewed");
  return response.data;
};

export default api;