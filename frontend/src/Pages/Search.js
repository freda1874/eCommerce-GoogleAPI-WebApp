import {useEffect, useState, useCallback} from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js'
import ItemDetails from '../components/itemDetails';
import 'bootstrap/dist/css/bootstrap.css';

const Search = () => {
    const [items, setItems] = useState(null);
    const location = useLocation();
    const { state } = location;

    const fetchItems = useCallback(async () => {
        var item = state.search;
        console.log(item);
        var rad = state.rad;
        const response = await fetch(`/db/items/searchDB?str=${item}&dt=17280&lat=43.7136378&lon=-79.3655763&rad=${rad}`);
        const json = await response.json();
        if (response.ok) {
            setItems(json);
        }
    }, [state.search, state.rad]);

    const debugCalls = async (radius) => {
        console.log("Search.js - Called from interval");
        fetchItems();
    }

    setInterval(debugCalls, 300000);

    useEffect(() => {
        console.log("Search.js - Called from useEffect");
        const interval = setInterval(fetchItems, 300000);
        fetchItems();
    
        return () => clearInterval(interval);
    }, [fetchItems, state]); 

    return (
    <div className="search-page">
    <SearchBar />
    <div className="items-table">
    <table>
    <tbody>
        {items &&
        items.reduce((rows, item, index) => {
            rows[rows.length - 1].push(
            <tr key={item.id}>
            <ItemDetails itemModel={item} />
            </tr>
            );
            return rows;
        }, [])}
    </tbody>
    </table>
    </div>
    </div>
    )  
}
//
export default Search
