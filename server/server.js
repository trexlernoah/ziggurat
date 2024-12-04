const express = require("express");
const path = require("path");
// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(":memory:");

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../client/dist/ziggurat/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/ziggurat/browser/index.html'));
});

// app.use('*', (_req, res) => {
//   res.sendFile(`${__dirname}/client/dist/ziggurat/browser/index.html`);
// });

// app.post("/api/users/register", (req, res) => {
//   console.log(req);

//   res.status(201).json({ message: "Received user data." });
// });

app.listen(port, () => {
  console.log(`Ziggurat listening on port ${port}`);
});
