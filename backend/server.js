require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

connectDB();

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());


app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ file: req.file });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
