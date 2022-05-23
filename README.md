
<div id="top"></div>

# Reactivities

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-features">Main Features</a></li>
        <li><a href="#integrated-services">Integrated Services</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#visuals">Visuals</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Reactivities is a social app where the user can spread the word about the activities is hosting or attending, follow other users and talk about different activties with other members from the comunity

![home-page.png][home-page]


<p align="right">(<a href="#top">back to top</a>)</p>


### Main Features

- Register (the account is enabled after email confirmation)
- Facebook reagistration
- Login using Identity Package with refresh JWT
- Logout
- Add/Delete/Edit an activity
- Own/Attend and activity
- Activity chat
- Sort and filter the activities
- Follow/Unfollow users
- Upload profile pictures
- User details page
- Input validation for client and backend

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* Clean Architecture
* CQRS with Mediator desgin pattern
* Web API

Back End:
* [ASP .NET Core 5][asp-net-core]
* [C#][c#]
* [Entity Framework Core][ef-core]
* [AutoMapper][auto-mapper]
* [FluentValidation][fluent-validation]

Security:
* [Identity][identity-core]
* [JWT][jwt] 

Chat:
* [SignalR][signal-R]

Front End:
* [HTML][html]
* [CSS][css]
* [TypeScript][ts]
* [React.js 17.0.2][react]
* [MobX][mob-x]
* [Semantic UI 2.0.4][semantic-ui]


Database Management:
* [PostgreSQL][postgres-server]
* [pgAdmin][pgAdmin]

Developing Tools:
* [Microsoft Visual Studio][visual-studio]
* [Microsoft Visual Studio Code][visual-studio-code]

<p align="right">(<a href="#top">back to top</a>)</p>


### Integrated Services

Email:
* [Sendgrid][sendgrid]

Third party login:
* [Facebook SDK][facebook-sdk]


<p align="right">(<a href="#top">back to top</a>)</p>

### Visuals

Landing Page

![landing-page.png][landing-page]

Register Page

![register-page.png][register-page]

Login Page

![login-page.png][login-page]

Login / register with Facebook

![login-facebook.png][login-facebook]

Main page:

![home-page.png][home-page]

Activity details page

![activity-details.png][activity-details]

Add activity from

![create-activity.png][create-activity]

Edit activity form

![edit-activity.png][edit-activity]

Pofile details page

![profile-page.png][profile-page]

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

-  Create a PostgreSQL database
- Go to appsettings.json -> Fill in the ConnectionStrings section with the database Connection String

  ```json
      "ConnectionStrings": {
        "DefaultConnection": "<your-database-connection-string-comes-here>",
      }
  ```

  
  
- Create a SendGrid account [here](https://signup.sendgrid.com/)
- Go to appsettings.json -> Fill in the ApiKey, User and Email related to your Sendgrid account. Take a look on how to create it in your account [here][sendgrid-key]
	```json
      "Sendgrid": {
        "Key": "<your-sendgrid-api-key-comes-here>",
	"User": "<your-user-comes-here>",
	"Email": "<your-sender-email-address-comes-here>"
      }
	```
- Create a Cloudinary Account and update the fields from appsettings.json related to your account details
	```json
     "Cloudinary": {
	    "CloudName": "",
	    "ApiKey": "",
	    "ApiSecret": ""
 	 },
	```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run the project with Kestrel Server.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

This project is the result of Complete guide to building an app with .Net Core and React course from Udemy to which I added some improvements.

Neil Cummings is a fantastic teacher

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/mihaibuga/online-shop/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mihai-buga

[asp-net-core]: https://dotnet.microsoft.com/en-us/learn/aspnet/what-is-aspnet-core
[ef-core]: https://docs.microsoft.com/en-us/ef/core/
[auto-mapper]: https://automapper.org/
[c#]: https://docs.microsoft.com/en-us/dotnet/csharp/
[html]: https://html.com/
[css]: https://www.w3.org/Style/CSS/Overview.en.html
[ts]: https://www.typescriptlang.org/
[react]: https://reactjs.org/
[react-net]: https://reactjs.net/
[postgres-server]: https://www.microsoft.com/en-us/sql-server/sql-server-2019](https://www.postgresql.org/
[pgAdmin]: https://www.pgadmin.org/
[visual-studio]: https://visualstudio.microsoft.com/
[identity-core]: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0&tabs=visual-studio
[signal-R]: https://dotnet.microsoft.com/en-us/apps/aspnet/signalr
[jwt]: https://jwt.io/
[fluent-validation]: https://docs.fluentvalidation.net/en/latest/
[semantic-ui]: https://semantic-ui.com/
[mob-x]: https://mobx.js.org/README.html
[visual-studio-code]: https://code.visualstudio.com/

[mihai-buga]: https://github.com/mihaibuga
[nicolae-peptea]: https://github.com/Nicolae-Peptea

[sendgrid]: https://sendgrid.com/
[sendgrid-key]: https://docs.sendgrid.com/ui/account-and-settings/api-keys#managing-api-keys
[order-email]: https://res.cloudinary.com/dqwtm9fw1/raw/upload/v1642501179/CodeCoolShop/email-confirmation_tsqcmw.html
[registration-email]: https://res.cloudinary.com/dqwtm9fw1/raw/upload/v1642501179/CodeCoolShop/email-confirmation_tsqcmw.html

[facebook-sdk]: https://developers.facebook.com/docs/

[home-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653228196/Reactivties/home_page_extvsd.png
[landing-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653313970/Reactivties/lading-page_imdpd1.png
[register-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653317821/Reactivties/register_crbjdz.png
[login-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653317876/Reactivties/login_iq3kur.png
[login-facebook]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653317920/Reactivties/facebook-login_fkqv6j.png
[activity-details]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653318501/Reactivties/activity-details_zv0r4m.png
[create-activity]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653318866/Reactivties/create-activity_zand5m.png
[edit-activity]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653318870/Reactivties/edit-activities_idzpsp.png
[profile-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653319162/Reactivties/profile-page_pa9pi2.png

