import React from "react";

import { TextField } from "@material-ui/core";

const Search = (props) => {
  return (
    <TextField
      variant="outlined"
      label="Type here"
      onChange={props.handleChange}
    />
  );
};

export default Search;
