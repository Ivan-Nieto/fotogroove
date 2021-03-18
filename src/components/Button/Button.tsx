import MaterialButton from '@material-ui/core/Button';
import { withStyles, Theme } from '@material-ui/core/styles';

const Button = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    border: `1px solid #414345`,
    '&:hover': {
      background: 'linear-gradient(to right, #232526, #414345)', // midnight city
      boxShadow: `1px 1px 20px #414345`,
    },
  },
}))(MaterialButton);

export default Button;
