// src/data/SectorsButtonsRender.js
import { supabase } from "../lib/supabase";

export async function getSectorButtons() {
  const { data, error } = await supabase
    .from("setores")
    .select(`
      id,
      nome,
      slug,
      plataformas (
        id,
        nome,
        url,
        img,
        external,
        ordem,
        ativo
      )
    `)
    .order("nome");

  if (error) {
    console.log("Erro ao buscar setores:", error);
    return [];
  }

  const buttons = data.map((setor) => ({
    title: setor.nome,
    slug: setor.slug,

    items: setor.plataformas
      ?.filter((item) => item.ativo)
      ?.sort((a, b) => a.ordem - b.ordem)
      ?.map((item) => ({
        id: item.id,
        name: item.nome,
        url: item.url,
        img: item.img,
        external: item.external,
      })) || [],
  }));

  return buttons;
}