using backend.Model;
using backend.Data.VO;

namespace backend.Business
{
    public interface IControleAcessoBusiness
    {
        object FindByLogin(ControleAcesso controleAcesso);
        bool Create(ControleAcessoVO controleAcessoVO);
        bool RecoveryPassword(string email);
    }
}
