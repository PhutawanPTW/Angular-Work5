import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { CreatorJSON } from "../model/model";
export const router = express.Router();

router.get("/", (req, res) => {
  conn.query("SELECT * FROM creator", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/id", async (req, res) => {
  let person: CreatorJSON = req.body;

  let pid_creator: number = person.person_id;
  let mid_creator: number = person.movie_id;

  let sql = "INSERT INTO `creator`(`movie_id`, `person_id`) VALUES (?,?)";
  sql = mysql.format(sql, [mid_creator, pid_creator]);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});


router.delete("/:id", (req, res) => {
  let id = +req.params.id;
  conn.query("DELETE FROM creator WHERE creatorID = ?", [id], (err, result) => {
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
  
