using backend.Business;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IFileBusiness _fileBusiness;

        public FileController(IFileBusiness fileBusiness)
        {
            _fileBusiness = fileBusiness;
        }

        [HttpGet]
        //[Authorize("Bearer")]
        public IActionResult DownloadFile()
        {
            byte[] buffer = _fileBusiness.GetPDFFile();
            if (buffer != null)
            {
                HttpContext.Response.ContentType = "application/pdf";
                HttpContext.Response.Headers.Add("content-length", buffer.Length.ToString());
                HttpContext.Response.Body.Write(buffer, 0, buffer.Length);
            }
            return new ContentResult();
        }


        [HttpPost("Upload")]
        public async Task<IActionResult> Upload(int idUsuario, int IdTipoLancamento,  IFormFile file)
        {
            try
            {
                // full path to file in temp location
                var filePath = Path.GetTempFileName();
                
                // Não é permitido realizar operação pasta somente leitura;
                //var filePath = Path.Combine(Directory.GetCurrentDirectory(), "FilesDownload");

                if (file.Length > 0)
                    using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                // process uploaded files
                // Don't rely on or trust the FileName property without validation.

                return Ok(new { count = 1, file.Length, filePath });
            }
            catch(Exception ex)
            {
                return BadRequest( new { ex });
            }
        }


        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Upload(int idUsuario, int IdTipoLancamento, List<IFormFile> files)
        {

            try
            {
                long size = files.Sum(f => f.Length);

                // full path to file in temp location
                //var filePath = Path.GetTempFileName();
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "FilesDownload");

                foreach (var formFile in files)
                {
                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }
                }

                // process uploaded files
                // Don't rely on or trust the FileName property without validation.

                return Ok(new { count = files.Count, size, filePath });
            }
            catch
            {
                return BadRequest();
            }            
        }
 
    }
}
