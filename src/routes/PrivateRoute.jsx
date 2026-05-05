import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    async function verificar() {
      const { data } = await supabase.auth.getSession();

      setLogado(!!data.session);
      setLoading(false);
    }

    verificar();
  }, []);

  if (loading) return null;

  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}