use DespesasPessoaisDB;

CREATE  TABLE `DespesasPessoaisDB`.`ControleAcesso` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `idUsuario` INT NULL ,
  `login` VARCHAR(50) NULL ,
  `senha` VARCHAR(512) NULL ,
  `dataCriacao` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  COLLATE = utf8_general_ci;