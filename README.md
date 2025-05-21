
<div id="top"></div>

# Reactivities

A social app for sharing and exploring community activities. Users can create events, follow others, and engage in real-time chat.

---

<details>
  <summary>📘 Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#integrations">Integrations</a></li>
    <li><a href="#visuals">Visuals</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

## 🧹 About the Project

**Reactivities** is a social platform where users can:

* Share activities they host or attend
* Connect and chat with other community members
* Follow users and explore events by category

![home-page.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653228196/Reactivties/home_page_extvsd.png)

---

## 🚀 Features

* Register (with email confirmation)
* Facebook registration
* Login/logout using JWT with refresh tokens
* Create, edit, and delete activities
* Attend or own activities
* Real-time chat in activity detail pages
* Sort and filter activities
* Follow/unfollow users
* Profile picture uploads
* View user profiles
* Full client/server-side validation

---

## 🧱 Tech Stack

### Architecture

* Clean Architecture
* CQRS with Mediator design pattern

### Backend

* [.NET Core 8](https://dotnet.microsoft.com/en-us/learn/aspnet/what-is-aspnet-core)
* [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://docs.fluentvalidation.net/en/latest/)
* [Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0&tabs=visual-studio)
* [JWT](https://jwt.io/)
* [SignalR](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr)

### Frontend

* [React 18.3.1](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [MobX](https://mobx.js.org/README.html)
* [Axios](https://axios-http.com/)
* [Semantic UI 2.1.5](https://semantic-ui.com/)

### Database

* [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)

### Tools

* [Visual Studio](https://visualstudio.microsoft.com/)
* [VS Code](https://code.visualstudio.com/)

---

## 🔗 Integrations

### Email

* [Resend](https://resend.com/emails)

### Social Login

* [Facebook SDK](https://developers.facebook.com/docs/)

---

## 🖼️ Visuals

* Landing Page
  ![landing-page.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653313970/Reactivties/lading-page_imdpd1.png)

* Register Page
  ![register-page.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653317821/Reactivties/register_crbjdz.png)

* Login Page
  ![login-page.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653317876/Reactivties/login_iq3kur.png)

* Facebook Login
  ![login-facebook.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653317920/Reactivties/facebook-login_fkqv6j.png)

* Home Page
  ![home-page.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653228196/Reactivties/home_page_extvsd.png)

* Activity Details
  ![activity-details.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653318501/Reactivties/activity-details_zv0r4m.png)

* Create/Edit Activity
  ![create-activity.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653318866/Reactivties/create-activity_zand5m.png)
  ![edit-activity.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653318870/Reactivties/edit-activities_idzpsp.png)

* Profile Page
  ![profile-page.png](https://res.cloudinary.com/dqwtm9fw1/image/upload/v1653319162/Reactivties/profile-page_pa9pi2.png)

---

## 🛠️ Getting Started

### Prerequisites

* Install [Node.js 20+](https://nodejs.org/) and npm
* Install [.NET Core 8 SDK](https://dotnet.microsoft.com/)
* Install [Docker](https://www.docker.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/reactivities.git
cd reactivities
```

### 2. Setup the Client

* Go to `client-app` and ensure `package.json` includes:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

* Run:

```bash
cd client-app
npm install
```

### 3. Setup the Server

* Go to the root of the Repo and run in the terminal
```bash
docker compose up -d
```
* Configure your connection string in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "<your-database-connection-string>"
}
```

### 4. Configure Third-Party Services

#### Resend (for emails)

* Create a [Resend account](https://resend.com/signup) and API Key
* Add to `appsettings.json`:

```json
"Resend": {
  "ApiToken": "<your-resend-api-key>"
}
```

#### Cloudinary (for image uploads)

```json
"Cloudinary": {
  "CloudName": "",
  "ApiKey": "",
  "ApiSecret": ""
}
```

#### Facebook Login (Dev Environment)

* Create an SSL certificate
  [Watch this tutorial](https://www.youtube.com/watch?v=f9ZadlfSIDI&ab_channel=RyudithTutorial)

* Enable HTTPS in `client-app/package.json`:

```json
"scripts": {
  "start": "set HTTPS=true&&set SSL_CRT_FILE=<path-to-crt>&&set SSL_KEY_FILE=<path-to-key>&&react-scripts start"
}
```

### 5. Run the App

* Start the API (`.NET` backend)
  *On the first run, it will automatically seed the database with initial data.*

* Start the client:

```bash
cd client-app
npm start
```

---

## 💡 Usage

### Login Credentials

Demo users:

* [bob@test.com](mailto:bob@test.com)
* [tom@test.com](mailto:tom@test.com)

Facebook test users (Heroku only):

* [samantha\_uhubxff\_fergiesen@tfbnw.net](mailto:samantha_uhubxff_fergiesen@tfbnw.net)
* [barbara\_zpcalos\_letuchysky@tfbnw.net](mailto:barbara_zpcalos_letuchysky@tfbnw.net)

**Password for all users:** `Pa$$w0rd`

### Development Mode

* Run the Web API (via Kestrel)
* Open a terminal in `client-app` and run:

```bash
npm start
```

---

## 🙌 Acknowledgments

This project was built while following the excellent [Udemy course](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/) by [Neil Cummings](https://github.com/TryCatchLearn), with additional improvements.


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
[ssl-certificate-video]: https://www.youtube.com/watch?v=f9ZadlfSIDI&ab_channel=RyudithTutorial
[neil-cummings-github]: https://github.com/TryCatchLearn
[udemy-link]: https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/

[resend]: https://resend.com/emails
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

