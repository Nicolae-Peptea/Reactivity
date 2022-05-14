﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string userEmail, string emailSubject, string message);
    }
}
