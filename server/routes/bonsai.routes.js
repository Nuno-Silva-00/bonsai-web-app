import express from "express";
import {
  getAllBonsais,
  getBonsaiDetails,
  createBonsai,
  updateBonsai,
  deleteBonsai,
  getBonsaiByEmail,
  likeBonsai,
  getBonsaiBySearch,
} from "../controllers/bonsai.controller.js";

const router = express.Router();

router.route("/").post(createBonsai);
router.route("/:id").patch(updateBonsai);
router.route("/:id").delete(deleteBonsai);
router.route("/").get(getAllBonsais);
router.route("/:id").get(getBonsaiDetails);
router.route("/email/:email/:loggedInUser").get(getBonsaiByEmail);
router.route("/:id/likeBonsai").patch(likeBonsai);
router.route("/search/query").get(getBonsaiBySearch);

export default router;
