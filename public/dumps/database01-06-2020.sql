-- mysqldump-php https://github.com/ifsnop/mysqldump-php
--
-- Host: localhost	Database: dashboard
-- ------------------------------------------------------
-- Server version 	5.5.5-10.4.10-MariaDB
-- Date: Mon, 01 Jun 2020 14:57:52 +0200

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apichecks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apichecks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `type_api` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT '2',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apichecks`
--

LOCK TABLES `apichecks` WRITE;
/*!40000 ALTER TABLE `apichecks` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `apichecks` VALUES (1,'Site','site',NULL,'1','2020-05-30 09:23:30','2020-05-30 09:23:34');
/*!40000 ALTER TABLE `apichecks` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `bdds`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bdds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fichier` varchar(255) NOT NULL,
  `nbre_download` int(11) NOT NULL DEFAULT 0,
  `user_fullname` varchar(255) NOT NULL,
  `hash_key` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bdds`
--

LOCK TABLES `bdds` WRITE;
/*!40000 ALTER TABLE `bdds` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `bdds` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `customers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structure` int(11) NOT NULL,
  `denomination` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `siteweb` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`denomination`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`telephone`),
  UNIQUE KEY `siteweb` (`siteweb`),
  KEY `structure` (`structure`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`structure`) REFERENCES `structures` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `customers` VALUES (2,1,'Hassan PIOU','piouhassan@gmail.com','+22892328454','Lomé','TOGO','Agoè','http://www.mon.com','1','2020-05-31 21:11:28','2020-05-31 21:11:28');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `developer_tokens`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `developer_tokens` (
  `id_token` int(11) NOT NULL AUTO_INCREMENT,
  `name_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developer_tokens`
--

LOCK TABLES `developer_tokens` WRITE;
/*!40000 ALTER TABLE `developer_tokens` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `developer_tokens` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `devises`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devises`
--

