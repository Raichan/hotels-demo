import React, { useEffect, useState } from "react";
import { countries } from "country-data";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";

const Hotels = () => {
  const [hotelList, setHotelList] = useState(jsonData);
  const [locations, setLocations] = useState([]);
  const [filterResults, setFilterResults] = useState(hotelList);
  const [locationFilter, setLocationFilter] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    let newHotelList = hotelList;
    hotelList.forEach((hotel) => {
      if (!hotel.country) {
        hotel.country = countries[hotel.countryCode].name;
      }
    });
    setHotelList(newHotelList);

    setLocations([...new Set(hotelList.map((hotel) => hotel.country))]);
  }, [hotelList]);

  useEffect(() => {
    let newResults = hotelList;
    if (locationFilter !== "") {
      newResults = newResults.filter(
        (hotel) => hotel.country === locationFilter
      );
    }
    if (showAvailableOnly) {
      newResults = newResults.filter((hotel) => hotel.isAvailable);
    }
    setFilterResults(newResults);
  }, [hotelList, locationFilter, showAvailableOnly]);

  return (
    <div>
      <header>
        <select onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="" />
          {locations.map((location) => {
            return <option key={location}>{location}</option>;
          })}
        </select>
        <input
          type="checkbox"
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
        />{" "}
        Is available
      </header>
      <main>
        {filterResults.map((hotel) => {
          return (
            <HotelInfo key={hotel.id} hotel={hotel} showReserveButton={true} />
          );
        })}
      </main>
    </div>
  );
};

export default Hotels;
