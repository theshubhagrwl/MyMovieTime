import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    overflow: "hidden",
    fontWeight: "bold",
  },
  cardImage: {
    maxHeight: "100%",
    maxWidth: "auto",
  },
}));

const MovieCard = ({ item }) => {
  const classes = useStyles();

  return (
    <div>
      <Card raised={true} className={classes.root}>
        <CardMedia
          image={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          title={item.title}
          className={classes.cardImage}
          component="img"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            noWrap
            className={classes.titleText}
          >
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.release_date}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical button group"
            style={{ width: "auto" }}
          >
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ marginBottom: "15px" }}
              // onClick={() => {
              //   setMTime(item);
              // }}
            >
              Mark Watched
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              style={{ marginBottom: "15px" }}
            >
              <Link
                to={`/movie/${item.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                More Details
              </Link>
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </div>
  );
};

export default MovieCard;
