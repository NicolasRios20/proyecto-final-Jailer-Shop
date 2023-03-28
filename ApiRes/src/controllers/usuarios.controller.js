import { getConnection } from "../database/database";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const emailer = require('../controllers/correo')
const emailers = require('../controllers/correoRecuperarC')
const crypto = require('crypto');

function generarCodigo(codigoAnterior) {
    // Generar 3 bytes aleatorios
    const buffer = crypto.randomBytes(3);
  
    // Codificar los bytes en base64 y tomar los primeros 4 caracteres
    const codigo = buffer.toString('base64').slice(0, 4);
  
    return codigo;
  }

//  consultar todos los usuarios
const getAll = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT * FROM cliente WHERE id_cliente = ? ", id_cliente);
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


// registro de usuarios 
const add = async (req, res) => {
    const {nombre, correo, contrasena} = req.body;
    if (!nombre || !correo || !contrasena ) {
        res.status(400).json({ message: "Ingrese los campos requeridos" });
    }
    else{
        let contrai = await bcrypt.hash(contrasena,8);
        let rol = 0
           let dato = {
                nombre:nombre,
                correo:correo,
                contrasena:contrai,
                foto: 'https://i.ibb.co/94D9z5P/logo.jpg',
                rol:rol,
            };
            try {
                const connection = await getConnection();
                await connection.query("INSERT INTO cliente SET ?", [dato] );
                console.log("registro exitoso");
                emailer.sendMail(dato)
                res.json( dato );
            } catch {
                console.log("ya existe el correo");
                res.status(400).json({ message: "El correo ya se encuentra registrado." });
            } 
    }
};


// autenticacion de datos login 
const verificaruser= async (req, res) => {
    const {correo, contrasena} = req.body;
    if (!correo || !contrasena) {
        res.status(400).json({ message: "ingrese sus datos completos" });
    }
    else{
        try {
            let dato = {correo,contrasena};
            const connection = await getConnection();
            connection.query('SELECT  * FROM cliente WHERE correo = ?', correo,(err,result)=>{
                if(err) {
                    console.log(err);
                }else {
                    var data = JSON.parse(JSON.stringify(result));
                    console.log(data, "soy yo")
                    try {
                        let id = data[0].id_cliente
                        let contras = data[0].contrasena;
                        let rol = data[0].rol
                        let foto = data[0].foto
                        const equals = bcrypt.compareSync(req.body.contrasena, contras);
                        console.log(equals)
                        if (equals != true) {
                            res.status(400).send({message: 'contraseña invalida'})
                        } else {

                            jwt.sign({id, rol, foto}, 'secre',{expiresIn: '60000s'}, (err,token)=>{
                                if(err) {
                                    console.log(err);
                                }else {
                                    console.log(token);
                                    res.json(token);
                                }
                            })
                        } 
                    } catch (error) {
                        res.status(400).json({ message: "No se encuentra registrado" });
                    }
                    
                }
            })  
        } catch (error) {
            res.status(400).json({ message: "contraseña invalida" });
            console.log("contrasena invalida")
        }  
    }
};


// actualizar datos de usuario 
const actualizardatos = async (req, res) => {
    
    try {
        const { id_cliente } = req.params;
        const { nombre, correo, direccion ,  ciudad, telefono,file} = req.body;
        if (nombre === undefined || correo === undefined || direccion === undefined || ciudad === undefined || telefono === undefined) {
            res.status(400).json({ message: "por favor ingrese los campos correspondientes." });
        }
        const connection = await getConnection();
        let foto ;
        let fotos ;

        console.log(file, 'soy el file')
        if (file === undefined) {
            let nico = req.files.file
            fotos = new Date().getTime()+'.png'
            foto = `http://localhost:5000/usuarios/${fotos}`
            const datos = { nombre, correo, direccion , ciudad, telefono,foto};
            nico.mv('./uploads/usuarios/'+fotos);
            const result = await connection.query("UPDATE cliente SET ? WHERE id_cliente = ?", [datos,id_cliente]);
            res.json(result);
            
        }else{
            console.log('hola')
            const datos = { nombre, correo, direccion , ciudad, telefono};
            console.log('no tengo foto')
            const result = await connection.query("UPDATE cliente SET ? WHERE id_cliente = ?", [datos,id_cliente]);
            res.json(result);
        }

        
    } catch (error) {
        res.send(error.message);
    }
};

const eliminarUsuario = async (req, res) => {

    try {
        const { id_cliente } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM cliente WHERE id_cliente = ?", [id_cliente]);
        res.json("usuario elimidado correctamente");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



const getodos = async (req, res) => {
    try {
        const {} = req.params;
        const connection = await getConnection();
        const data= await connection.query("SELECT * FROM cliente");
        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const recuperarc = async (req, res) => {
    const { correo } = req.body;
  
    if (!correo) {
      res.status(400).json({ message: "Ingrese su correo" });
    } else {
      try {
        const connection = await getConnection(); 
        connection.query('SELECT id_cliente FROM cliente WHERE correo = ?', [correo], (err, results) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: "El correo no se encuentra registrado" });
          } else {
            if (results.length > 0) {
                
                const codigoAnterior = '';
                const token = generarCodigo(codigoAnterior);
                console.log(typeof(token) , 'soy el codigo')
              let datos = {
                id_cliente: results[0].id_cliente,
                correo: correo,
                token: token
              };
                try {
                    connection.query("INSERT INTO recuperarc SET ?", [datos] );
                    emailers.sendMail(datos)
                    res.send(token)
                } catch (error) {
                    res.status(400).json({ message: "no se guardo el token" });
                }
            } else {
              res.status(400).json({ message: "El correo no se encuentra registrado" });
            }
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
      }
    }
  }
   
const cambiar = async (req, res) => {
    try {
        const { correo, token, contrasena } = req.body;
        const connection = await getConnection();
        const data = await connection.query("SELECT * FROM recuperarc WHERE correo = ? ", correo);
        try {
        for (let i = 0; i < data.length; i++) {
            const correos = data[i];
            const codigo = correos['token']
            const email = correos['correo']
            if (email == correo && token == codigo ) {
                let contrai = await bcrypt.hash(contrasena, 8);
                await connection.query("UPDATE cliente SET contrasena = ? WHERE correo = ?;", [contrai, correo]);
                await connection.query("DELETE FROM recuperarc WHERE correo = ?;", [correo]);
                res.json('hola');
            }
        }
        } catch (error) {
        res.status(400).json("no se encuentra el codigo");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

  
// exportar metodos
export const methods = {
    getAll,
    add,
    verificaruser,
    getodos,
    actualizardatos,
    eliminarUsuario,
    recuperarc,
    cambiar,
};




