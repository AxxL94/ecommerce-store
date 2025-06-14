const cors = require("cors");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
require("./db");

const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");

if (process.env.NODE_ENV === "production") {
  app.use(cors({
	  origin: "http://localhost", // 🔐 domaine frontend réel
    credentials: true
  }));
} else {
  app.use(cors({
	  origin: "http://localhost",
    credentials: true
  }));
}

// === SÉCURITÉ : Gérer erreurs globales
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// === MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// === ROUTE DE TEST
app.get("/", (req, res) => {
  res.send("Backend is running as it should !");
});

// === ROUTES API
app.use("/api/v1/", productRoute);
app.use("/api/v1/user", authRoute);

// === PRODUCTION (serve frontend depuis le backend si nécessaire)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

// === LANCEMENT DU SERVEUR
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
