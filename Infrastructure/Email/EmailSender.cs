using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Resend;
using System.Threading.Tasks;

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;
        private readonly IResend _emailSender;

        public EmailSender(IConfiguration config, IResend emailSender)
        {
            _config = config;
            _emailSender = emailSender;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var emailMessage = new EmailMessage
            {
                From = "whatever@resend.dev",
                To = userEmail,
                Subject = emailSubject,
                HtmlBody = message,
            };

            await _emailSender.EmailSendAsync(emailMessage);
        }
    }
}
