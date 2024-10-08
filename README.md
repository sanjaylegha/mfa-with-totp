
---

# Multi-Factor Authentication (MFA) Integration Using TOTP

This sample shows how to implement the Time-based One-Time Password (TOTP) authentication in your application.

## TOTP Authentication Flow

### 1. User Registration

- When a user registers for MFA, generate a unique secret key for their account. This key will be used to generate TOTP codes.

### 2. Generate QR Code

- Encode the secret key along with other parameters (e.g., issuer name and user account) into a QR code using the "otpauth" format.
- Display the QR code to the user for scanning.

### 3. User Scans QR Code

- The user opens a TOTP app (e.g., Google Authenticator, Authy) and scans the generated QR code.
- This action imports the secret key into the TOTP app, enabling code generation.

### 4. Generating the TOTP

- The TOTP app uses the secret key and the current time (in 30-second intervals) to generate a one-time password.

### 5. User Login

- The user enters their username and password (first factor) to initiate login.
- The system prompts the user for the TOTP code.

### 6. TOTP Verification

- The user retrieves the current TOTP code from their app and submits it.
- The server generates its own TOTP code using the same secret key and current time.
- If the submitted code matches the server-generated code (within the acceptable time window), authentication is successful.

## Why to use OTP?

- **Enhanced Security:** TOTP provides an additional layer of protection, even if passwords are compromised.
- **User-Friendly Setup:** QR codes simplify the setup process for users.
- **Offline Code Generation:** TOTP codes can be generated without an internet connection.

Integrating TOTP-based MFA significantly enhances account security by requiring both a password and a dynamic one-time password. Follow the above steps to implement this feature in your application.

---

## How to start Server
Open terminal got to server directory
```
cd server
node server.js
```


## How to start Client
Open terminal got to client directory
```
cd client
yarn install
yarn start
```

## Steps on client

### To register
- Enter User Name and Password, and click on Generate QR Code button 
- Scan the QR code with Google Authenticator or with any relevant app.
- Enter 6 digit OTP generated by Authenticator App and click Register. If all good you will get the success message.

### To logion
- Enter User Name and Password, and 6 digit otp generated by the Authenticator App.
- Click on Login. If all good you will get the success message.

