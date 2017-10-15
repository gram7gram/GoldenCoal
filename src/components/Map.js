import React from "react";
import noop from "lodash/noop";
import Spinner from "./Spinner";
import {connect} from "react-redux";

import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import Marker from "react-google-maps/lib/components/Marker";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";

import markerChanged from "../actions/Map/MarkerChanged";
import addressSelected from "../actions/Map/AddressSelected";

import trans from "../translator";
import tokens from "../constants/token";

const MAP_OPTIONS = {
    zoomControl: true,
    mapTypeControl: false,
    rotateControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    scaleControl: false,
};

const MAP_PARAMS = [
    'v=3.exp',
    'language=uk',
    'key=' + tokens.googleMapsApiKey
]

const Container = withScriptjs(withGoogleMap(props => {
    let infoWindow = null
    if (!props.Map.isValid) {
        if (props.Map.matches.length > 0) {
            infoWindow = <InfoWindow
                position={props.Map.marker}>
                <div>
                    <ol className="geo-search-results">
                        {props.Map.matches.map((match, i) =>
                            <li key={i}>{match.formatted_address}</li>
                        )}
                    </ol>
                </div>
            </InfoWindow>
        }
    }
    return <GoogleMap
        options={MAP_OPTIONS}
        ref={props.onMapLoad}
        defaultZoom={props.Map.zoom}
        zoom={props.Map.zoom}
        defaultCenter={props.Map.marker}
        center={props.Map.marker}
        onClick={props.onMapClick}>
        <Marker
            position={props.Map.marker}
            onRightClick={props.onMarkerRightClick}>
            {infoWindow}
        </Marker>
    </GoogleMap>
}))

class MapContainer extends React.Component {

    // constructor() {
    //     super()
    //     this.changeMarkerPosition = this.changeMarkerPosition.bind(this)
    //     this.onAddressMatchClick = this.onAddressMatchClick.bind(this)
    // }

    // onAddressMatchClick(googleId) {
    //     const match = this.props.Map.matches.find(item => item.place_id === googleId)
    //     if (match) {
    //         this.props.dispatch(addressSelected(match))
    //     }
    // }
    //
    // changeMarkerPosition(e) {
    //     this.props.dispatch(markerChanged({
    //         lng: e.latLng.lng(),
    //         lat: e.latLng.lat(),
    //     }))
    // }

    render() {
        return <Container
            onMapLoad={noop}
            onMarkerRightClick={noop}
            onMapClick={noop}
            onAddressMatchClick={noop}
            {...this.props}
        />
    }
}

MapContainer.defaultProps = {
    readOnly: false,
    loadingElement: <Spinner/>,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?" + MAP_PARAMS.join('&'),
    containerElement: <div className="map-container"/>,
    mapElement: <div style={{height: '100%'}}/>
}

export default connect(store => store)(MapContainer);