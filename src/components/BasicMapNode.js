import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const BasicMapNode = withScriptjs(withGoogleMap((props) =>{
  return(
	  <div>
		  <GoogleMap
		    defaultZoom={7}
		    defaultCenter={{ lat: parseFloat(''+props.lat+''), lng: parseFloat(''+props.long+'') }}
		    defaultOptions={{
    			scrollwheel: false,
  			}}
		  >

			<MarkerWithLabel
	      position={{ lat: parseFloat(''+props.lat+''), lng: parseFloat(''+props.long+'') }}
	      labelAnchor={new window.google.maps.Point(39, 39)}
	      labelStyle={{width: "100px", height: "100px", padding: "0px"}}
	    >
	      <div className="rings"></div>
	    </MarkerWithLabel>

		  </GoogleMap>
	  </div>
		)	
	}
))

export default BasicMapNode;