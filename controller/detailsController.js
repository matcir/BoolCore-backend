const express = require("express");
const connection = require("../db/connection");

//INDEX
function index(req, res) {
    const sql = 'SELECT * FROM boolcore_db.details;'

    connection.query(sql, (err, results) => {
        res.status(201).json(results)
    })
}

//SHOW
function show(req, res) {
    const { id } = req.params;

    const sql = 'SELECT * FROM boolcore_db.details WHERE product_id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Details not found" });

        const details = results[0];
        let filteredDetails = {};
        for (const key in details) {
            if (details[key] !== null && details[key] !== undefined) {
                filteredDetails[key] = details[key];
            }
        }

        res.status(200).json(filteredDetails);
    });
}

//STORE
function store(req, res) {
    const {
        product_id,
        ram,
        processor,
        storage,
        graphic_card,
        os,
        psu,
        case: caseType,
        motherboard,
        inches,
        color,
        dpi,
        audio_type,
        impedance,
        connectivity,
        keyboard_layout,
        keyboard_type,
        frequency
    } = req.body;

    const sql = `INSERT INTO details (
        product_id, ram, processor, storage, graphic_card, os, psu, \`case\`, motherboard, inches, color, dpi, audio_type, impedance, connectivity, keyboard_layout, keyboard_type, frequency
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [
        product_id,
        ram,
        processor,
        storage,
        graphic_card,
        os,
        psu,
        caseType,
        motherboard,
        inches,
        color,
        dpi,
        audio_type,
        impedance,
        connectivity,
        keyboard_layout,
        keyboard_type,
        frequency
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Dettagli inseriti con successo", id: product_id });
    });
}

//DESTROY
function destroy(req, res) {
    const { id } = req.params
    const delSql = 'DELETE FROM `boolcore_db`.`details` WHERE (`product_id` = ?);'

    connection.query(delSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Details not found" });
        }
        res.status(200).json({ message: "Dettagli eliminati con successo" });
    })
}

//UPDATE
function update(req, res) {
    const { id } = req.params;
    const {
        ram,
        processor,
        storage,
        graphic_card,
        os,
        psu,
        case: caseType,
        motherboard,
        inches,
        color,
        dpi,
        audio_type,
        impedance,
        connectivity,
        keyboard_layout,
        keyboard_type,
        frequency
    } = req.body;

    const sql = `UPDATE details SET
        ram = ?, processor = ?, storage = ?, graphic_card = ?, os = ?, psu = ?, \`case\` = ?, motherboard = ?, inches = ?, color = ?, dpi = ?, audio_type = ?, impedance = ?, connectivity = ?, keyboard_layout = ?, keyboard_type = ?, frequency = ?
        WHERE product_id = ?`;

    connection.query(sql, [
        ram,
        processor,
        storage,
        graphic_card,
        os,
        psu,
        caseType,
        motherboard,
        inches,
        color,
        dpi,
        audio_type,
        impedance,
        connectivity,
        keyboard_layout,
        keyboard_type,
        frequency,
        id
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Details not found" });
        res.status(200).json({ message: "Dettagli aggiornati con successo" });
    });
}

module.exports = { index, show, store, destroy, update }