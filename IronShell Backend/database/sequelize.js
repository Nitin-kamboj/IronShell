import "dotenv/config";
import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_TYPE || "mysql",
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log('🚀 Database connected successfully!'))
    .catch(err => console.error('❌ Connection error:', err));