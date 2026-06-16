require("dotenv").config();
const projectRoutes = require("./routes/projectRoutes");

const express = require("express");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const serviceProviderRoutes = require("./routes/serviceProviderRoutes");

const reviewRoutes = require("./routes/reviewRoutes");

const materialRoutes = require("./routes/materialRoutes");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

const cors = require("cors");

const imageRoutes = require("./routes/imageRoutes");

connectDB();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("BuildMyHome Backend Running");
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/providers", serviceProviderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imageRoutes);
app.listen(5000, () => {
    console.log("SERVER STARTED");
});