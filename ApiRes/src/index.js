import app from "./app";
import { getConnection } from "./database/database";

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port http://localhost:${app.get("port")}`);
};

const  cleanup = async() =>{
    const connection = await getConnection();
    connection.end()

}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

main();
