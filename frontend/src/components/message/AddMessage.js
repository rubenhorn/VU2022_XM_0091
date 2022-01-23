/**
 * File: AddMessage.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 2:40:37 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Create a new message
 * Last Modified: Friday, 29th January 2021 9:35:10 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  Card,
  withStyles,
  createStyles,
  Button,
  TextField,
  CircularProgress,
  CardActions,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";

import { create } from "../../api/api-message";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    root: {
      padding: spacing(1),
      margin: `${spacing(2)}px 0`,
    },
    actions: {
      justifyContent: "flex-end",
    },
  });

/**
 * AddMessage Component
 *

 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {int} threadId - the ID of the thread
 * @param {*} addMessage - The function to run on successful add of message
 */
const AddMessage = ({ classes, threadId, addMessage }) => {
  const [message, setMessage] = React.useState("");

  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * Handle validation for form input
   */
  const handleValidation = () => {
    let passed = true;

    if (message.length < 5) {
      setMessageError("Message must be at least 5 characters");
      passed = false;
    } else setMessageError("");

    return passed;
  };

  /**
   * Check validation and then run the
   * message update network request
   *
   * On success, close the dialog and run
   * the add message function
   */
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      const jwt = auth.isAuthenticated();
      if (jwt) {
        create(
          { body: message, thread: threadId, posted_by: jwt.user.id },
          jwt.token
        ).then((data) => {
          if (!data || data.error || data.exception || data.message) {
            setLoading(false);
            return setMessageError(
              data && data.error ? data.error : "Could not create thread"
            );
          }
          setMessageError("");
          setLoading(false);
          setMessage("");
          addMessage(data.data);
        });
      } else setMessageError("Not authenticated");
    }
  };

  /**
   * Render JSX
   */
  return (
    <Card className={classes.root}>
      <TextField
        name="message"
        label="Add a message"
        autoFocus={true}
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        error={messageError !== ""}
        helperText={messageError}
        multiline
      />
      <CardActions className={classes.actions}>
        <Button
          color="secondary"
          variant="contained"
          onClick={submit}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(AddMessage);
