const express = require("express");
const dotenv = require("dotenv");
const voterRouter = require("./routes/voterRoute");
const candidateRouter = require("./routes/candidateRoute");
const connectDB = require("./config/connectDB");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(express.json());

//Mounting routes
app.use("/api/v1/voters", voterRouter);
app.use("/api/v1/candidates", candidateRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
