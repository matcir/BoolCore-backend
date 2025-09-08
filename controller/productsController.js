const express = require("express");
const connection = require("../db/connection");


//INDEX 
function index(req, res) {
  const sql = `SELECT products.id, categories.name as category_name, products.name as product_name, description, price, discount, create_date, SUM(products_orders.quantity) AS total_sold FROM products JOIN categories ON products.category_id = categories.id JOIN products_orders ON products.id = products_orders.productId GROUP BY products.id`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const imageSql = 'SELECT image FROM images WHERE id_product = ?';

    // Creo un array di Promises per tutte le query immagini
    const productPromises = results.map(product =>
      new Promise((resolve, reject) => {
        connection.query(imageSql, [product.id], (err, imageResults) => {
          if (err) return reject(err);

          const images = imageResults.map(img => img.image);

          resolve({
            id: product.id,
            category_name: product.category_name,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            total_sold: product.total_sold,
            create_date: product.create_date,
            images
          });
        });
      })
    );

    Promise.all(productPromises)
      .then(products => res.json(products))
      .catch(error => res.status(500).json({ error: error.message }));
  });
}


//SHOW
function show(req, res) {


  const { id } = req.params;

  //QUERY SQL PER VISUALIZZARE IL PRODOTTO SINGOLO
  const sql = "SELECT products.id, categories.name as category_name, products.name as product_name, description, price, discount, create_date  FROM products JOIN categories ON products.category_id = categories.id WHERE products.id = ?"

  //JOIN QUERY PER VISUALIZZARE I DETTAGLI DEL SINGOLO PRODOTTO
  const detailsSql = 'SELECT ram, processor, storage, graphic_card, os, psu,`case`, motherboard, inches, color, dpi, audio_type, impedance, connectivity, keyboard_layout, keyboard_type, frequency FROM details JOIN products ON details.product_id = products.id WHERE product_id = ?';

  //JOIN QUERY PER VISUALIZZARE LE IMMAGINI DEL SINGOLO PRODOTTO
  const imageSql = 'SELECT image FROM images JOIN products ON images.id_product = products.id WHERE id_product = ? '

  //CREO DELLE VARIABILI DI APPOGGIO IN CUI SALVARE I DATI ESTRATTI CON LE QUERY
  let single_product
  let details
  let product_details

  //CONNESSIONE AL DB E APPLICAZIONE DELLA QUERY DEL SINGOLO PRODOTTO
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    single_product = results[0];
  });

  //CONNESSIONE AL DB E APPLICAZIONE DELLA QUERY PER I DETTAGLI DEL PRODOTTO
  connection.query(detailsSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    details = results[0]

  })

  //CONNESSIONE AL DB E APPLICAZIONE DELLA QUERY PER LE IMMAGINI DEL PRODOTTO
  connection.query(imageSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    //MAPPO L'ARRAY DI OGGETTI DEL RISULTATO DELLE QUERY E CREO UN ARRAY CON SOLO IL PERCORSO DELLE IMMAGINI COME ELEMENTO
    const images = results.map((element) => {
      return element.image
    })

    //CREO IL NUOVO OGGETTO CON LE CHIAVI DI MIO INTERESSE, INSERENDO I DETTAGLI E LE IMMAGGINI COME NUOVE CHIAVI
    product_details = {
      category: single_product.category_name,
      product_name: single_product.product_name,
      description: single_product.description,
      price: single_product.price,
      discount: single_product.discount,
      create_date: single_product.create_date,
      details: details,
      images: images
    }

    res.json(product_details)
  })

}


module.exports = { index, show }
