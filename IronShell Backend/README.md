## GYM Management System API

A production-ready backend created with Node.js, Express.js, and MariaDB (using the Sequelize ORM). This system manages user memberships, gym plans, staff operations, and admin operations.

## FEATURES

Secure Authentication: JWT based login and registration with Bycrypt password hashing.

Role Based Access: Specific permissions for members, staff and Admins.

Membership Management: Tracking of subscription start/end dates and status.

Attendance Tracking: Log and view gym check-in history.

Financial Reporting: Admin-only revenue tracking.

## Project Structure
# The project follows the MVC (Model-View-Controller) pattern for scalability:

server.js: Application entry point.

app.js: Middleware and route configuration.

database/db.js: Sequelize connection and MariaDB configuration.

routes/: API endpoint definitions.

controllers/: Request/Response handling logic.

services/: Business logic and validation.

models/: Sequelize Models defining the database schema.

middleware/: JWT verification and Role-based guards (isAdmin, isStaff).


## Setup and Installation
1. Prerequisites
 
    Node.js installed.

    MariaDB server installed and running.

    DBeaver must be downloaded for testing.

2. Database Configuration
   
    Create a database named gym_db in MariaDB. The Sequelize models are configured to sync automatically or you can run your provided SQL script in the MariaDB console.

3. Environment Variables

    Create a .env file in the root directory:

    PORT=3000

    JWT_SECRET="Top Secret"

    ##### MariaDB Configuration

    DB_NAME=gym_db

    DB_USER=root

    DB_PASS=your_password

    DB_HOST=localhost

    DB_PORT=3306

    DB_DIALECT=mariadb



## Install Dependencies

`npm install`

## Start the server

#### Production

`node server.js`

#### Development (requires nodemon)

`npm run dev`


## API Endpoints

### Auth Note: All Member, Staff, and Admin endpoints (except Signin/Register) require a JWT Token in the Authorization header.

#### Users 

`POST	/api/register	Public	Register a new member account` | Body: {email, password}

`POST	/api/signin	Public	Login and receive a JWT token` | Body: {email, password} -> Returns JWT

`GET	/api/user/home	Member	View profile and available equipment`

`POST	/api/subscribe	Member	Purchase/Start a new membership plan` | Body: {plan_id}

`POST	/api/cancelSubscription	Member	Cancel current active subscription` 

`GET	/api/status	Member	Check membership status (Active/Expired)` 

`POST	/api/checkin	Member	Log a gym visit (Current Timestamp)` 

`GET	/api/history	Member	View personal gym visit history`

#### Staff (only staff members)

`GET	/api/getAllUsers	Staff	List all members in the system`

`GET	/api/getUser/:id	Staff	Fetch detailed profile of a specific member` 

`POST	/api/staff/register/user	Staff	Manually register a member via staff portal and starts plan` | Body: {plan_id, email, password}

`GET	/api/getDeactivatedUser	Staff	List all members with deactivated status`

`GET	/api/getActivatedUser	Staff	List all members with active status`

`POST	/api/members/:id/renew	Staff	Extend/Renew a member's plan duration`

#### Admin


`POST	/api/plans	Admin	Create a new membership plan` | Body: {plan_name, price, duration}

`PATCH	/api/plan/:id	Admin	Update pricing or duration of a plan` | Body: {plan_name, price, duration} atleast 1 of these body fields

`DELETE	/api/deletePlan/:id	Admin	Permanently remove a gym plan`

`DELETE	/api/deleteUser/:id	Admin	Delete a user account from the system`

`GET/api/revenueAdminView total earnings and financial reports`


## Test Credentials (Password: 123456)

Role             Email

Admin         admin@gym.com

Staff         staff@gym.com

Member        nitin@gym.com


## API Testing (Postman)

#### Admin Testing

<details>
  <summary>Click to view Admin Signin</summary>
  <img src="./Testing screenshots/adminSignin.png" alt="Revenue API Test">
</details>

<details>
  <summary>Click to view Admin Post plan Test</summary>
  <img src="./Testing screenshots/adminPostPlan.png" alt="Login API Test">
</details>

<details>
  <summary>Click to view Admin edit plan test</summary>
  <img src="./Testing screenshots/adminEditPlan.png" alt="Revenue API Test">
</details>

<details>
  <summary>Click to view Admin Get Revenue</summary>
  <img src="./Testing screenshots/adminGetRevenue.png" alt="Login API Test">
</details>

#### Staff Testing

<details>
  <summary>Click to view staff Signin</summary>
  <img src="./Testing screenshots/staffSignin.png" alt="Revenue API Test">
</details>

<details>
  <summary>Click to view Staff get All Users API Test</summary>
  <img src="./Testing screenshots/staffGetAllUsers.png" alt="Login API Test">
</details>

<details>
  <summary>Click to view getUserBy Id</summary>
  <img src="./Testing screenshots/staffGetUserById.png" alt="Revenue API Test">
</details>

<details>
  <summary>Click to view get Activated Users</summary>
  <img src="./Testing screenshots/staffGetActivatedUsers.png" alt="Login API Test">
</details>


#### Users API Testing

<details>
  <summary>Click to view User Signin</summary>
  <img src="./Testing screenshots/userSignin.png" alt="Revenue API Test">
</details>

<details>
  <summary>Click to view Users Home page</summary>
  <img src="./Testing screenshots/userHome.png" alt="Login API Test">
</details>

<details>
  <summary>Click to view User post Checkin</summary>
  <img src="./Testing screenshots/userPostCheckin.png" alt="Revenue API Test">
</details>

<details>
  <summary>Click to view Users status</summary>
  <img src="./Testing screenshots/userGetStatus.png" alt="Login API Test">
</details>