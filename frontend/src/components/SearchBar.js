import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState(15); //sets default to 5km
  const [searchMethod, setSearchMethod] = useState(0); //sets default to 5km
  const navigate = useNavigate();

  const searchItems = async (e) => {
    e.preventDefault();
    navigate("/search", { state: { search: search, rad: radius } }); //sends user to search page innstead of regular page
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'left', padding: '20px' }}>
      <div>
        <div className="row">
          <form
            className="search search-form"
            onSubmit={(e) => {
              searchItems(e);
            }}
          >
            <div className="search form-control" style={{ display: "flex", justifyContent: "center", alignContent: "start" }}>              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder={`Search For Items`}
                style={{ width: "750px" }}
              />
              <button className="btn btn-dark" style={{ width: "100px", marginTop: "10px", marginLeft: "10px" }} type="submit">SEARCH</button>
            </div>
            <input
              type="range"
              min="1"
              max="150"
              step="1"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
            />
            <span>Radius: {radius} kilometers</span>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default SearchBar;
