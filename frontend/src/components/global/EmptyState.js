/**
 * Primary dependencies
 */
import React from "react";

import {
  Button,
  withStyles,
  createStyles,
  Card,
  CardHeader,
} from "@material-ui/core";
import { Replay, Error } from "@material-ui/icons";

import { Link } from "react-router-dom";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
      textAlign: "center",
    },
    icon: {
      fontSize: "3em",
    },
    header: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "center",
    },
    iconContainer: {
      textAlign: "center",
    },
  });

/**
 * Renders a message state
 *  for the application
 *
 * @param {string} message? - A message to display
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {string} action? - An action to execute when you see the state
 * @param {string} actionLabel? - A label for the action button
 */
const EmptyState = ({
  message,
  classes,
  action,
  actionLabel = "Try Again",
}) => (
  <Card elevation={3} className={classes.wrapper}>
    <div className={classes.iconContainer}>
      <Error color="error" className={classes.icon} />
    </div>
    <CardHeader
      title={message ? message : "There was a problem"}
      className={classes.header}
    />
    {action ? (
      <Button
        className={classes.iconContainer}
        variant="contained"
        color="secondary"
        endIcon={<Replay />}
        onClick={action}
      >
        {actionLabel}
      </Button>
    ) : (
      <Button component={Link} to="/" color="primary" variant="contained">
        Home
      </Button>
    )}
  </Card>
);

export default withStyles(styles)(EmptyState);
