use DespesasPessoaisDB;

CREATE  TABLE `Lancamento` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `idUsuario` INT NULL ,
  `idDespesa` INT NULL ,
  `idReceita` INT NULL ,
  `valor` DECIMAL(10,2) NULL ,
  `data` TIMESTAMP NULL ,
  `descricao` VARCHAR(50) NULL ,
  `dataCriacao` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  DEFAULT COLLATE = utf8_general_ci;