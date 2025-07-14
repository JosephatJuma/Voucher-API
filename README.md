Setting up the development environment

## Step 1:

clone this repo

## Step 2:

Move to the cloned directory
`cd Voucher-API `

## Step 3:

Install the required modules and dependencies

Run `npm install`

## Step 4:

step up the environment variables

Run `touch .env` to create .env file in the root dir

In the env file

Add env variables to look like those in the .env.example file in the root dir

## Step 5

- With postgresql Database running on localhost port 5432, Run migrations to the local database
  Run 
` npx prisma init --datasource-provider sqlite --output ../generated/prisma npm run migrate dev`
`npx prisma migrate dev --name init`
- In case your database is running on a different port, change the port in the env variable DATABASE_URL

This will create a new debase called voucher_db on the local server and everything is app for local development

# REST APIS Docs

- See documentations at `http://localhost:3000/api/docs` for swagger docs

## Authentication

- Register a user

POST /auth/register
api BODY
```
{
    "username": "username",
    "password": "password",
    "role": "USER"
}
```

role is optional and will default to USER
role can be ADMIN, USER or VENDOR

Response Body
```
{
  "message": "User created successfully",
  "user": {
    "username": "admin10",
    "id": "a0aa1a6b-0cc1-4875-8fd7-43f9b7a5da74",
    "role": "ADMIN"
  }
}
````

- Login a user
- POST /auth/login
API BODY
```
{
    "username": "username",
    "password": "password"
}
```

Response Body
```
{
  "tokens": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYjc0N2Y1My03MzE0LTQzNTUtYTY1Zi1jZmQwMWJiZWM1ODYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUyNTE5NDU1LCJleHAiOjE3NjExNTk0NTV9.8ZvDttHcgJLXE5pi-srlD3zuKt3LuVaWhCxO6h9jKpc",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYjc0N2Y1My03MzE0LTQzNTUtYTY1Zi1jZmQwMWJiZWM1ODYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUyNTE5NDU1LCJleHAiOjE3NjExNTk0NTV9.8ZvDttHcgJLXE5pi-srlD3zuKt3LuVaWhCxO6h9jKpc"
  },
  "message": "Login successful",
  "user": {
    "username": "admin",
    "id": "2b747f53-7314-4355-a65f-cfd01bbec586"
  }
}
```

## VOUCHER APIs

- GET /vouchers
- GET /vouchers/:id
- POST /vouchers
- PUT /vouchers/:id
- DELETE /vouchers/:id
- PATCH /vouchers/:id/redeem
- PATCH /vouchers/:id/revoke
Requires authentication and role based authorization to access

The API docs can be found at `http://localhost:3000/api/docs`