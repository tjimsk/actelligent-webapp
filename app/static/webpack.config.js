const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHardDiskPlugin = require("html-webpack-harddisk-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const path = require("path")

var config = new Object()

config.entry = {
	index: "./src/index.js"
}

config.resolve = {
	alias: {
		"components": path.resolve(__dirname, "./src/components"),
		"utils": path.resolve(__dirname, "./src/utils")
	},
	modules: [
		"node_modules",
		path.resolve(__dirname, "src")
	],
	extensions: [".js", ".json"]
}

config.output = {
	filename: "index.js",
	path: path.resolve(__dirname, "public"),
	publicPath: "/public"
}

config.devServer = {
	contentBase: "public/",
	hot: true,
	port: 3000,
	proxy: {
		"/data": "http://localhost:8080"
	},
	watchContentBase: true
}

config.devtool = "inline-source-map"

config.module = {
	rules: [
		{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
	]
}

config.plugins = [
	new CleanWebpackPlugin(path.resolve(__dirname, "public"), {
		beforeEmit: true,
		watch: true
	}),
	new HtmlWebpackPlugin({
		favicon: "./src/assets/favicon.png",
		filename: "./index.html",
		inject: "head",
		template: "./src/assets/index.erb",
		title: "Act",
		alwaysWriteToDisk: true // for HMR of templates
	}),
	new HtmlWebpackHardDiskPlugin() // for HMR of templates
]


module.exports = config
