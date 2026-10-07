const express = require("express");

const app = express();
app.get("/", (_req, res) => res.send("Hello from a Coder workspace built from devcontainer.json"));
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
