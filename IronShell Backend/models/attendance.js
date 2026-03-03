import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

// attendence table

export const attendance = sequelize.define(
    "attendance", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "members",
            key: "user_id"
        }
    },
    check_in_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
    {
        tableName: "attendance",
        timestamps: false
    }
);

