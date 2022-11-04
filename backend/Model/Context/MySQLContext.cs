using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Model.Context
{
    public class MySQLContext : DbContext
    {
        public MySQLContext()
        {

        }

        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options) {}

        public DbSet<ControleAcesso> ControleAcesso { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Despesa> Despesa { get; set; }
        public DbSet<Receita> Receita { get; set; }
        public DbSet<Lancamento> Lancamento { get; set; }
        public DbSet<Relatotio> Relatotio { get; set; }        
    }
}
