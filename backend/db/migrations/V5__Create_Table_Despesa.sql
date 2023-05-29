use DespesasPessoaisDB;

CREATE  TABLE `Despesa` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `idUsuario` INT NULL ,
  `idCategoria` INT NULL ,
  `data` TIMESTAMP NULL ,
  `descricao` VARCHAR(50) NULL ,
  `valor` DECIMAL(10,2) NULL ,
  `dataVencimento` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  DEFAULT COLLATE = utf8_general_ci;