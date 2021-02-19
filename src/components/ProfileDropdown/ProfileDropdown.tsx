import React, { useState, useRef, useEffect } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "../Button/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useHistory } from "react-router-dom";

import useUser from "../../hooks/useUser";

import { signOut } from "../../firebase/auth/index";

const useStyles = makeStyles((theme?: Theme) => ({
  icon: {
    fontSize: "35px !important",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    borderRadius: ".5em",
    backgroundColor: theme?.palette.grey[200],
    backdropFilter: "blur(40px)",
    justifyContent: "center",
  },
  button: {
    "&:hover": {
      backgroundColor: "inherit",
      color: theme?.palette.common?.white,
      borderColor: "inherit",
    },
  },
}));

const ProfileDropdown = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);
  const history = useHistory();
  const user = useUser();

  useEffect(() => {
    if (anchorRef.current && prevOpen.current && !open) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const closeDropdown = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const pushHistory = (url: string) => () => {
    history.push(url);
  };

  const handleListKeyDown = (event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const fields: any = [
    {
      label: "Upload",
      icon: <CloudUploadIcon color="secondary" />,
      onClick: pushHistory("/upload"),
    },
    {
      label: "Sign Out",
      icon: <ExitToAppRoundedIcon color="secondary" />,
      onClick: () => {
        signOut();
      },
    },
  ];

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        className={classes.button}
        endIcon={<AccountCircleIcon className={classes.icon} />}
        onClick={() => setOpen(!open)}
      >
        {user?.firstName}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
        style={{
          zIndex: 1,
        }}
      >
        <Paper className={classes.paper}>
          <ClickAwayListener onClickAway={closeDropdown}>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              {fields.map((e: any) => (
                <MenuItem onClick={e.onClick} key={e.label}>
                  <ListItemIcon>{e.icon}</ListItemIcon>
                  <Typography variant="inherit" color="secondary">
                    {e.label}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};

export default ProfileDropdown;
