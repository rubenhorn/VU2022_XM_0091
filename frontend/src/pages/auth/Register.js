/**
 * File: Register.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:58:06 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Where a user can register
 * Last Modified: Tuesday, 26th January 2021 6:17:23 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  Typography,
  CardHeader,
  Card,
  withStyles,
  createStyles,
  Button,
  TextField,
  CircularProgress,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { Check, Error } from "@material-ui/icons";

import { register } from "../../api/api-auth";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

/**
 * Register Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {History} history - the browser history object
 */
const Register = ({ classes, history }) => {
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      passed = false;
    }
    if (email.length < 3) {
      setEmailError("Email must be at least 3 characters");
      passed = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email");
      passed = false;
    } else setEmailError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      passed = false;
    } else setPasswordError("");

    return passed;
  };

  /**
   * Check validation and then run the
   * register network request
   *
   * On success, set token in local storage &
   * redirect the user to profile
   */
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      register({ name, email, password }).then((data) => {
        if (data.error) {
          setLoading(false);
          return setError(data.error);
        }
        setError("");
        history.push("/login");
      });
    }
  };

  /**
   * Render JSX
   */
  return (
    <Card elevation={3} className={classes.wrapper}>
      <CardHeader title="Register" />
      <CardContent>
        <TextField
          name="name"
          label="Name"
          autoFocus={true}
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          error={nameError !== ""}
          helperText={nameError}
        />

        <TextField
          name="email"
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          error={emailError !== ""}
          helperText={emailError}
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          error={passwordError !== ""}
          helperText={passwordError}
        />

        <br />
        {error !== "" && (
          <Typography
            component="p"
            color="error"
            style={{ textAlign: "center" }}
          >
            <Error color="error" className={classes.error} />
            {error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="secondary"
          variant="contained"
          onClick={submit}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        >
          Register
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Register);
