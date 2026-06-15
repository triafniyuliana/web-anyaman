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
  deleteTutorialVideoApi,
  getTutorialVideoApi,
  imageUrl,
} from "../../services/api";

type TutorialVideoType = {
  id: string;

  title: string;

  videoUrl: string;

  thumbnail: string;

  createdAt: string;
};

export default function TutorialVideo() {
  const [videos, setVideos] =
    useState<
      TutorialVideoType[]
    >([]);

  const [search, setSearch] =
    useState("");

  // GET VIDEO
  const getVideos =
    async () => {
      try {
        const response =
          await getTutorialVideoApi();

        setVideos(
          response.data,
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    const fetchData =
      async () => {
        await getVideos();
      };

    fetchData();
  }, []);

  // DELETE VIDEO
  const handleDelete =
    async (
      id: string,
    ) => {
      const confirmDelete =
        window.confirm(
          "Yakin ingin menghapus video?",
        );

      if (!confirmDelete)
        return;

      try {
        await deleteTutorialVideoApi(
          id,
        );

        alert(
          "Video berhasil dihapus",
        );

        getVideos();
      } catch (error) {
        console.log(error);

        alert(
          "Gagal menghapus video",
        );
      }
    };

  // FILTER
  const filteredVideos =
    videos.filter((item) =>
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase(),
        ),
    );

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar title="Tutorial Video" />

        {/* PAGE */}
        <div className="p-8">
          {/* SEARCH + BUTTON */}
          <div className="flex items-center justify-between gap-5 mb-8">
            <div className="bg-white rounded-3xl shadow-sm px-8 py-6 w-full md:w-[470px]">
              <div className="relative w-full md:w-[400px]">
                <Search
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Cari video..."
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
              to="/tambah-tutorial-video"
              className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-5 rounded-2xl text-lg font-semibold whitespace-nowrap"
            >
              + Tambah Video
            </Link>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f5f1]">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      No
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Thumbnail
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Judul
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Video URL
                    </th>

                    <th className="px-8 py-6 text-left text-lg font-bold text-[#5b3a29]">
                      Tanggal
                    </th>

                    <th className="px-8 py-6 text-center text-lg font-bold text-[#5b3a29]">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVideos.length >
                  0 ? (
                    filteredVideos.map(
                      (
                        item,
                        index,
                      ) => (
                        <tr
                          key={item.id}
                          className="border-t border-gray-100"
                        >
                          <td className="px-8 py-5">
                            {index + 1}
                          </td>

                          <td className="px-8 py-5">
                            <img
                              src={imageUrl(
                                item.thumbnail,
                              )}
                              alt={
                                item.title
                              }
                              className="w-28 h-20 rounded-xl object-cover"
                            />
                          </td>

                          <td className="px-8 py-5 font-semibold text-[#5b3a29]">
                            {
                              item.title
                            }
                          </td>

                          <td className="px-8 py-5 text-blue-500">
                            <a
                              href={
                                item.videoUrl
                              }
                              target="_blank"
                            >
                              Lihat Video
                            </a>
                          </td>

                          <td className="px-8 py-5">
                            {new Date(
                              item.createdAt,
                            ).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month:
                                  "long",
                                year:
                                  "numeric",
                              },
                            )}
                          </td>

                          <td className="px-8 py-5">
                            <div className="flex items-center justify-center gap-3">
                              {/* EDIT */}
                              <Link
                                to={`/edit-tutorial-video/${item.id}`}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl"
                              >
                                <Pencil
                                  size={
                                    20
                                  }
                                />
                              </Link>

                              {/* DELETE */}
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
                        colSpan={6}
                        className="text-center py-16 text-gray-400 text-xl"
                      >
                        Belum ada video
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