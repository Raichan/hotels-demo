import React, { useState } from "react";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  TextField,
  Card,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  startOfToday,
  startOfTomorrow,
  format,
  isValid,
  parseISO,
} from "date-fns";

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
  const hotel = jsonData.find((hotel) => hotel.id === match.params.id);
  const [sentData, setSentData] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      telephone: "",
      arrival: format(startOfToday(), "yyyy-MM-dd"),
      departure: format(startOfTomorrow(), "yyyy-MM-dd"),
      newsletter: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required.";
      }
      if (!values.telephone) {
        errors.telephone = "Telephone is required.";
      }
      // Text won't be shown in UI due to the datepicker's own error message
      // overriding it, but error is needed to prevent form submission
      if (!isValid(parseISO(values.arrival))) {
        errors.arrival = "Invalid date.";
      }
      if (!isValid(parseISO(values.departure))) {
        errors.departure = "Invalid date.";
      }
      return errors;
    },
    onSubmit: (values) => {
      // Making an imaginary POST request here
      setSentData(values);
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="body1">Reserve hotel</Typography>
          <FormControl fullWidth margin="dense">
            <TextField
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <br />
          <FormControl fullWidth margin="dense">
            <TextField
              id="telephone"
              label="Telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              error={
                formik.touched.telephone && Boolean(formik.errors.telephone)
              }
              helperText={formik.touched.telephone && formik.errors.telephone}
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
                value={formik.values.arrival}
                onChange={(value) => {
                  formik.setFieldValue(
                    "arrival",
                    isValid(value) ? format(value, "yyyy-MM-dd") : value
                  );
                }}
                autoOk={true}
                invalidDateMessage="Invalid date."
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
                id="date-of-departure"
                label="Date of departure"
                value={formik.values.departure}
                onChange={(value) => {
                  formik.setFieldValue(
                    "departure",
                    isValid(value) ? format(value, "yyyy-MM-dd") : value
                  );
                }}
                autoOk={true}
                invalidDateMessage="Invalid date."
                KeyboardButtonProps={{
                  "aria-label": "Date of departure",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <br />
          <FormControlLabel
            value={formik.values.newsletter}
            onChange={formik.handleChange}
            control={<Checkbox color="primary" />}
            label={
              <Typography variant="body2">
                hotels.net may send newsletters by email
              </Typography>
            }
            labelPlacement="end"
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
