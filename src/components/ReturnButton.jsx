import logo from "/Img/Interface/logo-GLPI-250-black.png"
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";

function ReturnButton() {
  return (
    <Link to="/" className="fixed top-5 right-5 flex justify-center items-center size-12 rounded-2xl text-white bg-blue-800 hover:animate-tada">
      <BsFillHouseFill/>
    </Link>
  );
}

export default ReturnButton;