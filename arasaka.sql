-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 21, 2023 lúc 09:24 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `arasaka`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `role` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `email`, `password`, `status`, `role`) VALUES
(1, 'Lê Hoàng Khải', 'admin@gmail.com', 'admin123', 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` int(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `status`) VALUES
(1, 'Hệ thần kinh', 1),
(2, 'Hệ tuần hoàn', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `amount` double NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sale_price` double DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT 1,
  `sale_status` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `created_at`, `price`, `quantity`, `category_id`, `status`, `sale_status`) VALUES
(1, 'Memory Boost', NULL, 'The Memory Boost is a Frontal Cortex Cyberware implant in Cyberpunk 2077.\r\nMemory Boost instantly recovers 1/2/3/4 cyberdeck RAM unit after defeating an enemy. It requires a minimum of 7 Intelligence at Common rarity, which increases to 9/12/15 at higher rarities.', '2023-07-18', 30000000, 50, 1, 1, 0),
(2, 'Syn-Lungs', NULL, 'The Syn-Lungs is a Circulatory System Cyberware implant manufactured by Arasaka in Cyberpunk 2077.\r\nThis Syn-Lungs increase Stamina regeneration by 5/10/15/20/25%.\r\n\r\nIt requires 8/10/12/14/16 Body to be equipped.', '2023-07-18', 45000000, 50, 2, 1, 0),
(3, 'Syn-Lungs 2.0', NULL, 'The Syn-Lungs is a Circulatory System Cyberware implant manufactured by Arasaka in Cyberpunk 2077.', '2023-07-18', 20000000, 55, 2, 1, 0),
(4, 'Memory Boost', NULL, 'The Memory Boost is a Frontal Cortex Cyberware implant in Cyberpunk 2077.\r\nMemory Boost instantly recovers 1/2/3/4 cyberdeck RAM unit after defeating an enemy. It requires a minimum of 7 Intelligence at Common rarity, which increases to 9/12/15 at higher rarities.', '2023-07-18', 30000000, 50, 1, 1, 0),
(5, 'Memory Boost', NULL, 'The Memory Boost is a Frontal Cortex Cyberware implant in Cyberpunk 2077.\r\nMemory Boost instantly recovers 1/2/3/4 cyberdeck RAM unit after defeating an enemy. It requires a minimum of 7 Intelligence at Common rarity, which increases to 9/12/15 at higher rarities.', '2023-07-18', 30000000, 50, 1, 1, 0),
(6, 'Memory Boost', NULL, 'The Memory Boost is a Frontal Cortex Cyberware implant in Cyberpunk 2077.\r\nMemory Boost instantly recovers 1/2/3/4 cyberdeck RAM unit after defeating an enemy. It requires a minimum of 7 Intelligence at Common rarity, which increases to 9/12/15 at higher rarities.', '2023-07-18', 30000000, 50, 1, 1, 0),
(7, 'Memory Boost 12312312312', NULL, 'The Memory Boost is a Frontal Cortex Cyberware implant in Cyberpunk 2077.\r\nMemory Boost instantly recovers 1/2/3/4 cyberdeck RAM unit after defeating an enemy. It requires a minimum of 7 Intelligence at Common rarity, which increases to 9/12/15 at higher rarities.', '2023-07-18', 30000000, 50, 1, 1, 0),
(8, 'Memory Boost', NULL, 'The Memory Boost is a Frontal Cortex Cyberware implant in Cyberpunk 2077.\r\nMemory Boost instantly recovers 1/2/3/4 cyberdeck RAM unit after defeating an enemy. It requires a minimum of 7 Intelligence at Common rarity, which increases to 9/12/15 at higher rarities.', '2023-07-18', 30000000, 50, 2, 1, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
