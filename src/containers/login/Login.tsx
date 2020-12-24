import React, { useState } from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import useStore from "../../hooks/useStore";
import useUser from "../../hooks/useUser";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

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
  const isSignedIn = useUser();
  const callStore = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    setDisabled(true);
    await callStore("SIGN_IN", { email, password });
    setDisabled(false);
    setShowLogin(false);
  };

  const toggleShowLogin = () => {
    // TODO: Sign out user here
    if (isSignedIn) {
      callStore("SIGN_OUT", {});
      return;
    }
    setShowLogin(!showLogin);
  };

  const handleChange = (field: string) => (event: any) => {
    if (field === "Password") setPassword(event.target.value);
    else setEmail(event.target.value);
  };

  const getButtonText = () => {
    if (isSignedIn) return "Log out";
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
            disabled={disabled}
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
