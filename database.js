const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text, 
            description text,
            category text,
            brand text,
            expiredDate text,
            manufacturedDate text,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate text
            )`, (err) => {
            if (err) {
                
            } else {
                
                var insert = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["White Basmathi Rice", "White Basmathi Rice imported from Pakistan. High-quality rice with extra fragrance. Organically grown.", "Rice", "CIC", "2023.05.04", "2022.02.20", 324567, , 1020, 200, "2022.02.24"])
            }
        })

    }
})



const DBSOURCE2 = "user.sqlite"

let db2 = new sqlite3.Database(DBSOURCE2, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database 2.')
        db2.run(`CREATE TABLE customer (
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
                db2.run(insert, ["Nisandu", "No.01,Dambara,Meewanapalana", "nisandunox@gmail.com", "2007.10.15", "male", "15", "Nisandu", , "3895848393", "2023", "246","2022.02.24"])
            }
        })

    }
})

module.exports.products = db
module.exports.users = db2