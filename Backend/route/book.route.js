import express from "express";
import { getBook,createBook, updateBook,deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/add", createBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;