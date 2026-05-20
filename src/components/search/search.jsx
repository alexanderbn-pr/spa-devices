import './search.scss';

const Search = ({ valueSearch, setValue }) => {
  return (
    <form className="search-container">
      <input
        type="text"
        placeholder="Buscar dispositivos"
        value={valueSearch}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
        aria-label="Buscar dispositivo"
      />
    </form>
  );
};

export default Search;
