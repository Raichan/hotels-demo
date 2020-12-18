import React from "react";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";

const Reserve = ({ match }) => {
  const hotel = jsonData.find((hotel) => hotel.id === match.params.id);
  return <HotelInfo hotel={hotel} showReserveButton={false} />;
};

export default Reserve;
