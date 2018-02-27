import React from 'react';
import { Link } from "react-router-dom";
const { compose, withProps, withStateHandlers } = require("recompose");
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const BasicMap = compose(
  withStateHandlers(() => ({
    isOpen: true,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
		    defaultZoom={3}
		    defaultCenter={{ lat: 0, lng: 0 }}
		    defaultOptions={{
    			scrollwheel: false,
  			}}
		  >
    {Object
	 		.keys(props.photos)
	 	 	.map(key => 	
		    <Marker
		    	//id={key}
		    	key={key}
		      position={{ lat: parseFloat(''+props.photos[key].lat+''), lng: parseFloat(''+props.photos[key].long+'') }}
		      //onClick={() => {
		      	//props.onToggleOpen
		      	//console.log("test");
		      //}}
		      onClick={props.onToggleOpen}    
		    >
		      {props.isOpen && <InfoWindow id={key} onCloseClick={props.onToggleOpen}>
		        <p>
		        	<Link to={props.photos[key].path}>
		        		<img src={props.photos[key].img} width="30" alt="1"/>
		        	</Link>
		        </p>
		      </InfoWindow>}
		    </Marker>
	 	 	)
	 	} 
  </GoogleMap>
);

export default BasicMap;

// const BasicMap = withScriptjs(withGoogleMap((props) =>{

//   return(
// 	  <div>
// 		  <GoogleMap
// 		    defaultZoom={3}
// 		    defaultCenter={{ lat: 0, lng: 0 }}
// 		    defaultOptions={{
//     			scrollwheel: false,
//   			}}
// 		  >
			  
// 			  {Object
// 			 		.keys(props.photos)
// 			 	 	.map(key => 	
// 				    <Marker
// 				    	key={key}
// 				      position={{ lat: parseFloat(''+props.photos[key].lat+''), lng: parseFloat(''+props.photos[key].long+'') }}
// 				      onClick => {alert("hey")}
// 				    >
// 				      {props.isOpen.false && <InfoWindow>
// 				        <p>
// 				        	<Link to={props.photos[key].path}>
// 				        		<img src={props.photos[key].img} width="100" alt="1"/>
// 				        	</Link>
// 				        </p>
// 				      </InfoWindow>}
// 				    </Marker>
// 			 	 	)
// 			 	} 
// 		  </GoogleMap>
// 	  </div>
// 		)	
// 	}
// ))