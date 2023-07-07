const express = require("express");
const dotenv = require("dotenv");
const voterRouter = require("./routes/voterRoute");

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());

//Mounting routes
app.use("/api/v1/voters", voterRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
