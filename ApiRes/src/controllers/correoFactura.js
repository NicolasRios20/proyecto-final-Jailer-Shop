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

const sendMail = async(resultado) => {
    let fileName = resultado[0]
    let correo = resultado[1]
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Jailer Shop" <nicolasrioscastillo8@gmail.com>',
        to: `${correo}`,
        subject: `factura`,
        attachments: [
            {
              filename: `${fileName}`,
              path: `./uploads/${fileName}` // Path to factura file
            }
          ]

    })

    console.log("Message sent: %s", info.messageId)
}




exports.sendMail = (resultado) => sendMail(resultado);