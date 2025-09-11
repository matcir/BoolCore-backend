const express = require("express");
const connection = require("../db/connection");
const nodemailer = require('nodemailer');


var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "975015d843efbb",
    pass: process.env.MAIL_PASS
  }
});

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

function store(req, res) {
  const {
    name, last_name, email, address, city, cap, country, payment, products,
  } = req.body;

  // QUERY DI INSERIMENTO INVOICE
  const sql = "INSERT INTO invoices (name, last_name, email, address, city, cap, country, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [name, last_name, email, address, city, cap, country, payment], (err, results) => {
    if (err) return res.status(500).json({ error: true, message: err.message });

    // SALVO L'ID DELLA INVOICE APPENA INSERITA
    const lastInvoiceId = results.insertId;

    // PROMISE PER OGNI PRODOTTO E ASSOCIARLO ALLA INVOICE
    const productPromises = products.map(product =>
      new Promise((resolve, reject) => {
        // CERCO I DATI DEL PRODOTTO IN BASE ALL'ID
        const productSql = 'SELECT * FROM products WHERE id = ?';
        connection.query(productSql, [product.id], (err, prodResults) => {
          if (err) return reject(err);
          const prod = prodResults[0];
          const discount_price = prod.price - (prod.price * prod.discount);
          const partial_total = discount_price * product.quantity;

          // ASSOCIO I PRODOTTI ALL'INVOICE APPENA CREATA
          const productsSql = `INSERT INTO products_orders (productId, invoice_id, quantity, discount_price, product_price, product_name) VALUES (?, ?, ?, ?, ?, ?)`;
          connection.query(productsSql, [
            product.id,
            lastInvoiceId,
            product.quantity,
            discount_price,
            prod.price,
            prod.name,
          ], (err) => {
            if (err) return reject(err);
            resolve({
              partial_total,
              product_name: prod.name,
              quantity: product.quantity,
              discount_price
            });
          });
        });
      })
    );

    // UNA VOLTA COMPLETATE TUTTE LE PROMISE...
    Promise.all(productPromises)
      .then(partials => {
        const invoice_total = partials.reduce((sum, val) => sum + val.partial_total, 0);
        let shipping = invoice_total < 99.99 ? 6.99 : 0;
        const update_invoice = 'UPDATE invoices SET total = ?, shipping_price = ? WHERE id = ?';

        connection.query(update_invoice, [invoice_total, shipping, lastInvoiceId], async (err) => {
          if (err) return res.status(500).json({ error: true, message: err.message });
          const productsListHtml = partials.map(p => `<li>${p.product_name} (x${p.quantity}) - ${p.discount_price}€ l'uno</li>`).join('');
          console.log(transport);

          //EMAIL VENDOR
          const vendorMail = {
            from: 'mittente@test.com',
            to: 'boolcore.eshop@gmail.com',
            subject: 'Nuovo ordine inserito',
            html: `
              <h1>Un nuovo ordine è stato inserito!</h1>
              <p>Ordine numero #${lastInvoiceId} appartenente a ${last_name} ${name}.</p>
              <p>Riepilogo:</p>
              <ul>
                ${productsListHtml}
              </ul>
              <p>Costo Totale: ${invoice_total.toFixed(2)}€</p>
              <p>Spese di Spedizione: ${shipping.toFixed(2)}€</p>
              <p>A presto!</p>
            `
          };
          transport.sendMail(vendorMail, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Email inviata a Mailtrap con successo!');
            }
          })
          console.log(email);

          // INVIO EMAIL CLIENTE
          const customerMail = {
            from: 'mittente@test.com',
            to: email,
            subject: 'Test di invio email',
            html: `
              <h1>Grazie per il tuo ordine, ${name}!</h1>
              <p>Il tuo ordine #${lastInvoiceId} è stato confermato.</p>
              <p>Riepilogo:</p>
              <ul>
                ${productsListHtml}
              </ul>
              <p>Costo Totale: ${invoice_total.toFixed(2)}€</p>
              <p>Spese di Spedizione: ${shipping.toFixed(2)}€</p>
              <p>A presto!</p>
            `
          };
          transport.sendMail(customerMail, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Email inviata a Mailtrap con successo!');
            }
          })

          res.status(201).json({ message: 'Ordine inserito con successo' });
        });
      })
      .catch(error => {
        console.error('Errore durante il salvataggio dei prodotti:', error);
        res.status(500).json({ error: true, message: 'Errore durante la registrazione dei prodotti.' });
      });
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
