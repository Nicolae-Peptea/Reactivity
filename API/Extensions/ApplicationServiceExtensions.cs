using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Domain;
using Infrastructure.Email;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;
using Resend;
using System;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(options =>
            {
                string connStr = config.GetConnectionString("DefaultConnection");

                options.UseSqlServer(connStr);
            });


            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithExposedHeaders("WWW-Authenticate", "Pagination")
                    .WithOrigins("https://localhost:3000", "http://localhost:3000");
                });
            });

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddHttpClient<ResendClient>();
            services.Configure<ResendClientOptions>(opt =>
            {
                opt.ApiToken = config["Resend:ApiToken"];
            });

            services.AddScoped<IResend, ResendClient>();

            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<IEmailSender, EmailSender>();

            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            services.AddSignalR();

            return services;
        }
    }
}
