import { getAllUsersService, getUserByIdService, registerUserService, renewMemberService, getDeactivatedUserService, getActivatedUserService } from "../services/staffServices.js";


// get All users 
export async function getAllUsersControllers(req, res, next) {
    try {
        const userId = req.user_id;
        const users = await getAllUsersService();
        return res.status(200).json({ message: "Users Found", users: users });
    } catch (error) {
        next(error);
    }
}

// get user by Id
export async function getUserByIdController(req, res, next) {
    try {
        const userId = req.params.id;
        const users = await getUserByIdService(userId);
        return res.status(200).json({ message: "Users Found", users: users });
    } catch (error) {
        next(error);
    }
}

// register user
export async function registerUserController(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const planId = req.body.plan_id;
        // 1️ Validate input
        const user = await registerUserService(email, password, planId);
        return res.status(200).json({ message: "Subscribed Successfully" });
    } catch (error) {
        next(error);
    }
}

// get deactivated user
export async function getDeactivatedUserController(req, res, next) {
    try {
        const userId = req.user_id;
        const users = await getDeactivatedUserService();
        return res.status(200).json({ message: "Users Found", users: users });
    } catch (error) {
        next(error);
    }
}

// get actiavted users
export async function activateUserController(req, res, next) {
    try {
        const userId = req.user_id;
        const users = await getActivatedUserService();
        return res.status(200).json({ message: "Users Found", users: users });
    } catch (error) {
        next(error);
    }
}

// renew members plan
export async function renewMemberController(req, res, next) {
    try {
        const { plan_id } = req.body;
        const member_id = req.params.id;
        await renewMemberService(member_id, plan_id);
        res.status(200).json({ message: "Membership renewed" });
    } catch (error) {
        next(error);
    }
}