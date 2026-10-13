import {Router} from "express";
import * as commentService from "./comment.service.js";

const router = Router();

router.post("/createBulk", commentService.createBulk);
router.patch("/updateContent/:id", commentService.updateContent);
router.post("/findOrCreate", commentService.findOrCreate);
router.get("/search", commentService.search);
router.get("/newest/:postId", commentService.newest);
router.get("/getDetailed/:id", commentService.getDetailed);



export default router;