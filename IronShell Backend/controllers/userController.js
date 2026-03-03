import { signinService, registerService, userHomeService, subscribeService, cancelSubscriptionService, userStatusService, checkinServices, checkinHistoryService } from "../services/userServices.js";
//signinController
export async function signinController(req, res, next) {
    try {
        const { email, password } = req.body;
        const token = await signinService(email, password);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        next(error);
    }
}

// registerController
export async function registerController(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // check email 
        await registerService(email, password);
        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
}

//homePage Controller
export async function userHomeController(req, res, next) {
    try {
        const userId = req.user_id;
        const data = await userHomeService(userId);
        return res.status(200).json({ message: "Profile found Successfully", userDetails: data.userDetails, equipments: data.equipments });
    } catch (error) {
        next(error);
    }
}

// subscribeController
export async function subscribeController(req, res, next) {
    try {
        const planId = req.body.plan_id;
        const userId = req.user_id;
        const planResult = await subscribeService(planId, userId);
        return res.status(200).json({ message: "Subscribed Successfully" });
    } catch (error) {
        next(error);
    }
}

// cancel subscription
export async function cancelSubscription(req, res, next) {
    try {
        const userId = req.user_id;
        await cancelSubscriptionService(userId);
        return res.status(200).json({ message: "Membership deactivated successfully" });
    } catch (error) {
        next(error);
    }
}

// get user status
export async function userStatus(req, res, next) {
    try {
        const userId = req.user_id;
        const status = await userStatusService(userId);
        return res.status(200).json({ message: "Status Found", status: status });
    } catch (error) {
        next(error);
    }
}

// user chcek in
export async function checkinController(req, res, next) {
    try {
        const userId = req.user_id;
        const now = new Date();
        const result = await checkinServices(userId);
        return res.status(200).json({ message: "Successfully checked in" });

    } catch (error) {
        next(error);
    }
}

// checkin history
export async function checkinHistoryController(req, res, next) {
    try {
        const userId = req.user_id;
        const history = await checkinHistoryService(userId);
        return res.status(200).json({ message: "History Found", history: history});
    } catch (error) {
        next(error);
    }
}

