/**
 * File: routes.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 4:10:03 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Additional routes in the application
 * Last Modified: Thursday, 28th January 2021 5:32:53 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import Login from "../pages/auth/Login";
import Profile from "../pages/auth/Profile";
import Register from "../pages/auth/Register";
import Thread from "../pages/thread/Thread";
import Threads from "../pages/thread/Threads";
import CreateThread from "../pages/thread/CreateThread";
import EditThread from "../pages/thread/EditThread";

const routes = [
  {
    name: "Login",
    link: "/login",
    component: Login,
    authed: false,
    displayOnNav: true,
  },
  {
    name: "Register",
    link: "/register",
    component: Register,
    authed: false,
    displayOnNav: true,
  },
  {
    name: "Profile",
    link: "/profile",
    component: Profile,
    authed: true,
  },
  {
    name: "Thread",
    link: "/thread/:id",
    component: Thread,
    authed: false,
  },
  {
    name: "Create Thread",
    link: "/threads/new",
    component: CreateThread,
    authed: true,
  },
  {
    name: "Edit Thread",
    link: "/threads/edit/:id",
    component: EditThread,
    authed: true,
  },
  {
    name: "Threads by User",
    link: "/user/:id",
    component: Threads,
    authed: false,
  },
  {
    name: "Threads by Category",
    link: "/category/:id",
    component: Threads,
    authed: false,
  },
];

export default routes;
