const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const contactsRoute = require("./routes/contacts");

dotenv.config();

const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully Connected to MongoDB Data Base");
  } catch (err) {
    throw err;
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Data Base disconnecting...");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Data Base connecting...");
});

server.use("/api/contacts/", contactsRoute);

server.use((err, req, res, next) => {
  const errorStatus = err.status || 409;
  const errorMessage = err.message || "Something went wrong, Please try again";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  connectDB();
  console.log(`App is now running on port ${port}`);
});

// mongodb+srv://srinivas:<password>@cluster0.pll6b.mongodb.net/test
