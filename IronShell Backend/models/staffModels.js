import { pool as db } from "../database/db.js";
import { members, plans, subscription } from "./index.js";
// get all users
export async function getAllUsers() {
    // return await db.query("SELECT * FROM members");
    return await members.findAll();
}
//  get user by id
export async function getUserById(user_id) {
    // return await db.query("SELECT * FROM members WHERE user_id = $1", [user_id]);
    return await members.findByPk(user_id);
}

// get user by email (to Chcek user if already exists before registering)
export async function findByEmail(email) {
    // Get user
    // return await db.query(
    //     "SELECT user_id, password, is_admin, is_staff FROM members WHERE email = $1", [email]
    // );
    return await members.findOne({
        where: { email },
        attributes: ['user_id', 'password', 'is_admin', 'is_staff']
    });
}

// insert into members 
export async function insert(email, hash) {
    // insert email and pasword
    // return await db.query(
    //     `INSERT INTO members (password, email) VALUES ($1, $2) RETURNING user_id`,
    //     [hash, email]
    // );
    return await members.create({
        email: email,
        password: hash
    });
}

// get duration using plan_id from plans table
export async function getDuration(plan_id) {
    // return await db.query(`SELECT duration FROM plans WHERE plan_id = $1`, [plan_id]);
    return await plans.findByPk(plan_id, { attributes: ['duration'] });
}

// insert subscription
export async function insertSubscription(user_id, plan_id, start_date, end_date, status) {
    // await db.query("UPDATE members SET status = $1, expiration_date = $2 WHERE user_id = $3",
    //     [status, end_date, user_id])
    // return await db.query(
    //     "INSERT INTO subscription (user_id, plan_id, start_date, end_date) VALUES ($1, $2, $3, $4)",
    //     [user_id, plan_id, start_date, end_date]
    // );
    await members.update(
        { status: status, expiration_date: end_date },
        { where: { user_id } }
    );

    // Create subscription record
    return await subscription.create({
        user_id,
        plan_id,
        start_date,
        end_date
    });
}

// deactivaet user
export async function deactivateUser() {
    // return await db.query("SELECT user_id FROM members WHERE status = 'deactivated'");
    return await members.findAll({
        where: { status: 'deactivated' },
        attributes: ['user_id']
    });
}

// actiavted user
export async function activatedUsers() {
    // return await db.query("SELECT user_id FROM members WHERE status = 'active'");
    return await members.findAll({
        where: { status: 'active' },
        attributes: ['user_id']
    });
}

// getExpiartion Date
export async function getExpirationDate(user_id) {
    // return await db.query("SELECT expiration_date FROM members WHERE user_id = $1", [user_id]);
    return await subscription.findOne(
        {where: {user_id: user_id},  
        attributes: ['end_date'] 
    });
}

// update xpiration Date
export async function updatExpiraionDate(member_id, newExpiry) {
    // return await db.query(
    //     "UPDATE members SET expiration_date = $1, status = 'active' WHERE user_id = $2",
    //     [newExpiry, member_id]
    // );
    return await members.update(
        { status: 'active' },
        { where: { user_id: member_id } }
    );
}

// update subscribe
export async function updateSubscription(newExpiry, plan_id, user_id) {
    // return await db.query(
    //     "UPDATE subscription SET end_date = $1, status = 'active', plan_id = $2 WHERE user_id = $3",
    //     [newExpiry, plan_id, user_id]
    // );
    return await subscription.update(
        { end_date: newExpiry, plan_id: plan_id },
        { where: { user_id } }
    );
} 