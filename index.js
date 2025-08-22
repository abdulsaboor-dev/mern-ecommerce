const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./db/db");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/ProductsRoute");
const categoryRoute = require("./routes/Category");
const PORT = 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files (uploaded images)
app.use("/uploads", express.static("uploads"));
connectDB();
// app.use(
//     cors({
//       origin: ["http://localhost:4000"],
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       credentials: true,
//     })
//   );
// console.log("start");
app.use("/api", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);

app.listen(PORT, () => {
    console.log(`Server is run on port: ${PORT}`);
})