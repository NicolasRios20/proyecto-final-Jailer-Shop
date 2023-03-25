import { getConnection } from "../database/database";

// listar un unico producto.
const getById = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM productos WHERE id_producto = ?", id_producto);
        const datos = result.shift(0);
        res.json(datos);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


//listar todos los productos de la base de datos.
const getAll = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM productos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//agregar productos a la base de datos.
const add = async (req, res) => {
    
    try {
        const { nombre_producto, cantidad, precio_producto, id_categoria, descripcion} = req.body;
    
        if(nombre_producto === undefined || cantidad === undefined || precio_producto === undefined || id_categoria === undefined || id_categoria === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }else{
            const imagen_producto = req.files.file;
            const nombre_imagen = new Date().getTime()+'.png';
            let datos ={
                nombre_producto: nombre_producto,
                cantidad:cantidad,
                precio_producto: precio_producto,
                id_categoria: id_categoria,
                imagen: `http://localhost:5000/${nombre_imagen}`,
                descripcion: descripcion,
            };
            const connection = await getConnection();
            const record = await connection.query("INSERT INTO productos SET ?", [datos] );
            if(record.protocol41 == true){
                imagen_producto.mv('./uploads/'+nombre_imagen);
                const connection = await getConnection();
                const result = await connection.query("SELECT * FROM productos WHERE imagen = ?",datos.imagen);
                const dato = result.shift(0);
                res.json(dato);
            }
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//modificar un producto de la base de datos
const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido } = req.body;

        if (id === undefined || nombre === undefined || apellido === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const datos = { nombre, apellido };
        const connection = await getConnection();
        const result = await connection.query("UPDATE productos SET ? WHERE id = ?", datos);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// eliminar producto de la base de datos
const deleteById = async (req, res) => {
    try {
        const { nombre_producto } = req.params;
        const connection = await getConnection();
        console.log(nombre_producto)
        const result = await connection.query("DELETE FROM productos WHERE nombre_producto = ?", nombre_producto);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getById,
    getAll,
    add,
    updateById,
    deleteById
};
