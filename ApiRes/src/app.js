import express from "express";
import morgan from "morgan";
// Routes
import productoRoutes from "./routes/products.routes";
import usersRoutes from "./routes/usuarios.routes";
import categoriasRoutes from "./routes/categorias.routes";
import proveedorRoutes from "./routes/proveedor.routes";
import facturaProveedor from "./routes/facturaProveedor.routes";
import facturaCliente from "./routes/facturaCliente.routes";
import fileUpload from "express-fileupload";
const app = express();

// Settings
app.set("port", 5000);

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(express.static('uploads'));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/producto", productoRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/proveedor", proveedorRoutes);
app.use("/api/facturaProveedor", facturaProveedor);
app.use("/api/facturaCliente", facturaCliente);

export default app;
