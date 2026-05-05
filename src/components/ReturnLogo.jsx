import logo from "/Img/Interface/logo-GLPI-250-black.png"
import { Link } from "react-router-dom";

function ReturnLogo() {
  return (
    <Link to="/" className="flex justify-center items-center size-70 animate-tada">
      <img src={logo} alt="logo" />
    </Link>
  );
}

export default ReturnLogo;