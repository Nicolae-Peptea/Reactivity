using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, ITokenService tokenService, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _config = config;
            _httpClient = new HttpClient
            {
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            AppUser user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserDto(user);
            }

            return Unauthorized();
        }

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

            if (result.Succeeded)
            {
                return CreateUserDto(user);
            }

            return BadRequest("Prolbem registering the user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            AppUser user = await _userManager.Users.Include(p => p.Photos).
                FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserDto(user);
        }

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

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest("Problem Creating user account");
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
    }
}
