import React from "react";

import MainContainer from "./container/Main";

import "./styles.css";

import { Grid } from "@material-ui/core";

export default function App() {
  return (
    <Grid className="App" style={{ margin: 20 }}>
      <MainContainer />
    </Grid>
  );
}
