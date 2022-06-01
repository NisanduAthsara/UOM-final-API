const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "user.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database 2.')
        db.run(`CREATE TABLE customer (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text, 
                address text,
                email text,
                dateOfBirth text,
                gender text,
                age text,
                cardHolderName text,
                cardNumber text,
                expirytDate text,
                cvv text,
                timeStamp text
            )`, (err) => {
            if (err) {
                
            } else {
                
                var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["Nisandu", "No.01,Dambara,Meewanapalana", "nisandunox@gmail.com", "2007.10.15", "male", "15", "Nisandu", , "3895848393", "2023", "246","2022.02.24"])
            }
        })

    }
})

module.exports = db