const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 3000;

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
})();

if (isProd) {
  app.use("/", express.static(path.resolve(__dirname, "./dist")));
} else {
  app.use("/dist", express.static(path.resolve(__dirname, "./dist")));
}

if (!isProd) {
  require("./build/dev-server")(app);
}

app.get("*", (req, res) => {
  res.write(indexHTML);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is listenting on http://localhost:${PORT}`);
});
