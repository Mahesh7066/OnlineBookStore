const express = require('express');
require('./db/config')
const User = require('./db/User');
const cors = require('cors');
const Product = require('./db/Book_Collections')
const jwt = require('jsonwebtoken');
const jwtKey = 'Sarita_eComm';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "5h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, Please try after some time" })
        }
        res.send({ result, auth: token })
    })
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: "5h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong, Please try after some time" })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: "No user found" })
        }
    }
    else {
        res.send({ result: "No User Found" })
    }
})

app.post('/add-book', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/books', verifyToken, async (req, res) => {
    const products = await Product.find();
    if (products.length) {
        res.send(products);
    } else {
        res.send({ result: 'No product found in database' })
    }
})

app.delete('/book/:id', verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
})

app.get('/book/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: 'no record found' });
    }
})

app.put('/book/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result);
});

app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { authorName: { $regex: req.params.key } },
            { description: { $regex: req.params.key } }
        ]
    })
    res.send(result)
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtKey, (err, valid)=>{
            if (err) {
                res.status(401).send({result : 'Please provide valid token'});
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result: 'Please add token with header'});
    }
}

app.listen(4000, () => {
    console.log('server is running at port 4000');
})