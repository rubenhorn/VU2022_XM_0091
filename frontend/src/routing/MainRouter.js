/**
 * File: MainRouter.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:47:32 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Main Router for the application
 * Last Modified: Friday, 29th January 2021 10:37:53 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Header from "../components/layout/Header";

import Threads from "../pages/thread/Threads";
import EmptyState from "../components/global/EmptyState";

import routes from "./routes";

const MainRouter = (props) => {
  return (
    <div>
      <Header />
      <Grid
        container
        justify="center"
        style={{ marginTop: "100px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Switch>
            <Route exact path="/" component={Threads} />

            {routes.map(({ link, component }, i) => (
              <Route path={link} component={component} key={i} />
            ))}

            <Route
              component={() => (
                <EmptyState
                  message={"The page you are looking for does not exist"}
                />
              )}
            />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainRouter;
