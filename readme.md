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



## Objective
1. **GitHub Integration**
   - Connect to GitHub via API using OAuth2 authentication.
   - Documentation reference: [GitHub REST API Documentation](https://docs.github.com/en/rest?apiVersion=2022-11-28).



## Functional Requirements
### Authentication
- Implement OAuth2 authentication to connect with GitHub.
- Store user authentication details in MongoDB (`github-integration` collection).



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
   MONGO_URI= <your mongo uri>
    GITHUB_CLIENT_ID=<your GIT-HUB client id >
    GITHUB_CLIENT_SECRET=<Your client secret>
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

