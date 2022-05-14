using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
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

        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var client = new SendGridClient(_config["Sendgrid:Key"]);
            var sendgridMessage = new SendGridMessage
            {
                From = new EmailAddress(_config["Sendgrid:Email"], _config["Sendgrid:User"]),
                Subject = emailSubject,
                PlainTextContent = message,
                HtmlContent = message,
            };

            sendgridMessage.AddTo(new EmailAddress(userEmail));
            sendgridMessage.SetClickTracking(false, false);

            await client.SendEmailAsync(sendgridMessage);
        }
    }
}
