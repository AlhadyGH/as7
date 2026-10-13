import { Router } from "express";
import * as userService from "./user.service.js";

const router = Router();

router.post("/signup", userService.createUser);
router.put("/createOrUpdate/:id", userService.createOrUpdate);
router.get("/getByEmail", userService.getByEmail);
router.get("/getById/:id", userService.getById);

export default router;