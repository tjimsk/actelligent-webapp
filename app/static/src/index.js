import {render} from "react-dom"
import React, {createElement} from "react"

import App from "components/App"

document.addEventListener("DOMContentLoaded", () => {
	render(<App />, document.getElementById("react-root"))
	
	console.log("app mounted")
})
