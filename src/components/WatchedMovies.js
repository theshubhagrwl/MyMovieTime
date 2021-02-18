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
    // backgroundColor: theme.palette.background.paper,
    marginBottom: "10vh",
    // background: "linear-gradient(
    //     to right,
    //     #0c1421,
    //     #110e1a,
    //     #100912,
    //     #0b0408,
    //     #000000,
    //   )",
    //   backgroundRepeat:" repeat-y",
    //   backgroundSize:" cover"
  },
  gridList: {
    flexWrap: "nowrap",
    height: "300px",
    alignItems: "center",
    justifyContent: "center",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const WatchedMovies = () => {
  const classes = useStyles();
  const contextData = useContext(MovieContext);

  return (
    <div className={classes.root}>
      {/* {contextData.watched.length > 1 ? ( */}
      {fakeData.length > 1 ? (
        <GridList className={classes.gridList} cols={5} cellHeight={"auto"}>
          {/* {contextData.watched.map((tile) => ( */}
          {fakeData.map((tile) => (
            <GridListTile key={tile.imdbID}>
              <img
                src={tile.Poster}
                alt={tile.Title}
                height="auto"
                width="auto"
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
