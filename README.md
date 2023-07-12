#Overview
Tankvana is a streamlined rental platform designed for freedom fighters to efficiently procure tanks and combat equipment for confronting totalitarian regimes.

The app focuses on providing information about the availability and rental costs of each tank, while also ensuring data security with password hashing and user login features.

#Description
React front-end app uses Knex to connect to PSQL db and react-router for client-side routing.

Use JWT for auth and bcrypt for password hashing.

#Installation
Clone Repo
First, you need to clone the repository to your local machine. You can do this with the following command in your terminal:
bash
Copy code
git clone

Install Dependencies
Navigate into each directory (frontend and backend) and install the necessary dependencies. Run the following command in your terminal for each directory:
cd
npm install

3.Set Up Local PostgreSQL Database

Set up your local PostgreSQL database. Ensure PostgreSQL is installed and running on your machine. Create a new database for the application.

cd into server folder

Initialize Environment Variables
You'll find a file named .env.example in the server directory. Rename or copy it to .env and replace the placeholder values with your actual data (database connection details, secret keys, etc.)

Migrate and Seed the Database
You will need to run migrations to create the necessary tables in your database. This application uses Knex.js for migrations. Ensure that you have installed Knex.js globally on your machine. You can install it with the command npm install -g knex.

Run Migrations
NPM Run migrate:latest

Seed Database
NPX knex seed:run

Start Servers
NPM start "server will start in localhost:3001"
CD into front-end folder
Run npm start "server will start in localhost:3000"

#Usage

Create User: Begin your experience by registering a new user account. This account will allow you to rent tanks and manage your reservations.

Rent Tank: Once registered, browse through the selection of tanks available for rent. Select the one that suits your requirements and submit a rental request.

Manage Reservations: View your rental history in your account dashboard. You can modify your existing reservations or cancel them if necessary.

Profit!: With an efficient tank rental process, focus on your mission against oppressive regimes. Slava Ukraini!
