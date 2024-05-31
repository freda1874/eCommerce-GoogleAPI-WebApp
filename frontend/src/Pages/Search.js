import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js'
import ItemDetails from '../components/itemDetails';
import Sorter from '../components/sorter';
import 'bootstrap/dist/css/bootstrap.css';

const Search = () => {
    const [items, setItems] = useState(null);
    const location = useLocation();
    const { state } = location;

    const fetchItems = async () => {
        var item = state.search;
        console.log(item);
        var rad = state.rad;
        // call searchDB from itemController with deltaTime to be the last two weeks
        // 14*24*60=17280
        const response = await fetch(`/db/items/searchDB?str=${item}&dt=17280&lat=43.7136378&lon=-79.3655763&rad=${rad}`);
        const json = await response.json()
        if (response.ok) {
            setItems(json)
        }
    }

    const debugCalls = async (radius) => {
        console.log("Search.js - Called from interval");
        fetchItems();
    }

    setInterval(debugCalls, 300000);

    useEffect(() => {
        console.log("Search.js - Called from useEffect");
        fetchItems();
    }, [state])

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
