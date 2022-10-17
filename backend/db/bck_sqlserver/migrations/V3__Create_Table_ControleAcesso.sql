USE [DespesasPessoaisDB]
GO

CREATE TABLE [dbo].[ControleAcesso](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NULL,
	[login] [varchar](50) NULL,
	[senha] [nvarchar](max) NOT NULL,
	[dataCriacao] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_ControleAcesso] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ControleAcesso] ADD  CONSTRAINT [DF_ControleAcesso_dataCriacao]  DEFAULT (getdate()) FOR [dataCriacao]

