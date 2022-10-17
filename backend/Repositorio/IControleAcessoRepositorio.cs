using backend.Model;
using backend.Data.VO;

namespace backend.Repositorio
{
    public interface IControleAcessoRepositorio
    { 
        ControleAcesso FindByEmail(ControleAcesso controleAcesso);
        Usuario GetUsuarioByEmail(string login);
        bool  Create(ControleAcessoVO controleAcessoVO);

        bool RecoveryPassword(string email);

    }
}
