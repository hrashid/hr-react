import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class TopBar extends Component {
	render() {
		return (
			<div className="top-bar">
				<nav>
					<NavLink exact to="/">Home</NavLink>
					<NavLink to="/photos">Photos</NavLink>
					<NavLink to="/idontexist">Non-existent route</NavLink>
				</nav>
			</div>
		)
	}
}