import { Router } from "express";
import { methods as categoriasController } from "../controllers/categorias.controller";

const router = Router();

router.get("/", categoriasController.getAll);//trae todas las categorias existentes en la base de datos
router.get("/:id_categoria", categoriasController.getById);//obtener por categorias id
export default router;