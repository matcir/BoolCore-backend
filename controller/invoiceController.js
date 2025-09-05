const express = require("express");
const connection = require("../db/connection");

function index(req, res) {
  const sql = "SELECT * FROM in invoices";
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
    date,
    address,
    city,
    cap,
    country,
    total,
    payment,
    shipping_price,
  } = req.body;

  const sql =
    "INSERT INTO invoices (name, last_name, email, date, address, city, cap, country, total, payment, shipping_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

  connection.query(
    sql,
    [
      name,
      last_name,
      email,
      date,
      address,
      city,
      cap,
      country,
      total,
      payment,
      shipping_price,
    ],
    (err, results) => {
      if (err)
        return res.status(500).json({
          error: true,
          message: err.message,
        });

      res.status(201).json({
        id: results.insertId,
      });
    }
  );
}

module.exports = { index, show, store };
