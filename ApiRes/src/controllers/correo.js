const nodemeiler = require('nodemailer')

const createTrans = () => {
    const transport = nodemeiler.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "nicolasrioscastillo8@gmail.com",
            pass: "gxenjtxegvuirpru"
        }
    })

    return transport
};

const sendMail = async(dato) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Jailer Shop" <nicolasrioscastillo8@gmail.com>',
        to: `${dato.correo}`,
        subject: `Bienvenido ha Jailer Shop ${dato.nombre}`,

    })

    console.log("Message sent: %s", info.messageId)
}

/*const sendFactura = async (correo) => {
  const transporter = createTrans();
  const info = await transporter.sendFactura({
    from: '"Jailer Shop" <nicolasrioscastillo8@gmail.com>',
    to: `${correo}`,
    subject: `factura`,
    // Agregar cualquier otra opción necesaria
  });
};*/



exports.sendMail = (dato) => sendMail(dato);
//exports.sendFactura = (correo) => sendFactura(correo)