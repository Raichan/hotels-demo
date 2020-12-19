import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  hotelCard: {
    display: "flex",
  },
  hotelImage: {
    width: "100px",
    height: "100px",
  },
  hotelInfoRight: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "right",
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
    <Card className={classes.hotelCard}>
      <CardMedia
        image={handleImageUrl(hotel.imageUrl)}
        className={classes.hotelImage}
      />
      <CardContent className="hotelinfo-left">
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
      </CardContent>
      <CardContent className={classes.hotelInfoRight}>
        <Typography variant="h6" color="primary">
          <NumberFormat
            value={hotel.price}
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator={","}
            suffix={" €"}
          />
        </Typography>
        {showReserveButton ? <ReserveButton /> : ""}
      </CardContent>
    </Card>
  );
};

export default HotelInfo;
