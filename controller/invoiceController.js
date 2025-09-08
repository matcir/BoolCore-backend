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
  
  // Inizia una transazione per garantire l'integrità dei dati
  connection.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ error: true, message: 'Errore nell\'avvio della transazione' });
    }

  const sql =
    "INSERT INTO invoices (name, last_name, email, address, city, cap, country, total, payment_method, shipping_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


    // Inserisce la fattura iniziale
    const sql = "INSERT INTO invoices (name, last_name, email, address, city, cap, country, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [name, last_name, email, address, city, cap, country, payment], (err, results) => {
      if (err) {
        return connection.rollback(() => res.status(500).json({ error: true, message: err.message }));
      }

      const lastInvoiceId = results.insertId;
      let invoice_total = 0;


      // Crea un array di Promise per ogni prodotto
      const productPromises = products.map(product =>
        new Promise((resolve, reject) => {
          const productSql = 'SELECT * FROM products WHERE id = ?';
          connection.query(productSql, [product.id], (err, prodResults) => {
            if (err) {
              return reject(err);
            }
            if (prodResults.length === 0) {
              return reject(new Error(`Prodotto con ID ${product.id} non trovato.`));
            }

            const prod = prodResults[0];
            const discount_price = prod.price - (prod.price * prod.discount);
            invoice_total += discount_price * product.quantity;

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
              if (err) {
                return reject(err);
              }
              resolve();
            });
          });
        })
      );

      // Aspetta che tutte le Promise siano completate
      Promise.all(productPromises)
        .then(() => {
          let shipping = invoice_total < 100 ? 6.99 : 0;
          const update_invoice = 'UPDATE invoices SET total = ?, shipping_price = ? WHERE id = ?';
          connection.query(update_invoice, [invoice_total, shipping, lastInvoiceId], (err) => {
            if (err) {
              return connection.rollback(() => res.status(500).json({ error: true, message: err.message }));
            }
            // Completa la transazione
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => res.status(500).json({ error: true, message: err.message }));
              }
              res.status(201).json({ message: 'Ordine inserito con successo' });
            });
          });
        })
        .catch(error => {
          // Esegue il rollback in caso di errore
          connection.rollback(() => {
            res.status(500).json({ error: true, message: error.message });
          });
        });
    });
  });
      products.forEach((product) => {
        const productsSql = `INSERT INTO products_orders
          (productId, invoice_id, quantity, discount_price, product_price, product_name) 
         VALUES(?, ?, ?, ?, ?, ?)`;
        connection.query(productsSql, [
          product.id,
          lastInvoiceId,
          product.quantity,
          product.discount_price,
          product.product_price,
          product.product_name,
        ]);
      });

      res.status(201).json({ message: "Ordine inserito con successo" });
    }
  );

}

module.exports = { index, show, store };
