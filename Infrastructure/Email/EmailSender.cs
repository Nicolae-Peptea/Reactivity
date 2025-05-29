using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task<HttpStatusCode> SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var client = new SendGridClient(_config["Sendgrid:ApiKey"]);
            var fromEmailAddress = _config["Sendgrid:FromEmailAddress"];
            var sendgridMessage = new SendGridMessage
            {
                From = new EmailAddress(fromEmailAddress),
                Subject = emailSubject,
                PlainTextContent = message,
                HtmlContent = message,
            };

            sendgridMessage.AddTo(new EmailAddress(userEmail));
            sendgridMessage.SetClickTracking(false, false);
            Response result = null;
            try
            {
                result = await client.SendEmailAsync(sendgridMessage);
            }
            catch (System.Exception)
            {
                throw;
            }

            if (result.IsSuccessStatusCode)
            {
                return result.StatusCode;
            }

            return HttpStatusCode.BadRequest;
        }
    }
}