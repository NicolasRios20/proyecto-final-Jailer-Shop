import { getConnection } from "../database/database";

const getid_factura = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT max(no_venta) FROM venta");
        const id_factura = data[0]["max(no_venta)"]
        res.json(id_factura);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const guardar_factura = async (req, res) => {
    const {id_cliente, valor_total,produc} = req.body
    const arr = Object.values(produc);

    const fechaHoraActual = new Date().toISOString();
    let dato = {
        fecha_venta:fechaHoraActual,
        total_venta:valor_total,
        id_cliente:id_cliente, 
    }
    


    try {
        const connection = await getConnection();
        await connection.query("INSERT INTO venta SET ?", dato);
        const sql = 'INSERT INTO venta_producto (cantidad, valor_total, no_venta, id_producto) VALUES ?';
        const values = produc.map(producto => [producto.cantidad, producto.valor_total, producto.no_venta, producto.id_producto]);
            connection.query(sql, [values], (error, results, fields) => {
                if (error) throw error;
                console.log('Inserción exitosa');
            });
        console.log(produc);
        res.json( dato );

    } catch{
        console.log(dato);
        res.status(400).json({ message: "error" });
        
    }
}

const getfacturas = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT venta.no_venta, cliente.nombre, venta.total_venta, venta.fecha_venta FROM venta INNER JOIN cliente ON cliente.id_cliente = venta.id_cliente");
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getDatosFactura = async (req, res) =>{
    try {
        const { no_venta } = req.params;
        const connection = await getConnection();
        const encabezado = await connection.query("SELECT venta.no_venta, venta.fecha_venta, cliente.nombre, cliente.ciudad, cliente.direccion, cliente.telefono, venta.total_venta FROM venta INNER JOIN cliente ON cliente.id_cliente = venta.id_cliente WHERE no_venta = ?;", [no_venta]);
        const remision = await connection.query("SELECT productos.id_producto, productos.nombre_producto, productos.precio_producto, venta_producto.cantidad, venta_producto.valor_total FROM venta_producto INNER JOIN productos ON productos.id_producto = venta_producto.id_producto WHERE venta_producto.no_venta = ?;", [no_venta]);
        var remi = JSON.parse(JSON.stringify(remision))
        let respuesta = []
        respuesta.push(encabezado,remi)
        console.log(respuesta)
        res.json(respuesta);
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
    guardar_factura,
    getid_factura,
    getfacturas,
    getDatosFactura
};