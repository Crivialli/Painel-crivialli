import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Select from "./Select";

export function AddPlatformForm({ isOpen, onClose }) {
  const [setores, setSetores] = useState([]);
  const [setorId, setSetorId] = useState("");

  const [nome, setNome] = useState("");
  const [url, setUrl] = useState("");
  const [external, setExternal] = useState(true);

  const [file, setFile] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchData() {
      const { data: setoresData } = await supabase
        .from("setores")
        .select("*")
        .order("nome");

      setSetores(setoresData || []);

      const { data: files } = await supabase.storage
        .from("plataformas")
        .list();

      setExistingImages(files || []);
    }

    fetchData();
  }, [isOpen]);

  // 🔥 limpa memória do preview
  useEffect(() => {
    return () => {
      if (preview && file) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, file]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = "";

      // 🔥 CASO 1: upload novo
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("plataformas")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("plataformas")
          .getPublicUrl(fileName);

        imagePath = data.publicUrl;
      }

      // 🔥 CASO 2: imagem já existente
      else if (selectedImage) {
        const { data } = supabase.storage
          .from("plataformas")
          .getPublicUrl(selectedImage);

        imagePath = data.publicUrl;
      }

      // 🔥 validação
      else {
        alert("Selecione ou envie uma imagem");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("plataformas")
        .insert({
          setor_id: setorId,
          nome,
          url,
          img: imagePath,
          external,
          ativo: true,
          ordem: 0,
        });

      if (error) throw error;

      alert("Botão adicionado!");

      // reset
      setSetorId("");
      setNome("");
      setUrl("");
      setExternal(true);
      setFile(null);
      setSelectedImage("");
      setPreview(null);

      //onClose();
    } catch (error) {
      console.error(error);
      alert("Erro: " + error.message);
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div
        className="bg-gray-900 p-5 rounded w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-white text-xl">Adicionar Botão</h2>

          <button
            onClick={onClose}
            className="bg-red-600 text-white size-7 rounded"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Select
            setores={setores}
            value={setorId}
            onChange={(e) => setSetorId(e.target.value)}
          />

          <div className="mt-5 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
              required
            />

            {/* Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                setFile(selectedFile);
                setSelectedImage("");

                if (selectedFile) {
                  const previewUrl = URL.createObjectURL(selectedFile);
                  setPreview(previewUrl);
                }
              }}
              className="bg-gray-800 text-white p-2 rounded"
            />

            {/* Selecionar existente */}
            <select
              value={selectedImage}
              onChange={(e) => {
                const value = e.target.value;

                setSelectedImage(value);
                setFile(null);

                if (value) {
                  const { data } = supabase.storage
                    .from("plataformas")
                    .getPublicUrl(value);

                  setPreview(data.publicUrl);
                }
              }}
              className="bg-gray-800 text-white p-2 rounded"
            >
              <option value="">Usar imagem existente</option>
              {existingImages.map((img) => (
                <option key={img.name} value={img.name}>
                  {img.name}
                </option>
              ))}
            </select>

            {/* Preview */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 object-contain bg-gray-800 p-2 rounded"
                />
              </div>
            )}

            <label className="flex gap-2 text-white">
              <input
                type="checkbox"
                checked={external}
                onChange={(e) => setExternal(e.target.checked)}
              />
              Abrir em nova aba
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-2 rounded font-bold"
            >
              {loading ? "Enviando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}