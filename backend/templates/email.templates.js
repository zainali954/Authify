export const verify_email = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        /* Base Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #1e8e3e;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            margin-bottom: 15px;
        }

        .verification-code {
            display: block;
            font-size: 32px;
            font-weight: bold;
            color: #1e8e3e;
            text-align: center;
            margin: 20px 0;
            letter-spacing: 4px;
        }

        .info {
            font-size: 14px;
            color: #555;
            text-align: center;
        }

        .info strong {
            color: #1e8e3e;
        }

        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            background-color: #f4f4f4;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #ccc;
            }

            .container {
                background-color: #1e1e1e;
            }

            .header {
                background-color: #2a9d4b;
            }

            .content p {
                color: #ddd;
            }

            .info {
                color: #aaa;
            }

            .footer {
                background-color: #1e1e1e;
                color: #999;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>We received a request to verify your email address. To complete the process, please use the following 6-digit code:</p>
            <span class="verification-code">{{CODE}}</span>
            <p class="info">
                This code is valid for the next <strong>15 minutes</strong>. Please do not share this code with anyone.
            </p>
            <p>If you didn't create an account using this email address, please ignore this email or contact our support team immediately.</p>
        </div>
        <div class="footer">
            &copy; 2024 Authify. All rights reserved.
        </div>
    </div>
</body>
</html>

`

export const email_verified = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
    <style>
        /* Base Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #1e8e3e;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            margin-bottom: 15px;
        }

        .success-message {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #1e8e3e;
            text-align: center;
            margin: 20px 0;
        }

        .info {
            font-size: 14px;
            color: #555;
            text-align: center;
        }

        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            background-color: #f4f4f4;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #ccc;
            }

            .container {
                background-color: #1e1e1e;
            }

            .header {
                background-color: #2a9d4b;
            }

            .content p {
                color: #ddd;
            }

            .info {
                color: #aaa;
            }

            .footer {
                background-color: #1e1e1e;
                color: #999;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verified</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Congratulations! Your email address has been successfully verified. You can now enjoy full access to our services.</p>
            <span class="success-message">Verification Successful ✅</span>
            <p class="info">
                If you encounter any issues or have further questions, please feel free to contact our support team at any time.
            </p>
        </div>
        <div class="footer">
            &copy; 2024 Authify. All rights reserved.
        </div>
    </div>
</body>
</html>

`

export const reset_password = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        /* Base Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #1e8e3e;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            margin-bottom: 15px;
        }

        .button-container {
            text-align: center;
            margin: 20px 0;
        }

        .reset-button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #1e8e3e;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .reset-button:hover {
            background-color: #166a2b;
        }

        .info {
            font-size: 14px;
            color: #555;
            text-align: center;
            margin-top: 20px;
        }

        .info a {
            color: #1e8e3e;
            word-break: break-all;
            text-decoration: none;
        }

        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            background-color: #f4f4f4;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #ccc;
            }

            .container {
                background-color: #1e1e1e;
            }

            .header {
                background-color: #2a9d4b;
            }

            .content p {
                color: #ddd;
            }

            .info {
                color: #aaa;
            }

            .footer {
                background-color: #1e1e1e;
                color: #999;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>We received a request to reset your password for your **Authify** account. Click the button below to reset your password:</p>
            <div class="button-container">
                <a href="{{RESET_LINK}}" class="reset-button">Reset Password</a>
            </div>
            <p class="info">
                If the button above doesn't work, copy and paste the following URL into your browser:  
                <a href="{{RESET_LINK}}">{{RESET_LINK}}</a>
            </p>
            <p>If you didn’t request this, please ignore this email or contact our support team for help.</p>
        </div>
        <div class="footer">
            &copy; 2024 Authify. All rights reserved.
        </div>
    </div>
</body>
</html>

`

export const reset_password_successful = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        /* Base Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #1e8e3e;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
        }

        .content p {
            margin-bottom: 15px;
        }

        .success-message {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #1e8e3e;
            text-align: center;
            margin: 20px 0;
        }

        .info {
            font-size: 14px;
            color: #555;
            text-align: center;
        }

        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            background-color: #f4f4f4;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #ccc;
            }

            .container {
                background-color: #1e1e1e;
            }

            .header {
                background-color: #2a9d4b;
            }

            .content p {
                color: #ddd;
            }

            .info {
                color: #aaa;
            }

            .footer {
                background-color: #1e1e1e;
                color: #999;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Your password has been successfully reset. You can now log in to your **Authify** account with your new password.</p>
            <span class="success-message">Password Reset Successfully ✅</span>
            <p class="info">
                If you didn’t perform this action, please contact our support team immediately to secure your account.
            </p>
        </div>
        <div class="footer">
            &copy; 2024 Authify. All rights reserved.
        </div>
    </div>
</body>
</html>

`