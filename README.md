# E-Commerce App with React and Spring Boot

E-commerce application with user roles, secure authentication, and product management features.

## Preview
![Preview](https://raw.githubusercontent.com/yogeshwaran99/ecommerce/main/Client/public/preview.png)


## Overview

This project is a full-stack e-commerce application built with Java and Spring Boot on the backend, PostgreSQL for data persistence, and React for the frontend interface. It implements robust security using JWT (JSON Web Token) and Spring Security, with full role-based access control (RBAC) enforced consistently across both the frontend and backend.

Users are assigned roles such as `CUSTOMER` and `VENDOR`, which govern both the visibility of UI elements in the React frontend and access to API endpoints on the server. This dual-layered permission model ensures that users can only see and perform actions permitted by their role.

The application supports full CRUD (Create, Read, Update, Delete) operations for product management. The React frontend interacts securely with the backend through protected API endpoints, delivering a smooth and secure user experience for managing an online store.

To allow the React frontend to communicate with the Spring Boot backend without CORS issues during development or production, a reverse proxy is used.

---


## Tech Stack

### Backend
- Java
- Spring Boot

### Frontend
- React
- HTML
- CSS

### Database
- PostgreSQL

### DevOps
- Nginx
- Docker & Docker Compose

---


## Project Structure

```
ecommerce/
├── Client/                 # React frontend
│   ├── src/                # JSX, CSS, components, context
│   ├── public/             
│   ├── Dockerfile
│   └── vite.config.js
│
├── Server/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/java/...   # Controllers, services, models
│   │   └── resources/      # application.properties, images
│   ├── Dockerfile
│   └── pom.xml
│
├── Nginx/
│   └── nginx.conf          # Reverse proxy config
│
├── docker-compose.yml      # Full-stack orchestration
└── README.md
```


## 🚀 How to Run the Application

You can run this app locally or with Docker.

---

### Method 1: Run Locally (Maven + Node)

>    Useful for local development and debugging.

#### Prerequisites

- Java 21  
- Maven  
- Node.js + npm  
- PostgreSQL
- Nginx (Optional)

#### Steps

```bash
# Clone the repository if not already
git clone https://github.com/yogeshwaran99/ecommerce.git

# Backend (Spring Boot)
cd Server

# Run the Spring Boot application
./mvnw spring-boot:run

# Backend will start at:
http://localhost:8080

# Frontend (React)
cd ../Client

#install node packages
npm install

# Run the react App
npm run dev

# Frontend will start at:
http://localhost:5173
```

## Local NGINX Reverse Proxy (Optional)

If you want to run the app at `http://localhost` using a reverse proxy (instead of separate ports), use the following NGINX config:

```nginx
# /etc/nginx/nginx.conf

worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen 80;
        server_name localhost;

        # React dev server (Vite)
        location / {
            proxy_pass http://localhost:5173;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Spring Boot API
        location /api/ {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```
Make sure NGINX is restarted after saving:
```bash
sudo systemctl restart nginx
```

### Method 2: Run with Docker Compose

>    Ideal for full-stack deployment with NGINX reverse proxy.

#### Prerequisites
  - Docker
  - Docker Compose

#### Steps

```bash
# Clone the repository if not already
git clone https://github.com/yogeshwaran99/ecommerce.git

#Go to project directory
cd ecommerce

# Start backend, frontend, PostgreSQL, and NGINX
docker-compose up --build

#  Then visit:
http://localhost

# To stop:
docker-compose down #or Ctrl+c
```

## Maintained By

Maintained by [@yogeshwaran99](https://github.com/yogeshwaran99)
pull requests and contributions are welcome!
