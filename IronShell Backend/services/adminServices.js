import { insertPlan, editPlanName, editPlanPrice, editPlanDuration, deletePlan, deleteUser, getRevenue } from "../models/adminModles.js"
export async function postPlanServices(plan_name, price, duration) {
    return await insertPlan(plan_name, price, duration);
}

export async function editPlanService(planId, name, price, duration) {
    if (!name && !price && !duration) {
        const error = new Error("No data provided to update. Please provide at least plan_name, price or duration");
        error.status = 400;
        throw error;
    }
    if (name) {
        await editPlanName(name, planId);
    }
    if (price) {
        await editPlanPrice(price, planId);
    }
    if (duration) {
        await editPlanDuration(duration, planId);
    }

    return;
}

export async function deletePlanService(plan_id) {
    return await deletePlan(plan_id);
}

export async function deleteUserService(user_id) {
    return await deleteUser(user_id);
}

export async function revenueServices() {
    return await getRevenue();
}