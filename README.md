# Portfolio Website Project

This project is a comprehensive portfolio website designed to showcase your work and manage client orders. It supports multiple languages (Lao, Thai, English) and features user authentication, portfolio management, service ordering, and admin dashboards.

## Table of Contents

1.  [Prerequisites](#1-prerequisites)
2.  [Supabase Setup](#2-supabase-setup)
    *   [Create Supabase Project](#create-supabase-project)
    *   [Database Setup](#database-setup)
    *   [Storage Setup](#storage-setup)
    *   [Authentication Settings](#authentication-settings)
    *   [Email Templates](#email-templates)
    *   [Update Supabase Credentials](#update-supabase-credentials)
3.  [Local Development Setup](#3-local-development-setup)
    *   [Clone the Repository](#clone-the-repository)
    *   [Install Dependencies](#install-dependencies)
    *   [Run the Development Server](#run-the-development-server)
4.  [Project Structure](#4-project-structure)
5.  [Key Features](#5-key-features)
6.  [Contributing](#6-contributing)
7.  [License](#7-license)

## 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js** (LTS version recommended)
*   **pnpm** (recommended package manager, or npm/yarn)
*   **Git**
*   **Visual Studio Code (VS Code)** (recommended code editor)

## 2. Supabase Setup

This project uses Supabase as its backend for database, authentication, and storage.

### Create Supabase Project

1.  Go to the [Supabase website](https://supabase.com/) and log in or sign up.
2.  Click on "New project" to create a new project.
3.  Fill in the project details (Name, Database Password, Region) and click "Create new project".

### Database Setup

1.  Once your Supabase project is ready, navigate to the **SQL Editor** in the Supabase Dashboard.
2.  You will find two SQL files in this project: `create_tables.sql` and `rls_policies.sql`.
3.  **First, run `create_tables.sql`:**
    *   Open the `create_tables.sql` file from the project directory.
    *   Copy its entire content.
    *   Paste it into the SQL Editor in Supabase and click "Run". This will create all necessary tables for the application.
4.  **Next, run `rls_policies.sql`:**
    *   Open the `rls_policies.sql` file from the project directory.
    *   Copy its entire content.
    *   Paste it into the SQL Editor in Supabase and click "Run". This will set up Row Level Security policies for your tables, ensuring data security.

### Storage Setup

This project uses Supabase Storage for storing portfolio images and sample files from client orders.

1.  In your Supabase Dashboard, navigate to **Storage**.
2.  Create two new buckets:
    *   **`portfolio-images`**: This bucket will store images for your portfolio items. Set its policies to allow public read access if you want your portfolio images to be publicly viewable.
    *   **`sample-files`**: This bucket will store sample files uploaded by clients. You might want to keep this private and only allow authenticated admin access for security.

### Authentication Settings

1.  In your Supabase Dashboard, navigate to **Authentication**.
2.  Go to **Settings**.
3.  Under **


Email Sign Up` section, enable **"Enable Email Confirmations"**.
4.  **Email Templates**: Supabase allows you to customize the email templates for various authentication events (e.g., sign-up confirmation, password reset). You can find example templates in the `email_templates.md` file in this project. Copy the content from that file and paste it into the corresponding email templates in your Supabase dashboard under **Authentication > Email Templates**.

### Update Supabase Credentials

1.  In your Supabase Dashboard, go to **Project Settings > API**.
2.  Copy your `Project URL` and `anon public` key.
3.  Open the file `/home/ubuntu/portfolio-website/src/lib/supabase.js` in your project.
4.  Update the `supabaseUrl` and `supabaseAnonKey` variables with your actual project URL and anon key:

    ```javascript
    const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
    const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
    ```

## 3. Local Development Setup

### Clone the Repository

First, clone this repository to your local machine:

```bash
git clone <repository-url>
cd portfolio-website
```

### Install Dependencies

Navigate to the project directory and install the dependencies using pnpm (recommended):

```bash
pnpm install
```

If you don't have pnpm, you can use npm or yarn:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### Run the Development Server

To start the development server, run:

```bash
pnpm dev
```

This will typically start the application on `http://localhost:5173` (or another available port). The application will automatically reload if you make any changes to the source code.

## 4. Project Structure

```
portfolio-website/
├── public/
│   ├── locales/          # Localization files (la, th, en)
│   │   ├── la/
│   │   │   └── common.json
│   │   ├── th/
│   │   │   └── common.json
│   │   └── en/
│   │       └── common.json
│   └── favicon.ico
├── src/
│   ├── assets/           # Static assets like images, fonts (if any)
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Layout components (Navbar, Footer, Layout)
│   │   ├── sections/     # Page sections (Hero, PortfolioPreview, ServicesPreview)
│   │   └── ui/           # Shadcn UI components (Button, Input, etc.)
│   ├── contexts/         # React Contexts (AuthContext)
│   ├── lib/              # Utility functions and Supabase client setup
│   │   ├── supabase.js
│   │   └── i18n.js
│   ├── pages/            # Page components for different routes
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── auth/         # Authentication related pages (Login, Register, ForgotPassword)
│   │   ├── dashboard/    # User dashboard pages
│   │   └── ...           # Other main pages (Home, Portfolio, Services, About, Contact)
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── vite.config.js
└── ...
```

## 5. Key Features

*   **Multi-language Support**: Lao, Thai, and English with easy switching.
*   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
*   **User Authentication**: Secure sign-up, login, and password reset powered by Supabase Auth.
*   **Portfolio Showcase**: Display your work with categories and detailed views.
*   **Service Management**: Define and present your services with pricing and details.
*   **Order Submission**: Clients can submit project requests with file uploads.
*   **User Dashboard**: Clients can track their orders and manage their profiles.
*   **Admin Dashboard**: Comprehensive management for portfolios, services, orders, and system settings.
*   **Supabase Integration**: Utilizes Supabase for database, authentication, and storage.

## 6. Contributing

If you wish to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 7. License

This project is licensed under the MIT License - see the `LICENSE` file for details. (Note: A `LICENSE` file is not included in the provided context, you may need to create one.)




## Supabase Setup: Creating an Admin User

To log in as an administrator, you need to create an admin user in your Supabase project. Follow these steps:

1.  **Go to your Supabase Dashboard**: Navigate to your project in the Supabase dashboard.
2.  **Authentication -> Users**: In the left sidebar, click on 'Authentication', then select 'Users'.
3.  **Invite User or Add User**: You can either 'Invite new user' or 'Add new user'. For testing, 'Add new user' is simpler.
4.  **Enter User Details**: Provide an email address (e.g., `admin@example.com`) and a strong password. This will be your admin login.
5.  **Update User Role (Optional but Recommended)**: By default, new users are assigned the 'user' role. If you have RLS policies based on roles, you might want to update this user's role to 'admin' in your `users` table. You can do this directly in the Supabase SQL Editor or via a function in your application.
    *   **Using SQL Editor**: Go to 'SQL Editor' in the Supabase dashboard and run a query like:
        ```sql
        UPDATE users
        SET role = 'admin'
        WHERE email = 'admin@example.com';
        ```

Once you've created this user, you can use their email and password to log in to the website and access the admin dashboard (if implemented).




## Verifying Supabase Setup

Before attempting to log in or register, please ensure your Supabase project is correctly set up:

1.  **Check your Supabase Project URL and Anon Key**: Make sure the `supabaseUrl` and `supabaseAnonKey` in `/src/lib/supabase.js` match your actual Supabase project settings. You can find these in your Supabase Dashboard under `Project Settings > API`. 
2.  **Enable Email Authentication**: In your Supabase Dashboard, go to `Authentication > Settings`. Ensure that `Email Sign Up` is enabled.
3.  **Review Authentication Templates**: Under `Authentication > Templates`, review the email templates for `Sign Up Confirmation`, `Password Reset`, etc. These are used for user authentication flows.
4.  **Check Row Level Security (RLS) Policies**: Ensure that the RLS policies are correctly applied to your tables as provided in `rls_policies.sql`. Incorrect RLS policies can prevent users from being created or logging in.
5.  **Verify `users` table schema**: Confirm that your `users` table in Supabase has the `role` column and that the `id` column is linked to `auth.users` table.

If you encounter issues with login or registration, please double-check these settings in your Supabase dashboard.


