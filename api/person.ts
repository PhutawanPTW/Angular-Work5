import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { MovieJSON, PersonJSON } from "../model/model";
export const router = express.Router();

router.get("/", (req, res) => {
  conn.query("SELECT * FROM person", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
    let person: PersonJSON = req.body;
  
    let sql = "INSERT INTO person (name, biography, image) VALUES (?, ?, ?)";
  
    let defaultImage = 'https://example.com/default-image.jpg';
  
    sql = mysql.format(sql, [
      person.name,
      person.biography,
      person.image || defaultImage
    ]);
  
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

router.delete("/:id", (req, res) => {
  let personId = req.params.id;

  let deleteC = "DELETE FROM `creator` WHERE `person_id` = ?";
  deleteC = mysql.format(deleteC, [personId]);

  conn.query(deleteC, (err, creatorResult) => {
    if (err) throw err;
    
    let deleteS = "DELETE FROM `stars` WHERE `person_id` = ?";
    deleteS = mysql.format(deleteS, [personId]);

    conn.query(deleteS, (err, starsResult) => {
      if (err) throw err;

      let deleteM = "DELETE FROM `person` WHERE `person_id` = ?";
      deleteM = mysql.format(deleteM, [personId]);

      conn.query(deleteM, (err, result) => {
        if (err) throw err;
        res.status(200).json({ affected_row: result.affectedRows });
      });
    });
  });
});

router.post("/all", (req, res) => {
  let persons: PersonJSON[] = req.body;

  let sql = "INSERT INTO person (name, biography, image) VALUES";
  let values: any[] = [];

  for (const person of persons) {

      sql += "(?, ?, ?),";
      
      values.push(
        person.name,
        person.biography,
        person.image
      );
  }

  sql = sql.slice(0, -1);

  sql = mysql.format(sql, values);

  conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});


