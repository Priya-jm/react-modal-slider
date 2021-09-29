import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        to={"https://material-ui.com/"}
        style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.54)" }}
      >
        TrueFi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
