const express = require("express")
const app = express()
const path = require("path")

const dataHandler = require("./handlers/data")

require("./seed/seed")

app.get("/data", dataHandler)

app.use("/public", express.static(path.resolve(__dirname, "./static/public")))
app.use("/", express.static(path.resolve(__dirname, "./static/public"), {
	index: "index.html"
}))

app.listen(8080, () => {
	console.log("App listening on 8080")
})