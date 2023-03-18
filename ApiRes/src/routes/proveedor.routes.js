import { Router } from "express";
import { methods as proveedorController } from "../controllers/proveedor.controller";

const router = Router();

router.post("/", proveedorController.add);//creacion de proveedor
router.get("/", proveedorController.getProveedores);//listar proveedores
router.get("/:id_proveedor",proveedorController.getProveedor)//listar un unico proveedor por cedula
router.put("/:id_proveedor", proveedorController.actualizardatos);//atualizar datos del proveedor

export default router;