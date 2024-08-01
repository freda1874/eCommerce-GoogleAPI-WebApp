import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import ItemDetails from '../components/itemDetails';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SavedItems.css';
import LocationGetter from '../components/LocationGetter'
const Search = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const routerLocation = useLocation();
    const { state } = routerLocation;

    const fetchItemsNearby = useCallback(async (latitude, longitude, search, radius) => {
        try {
            console.log("Updating search");
            setLoading(true);
            const response = await fetch(`/db/items/searchDB?str=${search}&dt=17280&lat=${latitude}&lon=${longitude}&rad=${radius}`);
            const json = await response.json();
            if (response.ok) {
                setItems(json);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchLocationAndItems = async () => {
            try {
                const { latitude, longitude } = await LocationGetter();

                if (state) {
                    const { search, rad } = state;
                    fetchItemsNearby(latitude, longitude, search, rad);
                }
                setInterval(() => {
                    if (state) {
                        const { search, rad } = state;
                        fetchItemsNearby(latitude, longitude, search, rad);
                    }
                }, 500000);
            } catch (error) {
                console.error("Error getting location:", error);
            }
        };

        fetchLocationAndItems();
    }, [fetchItemsNearby, state]);

    const sortItemsByDate = () => {
        const sortedItems = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItems(sortedItems);
    };

    return (
        <div className="search-page container">
            <SearchBar />

            {loading && items ? (
                <div className="fa-3x">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <div className="items-table" style={{ width: '70%', marginTop: '20px' }}>
                    <div className="d-flex justify-content-center mb-3">
                        <button onClick={sortItemsByDate} className="btn btn-outline-success">Sort by Date (Newest First)</button>
                    </div>
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
