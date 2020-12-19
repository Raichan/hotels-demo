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
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  reservationForm: {
    margin: "10px 0",
  },
  successInfo: {
    backgroundColor: "#e1ffe8",
  },
  title: {
    marginBottom: "10px",
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
        <Typography variant="body1" className={classes.title}>
          Hotel reserved successfully!
        </Typography>
        <Typography variant="body2">
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
        </Typography>
      </Card>
    );
  };

  return (
    <main>
      <HotelInfo hotel={hotel} showReserveButton={false} />
      <Card className={classes.reservationForm}>
        <form onSubmit={handleSubmit}>
          <Typography variant="body1" className={classes.title}>
            Reserve hotel
          </Typography>
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
            label={
              <Typography variant="body2">
                hotels.net may send newsletters by email
              </Typography>
            }
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
