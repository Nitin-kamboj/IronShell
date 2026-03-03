import { pool as db } from "../database/db.js";
import { members, plans, subscription, attendance, equipments } from "./index.js";
import { Op } from "sequelize";

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

// get userDeatils from it's id
export async function userDetails(user_id) {
    // return await db.query("SELECT * FROM members WHERE user_id = $1", [user_id])
    return await members.findByPk(user_id);
}

// get all equipments
export async function getAllEquipments() {
    // return await db.query("SELECT * FROM equipments");
    return await equipments.findAll();
}

// update expiration_date (set to deactivated)
export async function updateExpirationDate(user_id) {
    // return await db.query("UPDATE members SET status = $1 WHERE user_id = $2", ['deactivated', user_id])
    return await members.update(
        { status: 'deactivated' },
        { where: { user_id } }
    );
}

// get duration using plan_id from plans table
export async function getDuration(plan_id) {
    // return await db.query(`SELECT duration FROM plans WHERE plan_id = $1`, [plan_id]);
    const plan = await plans.findByPk(plan_id, { attributes: ['duration'] });
    return plan;
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

    return await subscription.create({
        user_id,
        plan_id,
        start_date,
        end_date
    });
}

// get expiration_date of the users plan
export async function getExpirationDate(user_id) {
    // return await db.query("SELECT end_date FROM subscription WHERE user_id = $1", [user_id]);
    return await members.findOne({
        where: { user_id },
        attributes: ['status'],
    });
}

// get users status
export async function getUserStatus(user_id) {
    // return await db.query("SELECT status FROM members WHERE user_id = $1", [user_id]);
    return await members.findOne({
        where: {user_id},
        attributes: ['status']
    })
}

// put attendece checkin
export async function userCheckin(user_id, now) {
    // return await db.query(
    //     "INSERT INTO attendance (user_id, check_in_time) VALUES ($1, $2)",
    //     [user_id, now]
    // );
    return await attendance.create({
        user_id,
        check_in_time: now
    });
}

export async function getCheckinHistory(user_id) {
    // return await db.query("SELECT check_in_time FROM attendance WHERE user_id = $1 ORDER BY check_in_time DESC", [user_id])
 return await attendance.findAll({
    where: { user_id },
    attributes: ['check_in_time'],
    order: [['check_in_time', 'DESC']]
});
}