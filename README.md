# E-Commerce App with React and Spring Boot

![Preview](https://raw.githubusercontent.com/yogeshwaran99/E-commerce/main/Frontend/public/preview.png)


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

### Security
- Spring Security(JWT)

## Overview

This project is a full-stack e-commerce application built with Java and Spring Boot on the backend, PostgreSQL for data persistence, and React for the frontend interface. It implements robust security using JWT (JSON Web Token) and Spring Security, with full role-based access control (RBAC) enforced consistently across both the frontend and backend.

Users are assigned roles such as CUSTOMER and VENDOR, which govern both the visibility of UI elements in the React frontend and access to API endpoints on the server. This dual-layered permission model ensures that users can only see and perform actions permitted by their role.

The application supports full CRUD (Create, Read, Update, Delete) operations for product management. The React frontend interacts securely with the backend through protected API endpoints, delivering a smooth and secure user experience for managing an online store.