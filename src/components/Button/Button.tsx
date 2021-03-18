import MaterialButton from '@material-ui/core/Button';
import { withStyles, Theme } from '@material-ui/core/styles';

const Button = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.grey[400],
    '&:hover': {
      background: 'linear-gradient(to right, #141e30, #243b55)',
      boxShadow: `1px 1px 20px #243b55`,
      border: `1px solid #243b55`,
    },
  },
}))(MaterialButton);

export default Button;
