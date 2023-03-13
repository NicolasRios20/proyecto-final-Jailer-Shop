import { getConnection } from "../database/database";

//creacion de proveedor
const add = async (req, res) => {
    
    try {
        const { nombre_proveedor, ubicacion_p, cedula, cuenta_bancaria} = req.body;

        if(!nombre_proveedor || !ubicacion_p || !cedula || !cuenta_bancaria ) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }else{

            const dato = {cedula, nombre_proveedor, ubicacion_p, cuenta_bancaria};
            const connection = await getConnection();
            await connection.query(`INSERT INTO proveedor SET ?`, dato);
            res.json( dato );

        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//listar proveedores
const getProveedores = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data = await connection.query("SELECT * FROM proveedor");
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

//eliminar proveedor por cedula
const eliminarProveedor = async (req, res) => {

    try {
        const { cedula } = req.params;
        console.log(cedula)
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM proveedor WHERE cedula = ?", cedula);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const getProveedor = async (req, res) => {
    try {
        const {cedula} = req.params;
        const connection = await getConnection();
        const data = await connection.query("SELECT * FROM proveedor WHERE cedula = ?",cedula);
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    add,
    getProveedores,
    getProveedor,
    eliminarProveedor,
};