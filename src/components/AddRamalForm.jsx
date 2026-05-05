import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Input from "./Input";
import Select from "./Select";

export function Form({ isOpen, onClose }) {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");

  const [setores, setSetores] = useState([]);
  const [setorId, setSetorId] = useState("");

  useEffect(() => {
    async function fetchSetores() {
      const { data, error } = await supabase
        .from("setores")
        .select("*")
        .order("nome", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setSetores(data);
      }
    }

    fetchSetores();
  }, []);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !numero || !setorId) {
      alert("Preencha tudo");
      return;
    }

    const { error } = await supabase.from("ramais").insert([
      {
        nome: nome,
        numero: numero,
        setor_id: setorId,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Erro ao salvar");
    } else {
      alert("Salvo com sucesso!");
      setNome("");
      setNumero("");
      setSetorId(""); // limpa select também
      onClose();
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-0" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 rounded w-100 p-10 bg-gray-900 z-10"
      >
        <button onClick={onClose} className="flex justify-center items-center bg-red-600 text-white py-2 rounded size-7 font-bold hover:animate-jelly">
          <span>X</span>
        </button>

        <Select
          setores={setores}
          value={setorId}
          onChange={(e) => setSetorId(e.target.value)}
        />

        <Input
          type="text"
          id="name"
          placeholder="Ex: Luiz"
          title="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          type="text"
          id="ramal"
          placeholder="Ex: 1234"
          title="Ramal"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />

        <button type="submit" className="bg-blue-500 p-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}