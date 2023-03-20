import { getConnection } from "../database/database";

//crea proveedor
const add = async (req, res) => {
    
    try {
        const { nombre_proveedor, ubicacion_p, cedula, cuenta_bancaria} = req.body;

        if(!nombre_proveedor || !ubicacion_p || !cedula) {
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


//listar un proveedor por id
const getProveedor = async (req, res) => {

    try {
        const {id_proveedor} = req.params;
        const connection = await getConnection();
        const data = await connection.query("SELECT * FROM proveedor WHERE id_proveedor = ?",id_proveedor);
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}


// actualizar datos de proveedor
const actualizardatos = async (req, res) => {
    
    try {
        const { id_proveedor } = req.params;
        const { cedula, nombre_proveedor, ubicacion_p, cuenta_bancaria} = req.body;
         
        if ( cedula === String || nombre_proveedor === undefined || cuenta_bancaria === undefined || ubicacion_p === undefined) {
            res.status(400).json({ message: "por favor ingrese los campos correspondientes." });
        }
        const connection = await getConnection();
        const datos = { cedula, nombre_proveedor, cuenta_bancaria, ubicacion_p };
        const result = await connection.query("UPDATE proveedor SET ? WHERE id_proveedor = ?", [datos, id_proveedor]);
        res.json(result);

    } catch (error) {
        res.send(error.message);
    }
    
};


export const methods = {
    add,
    getProveedores,
    getProveedor,
    actualizardatos,
};