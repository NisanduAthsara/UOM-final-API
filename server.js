const express = require('express');
const app = express()
const db = require('./database')
const bodyparser = require('body-parser')
const {request,response} = require('express')

const PORT = 8080

app.use(bodyparser.json())
app.use(express.json())

app.post("/api/products/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batchNumber,
            unitPrice,
            quantity,
            createdDate
        } = req.body;

        var sql = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)'
        var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate]
        db.products.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "success",
                    "data": req.body,
                    "id": this.lastID
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});


app.post("/api/users/", (req, res, next) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expirytDate,
            cvv,
            timeStamp
        } = req.body;

        function isEmailValid (email){
            if (!email) return false;
        
            if (email.length > 254) return false;
        
            var valid = emailRegex.test(email);
            if (!valid) return false;
        
            // Further checking of some things regex can't handle
            var parts = email.split("@");
            if (parts[0].length > 64) return false;
        
            var domainParts = parts[1].split(".");
            if (
                domainParts.some(function (part) {
                    return part.length > 63;
                })
            )
                return false;
        
            return true;
        };

        if(cardNumber.length < 12){
            return res.json({
                "message":"Credit Card Number must contain at least 12 digits"
            })
        }

        if(!isEmailValid(email)){
            return res.json({
                "message":"Invalid Email"
            })
        }

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate, cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate, cvv, timeStamp]
        db.users.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.status(201).json({
                    "message": `customer ${req.body.name} has registered`,
                    "customerId": this.lastID
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});


app.get("/api/products", (req, res, next) => {
    try {
        var sql = "select * from products"
        var params = []
        db.products.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }

});

app.put("/api/products/", (req, res, next) => {


    const {
        id,
        productName,
        description,
        category,
        brand,
        expiredDate,
        manufacturedDate,
        batchNumber,
        unitPrice,
        quantity,
        createdDate
    } = req.body;

    db.products.run(`UPDATE products set productName = ?, description = ?, category = ?, brand = ?,expiredDate=?,manufacturedDate=?,batchNumber=?,unitPrice=?,quantity=?,createdDate=? WHERE id = ?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updated: this.changes });
        });
});


app.delete("/api/products/delete/:id", (req, res, next) => {
    try {
        db.products.run(
            'DELETE FROM products WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes })
            });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})