/**
 * File: Messages.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 12:42:47 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 10:00:26 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */
import React from "react";

import { withRouter } from "react-router-dom";

import { Typography } from "@material-ui/core";

import MessageItem from "./MessageItem";
import AddMessage from "./AddMessage";

/**
 * Messages Component
 *
 * @param {Array} messages - an array of messages
 * @param {History} history - the browser history object
 * @param {int} threadId - the ID of the thread
 * @param {*} addMessage - The function to run on adding a message
 * @param {*} removeMessage - The function to run on removing a message
 */
const Messages = ({
  messages,
  history,
  threadId,
  addMessage,
  removeMessage,
}) => {
  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Typography variant="h3">Messages</Typography>

      <React.Fragment>
        <AddMessage
          threadId={threadId}
          addMessage={(message) => addMessage(message)}
        />

        {messages.length > 0 ? (
          messages.map((message, i) => (
            <MessageItem
              key={message._id}
              message={message}
              removeMessage={removeMessage}
            />
          ))
        ) : (
          <Typography variant="body2" style={{ textAlign: "center" }}>
            No messages found
          </Typography>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default withRouter(Messages);
