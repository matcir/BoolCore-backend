const connection = require("../db/connection");

// INDEX 
function index(req, res) {
    const sql = "SELECT * FROM images";
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
}

// SHOW
function show(req, res) {
    const { image } = req.params;
    const sql = "SELECT * FROM images WHERE image = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Immagine non trovata" });
        res.status(200).json(results[0]);
    });
}

// STORE
function store(req, res) {
    const { image, id_product } = req.body;
    const sql = "INSERT INTO images (image, id_product) VALUES (?, ?)";
    connection.query(sql, [image, id_product], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, image, id_product });
    });
}

// UPDATE
function update(req, res) {
    const { id } = req.params;
    const { image } = req.body;
    const sql = "UPDATE images SET image = ? WHERE image = ?";
    connection.query(sql, [image, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Immagine non trovata" });
        res.status(200).json({ message: "Immagine aggiornata con successo" });
    });
}

// DESTROY
function destroy(req, res) {
    const { image } = req.body
    const sql = "DELETE FROM images WHERE image = ?";
    connection.query(sql, [image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Immagine non trovata" });
        res.status(200).json({ message: "Immagine eliminata con successo" });
    });
}

module.exports = { index, show, store, update, destroy };
