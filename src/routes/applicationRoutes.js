import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../middleware/multerConfig.js"
import { getMyApplication, jobApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.post(

    "/apply/:jobId",
    authMiddleware,
    upload.single("resume"),
    jobApplication
);

router.get(
    "/my-application",authMiddleware,getMyApplication
);

export default router;