import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Weather from "./Weather";

const styles = {
  grow: {
    flexGrow: 1
  }
};

const Header = props => {
  const { classes } = props;

  const name = "Ziqing Wang's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
