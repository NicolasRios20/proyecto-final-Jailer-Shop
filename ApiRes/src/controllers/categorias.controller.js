import { getConnection } from "../database/database";


//listar todos los productos de la base de datos.
const getAll = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_categoria, nombre_categoria FROM categorias;");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// listar un unico producto.
const getById = async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_producto, nombre_producto, cantidad, precio_producto, imagen, descripcion FROM productos INNER JOIN categorias ON productos.id_categoria = categorias.id_categoria WHERE productos.id_categoria = ?", id_categoria);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



export const methods = {
    getAll,
    getById,
};