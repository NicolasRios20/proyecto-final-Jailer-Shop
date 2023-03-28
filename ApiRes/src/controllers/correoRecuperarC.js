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


const sendMail = async(datos) => {
    const resetUrl = datos.token
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Jailer Shop" <nicolasrioscastillo8@gmail.com>',
        to: `${datos.correo}`,
        subject: `ingresa al link para restablecer la contrasena`,
        text: resetUrl 
    })

    console.log("Message sent: %s", info.messageId)
}




exports.sendMail = (datos) => sendMail(datos);