import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const Product = db.define('transaction_table',{
    transactionDate:{
        type: DataTypes.DATE
    },
    Description:{
        type: DataTypes.STRING
    },
    Credit:{
        type: DataTypes.DOUBLE
    },
    Debit:{
        type: DataTypes.DOUBLE
    },
    RunningBalance:{
        type: DataTypes.DOUBLE
    },
},{
    freezeTableName: true
});
 
export default Product;