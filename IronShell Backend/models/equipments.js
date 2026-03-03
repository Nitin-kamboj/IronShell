import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";

// equipememnts
export const equipments = sequelize.define(
    "equipments", {
    equipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipment_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    equipment_availability: {
        type: DataTypes.STRING(255),
        defaultValue: "available"
    }
},
    {
        tableName: "equipments",
        timestamps: false
    }
);