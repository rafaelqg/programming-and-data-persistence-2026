-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '2c779cca-4809-11f1-8fae-aafecc3e24ba:1-158';

--
-- Table structure for table `formato`
--

DROP TABLE IF EXISTS `formato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formato`
--

LOCK TABLES `formato` WRITE;
/*!40000 ALTER TABLE `formato` DISABLE KEYS */;
INSERT INTO `formato` VALUES (1,'Remoto'),(2,'Presencial');
/*!40000 ALTER TABLE `formato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogador`
--

DROP TABLE IF EXISTS `jogador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_jogador` varchar(80) NOT NULL,
  `email_jogador` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogador`
--

LOCK TABLES `jogador` WRITE;
/*!40000 ALTER TABLE `jogador` DISABLE KEYS */;
INSERT INTO `jogador` VALUES (1,'Lucas Silva','lucas.silva@email.com'),(2,'Mariana Souza','mariana.souza@email.com'),(3,'Pedro Oliveira','pedro.oliveira@email.com'),(4,'Ana Costa','ana.costa@email.com'),(5,'Rafael Pereira','rafael.pereira@email.com'),(6,'Juliana Fernandes','juliana.fernandes@email.com'),(7,'Carlos Santos','carlos.santos@email.com'),(8,'Beatriz Almeida','beatriz.almeida@email.com'),(9,'Felipe Rodrigues','felipe.rodrigues@email.com'),(10,'Camila Rocha','camila.rocha@email.com'),(11,'Diego Martins','diego.martins@email.com'),(12,'Larissa Gomes','larissa.gomes@email.com'),(13,'Bruno Ribeiro','bruno.ribeiro@email.com'),(14,'Patricia Carvalho','patricia.carvalho@email.com'),(15,'Eduardo Barbosa','eduardo.barbosa@email.com'),(16,'Renata Dias','renata.dias@email.com'),(17,'Gabriel Teixeira','gabriel.teixeira@email.com'),(18,'Fernanda Lopes','fernanda.lopes@email.com'),(19,'Thiago Moreira','thiago.moreira@email.com'),(20,'Aline Nascimento','aline.nascimento@email.com');
/*!40000 ALTER TABLE `jogador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogo`
--

DROP TABLE IF EXISTS `jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_jogo` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogo`
--

LOCK TABLES `jogo` WRITE;
/*!40000 ALTER TABLE `jogo` DISABLE KEYS */;
INSERT INTO `jogo` VALUES (1,'The Legend of Zelda: Breath of the Wild'),(2,'Super Mario Odyssey'),(3,'God of War'),(4,'Red Dead Redemption 2'),(5,'The Witcher 3: Wild Hunt'),(6,'Minecraft'),(7,'Fortnite'),(8,'Grand Theft Auto V'),(9,'Cyberpunk 2077'),(10,'Elden Ring'),(11,'Hollow Knight'),(12,'Dark Souls III'),(13,'Assassins Creed Valhalla'),(14,'Call of Duty: Modern Warfare'),(15,'FIFA 23'),(16,'Resident Evil Village'),(17,'Overwatch'),(18,'League of Legends'),(19,'Dota 2'),(20,'Counter-Strike: Global Offensive');
/*!40000 ALTER TABLE `jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogo_plataforma`
--

DROP TABLE IF EXISTS `jogo_plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogo_plataforma` (
  `id_jogo` int NOT NULL,
  `plataforma_id` int NOT NULL,
  KEY `fk_jogo_plataforma_plataforma_idx` (`plataforma_id`),
  KEY `fk_chave_jogo_plataforma_idx` (`id_jogo`),
  CONSTRAINT `fk_chave_jogo_plataforma` FOREIGN KEY (`id_jogo`) REFERENCES `jogo` (`id`),
  CONSTRAINT `fk_jogo_plataforma_plataforma` FOREIGN KEY (`plataforma_id`) REFERENCES `plataforma` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogo_plataforma`
--

LOCK TABLES `jogo_plataforma` WRITE;
/*!40000 ALTER TABLE `jogo_plataforma` DISABLE KEYS */;
INSERT INTO `jogo_plataforma` VALUES (1,6),(2,6),(3,2),(4,4),(5,3),(6,1),(7,8),(8,5),(9,1),(10,2),(11,6),(12,3),(13,5),(14,4),(15,10),(16,2),(17,3),(18,1),(19,1),(20,5);
/*!40000 ALTER TABLE `jogo_plataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `id` int NOT NULL,
  `inicio` datetime DEFAULT NULL,
  `fim` datetime DEFAULT NULL,
  `jogador_1` int NOT NULL,
  `jogador_2` int NOT NULL,
  `vencedor` int NOT NULL,
  `formato` int NOT NULL,
  `local` varchar(80) DEFAULT NULL,
  `jogo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_partida_jogador_1_idx` (`jogador_1`),
  KEY `fk_partida_vencedor_idx` (`vencedor`),
  KEY `fk_partida_jogador_2_idx` (`jogador_2`),
  KEY `fk_partida_formato_idx` (`formato`),
  KEY `fk_partida_jogo_idx` (`jogo`),
  CONSTRAINT `fk_partida_formato` FOREIGN KEY (`formato`) REFERENCES `formato` (`id`),
  CONSTRAINT `fk_partida_jogador_1` FOREIGN KEY (`jogador_1`) REFERENCES `jogador` (`id`),
  CONSTRAINT `fk_partida_jogador_2` FOREIGN KEY (`jogador_2`) REFERENCES `jogador` (`id`),
  CONSTRAINT `fk_partida_jogo` FOREIGN KEY (`jogo`) REFERENCES `jogo` (`id`),
  CONSTRAINT `fk_partida_vencedor` FOREIGN KEY (`vencedor`) REFERENCES `jogador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plataforma` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_plataforma` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataforma`
--

LOCK TABLES `plataforma` WRITE;
/*!40000 ALTER TABLE `plataforma` DISABLE KEYS */;
INSERT INTO `plataforma` VALUES (1,'PC'),(2,'PlayStation 5'),(3,'PlayStation 4'),(4,'Xbox Series X'),(5,'Xbox One'),(6,'Nintendo Switch'),(7,'Nintendo DS'),(8,'Mobile (Android)'),(9,'Mobile (iOS)'),(10,'Steam Deck');
/*!40000 ALTER TABLE `plataforma` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-27 19:59:28
