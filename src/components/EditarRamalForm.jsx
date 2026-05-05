import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Select from "./Select";

export function EditarRamais({ isOpen, onClose }) {
  const [setores, setSetores] = useState([]);
  const [setorId, setSetorId] = useState("");
  const [ramais, setRamais] = useState([]);

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

    async function fetchRamais() {
      const { data } = await supabase
        .from("ramais")
        .select("*")
        .eq("setor_id", setorId);

      setRamais(data || []);
    }

    fetchRamais();
  }, [setorId]);

  function handleChange(id, campo, valor) {
    setRamais((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [campo]: valor } : r
      )
    );
  }

  async function salvar(ramal) {
    const { error } = await supabase
      .from("ramais")
      .update({
        nome: ramal.nome,
        numero: ramal.numero,
      })
      .eq("id", ramal.id);

    if (error) {
      console.error(error);
      alert("Erro ao salvar");
    } else {
      alert("Atualizado!");
    }
  }

  // 🚨 NÃO renderiza se estiver fechado
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center" onClick={onClose}>
      <div className="bg-gray-900 p-5 rounded w-[500px]" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between mb-4">
          <h2 className="text-white text-xl">Editar Ramais</h2>
          <button
            onClick={onClose}
            className="flex justify-center items-center bg-red-600 text-white py-2 rounded size-7 font-bold hover:animate-jelly"
          >
            <span>X</span>
          </button>
        </div>

        <Select
          setores={setores}
          value={setorId}
          onChange={(e) => setSetorId(e.target.value)}
        />

        <div className="mt-5 max-h-[300px] overflow-y-auto">
          {ramais.map((r) => (
            <div key={r.id} className="flex gap-3 items-center mb-2">
              
              <input
                value={r.nome}
                onChange={(e) =>
                  handleChange(r.id, "nome", e.target.value)
                }
                className="bg-gray-800 text-white p-1 rounded flex-1"
              />

              <input
                value={r.numero}
                onChange={(e) =>
                  handleChange(r.id, "numero", e.target.value)
                }
                className="bg-gray-800 text-white p-1 rounded w-24"
              />

              <button
                onClick={() => salvar(r)}
                className="bg-green-600 px-2 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}