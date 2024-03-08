import express from "express";

export const router = express.Router();//สร้าง obj ของ route

router.get('/', (req, res)=>{//route ไปยังเว้นทาง
    res.send('Method Get in index.ts');//res ตอบกลับ
});