import { json, Router } from "express";
import { methods as usuariosController } from "../controllers/usuarios.controller";
import very from "./verificarToken";


const router = Router();

router.post("/c",  usuariosController.cambiar);
router.get("/:id_cliente", very, usuariosController.getAll);
router.get("/", usuariosController.getodos);
router.post("/", usuariosController.add);
router.post('/email', usuariosController.verificaruser);
router.put("/:id_cliente",  usuariosController.actualizardatos);
router.delete("/:id_cliente", usuariosController.eliminarUsuario);
router.post("/contrasena", usuariosController.recuperarc);



export default router