LOCK TABLES `devises` WRITE;
/*!40000 ALTER TABLE `devises` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `devises` VALUES (1,'Euro','EUR','1','2020-05-31 21:18:59','2020-05-31 21:18:59');
/*!40000 ALTER TABLE `devises` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `invoices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `method_id` int(11) NOT NULL,
  `modality_id` int(11) NOT NULL,
  `hash_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duedate` date NOT NULL,
  `livraison` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `method_id` (`method_id`),
  KEY `modality_id` (`modality_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`method_id`) REFERENCES `paymethods` (`id_method`),
  CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`modality_id`) REFERENCES `paymodalites` (`modal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `invoice_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `item_price` int(11) NOT NULL,
  `item_devise` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `item_qty` int(11) NOT NULL,
  `invoice_hash_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `otpauthentifiactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otpauthentifiactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otpauthentifiactions`
--

LOCK TABLES `otpauthentifiactions` WRITE;
/*!40000 ALTER TABLE `otpauthentifiactions` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `otpauthentifiactions` VALUES (1,'Stephane','$2y$12$lplFPIXgKYikPyBBUZNbpeGDgfF.IzZnT8G6lUZrwOtxwOoexQk0e','2020-04-29 15:06:05','2020-04-29 15:11:51');
/*!40000 ALTER TABLE `otpauthentifiactions` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `packages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `packages` (
  `pk_id` int(11) NOT NULL AUTO_INCREMENT,
  `pk_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pk_description` text COLLATE utf8_unicode_ci NOT NULL,
  `pk_price` int(11) NOT NULL,
  `pk_icon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`pk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `packages` VALUES (1,'Starter','Lorem ipsum dolor sit amet, consectetur adipisicing elit\n',350000,'bx bx-walk','2020-05-13 22:04:50','2020-05-31 01:42:08'),(2,'Professional','Lorem ipsum dolor sit amet, consectetur\n',600000,'bx bx-run','2020-05-13 22:04:50','2020-05-31 02:24:58'),(3,'Enterprise','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aliquid \n',1000000,'bx bx-cycling','2020-05-13 22:04:50','2020-05-31 01:42:47'),(4,'Unlimited','Lorem ipsum dolor sit amet,\n',1500000,'bx bx-car','2020-05-13 22:04:50','2020-05-31 22:27:00');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `package_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package_items` (
  `pk_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `package_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`pk_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_items`
--

LOCK TABLES `package_items` WRITE;
/*!40000 ALTER TABLE `package_items` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `package_items` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `paramconfigs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paramconfigs` (
  `config_id` int(11) NOT NULL AUTO_INCREMENT,
  `token_limit` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`config_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paramconfigs`
--

LOCK TABLES `paramconfigs` WRITE;
/*!40000 ALTER TABLE `paramconfigs` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `paramconfigs` VALUES (1,10,'2020-05-20 23:37:48',NULL);
/*!40000 ALTER TABLE `paramconfigs` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `partenaires`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partenaires` (
  `id_part` int(11) NOT NULL AUTO_INCREMENT,
  `type_structure` int(11) NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `titre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `secteur` text COLLATE utf8_unicode_ci NOT NULL,
  `otr` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_part`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partenaires`
--

LOCK TABLES `partenaires` WRITE;
/*!40000 ALTER TABLE `partenaires` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `partenaires` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destinataire` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `method` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'paypal',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `paymethods`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymethods` (
  `id_method` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_method`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymethods`
--

LOCK TABLES `paymethods` WRITE;
/*!40000 ALTER TABLE `paymethods` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `paymethods` VALUES (1,'MasterCard','copy_discover-logo-png-pic-5681.png',1,'2020-05-31 21:15:32','2020-05-31 21:15:32'),(2,'Visa','copy_visa-logo-png-2013.png',1,'2020-05-31 21:17:18','2020-05-31 21:17:18');
/*!40000 ALTER TABLE `paymethods` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `paymodalites`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymodalites` (
  `modal_id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`modal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymodalites`
--

LOCK TABLES `paymodalites` WRITE;
/*!40000 ALTER TABLE `paymodalites` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `paymodalites` VALUES (1,'Versement de 100%',1,'2020-05-10 20:27:00',NULL),(2,'Versement de 30% 30% 40%',1,'2020-05-10 20:27:36',NULL),(3,'Versement de 40% 60%',1,'2020-05-10 20:27:58',NULL),(4,'Versement de 50% 50%',1,'2020-05-10 20:28:18',NULL);
/*!40000 ALTER TABLE `paymodalites` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `phinxlog`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phinxlog` (
  `version` bigint(20) NOT NULL,
  `migration_name` varchar(100) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `breakpoint` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phinxlog`
--

LOCK TABLES `phinxlog` WRITE;
/*!40000 ALTER TABLE `phinxlog` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `phinxlog` VALUES (20200525152914,'CreatePortfolioPortfolioTable','2020-05-25 17:39:41','2020-05-25 17:39:41',0);
/*!40000 ALTER TABLE `phinxlog` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `portfolio_abouts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_abouts` (
  `id_about` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `experience` int(11) DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `freelance` int(11) NOT NULL DEFAULT 1,
  `langue` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `skype` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `github` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `xing` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stackoverflow` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bg` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'dark_about.jpg',
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_about`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_abouts`
--

LOCK TABLES `portfolio_abouts` WRITE;
/*!40000 ALTER TABLE `portfolio_abouts` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `portfolio_abouts` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `portfolio_contacts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sujet` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `readed` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_contacts`
--

LOCK TABLES `portfolio_contacts` WRITE;
/*!40000 ALTER TABLE `portfolio_contacts` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `portfolio_contacts` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `portfolio_edu_exps`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_edu_exps` (
  `id_edu` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_interval` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `institut` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_edu`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_edu_exps`
--

LOCK TABLES `portfolio_edu_exps` WRITE;
/*!40000 ALTER TABLE `portfolio_edu_exps` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `portfolio_edu_exps` VALUES (1,'Bacalaureat','2014','Fabienne','Cursus Scolaire',1,1,'2020-06-01 14:41:26','2020-06-01 14:41:26');
/*!40000 ALTER TABLE `portfolio_edu_exps` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `portfolio_portfolios`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_portfolios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projet_type` varchar(255) NOT NULL,
  `customer` int(11) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `technologies` text NOT NULL,
  `budget` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_portfolios`
--

LOCK TABLES `portfolio_portfolios` WRITE;
/*!40000 ALTER TABLE `portfolio_portfolios` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `portfolio_portfolios` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `portfolio_skills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_skills` (
  `is_skills` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `percent` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`is_skills`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_skills`
--

LOCK TABLES `portfolio_skills` WRITE;
/*!40000 ALTER TABLE `portfolio_skills` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `portfolio_skills` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `projets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `budget` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `customer` int(11) DEFAULT NULL,
  `hash_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projets`
--

LOCK TABLES `projets` WRITE;
/*!40000 ALTER TABLE `projets` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `projets` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `projet_files`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projet_files` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `projet_id` int(11) DEFAULT NULL,
  `hash_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`file_id`),
  KEY `projet_id` (`projet_id`),
  CONSTRAINT `projet_files_ibfk_1` FOREIGN KEY (`projet_id`) REFERENCES `projets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projet_files`
--

LOCK TABLES `projet_files` WRITE;
/*!40000 ALTER TABLE `projet_files` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `projet_files` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `serverdbs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `serverdbs` (
  `id_db` int(11) NOT NULL AUTO_INCREMENT,
  `phpmyadmin` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dbname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `db_user` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `db_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_db`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serverdbs`
--

LOCK TABLES `serverdbs` WRITE;
/*!40000 ALTER TABLE `serverdbs` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `serverdbs` VALUES (1,'https://h2-phpmyadmin.infomaniak.com/','1v68g.myd.infomaniak.com','1v68g_hassan','10121992moiHASSAN','2020-05-05 10:39:40',NULL);
/*!40000 ALTER TABLE `serverdbs` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `serverftps`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `serverftps` (
  `id_ftp` int(11) NOT NULL AUTO_INCREMENT,
  `host` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `port` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_ftp`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serverftps`
--

LOCK TABLES `serverftps` WRITE;
/*!40000 ALTER TABLE `serverftps` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `serverftps` VALUES (1,'ftp.cluster020.hosting.ovh.net','montogocqj','Ua4Bd4f7D8Cu',21,'2020-05-05 10:51:00','2020-05-06 14:50:58');
/*!40000 ALTER TABLE `serverftps` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `servers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domaine` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  `buy_date` date NOT NULL,
  `dead_date` date NOT NULL,
  `abonnement` int(11) NOT NULL,
  `ftp_id` int(11) NOT NULL DEFAULT 0,
  `bd_id` int(11) NOT NULL DEFAULT 0,
  `hash_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `bd_id` (`bd_id`),
  KEY `customer_id` (`customer_id`),
  KEY `ftp_id` (`ftp_id`),
  CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`bd_id`) REFERENCES `serverdbs` (`id_db`),
  CONSTRAINT `servers_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `servers_ibfk_3` FOREIGN KEY (`ftp_id`) REFERENCES `serverftps` (`id_ftp`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servers`
--

LOCK TABLES `servers` WRITE;
/*!40000 ALTER TABLE `servers` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `servers` VALUES (1,'montogocom.com',2,'2019-12-18','2020-12-18',1,1,1,'3623a1b0c637fe5700fe9f46c217ed5a03308183',1,'2020-05-05 10:51:20','2020-05-06 16:04:47');
/*!40000 ALTER TABLE `servers` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `socials`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reseau` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socials`
--

LOCK TABLES `socials` WRITE;
/*!40000 ALTER TABLE `socials` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `socials` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `structures`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `structures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structure_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `structures`
--

LOCK TABLES `structures` WRITE;
/*!40000 ALTER TABLE `structures` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `structures` VALUES (1,'Particulier'),(2,'Entreprise');
/*!40000 ALTER TABLE `structures` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projet_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `task` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `projet_id` (`projet_id`),
  KEY `tags_ibfk_2` (`team_id`),
  CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`projet_id`) REFERENCES `projets` (`id`),
  CONSTRAINT `tags_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `teams`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `projet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`team_id`),
  KEY `projet_id` (`projet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`projet_id`) REFERENCES `projets` (`id`),
  CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
SET autocommit=0;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hash_key` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `poste` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'avatar.jpg',
  `user_profil` int(11) NOT NULL,
  `clientID` varchar(60) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_profil` (`user_profil`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_profil`) REFERENCES `user_profils` (`profil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `users` VALUES (1,'PIOU','Hassan','Stephane','$2y$12$lplFPIXgKYikPyBBUZNbpeGDgfF.IzZnT8G6lUZrwOtxwOoexQk0e','38159062b0d4b13fa105e280cdd89c980705c691','piouhassan@gmail.com','22892328454','Agoè ,Lomé-Togo','Responsable','profile.jpg',1,NULL,1,'2020-05-30 07:27:59','2020-02-02 20:47:19'),(4,'PIOU','Stephane','teephnaS','$2y$12$vz/KsqhBi4AF7uoWg45wo.5Lw4JavlxfUWy7eDVdQuh4xag1t6a/a','958c627057a88f1178534ec7cd83d9ca470a6b5f','piouladere@outlook.fr','22892328454','Agoè','Responsable','avatar.jpg',3,NULL,1,'2020-05-29 19:03:12','2020-05-22 10:25:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

--
-- Table structure for table `user_profils`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profils` (
  `profil_id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `chat` int(11) NOT NULL DEFAULT 0,
  `app` int(11) NOT NULL DEFAULT 0,
  `util` int(11) NOT NULL DEFAULT 0,
  `admin` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`profil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profils`
--

LOCK TABLES `user_profils` WRITE;
/*!40000 ALTER TABLE `user_profils` DISABLE KEYS */;
SET autocommit=0;
INSERT INTO `user_profils` VALUES (1,'Administrateur','Ce profil détient tous les pouvoirs de gestion de l\'application complête. ',1,1,1,1,1,'2020-05-22 19:46:27','2020-05-22 19:46:27'),(2,'Community builder','Ce profil est centré sur la communication',1,0,0,0,1,'2020-05-23 00:14:07','2020-05-23 00:14:07'),(3,'Dévelopeur','Ce profil gère,le coté développement logiciel et technique',0,1,1,0,1,'2020-05-23 07:40:48','2020-05-23 07:40:48');
/*!40000 ALTER TABLE `user_profils` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on: Mon, 01 Jun 2020 14:57:53 +0200
