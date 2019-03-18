import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class DashTable extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      update: 0,
      timer: null
    }
  }

  componentDidMount() {
    this.props.onLoad();
    this.setState({
      timer: setInterval(this.props.onLoad, 1000)
    });
  }

  randomTimer() {
    const newTime = [3000, 4000][Math.floor(2 * Math.random())];
    return newTime;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.timestamp !== prevProps.timestamp) {
        if (this.state.timer) {
          this.setState({
            timer : clearInterval(this.state.timer)
          });
        }
        const interval = this.randomTimer()
        this.setState({
          update: interval/1000,
          timer: setInterval(this.props.onLoad, interval)
        });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      latitude,
      longitude,
      metric,
      accuracy
    } = this.props;
    if (!metric) return <LinearProgress />;
        return (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Latitude</TableCell>
                <TableCell align="center">Logitude</TableCell>
                <TableCell align="center">Temperature (F°)</TableCell>
                <TableCell align="center">Last Updated</TableCell>
                <TableCell align="center">Accuracy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell align="center" component="th" scope="row">{latitude}</TableCell>
                  <TableCell align="center">{longitude}</TableCell>
                  <TableCell align="center">{metric}</TableCell>
                  <TableCell align="center">{this.state.update} seconds ago</TableCell>
                  <TableCell align="center">{Number(accuracy).toFixed(5)}%</TableCell>
                </TableRow>
            </TableBody>
          </Table>
    )
  }
};

const mapState = (state, ownProps) => {
  const {
    latitude,
    longitude,
    metric,
    timestamp,
    accuracy
  } = state.weather;
  return {
    latitude,
    longitude,
    metric,
    timestamp,
    accuracy
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.DEFAULT_FETCH_WEATHER
    })
});

DashTable = withStyles(styles)(DashTable);

export default connect(mapState,mapDispatch)(DashTable);
