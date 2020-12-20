import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Button, Card, CardMedia, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  hotelImage: {
    width: "100px",
    height: "100px",
  },
  hotelInfoLeft: {
    marginLeft: "10px",
  },
  hotelInfoRight: {
    marginLeft: "auto",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
  price: {
    color: "#3E6922",
  },
}));

const HotelInfo = ({ hotel, showReserveButton }) => {
  const classes = useStyles();

  const handleImageUrl = (url) => {
    let newUrl = url;
    if (url[0] === ".") {
      newUrl = newUrl.slice(1);
    }
    return newUrl;
  };

  const ReserveButton = () => {
    return (
      <Button component={Link} to={`/reserve/${hotel.id}`}>
        View deal
      </Button>
    );
  };

  return (
    <Card>
      <Grid container>
        <Grid item>
          <CardMedia
            image={handleImageUrl(hotel.imageUrl)}
            className={classes.hotelImage}
          />
        </Grid>
        <Grid item className={classes.hotelInfoLeft}>
          <Typography variant="body1">{hotel.name}</Typography>
          <Typography variant="body2">
            {`${hotel.city}, ${hotel.country}`}
          </Typography>
          <br />
          <Typography variant="body2">
            Available: {hotel.isAvailable ? "Yes" : "No"}
            <br />
            Swimming pool: {hotel.hasSwimmingPool ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} container className={classes.hotelInfoRight}>
          <Grid item>
            <Typography variant="h6" className={classes.price}>
              <NumberFormat
                value={hotel.price}
                displayType={"text"}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator={","}
                suffix={" €"}
              />
            </Typography>
          </Grid>
          <Grid item>{showReserveButton ? <ReserveButton /> : ""}</Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotelInfo;
