using backend.Model;
using backend.Model.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySql.Data.MySqlClient;
using System.Drawing;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace backend.Repositorio.Implementations
{
    public class RelatorioRepositorioImpl : IRelatorioRepositorio
    {
        private readonly MySQLContext _context;

        public RelatorioRepositorioImpl(MySQLContext context)
        {
            _context = context;
        }

        public List<Relatotio> GetRelatorioUsuarioByAno(int idUsuario, int ano)
        {


            string sql = "CREATE TEMPORARY TABLE meses(id INT, mes varchar(3)); " +
                         "Insert into meses values(1,'JAN'), (2, 'FEV'), (3, 'MAR'), (4, 'ABR'), (5, 'MAI'), (6, 'JUN'), (7, 'JUL'), (8, 'AGO'), (9, 'SET'), (10, 'OUT'), (11, 'NOV'), (12, 'DEZ'); " +
                         "Select * From(Select id, mes From meses) meses " +
                         "  Left join(Select Month(data) as despesaMes, sum(valor) as despesaValor From Despesa where idUsuario = @idUsuario  and year(data) = @ano  " +
                         " Group by Month(data)) d on meses.id = d.despesaMes " +
                         "  Left Join(Select Month(data) as receitaMes, sum(valor) as receitaValor From Receita where idUsuario = @idUsuario  and year(data) = @ano " +
                         " Group by Month(data)) r on meses.id = r.receitaMes; ";
                        // "DROP TABLE meses;";

            using (_context)
            {
                try
                {
                    var list = _context.Relatotio.FromSql(sql, new MySqlParameter("@idUsuario", idUsuario), new MySqlParameter("@ano", ano)).ToList();
                    return list;

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public decimal GetTotalDespesaUsuarioByAno(int idUsuario, int ano)
        {
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                decimal value = 0;
                try
                {
                    command.CommandText = @"SELECT  sum(valor)  FROM Despesa where idUsuario = @idUsuario  and year(data) = @ano";
                    command.CommandType = CommandType.Text;
                    command.Parameters.Add(new MySqlParameter("@idUsuario", idUsuario));
                    command.Parameters.Add(new MySqlParameter("@ano", ano));
                    _context.Database.OpenConnection();
                    using (var result = command.ExecuteReader())
                    {
                        if (result.Read())
                        {
                            value = result.GetDecimal(0);
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

        public decimal GetTotalReceitaUsaurioByAno(int idUsuario, int ano)
        {
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                decimal value = 0;
                try
                {
                    command.CommandText = @"SELECT  sum(valor)  FROM Receita where idUsuario = @idUsuario  and year(data) = @ano";
                    command.CommandType = CommandType.Text;
                    command.Parameters.Add(new MySqlParameter("@idUsuario", idUsuario));
                    command.Parameters.Add(new MySqlParameter("@ano", ano));
                    _context.Database.OpenConnection();
                    using (var result = command.ExecuteReader())
                    {
                        if (result.Read())
                        {
                            value = result.GetDecimal(0);
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
