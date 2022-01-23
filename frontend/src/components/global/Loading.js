/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import { CircularProgress, withStyles, createStyles } from "@material-ui/core";

/**
 * Injected styles
 */
const styles = () =>
  createStyles({
    progressWrapper: {
      minHeight: "-webkit-fill-available",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

/**
 * Renders an Activity Indicator
 *  for the application
 */
const Loading = ({ classes }) => (
  <div className={classes.progressWrapper}>
    <div>
      <CircularProgress />
    </div>
  </div>
);

export default withStyles(styles)(Loading);
