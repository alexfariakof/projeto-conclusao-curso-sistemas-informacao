using backend.Business;
using backend.Business.Generic;
using backend.Business.Implementations;
using backend.Model.Context;
using backend.Repositorio;
using backend.Repositorio.Generic;
using backend.Repositorio.Implementations;
using backend.Security.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using Serilog;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.Data;
using System.Security.Cryptography;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(c =>
            {
                c.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();

                });
             });

            // Configuração de Conexão com Bando de Dados
            string connection = Configuration["DefaultMySqlConnection:MySqlConnectionString"];
            //string connection = Configuration["EstacioMariaDbSqlConnection:MySqlConnectionString"];
            //string connection = Configuration["MySqlConnection:MySqlConnectionString"];
            //string connection = Configuration["DockerMySqlConnection:MySqlConnectionString"];

            services.AddDbContext<MySQLContext>(options => options.UseMySql(connection));
            
            MigrateDatabase(connection);
            // Fim de configuração com banco de dados


            // Configura Autorização para uso do Rest
            this.ConfigureAutorization(services);
       
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new Info
                    {
                        Title = "API REST Despesas Pessoais",
                        Version = "v1"
                    });

            });

            // Injeção de Dependencia 
            //services.AddScoped<ICategoriaBusiness, CategoriaBusinessImpl>();
            //services.AddScoped<IUsuarioBusiness, UsuarioBusinessImpl>();
            services.AddScoped(typeof(IBusiness<>), typeof(GenericBusiness<>));
            services.AddScoped<IControleAcessoBusiness, ControleAcessoBusinessImpl>();
            services.AddScoped<ILancamentoBusiness, LancamentoBusinessImpl>();
            services.AddScoped<IRelatorioBusiness, RelatorioBusinessImpl>();
            services.AddScoped<IFileBusiness, FileBusinessImpl>();

            //services.AddScoped<IUsuarioRepositorio, UsuarioRepositorioImpl>();
            services.AddScoped<IControleAcessoRepositorio, ControleAcessoRepositorioImpl>();
            services.AddScoped<ILancamentoRepositorio, LancamentoRepositorioImpl>();
            services.AddScoped<IRelatorioRepositorio, RelatorioRepositorioImpl>();

            services.AddScoped(typeof(IRepositorio<>), typeof(GenericRepositorio<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                string swaggerJsonBasePath = string.IsNullOrWhiteSpace(c.RoutePrefix) ? "." : "..";
                c.SwaggerEndpoint($"{swaggerJsonBasePath}/swagger/v1/swagger.json", "API Despesas Pessoais V1");
            });

            //Starting our API in Swagger page
            RewriteOptions option = new RewriteOptions();
            option.AddRedirect("^$", "swagger");
            app.UseRewriter(option);

            app.UseStaticFiles();
            app.UseMvc();
        }


        private void ConfigureAutorization(IServiceCollection services)
        {
            Security.Configuration.SigningConfigurations signingConfigurations = new Security.Configuration.SigningConfigurations();
            services.AddSingleton(signingConfigurations);

            TokenConfiguration tokenConfigurations = new TokenConfiguration();

            new ConfigureFromConfigurationOptions<TokenConfiguration>(
                Configuration.GetSection("TokenConfigurations")
            )
            .Configure(tokenConfigurations);

            services.AddSingleton(tokenConfigurations);


            services.AddAuthentication(authOptions =>
            {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(bearerOptions =>
            {
                Microsoft.IdentityModel.Tokens.TokenValidationParameters paramsValidation = bearerOptions.TokenValidationParameters;
                paramsValidation.IssuerSigningKey = signingConfigurations.Key;
                paramsValidation.ValidAudience = tokenConfigurations.Audience;
                paramsValidation.ValidIssuer = tokenConfigurations.Issuer;

                // Validates the signing of a received token
                paramsValidation.ValidateIssuerSigningKey = true;

                // Checks if a received token is still valid
                paramsValidation.ValidateLifetime = true;

                // Tolerance time for the expiration of a token (used in case
                // of time synchronization problems between different
                // computers involved in the communication process)
                paramsValidation.ClockSkew = TimeSpan.Zero;
            });

            // Enables the use of the token as a means of
            // authorizing access to this project's resources
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                    .RequireAuthenticatedUser().Build());
            });
        }

        private void MigrateDatabase(string connection)
        {
            try
            {                
                var evolveConnection = new MySql.Data.MySqlClient.MySqlConnection(connection);
                var evolve = new Evolve.Evolve(evolveConnection, msg => Log.Information(msg))
                {
                    Locations = new List<string> { "db/migrations", "db/dataset" },
                    IsEraseDisabled = true,
                };
                evolve.Migrate();                
            }
            catch (Exception ex)
            {
                Log.Error("Databse migration failed", ex);
                throw;
            }
        }

    }
}