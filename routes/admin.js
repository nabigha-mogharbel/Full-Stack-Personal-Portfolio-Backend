import express from "express";
const router = express.Router();
import adminController from "../controllers/adminController.js";
import logOut from "../midleware/logOut.js";
import auth from "../midleware/token-auth.js";

router.post("/login", adminController.login);
router.post("/create", adminController.createAdmin);
router.get("/",  adminController.getAdmin);
router.put("/update/:id",  adminController.updateAdmin);
router.get("/logout", logOut);
export default router;