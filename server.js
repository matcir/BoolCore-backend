const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const productsRouter = require("./router/productsRouter");
const invoicesRouter = require("./router/invoicesRouter");

app.use(express.json());
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (
        path.endsWith(".jpg") ||
        path.endsWith(".png") ||
        path.endsWith(".jpeg")
      ) {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      }
    },
  })
);


app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

app.use(cors());

app.use("/api/products", productsRouter);
app.use("/api/invoices", invoicesRouter);
