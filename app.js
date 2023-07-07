const express = require("express");
const voterRouter = require("./routes/voterRoute");

const app = express();

//Mounting routes
app.use("/api/v1/voters", voterRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
