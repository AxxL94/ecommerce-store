const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/product", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/category", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/product/:cat_name", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE category = $1",
      [req.params.cat_name]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product by category" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "API /api/v1/ works!" });
});

module.exports = router;
