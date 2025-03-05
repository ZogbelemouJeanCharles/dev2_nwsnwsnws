import express from "express";
import routes from "./route/routes"; 

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/", routes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));

