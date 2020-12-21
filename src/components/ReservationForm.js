import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  startOfToday,
  startOfTomorrow,
  format,
  isValid,
  parseISO,
} from "date-fns";
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const ReservationForm = ({ updateSentData }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
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
      if (!values.email) {
        errors.email = "Email is required.";
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
      updateSentData(values);
    },
  });

  return (
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
      <FormControl fullWidth margin="dense">
        <TextField
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          id="telephone"
          label="Telephone"
          value={formik.values.telephone}
          onChange={formik.handleChange}
          error={formik.touched.telephone && Boolean(formik.errors.telephone)}
          helperText={formik.touched.telephone && formik.errors.telephone}
        />
      </FormControl>
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
      <FormControlLabel
        value={formik.values.newsletter}
        onChange={() =>
          formik.setFieldValue("newsletter", !formik.values.newsletter)
        }
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
  );
};

export default ReservationForm;
