import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar.js";
import ItemDetails from "../components/itemDetails";
import "bootstrap/dist/css/bootstrap.css";

const Search = () => {
    const [items, setItems] = useState(null);
    const location = useLocation();
    const { state } = location;
    const [loading, setLoading] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        var item = state.search;
        console.log(item);
        var rad = state.rad;
        const response = await fetch(`/db/items/searchDB?str=${item}&dt=17280&lat=43.7136378&lon=-79.3655763&rad=${rad}`);
        const json = await response.json();
        if (response.ok) {
            setItems(json);

        }
        setLoading(false);
    }, [state.search, state.rad]);

    useEffect(() => {
        console.log("Search.js - Called from useEffect");
        fetchItems();
        const interval = setInterval(fetchItems, 200000);


        return () => clearInterval(interval);
    }, [fetchItems]);
    return (
        <div className="search-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SearchBar />
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
