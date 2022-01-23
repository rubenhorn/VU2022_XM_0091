/**
 * File: auth-helper.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 6:27:44 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Authentication helper for the application
 * Last Modified: Tuesday, 26th January 2021 6:39:16 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Authentication helper for the application
 */
const auth = {
  /**
   * Sets user details in session storage
   * after successfully logging in
   *
   * @param {user} user
   * @param {*} cb
   */
  setUserDetails(data, cb) {
    const jwt = {
      token: data.token,
      user: {
        name: data.user.name,
        email: data.user.email,
        id: data.user._id,
        created: data.user.created,
      },
    };

    sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb(true);
  },
  /**
   * Removes user details from session storage
   *
   * @param {*} cb
   */
  unsetUserDetails(cb) {
    sessionStorage.removeItem("jwt");
    cb(true);
  },
  /**
   * Check if the user is authenticated
   *
   * @returns a user object if the user is logged in, or false is not
   */
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt")) {
      const obj = JSON.parse(sessionStorage.getItem("jwt"));
      return obj && obj.user ? obj : false;
    }

    return false;
  },
};

export default auth;
