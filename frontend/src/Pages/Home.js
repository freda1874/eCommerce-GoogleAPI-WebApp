import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ItemDetails from "../components/itemDetails";
import LocationEnabler from "../components/LocationEnabler";
import LocationGetter from "../components/LocationGetter";
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  const [items, setItems] = useState(null);
  const [location, setLocation] = useState({
    latitude:
      45.351316478706295, longitude:
      -75.76062756362165
  });
  const searchRadius = 30;


  // Fetch items within radius
  const fetchItemsNearby = async (latitude, longitude, radius) => {
    try {
      console.log("Updating search");

      const response = await fetch(`/db/items/searchDB?str=dress&dt=17280&lat=${latitude}&lon=${longitude}&rad=${radius}`);

      const json = await response.json();

      if (response.ok) {
        const sortedItems = json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setItems(sortedItems);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    const debugCalls = async (latitude, longitude, radius) => {
      console.log("Home.js - Called from interval");
      fetchItemsNearby(latitude, longitude, radius);
    };
    const fetchLocationAndItems = async () => {
      try {
        const { latitude, longitude } = await LocationGetter();
        setLocation({ latitude, longitude });
        fetchItemsNearby(latitude, longitude, searchRadius);

        setInterval(() => {
          debugCalls(latitude, longitude, searchRadius);
        }, 300000); // 5 minutes
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    fetchLocationAndItems();
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
                if (index % 4 === 0) {
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
