import { Sequelize } from "sequelize";

const db = new Sequelize('startdev_db_fullstack','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db