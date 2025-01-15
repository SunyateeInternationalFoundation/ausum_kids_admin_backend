require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const parentRoutes = require("./routes/parents");
const childRoutes = require("./routes/children");
const serviceRoutes = require("./routes/services")
const providerRoutes = require("./routes/provider")

app.use(cors());
app.use(express.json());

app.use("/", adminRoutes);
app.use("/manage-parents", parentRoutes);
app.use("/manage-child", childRoutes);
app.use("/manage-services" , serviceRoutes)
app.use("/manage-providers", providerRoutes)


mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5000");
});
