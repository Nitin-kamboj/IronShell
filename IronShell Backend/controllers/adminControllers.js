import { postPlanServices, editPlanService, deletePlanService, deleteUserService, revenueServices } from "../services/adminServices.js";
export async function postPlanController(req, res, next) {
    try {
        const { plan_name, price, duration } = req.body;
        await postPlanServices(plan_name, price, duration);
        return res.status(200).json({ message: "Plan added successfully" });
    } catch (error) {
        next(error)
    }
}

// edit plans
export async function editPlanController(req, res, next){
    try {
        const planId = req.params.id;
        const name = req.body.name ? req.body.name : null;
        const price = req.body.price ? req.body.price : null;
        const duration = req.body.duration ? req.body.duration : null;
        
        const result = await editPlanService(planId, name, price, duration);
        return res.status(200).json({ message: "Plan edited successfully" });
    } catch (error) {
        next(error)
    }
}

// delete plan
export async function deletePlanController(req, res, next) {
    try {
        const plan_id = req.params.plan_id;
        await deletePlanService(plan_id);
        return res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
        next(error)
    }
}

// delete user
export async function deleteUserController(req, res, next) {
    try {
        const user_id = req.params.id;
        console.log(user_id);
        await deleteUserService(user_id);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error)
    }
}

// get revenue
export async function revenueController(req, res, next) {
    try {
        const total = await revenueServices();

        // const total = result.rows[0].total_revenue;
        return res.status(200).json({
            success: true,
            total: total || 0
        });
    } catch (error) {
        next(error)
    }
}