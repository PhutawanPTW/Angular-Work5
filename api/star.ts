import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { StarJSON } from "../model/model";
export const router = express.Router();

router.get("/", (req, res) => {
  conn.query("SELECT * FROM stars", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/id", async (req, res) => {
  let person: StarJSON = req.body;

  let pid_star: number = person.person_id;
  let mid_star: number = person.movie_id;

  let sql = "INSERT INTO `stars`(`movie_id`, `person_id`) VALUES (?,?)";
  sql = mysql.format(sql, [mid_star, pid_star]);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});

router.delete("/:id", (req, res) => {
  let id = +req.params.id;
  conn.query("DELETE FROM stars WHERE starID = ?", [id], (err, result) => {
      if (err) throw err;
      res.status(200).json
          ({ affected_row: result.affectedRows });
  })
})

// router.post("/delete", async (req, res) => {
//     let person: StarJSON = req.body;
//   ขก.ทำต่อละ

//     conn.query(sql, (err, result) => {
//       if (err) throw err;
//       res
//         .status(200) // ใช้สถานะ 200 เนื่องจากการลบข้อมูลเสร็จสมบูรณ์
//         .json({ affected_row: result.affectedRows });
//     });
//   });

// router.post("/name", async (req, res) => {
//   let person: StarJSON = req.body;

//   let pid_star: number;
//   let sql = mysql.format("select person_id from person where name = ?", [
//     person.person_id,
//   ]);
//   let result = await queryAsync(sql);
//   let jsonStr = JSON.stringify(result);
//   let jsonObj = JSON.parse(jsonStr);
//   let rowData = jsonObj;
//   pid_star = rowData[0].person_id;

//   let mid_star: number;
//   sql = mysql.format("select movie_id from movie where title = ?", [
//     person.movie_id,
//   ]);
//   result = await queryAsync(sql);
//   jsonStr = JSON.stringify(result);
//   jsonObj = JSON.parse(jsonStr);
//   rowData = jsonObj;
//   mid_star = rowData[0].movie_id;

//   sql = "INSERT INTO `stars`(`movie_id`, `person_id`) VALUES (?,?)";
//   sql = mysql.format(sql, [mid_star, pid_star]);
//   conn.query(sql, (err, result) => {
//     if (err) throw err;
//     res
//       .status(201)
//       .json({ affected_row: result.affectedRows, last_idx: result.insertId });
//   });
// });
