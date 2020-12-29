import React from "react";
import { Grid, Typography, Link, Paper } from "@material-ui/core";

const Result = (props) => {
  const { items } = props;
  return (
    <Grid container>
      {items &&
        Array.isArray(items) &&
        items.length > 0 &&
        items.map((item) => {
          return (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  margin: 10,
                  padding: 10
                }}
              >
                <Grid container justify="space-between" alignItems="center">
                  <Typography variant="h5">
                    <Link href={item.html_url} target="_blank">
                      {item.name}
                    </Link>
                  </Typography>
                  <Typography>Stars: {item.watchers}</Typography>
                </Grid>
                <Typography>{item.description}</Typography>
              </Paper>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Result;
