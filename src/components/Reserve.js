import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { countries } from "country-data";
import HotelInfo from "./HotelInfo.js";
import ReservationForm from "./ReservationForm.js";
import jsonData from "../hotels.json";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles(() => ({
  reservationForm: {
    margin: "10px 0",
  },
  successInfo: {
    backgroundColor: "#e1ffe8",
  },
  bottomMargin: {
    marginBottom: "10px",
  },
  backButton: {
    marginLeft: "10px",
  },
  backIcon: {
    paddingRight: "5px",
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
    } else {
      setHotel(null);
    }
  }, [match.params.id]);

  const Confirmation = () => {
    return (
      <Card className={`${classes.successInfo} ${classes.bottomMargin}`}>
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
      {hotel ? (
        <Fragment>
          <HotelInfo hotel={hotel} showReserveButton={false} />
          <Card className={classes.reservationForm}>
            <ReservationForm updateSentData={updateSentData} />
          </Card>
        </Fragment>
      ) : (
        <Card className={classes.bottomMargin}>Hotel not found.</Card>
      )}

      {sentData ? <Confirmation /> : ""}

      <Button
        variant="outlined"
        component={Link}
        to={"/"}
        className={classes.backButton}
      >
        <KeyboardBackspaceIcon className={classes.backIcon} /> Back
      </Button>
    </main>
  );
};

export default Reserve;
