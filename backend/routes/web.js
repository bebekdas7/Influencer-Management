import express from "express";
import siteController from "../controllers/siteController.js";
const router = express.Router();

router.get("/get-all-influencers", siteController.getAllInfluencers);
router.get("/get-influencer-byid/:id", siteController.getInfluencerById);
router.post("/create-influencer", siteController.createInfulencer);
router.delete("/delete-influencer/:id", siteController.deleteInfluencer);
router.put("/update-influencer/:id", siteController.updateInfluencer);
router.get("/sort-name", siteController.sortName);
router.get("/sort-follower", siteController.sortFollowers);

export default router;
