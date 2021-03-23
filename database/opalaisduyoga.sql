-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mer 02 Octobre 2019 à 16:56
-- Version du serveur :  5.7.24-0ubuntu0.16.04.1
-- Version de PHP :  7.2.11-4+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `opalaisduyoga`
--

-- --------------------------------------------------------

--
-- Structure de la table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `level` enum('n','i','a') NOT NULL DEFAULT 'n',
  `place` varchar(255) NOT NULL,
  `cost` float DEFAULT NULL,
  `capacity` int(11) NOT NULL,
  `participants` int(11) DEFAULT '0',
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacherId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `courseUsers`
--

CREATE TABLE `courseUsers` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `bio` text,
  `website` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `prices` text,
  `show` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `healingConditions` text,
  `medicalCertificateUrl` varchar(255) DEFAULT NULL,
  `status` enum('p','a','s') NOT NULL DEFAULT 'p',
  `token` varchar(255) DEFAULT NULL,
  `resetTokenExpiresAt` datetime DEFAULT NULL,
  `lastConnectedAt` datetime DEFAULT NULL,
  `role` enum('s','t','a') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phone`, `password`, `avatarUrl`, `healingConditions`, `medicalCertificateUrl`, `status`, `token`, `resetTokenExpiresAt`, `lastConnectedAt`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Alexandre', 'Videcoq', 'admin@yoga.com', '0684759635', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://i.pravatar.cc/300', NULL, NULL, 'p', NULL, NULL, NULL, 'a', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(2, 'Chloé', 'Blanchard', 'Justine51@gmail.com', '0505471257', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/johndezember/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(3, 'Alexis', 'Arnaud', 'Jeanne_Denis@gmail.com', '+33 503304700', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(4, 'Mael', 'Bourgeois', 'Mathis_Lucas@gmail.com', '+33 695662506', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/cdharrison/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(5, 'Mathéo', 'Meyer', 'Nomie.Chevalier68@hotmail.fr', '+33 646910151', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/anasnakawa/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(6, 'Quentin', 'Pierre', 'Axel_Riviere51@hotmail.fr', '0490534651', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/derekebradley/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(7, 'Charlotte', 'Blanc', 'Paul.Leclercq@yahoo.fr', '0318775420', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/stayuber/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(8, 'Laura', 'Robin', 'Benjamin.Martin93@gmail.com', '+33 510168843', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/runningskull/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(9, 'Clara', 'Hubert', 'Juliette20@yahoo.fr', '+33 333860803', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/tomaslau/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(10, 'Sarah', 'Legrand', 'Pauline_Robin11@yahoo.fr', '0607735758', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/we_social/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(11, 'Lena', 'Breton', 'Adam.Baron@gmail.com', '+33 284400186', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/alessandroribe/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(12, 'Noah', 'Dupuis', 'Ocane.Caron@gmail.com', '+33 497953809', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/herkulano/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(13, 'Clément', 'Dufour', 'Jade79@hotmail.fr', '+33 222316977', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/to_soham/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(14, 'Pauline', 'Gaillard', 'Marie_Roux@hotmail.fr', '0371566251', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/phillapier/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(15, 'Louna', 'Rodriguez', 'Lou60@gmail.com', '+33 679518197', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/cdharrison/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(16, 'Chloé', 'Breton', 'Alice_Leclerc34@gmail.com', '+33 103568532', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/lu4sh1i/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(17, 'Alice', 'Roche', 'Julien_Joly46@yahoo.fr', '+33 118101606', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/carlosjgsousa/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(18, 'Adrien', 'Carpentier', 'Jules.Lemaire@hotmail.fr', '+33 474651950', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/aio___/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(19, 'Jules', 'Nguyen', 'Julien_Olivier91@gmail.com', '0796438400', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(20, 'Mattéo', 'Leclercq', 'Lisa.Berger@hotmail.fr', '0126366849', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/tomaslau/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(21, 'Sarah', 'Boyer', 'Alexandre_Collet8@hotmail.fr', '+33 767243995', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/ninjad3m0/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(22, 'Justine', 'Philippe', 'Julie_Vidal@gmail.com', '0320091614', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/de_ascanio/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(23, 'Alicia', 'Charles', 'Mathilde94@yahoo.fr', '+33 304983892', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/anasnakawa/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(24, 'Noémie', 'Garnier', 'Clara.Pons@hotmail.fr', '0763887105', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/scott_riley/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(25, 'Clément', 'Fleury', 'Romane_Roux97@yahoo.fr', '0548887419', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/vikashpathak18/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(26, 'Gabriel', 'Lopez', 'Alice.Bernard99@yahoo.fr', '0464091166', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/christianoliff/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(27, 'Camille', 'Rodriguez', 'Paul_Carpentier@yahoo.fr', '+33 264479466', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/mhaligowski/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(28, 'Arthur', 'Picard', 'Louis89@hotmail.fr', '+33 785978386', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/airskylar/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(29, 'Thomas', 'Colin', 'Julien91@hotmail.fr', '+33 708903310', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/yesmeck/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(30, 'Mattéo', 'Dupuis', 'Mathis.Bertrand79@gmail.com', '+33 269010246', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/kojourin/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(31, 'Manon', 'Menard', 'Ocane37@yahoo.fr', '0528429119', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/marklamb/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(32, 'Nathan', 'Rolland', 'Lucas_Fernandez@hotmail.fr', '+33 748353164', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/ryandownie/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(33, 'Quentin', 'Aubert', 'Ocane_Baron58@gmail.com', '0317914225', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/elliotnolten/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(34, 'Célia', 'Schneider', 'Charlotte99@yahoo.fr', '0587497761', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/joaoedumedeiros/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(35, 'Evan', 'Paul', 'Thomas_Leroux68@gmail.com', '0591735922', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/michaelabehsera/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(36, 'Noah', 'Nicolas', 'Julien.Renaud@hotmail.fr', '+33 396859417', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/dahparra/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(37, 'Justine', 'Fleury', 'Nicolas.Rodriguez@gmail.com', '+33 175125538', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(38, 'Ambre', 'Noel', 'Zoe59@yahoo.fr', '0476856325', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/ManikRathee/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(39, 'Lucas', 'Rousseau', 'Julien.Perrot@gmail.com', '+33 458385307', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/lvovenok/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(40, 'Clara', 'Dupuis', 'Quentin_Marchal@hotmail.fr', '0507142455', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/meelford/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(41, 'Noa', 'Guillaume', 'Lisa53@gmail.com', '+33 290133708', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/osmond/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(42, 'Maëlys', 'Vidal', 'Elisa66@gmail.com', '+33 167777437', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/artd_sign/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(43, 'Jade', 'Renaud', 'Tho2@gmail.com', '+33 370802214', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/hai_ninh_nguyen/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(44, 'Adam', 'Guillot', 'Enzo_Olivier@hotmail.fr', '0582235502', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/kolsvein/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(45, 'Noémie', 'Masson', 'Adam89@gmail.com', '+33 313373548', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/cyril_gaillard/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(46, 'Célia', 'Guillot', 'Louise_Lemaire@gmail.com', '0524377388', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/nomidesigns/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(47, 'Lisa', 'Sanchez', 'Gabriel25@yahoo.fr', '+33 580049866', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/ManikRathee/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(48, 'Alice', 'Petit', 'Anas_Mercier56@hotmail.fr', '0619472982', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/michaelcolenso/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(49, 'Jeanne', 'David', 'Valentin42@yahoo.fr', '0119555587', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/IsaryAmairani/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(50, 'Lena', 'Cousin', 'Jade70@yahoo.fr', '0429780036', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/allfordesign/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(51, 'Emilie', 'Garnier', 'Julie_Legall43@hotmail.fr', '0342373766', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(52, 'Maëlys', 'Roger', 'Lilou6@gmail.com', '+33 206733397', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/ripplemdk/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(53, 'Adam', 'Lacroix', 'Sacha_Deschamps46@gmail.com', '+33 721263425', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/larrybolt/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(54, 'Kylian', 'Caron', 'Chlo16@gmail.com', '+33 341044628', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/stephcoue/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(55, 'Romane', 'Garcia', 'Arthur.Deschamps@hotmail.fr', '0163558136', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/herbigt/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(56, 'Noa', 'Louis', 'Gabriel.Fleury97@yahoo.fr', '0751598623', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/kylefrost/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(57, 'Tom', 'Nguyen', 'Arthur_Paris65@gmail.com', '+33 288422868', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/raquelwilson/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(58, 'Manon', 'Colin', 'Noa.Fleury13@gmail.com', '+33 313589366', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/id835559/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(59, 'Mathis', 'Robin', 'Carla.Duval61@gmail.com', '+33 278072660', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/marlinjayakody/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(60, 'Carla', 'Pierre', 'Ambre_Fournier37@yahoo.fr', '+33 520115692', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/kosmar/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(61, 'Manon', 'Adam', 'Lola_Gautier@yahoo.fr', '0523762890', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/justinrgraham/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(62, 'Sacha', 'Lambert', 'Mlissa_Baron@hotmail.fr', '0135054238', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/cicerobr/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(63, 'Sarah', 'Mercier', 'Charlotte.Maillard@hotmail.fr', '0655358193', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/leehambley/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(64, 'Hugo', 'Lacroix', 'Matho_Noel32@gmail.com', '0602859834', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/jeffgolenski/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:54', '2019-10-02 14:50:54'),
(65, 'Jade', 'Lemaire', 'Clara.Roche@yahoo.fr', '0178417575', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/curiousoffice/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(66, 'Carla', 'Nicolas', 'Raphal.Jacquet2@yahoo.fr', '0504585474', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/oktayelipek/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(67, 'Lina', 'Gaillard', 'Clmence65@gmail.com', '+33 199676858', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/yesmeck/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(68, 'Charlotte', 'Lacroix', 'Clmence_Roux@yahoo.fr', '+33 341422522', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/smalonso/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(69, 'Mélissa', 'Lefevre', 'Benjamin97@hotmail.fr', '+33 290675700', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/xadhix/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(70, 'Baptiste', 'Brun', 'Jeanne_Fernandez82@gmail.com', '+33 336446760', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/adityasutomo/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(71, 'Carla', 'Schneider', 'Alice.Pierre@hotmail.fr', '0686506788', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/clubb3rry/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(72, 'Antoine', 'Perrot', 'Lucie.Louis@yahoo.fr', '0447593560', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/salleedesign/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(73, 'Juliette', 'Benoit', 'Lo.Martinez@hotmail.fr', '+33 691624331', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/thewillbeard/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(74, 'Thomas', 'Picard', 'Victor65@yahoo.fr', '+33 349933677', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/nicollerich/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(75, 'Eva', 'Guillot', 'Jules71@gmail.com', '+33 640668468', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/lokesh_coder/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(76, 'Ambre', 'Huet', 'Louna84@yahoo.fr', '+33 215392668', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/nateschulte/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(77, 'Adrien', 'Benoit', 'Gabriel_Gonzalez@gmail.com', '0775608170', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/chadengle/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(78, 'Lucie', 'Dumont', 'Gabriel_Muller71@gmail.com', '+33 440746015', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/bereto/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(79, 'Axel', 'Charles', 'Noa33@hotmail.fr', '+33 462269023', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/bolzanmarco/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(80, 'Arthur', 'Noel', 'Eva.Moreau23@hotmail.fr', '+33 765129086', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/lawlbwoy/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(81, 'Nathan', 'Brunet', 'Yanis_Marchand99@hotmail.fr', '+33 630431898', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/andrewabogado/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(82, 'Ines', 'Pierre', 'Matto.Marty@yahoo.fr', '0583898931', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/superoutman/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(83, 'Lena', 'Dupuy', 'La.Baron@hotmail.fr', '0205588237', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/mrmartineau/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(84, 'Maëlys', 'Marchal', 'Clment12@gmail.com', '0619355549', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/cocolero/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(85, 'Louna', 'Moreau', 'Alice56@gmail.com', '+33 679965738', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/fabbianz/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(86, 'Louna', 'Hubert', 'Juliette_Renault45@hotmail.fr', '0422306071', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/emmandenn/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(87, 'Théo', 'Philippe', 'Valentin.Gerard@hotmail.fr', '0456931674', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/nellleo/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(88, 'Alicia', 'Schneider', 'Lena.Michel90@hotmail.fr', '+33 502503624', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/joshmedeski/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(89, 'Pauline', 'Deschamps', 'Julie.Paul@gmail.com', '+33 406048862', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/bagawarman/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(90, 'Jade', 'Girard', 'Maxime_Schneider31@gmail.com', '+33 599413543', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/brandclay/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(91, 'Jeanne', 'Bonnet', 'Lisa_Brunet@hotmail.fr', '+33 168184445', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/peterlandt/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(92, 'Alice', 'Gautier', 'Baptiste32@yahoo.fr', '+33 566569961', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/carlosjgsousa/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(93, 'Hugo', 'Aubert', 'Mael13@gmail.com', '0633126775', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/Talbi_ConSept/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(94, 'Carla', 'Martin', 'Ambre_Vidal@yahoo.fr', '+33 543020001', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(95, 'Mattéo', 'Deschamps', 'Nomie.Meyer60@yahoo.fr', '+33 182982047', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/oskamaya/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(96, 'Léa', 'Hubert', 'Jeanne.Dufour@gmail.com', '+33 720293268', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/katiemdaly/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(97, 'Jeanne', 'Bonnet', 'Lina.Gerard30@gmail.com', '0383121932', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/joannefournier/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(98, 'Evan', 'Legrand', 'Laura62@gmail.com', '+33 610766349', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/cdharrison/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(99, 'Louise', 'Martinez', 'Elisa.Adam@hotmail.fr', '0488908814', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/ky/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(100, 'Baptiste', 'Charpentier', 'Axel_Lefebvre97@gmail.com', '+33 504001217', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/anasnakawa/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(101, 'Ambre', 'Denis', 'Carla_Giraud@hotmail.fr', '+33 120712436', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/joemdesign/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 's', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(102, 'Maëlle', 'Martin', 'Juliette10@hotmail.fr', '+33 214119828', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/panchajanyag/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(103, 'Mathis', 'Masson', 'Louis.Dufour39@yahoo.fr', '0544794538', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/divya/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(104, 'Pierre', 'Poirier', 'Lisa_Lucas@yahoo.fr', '0627395858', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(105, 'Lena', 'Vincent', 'Lisa.Bernard13@yahoo.fr', '+33 169069625', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/oskamaya/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(106, 'Clément', 'Aubry', 'Alice.Faure@yahoo.fr', '0145727624', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/balintorosz/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(107, 'Thomas', 'Leroux', 'Quentin_Cousin@hotmail.fr', '0367529301', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/karalek/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(108, 'Adam', 'Lecomte', 'Thomas20@gmail.com', '+33 105771200', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/lvovenok/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(109, 'Mélissa', 'Deschamps', 'Lena_Barre@gmail.com', '+33 714685580', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/antongenkin/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(110, 'Maxime', 'Renard', 'Matto22@yahoo.fr', '0239835347', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/gcmorley/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55'),
(111, 'Benjamin', 'Berger', 'Paul.Adam@hotmail.fr', '0464574423', '$2a$12$6VxtFFleCSPmLyYhT8S/hevKCxjVXxOwyjj6rasf39ggS8YVMc8k.', 'https://s3.amazonaws.com/uifaces/faces/twitter/antonyryndya/128.jpg', NULL, NULL, 'p', NULL, NULL, NULL, 't', '2019-10-02 14:50:55', '2019-10-02 14:50:55');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherId` (`teacherId`);

--
-- Index pour la table `courseUsers`
--
ALTER TABLE `courseUsers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courseUsers_courseId_userId_unique` (`userId`,`courseId`),
  ADD KEY `courseId` (`courseId`);

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `courseUsers`
--
ALTER TABLE `courseUsers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `courseUsers`
--
ALTER TABLE `courseUsers`
  ADD CONSTRAINT `courseUsers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courseUsers_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
