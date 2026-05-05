import { Link } from "react-router";
import { RiAdminFill  } from "react-icons/ri";

export function AdminButton({ onClick }) {
  return (
    <Link
      onClick={onClick}
      to={"/login"}
      className="absolute top-5 right-5 flex justify-center items-center size-12 rounded-md bg-blue-700 cursor-pointer hover:scale-105 transition"
    >
      <span className="text-white text-2xl">
        <RiAdminFill />
      </span>
    </Link>
  );
}