import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSectorButtons } from "../data/SectorsButtonsRender";

import { Footer } from "../components/Footer";
import ReturnLogo from "../components/ReturnLogo";
import ReturnBtn from "../components/ReturnButton";

import { TfiReload } from "react-icons/tfi";

function getImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/plataformas/${path}`;
}

export function SectorPage() {
  const { setor } = useParams();

  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getSectorButtons();
      setButtons(data);
      setLoading(false);
    }

    loadData();
  }, []);

  const sectorData = buttons.find(
    (b) => b.slug === setor
  );

  if (loading) {
    return <TfiReload className="text-blue-600 size-10 animate-spin-counter-clockwise" />
  }

  return (
    <div className="relative flex justify-center items-center flex-col">
      <ReturnBtn />
      <ReturnLogo />

      <div className="flex gap-5 justify-center flex-wrap pl-5 pr-5 md:max-w-[600px]">
        {sectorData?.items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.external ? "_blank" : "_self"}
            rel="noreferrer"
            className="relative flex flex-col justify-center items-center gap-2 size-15 lg:size-23 p-4 bg-blue-800 rounded-lg hover:scale-105 transition group animate-zoom-in"
          >
            <img
              src={getImageUrl(item.img)}
              alt={item.name}
              className="object-contain"
            />

            <span className="absolute rounded-2xl hidden text-white font-bold min-w-max group-hover:flex justify-center bg-gray-700 p-2.5 items-center group-hover:-top-14 text-center text-[15px]">
              {item.name}
              <span className="absolute w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-9 border-t-gray-700 -bottom-2 self-center"></span>
            </span>
          </a>
        ))}
      </div>

      <Footer />
    </div>
  );
}