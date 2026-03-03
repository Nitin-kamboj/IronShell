import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js";

export const members = sequelize.define(
    "members",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(255)
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.STRING(55),
            allowNull: false,
            defaultValue: "pending"
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_staff: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "members",
        timestamps: false
    }
);

