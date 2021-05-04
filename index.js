/**
 * ARCHIVO PRINCIPAL DEL API
 */

const express = require("express");
const router = require("./app/routers/index");
const app = express();
const path = require("path");

app.use(express.json());
app.use("/",router);
app.use(express.static(path.join(__dirname, "public")));
app.use("/reports", express.static(path.join(__dirname, "reports")));

const PORT = 3001
app.listen(PORT, () => {
    console.log(`University app listening at http://localhost:${PORT}`)
})




























