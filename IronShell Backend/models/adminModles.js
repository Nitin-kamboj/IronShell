import { pool as db } from "../database/db.js";
import { plans, members, subscription } from "./index.js";
import { Sequelize } from 'sequelize';
// insert plan

export async function insertPlan(plan_name, price, duration) {
    // return await db.query("INSERT INTO plans (plan_name, price, duration) VALUES ($1, $2, $3)", [plan_name, price, duration]);
    return await plans.create({
        plan_name,
        price,
        duration
    });
}


// edit plans
export async function editPlanName(name, planId) {
    // return await db.query("UPDATE plans SET plan_name = $1 WHERE plan_id = $2", [name, planId]);
    return await plans.update({ plan_name: name }, { where: { plan_id: planId } });
}

export async function editPlanPrice(price, planId) {
    // return await db.query("UPDATE plans SET price = $1 WHERE plan_id = $2", [price, planId]);
    return await plans.update({ price: price }, { where: { plan_id: planId } });
}

export async function editPlanDuration(duration, planId) {
    // return await db.query("UPDATE plans SET duration = $1 WHERE plan_id = $2", [duration, planId]);
    return await plans.update({ duration: duration }, { where: { plan_id: planId } });
}

// delete Plan
export async function deletePlan(plan_id) {
    // return await db.query("DELETE FROM plans WHERE plan_id = $1", [plan_id]);
    return await plans.destroy({ where: { plan_id } });
}

// delete user
export async function deleteUser(user_id) {
    // return await db.query("DELETE FROM members WHERE user_id = $1", [user_id]);
    return await members.destroy({ where: { user_id } });
}

// get revenue
// export async function getRevenue() {
//     //     return await db.query(`
//     //     SELECT SUM(plans.price) as total_revenue 
//     //     FROM subscription 
//     //     INNER JOIN plans ON subscription.plan_id = plans.plan_id
//     // `);
//     return await subscription.sum('plan.price', {
//         include: [{
//             model: plans,
//             attributes: [] 
//         }]
//     });
// }

// used ai to generate this getrevenue 
export async function getRevenue() {
    const result = await subscription.findOne({
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('plan.price')), 'total_revenue']
        ],
        include: [{
            model: plans,
            attributes: [] 
        }],
        raw: true // Returns a plain object instead of a Model instance
    });

    return result;
}