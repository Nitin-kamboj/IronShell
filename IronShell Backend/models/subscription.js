import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";

// subscription Table

export const subscription = sequelize.define(
    "subscription", {
    subscription_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'members',
            key: 'user_id'
        }
    },
    plan_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'plans',
            key: 'plan_id'
        }
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
        tableName: "subscription",
        timestamps: false
    }
);