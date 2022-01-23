/**
 * File: theme.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:46:00 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Stylings applied to Material UI Library
 * Last Modified: Thursday, 28th January 2021 5:59:20 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ffc400",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  overrides: {
    MuiGrid: {
      item: {
        maxWidth: "800px!important",
      },
    },
    MuiTextField: {
      root: {
        width: "100%",
        margin: "16px auto",
      },
    },
    MuiListItemText: {
      root: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    },
    MuiTypography: {
      h3: {
        fontWeight: 500,
        fontSize: "2.3em",
        margin: "10px",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
