import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Select from "./Select";

export function EditPlatformForm({ isOpen, onClose }) {
  const [setores, setSetores] = useState([]);
  const [setorId, setSetorId] = useState("");
  const [plataformas, setPlataformas] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchSetores() {
      const { data } = await supabase
        .from("setores")
        .select("*")
        .order("nome");

      setSetores(data || []);
    }

    fetchSetores();
  }, [isOpen]);

  useEffect(() => {
    if (!setorId) return;

    async function fetchPlataformas() {
      const { data } = await supabase
        .from("plataformas")
        .select("*")
        .eq("setor_id", setorId)
        .order("nome");

      setPlataformas(data || []);
    }

    fetchPlataformas();
  }, [setorId]);

  function handleChange(id, campo, valor) {
    setPlataformas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  }

  async function salvar(item) {
    const { error } = await supabase
      .from("plataformas")
      .update({
        nome: item.nome,
        url: item.url,
        img: item.img,
        external: item.external,
        ativo: item.ativo,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert("Erro ao salvar");
    } else {
      alert("Atualizado!");
    }
  }

  async function excluir(id) {
    const confirmar = confirm("Deseja excluir este botão?");
    if (!confirmar) return;

    const { error } = await supabase
      .from("plataformas")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao excluir");
    } else {
      setPlataformas((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center"
    >
      <div
        className="bg-gray-900 p-5 rounded w-[700px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-white text-xl">
            Editar Botões
          </h2>

          <button
            onClick={onClose}
            className="flex justify-center items-center bg-red-600 text-white py-2 rounded size-7 font-bold hover:animate-jelly"
          >
            X
          </button>
        </div>

        <Select
          setores={setores}
          value={setorId}
          onChange={(e) => setSetorId(e.target.value)}
        />

        <div className="mt-5 max-h-[500px] overflow-y-auto">
          {plataformas.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-3 rounded mb-3 flex flex-col gap-2"
            >
              <input
                value={item.nome}
                onChange={(e) =>
                  handleChange(
                    item.id,
                    "nome",
                    e.target.value
                  )
                }
                placeholder="Nome"
                className="bg-gray-700 text-white p-2 rounded"
              />

              <input
                value={item.url}
                onChange={(e) =>
                  handleChange(
                    item.id,
                    "url",
                    e.target.value
                  )
                }
                placeholder="URL"
                className="bg-gray-700 text-white p-2 rounded"
              />

              <input
                value={item.img}
                onChange={(e) =>
                  handleChange(
                    item.id,
                    "img",
                    e.target.value
                  )
                }
                placeholder="Imagem"
                className="bg-gray-700 text-white p-2 rounded"
              />

              <div className="flex gap-5 text-white">
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={item.external}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "external",
                        e.target.checked
                      )
                    }
                  />
                  External
                </label>

                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={item.ativo}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "ativo",
                        e.target.checked
                      )
                    }
                  />
                  Ativo
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => salvar(item)}
                  className="bg-green-600 px-3 py-1 rounded text-white"
                >
                  Salvar
                </button>

                <button
                  onClick={() => excluir(item.id)}
                  className="bg-red-600 px-3 py-1 rounded text-white"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}