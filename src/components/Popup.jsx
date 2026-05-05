import { Link } from "react-router-dom";

export function Popup({ isOpen, onClose, title, items }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 p-2 flex items-center justify-center bg-black/60 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-blue-800 p-6 rounded-lg shadow-lg flex flex-col gap-3 md:w-dvw"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-end">
          <button
            onClick={onClose}
            className="flex justify-center items-center bg-red-600 text-white py-2 rounded size-7 font-bold hover:animate-jelly"
          >
            <span>X</span>
          </button>
        </div>

        <h2 className="text-white text-xl font-bold border-b-2 border-b-white/30">
          {title}
        </h2>

        <div className="flex gap-5 justify-center flex-wrap">
          {items.map((item, index) =>
            item.external ? (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ItemContent item={item} />
              </a>
            ) : (
              <Link key={index} to={item.url}>
                <ItemContent item={item} />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function ItemContent({ item }) {
  return (
    <div className="flex justify-center items-center gap-2 bg-gray-900/30 hover:bg-white/20 rounded-lg cursor-pointer animate-zoom-in hover:animate-jiggle lg:size-25 md:size-20">
      {item.img && (
        <img src={item.img} className="p-2 size-20 object-contain lg:size-20 lg:p-0" />
      )}
    </div>
  );
}