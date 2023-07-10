import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import './MapComponent.css';

class MapComponent extends React.Component {
  render() {
    const { latitude, longitude } = this.props;

    const viewport = {
      latitude,
      longitude,
      zoom: 5
    };

    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={newViewport => this.setState({ viewport: newViewport })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={latitude} longitude={longitude}>
          <div className="marker" />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default MapComponent;