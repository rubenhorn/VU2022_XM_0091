/**
 * File: Header.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 5:24:46 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 10:26:04 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

/**
 * Component Library imports
 */
import {
  AppBar,
  Button,
  createStyles,
  Toolbar,
  withStyles,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  CircularProgress,
  useScrollTrigger,
  CssBaseline,
  Slide,
} from "@material-ui/core";

import routes from "./../../routing/routes";

import auth from "../../helpers/auth-helper";
import { AccountCircle } from "@material-ui/icons";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = () =>
  createStyles({
    root: {
      justifyContent: "space-between",
      "& a": {
        color: "#fff",
      },
    },
  });

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

/**
 * Header for the application
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Header = ({ history, classes, ...props }) => {
  /**
   * If set to true, displays routes that only authenticated users should see
   * If not, displays login / register
   */
  const [isAuthed, setIsAuthed] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Check if the user is authenticaed
   */
  useEffect(() => {
    const setAuth = (bool) => setIsAuthed(bool);

    const jwt = auth.isAuthenticated();
    setAuth(jwt ? true : false);

    /**
     * Listen for changes in the URL bar,
     * and check if the user is authenticated
     *
     * Can only be done when the component
     * is exported through withRouter
     */
    history.listen(() => {
      const jwt = auth.isAuthenticated();
      setAuth(jwt ? true : false);
    });
  }, [history]);

  /**
   * Logout from the application
   */
  const submit = () => {
    const jwt = auth.isAuthenticated();
    if (jwt) {
      setLoading(true);
      // logout(jwt.token).then((data) => {
      // if (data.error) {
      //   setLoading(false);
      //   return setMessage(Object.values(data.error)[0][0]);
      // }
      auth.unsetUserDetails((success) => {
        if (success) {
          setIsAuthed(false);
          setLoading(false);
          handleClose();
          setMessage("Logged out successfully");

          return history.push("/");
        }
        setMessage("The system encountered an error, please try again later");
      });
      // });
    } else {
      setIsAuthed(false);
      setMessage("The system encountered an error, please try again later");
    }
  };

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={classes.root}>
            <Button component={Link} to="/">
              Adv JS CA2
            </Button>

            <div>
              <Button component={Link} to="/">
                Threads
              </Button>
              {routes
                .filter(
                  (route) => route.authed === isAuthed && route.displayOnNav
                )
                .map((route, i) => (
                  <Button key={i} component={Link} to={route.link}>
                    {route.name}
                  </Button>
                ))}

              {isAuthed && (
                <React.Fragment>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem disabled={loading} onClick={submit}>
                      Logout {loading && <CircularProgress size={18} />}
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(Header));
