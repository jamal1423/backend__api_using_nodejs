import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import crypto from "crypto";

const {DataTypes} = Sequelize

const User = db.define('users',{
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        // set(value){
        //     this.setDataValue('password', crypto.createHash('md5').update(value).digest('hex'));
        // }
    },
    gender: {
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync();
})();