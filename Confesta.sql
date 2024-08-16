-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- SO do servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- A despejar estrutura da base de dados para confesta
CREATE DATABASE IF NOT EXISTS `confesta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `confesta`;

-- A despejar estrutura para tabela confesta.category
CREATE TABLE IF NOT EXISTS `category` (
  `CategoryId` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  `Descricao` text,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.categoryguest
CREATE TABLE IF NOT EXISTS `categoryguest` (
  `CategoryGuestId` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CategoryGuestId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.event
CREATE TABLE IF NOT EXISTS `event` (
  `EventId` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `CategoryId` int DEFAULT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  `Local` varchar(255) DEFAULT NULL,
  `Data` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `Descricao` text,
  `CriadoEm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Template` int DEFAULT NULL,
  PRIMARY KEY (`EventId`),
  KEY `UserId` (`UserId`),
  KEY `CategoryId` (`CategoryId`),
  KEY `Template` (`Template`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`),
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`),
  CONSTRAINT `event_ibfk_3` FOREIGN KEY (`Template`) REFERENCES `invitationtemplate` (`TemplateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.guest
CREATE TABLE IF NOT EXISTS `guest` (
  `GuestId` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `Category` int DEFAULT NULL,
  `TableId` int DEFAULT NULL,
  `Presente` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`GuestId`),
  KEY `Category` (`Category`),
  KEY `TableId` (`TableId`),
  CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`Category`) REFERENCES `categoryguest` (`CategoryGuestId`),
  CONSTRAINT `guest_ibfk_2` FOREIGN KEY (`TableId`) REFERENCES `table` (`TableId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.invitation
CREATE TABLE IF NOT EXISTS `invitation` (
  `InvitationId` int NOT NULL AUTO_INCREMENT,
  `EventId` int DEFAULT NULL,
  `GuestId` int DEFAULT NULL,
  `TemplateId` int DEFAULT NULL,
  `Detalhes` text,
  PRIMARY KEY (`InvitationId`),
  KEY `EventId` (`EventId`),
  KEY `TemplateId` (`TemplateId`),
  CONSTRAINT `invitation_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`),
  CONSTRAINT `invitation_ibfk_2` FOREIGN KEY (`TemplateId`) REFERENCES `invitationtemplate` (`TemplateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.invitationtemplate
CREATE TABLE IF NOT EXISTS `invitationtemplate` (
  `TemplateId` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  `Layout` text,
  `CriadoEm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`TemplateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.qrcode
CREATE TABLE IF NOT EXISTS `qrcode` (
  `QrCodeId` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(255) DEFAULT NULL,
  `EventId` int DEFAULT NULL,
  `GuestId` int DEFAULT NULL,
  PRIMARY KEY (`QrCodeId`),
  UNIQUE KEY `Codigo` (`Codigo`),
  KEY `EventId` (`EventId`),
  KEY `GuestId` (`GuestId`),
  CONSTRAINT `qrcode_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`),
  CONSTRAINT `qrcode_ibfk_2` FOREIGN KEY (`GuestId`) REFERENCES `guest` (`GuestId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.table
CREATE TABLE IF NOT EXISTS `table` (
  `TableId` int NOT NULL AUTO_INCREMENT,
  `EventId` int DEFAULT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  `Localizacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TableId`),
  KEY `EventId` (`EventId`),
  CONSTRAINT `table_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela confesta.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `Senha` varchar(100) DEFAULT NULL,
  `CriadoEm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
