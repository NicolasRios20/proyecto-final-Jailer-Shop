import { getConnection } from "../database/database";

const getid_factura = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT max(id_compra) FROM compra_proveedor");
        const id_factura = data[0]["max(id_compra)"]
        res.json(id_factura);
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send(error.message);
    }
}


const guardar_factura = async (req, res) => {
    const {id_compra, id_proveedor,valor_total,produc} = req.body;
    const arr = Object.values(produc);
    
    const fechaHoraActual = new Date().toISOString().substring(0,19);
        let dato = {
            id_compra:parseInt(id_compra),
            id_proveedor:parseInt(id_proveedor),
            valor:parseInt(valor_total),
            fecha:fechaHoraActual
        }
        try {
            const connection = await getConnection();
            await connection.query("INSERT INTO compra_proveedor SET ?", [dato] );
            const sql = `INSERT INTO remision_producto (id_compra, cantidad, id_producto, costo) VALUES ?`;
            const values = produc.map(producto => [producto.id_compra, producto.cantidad, producto.id_producto, producto.costo]);
            connection.query(sql, [values], (error, results, fields) => {
                if (error) throw error;
                console.log('Inserción exitosa');
              });
            console.log(produc);
            res.json( dato );

        } catch (error){
            console.log(error);
            res.status(400).json({ message: "error" });
            
        }
}

const getfacturas = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT compra_proveedor.id_compra, proveedor.nombre_proveedor, compra_proveedor.valor, compra_proveedor.fecha FROM compra_proveedor INNER JOIN proveedor ON proveedor.id_proveedor = compra_proveedor.id_proveedor");
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send(error.message);
    }
}

const getDatosFactura = async (req, res) =>{
    try {
        const { id_compra } = req.params;
        const connection = await getConnection();
        const encabezado = await connection.query("SELECT compra_proveedor.id_compra, compra_proveedor.fecha, proveedor.nombre_proveedor, proveedor.cedula, proveedor.ubicacion_p, compra_proveedor.valor, compra_proveedor.fecha FROM compra_proveedor INNER JOIN proveedor ON proveedor.id_proveedor = compra_proveedor.id_proveedor WHERE id_compra = ?;", [id_compra]);
        const remision = await connection.query("SELECT productos.id_producto, productos.nombre_producto, remision_producto.cantidad, remision_producto.costo FROM remision_producto INNER JOIN productos ON productos.id_producto = remision_producto.id_producto WHERE remision_producto.id_compra = ?;", [id_compra]);
        var remi = JSON.parse(JSON.stringify(remision))
        let respuesta = []
        respuesta.push(encabezado,remi)
        console.log(respuesta)
        res.json(respuesta);
        
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getid_factura,
    guardar_factura,
    getfacturas,
    getDatosFactura
};