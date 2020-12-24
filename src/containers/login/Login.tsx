import React, { useState } from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import store from "../../store/index";
import { signIn } from "../../store/actions/user.actions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "10px 5px",
  },
  input: {
    padding: "0px 10px",
  },
  itemContainer: {
    flex: 1,
    display: "flex",
    minHeight: "60px",
    alignItems: "center",
  },
  hidden: {
    padding: "0px 10px",
    display: "none",
  },
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const handleSubmit = () => {
    store.dispatch(signIn({ email, password }));
  };

  const toggleSignIn = () => setSignedIn(!signedIn);

  const toggleShowLogin = () => setShowLogin(!showLogin);

  const handleChange = (field: string) => (event: any) => {
    if (field === "Password") setPassword(event.target.value);
    else setEmail(event.target.value);
  };

  const getButtonText = () => {
    if (signedIn) return "Log out";
    if (showLogin) return "Log In";
    return "Sign In";
  };

  return (
    <div className={classes.root}>
      <div className={classes.itemContainer}>
        <div className={showLogin ? classes.input : classes.hidden}>
          <Input
            label="Email"
            onChange={handleChange("Email")}
            type="text"
            value={email}
          />
        </div>
        <div className={showLogin ? classes.input : classes.hidden}>
          <Input
            label="Password"
            onChange={handleChange("Password")}
            type="password"
            value={password}
          />
        </div>
        <div className={classes.input}>
          <Button
            variant="outlined"
            onClick={showLogin ? handleSubmit : toggleShowLogin}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
