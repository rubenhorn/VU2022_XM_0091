/**
 * File: CreateThread.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Creating n Thread Form
 * Last Modified: Friday, 29th January 2021 9:35:10 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";
import {
  Button,
  Card,
  TextField,
  CardHeader,
  CardContent,
  createStyles,
  withStyles,
  CardActions,
  CircularProgress,
} from "@material-ui/core";

import { ArrowBack, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { create } from "../../api/api-thread";

import EmptyState from "../../components/global/EmptyState";

import auth from "../../helpers/auth-helper";

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
 * CreateThread Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const CreateThread = ({ history, classes }) => {
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters");
      passed = false;
    } else setTitleError("");

    return passed;
  };

  /**
   * Check validation and then run the
   * thread create network request
   *
   * On success,redirect to the thread
   */
  const submit = () => {
    if (handleValidation()) {
      setError("");
      setLoading(true);
      const jwt = auth.isAuthenticated();
      if (jwt) {
        create({ title, posted_by: jwt.user.id }, jwt.token)
          .then((data) => {
            if (!data || data.error || data.exception || data.message) {
              throw new Error("Error: Could not create Thread");
            }
            history.push(`/thread/${data.data._id}`);
          })
          .catch((err) => {
            setLoading(false);

            return setError("Could not create thread");
          });
      } else setError("Not authenticated");
    }
  };

  /**
   * Render JSX
   */
  if (error !== "") return <EmptyState message={error} action={submit} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <Card elevation={3} className={classes.wrapper}>
        <CardHeader title="Create Thread" />

        <CardContent>
          <TextField
            name="title"
            label="Title"
            autoFocus={true}
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={titleError !== ""}
            helperText={titleError}
          />
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Check />}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(CreateThread);
