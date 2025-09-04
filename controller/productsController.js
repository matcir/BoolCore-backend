const express = require('express');
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
    const detailsSql = ' SELECT product_id, ram, processor, storage, graphic_card, os, psu,`case`, motherboard, inches, color, dpi, audio_type, impedance, connectivity, keyboard_layout, keyboard_type, frequency FROM details JOIN products ON details.product_id = products.id'


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


module.exports = { index, show }