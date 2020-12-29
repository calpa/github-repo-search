import React, { useState, useCallback, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { debounce } from "lodash";
import axios from "axios";
import Search from "../components/Search";
import Result from "../components/Result";

const MainContainer = (props) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const getGithubRepos = async (query, page) => {
    if (query === "") {
      return {};
    }

    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&page=${page}`
      );
      // localStorage.setItem(query, JSON.stringify(data));
      setItems(items.concat(data.items));
      setError(null);
      setPage(page);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  const debounceLoadData = useCallback(debounce(getGithubRepos, 1000), []);

  useEffect(() => {
    // const cachedResult = localStorage.getItem(query);
    // if (cachedResult) {
    //   setResponse(JSON.parse(cachedResult));
    //   setError(null);
    //   setPage(1);
    // } else {
    setPage(1);
    debounceLoadData(query, 1);
    // }
  }, [query, debounceLoadData]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const {
        scrollHeight,
        scrollTop,
        clientHeight
      } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 300) {
        console.log("bottom");
        debounceLoadData(query, page + 1);
      }
    });
  }, [query, page, debounceLoadData]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          Github Repo Search
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Search
          handleChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </Grid>

      <Grid>{error && error}</Grid>

      <Result items={items} />
    </Grid>
  );
};

export default MainContainer;
