const express = require("express");
const connection = require("../db/connection");
const slugify = require("slugify");

function toSlug(name) {
  return slugify(name, { lower: true, strict: true });
}

//INDEX
function index(req, res) {
  // 1. Estrai i parametri della query dalla richiesta
  const { search, price, promo, recent } = req.query;

  // 2. Costruisci la query SQL dinamicamente
  let sql = `
    SELECT 
      products.id, 
      categories.name AS category_name, 
      products.name AS product_name, 
      description, 
      price, 
      discount, 
      create_date, 
      COALESCE(SUM(products_orders.quantity), 0) AS total_sold 
    FROM products 
    JOIN categories ON products.category_id = categories.id 
    LEFT JOIN products_orders ON products.id = products_orders.productId
  `;

  // Array per la clausola WHERE e i relativi valori
  const conditions = [];
  const params = [];

  // Filtro di ricerca (search)
  if (search) {
    conditions.push(`products.name LIKE ? OR products.description LIKE ?`);
    params.push(`%${search}%`, `%${search}%`);
  }

  // Filtro per la promozione (promo)
  if (promo === "true") {
    conditions.push(`products.discount > 0`);
  }

  // Aggiungi la clausola WHERE solo se ci sono condizioni
  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(` AND `);
  }

  // Aggiungi la clausola GROUP BY
  sql += ` GROUP BY products.id`;

  // 3. Gestisci l'ordinamento (ORDER BY)
  if (price === "asc") {
    sql += ` ORDER BY price ASC`;
  } else if (price === "desc") {
    sql += ` ORDER BY price DESC`;
  } else if (recent === "true") {
    // Ordina per data di creazione, dal più recente al meno recente
    sql += ` ORDER BY create_date DESC`;
  }

  // 4. Esegui la query principale
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Errore nella query SQL:', err);
      return res.status(500).json({ error: err.message });
    }

    // 5. Gestisci le query per le immagini (la logica rimane la stessa)
    const imageSql = "SELECT image FROM images WHERE id_product = ?";
    const productPromises = results.map((product) =>
      new Promise((resolve, reject) => {
        connection.query(imageSql, [product.id], (err, imageResults) => {
          if (err) return reject(err);
          const images = imageResults.map((img) => img.image);
          resolve({
            id: product.id,
            category_name: product.category_name,
            product_name: product.product_name,
            price: product.price,
            total_sold: product.total_sold,
            discount: product.discount,
            create_date: product.create_date,
            images,
          });
        });
      })
    );

    Promise.all(productPromises)
      .then((products) => res.json(products))
      .catch((error) => res.status(500).json({ error: error.message }));
  });
}

//SHOW
function show(req, res) {
  const { slug } = req.params;

  //QUERY SQL PER VISUALIZZARE IL PRODOTTO SINGOLO
  const sql =
    "SELECT products.id, categories.name as category_name, products.name as product_name, description, price, discount, create_date  FROM products JOIN categories ON products.category_id = categories.id";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Trovo il prodotto giusto confrontando la slug generata
    const productRow = results.find((p) => toSlug(p.product_name) === slug);

    if (!productRow) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productId = productRow.id;

    //JOIN QUERY PER VISUALIZZARE I DETTAGLI DEL SINGOLO PRODOTTO
    const detailsSql =
      "SELECT ram, processor, storage, graphic_card, os, psu,`case`, motherboard, inches, color, dpi, audio_type, impedance, connectivity, keyboard_layout, keyboard_type, frequency FROM details JOIN products ON details.product_id = products.id WHERE product_id = ?";

    //JOIN QUERY PER VISUALIZZARE LE IMMAGINI DEL SINGOLO PRODOTTO
    const imageSql =
      "SELECT image FROM images JOIN products ON images.id_product = products.id WHERE id_product = ? ";

    //Recupero dettagli
    connection.query(detailsSql, [productId], (err, detailsResults) => {
      if (err) return res.status(500).json({ error: err.message });

      const details = detailsResults.length > 0 ? detailsResults[0] : null;

      let filteredDetails = {};


      //RIMUOVO LE CHIAVI CON VALORE NULL O UNDEFINED
      for (const key in details) {
        if (details[key] !== null && details[key] !== undefined) {
          filteredDetails[key] = details[key];
        }
      }

      // Recupero immagini
      connection.query(imageSql, [productId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        //MAPPO L'ARRAY DI OGGETTI DEL RISULTATO DELLE QUERY E CREO UN ARRAY CON SOLO IL PERCORSO DELLE IMMAGINI COME ELEMENTO
        const img = results.map((element) => {
          return element.image
        })

        // Oggetto finale con tutte le info
        const product_details = {
          id: productId,
          slug: toSlug(productRow.product_name),
          category: productRow.category_name,
          product_name: productRow.product_name,
          description: productRow.description,
          price: productRow.price,
          discount: productRow.discount,
          create_date: productRow.create_date,
          details: filteredDetails,
          images: img,
        };

        res.json(product_details);
      });
    });
  });
}

//STORE
function store(req, res) {
  const { name, category_id, description, price, discount } = req.body;

  if (!name || !category_id || !description || !price || !discount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = 'INSERT INTO products (name, category_id, description, price, discount) VALUES (?, ?, ?, ?, ?)';

  connection.query(sql, [name, category_id, description, price, discount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Prodotto aggiunto con successo" });
  });
}

//DESTROY
function destroy(req, res) {
  const { id } = req.params;
  const delSql = "DELETE FROM `boolcore_db`.`products` WHERE (`id` = ?);";

  connection.query(delSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Prodotto eliminato con successo" });
  });
}

//UPDATE
function update(req, res) {
  const { id } = req.params;
  const {
    category_id,
    name,
    description,
    price,
    discount,
  } = req.body;

  const sql = `
    UPDATE products
    SET category_id = ?, name = ?, description = ?, price = ?, discount = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [category_id, name, description, price, discount, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
      res.status(200).json({ message: "Prodotto aggiornato con successo" });
    }
  );
}


module.exports = { index, show, store, destroy, update };

