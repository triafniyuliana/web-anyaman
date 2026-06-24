import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
  getDetailTutorialVideoApi,
  updateTutorialVideoApi,
  imageUrl,
} from "../../services/api";

export default function EditTutorialVideo() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [thumbnail, setThumbnail] =
    useState<File | null>(null);

  const [video, setVideo] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] = useState({
    title: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response =
            await getDetailTutorialVideoApi(
              id,
            );

          const data =
            response.data;

          setForm({
            title:
              data.title || "",
          });

          if (
            data.thumbnail
          ) {
            setPreview(
              imageUrl(
                data.thumbnail,
              ),
            );
          }
        }
      } catch (error) {
        console.log(error);

        alert(
          "Gagal mengambil detail video",
        );
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleThumbnail = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (file) {
      setThumbnail(file);

      setPreview(
        URL.createObjectURL(
          file,
        ),
      );
    }
  };

  const handleVideo = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (file) {
      setVideo(file);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const formData =
        new FormData();

      formData.append(
        "title",
        form.title,
      );

      if (thumbnail) {
        formData.append(
          "thumbnail",
          thumbnail,
        );
      }

      if (video) {
        formData.append(
          "video",
          video,
        );
      }

      await updateTutorialVideoApi(
        id as string,
        formData,
      );

      alert(
        "Video berhasil diupdate",
      );

      navigate(
        "/tutorial-video",
      );
    } catch (error) {
      console.log(error);

      alert(
        "Gagal update video",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1eb]">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Edit Tutorial Video" />

        <div className="p-8">
          <div className="bg-white rounded-3xl shadow-sm p-10 max-w-5xl mx-auto">
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >
              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Thumbnail
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleThumbnail
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-28 rounded-xl object-cover mt-4 border"
                  />
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Judul Video
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    form.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Masukkan judul video"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#9b6b43]"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#5b3a29] mb-3">
                  Ganti Video
                </label>

                <input
                  type="file"
                  accept="video/mp4,video/*"
                  onChange={
                    handleVideo
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4"
                />

                {video && (
                  <p className="mt-2 text-sm text-gray-500">
                    {video.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#9b6b43] hover:bg-[#7a5434] text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all"
              >
                Update Video
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}