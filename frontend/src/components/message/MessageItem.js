/**
 * File: MessageItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: A single message
 * Last Modified: Friday, 29th January 2021 9:36:25 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  createStyles,
  withStyles,
  CardActions,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Create, Delete, MoreVert } from "@material-ui/icons";

import EditMessage from "./EditMessage";
import DeleteMessage from "./DeleteMessage";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 * @param {palette} palette - The palette defined in theme.js
 */
const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
    chipContainer: {
      "& > *": {
        margin: spacing(0.5),
      },
    },
    divider: {
      margin: spacing(2),
    },
  });

/**
 * MessageItem Component
 *
 * A single message
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} message - The message to be displayed
 * @param {*} removeMessage - The function to run on successful removal of message
 */
const MessageItem = ({ classes, message, removeMessage }) => {
  const [currentMessage, setCurrentMessage] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [displayActions, setDisplayActions] = React.useState(false);
  const open = Boolean(anchorEl);

  /**
   * Open the more options menu
   *
   * @param {*} event
   */
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Close the more options menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };
  /**
   * Close the delete dialog and
   * run the removeMessage function
   *
   * @param {int} id
   */
  const deleteMessage = (id) => {
    handleClose();
    removeMessage(id);
  };

  /**
   * Close the edit dialog
   * and update the message body
   *
   * @param {string} body
   */
  const updateMessage = (body) => {
    handleClose();
    setCurrentMessage((old) => {
      let newMessage = old;
      newMessage.body = body;
      return { ...newMessage };
    });
    setOpenEditDialog(false);
  };

  /**
   * Load the message by the ID in the message object
   *
   * Wrapped in a useCallBack which returns
   * a memorized version of the function
   *
   * The message needs to be loaded again
   * to display details about the user
   */
  const load = useCallback(() => {
    const jwt = auth.isAuthenticated();
    setCurrentMessage(message);

    /**
     * If the user logged in is the user who wrote the message,
     * display the actions to them
     */

    jwt && jwt.user.id === message.posted_by._id && setDisplayActions(true);
  }, [message]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Render JSX
   */

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar color="secondary" className={classes.avatar}>
              {message.posted_by.name[0]}
              {message.posted_by.name.split(" ").length > 1 &&
                message.posted_by.name.split(" ")[1][0]}
            </Avatar>
          }
          title={message.posted_by.name}
          subheader={new Date(message.created).toDateString()}
          action={
            displayActions && (
              <React.Fragment>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleOpen}
                >
                  <MoreVert />
                </IconButton>

                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => setOpenEditDialog(true)}>
                    <ListItemIcon>
                      <Create />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </MenuItem>
                  <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {message.body}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
        <EditMessage
          open={openEditDialog}
          message={message}
          handleClose={setOpenEditDialog}
          updateMessage={updateMessage}
        />
        <DeleteMessage
          open={openDeleteDialog}
          message={message}
          handleClose={setOpenDeleteDialog}
          deleteMessage={deleteMessage}
        />
      </Card>
    </Grow>
  );
};

export default withStyles(styles)(MessageItem);
