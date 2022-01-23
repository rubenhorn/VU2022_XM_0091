/**
 * File: config.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:49:31 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Configuration variables loaded from an env file
 * Last Modified: Tuesday, 26th January 2021 6:40:36 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Configuration variables loaded from the env file
 */
export const config = {
  env: process.env.NODE_ENV || "development",
  server_url: process.env.REACT_APP_SERVER_URL || "http://localhost:8000",
};
