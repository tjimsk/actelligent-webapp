import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledRowContainer = styled.div`
	display: grid;
	border-bottom: 1px solid rgb(220,220,220);
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

class Row extends React.Component {
	render() {
		return (
			<StyledRowContainer className="row">
				<div className="supplier">{this.props.supplier}</div>
				<div className="customer">{this.props.customer}</div>
				<div className="revenue">{this.props.revenuePct.toFixed(2)}</div>
				<div className="start">{this.props.startDate}</div>
				<div className="end">{this.props.endDate}</div>
			</StyledRowContainer>
		)
	}
}

export default Row