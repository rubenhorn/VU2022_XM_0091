/**
 * File: Threads.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 9:59:09 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import {
  Typography,
  withStyles,
  createStyles,
  Fab,
  Grid,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { Link } from "react-router-dom";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ThreadItem from "../../components/thread/ThreadItem";

import { list as listThreads } from "../../api/api-thread";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),
    },
  });

/**
 * Threads Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Threads = ({ classes }) => {
  const [threads, setThreads] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useState(null);
  const isAuthed = auth.isAuthenticated();

  /**
   * Load threads and categories
   *
   * Wrapped in a useCallBack which returns
   * a memorized version of the function
   */
  const load = useCallback(() => {
    setLoading(true);
    /**
     * Load threads
     */
    listThreads()
      .then((data) => {
        if (!data || data.error || data.exception || data.message) {
          throw new Error("Error: Thread could not be loaded");
        }
        setError("");

        setLoading(false);

        setThreads(data.data);
      })
      .catch((err) => {
        setLoading(false);
        return setError("Error: Could not connect to server");
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Typography variant="h3">Threads</Typography>

      <Grid container spacing={2}>
        {threads.map((thread, i) => {
          return (
            <Grid item sm={6} xs={12} key={i}>
              <ThreadItem
                delay={(i + 1) * 200}
                thread={thread}
                link={`/thread/${thread._id}`}
              />
            </Grid>
          );
        })}
      </Grid>
      {isAuthed && (
        <Fab
          className={classes.fab}
          component={Link}
          aria-label="Add Thread"
          color="secondary"
          to="/threads/new"
        >
          <Add />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Threads);
