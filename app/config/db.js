var mysql = require("mysql")
var db

function connectDatabase() {
    if (!db) {
        const host = process.env.NODE_ENV === "production" ? "sql" : "localhost"

        const config = {
            host: host,
            user: "root",
            password: "password",
            database: "act"
        }

        console.log(`Connecting to ${config.database} on host ${config.host}...`)

        db = mysql.createConnection(config)

        db.connect((err) => {
            if(!err) {
                console.log("Database connection successful")
            } else {
                console.log("Database connection failed")
            }
        })
    }

    return db
}

module.exports = connectDatabase()