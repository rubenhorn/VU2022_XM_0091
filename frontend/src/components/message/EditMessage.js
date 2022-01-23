/**
 * File: EditMessage.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 22nd January 2021 5:17:34 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Edit an existing message
 * Last Modified: Tuesday, 26th January 2021 6:58:55 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  withStyles,
  createStyles,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";

import { update } from "../../api/api-message";

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
    editTextfield: {
      width: "300px",
    },
    actions: {
      justifyContent: "flex-end",
    },
  });

/**
 * EditMessage Component
 *
 * @param {bool} open - whether the dialog should be open or not
 * @param {*} message - The message to be edited
 * @param {*} updateMessage - The function to run on successful edit
 * @param {*} handleClose - The function to run to close the dialog
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const EditMessage = ({
  open,
  message,
  updateMessage,
  handleClose,
  classes,
}) => {
  const [newMessage, setNewMessage] = React.useState(message.body);

  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * Handle validation for form inputs
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
   * the updateMessage function
   */
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      const jwt = auth.isAuthenticated();

      update(message._id, { body: newMessage }, jwt.token).then((data) => {
        if (data.error) {
          setLoading(false);
          return setMessageError(data.error);
        }
        setMessageError("");
        setLoading(false);

        updateMessage(data.data.body);
      });
    }
  };

  /**
   * Render JSX
   */
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="edit-message-dialog"
    >
      <DialogTitle>Edit Message</DialogTitle>
      <DialogContent>
        <TextField
          name="message"
          label="Edit message"
          autoFocus
          margin="normal"
          className={classes.editTextfield}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          error={messageError !== ""}
          helperText={messageError}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={submit}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(EditMessage);
