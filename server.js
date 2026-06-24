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
app.use(
  cors({
    origin: [
      "https://buildmyhome-frontend.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());


app.get("/", (req, res) => {
    res.send("NEW BACKEND DEPLOYED 2026");
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/providers", serviceProviderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imageRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});