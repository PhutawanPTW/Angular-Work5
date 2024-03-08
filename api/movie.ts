import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { MovieJSON } from "../model/model";
export const router = express.Router();

router.get("/", (req, res) => {
  conn.query("SELECT * FROM movie", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  let movie: MovieJSON = req.body;

  let sql =
    "INSERT INTO `movie` (`title`, `year`, `plot`, `poster`, `genre`) VALUES (?, ?, ?, ?, ?)";

  let poster = "https://example.com/default-poster.jpg";

  sql = mysql.format(sql, [
    movie.title,
    movie.year,
    movie.plot,
    movie.poster || poster,
    movie.genre,
  ]);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});

router.delete("/:id", (req, res) => {
  let movieId = req.params.id;

  let deleteC = "DELETE FROM `creator` WHERE `movie_id` = ?";
  deleteC = mysql.format(deleteC, [movieId]);

  conn.query(deleteC, (err, creatorResult) => {
    if (err) throw err;
    let deleteS = "DELETE FROM `stars` WHERE `movie_id` = ?";
    deleteS = mysql.format(deleteS, [movieId]);

    conn.query(deleteS, (err, starsResult) => {
      if (err) throw err;
      let deleteM = "DELETE FROM `movie` WHERE `movie_id` = ?";
      deleteM = mysql.format(deleteM, [movieId]);

      conn.query(deleteM, (err, result) => {
        if (err) throw err;
        res.status(200).json({ affected_row: result.affectedRows });
      });
    });
  });
});

router.post("/all", (req, res) => {
  let movies: MovieJSON[] = req.body;

  let sql =
    "INSERT INTO `movie` (`title`, `year`, `plot`, `poster`, `genre`) VALUES ";
  let values: any[] = [];

  for (const movie of movies) {
    const moviePoster = movie.poster;

    sql += "(?, ?, ?, ?, ?),";

    values.push(movie.title, movie.year, movie.plot, moviePoster, movie.genre);
  }

  sql = sql.slice(0, -1);

  sql = mysql.format(sql, values);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});
