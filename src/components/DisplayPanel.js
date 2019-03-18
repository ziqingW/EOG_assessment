import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import Dashboard from "./Dashboard";
import MapDrone from "./MapDrone";
import PlotDrone from "./PlotDrone";

const styles = theme => ({
  root: {
    width: '80%',
    overflowX: 'auto',
    marginTop: '10px',
  },
  marginTop: {
    marginTop: '10px',
    width: '80%',
  },
});

class DisplayPanel extends React.Component {

  render() {
    const { classes } = this.props;
      return (
        <div>
      <Grid container spacing={24}>
      <Grid item xs={4}>
      </Grid>
        <Grid container item xs={12} justify="center">
          <Typography component="h6" variant="h5" className={classes.marginTop}>
        Real-time drone reading
          </Typography>
          <Paper className={classes.root}>
            <Dashboard />
          </Paper>
        </Grid>
        <Grid container spacing={0} justify="space-between">
        <Grid item xs={6}>
          <MapDrone />
        </Grid>
        <Grid item xs={6}>
          <PlotDrone />
        </Grid>
        </Grid>
      </Grid>
        </div>
    )
  }
};

export default DisplayPanel = withStyles(styles)(DisplayPanel);
