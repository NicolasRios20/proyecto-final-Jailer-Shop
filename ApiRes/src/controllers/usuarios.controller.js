import { getConnection } from "../database/database";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const emailer = require('../controllers/correo')

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

    
// exportar metodos
export const methods = {
    getAll,
    add,
    verificaruser,
    getodos,
    actualizardatos,
    eliminarUsuario
};




