using backend.Model;
using backend.Model.Context;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace backend.Repositorio.Implementations
{
    public class LancamentoRepositorioImpl : ILancamentoRepositorio
    {
        private readonly MySQLContext _context;

        public LancamentoRepositorioImpl(MySQLContext context)
        {
            _context = context;
        }

        public List<Lancamento> FindByMesAno(DateTime data, int idUsuario)
        {
            int mes = data.Month;
            int ano = data.Year;
            //Mysql  CONV(SUBSTRING(uuid(), 4, 4), 16, 10) as id
            //SqlServer ABS(Checksum(NewId()) %10000) as id
            string sql = "Select cast(CONV(SUBSTRING(uuid(), 4, 4), 16, 10) as UNSIGNED) as id, lancamentos.* From ( " + 
                         "Select d.idUsuario, data, idCategoria, valor*-1 as valor, 'Despesas' as Tipo, d.id as idDespesa, 0 as idReceita, d.descricao, c.descricao as categoria " +
                         "  FROM Despesa d " +
                         " Inner Join Categoria c on d.idCategoria = c.id " +
                         " where d.idUsuario = @idUsuario " +
                         "   and Month(data) = @mes " +
                         "   and  Year(data) = @ano " +
                         " union " +
                         "Select r.idUsuario, data, idCategoria, valor, 'Receitas' as Tipo, 0 as idDespesa, r.id as idReceita, r.descricao, cr.descricao as categoria " +
                         "  FROM Receita r " +
                         " Inner Join Categoria cr on r.idCategoria = cr.id " +
                         " where r.idUsuario = @idUsuario " +
                         "   and Month(data) = @mes " +
                         "   and  Year(data) = @ano " +
                         ") lancamentos ";

            using (_context)
            {
                try
                {
                    var list = _context.Lancamento.FromSql(sql, new MySqlParameter("@idUsuario", idUsuario), new MySqlParameter("@mes", data.Month), new MySqlParameter("@ano", data.Year)).ToList();
                    return list.OrderBy(item => item.Data).ThenBy(item => item.Categoria).ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public decimal GetSaldo(int idUsuario)
        {
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                decimal value = 0;
                try
                {
                    command.CommandText = @"Select (SELECT sum(valor) FROM Receita Where idUsuario = @idUsuario) - (SELECT sum(valor) FROM Despesa Where idUsuario = @idUsuario)"; ;
                    command.CommandType = CommandType.Text;
                    command.Parameters.Add(new MySqlParameter("@idUsuario", idUsuario));
                    _context.Database.OpenConnection();
                    using (var result = command.ExecuteReader())
                    {
                        if (result.Read())
                        {
                            value  = result.GetDecimal(0);
                        }
                    }
                }
                catch 
                {
                    return 0;
                }
                return value;
            }            
        }
    }
}

