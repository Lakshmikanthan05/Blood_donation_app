# Blood Donation App

A full-stack blood donation management application that connects donors, hospitals, and blood banks. The platform enables users to register, verify their accounts, manage their profiles, request or donate blood, monitor blood stock, and respond to urgent donor alerts.

## Overview

This project is split into two main parts:

- Frontend: React + Vite application for the user interface
- Backend: Express.js API connected to MongoDB for authentication, profile data, requests, and stock tracking

The app is designed for blood donation collaboration between:

- Donors
- Hospitals
- Blood Banks

## Features

- User registration and login
- Email-based account verification
- Password reset workflow
- Role-based profiles for donors, hospitals, and blood banks
- Blood stock management and update tracking
- Blood donation requests and hospital request handling
- Donor alert notifications for urgent needs
- Donation history tracking
- Secure authentication using JWT and password hashing with bcrypt
- REST API structure for scalable backend operations

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- React Hot Toast
- CSS modules / custom CSS styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Nodemailer for email communication

## Project Structure

```bash
Blood_Donation/
├── Donate/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Server/                 # Express backend
│   ├── controller/
│   ├── database/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package-lock.json (if present in root)
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB running locally or in a cloud instance

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Lakshmikanthan05/Blood_donation_app.git
cd Blood_donation_app
```

2. Install frontend dependencies:

```bash
cd Donate
npm install
```

3. Install backend dependencies:

```bash
cd ../Server
npm install
```

## Environment Variables

Create a `.env` file inside the `Server` directory if it is not already present. Example:

```env
PORT=5000
DB=mongodb://localhost:27017/donate
Activation_Secret=your_activation_secret
Gmail=your_email@example.com
Password=your_email_app_password
Jwt_Sec=your_jwt_secret
```

### Notes
- Replace the database URI with your MongoDB connection string if needed.
- `Gmail` and `Password` are used for email verification/reset flows.
- For Gmail, you may need to use an App Password if two-factor authentication is enabled.

## Running the Application

### Start the backend

```bash
cd Server
npm run dev
```

This starts the Express server on:

```text
http://localhost:5000
```

### Start the frontend

Open a new terminal and run:

```bash
cd Donate
npm run dev
```

This starts the Vite dev server, usually at:

```text
http://localhost:5173
```

## Production Build

To build the frontend for production:

```bash
cd Donate
npm run build
```

To preview the production build:

```bash
cd Donate
npm run preview
```

## Usage

- Register as a donor, blood bank, or hospital
- Verify the account using the email OTP/verification flow
- Log in to access the dashboard
- Update profile information
- Add or view blood stock
- Send and manage blood requests
- Accept donor alerts and complete donation records
- Track donation and request history

## Security Notes

This project uses:

- bcrypt for password hashing
- JWT for authenticated route protection
- role-based access checks for protected features

## License

This project is currently distributed without a formal license file. If you plan to reuse or distribute it, please confirm the intended licensing terms with the project owner.

## Contributing

Contributions are welcome. If you want to improve the application:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request with a clear summary

## Contact

Project Repository: https://github.com/Lakshmikanthan05/Blood_donation_app

If you are maintaining this app, update the project contact details here as needed.
