import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const BasicMap = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 0, lng: 0 }} defaultOptions={{
    			scrollwheel: false,
  			}}>

  		{props.photos.map(photo => {
        const onClick = props.onClick.bind(this, photo)
        return (
          <Marker
            key={photo.nid}
            onClick={onClick}
            position={{ lat: parseFloat(''+photo.lat+''), lng: parseFloat(''+photo.long+'') }}
          >
            {props.selectedMarker === photo &&
              <InfoWindow>
                <p>
				        	<Link to={photo.path}>
				        		<img src={photo.img} width="120" alt="1"/>
				        	</Link>
				        </p>
              </InfoWindow>
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class BasicMapHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false
    }

  }
  
  handleClick = (marker, event) => {
    //console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <BasicMap
        selectedMarker={this.state.selectedMarker}
        photos={this.props.photos}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhZpn268ctpCi3eDJ0DBn44VvZr2_5aP8&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
