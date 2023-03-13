import { Router } from "express";
import { methods as proveedorController } from "../controllers/proveedor.controller";

const router = Router();

router.post("/", proveedorController.add);//creacion de proveedor
router.get("/", proveedorController.getProveedores);//listar proveedores
router.get("/:cedula",proveedorController.getProveedor)//listar un unico proveedor por cedula
router.delete("/:cedula",proveedorController.eliminarProveedor)//eliminar proveedor por cedula

export default router;