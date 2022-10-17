USE [DespesasPessoaisDB]
GO

CREATE TABLE [dbo].[Lancamento](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NOT NULL,
	[idDespesa] [int] NULL,
	[idReceita] [int] NULL,
	[valor] [money] NULL,
	[data] [smalldatetime] NULL,
	[descricao] [varchar](100) NULL,
	[dataCriacao] [smalldatetime] NULL,
 CONSTRAINT [PK_Lancamento] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Lancamento] ADD  CONSTRAINT [DF_Lancamento_dataCriacao]  DEFAULT (getdate()) FOR [dataCriacao]
GO

