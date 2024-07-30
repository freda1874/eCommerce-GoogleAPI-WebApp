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
    const [loading, setLoading] = useState(false);

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
        fetchItems();
        const interval = setInterval(fetchItems, 300000);
        return () => clearInterval(interval);
    }, [fetchItems]);

        useEffect(() => {
            if (state) {
                setLoading(true);
                const item = state.search;
                console.log(item);
                const rad = state.rad;
                const fetchData = async () => {
                    const response = await fetch(`/db/items/searchDB?str=${item}&dt=17280&lat=43.7136378&lon=-79.3655763&rad=${rad}`);
                    const json = await response.json();
                    if (response.ok) {
                        setItems(json);
                    }
                    setLoading(false);
                };
                fetchData();
            }
        }, [state]);

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
            {loading && items ? (
                <div>Loading， please wait a few seconds...</div>
            ) : (
                <div className="items-table" style={{ width: '70%', marginTop: '20px' }}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            {items &&
                                items.reduce((rows, item, index) => {
                                    if (index % 3 === 0) {
                                        rows.push([]);
                                    }
                                    rows[rows.length - 1].push(
                                        <td key={item.id} style={{ width: '33%' }}>
                                            <ItemDetails itemModel={item} />
                                        </td>
                                    );
                                    return rows;
                                }, []).map((row, index) => (
                                    <tr key={index}>
                                        {row}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Search;
