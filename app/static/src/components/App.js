import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import moment from "moment"

import Row from "components/Row"
import {getData} from "utils/requests"

const StyledAppContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-family: Arial;
	padding: 5px 10px;

	.title {
		border-bottom: 2px solid black;
		padding: 10px 0px;
	}
`

const StyledTableContainer = styled.div``

const StyledTableHeaderContainer = styled.div`
	display: grid;
	font-weight: 600;
	text-transform: uppercase;
	border-bottom: 1px double rgb(100,100,100);
	padding: 5px 0px;

	.end {
		display: none;
	}

	.supplier, .customer, .start {
		padding: 0px 5px;
	}

	.revenue {
		text-align: right;
		padding-right: 25px;
	}

	@media (max-width: 1000px) {
		font-size: 0.8em;

		.start, .end {
			display: none;
		}

		grid-template-columns: 1.5fr 1.75fr 1fr;
		grid-template-areas: 
			"supplier customer revenue"
	}

	@media (min-width: 1000px) {
		grid-template-columns: repeat(2, 1.5fr) 0.8fr 1fr;
		grid-template-areas: 
			"supplier customer revenue start"
	}
`

class App extends React.Component {
	render() {

		return (
		<StyledAppContainer className="app">
			<h1 className="title">% Revenue Per Customer Per Supplier</h1>

			<StyledTableContainer className="table">
				<StyledTableHeaderContainer>
					<div className="supplier">Supplier</div>
					<div className="customer">Customer</div>
					<div className="revenue">Revenue (%)</div>
					<div className="start">Start Date</div>
					<div className="end">End Date</div>	
				</StyledTableHeaderContainer>

				{this.state.rows.map((row, i) => {
					return <Row key={i} {...row} />
				})}
			</StyledTableContainer>

		</StyledAppContainer>
		)
	}

	constructor(props) {
		super(props)

		this.state = {
			rows: [],
			sections: {}
		}
	}

	componentDidMount() {
		this.requestData()
	}

	requestData() {
		console.log("requesting data...")

		getData().then((response) => {

			var rows = []
			Object.keys(response.data).map((s) => {
				Object.keys(response.data[s]).map((c) => {
					rows.push({
						supplier: s,
						customer: c,
						revenuePct: response.data[s][c].revenuePct,
						startDate: response.data[s][c].startDate != null ? moment(response.data[s][c].startDate, "YYYY-MM-DDThh:mm:ss").format("lll") : "N/A",
						endDate: response.data[s][c].endDate != null ? moment(response.data[s][c].endDate, "YYYY-MM-DDThh:mm:ss").format("lll") : "N/A"
					})
				})
			})

			this.setState({
				rows: rows
			})
		}).catch((error) => {
			console.error(`Error requestData: ${error}`)
			setTimeout(this.requestData.bind(this), 2500)
		})
	}


}

export default App