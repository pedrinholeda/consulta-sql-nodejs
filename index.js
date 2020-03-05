const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
require("dotenv");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
  user: "user",
  password: "password",
  server: "1.1.1.1",
  database: "DB_EXEMPLO"
};

sql
  .connect(config)
  .then(conn => console.log("conectou!"))
  .catch(err => console.log("erro! " + err));

app.get("/", (req, res) => {
  return res.json({ msg: "chegou aqui " });
});

app.get("/funcionario", (req, res) => {
  let consulta = "SELECT * FROM Funcionario Where Id = 10 ";
  sql.query(consulta, (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ result });
  });
});

app.listen(PORT, () => {
  console.log("server startado, na porta: " + PORT);
});
