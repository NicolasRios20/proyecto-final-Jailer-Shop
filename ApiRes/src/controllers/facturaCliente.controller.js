import { getConnection } from "../database/database";
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
//const PDFDocument = require("pdfkit");
const emailer = require('../controllers/correoFactura')
  



const getid_factura = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT max(no_venta) FROM venta");
        const id_factura = data[0]["max(no_venta)"]
        res.json(id_factura);
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send(error.message);
    }
}

const guardar_factura = async (req, res) => {
    const {id_cliente, no_venta, valor_total, produc} = req.body
    const arr = Object.values(produc);

    const fechaHoraActual = new Date().toISOString();
    let numero ={
        no_venta: no_venta
    }
    let no_ventas = numero.no_venta
    console.log(no_ventas)
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
            const resultado = await datosFacturapdf(no_venta);
            console.log(resultado, 'soy el sapo')
            emailer.sendMail(resultado)
            res.download(resultado);
    } catch{
        console.log(error)
        console.log(dato);
        res.status(400).json({ message: "error" });
        
    }
}

const datosFacturapdf = async (no_venta) => {
    
    let numero = no_venta;
    const connection = await getConnection();
    const encabezado = await connection.query("SELECT venta.no_venta, venta.fecha_venta, cliente.nombre, cliente.ciudad, cliente.direccion, cliente.telefono, cliente.correo, venta.total_venta FROM venta INNER JOIN cliente ON cliente.id_cliente = venta.id_cliente WHERE no_venta = ?;", [numero]);
    const remision = await connection.query("SELECT productos.id_producto, productos.nombre_producto, productos.precio_producto, venta_producto.cantidad, venta_producto.valor_total FROM venta_producto INNER JOIN productos ON productos.id_producto = venta_producto.id_producto WHERE venta_producto.no_venta = ?;", [numero]);
    const correo = encabezado[0].correo
    var remi = JSON.parse(JSON.stringify(remision));
    const fileName = await pdf(remi, encabezado);
    let resultado = []
    resultado.push(fileName,correo)
    return resultado;
}

const pdf = async (remi, encabezado) => {
    const fs = require('fs');
    
    const fileName = `documento_${new Date().getTime()}.pdf`; // Generar nombre de archivo único
    const doc = new PDFDocument();
    doc.image('./uploads/hola.png', 50, 50, { width: 100 });
    doc.fontSize(15).text(`No:    ${encabezado[0].no_venta}`, { align: 'right'});
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(25).text(`Factura De Compra`, { align: 'center' });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(15).text(`Cliente:                   ${encabezado[0].nombre}`);
    doc.fontSize(15).text(`Cliente:                   ${encabezado[0].correo}`);
    doc.fontSize(15).text(`Ciudad:                   ${encabezado[0].ciudad}`);
    doc.fontSize(15).text(`Direccion:               ${encabezado[0].direccion}`);
    doc.fontSize(15).text(`Telefono:                 ${encabezado[0].telefono}`,);
    const remiNormal = remi.map((producto) => {
        return [          producto.id_producto,          producto.nombre_producto,          producto.precio_producto,          producto.cantidad,          producto.valor_total,        ];
    });
    const table = {
        headers : ['id Producto', 'Nombre Producto', 'Precio', 'Cantidad', 'Subtotal'],
        rows: remiNormal,
    };
    const options = {
        fontSize: 12, // Aquí puedes establecer el tamaño de letra deseado
    };
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(12).table(table, options);
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(15).text(`Total Pagar:      $${encabezado[0].total_venta}`,{ align: 'right' });
    doc.pipe(fs.createWriteStream(`./uploads/${fileName}`));
    doc.end();
    
    return fileName;
}




   

async function getfacturas(req, res) {
    try {
        const { } = req.params;
        const connection = await getConnection();
        const data = await connection.query("SELECT venta.no_venta, cliente.nombre, venta.total_venta, venta.fecha_venta FROM venta INNER JOIN cliente ON cliente.id_cliente = venta.id_cliente");
        res.json(data);
    } catch (error) {
        console.log(error)
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
        console.log(error)
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