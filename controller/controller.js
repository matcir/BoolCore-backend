const connection = require('../db/connection') 

function index(req, res) {
    const sql = "SELECT * FROM products";
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}

function show(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM products WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }   
        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(results[0]);
    });
}

function store(req, res) {
    const currOrder = req.params;
    const { /* PLACEHOLDER */ } = req.body;
    const sqlInsertOrder = "INSERT INTO orders (/* PLACEHOLDER */) VALUES (?)";
    connection.query(sqlInsertOrder, [/* PLACEHOLDER */], (err, result) => {
        if (err) {  
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Order created", orderId: result.insertId });
    });
}