var db = require("../config/db")

const dataHandler = (req, res) => {
	db.query(`
		select 
			suppliers.name as supplier, 
			customers.name as customer, 
			revenue_pct as revenuePct, 
			start_date as startDate, 
			end_date as endDate 
		from revenues 
		join suppliers on (suppliers.id=revenues.supplier_id) 
		join customers on (customers.id=revenues.customer_id);`, 
		(err, results, fields) => {
			if (err) {
				res.status(500)
				res.send(err)
				return
			} 
			
			var rows = {}

			results.map((r) => {
				if (!rows[r.supplier]) rows[r.supplier] = {}

				if (!rows[r.supplier][r.customer]) {
					rows[r.supplier][r.customer] = {
						"revenuePct": r.revenuePct,
						"startDate": r.startDate,
						"endDate": r.endDate
					}
				} else {
					const sDate0 = Date.parse(rows[r.supplier][r.customer].startDate)
					const sDate1 = Date.parse(r.startDate)

					if (sDate1 > sDate0) {
						rows[r.supplier][r.customer].startDate = r.startDate
					}
				}

			})

			res.json(rows)
		}
	)
}

module.exports = dataHandler