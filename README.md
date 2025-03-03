

# 📰 News Scraper API
🚧 **UNDER DEVELOPMENT** 🚧  

This is a NestJS-based API designed to scrape and manage news provider data from unstructured sources. The system extracts relevant information by identifying element patterns (such as HTML tags, classes, or attributes) commonly found in news websites. By applying these patterns, it converts raw, unstructured data into a structured format, making it easier to query and analyze.
The API leverages GraphQL to provide a flexible and efficient way to retrieve news provider data, allowing clients to request only the fields they need. This enhances performance and reduces unnecessary data transfer.

---
<a href="https://nestjs.com/" target="_blank"> <img src="https://img.shields.io/badge/NestJS-Framework-red.svg" alt="NestJS" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"> <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://nodejs.org/" target="_blank"> <img src="https://img.shields.io/badge/Node.js-16%2B-green.svg" alt="Node.js Version" /></a>
<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://img.shields.io/badge/TypeScript-4%2B-blue.svg" alt="TypeScript Version" /></a>
<a href="https://graphql.org/" target="_blank"> <img src="https://img.shields.io/badge/GraphQL-API-red.svg" alt="GraphQL API" /></a>
<br>
<a href="https://jwt.io/" target="_blank"> <img src="https://img.shields.io/badge/JWT-Authentication-yellow.svg" alt="JWT Authentication" /></a>
<a href="https://www.postgresql.org/" target="_blank"> <img src="https://img.shields.io/badge/PostgreSQL-14%2B-blue.svg" alt="PostgreSQL Version" /></a>
<a href="https://typeorm.io/" target="_blank"> <img src="https://img.shields.io/badge/TypeORM-0.3%2B-orange.svg" alt="TypeORM Version" /></a>
<a> <img src="https://img.shields.io/badge/Mapper-lightgrey.svg" alt="Custom Mapper" /></a>
<br>
<a href="https://www.docker.com/" target="_blank"> <img src="https://img.shields.io/badge/Docker-Enabled-blue.svg" alt="Docker" /></a>
<a href="https://jestjs.io/" target="_blank"> <img src="https://img.shields.io/badge/Jest-Testing-brightgreen.svg" alt="Jest" /></a>
<a href="https://eslint.org/" target="_blank"> <img src="https://img.shields.io/badge/ESLint-Linting-purple.svg" alt="ESLint" /></a>
---
## 📌 Features (Planned & Implemented)  

✅ **GraphQL API** for fetching news providers  
✅ **Modular and scalable** NestJS architecture  
✅ **PostgreSQL** as the primary database  
✅ **TypeORM integration** for database management  
✅ **JWT authentication** for secure access  
✅ **DTO and Entity-based** data transformation  
✅ **Base service and mapper pattern** for reusability

🔄 More features coming soon...  

---
## 🏗️ Tech Stack  

- **NestJS** – Scalable and modular backend framework  
- **GraphQL** – Flexible API query language  
- **PostgreSQL** – Robust and reliable relational database  
- **TypeORM** – ORM for handling database operations  
- **JWT Authentication** – Secure user authentication  
- **Docker** (optional) – For containerized deployment  
- **Custom Mapper** – For efficient data transformation



## 🚀 Getting Started  

### 1️⃣ **Clone the Repository**  

```console
git clone https://github.com/your-repo/news-scraper.git
cd news-scraper
```
### 2️⃣ **Install dependencies**  

```bash
npm install
```
### 3️⃣ **Configure environment variables**
#### Variables to be defined in the relevant `.env.{env-name}` files

```json
# PostgreSQL Service Variables
POSTGRES_DB=<your-db-name>
POSTGRES_USER=<your-db-username>
POSTGRES_PASSWORD=<your-db-password>

# App-Specific Variables
DB_HOST=<your-db-host>
DB_PORT=<your-db-port>
DB_USER=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>
APP_ABOUT_TITLE=<your-app-title>
APP_ABOUT_DESCRIPTION=<your-app-description>
APP_VERSION=<your-app-version>
NODE_ENV=<your-env>
JWT_SECRET=<your-jwt-secret>
AUTH_USERNAME=<your-auth-username>
AUTH_PASSWORD=<your-auth-password>
```


#### **Note:**
Each of these variables should be set in the appropriate `.env` file based on the environment:
- **`.env.dev`** for **development**
- **`.env.prod`** for **production**
- **`.env.test`** for **testing**

### 4️⃣ **Running Docker**

```console
docker-compose -f docker-compose.dev.yml up -d --build
```
### 5️⃣ **Running the API Locally**

To run the API locally on `localhost:3000`, follow these steps:

1. Ensure your environment variables are set correctly in the `.env` file.
2. Start the application:

```bash
npm run start
```
You should see the default API, which will display a welcome message.


To run the GraphQL Playground locally on `localhost:3000/graphql`, follow these steps.

#### 1- **Get Access Token**

To obtain an access token, send the following mutation request:

```graphql
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    access_token
  }
}
```
In query variables, provide your login credentials:
```graphql
{
  "loginInput": {
    "username": "your_username",
    "password": "your_password"
  }
}
```
#### 2️- **Add Access Token In Header**
After getting the access token, add it to the header like this:
```graphql
{
  "Authorization": "Bearer <your-access-token>"
}
```
#### 3- **Run Query**
To fetch app information (title, description, and version), run the following query:
```graphql
query {
  about {
    title
    description
    version
  }
}
```

> ##### Note: You can explore the full schema, and experiment with more queries and mutations directly in the GraphQL playground. The documentation tab on the right side will display all available operations with descriptions.
