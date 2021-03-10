import MaterialButton from "@material-ui/core/Button";
import { withStyles, Theme } from "@material-ui/core/styles";

const Button = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.black,
      boxShadow: `1px 1px 5px ${theme.palette.primary.main}`,
    },
  },
}))(MaterialButton);

export default Button;
