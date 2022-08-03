import { Sequelize } from "sequelize";
 
const db = new Sequelize('transaction_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;