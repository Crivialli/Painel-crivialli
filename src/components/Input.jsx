function Input({ type, id, placeholder, title, value, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-white">{title}</span>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-800 text-white rounded-sm p-1 pl-2"
      />
    </div>
  );
}

export default Input;