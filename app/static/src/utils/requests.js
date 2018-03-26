import axios from "axios"

const getData = () => {
	return axios.get("/data")
}

export {
	getData
}