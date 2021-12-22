using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
