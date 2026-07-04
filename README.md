# Support System

## Overview

This is a role-based Support Ticket Management System built using:

* **Backend:** Laravel
* **Frontend:** React Native (Expo)
* **Database:** MySQL

The application allows users to register, log in, raise support tickets, and track their status. Management users can view all tickets and assign them to support staff.

---

## Project Setup

### Backend

1. Navigate to the backend folder.
2. Install dependencies.

```bash
composer install
```

3. Copy the environment file.

```bash
cp .env.example .env
```

4. Configure your database credentials in the `.env` file.

5. Generate the application key.

```bash
php artisan key:generate
```

6. Run migrations and seed the database.

```bash
php artisan migrate --seed
```

7. Start the Laravel server.

```bash
php artisan serve
```

---

### Frontend

1. Navigate to the React Native project.

2. Install dependencies.

```bash
npm install
```

3. Start the Expo development server.

```bash
npx expo start
```

Run the application on an Android emulator or physical device.

---

## Database

The project includes database seeders.

Run:

```bash
php artisan migrate --seed
```

This will create the required tables and insert the sample users.

---

## Sample Login Credentials

### Management

* **Email:** [management@example.com](mailto:management@example.com)
* **Password:** password

### Support Staff

* **Email:** [support@example.com](mailto:support@example.com)
* **Password:** password

### User

* **Email:** [user@example.com](mailto:user@example.com)
* **Password:** password

---

## Features

* User Registration & Login
* JWT Authentication
* Raise Support Tickets
* View Ticket History
* Role-Based Access Control
* Ticket Assignment (Management)
* Ticket Status Tracking

---

## Notes

* Ensure the backend server is running before launching the mobile application.
* Update the API base URL in the frontend if running the backend on a different host or device.
