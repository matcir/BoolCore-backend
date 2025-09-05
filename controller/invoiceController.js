const express = require("express");
const connection = require("../db/connection");

function index(req, res) {
  const sql = "SELECT * FROM invoices";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}

function show(req, res) {
  const { id } = req.params;
  const sql = "SELECT * FROM invoices WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.json(result[0]);
  });
}

function store(req, res) {
  const {
    name,
    last_name,
    email,
    address,
    city,
    cap,
    country,
    total,
    payment,
    shipping_price,
    products,
  } = req.body;

  const sql = "INSERT INTO invoices (name, last_name, email, address, city, cap, country, total, payment_method, shipping_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [
      name,
      last_name,
      email,
      address,
      city,
      cap,
      country,
      total,
      payment,
      shipping_price,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message });
      }

      const lastInvoiceId = results.insertId;

      products.forEach((product) => {

        const productsSql = `INSERT INTO products_orders
          (productId, invoice_id, quantity, discount_price, product_price, product_name) 
         VALUES(?, ?, ?, ?, ?, ?)`
        connection.query(productsSql,
          [
            product.id,
            lastInvoiceId,
            product.quantity,
            product.discount_price,
            product.product_price,
            product.product_name,
          ]
        );
      });

      res.status(201).json({ message: 'Ordine inserito con successo' });
    }
  );
}

module.exports = { index, show, store };
