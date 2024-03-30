# NAS-File Management System

## Introduction

A File Management System that is a robust and user-friendly web application designed to simplify the process of managing files online. Built with JavaScript, React.js, Firebase, and Redux, this system offers an intuitive interface for users to upload, download, categorize, and share their files efficiently. My goal is to provide a seamless file management experience that meets the needs of individual users and teams alike.

## Features

- **User Authentication**: Secure signup and login functionality powered by Firebase Authentication.
- **File Operations**: Upload, download, delete, and preview files with ease.
- **Real-time Database**: Files and folders are managed in real-time with Firebase Firestore.
- **State Management**: Redux ensures a consistent state across the app, providing a smooth user experience.
- **Responsive Design**: Accessible on any device, whether desktop, tablet, or mobile.
- **Sharing and Permissions**: Share files or folders with others and set viewing or editing permissions.

## Getting Started

### Prerequisites

What you need to install the software:

- Node.js
- NPM (Node Package Manager)
- A Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/CodePro-ABridges/NAS-Network-Attached-Storage.git

    Install NPM packages:

bash

cd your-file-management-system
npm install

    Set up Firebase:

Go to the Firebase Console and create a new project.
Add your project's Firebase configuration to a .env file at the root of your project.

env:

VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id

Run the application:

bash

npm run dev

This will start the application and open it in your default browser. If it doesn't open automatically, visit http://localhost:3000.

Usage

License

This project is licensed under the MIT License - see the LICENSE.md file for details.
Acknowledgments
    Special shoutout to Noah for helping iron things out.
    React.js for the powerful UI library.
    Firebase for providing a comprehensive app development platform.
    Redux for managing the app's state beautifully.
```
