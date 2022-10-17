USE [DespesasPessoaisDB]
GO

CREATE TABLE [dbo].[Receita](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NULL,
	[idCategoria] [int] NULL,
	[data] [smalldatetime] NULL,
	[descricao] [varchar](50) NULL,
	[valor] [money] NULL,
 CONSTRAINT [PK_Receita] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Receita] ADD  CONSTRAINT [DF_Receita_Data]  DEFAULT (getdate()) FOR [data]