import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import ItemDetails from '../components/itemDetails';
import 'bootstrap/dist/css/bootstrap.css';
import './SavedItems.css';

const Search = () => {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const { state } = location;

    const fetchItems = useCallback(async () => {
        if (state) {
            const { search, rad } = state;
            const response = await fetch(`/db/items/searchDB?str=${search}&dt=17280&lat=43.7136378&lon=-79.3655763&rad=${rad}`);
            const json = await response.json();
            if (response.ok) {
                setItems(json);
            }
        }
    }, [state]);

    useEffect(() => {
        const interval = setInterval(fetchItems, 300000);
        fetchItems();
        return () => clearInterval(interval);
    }, [fetchItems]);

    return (
        <div className="search-page container">
            <SearchBar />
            <div className="row items-container">
                {items && items.map((item) => (
                    <div key={item._id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
                        <ItemDetails itemModel={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
