import React, { useState } from "react";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";

const Reserve = ({ match }) => {
  const hotel = jsonData.find((hotel) => hotel.id === match.params.id);
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const Confirmation = () => {
    return (
      <div>
        <h4>Hotel reserved successfully!</h4>
        <p>
          <em>Reservation details:</em>
          <br />
          Name: {name}
          <br />
          Telephone: {telephone}
          <br />
          Date of arrival: {arrival}
          <br />
          Date of departure: {departure}
          <br />
          hotels.net may send newsletters by email: {newsletter ? "Yes" : "No"}
          <br />
        </p>
      </div>
    );
  };

  return (
    <main>
      <HotelInfo hotel={hotel} showReserveButton={false} />
      <form onSubmit={handleSubmit}>
        <h3>Reserve hotel</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="name">Telephone</label>
        <input
          type="text"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <br />
        <label htmlFor="arrival">Date of arrival</label>
        <input
          type="date"
          name="arrival"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
        />
        <br />
        <label htmlFor="departure">Date of departure</label>
        <input
          type="date"
          name="departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <br />
        <input
          type="checkbox"
          name="newsletter"
          value={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
        <label htmlFor="newsletter">
          hotels.net may send newsletters by email
        </label>
        <br />
        <input type="submit" value="Reserve hotel"></input>
      </form>
      {showConfirmation ? <Confirmation /> : ""}
    </main>
  );
};

export default Reserve;
