# AD Backend

A Node.js Express backend API for managing accounts, transactions, and user authentication.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing (bcryptjs)
- **Account Management**: Create and manage user accounts with account details
- **Transaction Tracking**: Record and manage financial transactions
- **Email Notifications**: Send email notifications using Nodemailer
- **Database**: MongoDB integration with Mongoose ODM
- **Security**: Cookie-based session management, authentication middleware

## Tech Stack

- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose v9.9.1
- **Authentication**: JWT (jsonwebtoken) v9.0.3
- **Password Hashing**: bcryptjs v3.0.3
- **Email**: Nodemailer v9.0.3
- **Environment**: dotenv v17.4.2
- **Utilities**: Cookie-parser v1.4.7
- **Development**: Nodemon (for auto-reload)

## Project Structure

```
├── server.js                 # Entry point
├── package.json              # Dependencies
├── src/
│   ├── app.js               # Express app configuration
│   ├── config/
│   │   └── db.js            # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transaction.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── account.model.js
│   │   ├── transaction.model.js
│   │   └── ledger.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│   └── services/
│       └── email.service.js
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ad-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/ad-backend
   JWT_SECRET=your_jwt_secret_key
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   NODE_ENV=development
   ```

## Usage

### Development Mode

Run the server with auto-reload using Nodemon:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Production Mode

```bash
node server.js
```

## API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Account (`/api/account`)

- `GET /api/account` - Get user account details
- `POST /api/account` - Create account
- `PUT /api/account/:id` - Update account
- `DELETE /api/account/:id` - Delete account

### Transaction (`/api/transaction`)

- `GET /api/transaction` - Get all transactions
- `POST /api/transaction` - Create transaction
- `GET /api/transaction/:id` - Get transaction details

## Database Models

- **User**: Store user credentials and profile information
- **Account**: User account details and metadata
- **Transaction**: Financial transaction records
- **Ledger**: Transaction ledger entries

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Cookie-parser for secure session management
- Authentication middleware for protected routes
- Environment variable protection with dotenv

## Dependencies

| Package       | Version | Purpose               |
| ------------- | ------- | --------------------- |
| express       | ^5.2.1  | Web framework         |
| mongoose      | ^9.9.1  | MongoDB ODM           |
| jsonwebtoken  | ^9.0.3  | JWT authentication    |
| bcryptjs      | ^3.0.3  | Password hashing      |
| nodemailer    | ^9.0.3  | Email sending         |
| cookie-parser | ^1.4.7  | Cookie middleware     |
| dotenv        | ^17.4.2 | Environment variables |

## Getting Started

1. Ensure MongoDB is running locally or provide a remote connection string
2. Set up your `.env` file with required configuration
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. The API will be available at `http://localhost:3000/api`

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test your changes
4. Submit a pull request

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
