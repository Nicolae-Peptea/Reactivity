using API.DTO;
using API.Services;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        private readonly HttpClient _httpClient;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, ITokenService tokenService,
            IConfiguration config, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _config = config;
            _emailSender = emailSender;
            _httpClient = new HttpClient
            {
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            AppUser user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized("Invalid email");
            }

            // allows the test user accounts to login without asking for email confirmation 
            if (user.UserName == "bob" || user.UserName == "jane" || user.UserName == "tom")
            {
                user.EmailConfirmed = true;
            }

            if (!user.EmailConfirmed)
            {
                return Unauthorized("Email not confirmed");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return CreateUserDto(user);
            }

            return Unauthorized("Invalid password");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("userName", "Username Taken");
                return ValidationProblem();
            }

            AppUser user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest("Problem registering user");
            }

            await SendRegistrationEmail(user);

            return Ok("Registration success - please verify email");
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string email, string token)
        {
            if (String.IsNullOrEmpty(email))
            {
                return BadRequest("There is no email address send to verify");
            }

            if (String.IsNullOrEmpty(token))
            {
                return BadRequest("There is no token send to verify");
            }

            var user = await _userManager.FindByEmailAsync(email);
            
            if (user == null)
            {
                return Unauthorized();
            }

            if (user.EmailConfirmed)
            {
                return Ok("Email already confirmed");
            }

            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded)
            {
                return BadRequest("Could not verify email address");
            }

            return Ok("Email Confirmed - you can now login");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfimrationLink(string email)
        {
            AppUser user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Unauthorized();
            }

            await SendRegistrationEmail(user);

            return Ok("Email Verification link resent");
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            AppUser user = await _userManager.Users.Include(p => p.Photos).
                FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            await SetRefreshToken(user);
            return CreateUserDto(user);
        }

        [AllowAnonymous]
        [HttpPost("fbLogin")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            string fbVerifyKey = _config["Facebook:AppId"] + "|" + _config["Facebook:AppSecret"];
            HttpResponseMessage verifyToken = await _httpClient
                .GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKey}");

            if (!verifyToken.IsSuccessStatusCode)
            {
                return Unauthorized();
            }

            string fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";
            HttpResponseMessage response = await _httpClient.GetAsync(fbUrl);

            if (!response.IsSuccessStatusCode)
            {
                return Unauthorized();
            }

            string content = await response.Content.ReadAsStringAsync();
            dynamic fbInfo = JsonConvert.DeserializeObject<dynamic>(content);

            string username = (string)fbInfo.id;
            AppUser user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (user != null)
            {
                return CreateUserDto(user);
            }

            user = new AppUser
            {
                DisplayName = (string)fbInfo.name,
                Email = (string)fbInfo.email,
                UserName = (string)fbInfo.id,
                Photos = new List<Photo> 
                { 
                    new Photo 
                    { 
                        Id = $"fb_{(string)fbInfo.id}",
                        Url=(string)fbInfo.picture.data.url,
                        IsMain = true
                    } 
                }
            };

            user.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest("Problem Creating user account");
            }

            await SetRefreshToken(user);
            return CreateUserDto(user);
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            string refreshToken = Request.Cookies["refreshToken"];
            AppUser user = await _userManager.Users
                .Include(r => r.RefreshTokens)
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null)
            {
                return Unauthorized();
            }

            RefreshToken oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if (oldToken != null && !oldToken.IsActive)
            {
                return Unauthorized();
            }

            if (oldToken != null)
            {
                oldToken.Revoked = DateTime.UtcNow;
            }

            return CreateUserDto(user);
        }

        private UserDto CreateUserDto(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
            };
        }

        private async Task SetRefreshToken(AppUser user)
        {
            RefreshToken refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        private async Task SendRegistrationEmail(AppUser user)
        {
            var origin = Request.Headers["origin"];
            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            string verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            string message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify Email</a></p>";

            await _emailSender.SendEmailAsync(user.Email, $"{user.DisplayName}, please verify email", message);
        }
    }
}
