import { findByEmail, insert, getAllEquipments, userDetails, updateExpirationDate, getDuration, insertSubscription, getExpirationDate, getUserStatus, userCheckin, getCheckinHistory } from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function signinService(email, password) {
    // Get user
    // const result = await db.query(
    //     "SELECT user_id, password, is_admin, is_staff FROM members WHERE email = $1", [email]
    // );
    // Validate input
    if (!email || !password) {
        const error = new Error("Email and password required");
        error.status = 400;
        throw error;
    }
    const user = await findByEmail(email);
    // const user = result.rows[0];
    if (!user) {
        const error = new Error("Email is incorrect");
        error.status = 400;
        throw error;
    }
    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const error = new Error("Password is incorrect");
        error.status = 400;
        throw error;
    }
    // Create token
    const token = jwt.sign(
        {
            user_id: user.user_id,
            is_admin: user.is_admin,
            is_staff: user.is_staff
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return token;
}

// registerService (Logic)
export async function registerService(email, password) {
    // 1Validate input
    if (!email || !password) {
        const error = new Error("Email and password required");
        error.status = 400;
        throw error;
    }
    // const checkEmail = await db.query(`SELECT * FROM members WHERE email = $1`, [email]);
    const checkEmail = await findByEmail(email);
    if (checkEmail) {
        const error = new Error("USER_EXISTS");
        error.status = 400;
        throw error;
    }

    // compare password
    const hash = await bcrypt.hash(password, 10);

    // insert input
    await insert(email, hash);
    return;
}

// user homePage
export async function userHomeService(user_id) {
    const user = await userDetails(user_id);
    const equipments = await getAllEquipments();
    if (!user) {
        const error = new Error("User Not Found. Token is expired or invalid");
        error.status = 404;
        throw error;
    }
    const now = new Date();
    // const expirationDate = new Date(user.expiration_date);
    if (user.expiration_date && user.expiration_date < now) {
        await updateExpirationDate(user_id);
        user.status = "Expired";
    }
    return { user, equipments };
}

// subscribe services
export async function subscribeService(plan_id, user_id) {
    const planResult = await getDuration(plan_id);
    if (!planResult) {
        const error = new Error("PLAN_NOT_FOUND");
        error.status = 404;
        throw error;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + planResult.duration);

    await insertSubscription(user_id, plan_id, startDate, endDate, "active");
}

// cancel subscription
export async function cancelSubscriptionService(user_id) {
    const result = await updateExpirationDate(user_id);
    if (!result || result[0] === 0) {
        const error = new Error("User Not Found. Token is expired or invalid");
        error.status = 404;
        throw error;
    }
    return;
}

// user status
export async function userStatusService(user_id) {
    const status = await getExpirationDate(user_id);
    if (!status) {
        const error = new Error("Status not Found. User token is invalid");
        error.status = 404;
        throw error;
    }
    return status;
}

// check in services
export async function checkinServices(user_id) {
    const user = await getExpirationDate(user_id);

    if (!user) {
        const error = new Error("User Not Found. Token is expired or invalid");
        error.status = 404;
        throw error;
    }

    const status = await getUserStatus(user_id);
    if (status.status === "deactivated") {
        const error = new Error("PLAN_DEACTIVATED");
        error.status = 404;
        throw error;
    }
    const now = new Date();
    await userCheckin(user_id, now);
    return;
}

// checkin history
export async function checkinHistoryService(user_id) {
    return await getCheckinHistory(user_id);
}