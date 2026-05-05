import { useState } from "react";
import { buttons } from "../data/HomeButtonsRender";
import { Popup } from "../components/Popup";
import { Footer } from "../components/Footer";
import ReturnLogo from "../components/ReturnLogo";
import { Link } from "react-router-dom";
import { AdminButton } from "../components/AdminButton";

export function HomePage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (

    <div className="flex justify-center items-center flex-col">
      <ReturnLogo/>
      <AdminButton/>
      
      <div className="flex justify-center items-center w-full p-10 gap-6 flex-wrap">
        {buttons.map((button, index) => {
          const Icon = button.icon;

          const content = (
            <>
              {Icon && <Icon size={30} />}
              {button.title}
            </>
          );

          return button.type === "link" ? (
            <Link key={index} to={button.url} target="_blank" className="flex justify-center items-center w-60 p-2.5 gap-2.5 rounded-md text-2xl text-white bg-blue-700 animate-fade-in-up hover:shadow-xl/30 shadow-blue-700 hover:scale-105 transition">
              {content}
            </Link>
          ) : (
            <button key={index} onClick={() => setOpenIndex(index)} className="flex justify-center items-center w-60 p-2.5 gap-2.5 rounded-md text-2xl text-white bg-blue-700 animate-fade-in-up hover:shadow-xl/30 shadow-blue-700 hover:scale-105 transition">
              {content}
            </button>
          );
        })}
      </div>

      {/* POPUP GLOBAL */}
      <Popup
        isOpen={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        title={openIndex !== null ? buttons[openIndex].title : ""}
        items={openIndex !== null ? buttons[openIndex].items : []}
      />

      <Footer/>

    </div>
  );
}