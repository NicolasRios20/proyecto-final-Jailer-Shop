import { Router } from "express";
import { methods as productosController } from "../controllers/products.controller";
import very  from "./verificarToken";
const router = Router();

router.get("/", productosController.getAll);//trae todos los productos
router.get("/:id_producto", productosController.getById);//obtener por id
router.post("/", very, productosController.add);//creacion de producto
router.put("/:id", productosController.updateById);//obtener por id
router.delete("/:nombre_producto", productosController.deleteById);//obtener por id

export default router;
