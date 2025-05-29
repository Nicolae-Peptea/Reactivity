using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEmailSender
    {
        Task<HttpStatusCode> SendEmailAsync(string userEmail, string emailSubject, string message);
    }
}
