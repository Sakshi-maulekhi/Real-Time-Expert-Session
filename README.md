# ExpertConnect – Real-Time Expert Session Booking System

## Overview

ExpertConnect is a MERN stack web application that allows users to discover industry experts, explore their profiles, and book personalized mentorship or consultation sessions.

The platform includes expert listings, booking management, booking status tracking, duplicate booking prevention, and a responsive user interface.

---

# Features

## 1. Expert Listing

* Browse expert profiles
* Search experts by name
* Filter experts by category
* Pagination support
* Responsive expert cards

## 2. Expert Detail Page

* Detailed expert information
* Expertise and experience display
* Available date and slot selection
* Booking form integration

## 3. Session Booking System

* Book expert sessions
* Form validation
* Booking success/error messages
* Prevents duplicate slot booking

## 4. My Bookings

* View bookings by email
* Booking status tracking:

  * Pending
  * Confirmed
  * Completed
* Dynamic booking status UI badges

## 5. Backend Features

* REST APIs using Express.js
* MongoDB database integration
* Mongoose models and schema validation
* Proper folder structure
* Error handling
* Environment variables support

---

# Tech Stack

## Frontend

* React.js
* React Router
* Reactstrap
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# Folder Structure

```bash
client/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── assets/
 │    ├── data/
 │    └── router/

server/
 ├── Controllers/
 ├── models/
 ├── routes/
 ├── utils/
 └── index.js
```

---

# APIs Implemented

## Experts APIs

### Get All Experts

```http
GET /api/v1/events
```

### Get Expert By ID

```http
GET /api/v1/events/:id
```

---

## Booking APIs

### Create Booking

```http
POST /api/v1/booking
```

### Get All Bookings

```http
GET /api/v1/booking
```

### Get Bookings By Email

```http
GET /api/v1/booking?email=user@gmail.com
```

### Update Booking

```http
PUT /api/v1/booking/:id
```

### Delete Booking

```http
DELETE /api/v1/booking/:id
```

---

# Duplicate Booking Prevention

The application prevents multiple users from booking:

* Same expert
* Same date
* Same time slot

Validation is handled in the backend before saving bookings.

---

# Environment Variables

Create a `.env` file inside the server folder:

```env
PORTNO=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <your-github-repository-link>
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

## Frontend Setup

```bash
cd client
npm install
npm start
```

---

# Future Improvements

* Real-time slot updates using Socket.io
* Payment gateway integration
* Admin dashboard
* Email notifications
* Video consultation integration
