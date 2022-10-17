using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Principal;
using backend.Model;
using backend.Repositorio;
using backend.Security.Configuration;

namespace backend.Business.Implementations
{
    public class FileBusinessImpl : IFileBusiness
    {
        public byte[] GetPDFFile()
        {
            string path = Directory.GetCurrentDirectory();

            string fullPath = path + "\\FilesDownload\\apsnet.pdf";
            return File.ReadAllBytes(fullPath);
        }
    }
}
