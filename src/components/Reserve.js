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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { startOfToday, startOfTomorrow, format } from "date-fns";

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
  const [arrival, setArrival] = useState(format(startOfToday(), "yyyy-MM-dd"));
  const [departure, setDeparture] = useState(
    format(startOfTomorrow(), "yyyy-MM-dd")
  );
  const [newsletter, setNewsletter] = useState(false);
  const [sentData, setSentData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { name, telephone, arrival, departure, newsletter };
    // Making an imaginary POST request here
    setSentData(payload);
  };

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
        <form onSubmit={handleSubmit}>
          <Typography variant="body1">Reserve hotel</Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="telephone">Telephone</InputLabel>
            <Input
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="dense"
                id="date-of-arrival"
                label="Date of arrival"
                value={arrival}
                onChange={(date) => setArrival(date)}
                autoOk={true}
                KeyboardButtonProps={{
                  "aria-label": "Date of arrival",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <br />
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="dense"
                id="date-picker-inline"
                label="Date of departure"
                value={departure}
                onChange={(date) => setDeparture(date)}
                autoOk={true}
                KeyboardButtonProps={{
                  "aria-label": "Date of departure",
                }}
              />
            </MuiPickersUtilsProvider>
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
      {Object.keys(sentData).length !== 0 ? <Confirmation /> : ""}
    </main>
  );
};

export default Reserve;
