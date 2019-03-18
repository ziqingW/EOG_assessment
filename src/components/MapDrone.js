import React from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import '../static/styles/mapDrone.css';
import Typography from "@material-ui/core/Typography";

const mapStyles = {
  width: '450px',
  height: '400px'
};

const styles = theme => ({
  marginTop: {
    marginTop: '20px',
    textAlign: 'left',
    width: '80%',
  },
});

const API_KEY = process.env.REACT_APP_API_KEY;

class MapDrone extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
      }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
    }
  };

  onClose = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
    }
  };

  render () {
    const { classes } = this.props;
    const {
      latitude,
      longitude,
      metric,
      accuracy
    } = this.props;
    return (
      <div className="mapWrapper">
      <Typography component="h6" variant="h5" className={classes.marginTop}>
        Real-time drone position
      </Typography>
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={4}
        style={mapStyles}
        initialCenter={{ lat: 29.7604, lng: -95.3698 }}
      >
        { metric ? (<Marker
          position={{lat: latitude, lng: longitude}}
          onClick={this.onMarkerClick}
          name={'Current Drone reading'}
        />): null}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div className="informationWindow">
            <p><strong>Lat:  </strong>{latitude}</p>
            <p><strong>Long:  </strong>{longitude}</p>
            <p><strong>Temperature:  </strong>{metric} F°</p>
            <p><strong>Accuracy:  </strong>{Number(accuracy).toFixed(5)}%</p>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

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

MapDrone = withStyles(styles)(MapDrone);

MapDrone =  GoogleApiWrapper(
  (props) => ({
    apiKey: API_KEY
  }
))(MapDrone);

export default connect(mapState)(MapDrone);
