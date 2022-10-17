use DespesasPessoaisDB;

CREATE  TABLE `DespesasPessoaisDB`.`Categoria` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `idUsuario` INT NULL ,
  `idTipoCategoria` INT NULL ,
  `descricao` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  COLLATE = utf8_general_ci;