import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  makeStyles,
  useTheme,
  Theme,
  withStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: "250px",
  },
}));

const CustomTextField = withStyles((theme: Theme) => ({
  root: {
    "& .MuiInputBase-root": {
      color: theme.palette.primary.main,
    },
    "& label.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.dark,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.light,
        boxShadow: `1px 1px 5px ${theme.palette.primary.main}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.dark,
      },
    },
  },
}))(TextField);

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
      <CustomTextField
        label={props.label}
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
