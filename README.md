
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

Payment processing:
* [Stripe][stripe]

Event logging:
* [Serilog][serilog]

<p align="right">(<a href="#top">back to top</a>)</p>

### Visuals

Empty Cart:

![empty-cart.png][empty-cart]

Register Page:

![register-page.png][register-page]

Login Page:

![login-page.png][login-page]

Home Page while logged in

![logged-in-home-page.png][logged-in-home-page]

Used Dashboard - Orders:

![user-dashboard.png][user-dashboard]

Filled Cart Preview from the Home Page:

![items-in-cart.png][items-in-cart]

Cart state before Checkout:

![pre-checkout-cart-preview.png][pre-checkout-cart-preview]

Delivery details form:

![delivery-details.png][delivery-details]

Successful Order Placement Notification Page:

![successful-order.png][successful-order]

User Dashboard - Order Details:

![placed-order-details.png][placed-order-details]

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

-  Create a MSSQL database
- Go to appsettings.json -> Fill in the ConnectionStrings section with the database Connection String

  ```json
      "ConnectionStrings": {
        "CodeCoolShop": "<your-database-connection-string-comes-here>",
      }
  ```

- Create a Stripe account [here][registerStripe]
- Go to appsettings.json ->Fill in the Stripe - SecretKey and Publishable Key [how to locate them in your Stripe account][stripeKey]
    ```json
      "Stripe": {
        "SecretKey": "<your-stripe-secret-key-comes-here>",
         "PublishableKey": "<your-stripe-publishable-key-comes-here>"
      },
    ```
- Create a SendGrid account [here](https://signup.sendgrid.com/)
- Go to appsettings.json -> Fill in the ApiKey related to your Sendgrid account. Take a look on how to create it in your account [here][sendgrid-key]
	```json
      "Sendgrid": {
        "ApiKey": "<your-sendgrid-api-key-comes-here>"
      }
	```
- Create you sender profile on SendGrid and update the field from appsettings.json
	```json
      "Sendgrid": {
        "SenderEmail": "<your-sender-email-comes-here>"
      }
	```
- Create dynamic template for Order Confirmation => use this html template [here][order-email]
-  Create dynamic template for Register Confirmation => use this html template [here][registration-email]
- Update the templates ids
	```json
      "Sendgrid": {
            "OrderConfirmationTemplateId": "<email-template-id>",
		    "AccountConfirmationTemplateId": "<email-template-id>"
      }
	```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run the project with Kestrel Server.

<p align="right">(<a href="#top">back to top</a>)</p>


## Development Team

* [Mihai Buga's GitHub][mihai-buga]
* [Nicolae Peptea's GitHub][nicolae-peptea]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thanks for all the support to the Codecool mentors that have guided us!

[React.Js for ASP .NET MVC][react-net]

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

[stripe]: https://stripe.com/

[stripeKey]: https://support.stripe.com/questions/locate-api-keys-in-the-dashboard#:~:text=Locate%20API%20keys%20in%20the%20Dashboard%20%3A%20Stripe%3A%20Help%20%26%20Support&text=Users%20with%20Administrator%20permissions%20can,and%20clicking%20on%20API%20Keys
[registerStripe]: https://dashboard.stripe.com/register

[serilog]: https://serilog.net/

[home-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653228196/Reactivties/home_page_extvsd.png
[empty-cart]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429623/CodeCoolShop/empty-cart_mjprbo.png
[register-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429634/CodeCoolShop/register-page_mmukdc.png
[login-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429633/CodeCoolShop/login-page_txknrt.png
[logged-in-home-page]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429634/CodeCoolShop/logged-in-home-page_xdem86.png
[user-dashboard]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429633/CodeCoolShop/user-dashboard_ulsy8e.png
[items-in-cart]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429634/CodeCoolShop/items-in-cart_ggelhm.png
[pre-checkout-cart-preview]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429633/CodeCoolShop/pre-checkout-cart-preview_zwezdv.png
[delivery-details]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429612/CodeCoolShop/delivery-details_mqbys6.png
[successful-order]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429634/CodeCoolShop/successful-order_ycmwbf.png
[placed-order-details]: https://res.cloudinary.com/dqwtm9fw1/image/upload/v1642429633/CodeCoolShop/placed-order-details_rm8xz0.png

