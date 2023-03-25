import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createPool({
    connectionLimit: 800,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

  

const getConnection = async () => {
    return connection

};

module.exports = {
    getConnection
};
