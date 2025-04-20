import express from "express";
import { signup,
    login,
    userData,
    updateUser,
    deleteUser
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup); // send some data
router.post("/login", login);
router.put("/:id/update", updateUser);
router.delete("/:id/delete", deleteUser);
router.get("/", userData); // only recieve data from server or database.

export default router;