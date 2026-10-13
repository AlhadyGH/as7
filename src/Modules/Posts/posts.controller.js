import { Router } from "express";
import * as postService from "./posts.service.js";

const router = Router();

router.post('/create', postService.createPost);
router.delete('/softDelete/:id', postService.softDelete);
router.delete('/hardDelete/:id', postService.hardDelete);
router.get("/details", postService.detailedPosts);
router.get("/posts-commentCount", postService.posts_commentCount);



export default router;