-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 05 Janvier 2017 à 11:57
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `dv_portal_db`
--

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `admin_pt_sessions_view`
--
CREATE TABLE IF NOT EXISTS `admin_pt_sessions_view` (
`sessionID` int(11)
,`plannedTrainingID` int(11)
,`startTS` timestamp
,`endTS` timestamp
,`town` varchar(255)
,`site` varchar(255)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `admin_pt_users_view`
--
CREATE TABLE IF NOT EXISTS `admin_pt_users_view` (
`cuid` varchar(10)
,`trainingTaken` bit(1)
,`plannedTrainingID` int(11)
,`startDate` timestamp
,`endDate` timestamp
,`sessionDuration` int(11)
,`training_name` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`gender` bit(1)
,`service` varchar(50)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `admin_quiz_takers_view`
--
CREATE TABLE IF NOT EXISTS `admin_quiz_takers_view` (
`user_quiz_ID` int(11)
,`cuid` varchar(10)
,`quizID` int(11)
,`dateTakingQuiz` date
,`score` int(11)
,`quizTaken` bit(1)
,`quiz_hidden` bit(1)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`gender` bit(1)
,`region` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `admin_quiz_view`
--
CREATE TABLE IF NOT EXISTS `admin_quiz_view` (
`quizID` int(11)
,`quiz_name` varchar(255)
,`creationDate` date
,`uCreator` varchar(10)
,`plannedTrainingID` int(11)
,`subCategoryID` int(11)
,`quizType` varchar(255)
,`subCategory` varchar(255)
,`creator` varchar(30)
,`num_questions` bigint(21)
,`can_add` int(0)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `admin_session_participants_view`
--
CREATE TABLE IF NOT EXISTS `admin_session_participants_view` (
`cuid` varchar(10)
,`sessionID` int(11)
,`userCurrentPostID` int(11)
,`trainingTaken` bit(1)
,`dateTaken` timestamp
,`firstName` varchar(30)
,`lastName` varchar(30)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `admin_user_current_post_view`
--
CREATE TABLE IF NOT EXISTS `admin_user_current_post_view` (
`assignationDate` date
,`_postID` bigint(11)
,`post_name` varchar(50)
,`cuid` varchar(10)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`usr_img` varchar(255)
);
-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `categoryID` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`categoryID`, `category`) VALUES
(1, 'DATA');

-- --------------------------------------------------------

--
-- Structure de la table `criteria_proposition`
--

CREATE TABLE IF NOT EXISTS `criteria_proposition` (
  `criteriaPropositionID` int(11) NOT NULL AUTO_INCREMENT,
  `criteria_proposition` varchar(255) NOT NULL,
  `evaluationCriteriaID` int(11) NOT NULL,
  PRIMARY KEY (`criteriaPropositionID`),
  KEY `FKCriteria_P359538` (`evaluationCriteriaID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `criteria_proposition`
--

INSERT INTO `criteria_proposition` (`criteriaPropositionID`, `criteria_proposition`, `evaluationCriteriaID`) VALUES
(1, 'Proposition 1', 1),
(2, 'Proposition 2', 1),
(3, 'Proposition 3', 1),
(4, 'Proposition 4', 1),
(5, 'Proposition 1', 2),
(6, 'Proposition 2', 2),
(7, 'Proposition 3', 2),
(8, 'Proposition 4', 2),
(9, 'Proposition 1', 3),
(10, 'Proposition 2', 3),
(11, 'Proposition 3', 3),
(12, 'Proposition 4', 3),
(13, 'Proposition 1', 4),
(14, 'Proposition 2', 4),
(15, 'Proposition 3', 4),
(16, 'Proposition 4', 4),
(17, 'Proposition 1', 5),
(18, 'Proposition 2', 5),
(19, 'Proposition 3', 5),
(20, 'Proposition 4', 5);

-- --------------------------------------------------------

--
-- Structure de la table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `departmentID` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(50) NOT NULL,
  `directionID` int(11) NOT NULL,
  PRIMARY KEY (`departmentID`),
  UNIQUE KEY `department` (`department`),
  KEY `FKDepartment356912` (`directionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Contenu de la table `department`
--

INSERT INTO `department` (`departmentID`, `department`, `directionID`) VALUES
(1, 'BUSINESS DEVELOPPER', 1),
(2, 'BUSINESS DVP & INCLUSION FINANCIERE', 4),
(3, 'CORPORATE', 1),
(4, 'DELEGATION REGIONALE ANEN', 2),
(5, 'DELEGATION REGIONALE Centre/Sud/Est', 2),
(6, 'DELEGATION REGIONALE LISO', 2),
(7, 'DELEGATION REGIONALE ONO', 2),
(8, 'INDIRECT TRADE', 2),
(9, 'MARKETING OPERATIONNEL', 2),
(10, 'SALES SUPPORT', 1),
(11, 'SHOP & FRANCHISE', 2),
(12, 'SME/PME', 1),
(13, 'SUPPORT ET ADM VENTES', 2),
(14, 'DIRECTION', 3),
(15, 'DISTRIBUTION', 3);

-- --------------------------------------------------------

--
-- Structure de la table `direction`
--

CREATE TABLE IF NOT EXISTS `direction` (
  `directionID` int(11) NOT NULL AUTO_INCREMENT,
  `direction` varchar(50) NOT NULL,
  PRIMARY KEY (`directionID`),
  UNIQUE KEY `direction` (`direction`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `direction`
--

INSERT INTO `direction` (`directionID`, `direction`) VALUES
(1, 'DB2B'),
(2, 'DD'),
(3, 'DIRECTION'),
(4, 'DOM');

-- --------------------------------------------------------

--
-- Structure de la table `evaluationform_evaluationcriteria`
--

CREATE TABLE IF NOT EXISTS `evaluationform_evaluationcriteria` (
  `evaluationFormID` int(11) NOT NULL,
  `evaluationCriteriaID` int(11) NOT NULL,
  PRIMARY KEY (`evaluationFormID`,`evaluationCriteriaID`),
  KEY `FKEvaluation100972` (`evaluationFormID`),
  KEY `FKEvaluation807921` (`evaluationCriteriaID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `evaluationform_evaluationcriteria`
--

INSERT INTO `evaluationform_evaluationcriteria` (`evaluationFormID`, `evaluationCriteriaID`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `evaluation_criteria`
--

CREATE TABLE IF NOT EXISTS `evaluation_criteria` (
  `evaluationCriteriaID` int(11) NOT NULL AUTO_INCREMENT,
  `criteria` varchar(255) NOT NULL,
  PRIMARY KEY (`evaluationCriteriaID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `evaluation_criteria`
--

INSERT INTO `evaluation_criteria` (`evaluationCriteriaID`, `criteria`) VALUES
(1, 'Evaluation Criteria 1'),
(2, 'Evaluation Criteria 2'),
(3, 'Evaluation Criteria 3'),
(4, 'Evaluation Criteria 4'),
(5, 'Evaluation Criteria 5');

-- --------------------------------------------------------

--
-- Structure de la table `evaluation_form`
--

CREATE TABLE IF NOT EXISTS `evaluation_form` (
  `evaluationFormID` int(11) NOT NULL AUTO_INCREMENT,
  `formName` varchar(255) NOT NULL,
  PRIMARY KEY (`evaluationFormID`),
  UNIQUE KEY `formName` (`formName`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `evaluation_form`
--

INSERT INTO `evaluation_form` (`evaluationFormID`, `formName`) VALUES
(1, 'Evaluation Report');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `evaluation_form_criteria_view`
--
CREATE TABLE IF NOT EXISTS `evaluation_form_criteria_view` (
`evaluationFormID` int(11)
,`formName` varchar(255)
,`evaluationCriteriaID` int(11)
,`criteria` varchar(255)
,`criteriaPropositionID` int(11)
,`criteria_proposition` varchar(255)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `eval_form_criteria_view`
--
CREATE TABLE IF NOT EXISTS `eval_form_criteria_view` (
`evaluationFormID` int(11)
,`formName` varchar(255)
,`criteria` varchar(255)
,`criteriaPropositionID` int(11)
,`criteria_proposition` varchar(255)
,`evaluationCriteriaID` int(11)
);
-- --------------------------------------------------------

--
-- Structure de la table `external_trainer`
--

CREATE TABLE IF NOT EXISTS `external_trainer` (
  `trainerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `gender` bit(1) NOT NULL,
  PRIMARY KEY (`trainerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `ext_trainers_view`
--
CREATE TABLE IF NOT EXISTS `ext_trainers_view` (
`sessionID` int(11)
,`exTrainerID` int(11)
,`trainerType` bit(1)
,`cuid` varchar(10)
,`firstName` varchar(255)
,`lastName` varchar(255)
,`gender` bit(1)
);
-- --------------------------------------------------------

--
-- Structure de la table `initial_training`
--

CREATE TABLE IF NOT EXISTS `initial_training` (
  `postID` int(11) NOT NULL,
  `trainingID` int(11) NOT NULL,
  PRIMARY KEY (`postID`,`trainingID`),
  KEY `FKInitial_Tr37515` (`postID`),
  KEY `FKInitial_Tr864659` (`trainingID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `initial_training`
--

INSERT INTO `initial_training` (`postID`, `trainingID`) VALUES
(1, 4),
(1, 5),
(1, 24),
(1, 41),
(2, 3),
(2, 4),
(8, 3),
(8, 37),
(8, 49),
(8, 50);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `int_trainers_view`
--
CREATE TABLE IF NOT EXISTS `int_trainers_view` (
`sessionID` int(11)
,`exTrainerID` int(11)
,`trainerType` bit(1)
,`cuid` varchar(10)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`gender` bit(1)
);
-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE IF NOT EXISTS `notification` (
  `notificationID` int(11) NOT NULL AUTO_INCREMENT,
  `cuid` varchar(10) NOT NULL,
  `message` varchar(255) NOT NULL,
  `isViewed` bit(1) NOT NULL,
  `notificationType` varchar(255) NOT NULL COMMENT '\nSession assignation\nPublic Quiz publication\n ',
  `creationDate` date NOT NULL,
  PRIMARY KEY (`notificationID`),
  KEY `FKNotificati330256` (`cuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `planned_training`
--

CREATE TABLE IF NOT EXISTS `planned_training` (
  `plannedTrainingID` int(11) NOT NULL AUTO_INCREMENT,
  `trainingType` varchar(255) NOT NULL COMMENT '\nMetier\nOffres et Services\nTransverses\n ',
  `transmissionMode` varchar(255) NOT NULL COMMENT '\nPresential\nVideo-Conference\nE-Learning\nTelephone\n ',
  `startDate` timestamp NOT NULL,
  `endDate` timestamp NOT NULL,
  `sessionDuration` int(11) NOT NULL,
  `conferenceNumber` varchar(255) DEFAULT NULL,
  `trainingID` int(11) NOT NULL,
  `trainingCode` varchar(255) NOT NULL,
  `evaluationFormID` int(11) DEFAULT NULL,
  `trainingAudience` varchar(255) NOT NULL COMMENT '\nInternal Training\nExternal Training\n ',
  `creationdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`plannedTrainingID`),
  KEY `FKPlanned_Tr138439` (`trainingID`),
  KEY `FKPlanned_Tr35709` (`evaluationFormID`),
  KEY `idx_planned_training` (`creator`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Contenu de la table `planned_training`
--

INSERT INTO `planned_training` (`plannedTrainingID`, `trainingType`, `transmissionMode`, `startDate`, `endDate`, `sessionDuration`, `conferenceNumber`, `trainingID`, `trainingCode`, `evaluationFormID`, `trainingAudience`, `creationdate`, `creator`) VALUES
(18, 'APPLICATION', 'E-LEARNING', '2016-12-31 07:00:00', '2016-12-31 09:00:00', 2, 'http://google.com', 7, 'ABC2345', NULL, 'INTERNE', '2017-01-03 09:04:08', 'TCBX4728'),
(19, 'MANAGEMENT', 'E-LEARNING', '2016-12-31 07:00:00', '2016-12-31 09:00:00', 2, 'http://google.com/anglais', 49, 'ABC2345', 1, 'INTERNE', '2017-01-03 09:04:08', 'WLJD8430'),
(20, 'METIERS', 'PRESENTIEL', '2017-01-02 07:00:00', '2017-01-02 09:00:00', 2, '0', 24, 'ABC2345', 1, 'INTERNE', '2017-01-03 09:04:08', 'TSKC5238'),
(22, 'TRANSVERSES', 'VIDEO-CONFERENCE', '2017-01-02 07:00:00', '2017-01-02 11:00:00', 2, '7889', 4, 'qsdABC2345', 1, 'INTERNE', '2017-01-03 09:04:08', 'WLJD8430'),
(23, 'OFFRES ET SERVICES', 'PRESENTIEL', '2017-01-03 07:00:00', '2017-01-03 09:00:00', 10, '0', 8, 'ABC2345', 1, 'INTERNE', '2017-01-03 09:24:43', 'RQSJ9562');

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `postID` int(11) NOT NULL AUTO_INCREMENT,
  `post_name` varchar(50) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `serviceID` int(11) NOT NULL,
  PRIMARY KEY (`postID`),
  KEY `FKPost39315` (`serviceID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `post`
--

INSERT INTO `post` (`postID`, `post_name`, `level`, `serviceID`) VALUES
(1, 'Application Developer', 1, 5),
(2, 'DIRECTEUR GENERAL', 1, 20),
(3, 'Soutien Formation', 4, 21),
(4, 'Responsable Formation', 3, 21),
(6, 'Program Management Officer', 2, 20),
(7, 'Responsable Business Intelligence, Pilotage & Sout', 3, 20),
(8, 'Chef Service Ingénierie Opération Support System', 4, 12);

-- --------------------------------------------------------

--
-- Structure de la table `post_user`
--

CREATE TABLE IF NOT EXISTS `post_user` (
  `user_post_id` int(11) NOT NULL AUTO_INCREMENT,
  `postID` int(11) NOT NULL,
  `cuid` varchar(10) NOT NULL,
  `assignationDate` date NOT NULL,
  PRIMARY KEY (`user_post_id`,`postID`,`cuid`),
  UNIQUE KEY `user_post_id` (`user_post_id`),
  KEY `FKPost_User171273` (`cuid`),
  KEY `FKPost_User612219` (`postID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Contenu de la table `post_user`
--

INSERT INTO `post_user` (`user_post_id`, `postID`, `cuid`, `assignationDate`) VALUES
(1, 1, 'GxxQ0172', '2016-12-21'),
(2, 1, 'WLJD8430', '2016-12-21'),
(3, 3, 'BQWQ3370', '2016-12-21'),
(4, 3, 'BQWQ3370', '2016-12-21'),
(5, 2, 'DGJH3510', '2016-12-01'),
(6, 4, 'MDJN0026', '2016-12-01'),
(7, 3, 'RQSJ9562', '2016-12-01'),
(9, 6, 'TSKC5238', '2016-12-01'),
(10, 7, 'TCBX4728', '2016-12-01'),
(11, 1, 'DGJH3510', '2016-11-30'),
(12, 2, 'DGJH3510', '2016-11-29'),
(13, 7, 'KVRZ7896', '2016-12-21'),
(14, 8, 'KVRZ7896', '2016-12-20'),
(15, 1, 'PEPED', '2016-12-21'),
(16, 1, 'BMHB8456', '2016-12-21'),
(17, 1, 'ZMGL6389', '2016-12-21'),
(18, 1, 'TGJW6042', '2016-12-21'),
(19, 3, 'Gxx0172', '2016-12-22'),
(22, 3, 'WLJD8430', '2017-01-20'),
(23, 1, 'WLJD8430', '2017-01-04');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `post_view`
--
CREATE TABLE IF NOT EXISTS `post_view` (
`postID` int(11)
,`post_name` varchar(50)
,`level` int(11)
,`serviceID` int(11)
,`service` varchar(50)
,`departmentID` int(11)
,`department` varchar(50)
,`directionID` int(11)
,`direction` varchar(50)
);
-- --------------------------------------------------------

--
-- Structure de la table `proposition`
--

CREATE TABLE IF NOT EXISTS `proposition` (
  `propositionID` int(11) NOT NULL AUTO_INCREMENT,
  `proposition_title` varchar(255) NOT NULL,
  `questionID` int(11) NOT NULL,
  `isCorrect` int(11) DEFAULT NULL,
  PRIMARY KEY (`propositionID`),
  KEY `FKPropositio705986` (`questionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=67 ;

--
-- Contenu de la table `proposition`
--

INSERT INTO `proposition` (`propositionID`, `proposition_title`, `questionID`, `isCorrect`) VALUES
(48, 'Enter Proposition', 12, 0),
(49, 'Enter Proposition', 12, 0),
(50, 'Enter Proposition', 12, 1),
(51, 'Enter Proposition', 12, 0),
(52, 'Proposition 1', 13, 0),
(53, 'Proposition 2', 13, 1),
(54, 'Proposition 3', 13, 0),
(55, 'Cameroon', 14, 0),
(56, 'South Africa', 14, 1),
(57, '1991', 15, 0),
(58, '1992', 15, 0),
(59, '1960', 15, 1),
(60, '1959', 15, 0),
(61, 'Paul Biya', 16, 0),
(62, 'Amadou Ahidjo', 16, 1),
(63, 'John Ngu Foncha', 16, 0),
(64, '1990', 17, 0),
(65, '1980', 17, 0),
(66, '1972', 17, 1);

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `questionID` int(11) NOT NULL AUTO_INCREMENT,
  `question_title` varchar(255) NOT NULL,
  `quizID` int(11) NOT NULL,
  `question_type` varchar(255) NOT NULL COMMENT 'QCM / Ouvert',
  PRIMARY KEY (`questionID`),
  KEY `FKQuestion124206` (`quizID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `question`
--

INSERT INTO `question` (`questionID`, `question_title`, `quizID`, `question_type`) VALUES
(12, 'Question 1', 6, 'MCQ'),
(13, 'Question 1', 12, 'MCQ'),
(14, 'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQqQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQqQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQqQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', 12, 'MCQ'),
(15, 'In what year did Cameroon gain its independence?', 13, 'MCQ'),
(16, 'Who was the first President of Cameroon?', 13, 'MCQ'),
(17, 'In what year was the referendum for unification organized?', 13, 'MCQ');

-- --------------------------------------------------------

--
-- Structure de la table `quiz`
--

CREATE TABLE IF NOT EXISTS `quiz` (
  `quizID` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_name` varchar(255) NOT NULL,
  `creationDate` date NOT NULL,
  `plannedTrainingID` int(11) DEFAULT NULL,
  `subCategoryID` int(11) NOT NULL,
  `quizType` varchar(255) NOT NULL COMMENT 'Ouvert / Fermé',
  `creator` varchar(10) NOT NULL,
  PRIMARY KEY (`quizID`),
  UNIQUE KEY `quiz_name` (`quiz_name`),
  KEY `FKQuiz687124` (`plannedTrainingID`),
  KEY `FKQuiz795813` (`creator`),
  KEY `FKQuiz953395` (`subCategoryID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Contenu de la table `quiz`
--

INSERT INTO `quiz` (`quizID`, `quiz_name`, `creationDate`, `plannedTrainingID`, `subCategoryID`, `quizType`, `creator`) VALUES
(6, 'Quiz IIII', '2016-12-20', NULL, 1, 'Open', 'WFSDFSD'),
(12, 'Test Quiz', '2017-01-03', NULL, 1, 'Open', 'WLJD8430'),
(13, 'Cameroon History: Intro', '2017-01-05', NULL, 1, 'Open', 'WLJD8430');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `quiz_form_view`
--
CREATE TABLE IF NOT EXISTS `quiz_form_view` (
`quizID` int(11)
,`quiz_name` varchar(255)
,`creationDate` date
,`plannedTrainingID` int(11)
,`subCategoryID` int(11)
,`quizType` varchar(255)
,`questionID` int(11)
,`question_title` varchar(255)
,`question_type` varchar(255)
,`propositionID` int(11)
,`proposition_title` varchar(255)
,`isCorrect` int(11)
);
-- --------------------------------------------------------

--
-- Structure de la table `resource`
--

CREATE TABLE IF NOT EXISTS `resource` (
  `resourceID` int(11) NOT NULL AUTO_INCREMENT,
  `resource_name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `resourceType` varchar(255) NOT NULL COMMENT 'pdf/word doc, a memo, a subscription form',
  `resourceVisibility` bit(1) NOT NULL DEFAULT b'0' COMMENT 'PUBLIC or PRIVATE',
  `num_downloads` int(11) NOT NULL DEFAULT '0',
  `addition_date` date NOT NULL,
  `creator` varchar(10),
  PRIMARY KEY (`resourceID`),
  KEY `idx_resource` (`creator`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `resource`
--

INSERT INTO `resource` (`resourceID`, `resource_name`, `link`, `resourceType`, `resourceVisibility`, `num_downloads`, `addition_date`, `creator`) VALUES
(1, 'Resource 1', 'http://google.com', 'Document', b'1', 4, '2016-12-19', 'DGJH3510'),
(3, 'Management de projet vidéo 1', 'https://www.youtube.com/watch?v=AaVyozm42Rc', 'Video', b'0', 0, '2016-12-23', 'WLJD8430'),
(4, 'management de projet vidéo 2', 'https://www.youtube.com/watch?v=AaVyozm42Rc', 'Video', b'1', 0, '2016-12-23', 'WLJD8430'),
(5, 'management de projet Cours', 'https://www.cairn.info/revue-informations-sociales-2011-5-page-72.htm', 'Document', b'0', 0, '2016-12-23', 'WLJD8430'),
(6, 'Pilotage de projet cours', 'http://gestiondeprojet.pm/pilotage-et-management/', 'Document', b'0', 1, '2016-12-23', 'WLJD8430'),
(7, 'Test Resource', 'http://google.com', 'Video', b'0', 0, '2017-01-03', 'WLJD8430');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `resources_view`
--
CREATE TABLE IF NOT EXISTS `resources_view` (
`resourceID` int(11)
,`link` varchar(255)
,`resourceType` varchar(255)
,`creator` varchar(10)
,`addition_date` date
,`resourceVisibility` bit(1)
,`resource_name` varchar(255)
,`num_downloads` int(11)
);
-- --------------------------------------------------------

--
-- Structure de la table `resource_training`
--

CREATE TABLE IF NOT EXISTS `resource_training` (
  `resourceID` int(11) NOT NULL,
  `plannedtrainingid` int(11) NOT NULL,
  PRIMARY KEY (`resourceID`,`plannedtrainingid`),
  KEY `FKResource_T357364` (`resourceID`),
  KEY `FKResource_T767352` (`plannedtrainingid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `resource_training`
--

INSERT INTO `resource_training` (`resourceID`, `plannedtrainingid`) VALUES
(1, 18),
(1, 19),
(1, 22),
(1, 23),
(3, 18),
(3, 22),
(3, 23),
(4, 18),
(4, 22),
(5, 19),
(5, 22),
(5, 23),
(6, 19),
(6, 22),
(7, 19),
(7, 22);

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `serviceID` int(11) NOT NULL AUTO_INCREMENT,
  `service` varchar(50) NOT NULL,
  `departmentID` int(11) NOT NULL,
  PRIMARY KEY (`serviceID`),
  UNIQUE KEY `service` (`service`),
  KEY `FKService849374` (`departmentID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Contenu de la table `service`
--

INSERT INTO `service` (`serviceID`, `service`, `departmentID`) VALUES
(1, 'ADM VENTES', 13),
(2, 'AGENCE', 7),
(3, 'ASCOM', 10),
(4, 'ASSISTANTE', 7),
(5, 'BUSINESS DVP', 2),
(6, 'CALL BOX', 11),
(7, 'CANAL AGENCE', 11),
(8, 'CANAL O`SHOP', 11),
(9, 'CONTROLE INTERNE', 13),
(10, 'CORPORATE', 3),
(11, 'DEVELOPPER', 1),
(12, 'OPERATION SUIVI DE LA PERFORMANCE', 10),
(13, 'PERFORMANCE', 10),
(14, 'REZOM', 2),
(15, 'SALES SUPPORT', 10),
(16, 'SME/PME', 12),
(17, 'TECHNICO-COMMERCIAUX', 10),
(18, 'TRAINING AND CHANGE', 13),
(19, 'VENTE INDIRECTE', 7),
(20, 'DIRECTION', 14),
(21, 'DISTRIBUTION', 15);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(10) unsigned NOT NULL,
  `data` text,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('465vqwEmqxKdlqmzieBbrtVvsZHLzmLP', 1483625988, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"data":{"email":"christian.nankam@orange.com","cuid":"WLJD8430","firstName":"Happi ","lastName":"Christian","gender":1,"status":"TRAINER","image":"none","iat":1483510709,"exp":1484374709}}'),
('kqUAj-Pc6qP1HyktZ-E4f209xNuRrwVa', 1483695308, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"data":{"email":"christian.nankam@orange.com","cuid":"WLJD8430","firstName":"Happi ","lastName":"Christian","gender":1,"status":"TRAINER","image":"none","iat":1483608741,"exp":1484472741}}'),
('lsmMLB4uIBR7RZIYumVsGJjMvUheDn6s', 1483700098, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"data":{"email":"christian.nankam@orange.com","cuid":"WLJD8430","firstName":"Happi ","lastName":"Christian","gender":1,"status":"TRAINER","image":"none","iat":1483429799,"exp":1484293799}}');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `subs_quiz_view`
--
CREATE TABLE IF NOT EXISTS `subs_quiz_view` (
`dateTakingQuiz` date
,`cuid` varchar(10)
,`score` int(11)
,`quiz_name` varchar(255)
,`creationDate` date
,`quizTaken` bit(1)
);
-- --------------------------------------------------------

--
-- Structure de la table `sub_category`
--

CREATE TABLE IF NOT EXISTS `sub_category` (
  `subCategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `subCategory` varchar(255) NOT NULL,
  `categoryID` int(11) NOT NULL,
  PRIMARY KEY (`subCategoryID`),
  UNIQUE KEY `subCategory` (`subCategory`),
  KEY `FKSub_Catego512632` (`categoryID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `sub_category`
--

INSERT INTO `sub_category` (`subCategoryID`, `subCategory`, `categoryID`) VALUES
(1, '3G', 1);

-- --------------------------------------------------------

--
-- Structure de la table `trainer_trainingsession`
--

CREATE TABLE IF NOT EXISTS `trainer_trainingsession` (
  `trainer_ts_id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionID` int(11) NOT NULL,
  `exTrainerID` int(11) DEFAULT NULL,
  `trainerType` bit(1) NOT NULL,
  `cuid` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`trainer_ts_id`,`sessionID`),
  UNIQUE KEY `trainer_ts_id` (`trainer_ts_id`),
  KEY `FKTrainer_Tr305950` (`sessionID`),
  KEY `FKTrainer_Tr575785` (`exTrainerID`),
  KEY `FKTrainer_Tr948124` (`cuid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Contenu de la table `trainer_trainingsession`
--

INSERT INTO `trainer_trainingsession` (`trainer_ts_id`, `sessionID`, `exTrainerID`, `trainerType`, `cuid`) VALUES
(2, 2, NULL, b'0', 'WLJD8430'),
(3, 3, NULL, b'0', 'GxxQ0172'),
(4, 3, NULL, b'0', 'RQSJ9562'),
(5, 4, NULL, b'0', 'BQWQ3370'),
(6, 4, NULL, b'0', 'RQSJ9562'),
(7, 5, NULL, b'0', 'BQWQ3370'),
(8, 6, NULL, b'0', 'RQSJ9562'),
(9, 7, NULL, b'0', 'GxxQ0172'),
(10, 8, NULL, b'0', 'MDJN0026'),
(11, 8, NULL, b'0', 'RQSJ9562'),
(12, 9, NULL, b'0', 'MDJN0026'),
(13, 9, NULL, b'0', 'TCBX4728'),
(14, 10, NULL, b'0', 'TCBX4728'),
(15, 10, NULL, b'0', 'GxxQ0172'),
(16, 11, NULL, b'0', 'MDJN0026'),
(17, 11, NULL, b'0', 'RQSJ9562'),
(18, 12, NULL, b'0', 'TSKC5238'),
(19, 12, NULL, b'0', 'BQWQ3370'),
(20, 13, NULL, b'0', 'GxxQ0172'),
(21, 13, NULL, b'0', 'RQSJ9562'),
(22, 14, NULL, b'0', 'RQSJ9562'),
(23, 15, NULL, b'0', 'GxxQ0172'),
(24, 16, NULL, b'0', 'RQSJ9562'),
(25, 16, NULL, b'0', 'BQWQ3370'),
(26, 18, NULL, b'0', 'MDJN0026'),
(27, 18, NULL, b'0', 'TCBX4728'),
(28, 19, NULL, b'0', 'RQSJ9562'),
(29, 19, NULL, b'0', 'TCBX4728'),
(30, 20, NULL, b'0', 'RQSJ9562'),
(31, 20, NULL, b'0', 'MDJN0026'),
(32, 21, NULL, b'0', 'RQSJ9562'),
(33, 22, NULL, b'0', 'RQSJ9562'),
(34, 22, NULL, b'0', 'TSKC5238'),
(35, 23, NULL, b'0', 'RQSJ9562'),
(36, 23, NULL, b'0', 'MDJN0026'),
(37, 24, NULL, b'0', 'GxxQ0172'),
(38, 24, NULL, b'0', 'RQSJ9562'),
(39, 25, NULL, b'0', 'TSKC5238'),
(40, 25, NULL, b'0', 'BQWQ3370'),
(41, 28, NULL, b'0', 'GxxQ0172'),
(42, 28, NULL, b'0', 'TCBX4728'),
(43, 29, NULL, b'0', 'GxxQ0172'),
(44, 29, NULL, b'0', 'TCBX4728');

-- --------------------------------------------------------

--
-- Structure de la table `training`
--

CREATE TABLE IF NOT EXISTS `training` (
  `trainingID` int(11) NOT NULL AUTO_INCREMENT,
  `training_name` varchar(255) NOT NULL,
  PRIMARY KEY (`trainingID`),
  UNIQUE KEY `training_name` (`training_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=57 ;

--
-- Contenu de la table `training`
--

INSERT INTO `training` (`trainingID`, `training_name`) VALUES
(21, 'Actes relationnel'),
(3, 'AGILITY'),
(49, 'Anglais'),
(26, 'Animation des grossistes'),
(27, 'Animation des points de vente'),
(4, 'BSCS'),
(50, 'Bureautique'),
(13, 'Compétences en gestion de territoire'),
(5, 'CRM'),
(37, 'découvrez la bibliothèque digitale'),
(38, 'Développement personnel'),
(51, 'Efficacité personnelle'),
(14, 'Eléments fondamentaux du service client'),
(39, 'environnement de travail'),
(23, 'Fondamentaux de la vente'),
(22, 'Fondamentaux de l’accueil en boutique'),
(6, 'FSM'),
(28, 'Gestion des grands comptes'),
(52, 'Gestion des projets'),
(53, 'Gestion du temps et des priorités'),
(10, 'Je deviens manager des managers'),
(9, 'Je deviens manager d’équipe'),
(40, 'la diversité en action'),
(29, 'La gestion des territoires'),
(41, 'la prévention de la corruption (compliance)'),
(42, 'la responsabilité sociale d''entreprise'),
(43, 'la sensibilisation à l''éthique'),
(30, 'Le trade marketing dans les Télécoms'),
(44, 'les offres de services d''Orange'),
(45, 'Lutter contre la fraude'),
(31, 'Maîtrise du face à face et techniques de négociation'),
(55, 'Management de projet'),
(11, 'Manager à toute épreuve'),
(12, 'Manager Orange'),
(15, 'Négociation des ventes'),
(7, 'NS TOOL'),
(32, 'Offres Internet grand public'),
(33, 'Offres Orange money'),
(34, 'Offres voix grand public/Entreprises'),
(24, 'OIT'),
(46, 'Optimiser votre équilibre travail/vie privée'),
(16, 'Orientation client'),
(8, 'PRETUPS'),
(17, 'Principes de vente'),
(19, 'Programme de formation en service client'),
(18, 'Programme d’études vente'),
(25, 'QoS'),
(35, 'Services à valeur ajoutée'),
(20, 'Support client, compétences'),
(36, 'Terminaux'),
(56, 'test project'),
(1, 'Test Training I'),
(2, 'Test Training II'),
(47, 'Tous mobilisés contre la fraude'),
(48, 'Vivre une vie équilibrée');

-- --------------------------------------------------------

--
-- Structure de la table `trainingsession_plannedtraining`
--

CREATE TABLE IF NOT EXISTS `trainingsession_plannedtraining` (
  `sessionID` int(11) NOT NULL,
  `plannedTrainingID` int(11) NOT NULL,
  PRIMARY KEY (`sessionID`,`plannedTrainingID`),
  KEY `FKTrainingSe372935` (`plannedTrainingID`),
  KEY `FKTrainingSe964262` (`sessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `trainingsession_plannedtraining`
--

INSERT INTO `trainingsession_plannedtraining` (`sessionID`, `plannedTrainingID`) VALUES
(22, 18),
(23, 19),
(24, 20),
(26, 22),
(27, 22),
(28, 23),
(29, 23);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `training_evaluation_view`
--
CREATE TABLE IF NOT EXISTS `training_evaluation_view` (
`sessionID` int(11)
,`plannedTrainingID` int(11)
,`evaluationFormID` int(11)
,`formName` varchar(255)
,`evaluationCriteriaID` int(11)
,`criteria` varchar(255)
,`criteriaPropositionID` int(11)
,`criteria_proposition` varchar(255)
);
-- --------------------------------------------------------

--
-- Structure de la table `training_location`
--

CREATE TABLE IF NOT EXISTS `training_location` (
  `trainingLocationID` int(11) NOT NULL AUTO_INCREMENT,
  `region` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  PRIMARY KEY (`trainingLocationID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `training_location`
--

INSERT INTO `training_location` (`trainingLocationID`, `region`, `town`, `site`) VALUES
(2, 'Littoral', 'Douala', 'Salle Mbwemba - 5ieme Etage Rotonde'),
(3, 'Littoral', 'Douala', 'Soudanaise'),
(4, 'Littoral', 'Douala', 'Salle MBOMA - 5ieme Etage Rotonde'),
(6, 'Littoral', 'Douala', 'Salle Kaoutal - 5ieme Etage Rotonde'),
(7, 'Littoral', 'Douala', 'Salle DRC - 3ieme Etage CBC'),
(8, 'Littoral', 'Douala', 'Salle Kikoss - 4ieme Etage Rotonde'),
(9, 'Littoral', 'Douala', 'Salle Réunion Agnce Bafoussam - 3ieme Etage'),
(10, 'Littoral', 'Douala', 'Salle Réunion Agence Bertoua - 1er Etage'),
(11, 'Littoral', 'Douala', 'Salle Réunion Call Center - 1er Etage Annexe Soudanaise'),
(12, 'Littoral', 'Douala', 'Salle Reunion Conseil - 2eme Etage Liberté'),
(13, 'Littoral', 'Douala', 'Salle Reunion DG - 5ieme Etage Liberté'),
(14, 'Littoral', 'Douala', 'Salle Reunion DMG -RDC Liberté'),
(15, 'Littoral', 'Douala', 'Salle Reunion Marketing -  4ieme Etage Liberté'),
(16, 'Littoral', 'Douala', 'Salle Reunion Ngaoundéré  - 1er Etage Agence'),
(17, 'Littoral', 'Douala', 'Salle Stone - 4ieme Etage Rotonde');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `training_quiz_view`
--
CREATE TABLE IF NOT EXISTS `training_quiz_view` (
`sessionID` int(11)
,`plannedTrainingID` int(11)
,`quizID` int(11)
,`quiz_name` varchar(255)
,`creationDate` date
,`subCategoryID` int(11)
,`subCategory` varchar(255)
,`categoryID` int(11)
,`category` varchar(255)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `training_resources_view`
--
CREATE TABLE IF NOT EXISTS `training_resources_view` (
`sessionID` int(11)
,`plannedTrainingID` int(11)
,`resourceID` int(11)
,`link` varchar(255)
,`resource_name` varchar(255)
,`resourceType` varchar(255)
,`resourceVisibility` bit(1)
);
-- --------------------------------------------------------

--
-- Structure de la table `training_session`
--

CREATE TABLE IF NOT EXISTS `training_session` (
  `sessionID` int(11) NOT NULL AUTO_INCREMENT,
  `startTS` timestamp NOT NULL,
  `endTS` timestamp NOT NULL,
  `trainingLocationID` int(11) DEFAULT NULL,
  PRIMARY KEY (`sessionID`),
  KEY `FKTraining_S911243` (`trainingLocationID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Contenu de la table `training_session`
--

INSERT INTO `training_session` (`sessionID`, `startTS`, `endTS`, `trainingLocationID`) VALUES
(2, '2016-12-19 07:00:00', '2016-12-19 09:00:00', 2),
(3, '2016-12-22 07:00:00', '2016-12-22 09:00:00', 2),
(4, '2016-12-22 07:00:00', '2016-12-22 09:00:00', 3),
(5, '2016-12-21 11:00:00', '2016-12-20 11:00:00', 2),
(6, '2016-12-20 11:00:00', '2016-12-20 11:00:00', 7),
(7, '2016-12-28 07:00:00', '2016-12-28 10:00:00', 6),
(8, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 3),
(9, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 3),
(10, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 8),
(11, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 3),
(12, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 8),
(13, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 3),
(14, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 8),
(15, '2016-12-30 07:00:00', '2016-12-30 09:00:00', 3),
(16, '2016-12-30 16:00:00', '2016-12-30 18:00:00', 3),
(17, '2016-12-30 07:00:00', '2016-12-30 09:00:00', NULL),
(18, '2016-12-30 06:00:00', '2016-12-30 06:50:00', NULL),
(19, '2016-12-31 06:00:00', '2016-12-31 06:55:00', NULL),
(20, '2016-12-31 07:00:00', '2016-12-31 09:00:00', NULL),
(21, '2016-12-31 07:00:00', '2016-12-31 09:00:00', NULL),
(22, '2016-12-31 07:00:00', '2016-12-31 09:00:00', NULL),
(23, '2016-12-31 07:00:00', '2016-12-31 09:00:00', NULL),
(24, '2017-01-02 07:00:00', '2017-01-02 09:00:00', 3),
(25, '2017-01-03 07:00:00', '2017-01-03 11:00:00', NULL),
(26, '2017-01-02 07:00:00', '2017-01-02 09:00:00', NULL),
(27, '2017-01-02 09:00:00', '2017-01-02 11:00:00', NULL),
(28, '2017-01-03 07:00:00', '2017-01-03 09:00:00', 3),
(29, '2017-01-03 07:00:00', '2017-01-03 09:00:00', 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `cuid` varchar(10) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `gender` bit(1) NOT NULL,
  `employmentDate` date DEFAULT NULL,
  `number` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `matricule` varchar(10) DEFAULT NULL,
  `bossID` varchar(255) DEFAULT NULL,
  `userStatus` varchar(255) NOT NULL COMMENT '\nTRAINEE\nMANAGER\nTRAINER\n ',
  `userLocationID` int(11) DEFAULT NULL,
  `contractType` varchar(255) NOT NULL,
  `usr_img` varchar(255) DEFAULT 'none',
  `state` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`cuid`),
  KEY `FKUser375824` (`userLocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`cuid`, `firstName`, `lastName`, `gender`, `employmentDate`, `number`, `email`, `matricule`, `bossID`, `userStatus`, `userLocationID`, `contractType`, `usr_img`, `state`) VALUES
('BMHB8456', 'NDZIE', 'PATRICK JOEL', b'1', '2016-11-30', 34555, 'joel.ndzie@orange.com', 'BMHB8456', 'WLJD8430', 'TRAINEE', 1, 'CDI', '/images/user_images/BMHB8456.png', 1),
('BQWQ3370', 'NYETAM', 'Carole', b'1', '2016-11-26', 699949439, 'carole.nyetam@orange.com', 'BQWQ3370', 'MDJN0026', 'TRAINER', 2, 'CDI', 'none', 1),
('DGJH3510', 'MEDOU BADANG', 'Elisabeth', b'1', '2016-11-30', 2147483647, 'elisabeth.medou@orange.com', 'DGJH3510', 'DGJH3510', 'MANAGER', 1, 'Interim', 'none', 1),
('Gxx0172', 'force2', 'Force2', b'1', '2016-12-11', 9, 'force@force.com', 'Force2', 'Gxx0172', 'TRAINEE', 4, 'CDI', 'none', 1),
('GxxQ0172', 'Fometio', 'Sidoin', b'1', '2016-12-13', 234234234, 'sidoin.fometio@orange.com', '23234', 'GxxQ0172', 'TRAINER', 1, 'Interim', 'none', 1),
('KVRZ7896', 'OUMAROU', 'SANDA', b'1', '2016-12-01', 699949343, 'sanda.oumarou@orange.com', 'KVRZ7896', 'DGJH3510', 'MANAGER', 1, 'CDI', 'none', 1),
('MDJN0026', 'TAKAM', 'ANSELME', b'1', '2016-12-01', 699949163, 'anselme.takam@orange.com', 'MDJN0026', 'TSKC5238', 'TRAINER', 2, 'CDI', 'none', 1),
('PEPED', 'PEPY TCHOFFO', 'EDDY AREL', b'1', '2016-12-01', 0, 'eddy.pepy@orange.com', 'PEPED', 'KVRZ7896', 'TRAINEE', 1, 'CDI', 'none', 1),
('RQSJ9562', 'DJOB', 'LOUIS PEPIN', b'1', '2016-12-01', 699949763, 'louispepin.djob@orange.cm', 'RQSJ9562', 'MDJN0026', 'TRAINER', 2, 'CDI', 'none', 1),
('TCBX4728', 'EMESSIENE', 'Patrick', b'1', '2016-12-01', 699949321, 'Patrick.EMESSIENE@orange.com', 'TCBX4728', 'TSKC5238', 'TRAINER', 8, 'CDI', 'none', 1),
('TEST', 'Nankam', 'Christian', b'1', '2017-01-03', 234234234, 'christian.zekrjzer@gsdfsd.com', '', 'WLJD8430', 'MANAGER', 4, 'Employee', 'none', 0),
('testUser', 'First', 'Last', b'1', NULL, 234234923, 'chrisnankam@gmail.com', '', 'Gxx0172', 'TRAINEE', 3, 'Interim', 'none', 0),
('TGJW6042', 'MBOCK BASSEEG', 'Arnie Frank', b'1', '2016-12-01', 0, 'frank.basseeg@orange.com', 'TGJW6042', 'KVRZ7896', 'TRAINEE', 1, 'Interim', 'none', 1),
('TSKC5238', 'BANGOURA', 'Souhaib', b'1', '2016-12-01', 699940012, 'souhaibdeen.bangoura@orange.co', 'TSKC5238', 'DGJH3510', 'TRAINER', 8, 'CDI', 'none', 1),
('WFSDFSD', 'Fometio', 'Sidoin', b'1', '2016-11-27', 234234, 'sidoin.fometio@orange.com', '24324', 'WLJD8430', 'MANAGER', 1, 'Interim', 'none', 1),
('WLJD8430', 'Happi ', 'Christian', b'1', '2016-12-15', 694975166, 'christian.nankam@orange.com', '234', 'WLJD8430', 'TRAINER', 1, 'Interim', 'none', 1),
('ZMGL6389', 'TINDJOU TATODJI', 'Joserph Stephane', b'1', '2016-11-29', 0, 'stephane.tindjou@orange.com', 'ZMGL6389', 'KVRZ7896', 'TRAINEE', 1, 'Interim', 'none', 1);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_admin_view`
--
CREATE TABLE IF NOT EXISTS `user_admin_view` (
`cuid` varchar(10)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`usr_img` varchar(255)
,`region` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
,`_postID` bigint(11)
,`_serviceID` bigint(11)
,`_departmentID` bigint(11)
,`_directionID` bigint(11)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_default_training_view`
--
CREATE TABLE IF NOT EXISTS `user_default_training_view` (
`cuid` varchar(10)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`postID` int(11)
,`user_post_id` int(11)
,`post_name` varchar(50)
,`level` int(11)
,`trainingID` int(11)
,`default_training` varchar(255)
,`training_taken` bigint(21)
);
-- --------------------------------------------------------

--
-- Structure de la table `user_evaluation_criteria`
--

CREATE TABLE IF NOT EXISTS `user_evaluation_criteria` (
  `userEvaluationCriteriaID` int(11) NOT NULL AUTO_INCREMENT,
  `cuid` varchar(10) NOT NULL,
  `evaluationCriteriaID` int(11) NOT NULL,
  `criteriaPropositionID` int(11) NOT NULL,
  `plannedtrainingid` int(11) NOT NULL,
  `criteriacomment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userEvaluationCriteriaID`),
  KEY `FKUser_Evalu208930` (`plannedtrainingid`),
  KEY `FKUser_Evalu286162` (`evaluationCriteriaID`),
  KEY `FKUser_Evalu348802` (`criteriaPropositionID`),
  KEY `FKUser_Evalu566755` (`cuid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Contenu de la table `user_evaluation_criteria`
--

INSERT INTO `user_evaluation_criteria` (`userEvaluationCriteriaID`, `cuid`, `evaluationCriteriaID`, `criteriaPropositionID`, `plannedtrainingid`, `criteriacomment`) VALUES
(21, 'PEPED', 1, 1, 20, 'PEPED Proposition 1'),
(22, 'PEPED', 2, 6, 20, 'PEPED Proposition 2'),
(23, 'PEPED', 3, 11, 20, 'PEPED Proposition 3'),
(24, 'PEPED', 4, 16, 20, 'PEPED Proposition 4'),
(25, 'PEPED', 5, 17, 20, 'PEPED Proposition 5'),
(26, 'WLJD8430', 1, 1, 19, 'NS Proposition 1'),
(27, 'WLJD8430', 2, 6, 19, 'NS Proposition 2'),
(28, 'WLJD8430', 3, 11, 19, 'NS Proposition 3'),
(29, 'WLJD8430', 4, 16, 19, 'NS Proposition 4'),
(30, 'WLJD8430', 5, 17, 19, 'NS Proposition 5'),
(31, 'WLJD8430', 1, 2, 20, 'CHRIS Comment 1'),
(32, 'WLJD8430', 2, 7, 20, 'CHRIS Comment 2'),
(33, 'WLJD8430', 3, 12, 20, 'CHRIS Comment 3'),
(34, 'WLJD8430', 4, 13, 20, 'CHRIS Comment 4'),
(35, 'WLJD8430', 5, 18, 20, 'CHRIS Comment 5'),
(36, 'WLJD8430', 1, 4, 23, 'I loved criteria 1 very much. Really hope something like this is created in the future again'),
(37, 'WLJD8430', 2, 6, 23, 'Hmm. Not so good. Think we could do more and there really is alot to be done on that note'),
(38, 'WLJD8430', 3, 11, 23, 'Good food. Good housing and all the rest but who cares'),
(39, 'WLJD8430', 4, 16, 23, 'Am in love with this right now. Its awesome. Hope getting more soon'),
(40, 'WLJD8430', 5, 17, 23, 'Never really understood the importance of this criteria');

-- --------------------------------------------------------

--
-- Structure de la table `user_location`
--

CREATE TABLE IF NOT EXISTS `user_location` (
  `userLocationID` int(11) NOT NULL AUTO_INCREMENT,
  `region` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  PRIMARY KEY (`userLocationID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Contenu de la table `user_location`
--

INSERT INTO `user_location` (`userLocationID`, `region`, `town`, `site`) VALUES
(1, 'Litorral', 'Douala', 'Rotonde'),
(2, 'Littoral', 'Douala', 'Soudanaise'),
(3, 'West', 'Bafoussam', 'Bafoussam'),
(4, 'North-West', 'Bamenda', 'Bamenda'),
(5, 'East', 'Bertoua', 'Bertoua'),
(6, 'Littoral', 'Douala', 'Bonaberi'),
(7, 'South-West', 'Buea', 'Buea'),
(8, 'Littoral', 'Douala', 'Douala'),
(9, 'Littoral', 'Douala', 'Bonapriso'),
(10, 'Littoral', 'Douala', 'Soudanaise'),
(11, 'South', 'Ebolowa', 'Ebolowa'),
(12, 'North', 'Garoua', 'Garoua'),
(13, 'South-West', 'Kumba', 'Kumba'),
(14, 'Extrem-North', 'Maroua', 'Maroua'),
(15, 'Adamaoua', 'Ngaoundere', 'Ngaoundere'),
(16, 'Center', 'Yaounde', 'Yaounde'),
(17, 'Center', 'Yaounde', 'Bastos'),
(18, 'Center', 'Yaounde', 'Kennedy'),
(19, 'West', 'Bafoussam', 'Bafoussam'),
(20, 'North-West', 'Bamenda', 'Bamenda'),
(21, 'East', 'Bertoua', 'Bertoua'),
(22, 'Littoral', 'Douala', 'Bonaberi'),
(23, 'South-West', 'Buea', 'Buea'),
(24, 'Littoral', 'Douala', 'Douala'),
(25, 'Littoral', 'Douala', 'Bonapriso'),
(26, 'Littoral', 'Douala', 'Soudanaise'),
(27, 'South', 'Ebolowa', 'Ebolowa'),
(28, 'North', 'Garoua', 'Garoua'),
(29, 'South-West', 'Kumba', 'Kumba'),
(30, 'Extrem-North', 'Maroua', 'Maroua'),
(31, 'Adamaoua', 'Ngaoundere', 'Ngaoundere'),
(32, 'Center', 'Yaounde', 'Yaounde'),
(33, 'Center', 'Yaounde', 'Bastos'),
(34, 'Center', 'Yaounde', 'Kennedy'),
(35, 'West', 'Bafoussam', 'Bafoussam'),
(36, 'North-West', 'Bamenda', 'Bamenda'),
(37, 'East', 'Bertoua', 'Bertoua'),
(38, 'Littoral', 'Douala', 'Bonaberi'),
(39, 'South-West', 'Buea', 'Buea'),
(40, 'Littoral', 'Douala', 'Douala'),
(41, 'Littoral', 'Douala', 'Bonapriso'),
(42, 'Littoral', 'Douala', 'Soudanaise'),
(43, 'South', 'Ebolowa', 'Ebolowa'),
(44, 'North', 'Garoua', 'Garoua'),
(45, 'South-West', 'Kumba', 'Kumba'),
(46, 'Extrem-North', 'Maroua', 'Maroua'),
(47, 'Adamaoua', 'Ngaoundere', 'Ngaoundere'),
(48, 'Center', 'Yaounde', 'Yaounde'),
(49, 'Center', 'Yaounde', 'Bastos'),
(50, 'Center', 'Yaounde', 'Kennedy');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_management_view`
--
CREATE TABLE IF NOT EXISTS `user_management_view` (
`cuid` varchar(10)
,`usr_img` varchar(255)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`email` varchar(30)
,`gender` bit(1)
,`number` int(11)
,`bossID` varchar(255)
,`userLocationID` int(11)
,`userStatus` varchar(255)
,`region` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
,`contractType` varchar(255)
,`no_planned_training` bigint(21)
,`name_next_training` varchar(255)
,`date_next_training` timestamp
,`average_all_quiz` decimal(14,4)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_pt_evaluation_view`
--
CREATE TABLE IF NOT EXISTS `user_pt_evaluation_view` (
`cuid` varchar(10)
,`evaluationCriteriaID` int(11)
,`criteriaPropositionID` int(11)
,`plannedtrainingid` int(11)
,`criteriacomment` varchar(255)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`criteria` varchar(255)
,`criteria_proposition` varchar(255)
,`evaluationFormID` int(11)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_pt_view`
--
CREATE TABLE IF NOT EXISTS `user_pt_view` (
`plannedTrainingID` int(11)
,`training_name` varchar(255)
,`startDate` timestamp
,`endDate` timestamp
,`cuid` varchar(10)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`email` varchar(30)
,`region` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
);
-- --------------------------------------------------------

--
-- Structure de la table `user_question`
--

CREATE TABLE IF NOT EXISTS `user_question` (
  `user_question_id` int(11) NOT NULL AUTO_INCREMENT,
  `cuid` varchar(10) NOT NULL,
  `questionID` int(11) NOT NULL,
  `propositionID` int(11) DEFAULT NULL,
  `answerText` int(11) DEFAULT NULL,
  `quizID` int(11) NOT NULL,
  `plannedTrainingID` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_question_id`),
  KEY `FKUser_Quest333619` (`quizID`),
  KEY `FKUser_Quest349780` (`questionID`),
  KEY `FKUser_Quest378283` (`propositionID`),
  KEY `FKUser_Quest929325` (`plannedTrainingID`),
  KEY `FKUser_Quest937107` (`cuid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `user_question`
--

INSERT INTO `user_question` (`user_question_id`, `cuid`, `questionID`, `propositionID`, `answerText`, `quizID`, `plannedTrainingID`) VALUES
(10, 'WLJD8430', 13, 53, NULL, 12, NULL),
(11, 'WLJD8430', 12, 50, NULL, 6, NULL),
(15, 'WLJD8430', 15, 59, NULL, 13, NULL),
(16, 'WLJD8430', 16, 62, NULL, 13, NULL),
(17, 'WLJD8430', 17, 66, NULL, 13, NULL),
(18, 'WLJD8430', 15, 57, NULL, 13, NULL),
(19, 'WLJD8430', 16, 62, NULL, 13, NULL),
(20, 'WLJD8430', 17, 64, NULL, 13, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_quiz`
--

CREATE TABLE IF NOT EXISTS `user_quiz` (
  `user_quiz_ID` int(11) NOT NULL AUTO_INCREMENT,
  `cuid` varchar(10) NOT NULL,
  `quizID` int(11) NOT NULL,
  `dateTakingQuiz` date DEFAULT NULL,
  `plannedTrainingID` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `quizTaken` bit(1) NOT NULL DEFAULT b'0',
  `quiz_hidden` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_quiz_ID`),
  KEY `FKUser_Quiz250403` (`plannedTrainingID`),
  KEY `FKUser_Quiz728969` (`cuid`),
  KEY `FKUser_Quiz846109` (`quizID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `user_quiz`
--

INSERT INTO `user_quiz` (`user_quiz_ID`, `cuid`, `quizID`, `dateTakingQuiz`, `plannedTrainingID`, `score`, `quizTaken`, `quiz_hidden`) VALUES
(4, 'WFSDFSD', 6, NULL, NULL, 0, b'0', b'0'),
(5, 'WLJD8430', 6, '2017-01-05', NULL, 20, b'1', b'0'),
(14, 'ZMGL6389', 12, NULL, NULL, 0, b'0', b'0'),
(15, 'TGJW6042', 12, NULL, NULL, 0, b'0', b'0'),
(16, 'GxxQ0172', 12, NULL, NULL, 0, b'0', b'0'),
(17, 'WLJD8430', 12, '2017-01-05', NULL, 20, b'1', b'0'),
(18, 'PEPED', 12, NULL, NULL, 0, b'0', b'0'),
(19, 'BMHB8456', 12, NULL, NULL, 0, b'0', b'0'),
(20, 'WLJD8430', 13, '2017-01-05', NULL, 7, b'1', b'0');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_quiz_view`
--
CREATE TABLE IF NOT EXISTS `user_quiz_view` (
`user_quiz_ID` int(11)
,`quiz_name` varchar(255)
,`creationDate` date
,`cuid` varchar(10)
,`quizID` int(11)
,`dateTakingQuiz` date
,`plannedTrainingID` int(11)
,`score` int(11)
,`quizTaken` bit(1)
,`quiz_hidden` bit(1)
,`quizType` varchar(255)
,`subCategoryID` int(11)
,`subCategory` varchar(255)
,`category` varchar(255)
,`training_name` varchar(255)
,`sessionID` int(11)
,`trainingEndDate` timestamp
,`num_questions` bigint(21)
,`training_taken` int(1) unsigned
);
-- --------------------------------------------------------

--
-- Structure de la table `user_training_evaluation`
--

CREATE TABLE IF NOT EXISTS `user_training_evaluation` (
  `userTrainingEvalID` int(11) NOT NULL AUTO_INCREMENT,
  `cuid` varchar(10) NOT NULL,
  `evaluationFormID` int(11) NOT NULL,
  `plannedtrainingid` int(11) NOT NULL,
  PRIMARY KEY (`userTrainingEvalID`),
  KEY `FKUser_Train17992` (`cuid`),
  KEY `FKUser_Train30449` (`evaluationFormID`),
  KEY `FKUser_Train311424` (`plannedtrainingid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `user_training_evaluation`
--

INSERT INTO `user_training_evaluation` (`userTrainingEvalID`, `cuid`, `evaluationFormID`, `plannedtrainingid`) VALUES
(5, 'PEPED', 1, 20),
(6, 'WLJD8430', 1, 19),
(7, 'WLJD8430', 1, 20),
(8, 'WLJD8430', 1, 23);

-- --------------------------------------------------------

--
-- Structure de la table `user_training_session`
--

CREATE TABLE IF NOT EXISTS `user_training_session` (
  `cuid` varchar(10) NOT NULL,
  `sessionID` int(11) NOT NULL,
  `userCurrentPostID` int(11) NOT NULL,
  `trainingTaken` bit(1) NOT NULL,
  `hidden` bit(1) NOT NULL,
  `dateTaken` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cuid`,`sessionID`),
  KEY `FKUser_Train597318` (`cuid`),
  KEY `FKUser_Train955143` (`sessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user_training_session`
--

INSERT INTO `user_training_session` (`cuid`, `sessionID`, `userCurrentPostID`, `trainingTaken`, `hidden`, `dateTaken`) VALUES
('BMHB8456', 10, 1, b'0', b'0', NULL),
('BMHB8456', 12, 1, b'0', b'0', NULL),
('BMHB8456', 13, 1, b'0', b'0', NULL),
('BMHB8456', 17, 1, b'0', b'0', NULL),
('BMHB8456', 18, 1, b'0', b'0', NULL),
('BMHB8456', 19, 1, b'0', b'0', NULL),
('BMHB8456', 20, 1, b'0', b'0', NULL),
('BMHB8456', 21, 1, b'0', b'0', NULL),
('BMHB8456', 22, 1, b'1', b'0', '2017-01-02 06:47:17'),
('BMHB8456', 23, 1, b'0', b'0', NULL),
('BMHB8456', 24, 1, b'0', b'0', NULL),
('BMHB8456', 25, 1, b'0', b'0', NULL),
('BMHB8456', 27, 1, b'0', b'0', NULL),
('BMHB8456', 29, 1, b'0', b'0', NULL),
('GxxQ0172', 4, 1, b'0', b'0', NULL),
('GxxQ0172', 5, 1, b'0', b'0', NULL),
('GxxQ0172', 14, 1, b'0', b'0', NULL),
('GxxQ0172', 17, 1, b'0', b'0', NULL),
('GxxQ0172', 18, 1, b'0', b'0', NULL),
('GxxQ0172', 22, 1, b'1', b'0', '2017-01-02 06:47:10'),
('GxxQ0172', 23, 1, b'1', b'0', '2017-01-01 07:21:02'),
('GxxQ0172', 24, 1, b'0', b'0', NULL),
('GxxQ0172', 25, 1, b'0', b'0', NULL),
('GxxQ0172', 26, 1, b'0', b'0', NULL),
('GxxQ0172', 28, 1, b'0', b'0', NULL),
('PEPED', 4, 1, b'0', b'0', NULL),
('PEPED', 6, 1, b'0', b'0', NULL),
('PEPED', 14, 1, b'0', b'0', NULL),
('PEPED', 17, 1, b'0', b'0', NULL),
('PEPED', 18, 1, b'0', b'0', NULL),
('PEPED', 19, 1, b'0', b'0', NULL),
('PEPED', 20, 1, b'0', b'0', NULL),
('PEPED', 21, 1, b'0', b'0', NULL),
('PEPED', 22, 1, b'0', b'0', NULL),
('PEPED', 23, 1, b'1', b'0', '2017-01-01 07:21:37'),
('PEPED', 24, 1, b'1', b'0', '2017-01-02 16:11:55'),
('PEPED', 25, 1, b'0', b'0', NULL),
('PEPED', 26, 1, b'0', b'0', NULL),
('PEPED', 28, 1, b'0', b'0', NULL),
('TGJW6042', 3, 1, b'0', b'0', NULL),
('TGJW6042', 5, 1, b'0', b'0', NULL),
('TGJW6042', 14, 1, b'0', b'0', NULL),
('TGJW6042', 17, 1, b'0', b'0', NULL),
('TGJW6042', 18, 1, b'0', b'0', NULL),
('TGJW6042', 19, 1, b'0', b'0', NULL),
('TGJW6042', 20, 1, b'0', b'0', NULL),
('TGJW6042', 21, 1, b'0', b'0', NULL),
('TGJW6042', 22, 1, b'0', b'0', NULL),
('TGJW6042', 23, 1, b'0', b'0', NULL),
('TGJW6042', 24, 1, b'0', b'0', NULL),
('TGJW6042', 25, 1, b'0', b'0', NULL),
('TGJW6042', 26, 1, b'0', b'0', NULL),
('TGJW6042', 29, 1, b'0', b'0', NULL),
('WFSDFSD', 2, 1, b'0', b'0', NULL),
('WLJD8430', 2, 1, b'0', b'1', NULL),
('WLJD8430', 3, 1, b'0', b'0', NULL),
('WLJD8430', 6, 1, b'0', b'0', NULL),
('WLJD8430', 8, 1, b'0', b'0', NULL),
('WLJD8430', 9, 1, b'0', b'0', NULL),
('WLJD8430', 11, 1, b'0', b'0', NULL),
('WLJD8430', 13, 1, b'0', b'0', NULL),
('WLJD8430', 15, 1, b'0', b'0', NULL),
('WLJD8430', 16, 1, b'1', b'0', '2016-12-30 16:06:04'),
('WLJD8430', 17, 1, b'1', b'0', '2016-12-30 06:38:30'),
('WLJD8430', 18, 1, b'0', b'0', NULL),
('WLJD8430', 19, 1, b'0', b'0', NULL),
('WLJD8430', 20, 1, b'0', b'0', NULL),
('WLJD8430', 21, 1, b'0', b'0', NULL),
('WLJD8430', 22, 1, b'1', b'0', '2017-01-01 07:20:48'),
('WLJD8430', 23, 1, b'1', b'0', '2017-01-01 07:21:33'),
('WLJD8430', 24, 1, b'1', b'0', '2017-01-02 12:14:32'),
('WLJD8430', 25, 1, b'0', b'0', NULL),
('WLJD8430', 27, 1, b'0', b'0', NULL),
('WLJD8430', 29, 1, b'1', b'0', '2017-01-03 16:18:13'),
('ZMGL6389', 4, 1, b'0', b'1', NULL),
('ZMGL6389', 5, 1, b'0', b'0', NULL),
('ZMGL6389', 7, 1, b'0', b'0', NULL),
('ZMGL6389', 13, 1, b'0', b'0', NULL),
('ZMGL6389', 17, 1, b'0', b'0', NULL),
('ZMGL6389', 18, 1, b'0', b'0', NULL),
('ZMGL6389', 19, 1, b'0', b'0', NULL),
('ZMGL6389', 20, 1, b'0', b'0', NULL),
('ZMGL6389', 21, 1, b'0', b'0', NULL),
('ZMGL6389', 22, 1, b'0', b'0', NULL),
('ZMGL6389', 23, 1, b'0', b'0', NULL),
('ZMGL6389', 24, 1, b'0', b'0', NULL),
('ZMGL6389', 25, 1, b'0', b'0', NULL),
('ZMGL6389', 27, 1, b'0', b'0', NULL),
('ZMGL6389', 28, 1, b'0', b'0', NULL);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_training_view`
--
CREATE TABLE IF NOT EXISTS `user_training_view` (
`cuid` varchar(10)
,`sessionID` int(11)
,`userCurrentPostID` int(11)
,`trainingTaken` bit(1)
,`hidden` bit(1)
,`dateTaken` timestamp
,`startTS` timestamp
,`endTS` timestamp
,`region` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
,`sessionDuration` int(11)
,`plannedTrainingID` int(11)
,`total_takers` bigint(21)
,`conferenceNumber` varchar(255)
,`trainingCode` varchar(255)
,`trainingType` varchar(255)
,`transmissionMode` varchar(255)
,`training_name` varchar(255)
,`trainingID` int(11)
,`evaluationFormID` int(11)
,`userCPID` bigint(11)
,`default_training` bigint(21)
,`post_name` varchar(50)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `user_view`
--
CREATE TABLE IF NOT EXISTS `user_view` (
`cuid` varchar(10)
,`firstName` varchar(30)
,`lastName` varchar(30)
,`email` varchar(30)
,`gender` bit(1)
,`employmentDate` date
,`number` int(11)
,`matricule` varchar(10)
,`bossID` varchar(255)
,`userLocationID` int(11)
,`userStatus` varchar(255)
,`usr_img` varchar(255)
,`state` tinyint(1)
,`region` varchar(255)
,`town` varchar(255)
,`site` varchar(255)
,`contractType` varchar(255)
);
-- --------------------------------------------------------

--
-- Structure de la vue `admin_pt_sessions_view`
--
DROP TABLE IF EXISTS `admin_pt_sessions_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_pt_sessions_view` AS select `tp`.`sessionID` AS `sessionID`,`tp`.`plannedTrainingID` AS `plannedTrainingID`,`ts`.`startTS` AS `startTS`,`ts`.`endTS` AS `endTS`,`tl`.`town` AS `town`,`tl`.`site` AS `site` from ((`trainingsession_plannedtraining` `tp` join `training_session` `ts` on((`tp`.`sessionID` = `ts`.`sessionID`))) left join `training_location` `tl` on((`ts`.`trainingLocationID` = `tl`.`trainingLocationID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `admin_pt_users_view`
--
DROP TABLE IF EXISTS `admin_pt_users_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_pt_users_view` AS select `uts`.`cuid` AS `cuid`,`uts`.`trainingTaken` AS `trainingTaken`,`tp`.`plannedTrainingID` AS `plannedTrainingID`,`pt`.`startDate` AS `startDate`,`pt`.`endDate` AS `endDate`,`pt`.`sessionDuration` AS `sessionDuration`,`t`.`training_name` AS `training_name`,`tl`.`town` AS `town`,`tl`.`site` AS `site`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`gender` AS `gender`,(select `post_view`.`service` from `post_view` where (`post_view`.`postID` = `uts`.`userCurrentPostID`)) AS `service` from ((((((`user_training_session` `uts` join `training_session` `ts` on((`uts`.`sessionID` = `ts`.`sessionID`))) join `trainingsession_plannedtraining` `tp` on((`ts`.`sessionID` = `tp`.`sessionID`))) join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`))) left join `training_location` `tl` on((`ts`.`trainingLocationID` = `tl`.`trainingLocationID`))) join `user` `u` on((`uts`.`cuid` = `u`.`cuid`)));

-- --------------------------------------------------------

--
-- Structure de la vue `admin_quiz_takers_view`
--
DROP TABLE IF EXISTS `admin_quiz_takers_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_quiz_takers_view` AS select `uq`.`user_quiz_ID` AS `user_quiz_ID`,`uq`.`cuid` AS `cuid`,`uq`.`quizID` AS `quizID`,`uq`.`dateTakingQuiz` AS `dateTakingQuiz`,`uq`.`score` AS `score`,`uq`.`quizTaken` AS `quizTaken`,`uq`.`quiz_hidden` AS `quiz_hidden`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`gender` AS `gender`,`ul`.`region` AS `region`,`ul`.`town` AS `town`,`ul`.`site` AS `site` from ((`user_quiz` `uq` join `user` `u` on((`uq`.`cuid` = `u`.`cuid`))) join `user_location` `ul` on((`u`.`userLocationID` = `ul`.`userLocationID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `admin_quiz_view`
--
DROP TABLE IF EXISTS `admin_quiz_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_quiz_view` AS select `q`.`quizID` AS `quizID`,`q`.`quiz_name` AS `quiz_name`,`q`.`creationDate` AS `creationDate`,`q`.`creator` AS `uCreator`,`q`.`plannedTrainingID` AS `plannedTrainingID`,`q`.`subCategoryID` AS `subCategoryID`,`q`.`quizType` AS `quizType`,`sc`.`subCategory` AS `subCategory`,`u`.`firstName` AS `creator`,(select count(0) from `question` where (`question`.`quizID` = `q`.`quizID`)) AS `num_questions`,(case when ((select count(0) from `user_question` where (`user_question`.`quizID` = `q`.`quizID`)) > 0) then 1 else 0 end) AS `can_add` from ((`quiz` `q` join `sub_category` `sc` on((`q`.`subCategoryID` = `sc`.`subCategoryID`))) join `user` `u` on((`q`.`creator` = `u`.`cuid`))) order by `q`.`creationDate` desc;

-- --------------------------------------------------------

--
-- Structure de la vue `admin_session_participants_view`
--
DROP TABLE IF EXISTS `admin_session_participants_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_session_participants_view` AS select `uts`.`cuid` AS `cuid`,`uts`.`sessionID` AS `sessionID`,`uts`.`userCurrentPostID` AS `userCurrentPostID`,`uts`.`trainingTaken` AS `trainingTaken`,`uts`.`dateTaken` AS `dateTaken`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName` from (`user_training_session` `uts` join `user` `u` on((`uts`.`cuid` = `u`.`cuid`)));

-- --------------------------------------------------------

--
-- Structure de la vue `admin_user_current_post_view`
--
DROP TABLE IF EXISTS `admin_user_current_post_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_user_current_post_view` AS select (select `post_user`.`assignationDate` from `post_user` where (`post_user`.`cuid` = `u`.`cuid`) order by `post_user`.`user_post_id` desc limit 1) AS `assignationDate`,(select `post_user`.`postID` from `post_user` where (`post_user`.`cuid` = `u`.`cuid`) order by `post_user`.`user_post_id` desc limit 1) AS `_postID`,(select `post`.`post_name` from `post` where (`post`.`postID` = `_postID`) order by `pu`.`assignationDate` desc limit 1) AS `post_name`,`u`.`cuid` AS `cuid`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`usr_img` AS `usr_img` from ((`post_user` `pu` join `post` `p` on((`pu`.`postID` = `p`.`postID`))) join `user` `u` on((`pu`.`cuid` = `u`.`cuid`))) group by `u`.`cuid` order by `u`.`firstName`;

-- --------------------------------------------------------

--
-- Structure de la vue `evaluation_form_criteria_view`
--
DROP TABLE IF EXISTS `evaluation_form_criteria_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `evaluation_form_criteria_view` AS select `ef`.`evaluationFormID` AS `evaluationFormID`,`ef`.`formName` AS `formName`,`ec`.`evaluationCriteriaID` AS `evaluationCriteriaID`,`ec`.`criteria` AS `criteria`,`cp`.`criteriaPropositionID` AS `criteriaPropositionID`,`cp`.`criteria_proposition` AS `criteria_proposition` from (((`evaluation_form` `ef` join `evaluationform_evaluationcriteria` `ee` on((`ef`.`evaluationFormID` = `ee`.`evaluationFormID`))) join `evaluation_criteria` `ec` on((`ee`.`evaluationCriteriaID` = `ec`.`evaluationCriteriaID`))) join `criteria_proposition` `cp` on((`ec`.`evaluationCriteriaID` = `cp`.`evaluationCriteriaID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `eval_form_criteria_view`
--
DROP TABLE IF EXISTS `eval_form_criteria_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `eval_form_criteria_view` AS select `ef`.`evaluationFormID` AS `evaluationFormID`,`ef`.`formName` AS `formName`,`ec`.`criteria` AS `criteria`,`cp`.`criteriaPropositionID` AS `criteriaPropositionID`,`cp`.`criteria_proposition` AS `criteria_proposition`,`cp`.`evaluationCriteriaID` AS `evaluationCriteriaID` from (((`evaluation_form` `ef` join `evaluationform_evaluationcriteria` `ee` on((`ef`.`evaluationFormID` = `ee`.`evaluationFormID`))) join `evaluation_criteria` `ec` on((`ee`.`evaluationCriteriaID` = `ec`.`evaluationCriteriaID`))) join `criteria_proposition` `cp` on((`ec`.`evaluationCriteriaID` = `cp`.`evaluationCriteriaID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `ext_trainers_view`
--
DROP TABLE IF EXISTS `ext_trainers_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ext_trainers_view` AS select `tt`.`sessionID` AS `sessionID`,`tt`.`exTrainerID` AS `exTrainerID`,`tt`.`trainerType` AS `trainerType`,`tt`.`cuid` AS `cuid`,`et`.`firstName` AS `firstName`,`et`.`lastName` AS `lastName`,`et`.`gender` AS `gender` from (`trainer_trainingsession` `tt` join `external_trainer` `et` on((`tt`.`exTrainerID` = `et`.`trainerID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `int_trainers_view`
--
DROP TABLE IF EXISTS `int_trainers_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `int_trainers_view` AS select `tt`.`sessionID` AS `sessionID`,`tt`.`exTrainerID` AS `exTrainerID`,`tt`.`trainerType` AS `trainerType`,`tt`.`cuid` AS `cuid`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`gender` AS `gender` from (`trainer_trainingsession` `tt` join `user` `u` on((`tt`.`cuid` = `u`.`cuid`)));

-- --------------------------------------------------------

--
-- Structure de la vue `post_view`
--
DROP TABLE IF EXISTS `post_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `post_view` AS select `p`.`postID` AS `postID`,`p`.`post_name` AS `post_name`,`p`.`level` AS `level`,`p`.`serviceID` AS `serviceID`,`s`.`service` AS `service`,`s`.`departmentID` AS `departmentID`,`d`.`department` AS `department`,`d`.`directionID` AS `directionID`,`d1`.`direction` AS `direction` from (((`post` `p` join `service` `s` on((`p`.`serviceID` = `s`.`serviceID`))) join `department` `d` on((`s`.`departmentID` = `d`.`departmentID`))) join `direction` `d1` on((`d`.`directionID` = `d1`.`directionID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `quiz_form_view`
--
DROP TABLE IF EXISTS `quiz_form_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `quiz_form_view` AS select `q`.`quizID` AS `quizID`,`q`.`quiz_name` AS `quiz_name`,`q`.`creationDate` AS `creationDate`,`q`.`plannedTrainingID` AS `plannedTrainingID`,`q`.`subCategoryID` AS `subCategoryID`,`q`.`quizType` AS `quizType`,`q1`.`questionID` AS `questionID`,`q1`.`question_title` AS `question_title`,`q1`.`question_type` AS `question_type`,`p`.`propositionID` AS `propositionID`,`p`.`proposition_title` AS `proposition_title`,`p`.`isCorrect` AS `isCorrect` from ((`quiz` `q` join `question` `q1` on((`q`.`quizID` = `q1`.`quizID`))) join `proposition` `p` on((`q1`.`questionID` = `p`.`questionID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `resources_view`
--
DROP TABLE IF EXISTS `resources_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `resources_view` AS select `r`.`resourceID` AS `resourceID`,`r`.`link` AS `link`,`r`.`resourceType` AS `resourceType`,`r`.`creator` AS `creator`,`r`.`addition_date` AS `addition_date`,`r`.`resourceVisibility` AS `resourceVisibility`,`r`.`resource_name` AS `resource_name`,`r`.`num_downloads` AS `num_downloads` from `resource` `r` order by `r`.`addition_date` desc;

-- --------------------------------------------------------

--
-- Structure de la vue `subs_quiz_view`
--
DROP TABLE IF EXISTS `subs_quiz_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `subs_quiz_view` AS select `uq`.`dateTakingQuiz` AS `dateTakingQuiz`,`uq`.`cuid` AS `cuid`,`uq`.`score` AS `score`,`q`.`quiz_name` AS `quiz_name`,`q`.`creationDate` AS `creationDate`,`uq`.`quizTaken` AS `quizTaken` from (`user_quiz` `uq` join `quiz` `q` on((`uq`.`quizID` = `q`.`quizID`))) where (`uq`.`quizTaken` = 1);

-- --------------------------------------------------------

--
-- Structure de la vue `training_evaluation_view`
--
DROP TABLE IF EXISTS `training_evaluation_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `training_evaluation_view` AS select `tp`.`sessionID` AS `sessionID`,`tp`.`plannedTrainingID` AS `plannedTrainingID`,`pt`.`evaluationFormID` AS `evaluationFormID`,`ef`.`formName` AS `formName`,`ee`.`evaluationCriteriaID` AS `evaluationCriteriaID`,`ec`.`criteria` AS `criteria`,`cp`.`criteriaPropositionID` AS `criteriaPropositionID`,`cp`.`criteria_proposition` AS `criteria_proposition` from (((((`trainingsession_plannedtraining` `tp` join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `evaluation_form` `ef` on((`pt`.`evaluationFormID` = `ef`.`evaluationFormID`))) join `evaluationform_evaluationcriteria` `ee` on((`ef`.`evaluationFormID` = `ee`.`evaluationFormID`))) join `evaluation_criteria` `ec` on((`ee`.`evaluationCriteriaID` = `ec`.`evaluationCriteriaID`))) join `criteria_proposition` `cp` on((`ec`.`evaluationCriteriaID` = `cp`.`evaluationCriteriaID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `training_quiz_view`
--
DROP TABLE IF EXISTS `training_quiz_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `training_quiz_view` AS select `tp`.`sessionID` AS `sessionID`,`tp`.`plannedTrainingID` AS `plannedTrainingID`,`q`.`quizID` AS `quizID`,`q`.`quiz_name` AS `quiz_name`,`q`.`creationDate` AS `creationDate`,`sc`.`subCategoryID` AS `subCategoryID`,`sc`.`subCategory` AS `subCategory`,`c`.`categoryID` AS `categoryID`,`c`.`category` AS `category` from ((((`trainingsession_plannedtraining` `tp` join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `quiz` `q` on((`pt`.`plannedTrainingID` = `q`.`plannedTrainingID`))) join `sub_category` `sc` on((`q`.`subCategoryID` = `sc`.`subCategoryID`))) join `category` `c` on((`sc`.`categoryID` = `c`.`categoryID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `training_resources_view`
--
DROP TABLE IF EXISTS `training_resources_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `training_resources_view` AS select `tp`.`sessionID` AS `sessionID`,`tp`.`plannedTrainingID` AS `plannedTrainingID`,`r`.`resourceID` AS `resourceID`,`r`.`link` AS `link`,`r`.`resource_name` AS `resource_name`,`r`.`resourceType` AS `resourceType`,`r`.`resourceVisibility` AS `resourceVisibility` from ((((`trainingsession_plannedtraining` `tp` join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`))) join `resource_training` `rt` on((`tp`.`plannedTrainingID` = `rt`.`plannedtrainingid`))) join `resource` `r` on((`rt`.`resourceID` = `r`.`resourceID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_admin_view`
--
DROP TABLE IF EXISTS `user_admin_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_admin_view` AS select `u`.`cuid` AS `cuid`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`usr_img` AS `usr_img`,`ul`.`region` AS `region`,`ul`.`town` AS `town`,`ul`.`site` AS `site`,(select `pu`.`postID` from `post_user` `pu` where (`pu`.`cuid` = `u`.`cuid`) order by `pu`.`user_post_id` desc limit 1) AS `_postID`,(select `p`.`serviceID` from `post` `p` where (`p`.`postID` = `_postID`)) AS `_serviceID`,(select `s`.`departmentID` from `service` `s` where (`s`.`serviceID` = `_serviceID`)) AS `_departmentID`,(select `d`.`directionID` from `department` `d` where (`d`.`departmentID` = `_departmentID`)) AS `_directionID` from (`user` `u` join `user_location` `ul` on((`u`.`userLocationID` = `ul`.`userLocationID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_default_training_view`
--
DROP TABLE IF EXISTS `user_default_training_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_default_training_view` AS select `u`.`cuid` AS `cuid`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`p`.`postID` AS `postID`,`pu`.`user_post_id` AS `user_post_id`,`p`.`post_name` AS `post_name`,`p`.`level` AS `level`,`t`.`trainingID` AS `trainingID`,`t`.`training_name` AS `default_training`,(select count(0) from `user_training_view` where ((`user_training_view`.`cuid` = `u`.`cuid`) and (`user_training_view`.`trainingID` = `t`.`trainingID`) and (`user_training_view`.`trainingTaken` = 1))) AS `training_taken` from ((((`user` `u` join `post_user` `pu` on((`u`.`cuid` = `pu`.`cuid`))) join `post` `p` on((`pu`.`postID` = `p`.`postID`))) left join `initial_training` `it` on((`p`.`postID` = `it`.`postID`))) left join `training` `t` on((`it`.`trainingID` = `t`.`trainingID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_management_view`
--
DROP TABLE IF EXISTS `user_management_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_management_view` AS select `u`.`cuid` AS `cuid`,`u`.`usr_img` AS `usr_img`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`u`.`gender` AS `gender`,`u`.`number` AS `number`,`u`.`bossID` AS `bossID`,`u`.`userLocationID` AS `userLocationID`,`u`.`userStatus` AS `userStatus`,`ul`.`region` AS `region`,`ul`.`town` AS `town`,`ul`.`site` AS `site`,`u`.`contractType` AS `contractType`,(select count(0) from `user_training_session` `uts` where (`uts`.`cuid` = `u`.`cuid`)) AS `no_planned_training`,(select `t`.`training_name` from ((((`user_training_session` `uts` join `training_session` `ts` on((`uts`.`sessionID` = `ts`.`sessionID`))) join `trainingsession_plannedtraining` `tp` on((`ts`.`sessionID` = `tp`.`sessionID`))) join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`))) where ((`uts`.`cuid` = `u`.`cuid`) and (`ts`.`startTS` > now())) order by `ts`.`startTS` limit 1) AS `name_next_training`,(select `ts`.`startTS` from ((((`user_training_session` `uts` join `training_session` `ts` on((`uts`.`sessionID` = `ts`.`sessionID`))) join `trainingsession_plannedtraining` `tp` on((`ts`.`sessionID` = `tp`.`sessionID`))) join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`))) where ((`uts`.`cuid` = `u`.`cuid`) and (`ts`.`startTS` > now())) order by `ts`.`startTS` limit 1) AS `date_next_training`,(select avg(`uq`.`score`) from `user_quiz` `uq` where ((`uq`.`quizTaken` = '1') and (`uq`.`cuid` = `u`.`cuid`)) group by `uq`.`cuid`) AS `average_all_quiz` from (`user` `u` join `user_location` `ul` on((`u`.`userLocationID` = `ul`.`userLocationID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_pt_evaluation_view`
--
DROP TABLE IF EXISTS `user_pt_evaluation_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_pt_evaluation_view` AS select `uec`.`cuid` AS `cuid`,`uec`.`evaluationCriteriaID` AS `evaluationCriteriaID`,`uec`.`criteriaPropositionID` AS `criteriaPropositionID`,`uec`.`plannedtrainingid` AS `plannedtrainingid`,`uec`.`criteriacomment` AS `criteriacomment`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`ec`.`criteria` AS `criteria`,`cp`.`criteria_proposition` AS `criteria_proposition`,`ef`.`evaluationFormID` AS `evaluationFormID` from (((((`user_evaluation_criteria` `uec` join `user` `u` on((`uec`.`cuid` = `u`.`cuid`))) join `evaluation_criteria` `ec` on((`uec`.`evaluationCriteriaID` = `ec`.`evaluationCriteriaID`))) join `criteria_proposition` `cp` on((`uec`.`criteriaPropositionID` = `cp`.`criteriaPropositionID`))) join `planned_training` `pt` on((`uec`.`plannedtrainingid` = `pt`.`plannedTrainingID`))) join `evaluation_form` `ef` on((`pt`.`evaluationFormID` = `ef`.`evaluationFormID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_pt_view`
--
DROP TABLE IF EXISTS `user_pt_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_pt_view` AS select `pt`.`plannedTrainingID` AS `plannedTrainingID`,`t`.`training_name` AS `training_name`,`pt`.`startDate` AS `startDate`,`pt`.`endDate` AS `endDate`,`uts`.`cuid` AS `cuid`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`ul`.`region` AS `region`,`ul`.`town` AS `town`,`ul`.`site` AS `site` from ((((((`planned_training` `pt` join `trainingsession_plannedtraining` `tp` on((`pt`.`plannedTrainingID` = `tp`.`plannedTrainingID`))) join `training_session` `ts` on((`tp`.`sessionID` = `ts`.`sessionID`))) join `user_training_session` `uts` on((`ts`.`sessionID` = `uts`.`sessionID`))) join `user` `u` on((`uts`.`cuid` = `u`.`cuid`))) join `user_location` `ul` on((`u`.`userLocationID` = `ul`.`userLocationID`))) join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_quiz_view`
--
DROP TABLE IF EXISTS `user_quiz_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_quiz_view` AS select `uq`.`user_quiz_ID` AS `user_quiz_ID`,`q`.`quiz_name` AS `quiz_name`,`q`.`creationDate` AS `creationDate`,`uq`.`cuid` AS `cuid`,`uq`.`quizID` AS `quizID`,`uq`.`dateTakingQuiz` AS `dateTakingQuiz`,`uq`.`plannedTrainingID` AS `plannedTrainingID`,`uq`.`score` AS `score`,`uq`.`quizTaken` AS `quizTaken`,`uq`.`quiz_hidden` AS `quiz_hidden`,`q`.`quizType` AS `quizType`,`sc`.`subCategoryID` AS `subCategoryID`,`sc`.`subCategory` AS `subCategory`,`c`.`category` AS `category`,`t`.`training_name` AS `training_name`,`tp`.`sessionID` AS `sessionID`,`ts`.`endTS` AS `trainingEndDate`,(select count(0) from `question` `qs` where (`qs`.`quizID` = `uq`.`quizID`)) AS `num_questions`,(select `utv`.`trainingTaken` from `user_training_view` `utv` where ((`utv`.`plannedTrainingID` = `uq`.`plannedTrainingID`) and (`utv`.`cuid` = `uq`.`cuid`))) AS `training_taken` from (((((((`user_quiz` `uq` join `quiz` `q` on((`uq`.`quizID` = `q`.`quizID`))) join `sub_category` `sc` on((`q`.`subCategoryID` = `sc`.`subCategoryID`))) join `category` `c` on((`sc`.`categoryID` = `c`.`categoryID`))) left join `planned_training` `pt` on((`uq`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) left join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`))) left join `trainingsession_plannedtraining` `tp` on((`pt`.`plannedTrainingID` = `tp`.`plannedTrainingID`))) left join `training_session` `ts` on((`tp`.`sessionID` = `ts`.`sessionID`)));

-- --------------------------------------------------------

--
-- Structure de la vue `user_training_view`
--
DROP TABLE IF EXISTS `user_training_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_training_view` AS select `uts`.`cuid` AS `cuid`,`uts`.`sessionID` AS `sessionID`,`uts`.`userCurrentPostID` AS `userCurrentPostID`,`uts`.`trainingTaken` AS `trainingTaken`,`uts`.`hidden` AS `hidden`,`uts`.`dateTaken` AS `dateTaken`,`ts`.`startTS` AS `startTS`,`ts`.`endTS` AS `endTS`,`tl`.`region` AS `region`,`tl`.`town` AS `town`,`tl`.`site` AS `site`,`pt`.`sessionDuration` AS `sessionDuration`,`pt`.`plannedTrainingID` AS `plannedTrainingID`,(select count(0) from `user_training_session` `uts2` where (`uts2`.`sessionID` = `uts`.`sessionID`)) AS `total_takers`,`pt`.`conferenceNumber` AS `conferenceNumber`,`pt`.`trainingCode` AS `trainingCode`,`pt`.`trainingType` AS `trainingType`,`pt`.`transmissionMode` AS `transmissionMode`,`t`.`training_name` AS `training_name`,`t`.`trainingID` AS `trainingID`,`pt`.`evaluationFormID` AS `evaluationFormID`,(select `post_user`.`postID` from `post_user` where (`post_user`.`cuid` = `uts`.`cuid`) order by `post_user`.`user_post_id` desc limit 1) AS `userCPID`,(select count(0) from `initial_training` where ((`initial_training`.`postID` = `userCPID`) and (`initial_training`.`trainingID` = `t`.`trainingID`))) AS `default_training`,(select `post`.`post_name` from `post` where (`post`.`postID` = `uts`.`userCurrentPostID`)) AS `post_name` from (((((`user_training_session` `uts` join `training_session` `ts` on((`uts`.`sessionID` = `ts`.`sessionID`))) left join `training_location` `tl` on((`ts`.`trainingLocationID` = `tl`.`trainingLocationID`))) join `trainingsession_plannedtraining` `tp` on((`ts`.`sessionID` = `tp`.`sessionID`))) join `planned_training` `pt` on((`tp`.`plannedTrainingID` = `pt`.`plannedTrainingID`))) join `training` `t` on((`pt`.`trainingID` = `t`.`trainingID`))) order by `uts`.`sessionID` desc;

-- --------------------------------------------------------

--
-- Structure de la vue `user_view`
--
DROP TABLE IF EXISTS `user_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_view` AS select `u`.`cuid` AS `cuid`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`u`.`gender` AS `gender`,`u`.`employmentDate` AS `employmentDate`,`u`.`number` AS `number`,`u`.`matricule` AS `matricule`,`u`.`bossID` AS `bossID`,`u`.`userLocationID` AS `userLocationID`,`u`.`userStatus` AS `userStatus`,`u`.`usr_img` AS `usr_img`,`u`.`state` AS `state`,`ul`.`region` AS `region`,`ul`.`town` AS `town`,`ul`.`site` AS `site`,`u`.`contractType` AS `contractType` from (`user` `u` join `user_location` `ul` on((`u`.`userLocationID` = `ul`.`userLocationID`)));

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `criteria_proposition`
--
ALTER TABLE `criteria_proposition`
  ADD CONSTRAINT `FKCriteria_P359538` FOREIGN KEY (`evaluationCriteriaID`) REFERENCES `evaluation_criteria` (`evaluationCriteriaID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `FKDepartment356912` FOREIGN KEY (`directionID`) REFERENCES `direction` (`directionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `evaluationform_evaluationcriteria`
--
ALTER TABLE `evaluationform_evaluationcriteria`
  ADD CONSTRAINT `FKEvaluation100972` FOREIGN KEY (`evaluationFormID`) REFERENCES `evaluation_form` (`evaluationFormID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEvaluation807921` FOREIGN KEY (`evaluationCriteriaID`) REFERENCES `evaluation_criteria` (`evaluationCriteriaID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `initial_training`
--
ALTER TABLE `initial_training`
  ADD CONSTRAINT `FKInitial_Tr864659` FOREIGN KEY (`trainingID`) REFERENCES `training` (`trainingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKInitial_Tr37515` FOREIGN KEY (`postID`) REFERENCES `post` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FKNotificati330256` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `planned_training`
--
ALTER TABLE `planned_training`
  ADD CONSTRAINT `fk_planned_training_user` FOREIGN KEY (`creator`) REFERENCES `user` (`cuid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FKPlanned_Tr138439` FOREIGN KEY (`trainingID`) REFERENCES `training` (`trainingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKPlanned_Tr35709` FOREIGN KEY (`evaluationFormID`) REFERENCES `evaluation_form` (`evaluationFormID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FKPost39315` FOREIGN KEY (`serviceID`) REFERENCES `service` (`serviceID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post_user`
--
ALTER TABLE `post_user`
  ADD CONSTRAINT `FKPost_User171273` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKPost_User612219` FOREIGN KEY (`postID`) REFERENCES `post` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `proposition`
--
ALTER TABLE `proposition`
  ADD CONSTRAINT `FKPropositio705986` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FKQuestion124206` FOREIGN KEY (`quizID`) REFERENCES `quiz` (`quizID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `FKQuiz795813` FOREIGN KEY (`creator`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKQuiz687124` FOREIGN KEY (`plannedTrainingID`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKQuiz953395` FOREIGN KEY (`subCategoryID`) REFERENCES `sub_category` (`subCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `resource`
--
ALTER TABLE `resource`
  ADD CONSTRAINT `fk_resource_user` FOREIGN KEY (`creator`) REFERENCES `user` (`cuid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `resource_training`
--
ALTER TABLE `resource_training`
  ADD CONSTRAINT `fk_resource_training` FOREIGN KEY (`plannedtrainingid`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKResource_T357364` FOREIGN KEY (`resourceID`) REFERENCES `resource` (`resourceID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `FKService849374` FOREIGN KEY (`departmentID`) REFERENCES `department` (`departmentID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `FKSub_Catego512632` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `trainer_trainingsession`
--
ALTER TABLE `trainer_trainingsession`
  ADD CONSTRAINT `FKTrainer_Tr948124` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKTrainer_Tr305950` FOREIGN KEY (`sessionID`) REFERENCES `training_session` (`sessionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKTrainer_Tr575785` FOREIGN KEY (`exTrainerID`) REFERENCES `external_trainer` (`trainerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `trainingsession_plannedtraining`
--
ALTER TABLE `trainingsession_plannedtraining`
  ADD CONSTRAINT `FKTrainingSe964262` FOREIGN KEY (`sessionID`) REFERENCES `training_session` (`sessionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKTrainingSe372935` FOREIGN KEY (`plannedTrainingID`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `training_session`
--
ALTER TABLE `training_session`
  ADD CONSTRAINT `FKTraining_S911243` FOREIGN KEY (`trainingLocationID`) REFERENCES `training_location` (`trainingLocationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKUser375824` FOREIGN KEY (`userLocationID`) REFERENCES `user_location` (`userLocationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_evaluation_criteria`
--
ALTER TABLE `user_evaluation_criteria`
  ADD CONSTRAINT `FKUser_Evalu286162` FOREIGN KEY (`evaluationCriteriaID`) REFERENCES `evaluation_criteria` (`evaluationCriteriaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Evalu348802` FOREIGN KEY (`criteriaPropositionID`) REFERENCES `criteria_proposition` (`criteriaPropositionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Evalu566755` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_evaluation_criteria` FOREIGN KEY (`plannedtrainingid`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_question`
--
ALTER TABLE `user_question`
  ADD CONSTRAINT `FKUser_Quest937107` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Quest333619` FOREIGN KEY (`quizID`) REFERENCES `quiz` (`quizID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Quest349780` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Quest378283` FOREIGN KEY (`propositionID`) REFERENCES `proposition` (`propositionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Quest929325` FOREIGN KEY (`plannedTrainingID`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_quiz`
--
ALTER TABLE `user_quiz`
  ADD CONSTRAINT `FKUser_Quiz728969` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Quiz250403` FOREIGN KEY (`plannedTrainingID`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Quiz846109` FOREIGN KEY (`quizID`) REFERENCES `quiz` (`quizID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_training_evaluation`
--
ALTER TABLE `user_training_evaluation`
  ADD CONSTRAINT `FKUser_Train17992` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Train30449` FOREIGN KEY (`evaluationFormID`) REFERENCES `evaluation_form` (`evaluationFormID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_training_evaluation` FOREIGN KEY (`plannedtrainingid`) REFERENCES `planned_training` (`plannedTrainingID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_training_session`
--
ALTER TABLE `user_training_session`
  ADD CONSTRAINT `FKUser_Train597318` FOREIGN KEY (`cuid`) REFERENCES `user` (`cuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKUser_Train955143` FOREIGN KEY (`sessionID`) REFERENCES `training_session` (`sessionID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
