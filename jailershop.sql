-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2023 a las 02:17:00
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jailershop`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_producto` (IN `nombre_producto` VARCHAR(100), IN `cantidad` INT, IN `precio_producto` INT, IN `id_categoria` INT, IN `imagen` TEXT, IN `descripcion` TEXT)   INSERT INTO productos (nombre_producto, cantidad , precio_producto, id_categoria, imagen, descripcion) values (nombre_producto, cantidad, precio_producto, id_categoria, imagen, descripcion)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_producto` (`id` INT)   SELECT * FROM productos WHERE id_producto = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_productos` ()   SELECT * from productos$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(100) DEFAULT NULL,
  `tipo_categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`, `tipo_categoria`) VALUES
(5, 'tela', 'tela'),
(6, 'madera', 'madera'),
(7, 'artesanal', 'tela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasena` text NOT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `rol` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `correo`, `contrasena`, `ciudad`, `direccion`, `telefono`, `foto`, `rol`) VALUES
(1, 'admin', 'admin', '$2a$08$hCfPjyKngkpWVpKRCgMCceyyHOmdJAXJB755cb8zi/utU9r5jEt9.', NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_proveedor`
--

CREATE TABLE `compra_proveedor` (
  `id_compra` int(11) NOT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `valor` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compra_proveedor`
--

INSERT INTO `compra_proveedor` (`id_compra`, `id_proveedor`, `valor`, `fecha`) VALUES
(1, 103, 0, '2023-03-01 15:00:49'),
(2, 103, 0, '2023-03-01 15:01:41'),
(3, 103, 0, '2023-03-01 15:06:08'),
(4, 103, 0, '2023-03-01 20:37:53'),
(5, 103, 0, '2023-03-01 20:44:40'),
(6, 103, 0, '2023-03-01 20:52:54'),
(8, 103, 0, '2023-03-01 20:54:18'),
(9, 103, 0, '2023-03-01 20:58:12'),
(10, 103, 0, '2023-03-01 21:00:39'),
(11, 103, 0, '2023-03-01 21:01:58'),
(12, 103, 0, '2023-03-01 21:06:32'),
(13, 103, 0, '2023-03-01 21:07:28'),
(14, 103, 0, '2023-03-01 21:19:49'),
(15, 103, 0, '2023-03-02 01:11:06'),
(16, 103, 0, '2023-03-02 01:53:10'),
(17, 103, 0, '2023-03-02 01:54:59'),
(18, 103, 0, '2023-03-02 01:55:27'),
(19, 103, 0, '2023-03-02 01:56:57'),
(20, 103, 0, '2023-03-02 01:59:17'),
(21, 103, 0, '2023-03-02 02:36:59'),
(22, 103, 30258, '2023-03-02 02:41:59'),
(23, 103, 45387, '2023-03-02 02:48:17'),
(24, 103, 15129, '2023-03-02 02:49:04'),
(25, 103, 30258, '2023-03-02 02:50:47'),
(26, 103, 45387, '2023-03-02 02:55:36'),
(27, 103, 45387, '2023-03-02 03:01:50'),
(28, 103, 45387, '2023-03-02 03:03:13'),
(29, 103, 90774, '2023-03-02 06:25:20'),
(30, 103, 90774, '2023-03-02 16:11:29'),
(31, 103, 30258, '2023-03-02 16:11:45'),
(32, 103, 30258, '2023-03-02 16:14:26'),
(33, 103, 75645, '2023-03-02 16:14:42'),
(34, 103, 15129, '2023-03-02 16:22:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_producto` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `cantidad`, `precio_producto`, `id_categoria`, `imagen`, `descripcion`) VALUES
(33, 'jhon', 123, 123, 6, 'http://localhost:5000/1676463463317.png', '123'),
(34, 'bolso ', 4, 120, 7, 'http://localhost:5000/1678334596764.png', 'dsfdsff'),
(35, 'saco', 4, 120, 7, 'http://localhost:5000/1678334618179.png', 'dsfdsff');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `cedula` varchar(10) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `nombre_proveedor` varchar(100) NOT NULL,
  `ubicacion_p` varchar(20) NOT NULL,
  `cuenta_bancaria` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`cedula`, `id_proveedor`, `nombre_proveedor`, `ubicacion_p`, `cuenta_bancaria`) VALUES
('', 1, 'jhon', 'pati 3', '102520'),
('camisa', 2, 'jhon', '123', 'camisa'),
('jhon', 5, 'jhon', '147', '1094959234'),
('1094959234', 7, 'jhon', 'armenia', '1094959234'),
('109495923', 17, 'jhon', 'armenia', '123'),
('10949592', 25, 'leyder', 'armenia', '789'),
('1094', 27, 'jhon', 'armenia', '789'),
('10942', 29, 'jhon', 'armenia', '789'),
('12345', 30, 'cruz', 'armenia', '789'),
('456', 46, 'jhon', 'jhon', '1094959234'),
('456147', 49, 'jhon', 'jhon', '1094959234'),
('4561477894', 51, 'jhon', 'jhon', '1094959234'),
('45', 62, 'jhon', 'jhon', '1094959234'),
('852', 69, 'pepe', '', ''),
('852741', 71, 'pepe', '', ''),
('789456123', 72, 'pepe', 'jhon', '123'),
('123456', 75, 'pepe', 'jhon', ''),
('12', 77, 'pepe', 'jhon', '123'),
('852147', 93, 'pepe', 'jhon', '123'),
('8521', 97, 'pepe', 'jhon', ''),
('8', 99, 'pepe', 'jhon', ''),
('898', 100, 'pepe', 'jhon', ''),
('963', 103, 'nicolas', 'dgdfgfdg', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remision_producto`
--

CREATE TABLE `remision_producto` (
  `id_remision_producto` int(11) NOT NULL,
  `id_compra` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `costo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `remision_producto`
--

INSERT INTO `remision_producto` (`id_remision_producto`, `id_compra`, `cantidad`, `id_producto`, `costo`) VALUES
(1, 25, 123, 33, 123),
(2, 28, 123, 33, 123),
(3, 28, 123, 33, 123),
(4, 29, 123, 33, 123),
(5, 29, 123, 33, 123),
(6, 29, 123, 33, 123),
(7, 29, 123, 33, 123),
(8, 29, 123, 33, 123),
(9, 29, 123, 33, 123),
(10, 30, 123, 33, 123),
(11, 30, 123, 33, 123),
(12, 30, 123, 33, 123),
(13, 30, 123, 33, 123),
(14, 30, 123, 33, 123),
(15, 30, 123, 33, 123),
(16, 31, 123, 33, 123),
(17, 31, 123, 33, 123),
(18, 32, 123, 33, 123),
(19, 32, 123, 33, 123),
(20, 33, 123, 33, 123),
(21, 33, 123, 33, 123),
(22, 33, 123, 33, 123),
(23, 33, 123, 33, 123),
(24, 33, 123, 33, 123),
(25, 34, 123, 33, 123);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `no_venta` int(11) NOT NULL,
  `fecha_venta` date DEFAULT NULL,
  `total_venta` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`no_venta`, `fecha_venta`, `total_venta`, `id_cliente`) VALUES
(1, '2023-03-09', 123, 1),
(2, '2023-03-09', 123, 1),
(3, '2023-03-09', 123, 1),
(4, '2023-03-09', 123, 1),
(5, '2023-03-09', 123, 1),
(6, '2023-03-09', 123, 1),
(7, '2023-03-09', 123, 1),
(8, '2023-03-09', 123, 1),
(9, '2023-03-09', 123, 1),
(10, '2023-03-09', 123, 1),
(11, '2023-03-09', 123, 1),
(12, '2023-03-09', 123, 1),
(13, '2023-03-09', 123, 1),
(14, '2023-03-09', 123, 1),
(15, '2023-03-09', 123, 1),
(16, '2023-03-09', 123, 1),
(17, '2023-03-09', 123, 1),
(18, '2023-03-09', 123, 1),
(19, '2023-03-09', 123, 1),
(20, '2023-03-09', 123, 1),
(21, '2023-03-09', 123, 1),
(22, '2023-03-09', 123, 1),
(23, '2023-03-09', 123, 1),
(24, '2023-03-09', 123, 1),
(25, '2023-03-09', 123, 1),
(26, '2023-03-09', 363, 1),
(27, '2023-03-09', 363, 1),
(28, '2023-03-09', 123, 1),
(29, '2023-03-09', 123, 1),
(30, '2023-03-09', 123, 1),
(31, '2023-03-09', 123, 1),
(32, '2023-03-09', 123, 1),
(33, '2023-03-09', 123, 1),
(34, '2023-03-09', 123, 1),
(36, '2023-03-09', 123, 1),
(37, '2023-03-09', 123, 1),
(38, '2023-03-09', 123, 1),
(39, '2023-03-09', 123, 1),
(40, '2023-03-09', 123, 1),
(41, '2023-03-09', 123, 1),
(42, '2023-03-10', 726, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_producto`
--

CREATE TABLE `venta_producto` (
  `id_factura` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `valor_total` int(11) DEFAULT NULL,
  `no_venta` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `venta_producto`
--

INSERT INTO `venta_producto` (`id_factura`, `cantidad`, `valor_total`, `no_venta`, `id_producto`) VALUES
(1, 1, 123, 39, 33),
(2, 1, 123, 39, 33),
(3, 1, 123, 41, 33),
(4, 2, 246, 42, 33),
(5, 3, 360, 42, 35),
(6, 1, 120, 42, 34);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `compra_proveedor`
--
ALTER TABLE `compra_proveedor`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `remision_producto`
--
ALTER TABLE `remision_producto`
  ADD PRIMARY KEY (`id_remision_producto`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_compra` (`id_compra`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`no_venta`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `no_venta` (`no_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compra_proveedor`
--
ALTER TABLE `compra_proveedor`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `remision_producto`
--
ALTER TABLE `remision_producto`
  MODIFY `id_remision_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `no_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra_proveedor`
--
ALTER TABLE `compra_proveedor`
  ADD CONSTRAINT `compra_proveedor_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `remision_producto`
--
ALTER TABLE `remision_producto`
  ADD CONSTRAINT `remision_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `remision_producto_ibfk_2` FOREIGN KEY (`id_compra`) REFERENCES `compra_proveedor` (`id_compra`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD CONSTRAINT `venta_producto_ibfk_1` FOREIGN KEY (`no_venta`) REFERENCES `venta` (`no_venta`),
  ADD CONSTRAINT `venta_producto_ibfk_2` FOREIGN KEY (`no_venta`) REFERENCES `venta` (`no_venta`),
  ADD CONSTRAINT `venta_producto_ibfk_3` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
