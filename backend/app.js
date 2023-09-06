import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import web from "./routes/web.js";
const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = "mongodb://127.0.0.1:27017";
//connect Database
connectDB(DATABASE_URL);

app.use(express.urlencoded({ extended: true }));

//JSON
app.use(express.json());

app.use(cors());

//loadRoutes
app.use("/", web);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
