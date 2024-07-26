import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ItemDetails from "../components/itemDetails";
import LocationEnabler from "../components/LocationEnabler";
// import LocationGetter from "../components/LocationGetter";
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  const [items, setItems] = useState(null);
  // set a defualt search radius
  const searchRadius = 30;

  // call the backed to get all items within radius
  const fetchItemsNearby = async (radius) => {

    console.log("Updating search");
    // search all items based on radius of 30km in toronto as default for project
    const response = await fetch(`/db/items/searchDB?str=%2F&dt=17280&lat=43.7136378&lon=-79.3655763&rad=${radius}`);
    // get the response from the server
    const json = await response.json();
    // if response is ok
    if (response.ok) {
      // display the items 
      setItems(json);
    }
  };

  // a middle man function to identify where the fetchItems call is being made
  const debugCalls = async (radius) => {
    console.log("Home.js - Called from interval");
    fetchItemsNearby(radius);
  }

  // have the fetchItems called every 5 minutes to keep the itemds displayed recent
  // this also allows any items found during scrapping to be pushed to the user
  setInterval(debugCalls, 300000, searchRadius);

  // call the fetchItems once on page load
  useEffect(() => {
    console.log("Home.js - Called from useEffect");
    fetchItemsNearby(searchRadius);
  }, []);

  return (
    <div className="home">
      <SearchBar />
      <LocationEnabler />
      <div className="items-table" style={{ width: "100%" }}>
        <table>
          <tbody>
            {items &&
            items.reduce((rows, item, index) => {
                if (rows[rows.length - 1].length === 4) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(
                  <td key={item.id}><ItemDetails itemModel={item} /></td>
                );
                return rows;
            }, [[]]).map((row, index) => (
                <tr key={index}>
                  {row}
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
