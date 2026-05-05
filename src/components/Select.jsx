function Select({ setores, value, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-white mb-1">Setores</span>

      <select
        value={value}
        onChange={onChange}
        className="bg-gray-800 text-white rounded-sm p-2"
      >
        <option value="">Selecione um setor</option>

        {setores && setores.length > 0 ? (
          setores.map((setor) => (
            <option key={setor.id} value={setor.id}>
              {setor.nome}
            </option>
          ))
        ) : (
          <option disabled>Carregando...</option>
        )}
      </select>
    </div>
  );
}

export default Select;