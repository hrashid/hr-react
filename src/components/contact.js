import React, { Component } from "react";

export default class Contact extends Component {
		
	render() {
		return (
			<div className="page contact">		
				<h1>Contact</h1>
				<form action="https://formspree.io/hello@harrisrashid.com" method="POST">
					<input name="email" placeholder="Your email" type="email"/>
  				<textarea name="message" placeholder="Your message"></textarea>
  				<input type="submit" value="Send"/>
				</form>
			</div>
		);
	}
}
