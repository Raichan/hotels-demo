import React, { useEffect, useState } from "react";
import { countries } from "country-data";
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HotelInfo from "./HotelInfo.js";
import jsonData from "../hotels.json";

const useStyles = makeStyles(() => ({
  locationFilter: {
    color: "primary",
    width: "200px",
  },
  leftMargin: {
    marginLeft: "0px",
  },
}));

const Hotels = () => {
  const classes = useStyles();
  const [hotelList, setHotelList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    let newHotelList = jsonData;
    newHotelList.forEach((hotel) => {
      if (!hotel.country) {
        hotel.country = countries[hotel.countryCode].name;
      }
    });
    setHotelList(newHotelList);

    setLocations([...new Set(hotelList.map((hotel) => hotel.country))]);
  }, [hotelList]);

  useEffect(() => {
    let newResults = hotelList;
    if (locationFilter !== "") {
      newResults = newResults.filter(
        (hotel) => hotel.country === locationFilter
      );
    }
    if (showAvailableOnly) {
      newResults = newResults.filter((hotel) => hotel.isAvailable);
    }
    setFilterResults(newResults);
  }, [hotelList, locationFilter, showAvailableOnly]);

  return (
    <div>
      <header>
        <InputLabel id="location-filter">Filter by country</InputLabel>
        <Select
          labelId="location-filter"
          id="select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className={classes.locationFilter}
        >
          <MenuItem value=""> </MenuItem>
          {locations.map((location) => {
            return (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            );
          })}
        </Select>
        <FormControlLabel
          value={showAvailableOnly}
          control={<Checkbox color="primary" />}
          label={<Typography variant="body2">Is available</Typography>}
          labelPlacement="end"
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
          className={classes.leftMargin}
        />
      </header>
      <main>
        {filterResults.map((hotel) => {
          return (
            <HotelInfo key={hotel.id} hotel={hotel} showReserveButton={true} />
          );
        })}
      </main>
    </div>
  );
};

export default Hotels;
