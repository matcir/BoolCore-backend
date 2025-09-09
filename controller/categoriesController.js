const connection = require("../db/connection");

// INDEX
function index(req, res) {
    const sql = "SELECT * FROM categories";
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
}

// SHOW
function show(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM categories WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Categoria non trovata" });
        res.status(200).json(results[0]);
    });
}

// STORE
function store(req, res) {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Il campo 'name' è obbligatorio." });
    }
    const sql = "INSERT INTO categories (name) VALUES (?)";
    connection.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, name });
    });
}

// UPDATE
function update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Il campo 'name' è obbligatorio." });
    }
    const sql = "UPDATE categories SET name = ? WHERE id = ?";
    connection.query(sql, [name, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Categoria non trovata" });
        res.status(200).json({ message: "Categoria aggiornata con successo" });
    });
}

// DESTROY
function destroy(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM categories WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Categoria non trovata" });
        res.status(200).json({ message: "Categoria eliminata con successo" });
    });
}

module.exports = { index, show, store, update, destroy }