require("dotenv").config();
require("./config/config");
require("./config/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const app = express();

const users = require("./routes/user.router");
const usuario = require("./routes/Usuario.router");
const ubs = require("./routes/Ubs.router");
const procedimento = require("./routes/Procedimento.router");
const atividade = require("./routes/Atividade.router");
const detalhe = require("./routes/Detalhe.router");
const hora = require("./routes/Horas.router");
const data = require("./routes/Data.router");
const dataServidor = require("./routes/DataServidor.router");

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use("/users", users);
app.use("/usuarios", usuario);
app.use("/ubs", ubs);
app.use("/procedimentos", procedimento);
app.use("/atividades", atividade);
app.use("/detalhes", detalhe);
app.use("/horas", hora);
app.use("/datas", data);
app.use("/data-servidor", dataServidor);

// start server
app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta : ${process.env.PORT}`)
);
