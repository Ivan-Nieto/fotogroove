import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "../Button/Button";

import Login from "../../containers/login/Login";
import useUser from "../../hooks/useUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      cursor: "pointer",
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
  })
);

export default function NavigationBar() {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();

  const pushHistory = (url: string) => () => {
    history.push(url);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            onClick={pushHistory(user ? `/?user=${user.uid}` : "/")}
            variant="h5"
            className={classes.title}
          >
            Photogruve
          </Typography>
          <Login />
          {user && (
            <Button variant="outlined" onClick={pushHistory("/upload")}>
              Upload
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
