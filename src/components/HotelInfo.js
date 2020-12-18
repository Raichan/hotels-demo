import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const HotelInfo = ({ hotel, showReserveButton }) => {
  const ReserveButton = () => {
    return (
      <Link to={`/reserve/${hotel.id}`}>
        <button type="button">View deal</button>
      </Link>
    );
  };

  return (
    <div>
      <p>
        {hotel.name}
        <br />
        {`${hotel.city}, ${hotel.country}`}
        <br />
        Available: {hotel.isAvailable ? "Yes" : "No"}
        <br />
        Swimming pool: {hotel.hasSwimmingPool ? "Yes" : "No"}
        <br />
        <NumberFormat
          value={hotel.price}
          displayType={"text"}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator={","}
          suffix={" €"}
        />
        <br />
        {showReserveButton ? <ReserveButton /> : ""}
      </p>
    </div>
  );
};

export default HotelInfo;
