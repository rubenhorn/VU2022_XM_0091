/**
 * File: App.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:36:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Renders the Router, Theme Provider and MainRouter
 * Last Modified: Tuesday, 26th January 2021 6:08:43 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import MainRouter from "./routing/MainRouter";
import theme from "./theme";

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </Router>
);

export default App;
