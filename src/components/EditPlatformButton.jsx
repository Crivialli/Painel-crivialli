// src/components/AddPlatformButton.jsx
import { FaEdit } from "react-icons/fa";

export function EditPlatformButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative group flex justify-center items-center gap-2 size-23 rounded-md bg-blue-700 cursor-pointer hover:scale-105 transition"
    >
      <span className="text-white text-5xl">
        <FaEdit />
      </span>

      <span className="absolute rounded-2xl hidden text-white font-bold min-w-max group-hover:flex justify-center bg-gray-700 p-2.5 items-center group-hover:-top-14 text-center text-[15px]">
        <span>Editar Botão</span>
        <span className="absolute w-0 h-0 x border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-9 border-t-gray-700 -bottom-2 self-center"></span>
      </span>
    </button>
  );
}