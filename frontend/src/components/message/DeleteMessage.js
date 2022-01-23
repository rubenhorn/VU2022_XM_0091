/**
 * File: EditMessage.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 22nd January 2021 5:17:34 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Delete a message
 * Last Modified: Tuesday, 26th January 2021 7:03:45 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  withStyles,
  createStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
} from "@material-ui/core";
import { Close, Delete } from "@material-ui/icons";

import { remove } from "../../api/api-message";

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
 * DeleteMessage Component
 *
 * @param {bool} open - whether the dialog should be open or not
 * @param {*} message - The message to be edited
 * @param {*} deleteMessage - The function to run on successful edit
 * @param {*} handleClose - The function to run to close the dialog
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const DeleteMessage = ({ open, message, deleteMessage, handleClose }) => {
  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * run the message delete network request
   *
   * On success, close the dialog and run
   * the deleteMessage function
   */
  const submit = () => {
    setLoading(true);
    const jwt = auth.isAuthenticated();

    remove(message._id, jwt.token).then((data) => {
      if (data.error) {
        setLoading(false);
        handleClose(false);

        return setMessageError(data.error);
      }
      setLoading(false);
      handleClose(false);
      deleteMessage(message._id);
    });
  };

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="edit-message-dialog"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleClose(false)}
            endIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Delete />}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={messageError !== ""}
        autoHideDuration={6000}
        onClose={() => setMessageError("")}
        message={messageError}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(DeleteMessage);
