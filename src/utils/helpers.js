import React from "react";

export const firstChild = props => {
	const childrenArray = React.Children.toArray(props.children);
	return childrenArray[0] || null;
};

export function getFunName(key) {
  console.log(key);
  // markers.forEach(function(marker) {
  //    marker.infowindow.close(map, marker);
  // }); 
}
