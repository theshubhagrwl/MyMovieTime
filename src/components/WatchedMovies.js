import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { MovieContext } from "../MovieContext";

import fakeData from "../testData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: "10vh",
    background: "transparent",
  },
  gridList: {
    flexWrap: "nowrap",
    justifyContent: "center",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
    // background:
    //   "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  gridTile: {
    width: "100%",
  },
  image: {
    opacity: 0.4,
    width: "100%",
    height: "100%",
  },
}));

const WatchedMovies = () => {
  const classes = useStyles();
  const contextData = useContext(MovieContext);

  return (
    <div className={classes.root}>
      {/* {fakeData.length > 1 ? ( */}
      {/* {fakeData.map((tile) => ( */}
      {contextData.watched.length > 0 ? (
        <GridList className={classes.gridList} cols={5} cellHeight={"auto"}>
          {contextData.watched.map((tile) => (
            <GridListTile key={tile.imdbID} className={classes.gridTile}>
              <img
                className={classes.image}
                src={tile.Poster}
                alt={tile.Title}
              />
              <GridListTileBar
                title={tile.Title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      ) : (
        ""
      )}
    </div>
  );
};
export default WatchedMovies;
