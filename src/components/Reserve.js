import React, { useState } from "react";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Input,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  reservationForm: {
    margin: "10px 0",
  },
  successInfo: {
    backgroundColor: "#e1ffe8",
  },
}));

const Reserve = ({ match }) => {
  const classes = useStyles();
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
      <Card className={classes.successInfo}>
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
      </Card>
    );
  };

  return (
    <main>
      <HotelInfo hotel={hotel} showReserveButton={false} />
      <Card className={classes.reservationForm}>
        <form onSubmit={handleSubmit}>
          <h3>Reserve hotel</h3>
          <FormControl fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="telephone">Telephone</InputLabel>
            <Input
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="date-of-arrival">Date of arrival</InputLabel>
            <Input
              id="date-of-arrival"
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="date-of-departure">
              Date of departure
            </InputLabel>
            <Input
              id="date-of-departure"
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControlLabel
            value={newsletter}
            control={<Checkbox color="primary" />}
            label="hotels.net may send newsletters by email"
            labelPlacement="end"
            onChange={(e) => setNewsletter(e.target.checked)}
          />
          <br />
          <Button type="submit">Reserve hotel</Button>
        </form>
      </Card>
      {showConfirmation ? <Confirmation /> : ""}
    </main>
  );
};

export default Reserve;
