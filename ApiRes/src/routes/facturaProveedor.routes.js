import { Router } from "express";
import { methods as facturaProveedorController } from "../controllers/facturaProveedor.controller";

const router = Router();

//router.post("/", proveedorController.add);//creacion de proveedor
router.get("/", facturaProveedorController.getid_factura);
router.post("/", facturaProveedorController.guardar_factura);
router.get("/facturas", facturaProveedorController.getfacturas);
router.get("/:id_compra", facturaProveedorController.getDatosFactura);

export default router;