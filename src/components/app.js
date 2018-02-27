import React, { Component } from "react";
import { Route, matchPath } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import AnimatedSwitch from "./animated_switch";
import { firstChild } from "../utils/helpers";
import { NavLink } from "react-router-dom";
import { stack as Menu } from 'react-burger-menu';

import TopBar from "./top_bar";
import Home from "./home";
import Projects from "./projects";
import ProjectItem from "./project_item";
import Contact from "./contact";
import Missed from "./missed";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
      menuOpen: false
		};
	}

	componentDidMount() {
		fetch("http://api.harrisrashid.com/photos")
			.then(response => {
				return response.json();
			})
			.then(json => {
				this.setState({
					projects: json.slice(0, 100)
				});
			});
	}
	handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  closeMenu () {
    this.setState({menuOpen: false})
  }
  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

	render() {
		return (
				<div>
				<div>
					<Menu isOpen={this.state.menuOpen}
								onStateChange={(state) => this.handleStateChange(state)}
					>
						<NavLink onClick={() => this.closeMenu()} className="menu-item" exact to="/">Home</NavLink>
						<NavLink onClick={() => this.closeMenu()} className="menu-item" className="menu-item" to="/photos">Photos</NavLink>
						<NavLink onClick={() => this.closeMenu()} className="menu-item" to="/contact">Contact</NavLink>
						<NavLink onClick={() => this.closeMenu()} className="menu-item" to="/idontexist">404 route</NavLink>
		       <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
			    </Menu>
			   </div>

        <div className="wrapper">			
				<TopBar/>
				

				<Route
					render={({ location }) => (
						<TransitionGroup component="main">
							<AnimatedSwitch
								key={location.key}
								location={location}
							>
								<Route 
									exact 
									path="/" 
									render={props => (
									<Home {...props} projects={this.state.projects} />
								)} />
										
								<Route
									exact
									path="/photos/"
									render={props => (
										<Projects {...props} projects={this.state.projects} />
									)}
								/>
								
								<Route
									exact
									path="/contact"
									component={Contact}
								/>
								

								<Route
									path="/photos/:id"
									render={props => (
										<ProjectItem {...props} projects={this.state.projects} />
									)}
								/>
								<Route component={Missed} />
							</AnimatedSwitch>
						</TransitionGroup>
					)}
				/>
			</div>
			</div>
		);
	}
}
