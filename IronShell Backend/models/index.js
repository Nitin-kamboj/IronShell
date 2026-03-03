import { sequelize } from "../database/sequelize.js";
import { members } from "./members.js";
import { attendance } from "./attendance.js";
import { subscription } from "./subscription.js";
import { plans } from "./plans.js";
import { equipments } from "./equipments.js";

// Relationships
members.hasMany(attendance, { foreignKey: 'user_id' });
attendance.belongsTo(members, { foreignKey: 'user_id' });

members.hasMany(subscription, { foreignKey: 'user_id' });
subscription.belongsTo(members, { foreignKey: 'user_id' });

plans.hasMany(subscription, { foreignKey: 'plan_id' });
subscription.belongsTo(plans, { foreignKey: 'plan_id' });

export {
    sequelize,
    members,
    attendance,
    subscription,
    plans, 
    equipments
};