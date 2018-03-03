import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Animated from "animated/lib/targets/react-dom";
import BasicMapNode from './BasicMapNode';
import ImageGallery from 'react-image-gallery';
import { getFunName } from '../utils/helpers';
import LazyLoad from "react-lazy-load";

export default class ProjectItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: {},
			animate: new Animated.Value(0),
			node:{},
			gallery:{}
		};
	}
	componentDidMount() {
		if (this.props.projects.length) {
			this._renderProject(this.props.projects);
		}
		const urlid = this.props.match.params.id;
			
	  //Check the width of the device for image optimization below
	  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		var widthvalue = parseInt(width);

	  if(widthvalue < 601){
	  	const photoNodeEndpoint = `http://api.harrisrashid.com/photosetnode/mobile/${urlid}`;
	     fetch(photoNodeEndpoint)
	       .then(response => response.json())
	       .then(node => this.setState({ node }));
	  	//Call Endpoint with Mobile Opmtimized Images
	  	const photoGalleryEndpoint = `http://api.harrisrashid.com/photosetgallery/mobile/${urlid}`;
	  	fetch(photoGalleryEndpoint)
		 	.then(response => response.json())
		 	.then(gallery => this.setState({ gallery })); 
	  	
	  } else{
	  	const photoNodeEndpoint = `http://api.harrisrashid.com/photosetnode/${urlid}`;
	     fetch(photoNodeEndpoint)
	       .then(response => response.json())
	       .then(node => this.setState({ node }));

	  	//Call the  Endpoint with Dektop Optimized Images
	  	const photoGalleryEndpoint = `http://api.harrisrashid.com/photosetgallery/${urlid}`;
	  	fetch(photoGalleryEndpoint)
		 	.then(response => response.json())
		 	.then(gallery => this.setState({ gallery }));    
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.projects.length && nextProps.projects.length) {
			this._renderProject(nextProps.projects);
		}
	}
	_renderProject(projects) {
		let project = projects.filter(p => {
			return (p.id = this.props.match.params.id);
			
		});
		if (project.length) {
			//console.log("hey2");
			//this.setState({ project: project[this.props.match.params.id] });
			this.setState({ project: 1 });
		
			setTimeout(
				() =>
					Animated.spring(this.state.animate, { toValue: 1 }).start(),
				375
			);
		}

	}
	render() {
		//const { project: { title } } = this.state;
		//const { node: { title, body } } = this.state;		
		const goBackStyle = {
			transform: Animated.template`
				translate3d(${this.state.animate.interpolate({
				inputRange: [0, 1],
				outputRange: ["-24px", "0px"]
			})},0,0)
			`,
			opacity: Animated.template`${this.state.animate}`
		};
		return (
			<div className="page project-item">

				<Animated.span style={goBackStyle} className="goBack">
					<Link to={`/photos/`}>
						←
					</Link>
				</Animated.span>
				{Object
	 				.keys(this.state.node)
	 				.map(key => <div key={key}>
	 					<div className="project-item-header">
		 					<h1>{this.state.node[key].title}</h1>
		 					<div className="lead-image"><img src={this.state.node[key].field_lead_image}/></div>
	 					</div>				
	 					<div className="body-outer">
		 					<div className="body-inner" dangerouslySetInnerHTML={{
  	    				__html: this.state.node[key].body
    	 				}}/>
    	 			</div>
     				<BasicMapNode
	 						isOpen
					  	onToggleOpen
						  lat={this.state.node[key].lat}
						  long={this.state.node[key].long}
						  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhZpn268ctpCi3eDJ0DBn44VvZr2_5aP8&v=3.exp&libraries=geometry,drawing,places"
						  loadingElement={<div style={{ height: `100%` }} />}
						  containerElement={<div style={{ height: `500px` }} />}
						  mapElement={<div style={{ height: `100%` }} />}
						/>

	 					
     				
						<div className="gallery-outer">
		 					<div className="gallery-inner">
		 						<LazyLoad
				     			height={720}
				    		>
									<ImageGallery items={this.state.gallery} />	      
								</LazyLoad>
		 					</div>
    	 			</div>

     				</div>
					)
				}
			</div>
		);
	}
}

// <p><img src={this.state.node[key].field_lead_image}/></p>
	 					

//<p>{lat} & {long}</p>
//  				<p><img src={img} width="240" alt=""/></p>

// {Object
// 	 				.keys(this.state.node)
// 	 				.map(key => <div key={key}>
// 	 					<h1>{this.state.node[key].title}</h1>
// 	 					<p><img src={this.state.node[key].field_lead_image}/></p>
	 					
// 	 					<div className="body" dangerouslySetInnerHTML={{
//       				__html: this.state.node[key].body
//      				}} />

// 					</div>
// 					)
// 				}

// <p>{lat} & {long}</p>
// 				<p><img src={img} width="240" alt=""/></p>