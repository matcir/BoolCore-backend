const express = require("express");
const connection = require("../db/connection");

//INDEX
function index(req, res) {
  const sql = "SELECT * FROM invoices";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}

//SHOW
function show(req, res) {
  const { id } = req.params;
  const sql = "SELECT * FROM boolcore_db.invoices WHERE id = ?";
  let order
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    order = results[0]
  });

  //QUERY PER PRENDERE I PRODOTTI ASSOCIATI ALLA INVOICE
  const ordered_productsSql = 'SELECT * FROM boolcore_db.products_orders WHERE invoice_id = ?'
  connection.query(ordered_productsSql, [id], (err, results) => {
    const invoice = {
      id: order.id,
      name: order.name,
      last_name: order.last_name,
      email: order.email,
      address: order.address,
      city: order.city,
      cap: order.cap,
      country: order.country,
      payment_method: order.payment_method,
      total: order.total,
      shipping_price: order.shipping_price,
      products: results
    }
    res.status(200).json(invoice)

  })
}

//STORE
function store(req, res) {
  const {
    name, last_name, email, address, city, cap, country, payment, products,
  } = req.body;


  //QUERY DI INSERIMENTO INVOICE
  const sql = "INSERT INTO invoices (name, last_name, email, address, city, cap, country, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [name, last_name, email, address, city, cap, country, payment], (err, results) => {
    if (err) return res.status(500).json({ error: true, message: err.message });

    //SALVO L'ID DELLA INVOICE APPENA INSERITA
    const lastInvoiceId = results.insertId;

    //PROMISE PER OGNI PRODOTTO E ASSOCIARLO ALLA INVOICE APPENA INSERITA
    const productPromises = products.map(product =>
      new Promise((resolve, reject) => {

        //CERCO I DATI DEL PRODOTTO IN BASE ALL'ID PRODOTTI
        const productSql = 'SELECT * FROM products WHERE id = ?';
        connection.query(productSql, [product.id], (err, prodResults) => {
          if (err) return reject(err);
          const prod = prodResults[0];
          const discount_price = prod.price - (prod.price * prod.discount);
          const partial_total = discount_price * product.quantity;

          //ASSOCIO I PRODOTTI ALL'INVOICE APPENA CREATA
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

    //UNA VOLTA COMPLETATE TUTTE LE PROMISE...
    Promise.all(productPromises)

      //MODIFICO LA INVOICE APPENA INSERITA AGGIUNGENDO IL TOTALE  CALCOLATO
      .then(partials => {
        const invoice_total = partials.reduce((sum, val) => sum + val, 0);
        let shipping = invoice_total < 99.99 ? 6.99 : 0;
        const update_invoice = 'UPDATE invoices SET total = ?, shipping_price = ? WHERE id = ?';
        connection.query(update_invoice, [invoice_total, shipping, lastInvoiceId], (err) => {
          if (err) return res.status(500).json({ error: true, message: err.message });
          res.status(201).json({ message: 'Ordine inserito con successo' });
        });
      })

  });
}

//DESTROY
function destroy(req, res) {
  const { id } = req.params
  const delSql = 'DELETE FROM `boolcore_db`.`invoices` WHERE (`id` = ?);'

  //QUERY PER ELIMINARE UNA INVOICE, I PRODOTTI ASSOCIATI A QUELL'ORDINE VENGONO RIMOSSI AUTOMATICAMENTE
  connection.query(delSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: "Ordine eliminato con successo" });
  })


}

//UPDATE
function update(req, res) {
  const { id } = req.params;
  const {
    name,
    last_name,
    email,
    address,
    city,
    cap,
    country,
    payment_method,
    shipping_price
  } = req.body;

  const sql = `
    UPDATE invoices
    SET name = ?, last_name = ?, email = ?, address = ?, city = ?, cap = ?, country = ?, payment_method = ?, shipping_price = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [name, last_name, email, address, city, cap, country, payment_method, shipping_price, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Invoice not found" });
      res.status(200).json({ message: "Ordine aggiornato con successo" });
    }
  );
}

module.exports = { index, show, store, destroy, update };
