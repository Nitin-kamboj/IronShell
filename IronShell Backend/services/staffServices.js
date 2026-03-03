import bcrypt from "bcrypt";
import { getAllUsers, findByEmail, insert, getDuration, insertSubscription, deactivateUser, activatedUsers, getExpirationDate, updatExpiraionDate, getUserById, updateSubscription, } from "../models/staffModels.js";

// get all users
export async function getAllUsersService() {
    return await getAllUsers();
}

// get user by id
export async function getUserByIdService(user_id) {
    const users = await getUserById(user_id);
    if (!users) {
        const error = new Error("User Not Found. Token is expired or invalid");
        error.status = 404;
        throw error;
    }
    return users;
}

// register user Service
export async function registerUserService(email, password, planId) {
    if (!email || !password || !planId) {
        const error = new Error("Email, password, plan_id are required");
        error.status = 400;
        throw error;
    }
    // check email 
    const checkEmail = await findByEmail(email);
    if (checkEmail) {
        const error = new Error("Email already found! Try logging in");
        error.status = 400;
        throw error;
    }

    // bycrypt password and 10 is the number of salt rounds
    const hash = await bcrypt.hash(password, 10);

    // insert input
    const userInsert = await insert(email, hash);

    // Proper declaration using 'const'
    const userId = userInsert.user_id;
    const planResult = await getDuration(planId);

    if (!planResult) {
        const error = new Error("Plan not found");
        error.status = 400;
        throw error;
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + planResult.duration);

    await insertSubscription(userId, planId, startDate, endDate, "active");
    return;
}

// deactivate
export async function getDeactivatedUserService(user_id) {
    return await deactivateUser(user_id);
}

// actiavted users
export async function getActivatedUserService(user_id) {
    return await activatedUsers(user_id);
}

// renew plan
export async function renewMemberService(user_id, plan_id) {
    const planResult = await getDuration(plan_id);
    if (!planResult) {
        const error = new Error("Plan not found");
        error.status = 404;
        throw error;
    }
    const durationDays = planResult.duration;

    const memberResult = await getExpirationDate(user_id);
    if (!memberResult) {
        const error = new Error("Subscription record not found");
        error.status = 404;
        throw error;
    }
    // const currentExpiry = new Date(memberResult.expiration_date);
    const today = new Date();
    const currentExpiry = memberResult.expiration_date ? new Date(memberResult.expiration_date) : today;
    let startDate = (currentExpiry > today) ? currentExpiry : today;

    const newExpiry = new Date(startDate);
    newExpiry.setDate(newExpiry.getDate() + durationDays);
    await updatExpiraionDate(user_id, newExpiry);
    await updateSubscription(newExpiry, plan_id, user_id);
    return;
}