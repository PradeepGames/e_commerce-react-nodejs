const express = require('express');
const cors = require('cors');
require("./db/config");
const Jwt = require('jsonwebtoken')
const JwtKey = 'e-comm';

const User = require("./db/User");
const Products = require("./db/Product");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {

    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {

        if (err) {
            resp.send({ result: "Jwt tokeb error" });
        }
        resp.send({ result, auth: token });
    });
});

app.post("/login", async (req, resp) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {

                if (err) {
                    resp.send({ result: "Jwt tokeb error" });
                }
                resp.send({ user, auth: token });
            });

        } else {
            resp.send({ result: 'No User Found' });
        }
    } else {

        resp.send({ result: 'No User Found' });
    }
});

app.post("/add-product", verifyToken, async (req, resp) => {

    let product = new Products(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/product", verifyToken, async (req, resp) => {

    let product = await Products.find();
    if (product.length > 0)
        resp.send(product);
    else
        resp.send({ result: 'No Product Found' });
});

app.delete("/product/:id", verifyToken, async (req, resp) => {

    let result = await Products.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0)
        resp.send({ result: 'Delete Successfully' });
    else
        resp.send({ result: 'No Product Found' });
});


app.get("/product/:id", verifyToken, async (req, resp) => {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'No Product Found' });
    }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'update failed not Found' });
    }
});


app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Products.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }
            ]
        });

    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: 'No Product Found' });
    }
});


function verifyToken(req, resp, next) {

    let token = req.headers['authorization'];
    console.warn("midllerware called", token);

    if (token) {
        token = token.split(' ')[1];
        console.warn("midllerware called if ", token);
        Jwt.verify(token, JwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: 'please provide valid token' });
            } else {
                next();
            }
        });
    } else {
        resp.status(401).send({ result: 'please add token with headers' });
    }
}


app.listen(5000);