ALTER DATABASE `DespesasPessoaisDB`
    DEFAULT CHARACTER SET = utf8
  DEFAULT COLLATE = utf8_general_ci;

CREATE  TABLE `TipoCategoria` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `descricao` VARCHAR(50) NULL ,
  PRIMARY KEY (`id`) )
  DEFAULT CHARACTER SET = utf8
  DEFAULT COLLATE = utf8_general_ci;