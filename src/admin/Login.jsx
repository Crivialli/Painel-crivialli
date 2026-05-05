import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../components/ReturnButton"
import { Footer } from "../components/Footer";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
        setErro("Email ou senha inválidos");
    } else {
        navigate("/admin");
    }

    setLoading(false);
  }

  return (
    <div className="relative flex justify-center items-center min-h-dvh overflow-hidden w-dvw">

        {/* Fundo */}
        <div className="absolute inset-0 bg-[url('/Img/AdImages/Login.gif')] bg-cover bg-center blur-md scale-110"></div>

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/80"></div>

        <ReturnButton />

        {/* Card Login */}
        <form
            onSubmit={handleLogin}
            className="relative z-10 w-[430px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl px-10 py-12"
        >
            {/* Título */}
            <h1 className="text-white text-3xl font-bold text-center mb-10">
            Faça login como <span className="text-blue-400">Admin</span>
            </h1>

            {/* Erro */}
            {erro && (
            <div className="mb-5 bg-red-500/20 border border-red-400 text-red-200 p-3 rounded-lg text-sm text-center">
                {erro}
            </div>
            )}

            {/* Inputs */}
            <div className="flex flex-col gap-6">

            <div>
                <label className="text-white text-sm mb-2 block">
                Email
                </label>

                <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition"
                />
            </div>

            <div>
                <label className="text-white text-sm mb-2 block">
                Senha
                </label>

                <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition"
                />
            </div>

            </div>

            {/* Botão */}
            <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition py-3 text-white font-bold text-lg shadow-lg disabled:opacity-60"
            >
            {loading ? "Entrando..." : "Entrar"}
            </button>

            {/* Rodapé */}
            <p className="text-center text-gray-300 text-sm mt-6">
            Acesso restrito ao administrador, caso precise de algo entre em contato com a equipe de T.I ou responssavel.
            </p>
        </form>

        <Footer />
    </div>
  );
}