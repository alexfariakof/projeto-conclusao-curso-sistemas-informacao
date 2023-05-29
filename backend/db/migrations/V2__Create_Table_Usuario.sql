use DespesasPessoaisDB;

CREATE  TABLE `Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(100) NULL ,
  `telefone` VARCHAR(15) NULL ,
  `email` VARCHAR(50) NULL ,
  `fotoPerfil` BLOB NULL,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  DEFAULT COLLATE = utf8_general_ci;
