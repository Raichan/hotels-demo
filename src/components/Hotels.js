import React, { useEffect, useState } from "react";
import { countries } from "country-data";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";

const Hotels = () => {
  const [hotelList, setHotelList] = useState(jsonData);
  const locations = ["Finland", "Spain", "Netherlands"];

  useEffect(() => {
    let newHotelList = hotelList;
    hotelList.forEach((hotel) => {
      if (!hotel.country) {
        hotel.country = countries[hotel.countryCode].name;
      }
    });
    setHotelList(newHotelList);
  }, [hotelList]);

  return (
    <div>
      <select>
        <option value="" />
        {locations.map((location) => {
          return <option key={location}>{location}</option>;
        })}
      </select>
      <input type="checkbox" /> Is available
      {hotelList.map((hotel) => {
        return (
          <HotelInfo key={hotel.id} hotel={hotel} showReserveButton={true} />
        );
      })}
    </div>
  );
};

export default Hotels;
