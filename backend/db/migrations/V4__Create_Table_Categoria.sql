use DespesasPessoaisDB;

CREATE  TABLE `Categoria` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `idUsuario` INT NULL ,
  `idTipoCategoria` INT NULL ,
  `descricao` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  DEFAULT COLLATE = utf8_general_ci;