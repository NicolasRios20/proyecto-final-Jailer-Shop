import { Router } from "express";
import { methods as facturaClienteController } from "../controllers/facturaCliente.controller";

const router = Router();

router.get("/facturas", facturaClienteController.getfacturas);
router.get("/", facturaClienteController.getid_factura);
router.post("/", facturaClienteController.guardar_factura);
router.get("/:no_venta", facturaClienteController.getDatosFactura);


export default router;