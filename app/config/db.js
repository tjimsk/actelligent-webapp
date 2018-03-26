var mysql = require("mysql")
var db

function connectDatabase() {
    if (!db) {
        const host = process.env.NODE_ENV === "production" ? "sql" : "localhost"

        console.log(`sql host is ${host}`)

        db = mysql.createConnection({
            host     : host,
            user     : "root",
            password : "password",
            database : "act"
        })

        db.connect((err) => {
            if(!err) {
                console.log("database connection successful")
            } else {
                console.log("database connection failed")
            }
        })
    }

    return db
}

module.exports = connectDatabase()