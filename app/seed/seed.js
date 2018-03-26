const fs = require("fs")
const parse = require("csv-parse")

var db = require("../config/db")

const seedFilePath = "./seed/data/testdata_supply_chain.csv"

function seed() {
	fs.readFile(seedFilePath, (err, data) => {
		if (err) throw err

		parse(data.toString(), {}, (err, output) => {
			if (err) throw err

			var suppliersValues = []
			var customersValues = []
			var revenuesValues = []

			var suppliers = {}
			var customers = {}

			for (var i = 1; i < output.length; i++) {
				var supplierName = output[i][0]
				var customerName = output[i][1]
				var revenuePercent = output[i][2]
				var startDate = output[i][3]
				var endDate = output[i][4]

				if (!suppliers[supplierName]) {
					suppliersValues.push([supplierName])
					suppliers[supplierName] = {}
				}

				if (!customers[customerName]) {
					customersValues.push([customerName])
					customers[customerName] = {}
				}

				revenuesValues.push([
					supplierName, 
					customerName, 
					revenuePercent, 
					startDate === "NULL" ? null : startDate, 
					endDate === "NULL" ? null : endDate
				])
			}

			// seed suppliers
			db.query("insert into suppliers (name) values ?", [suppliersValues], (err, results, fields) => {
				if (err) throw err
				else console.log("inserted suppliers")

				db.query("insert into customers (name) values ?", [customersValues], (err, results, fields) => {
					if (err) throw err
					else console.log("inserted customers")

					revenuesValues.map((v) => {
						db.query(`
							insert into revenues 
							set supplier_id=(select id from suppliers where name=?),
								customer_id=(select id from customers where name=?),
								revenue_pct=?, 
								start_date=?, 
								end_date=?`, v, (err, results, fields) => {
								if (err) throw err
							}
						)
					})

					console.log("inserted revenues")
				})
			})
		})
	})
}

// clean and seed database if revenues table is empty
db.query(`select count(*) from revenues`, (err, results) => {
		if (err) throw err

		const count = results[0]["count(*)"]

		if (count > 0) return

		db.query(`delete from revenues;`, (err) => {
			if (err) throw err
			else console.log("revenues cleared")

			db.query(`delete from customers`, (err) => {
				if (err) throw err
				else console.log("customers cleared")

				db.query(`delete from suppliers`, (err) => {
					if (err) throw err
					else console.log("suppliers cleared")

					seed()
				})
			})
		})
	}
)


