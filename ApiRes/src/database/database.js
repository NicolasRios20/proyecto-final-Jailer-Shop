import mysql from "promise-mysql";
import config from "./../config";

const pool = mysql.createPool({
    connectionLimit: 800,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

const getConnection = async () => {
    return new Promise((resolve,reject) =>{
        pool.getConnection( (error, connection) => {
            if (error) {
                return reject(error);
            }
            resolve(connection);
        });
    })
};

module.exports = {
    getConnection
};
