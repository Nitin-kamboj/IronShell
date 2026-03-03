import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";

export const plans = sequelize.define(
    "plans", {
    plan_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plan_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        tableName: "plans",
        timestamps: false
    }
);
