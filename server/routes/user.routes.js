import express from "express";
import {
  createUser,
  getAllUsers,
  getUserByID,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserByID);
router.route("/").post(createUser);

export default router;
