import { json, Router } from "express";
import { methods as usuariosController } from "../controllers/usuarios.controller";
import very from "./verificarToken";


const router = Router();

router.get("/:id_cliente", very, usuariosController.getAll);
router.get("/", usuariosController.getodos);
router.post("/", usuariosController.add);
router.post('/email', usuariosController.verificaruser);
router.put("/:id_cliente",  usuariosController.actualizardatos);
router.delete("/:id_cliente", usuariosController.eliminarUsuario);

export default router
