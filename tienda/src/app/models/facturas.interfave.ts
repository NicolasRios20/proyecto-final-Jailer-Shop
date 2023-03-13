export interface FacturasP {
    id_compra: any;
    nombre_proveedor: any;
    valor: any;
    fecha: string;
}

export interface encabezadoFP {
    id_compra: any;
    nombre_proveedor: any;
    cedula: any;
    ubicacion_p: string;
    valor: any;
    fecha: any,
}

export interface productosFP {
    id_compra: any;
    id_producto: any
    nombre_producto: string;
    cantidad: any;
    costo: any;
}

// facturas compra del cliente

export interface FacturasC {
    no_venta: any,
    nombre: string,
    ciudad: string,
    direccion: string
    total_venta: number;
    fecha_venta: string;
}

export interface encabezadoFC {
    no_venta: any,
    fecha_venta: any,
    nombre: any,
    ciudad: any,
    direccion: string,
    telefono: string,
    total_venta: any;  
}

export interface productosFC {
    id_producto: any,
    nombre_producto: string,
    cantidad: any,
    precio_producto: number,
    valor_total: number,
}
