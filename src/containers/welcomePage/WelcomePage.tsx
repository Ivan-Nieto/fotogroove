import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import Gallery from "../gallery/Gallery";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "calc(100% - 40px)",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    padding: "20px",
    margin: "auto",
  },
  welcomeMessage: {
    maxWidth: "700px",
    paddingBottom: "40px",
  },
}));

const WelcomePage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h3">Welcome to Fotogroove!</Typography>
      </div>
      <div className={`${classes.title} ${classes.welcomeMessage}`}>
        <Typography variant="body1">
          You can sing in or create an account and start showing off your own
          images. Fotogroove is intended for everybody, so wether your looking
          to show off your gallery or just want to share your work fotogroove is
          the right place for you.
        </Typography>
      </div>
      <Gallery targetAccount="all" />
    </div>
  );
};

export default WelcomePage;
