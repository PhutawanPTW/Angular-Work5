import express from "express";
import { router as movie } from "./api/movie";
import { router as person } from "./api/person";
import { router as stars } from "./api/star";
import { router as creator } from "./api/creator";
import { router as search } from "./api/search";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// app.use("/" , (rea , res)=>{
//    res.send("Hello world");
// });

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/person", person);
app.use("/movie", movie);
app.use("/stars", stars);
app.use("/creator", creator);
app.use("/search", search);
