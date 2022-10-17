USE [DespesasPessoaisDB]
GO

CREATE TABLE [dbo].[Despesa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NULL,
	[idCategoria] [int] NULL,
	[data] [smalldatetime] NULL,
	[descricao] [varchar](50) NULL,
	[valor] [money] NULL,
	[dataVencimento] [smalldatetime] NULL,
 CONSTRAINT [PK_Despesa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Despesa] ADD  CONSTRAINT [DF_Despesa_Data]  DEFAULT (getdate()) FOR [data]