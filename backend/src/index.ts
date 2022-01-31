/*
 * File: index.ts
 * Project: drinking-game-app-server
 * Version: 1.0.0
 * File Created: Thursday, 7th May 2020 10:42:01 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Entry point for the application, imports express and connects to the database
 * Last Modified: Thursday, 7th May 2020 11:45:23 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import config from "../config/config";
import app from "./express";
import mongoose from "mongoose";

/**
 * Mongoose Connection configurations
 */
const options: any = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

let mongodbUri = config.mongodbUri;

/**
 * Optionally include credentials to authenticate agains mongodb
 */
if (config.mongodbUser.trim().length > 0) {
  const splittedUri = config.mongodbUri.split("mongodb://")[1];
  const encodedPassword = encodeURIComponent(config.mongodbPassword);
  const encodedUsername = encodeURIComponent(config.mongodbUser);

  mongodbUri = `mongodb://${encodedUsername}:${encodedPassword}@${splittedUri}`;
  console.log(mongodbUri);
}

/**
 * Creates a global mongoose promise
 */
mongoose.Promise = global.Promise;

/**
 * Connect using the config mongodbUri and options
 */
mongoose.connect(mongodbUri, options, () => {
  console.log("Connected to DB");

  /**
   * Listen on the specified port, and for any errors
   */
  app
    .listen(config.port, () => {
      console.info("Server started on port %s.", config.port);
    })
    .on("error", (err: any) => {
      console.error("Server Error: ", err);
    });
});

/**
 * Listen for an error
 */
mongoose.connection.on("error", (error) => {
  console.error(`Error: ${error.stack}`);
  throw new Error(`unable to connect to database: ${config.mongodbUri}`);
});
