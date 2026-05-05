import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ReturnLogo from "../components/ReturnLogo"
import ReturnButtom from "../components/ReturnButton"
import {Footer} from "../components/Footer"

export function Ramais() {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [setores, setSetores] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Buscar empresas
  useEffect(() => {
    async function fetchEmpresas() {
      const { data } = await supabase
        .from("empresas")
        .select("*")
        .order("nome");

      setEmpresas(data || []);
    }

    fetchEmpresas();
  }, []);

  // 🔹 Buscar setores quando selecionar empresa
  useEffect(() => {
    if (!empresaSelecionada) return;

    async function fetchSetores() {
      const { data } = await supabase
        .from("setores")
        .select(`
          id,
          nome,
          ramais (
            id,
            nome,
            numero
          )
        `)
        .eq("empresa_id", empresaSelecionada);

      setSetores(data || []);
    }

    fetchSetores();
  }, [empresaSelecionada]);

  // 🔹 Pegar nome da empresa selecionada
  const empresa = empresas.find(
    (e) => e.id === empresaSelecionada
  );

  return (
    <div className="flex flex-col justify-center items-center p-5 text-white 
    ">
      <ReturnLogo/>
      <ReturnButtom/>

      {/* 🔘 Botões de empresas */}
      <div className="flex gap-3 mb-5 items-center justify-center flex-wrap animate-expand-vertically">
        {empresas.map((e, index) => (
          <button
            key={e.id}
            onClick={() => {
              setEmpresaSelecionada(e.id);
              setIsOpen(true);
            }}
            className={`px-4 py-2 rounded transition w-60 h-15 font-bold text-2xl hover:animate-squeeze ${index === 1 ? "bg-green-700 hover:bg-green-700/50" : "bg-blue-700 hover:bg-blue-700/50"}`}
          >
            {e.nome}
          </button>
        ))}
      </div>

      {/* 💥 Modal */}
      {isOpen && (
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 w-auto"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-[#3b82f6] p-3 rounded-2xl w-auto max-h-[85vh] overflow-y-auto shadow-2xl overflow-hidden animate-zoom-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white w-full text-center border-b border-white pb-3">
              {empresa?.nome || "Setores"}
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded flex items-center justify-center font-bold"
            >
              X
            </button>
          </div>

          {/* Grid setores */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-3 justify-items-center">
            {setores.map((setor, index) => (
              <div
                key={setor.id}
                className={`bg-[#b7d7f1] rounded-xl p-4 shadow-md border border-black/50 animate-expand-vertically ${setores.length === 1 ? "lg:col-start-2" : ""}`}
              >
                {/* Nome setor */}
                <h3 className="text-center font-bold text-black text-lg mb-3 border-b border-white pb-2">
                  {setor.nome}
                </h3>

                {/* Header tabela */}
                <div className="flex bg-blue-800 text-white font-bold text-sm">
                  <span className="p-2 text-center justify-center items-center w-60">Nome</span>
                  <span className="p-2 text-center justify-center items-center w-20 border-l">Ramal</span>
                </div>

                {/* Ramais */}
                {setor.ramais?.map((r, index) => (
                  <div
                    key={r.id}
                    className={`flex text-sm animate-expand-vertically ${
                      index % 2 === 0
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <span className="flex p-2 text-center justify-center items-center w-60">
                      {r.nome}
                    </span>
                    <span className="flex p-2 text-center justify-center items-center w-20 border-l">
                      {r.numero}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    <Footer/>
    </div>
  );
}