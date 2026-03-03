import { Router } from "express";
import { authenticateToken, isAdmin, isStaff } from "../middlewares/auth.js";
import { signinController, registerController, userHomeController, subscribeController, cancelSubscription, userStatus, checkinController, checkinHistoryController } from "../controllers/userController.js";
import { getAllUsersControllers, getUserByIdController, registerUserController, getDeactivatedUserController, activateUserController, renewMemberController } from "../controllers/staffControllers.js";
import { postPlanController, editPlanController, deletePlanController, deleteUserController, revenueController } from "../controllers/adminControllers.js";

const app = Router();

app.post("/signin", signinController);
app.post("/register", registerController);
app.get("/user/home", authenticateToken, userHomeController);
app.post("/subscribe", authenticateToken, subscribeController);
app.post("/cancelSubscription", authenticateToken, cancelSubscription);
app.get("/status", authenticateToken, userStatus);
app.post("/checkin", authenticateToken, checkinController);
app.get("/history", authenticateToken, checkinHistoryController);

// staff routers
app.get("/getAllUsers", authenticateToken, isStaff, getAllUsersControllers);
app.get("/getUser/:id", authenticateToken, isStaff, getUserByIdController);
app.post("/staff/register/user", authenticateToken, isStaff, registerUserController);
app.get("/getDeactivatedUser", authenticateToken, isStaff, getDeactivatedUserController);
app.get("/getActivatedUser", authenticateToken, isStaff, activateUserController);
app.post("/members/:id/renew", authenticateToken, isStaff, renewMemberController);

// admin routes
app.post("/plans", authenticateToken, isAdmin, postPlanController);
app.patch("/plan/:id", authenticateToken, isAdmin, editPlanController);
app.delete("/deletePlan/:plan_id", authenticateToken, isAdmin, deletePlanController);    // body must have plan id
app.delete("/deleteUser/:id", authenticateToken, isAdmin, deleteUserController);
app.get("/revenue", authenticateToken, isAdmin, revenueController);
export default app;
