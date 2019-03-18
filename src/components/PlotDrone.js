import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import ReactHighcharts from 'react-highcharts';
import '../static/styles/plotDrone.css';

const styles = theme => ({
  marginTop: {
    marginTop: '20px',
    width: '80%',
  },
});

class PlotDrone extends React.Component {

  render() {
    const { classes } = this.props;
    const {
      fullDroneReading
    } = this.props;
    const fullDroneReadingData = fullDroneReading.map(value => ([moment(value['timestamp']).format('MMMM Do YYYY, h:mm:ss a'), Number(Number(value['metric']).toFixed(4))]));
    const config = {
      chart: {
        type: 'line'
      },
      title : "",
      xAxis: {
        tickInterval: 75,
        categories: fullDroneReading.map(value=>moment(value['timestamp']).format('MMMM Do YYYY, h:mm:ss a'))
      },
      yAxis: {
        title: {
          text: 'Temperature (F°)'
        },
        labels: {
          formatter: function() {
            return this.value + '°';
          }
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        line: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          },
        animation: false
        }
      },
      series: [{
        name: 'Drone',
        data: fullDroneReadingData
      }]
    };

  return (
    <div className="droneChart">
    <Typography component="h6" variant="h5" className={classes.marginTop}>
      Drone temperature
    </Typography>
      <ReactHighcharts config={config}/>
    </div>
  );
}
}

const mapState = (state, ownProps) => {
  const {
    fullDroneReading
  } = state.weather;
  return {
    fullDroneReading
  };
};

PlotDrone = withStyles(styles)(PlotDrone);

export default connect(mapState)(PlotDrone);
