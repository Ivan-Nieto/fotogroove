import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: "250px",
  },
}));

interface InputProps {
  value: any;
  type: "text" | "password" | "number";
  disabled?: boolean;
  error?: boolean;
  label?: string;
  defaultValue?: string | number;
  onChange: (event: any) => void | undefined;
}

const Input = (props: InputProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <TextField
        onChange={props.onChange}
        type={props.type}
        error={props.error}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        variant="outlined"
      />
    </div>
  );
};

export default Input;
