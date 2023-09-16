-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: newUniversity
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `c_name` varchar(255) NOT NULL,
  `c_duration` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'M.Tech','2 years','2023-08-16 05:44:56','2023-08-16 05:44:56'),(2,'B.Tech','4 years','2023-08-16 05:44:56','2023-08-16 05:44:56'),(3,'M.Sc','2 years','2023-08-16 05:44:56','2023-08-16 05:44:56'),(4,'M.Sc(tech)','3 years','2023-08-16 05:44:56','2023-08-16 05:44:56');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `d_code` varchar(255) NOT NULL,
  `d_name` varchar(255) NOT NULL,
  `head` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `head` (`head`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`head`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'CSE','Computer Science and Engineering',1,'2023-08-16 05:50:10','2023-08-16 05:50:10'),(2,'EE','Electrical Engineering',7,'2023-08-16 05:50:10','2023-08-16 05:50:10'),(3,'ECE','Electronics and Communication Engineering',18,'2023-08-16 05:50:10','2023-08-16 05:50:10');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(255) NOT NULL,
  `e_type` varchar(255) NOT NULL,
  `e_role` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Ashish Raj','teaching','Assistant Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(2,'Saraojini Agarwal','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(3,'Jimmy Singh','teaching','Associate Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(4,'Bhumika Rani','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(5,'Gauri Bharti','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(6,'Vickey Soni','teaching','Assistant Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(7,'Govind Sarkar','teaching','Associate Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(8,'Ujjwala Tiwari','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(9,'Ishita Anand','teaching','Associate Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(10,'Anjali Singh','teaching','Associate Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(11,'Ishita Agarwal','teaching','Associate Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(12,'Neelam Agarwal','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(13,'Ishita Bharti','teaching','Associate Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(14,'Gauri Priyadarshani','teaching','Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(15,'Jimmy Pandey','teaching','Associate Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(16,'Tulika Priyadarshani','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(17,'Mohan Sarkar','teaching','Assistant Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(18,'Chitranjan Yadav','teaching','Assistant Professor','male','2023-08-16 05:40:45','2023-08-16 05:40:45'),(19,'Shushmita Priyadarshani','teaching','Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(20,'Ujjwala Tiwari','teaching','Assistant Professor','female','2023-08-16 05:40:45','2023-08-16 05:40:45'),(21,'Sourav Singh','non-teaching','mis_admin','male','2023-08-16 05:40:45','2023-08-16 05:40:45');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cv_link` text,
  `departmentId` int DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `instructors_ibfk_121` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `instructors_ibfk_122` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (37,NULL,1,1,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(38,NULL,1,2,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(39,NULL,1,3,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(40,NULL,1,4,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(41,NULL,1,5,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(42,NULL,1,6,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(43,NULL,2,7,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(44,NULL,2,8,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(45,NULL,2,9,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(46,NULL,2,10,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(47,NULL,2,11,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(48,NULL,2,12,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(49,NULL,3,13,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(50,NULL,3,14,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(51,NULL,3,15,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(52,NULL,3,16,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(53,NULL,3,17,'2023-08-16 07:02:11','2023-08-16 07:02:11'),(54,NULL,3,18,'2023-08-16 07:02:11','2023-08-16 07:02:11');
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semesters`
--

DROP TABLE IF EXISTS `semesters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semesters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sem_session` varchar(255) NOT NULL,
  `sem_type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sem_no` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semesters`
--

LOCK TABLES `semesters` WRITE;
/*!40000 ALTER TABLE `semesters` DISABLE KEYS */;
INSERT INTO `semesters` VALUES (5,'2020-21','Monsoon','2023-08-16 07:21:18','2023-08-16 07:21:18',1),(6,'2020-21','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',3),(7,'2020-21','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',2),(8,'2021-22','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',1),(9,'2021-22','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',2),(10,'2020-21','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',5),(11,'2020-21','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',4),(12,'2021-22','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',3),(13,'2021-22','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',4),(14,'2020-21','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',7),(15,'2020-21','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',6),(16,'2021-22','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',5),(17,'2021-22','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',6),(18,'2020-21','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',9),(19,'2020-21','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',8),(20,'2021-22','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',7),(21,'2021-22','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',8),(22,'2020-21','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',10),(23,'2021-22','monsoon','2023-08-23 14:03:17','2023-08-23 14:03:17',9),(24,'2021-22','winter','2023-08-23 14:03:17','2023-08-23 14:03:17',10);
/*!40000 ALTER TABLE `semesters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentSubjectRegistrations`
--

DROP TABLE IF EXISTS `studentSubjectRegistrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentSubjectRegistrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marks` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `studentId` int DEFAULT NULL,
  `subOfferingId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studentSubjectRegistrations_subOfferingId_studentId_unique` (`studentId`,`subOfferingId`),
  KEY `subOfferingId` (`subOfferingId`),
  CONSTRAINT `studentSubjectRegistrations_ibfk_11` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `studentSubjectRegistrations_ibfk_12` FOREIGN KEY (`subOfferingId`) REFERENCES `subOfferings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentSubjectRegistrations`
--

LOCK TABLES `studentSubjectRegistrations` WRITE;
/*!40000 ALTER TABLE `studentSubjectRegistrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentSubjectRegistrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(255) NOT NULL,
  `s_name` varchar(255) NOT NULL,
  `year_of_adm` int NOT NULL,
  `gender` varchar(255) NOT NULL,
  `major1` varchar(255) DEFAULT NULL,
  `major2` varchar(255) DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `current_sem` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`),
  UNIQUE KEY `adm_no_2` (`adm_no`),
  UNIQUE KEY `adm_no_3` (`adm_no`),
  UNIQUE KEY `adm_no_4` (`adm_no`),
  UNIQUE KEY `adm_no_5` (`adm_no`),
  UNIQUE KEY `adm_no_6` (`adm_no`),
  UNIQUE KEY `adm_no_7` (`adm_no`),
  UNIQUE KEY `adm_no_8` (`adm_no`),
  UNIQUE KEY `adm_no_9` (`adm_no`),
  UNIQUE KEY `adm_no_10` (`adm_no`),
  UNIQUE KEY `adm_no_11` (`adm_no`),
  UNIQUE KEY `adm_no_12` (`adm_no`),
  UNIQUE KEY `adm_no_13` (`adm_no`),
  UNIQUE KEY `adm_no_14` (`adm_no`),
  UNIQUE KEY `adm_no_15` (`adm_no`),
  UNIQUE KEY `adm_no_16` (`adm_no`),
  UNIQUE KEY `adm_no_17` (`adm_no`),
  UNIQUE KEY `adm_no_18` (`adm_no`),
  UNIQUE KEY `adm_no_19` (`adm_no`),
  UNIQUE KEY `adm_no_20` (`adm_no`),
  UNIQUE KEY `adm_no_21` (`adm_no`),
  UNIQUE KEY `adm_no_22` (`adm_no`),
  UNIQUE KEY `adm_no_23` (`adm_no`),
  UNIQUE KEY `adm_no_24` (`adm_no`),
  UNIQUE KEY `adm_no_25` (`adm_no`),
  UNIQUE KEY `adm_no_26` (`adm_no`),
  UNIQUE KEY `adm_no_27` (`adm_no`),
  UNIQUE KEY `adm_no_28` (`adm_no`),
  UNIQUE KEY `adm_no_29` (`adm_no`),
  UNIQUE KEY `adm_no_30` (`adm_no`),
  UNIQUE KEY `adm_no_31` (`adm_no`),
  UNIQUE KEY `adm_no_32` (`adm_no`),
  UNIQUE KEY `adm_no_33` (`adm_no`),
  UNIQUE KEY `adm_no_34` (`adm_no`),
  UNIQUE KEY `adm_no_35` (`adm_no`),
  UNIQUE KEY `adm_no_36` (`adm_no`),
  UNIQUE KEY `adm_no_37` (`adm_no`),
  UNIQUE KEY `adm_no_38` (`adm_no`),
  UNIQUE KEY `adm_no_39` (`adm_no`),
  UNIQUE KEY `adm_no_40` (`adm_no`),
  UNIQUE KEY `adm_no_41` (`adm_no`),
  UNIQUE KEY `adm_no_42` (`adm_no`),
  UNIQUE KEY `adm_no_43` (`adm_no`),
  UNIQUE KEY `adm_no_44` (`adm_no`),
  UNIQUE KEY `adm_no_45` (`adm_no`),
  UNIQUE KEY `adm_no_46` (`adm_no`),
  UNIQUE KEY `adm_no_47` (`adm_no`),
  UNIQUE KEY `adm_no_48` (`adm_no`),
  UNIQUE KEY `adm_no_49` (`adm_no`),
  UNIQUE KEY `adm_no_50` (`adm_no`),
  UNIQUE KEY `adm_no_51` (`adm_no`),
  UNIQUE KEY `adm_no_52` (`adm_no`),
  UNIQUE KEY `adm_no_53` (`adm_no`),
  UNIQUE KEY `adm_no_54` (`adm_no`),
  UNIQUE KEY `adm_no_55` (`adm_no`),
  UNIQUE KEY `adm_no_56` (`adm_no`),
  UNIQUE KEY `adm_no_57` (`adm_no`),
  UNIQUE KEY `adm_no_58` (`adm_no`),
  UNIQUE KEY `adm_no_59` (`adm_no`),
  UNIQUE KEY `adm_no_60` (`adm_no`),
  KEY `departmentId` (`departmentId`),
  KEY `courseId` (`courseId`),
  KEY `current_sem` (`current_sem`),
  CONSTRAINT `students_ibfk_122` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `students_ibfk_123` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `students_ibfk_124` FOREIGN KEY (`current_sem`) REFERENCES `semesters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'20ME0001','Anil Pandey',2020,'male','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(2,'20ME0002','Sudhanshu Singh',2020,'male','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(3,'20ME0003','Sourav Sarkar',2020,'male','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(4,'20ME0004','Jasmine Anand',2020,'female','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(5,'20ME0005','Saransh Soni',2020,'male','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(6,'20ME0006','Leela Tiwari',2020,'female','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(7,'20ME0007','Badal Rai',2020,'male','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(8,'20ME0008','Deepak Kumar',2020,'male','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(9,'20ME0009','Tushar Rai',2020,'male','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(10,'20ME0010','Vamika Agarwal',2020,'female','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(11,'20ME0011','Lalit Sarkar',2020,'male','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(12,'20ME0012','Jasmine Verma',2020,'female','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(13,'21ME0001','Preeti Bharti',2021,'female','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(14,'21ME0002','Bhumika Agarwal',2021,'female','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(15,'21ME0003','Saransh Singh',2021,'male','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(16,'21ME0004','Kunal Rai',2021,'male','CSE',NULL,1,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(17,'21ME0005','Punit Rai',2021,'male','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(18,'21ME0006','Mohan Yadav',2021,'male','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(19,'21ME0007','Roshani Kumari',2021,'female','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(20,'21ME0008','Rishi Gupta',2021,'male','EE',NULL,2,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(21,'21ME0009','Haricharan Rai',2021,'male','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(22,'21ME0010','Parimal Raj',2021,'male','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(23,'21ME0011','Leela Anand',2021,'female','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5),(24,'21ME0012','Kirti Bharti',2021,'female','ECE',NULL,3,1,'2023-08-16 07:21:18','2023-08-16 07:21:18',5);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subOfferings`
--

DROP TABLE IF EXISTS `subOfferings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subOfferings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sem_no` int NOT NULL,
  `subjectId` int DEFAULT NULL,
  `semesterId` int DEFAULT NULL,
  `instructorId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subOfferings_semesterId_subjectId_unique` (`subjectId`,`semesterId`),
  KEY `semesterId` (`semesterId`),
  KEY `instructorId` (`instructorId`),
  CONSTRAINT `subOfferings_ibfk_16` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subOfferings_ibfk_17` FOREIGN KEY (`semesterId`) REFERENCES `semesters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subOfferings_ibfk_18` FOREIGN KEY (`instructorId`) REFERENCES `instructors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subOfferings`
--

LOCK TABLES `subOfferings` WRITE;
/*!40000 ALTER TABLE `subOfferings` DISABLE KEYS */;
/*!40000 ALTER TABLE `subOfferings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sub_code` varchar(255) NOT NULL,
  `sub_name` varchar(255) NOT NULL,
  `departmentId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sub_code` (`sub_code`),
  UNIQUE KEY `sub_code_2` (`sub_code`),
  UNIQUE KEY `sub_code_3` (`sub_code`),
  UNIQUE KEY `sub_code_4` (`sub_code`),
  UNIQUE KEY `sub_code_5` (`sub_code`),
  UNIQUE KEY `sub_code_6` (`sub_code`),
  UNIQUE KEY `sub_code_7` (`sub_code`),
  UNIQUE KEY `sub_code_8` (`sub_code`),
  UNIQUE KEY `sub_code_9` (`sub_code`),
  UNIQUE KEY `sub_code_10` (`sub_code`),
  UNIQUE KEY `sub_code_11` (`sub_code`),
  UNIQUE KEY `sub_code_12` (`sub_code`),
  UNIQUE KEY `sub_code_13` (`sub_code`),
  UNIQUE KEY `sub_code_14` (`sub_code`),
  UNIQUE KEY `sub_code_15` (`sub_code`),
  UNIQUE KEY `sub_code_16` (`sub_code`),
  UNIQUE KEY `sub_code_17` (`sub_code`),
  UNIQUE KEY `sub_code_18` (`sub_code`),
  UNIQUE KEY `sub_code_19` (`sub_code`),
  UNIQUE KEY `sub_code_20` (`sub_code`),
  UNIQUE KEY `sub_code_21` (`sub_code`),
  UNIQUE KEY `sub_code_22` (`sub_code`),
  UNIQUE KEY `sub_code_23` (`sub_code`),
  UNIQUE KEY `sub_code_24` (`sub_code`),
  UNIQUE KEY `sub_code_25` (`sub_code`),
  UNIQUE KEY `sub_code_26` (`sub_code`),
  UNIQUE KEY `sub_code_27` (`sub_code`),
  UNIQUE KEY `sub_code_28` (`sub_code`),
  UNIQUE KEY `sub_code_29` (`sub_code`),
  UNIQUE KEY `sub_code_30` (`sub_code`),
  UNIQUE KEY `sub_code_31` (`sub_code`),
  UNIQUE KEY `sub_code_32` (`sub_code`),
  UNIQUE KEY `sub_code_33` (`sub_code`),
  UNIQUE KEY `sub_code_34` (`sub_code`),
  UNIQUE KEY `sub_code_35` (`sub_code`),
  UNIQUE KEY `sub_code_36` (`sub_code`),
  UNIQUE KEY `sub_code_37` (`sub_code`),
  UNIQUE KEY `sub_code_38` (`sub_code`),
  UNIQUE KEY `sub_code_39` (`sub_code`),
  UNIQUE KEY `sub_code_40` (`sub_code`),
  UNIQUE KEY `sub_code_41` (`sub_code`),
  UNIQUE KEY `sub_code_42` (`sub_code`),
  UNIQUE KEY `sub_code_43` (`sub_code`),
  UNIQUE KEY `sub_code_44` (`sub_code`),
  UNIQUE KEY `sub_code_45` (`sub_code`),
  UNIQUE KEY `sub_code_46` (`sub_code`),
  UNIQUE KEY `sub_code_47` (`sub_code`),
  UNIQUE KEY `sub_code_48` (`sub_code`),
  UNIQUE KEY `sub_code_49` (`sub_code`),
  UNIQUE KEY `sub_code_50` (`sub_code`),
  UNIQUE KEY `sub_code_51` (`sub_code`),
  UNIQUE KEY `sub_code_52` (`sub_code`),
  UNIQUE KEY `sub_code_53` (`sub_code`),
  UNIQUE KEY `sub_code_54` (`sub_code`),
  UNIQUE KEY `sub_code_55` (`sub_code`),
  UNIQUE KEY `sub_code_56` (`sub_code`),
  UNIQUE KEY `sub_code_57` (`sub_code`),
  UNIQUE KEY `sub_code_58` (`sub_code`),
  KEY `departmentId` (`departmentId`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'CSC501','Advanced Data Structures and Algorithms',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(2,'CSC502','Advanced Data Structures and Algorithms Lab',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(3,'CSC503','Advanced Database Management System',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(4,'CSC504','Advanced Database Management System Lab',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(5,'CSC505','Theory of Computation',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(6,'CSC506','System Simulation',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(7,'CSC507','System Simulation Lab',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(8,'CSC508','Computer Networks',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(9,'CSC509','Computer Networks Lab',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(10,'CSC510','Cryptography',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(11,'CSC511','Compiler Design',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(12,'CSC512','Compiler Design Lab',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(13,'CSC513','Distributed Operating System',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(14,'CSC5014','Parallel and Distributed Computing',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(15,'CSC515','Grap Theory',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(16,'CSC516','Advanced Discrete Mathemaitcs',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(17,'CSC517','Computer Graphics',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(18,'CSC518','Computer Graphics Lab',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(19,'CSC519','Computer Architecture',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(20,'CSC520','Computer Organization',1,'2023-08-21 06:02:22','2023-08-21 06:02:22'),(21,'EEC501','Electrical Machines I',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(22,'EEC502','Electrical Measurements',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(23,'EEC503','Control System Engineering',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(24,'EEC504','Power System Engineering',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(25,'EEC505','Control and Measurement Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(26,'EEC506','Electrical Machines and Power Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(27,'EEC507','Modelling of Electrical Machines',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(28,'EEC508','Advanced Control Systems',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(29,'EEC509','Industrial Instrumentation',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(30,'EEC510','Advanced Electrical Machine Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(31,'EEC511','Advanced Power System Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(32,'EEC512','Power Electronic Converters',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(33,'EEC513','Power System Analysic',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(34,'EEC514','Advanced Power System Simulation Lab',2,'2023-08-22 06:13:30','2023-08-22 08:44:07'),(35,'EEC515','Advanced Power System Protection Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(36,'EEC516','Renewable Energy Resources',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(37,'EEC517','Soft Computing Techniques',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(38,'EEC518','Electrical Measurement Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(39,'EEC519','Industrial Instrumentation Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(40,'EEC520','Soft Computing Lab',2,'2023-08-22 06:13:30','2023-08-22 06:13:30'),(41,'ECC501','Electronic Devices',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(42,'ECC502','Signals and Network',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(43,'ECC503','Digital Circuits and System Design',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(44,'ECC504','Digital System Design Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(45,'ECC505','Signals and Network Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(46,'ECC506','Principles of Communication System',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(47,'ECC507','Digital Signal Processing',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(48,'ECC508','VLSI Design',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(49,'ECC509','Digital Signal Processing Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(50,'ECC510','Communication System Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(51,'ECC511','Analog Circuits',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(52,'ECC512','Electromagnetic Theory',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(53,'ECC513','Control Systems',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(54,'ECC514','Microprocessors and Microcontrollers',3,'2023-08-22 06:34:35','2023-08-22 08:45:31'),(55,'ECC515','Electronic Devices and Circuits Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(56,'ECC516','Microprocessors and Microcontrollers Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(57,'ECC517','Embedded Systems',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(58,'ECC518','Embedded Systems Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(59,'ECC519','Microwave Engineering',3,'2023-08-22 06:34:35','2023-08-22 06:34:35'),(60,'ECC520','Microwave Engineering Lab',3,'2023-08-22 06:34:35','2023-08-22 06:34:35');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `passcode` text NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `refresh_token` text,
  `employeeId` int DEFAULT NULL,
  `studentId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_name_2` (`user_name`),
  UNIQUE KEY `user_name_3` (`user_name`),
  UNIQUE KEY `user_name_4` (`user_name`),
  UNIQUE KEY `user_name_5` (`user_name`),
  UNIQUE KEY `user_name_6` (`user_name`),
  UNIQUE KEY `user_name_7` (`user_name`),
  UNIQUE KEY `user_name_8` (`user_name`),
  UNIQUE KEY `user_name_9` (`user_name`),
  UNIQUE KEY `user_name_10` (`user_name`),
  UNIQUE KEY `user_name_11` (`user_name`),
  UNIQUE KEY `user_name_12` (`user_name`),
  UNIQUE KEY `user_name_13` (`user_name`),
  UNIQUE KEY `user_name_14` (`user_name`),
  UNIQUE KEY `user_name_15` (`user_name`),
  UNIQUE KEY `user_name_16` (`user_name`),
  UNIQUE KEY `user_name_17` (`user_name`),
  UNIQUE KEY `user_name_18` (`user_name`),
  UNIQUE KEY `user_name_19` (`user_name`),
  UNIQUE KEY `user_name_20` (`user_name`),
  UNIQUE KEY `user_name_21` (`user_name`),
  UNIQUE KEY `user_name_22` (`user_name`),
  UNIQUE KEY `user_name_23` (`user_name`),
  UNIQUE KEY `user_name_24` (`user_name`),
  UNIQUE KEY `user_name_25` (`user_name`),
  UNIQUE KEY `user_name_26` (`user_name`),
  UNIQUE KEY `user_name_27` (`user_name`),
  UNIQUE KEY `user_name_28` (`user_name`),
  UNIQUE KEY `user_name_29` (`user_name`),
  UNIQUE KEY `user_name_30` (`user_name`),
  UNIQUE KEY `user_name_31` (`user_name`),
  UNIQUE KEY `user_name_32` (`user_name`),
  UNIQUE KEY `user_name_33` (`user_name`),
  UNIQUE KEY `user_name_34` (`user_name`),
  UNIQUE KEY `user_name_35` (`user_name`),
  UNIQUE KEY `user_name_36` (`user_name`),
  UNIQUE KEY `user_name_37` (`user_name`),
  UNIQUE KEY `user_name_38` (`user_name`),
  UNIQUE KEY `user_name_39` (`user_name`),
  UNIQUE KEY `user_name_40` (`user_name`),
  UNIQUE KEY `user_name_41` (`user_name`),
  UNIQUE KEY `user_name_42` (`user_name`),
  UNIQUE KEY `user_name_43` (`user_name`),
  UNIQUE KEY `user_name_44` (`user_name`),
  UNIQUE KEY `user_name_45` (`user_name`),
  UNIQUE KEY `user_name_46` (`user_name`),
  UNIQUE KEY `user_name_47` (`user_name`),
  UNIQUE KEY `user_name_48` (`user_name`),
  UNIQUE KEY `user_name_49` (`user_name`),
  UNIQUE KEY `user_name_50` (`user_name`),
  UNIQUE KEY `user_name_51` (`user_name`),
  UNIQUE KEY `user_name_52` (`user_name`),
  UNIQUE KEY `user_name_53` (`user_name`),
  UNIQUE KEY `user_name_54` (`user_name`),
  UNIQUE KEY `user_name_55` (`user_name`),
  UNIQUE KEY `user_name_56` (`user_name`),
  UNIQUE KEY `user_name_57` (`user_name`),
  UNIQUE KEY `user_name_58` (`user_name`),
  KEY `employeeId` (`employeeId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `users_ibfk_115` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_116` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ssrv23','$2b$10$aD.0V.M3D/17ulxHn4O9net.oQxVexQH7SryH3mfBrfObYLSkcQsa','Admin','employee','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5SnBaQ0k2TVN3aWFXRjBJam94TmpreU56azVNelE0ZlEuaWpXUVVmNTJ1aEhwTGVMQndNbHNyWnI3WWVvYmw0X2RFQXZlYXppQUtLQSIsInVzZXJfbmFtZSI6InNzcnYyMyIsImlhdCI6MTY5Mjc5OTM0OCwiZXhwIjoxNjkyODg1NzQ4fQ.DVMARD6h_YsZiL58MlsvbGtaSk0AptQYvPbRrW3KtZU',21,NULL,'2023-08-16 05:41:55','2023-08-23 14:02:28'),(2,'ashishRaj','$2b$10$WFg9XnFwWI/Rr4DE0SP3FuUUrmbessGBM0X6VFZw7OX/5u1nQHHUm','Instructor','employee',NULL,1,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(3,'Sarojini Agarwal','$2b$10$zDZEXinU7rlI3AW1pvgLi.RaMEfDyL5ZhVaWSW3U7Guhf8darNypK','Instructor','employee',NULL,2,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(4,'jimmySingh','$2b$10$utrqbOh5QrOgm.Wznlphpe4O4AJK3dFosNmpogyxdLYNc4m8TqduW','Instructor','employee',NULL,3,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(5,'bhumikaRani','$2b$10$rj9BzpKGsy7fDOmsopNbYebHd6LATT9OlYno4W0g2TmvsRL7AeK.a','Instructor','employee',NULL,4,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(6,'vickeySoni','$2b$10$MUdCkCFw6I.VSvefl2fCT.KkCKt3ClnG/OZPTxsEmbNmpX4CGyewq','Instructor','employee',NULL,6,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(7,'gauriBharti','$2b$10$Jczhm6vAUz2jeX2mtDimJeaA6vzUiGG8Mv/a3aryINiHDF5dFtAgy','Instructor','employee',NULL,5,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(8,'govindSarkar','$2b$10$pY1qcXzVupdSDhBM9ABSQeGfpkn1gJ.oiZmxlJ/W4KxfYG97yz1Ky','Instructor','employee',NULL,7,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(9,'ujjwala','$2b$10$3DKLP2.eMJc.E8Fc2oDMYupVTCAJTLzLV.fOK2AsE1S0P0QQ59RpK','Instructor','employee',NULL,8,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(10,'ishitaAnand','$2b$10$ydZJ2CeI9.5fnZyPhlD4k.nWLEova.YOW4ANT3zYza17b2RRdIXPi','Instructor','employee',NULL,9,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(11,'anjaliSingh','$2b$10$SfGAXwwZ96bvMOpGHSy3fub9cpUJYu7TjSt1eyteHLbXTDGC0X52C','Instructor','employee',NULL,10,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(12,'ishitaAgarwal','$2b$10$Va4GC2ZMHTlf/EC5s/AVQOEVxn.OJtPdjFoGgJEQLsG.S/OCBei7O','Instructor','employee',NULL,11,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(13,'neelamAgarwal','$2b$10$u6EwJhePa98NvKoRI.OQYOevVidH7Lhd9KYe/3Vq3JXo4r9fD5Jyy','Instructor','employee',NULL,12,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(14,'ishitaBharti','$2b$10$ksedR/DgTUum6PQoGWUSJeBc9WS6LO8ZEH1opaqdc/2um4THaajU.','Instructor','employee',NULL,13,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(15,'gauriPriyadarshani','$2b$10$8tYWfgXtdLM5MrU2VzuWSutc1OTrvfUQbSYDg3tpnabVkOS8wX.UW','Instructor','employee',NULL,14,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(16,'jimmyPandey','$2b$10$u8xppcVFa8UrMNngSNacRuDQw2vvmTqZYubHycMtBC4K17alT1qrW','Instructor','employee',NULL,15,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(17,'tulikaPriyadarshani','$2b$10$tz9Annpc9f9WtXFqivWHxuwmbs5eOO//6ZalVcgM/GQsWfDUhwh4C','Instructor','employee',NULL,16,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(18,'mohanSarkar','$2b$10$otNw.6KcdsSHm2KHZUXiyucyQTpaIwjijFAMDNHGxmkzb40SxI6Qm','Instructor','employee',NULL,17,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(19,'chitranjanYadav','$2b$10$oaHF5a/b65hGIvpmuMn44Ofr9lLWGaxhuKTLctXyWYSO6Zmrbb76i','Instructor','employee',NULL,18,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(20,'shushmitaPriyadarshani','$2b$10$ft4gD9K6oss/mjm.QvIG1emfMSl.Mie6oArpOjgqKIWUj3wEgHD4K','Instructor','employee',NULL,19,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(21,'ujjwalatiwari','$2b$10$wmDnn6IKLiJ69GwcbxdV/.3f9e4WbGpwdPpMOUeVHkrrPwNpjvGG.','Instructor','employee',NULL,20,NULL,'2023-08-16 05:41:55','2023-08-16 05:41:55'),(22,'hod_cse','$2b$10$e4YSpgXuvUgUURZsOtjz6uuUUuio6.Vk6QgccFXh/ZKdNJIOlwEEK','HOD','employee','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5SnBaQ0k2TWpJc0ltbGhkQ0k2TVRZNU1qYzNNVE00T0gwLkZRSTZvN3dQSEVfQ1JKcFdxc3FLVkZ6OWlLSDFaWmM3TzdxVU1mck5XeEEiLCJ1c2VyX25hbWUiOiJob2RfY3NlIiwiaWF0IjoxNjkyNzcxMzg4LCJleHAiOjE2OTI4NTc3ODh9.8Z4vhR0RUyiG8lApei0C7UQmyJXKdwO5ncVkVCzkW4c',1,NULL,'2023-08-18 08:55:30','2023-08-23 06:16:28'),(23,'hod_ee','$2b$10$qzMyaWOet1KjctyjT4mqu.htXOD6d.Z9QwCoCsbhSNU7FmmW/SN2O','HOD','employee','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5SnBaQ0k2TWpNc0ltbGhkQ0k2TVRZNU1qYzNNVFEwTUgwLjE1TVJwYlVVTU1zSDlPY1FQclY1TDdTNDJYelhSR0hNOURBR3l5dU42MkkiLCJ1c2VyX25hbWUiOiJob2RfZWUiLCJpYXQiOjE2OTI3NzE0NDAsImV4cCI6MTY5Mjg1Nzg0MH0.GyYxR88rTODbyb-JG_ZBrKj2gu_2sPOzaTIX6zvuIGI',7,NULL,'2023-08-18 08:55:30','2023-08-23 06:17:20'),(24,'hod_ece','$2b$10$lWPor4KRDmUrio.F1dLQn.A0Ik.DMWcpc0rJVtaXZIDOvWE/6qvvS','HOD','employee','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5SnBaQ0k2TWpRc0ltbGhkQ0k2TVRZNU1qYzNNVFE0T1gwLnZVd0RtMnRLVUdnSzlqcXlpT1NEa3FpQUN2SG1oSXYwYWwtSlp5OTNpc3ciLCJ1c2VyX25hbWUiOiJob2RfZWNlIiwiaWF0IjoxNjkyNzcxNDg5LCJleHAiOjE2OTI4NTc4ODl9.XZsVx_M-Wjf7uClIWsKJnxpYDyfkCh2-QmFkkoCW7eU',18,NULL,'2023-08-18 08:55:30','2023-08-23 06:18:09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-23 19:56:43
