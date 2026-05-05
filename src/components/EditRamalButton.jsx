import { MdOutlineContactPhone  } from "react-icons/md";

export function EditRamalButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex justify-center items-center size-23 rounded-md bg-blue-700 cursor-pointer hover:scale-105 transition"
    >
      <span className="text-white text-5xl">
        <MdOutlineContactPhone />
      </span>

      <span className="absolute rounded-2xl hidden text-white font-bold min-w-max group-hover:flex justify-center bg-gray-700 p-2.5 items-center group-hover:-top-14 text-center text-[15px]">
        <span>Editar Ramais</span>
        <span className="absolute w-0 h-0 x border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-9 border-t-gray-700 -bottom-2 self-center"></span>
      </span>

    </button>
  );
}