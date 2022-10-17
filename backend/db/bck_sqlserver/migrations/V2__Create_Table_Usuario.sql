USE [DespesasPessoaisDB]
GO

IF NOT EXISTS (SELECT name 
                FROM [sys].tables
                WHERE name = N'Usuario')
Begin
	/****** Object:  Table [dbo].[Usuario]    Script Date: 26/09/2022 18:20:50 ******/
	SET ANSI_NULLS ON
	SET QUOTED_IDENTIFIER ON

	CREATE TABLE [dbo].[Usuario](
		[id] [int] IDENTITY(1,1) NOT NULL,
		[nome] [varchar](50) NULL,
		[sobreNome] [varchar](50) NULL,
		[telefone] [varchar](15) NULL,
		[email] [varchar](50) NULL,
	 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
	(
		[id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]

end