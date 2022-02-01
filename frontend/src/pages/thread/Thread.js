/**
 * File: Thread.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 9:52:05 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import { Button, createStyles, withStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import { show } from "../../api/api-thread";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ThreadItem from "../../components/thread/ThreadItem";
import Messages from "../../components/message/Messages";

import auth from "../../helpers/auth-helper";
import { list } from "../../api/api-message";

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
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),

      "& .MuiFab-primary": {
        background: palette.secondary.main,
      },
    },
  });

/**
 * Thread Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {Match} match - Contains information about a react-router-dom Route
 */
const Thread = ({ history, match }) => {
  const [thread, setThread] = React.useState([]);
  const [messages, setMessages] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [displayActions, setDisplayActions] = React.useState(false);
  const [hasAuth, setHasAuth] = React.useState(false);
  /**
   * Load the thread by the ID in the match object
   *
   * Wrapped in a useCallBack which returns
   * a memorized version of the function
   */
  const load = useCallback(() => {
    setLoading(true);

    const { id } = match.params;
    const jwt = auth.isAuthenticated();
    setHasAuth(jwt ? true : false);
    show(id)
      .then((data) => {
        if (!data || data.error || data.exception || data.message) {
          throw new Error("Error: Thread could not be loaded");
        }
        if (jwt && jwt.user.id === data.data.posted_by._id) {
          setDisplayActions(true);
        }
        setError("");
        setThread(data.data);

        list(id).then((data) => {
          if (data.data) {
            setMessages(data.data);
          }
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Error: Thread could not be loaded");

        return setLoading(false);
      });
  }, [match]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Adds a message from the AddMessage component
   *
   * @param {message} message
   */
  const addMessage = (message) => setMessages((old) => [message, ...old]);

  /**
   * Removes a message from the AddMessage component
   *
   * @param {message} message
   */
  const removeMessage = (id) => {
    setMessages((old) => {
      const items = old.filter((item) => item._id !== id);

      return [...items];
    });
  };

  /**
   * Redirect to the login page
   */
  const login = () => {
    history.push(`/login${window.location.pathname}`);
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <div style={{ position: "relative" }}>
        <ThreadItem
          thread={thread}
          history={history}
          displayActions={displayActions}
          disableHeight={false}
        />
        {!hasAuth ? (
          <EmptyState
            message="Please login to view messages"
            action={login}
            actionLabel={"Login"}
          />
        ) : (
          <Messages
            threadId={thread._id}
            messages={messages}
            addMessage={addMessage}
            removeMessage={removeMessage}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(Thread));
