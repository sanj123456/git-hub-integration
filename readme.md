# GitHub Integration Application

## Overview
This project is a GitHub integration application that leverages OAuth2 authentication to connect with GitHub and fetch various data like organizations, repositories, commits, pull requests, issues, and more. The application is built using Angular and Angular Material for the frontend, with AG Grid for dynamic data display and pagination. The backend is powered by Node.js and Express.js, with MongoDB as the database.

## Features
- OAuth2-based GitHub authentication.
- Dynamic routing and modular Angular frontend.
- Integration status tracking and management.
- Fetching and storing GitHub data into MongoDB collections.
- Viewing data with AG Grid, including search, filters, and pagination.
- Integration removal and re-connection options.
- Responsive and user-friendly UI utilizing Angular Material.

## Stack Requirements
### Backend
- **Node.js v22**
- **Express.js**

### Frontend
- **Angular v19**
- **Angular Material**

### Database
- **MongoDB**

## Initial Setup
### Backend
1. Create a Node.js/Express.js server running on port **3000**.
2. Create the following folder structure:
   - `controllers/`
   - `routes/`
   - `helpers/`
   - `models/`
3. Use an `app.js` file for initializations and middleware configurations.
4. Install required dependencies:
   ```bash
   npm install express mongoose cors body-parser dotenv
   ```

### Frontend
1. Create an Angular application running on port **4200**.
2. Install Angular Material:
   ```bash
   ng add @angular/material
   ```
3. Install AG Grid:
   ```bash
   npm install ag-grid-community ag-grid-angular
   ```
4. Configure Angular routing and create necessary modules and components.

## Objective
1. **GitHub Integration**
   - Connect to GitHub via API using OAuth2 authentication.
   - Documentation reference: [GitHub REST API Documentation](https://docs.github.com/en/rest?apiVersion=2022-11-28).

2. **Frontend**
   - Create Angular components and modules for GitHub integration.
   - Implement a "Connect" button to redirect users to GitHub for authentication.
   - Display authentication success status and store details in MongoDB.
   - Show green checkmark and connection date if already authenticated.
   - Include options to remove integration and reconnect as needed.

3. **Backend**
   - Create routes and controllers for handling GitHub API calls and database operations.
   - Use separate MongoDB collections for different types of GitHub data.

## Functional Requirements
### Authentication
- Implement OAuth2 authentication to connect with GitHub.
- Store user authentication details in MongoDB (`github-integration` collection).

### Data Fetching
- Fetch the following data from GitHub and store it in separate MongoDB collections:
  - Organizations
  - Organizations' repositories
  - Repositories' commits
  - Repositories' pull requests
  - Repositories' issues
  - Repositories' issues' changelogs
  - Organizations' users

### Data Display
- Use AG Grid to display the fetched data dynamically.
- Implement the following features:
  - **Search**: Keyword search across all columns.
  - **Filters**: Filters for all columns.
  - **Pagination**: Paginate data for better usability.
  - **Dynamic Columns**: Fields from the selected collection should be displayed as separate columns.

### UI Features
- Utilize Angular Material for responsive and visually appealing components.
- Display an "Organization" dropdown for GitHub.
- Show an "Repositories" dropdown to list available collections in the database.
- Ensure maximum utilization of available screen real estate.

### Additional Features
- Expandable Mat Panel with the following options:
  - **Remove Integration**: Deletes the connection from the database.

## Testing Tips
- Create a GitHub account for testing purposes.
- Import open-source/public repositories for testing.
- Ensure the following setup in your test organization:
  - At least **1 organization**.
  - At least **3 repositories** within the organization.
  - Each repository should have:
    - **2000 commits**
    - **1000 pull requests**
    - **500 issues**

## Installation
### Backend
1. Clone the repository and navigate to the backend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/github_integration
    GITHUB_CLIENT_ID=Ov23lioMdIYACoZON9NM
    GITHUB_CLIENT_SECRET=52c606d9c5d98a7197082f450b44ac01280f477c
GITHUB_API_BASE=https://api.github.com
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the frontend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular application:
   ```bash
   ng serve --open
   ```

## Usage
1. Open the frontend application in your browser.
2. Click the "Connect" button to authenticate with GitHub.
3. View integration status and fetched data.
4. Use the AG Grid table to filter, search, and paginate data.
5. Expand the Mat Panel to manage the integration.

## Folder Structure
### Backend
```
backend/
|-- controllers/
|-- routes/
|-- helpers/
|-- models/
|-- app.js
```

### Frontend
```
frontend/
|-- src/
    |-- app/
        |-- components/
        |-- services/
        |-- app.module.ts
        |-- app-routes.ts
```

## Conclusion
This GitHub Integration Application provides a comprehensive solution to connect with GitHub, fetch data dynamically, and display it in an interactive frontend. The use of OAuth2 ensures secure authentication, while the combination of Angular Material and AG Grid enhances user experience.

