import React, { useState, useEffect } from "react";
import { countries } from "country-data";
import HotelInfo from "./HotelInfo.js";
import ReservationForm from "./ReservationForm.js";
import jsonData from "../hotels.json";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  reservationForm: {
    margin: "10px 0",
  },
  successInfo: {
    backgroundColor: "#e1ffe8",
  },
}));

const Reserve = ({ match }) => {
  const classes = useStyles();
  const [hotel, setHotel] = useState({});
  const [sentData, setSentData] = useState();

  const updateSentData = (data) => {
    setSentData(data);
  };

  useEffect(() => {
    let newHotel = jsonData.find((hotel) => hotel.id === match.params.id);
    if (newHotel) {
      if (!newHotel.country) {
        newHotel.country = countries[newHotel.countryCode].name;
      }
      if (newHotel.imageUrl[0] === ".") {
        newHotel.imageUrl = newHotel.imageUrl.slice(1);
      }
      setHotel(newHotel);
    }
  }, [match.params.id]);

  const Confirmation = () => {
    return (
      <Card className={classes.successInfo}>
        <Typography variant="body1" gutterBottom>
          Hotel reserved successfully!
        </Typography>
        <Typography variant="body2">
          <em>Reservation details:</em>
          <br />
          Name: {sentData.name}
          <br />
          Telephone: {sentData.telephone}
          <br />
          Date of arrival: {sentData.arrival}
          <br />
          Date of departure: {sentData.departure}
          <br />
          hotels.net may send newsletters by email:{" "}
          {sentData.newsletter ? "Yes" : "No"}
        </Typography>
      </Card>
    );
  };

  return (
    <main>
      <HotelInfo hotel={hotel} showReserveButton={false} />

      <Card className={classes.reservationForm}>
        <ReservationForm updateSentData={updateSentData} />
      </Card>

      {sentData ? <Confirmation /> : ""}
    </main>
  );
};

export default Reserve;
