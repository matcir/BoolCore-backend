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
  const sql = "SELECT * FROM boolcore_db.invoices WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.json(results);
  });
}

function store(req, res) {
  const {
    name, last_name, email, address, city, cap, country, payment, products,
  } = req.body;



  const sql = "INSERT INTO invoices (name, last_name, email, address, city, cap, country, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [name, last_name, email, address, city, cap, country, payment], (err, results) => {
    if (err) return res.status(500).json({ error: true, message: err.message });

    const lastInvoiceId = results.insertId;

    // Array di Promises per ogni prodotto
    const productPromises = products.map(product =>
      new Promise((resolve, reject) => {
        const productSql = 'SELECT * FROM products WHERE id = ?';
        connection.query(productSql, [product.id], (err, prodResults) => {
          if (err) return reject(err);
          const prod = prodResults[0];
          const discount_price = prod.price - (prod.price * prod.discount);
          const partial_total = discount_price * product.quantity;

          const productsSql = `INSERT INTO products_orders
            (productId, invoice_id, quantity, discount_price, product_price, product_name) 
            VALUES (?, ?, ?, ?, ?, ?)`;
          connection.query(productsSql, [
            product.id,
            lastInvoiceId,
            product.quantity,
            discount_price,
            prod.price,
            prod.name,
          ], (err) => {
            if (err) return reject(err);
            resolve(partial_total); // restituisco il totale parziale
          });
        });
      })
    );

    Promise.all(productPromises)
      .then(partials => {
        const invoice_total = partials.reduce((sum, val) => sum + val, 0);
        let shipping = invoice_total < 100 ? 6.99 : 0;
        const update_invoice = 'UPDATE invoices SET total = ?, shipping_price = ? WHERE id = ?';
        connection.query(update_invoice, [invoice_total, shipping, lastInvoiceId], (err) => {
          if (err) return res.status(500).json({ error: true, message: err.message });
          res.status(201).json({ message: 'Ordine inserito con successo' });
        });
      })

  });
}

module.exports = { index, show, store };
