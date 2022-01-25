/**
 * File: ThreadItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 30th January 2021 2:32:04 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  Card,
  CardHeader,
  Avatar,
  createStyles,
  withStyles,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Create, Delete, MoreVert } from "@material-ui/icons";

import ThreadActionArea from "./ThreadActionArea";

import DeleteThread from "./DeleteThread";

import { Link } from "react-router-dom";

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
    fixedHeightCard: {
      height: 200,
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
 * ThreadItem Component
 *
 * A single message
 *
 * @param {bool} displayActions - if the thread belongs to the authed user, display actions
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} thread - The thread to be displayed
 * @param {*} link - The link to optionally display
 * @param {*} delay - The delay of the animation
 */
const ThreadItem = ({
  displayActions,
  history,
  classes,
  thread,
  link = null,
  delay = 0,
  disableHeight = true,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  /**
   * Opens the more options menu
   *
   * @param {*} event
   */
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  /**
   * Closes the more options menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Render JSX
   */
  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={disableHeight ? classes.fixedHeightCard : classes.card}>
        <ThreadActionArea link={link}>
          <CardHeader
            avatar={
              <Avatar color="secondary" className={classes.avatar}>
                {thread.posted_by.name[0]}
                {thread.posted_by.name.split(" ").length > 1 &&
                  thread.posted_by.name.split(" ")[1][0]}
              </Avatar>
            }
            title={thread.title}
            subheader={new Date(thread.created).toDateString()}
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
                    <MenuItem
                      component={Link}
                      to={`/threads/edit/${thread._id}`}
                    >
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
        </ThreadActionArea>
        <DeleteThread
          open={openDeleteDialog}
          thread={thread}
          handleClose={setOpenDeleteDialog}
          history={history}
        />
      </Card>
    </Zoom>
  );
};

export default withStyles(styles)(ThreadItem);
