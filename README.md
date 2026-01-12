# Welcome Nōto [ノート]

**Nōto** is a simple note-taking and note-sharing application. It can also be described as a minimal digital letter app.

The core idea is simplicity: users interact with a single textarea on the frontend to write notes and optionally share them with selected friends.

---

## Application Flow

1. User creates an account
2. User logs in
3. Each user receives a unique **user code**
4. Users can add others as friends using this code
5. User creates a note
6. User can share selected notes with friends
7. Admin users can perform management operations

---

## Planned Technology Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT (JSON Web Token)
* JPA / Hibernate
* PostgreSQL

### Frontend

* React
* Tanstack Start
* Metro UI design approach
* REST API integration

---

## Backend Tasks

### 1. Entity Design

#### User Entity

* [ ] id
* [ ] username
* [ ] email
* [ ] password
* [ ] userCode (unique, shareable)
* [ ] role (USER, ADMIN)
* [ ] createdAt

#### Note Entity

* [ ] id
* [ ] content
* [ ] owner (User)
* [ ] isShared
* [ ] createdAt
* [ ] updatedAt

#### Relationships

* [ ] User → Note (OneToMany)
* [ ] User ↔ User (ManyToMany for friend system)

---

### 2. Authentication & Authorization

* [ ] Configure Spring Security
* [ ] Implement JWT-based authentication
* [ ] Login / Register endpoints
* [ ] Token generation and validation
* [ ] Role-based authorization
  * [ ] USER
  * [ ] ADMIN

---

### 3. Backend API Task List

#### Authentication

* [ ] User registration endpoint
* [ ] User login endpoint
* [ ] JWT token generation
* [ ] JWT validation filter

#### User

* [ ] Get user profile
* [ ] Add friend using user code
* [ ] Retrieve friend list

#### Notes

* [ ] Create note
* [ ] Update note
* [ ] Delete note
* [ ] List user notes
* [ ] Share note with friends

#### Admin

* [ ] List users
* [ ] Delete users
* [ ] Optional note moderation

---

## Frontend Tasks

### 1. UI / UX

* [ ] Research Metro UI design principles
* [ ] Minimal screen structure
* [ ] Single textarea–focused main screen

---

### 2. Pages

* [ ] Register
* [ ] Login
* [ ] Main screen (textarea + share options)
* [ ] Friend list
* [ ] Admin panel (admin only)

---

### 3. Frontend Task List

* [ ] Metro UI component research
* [ ] Base layout creation
* [ ] Form components
* [ ] Authentication flow (login/register)
* [ ] Backend API integration
* [ ] Token management (localStorage / context)
* [ ] Authorization checks (admin/user)

---

## Minimal UI Principle

* [ ] No complex menus
* [ ] Main screen contains only:
  * [ ] A textarea
  * [ ] Share button
  * [ ] Optional friend selector

**Goal:** write and share with no friction.

---

## Future Improvements (Optional)

* [ ] Note tagging
* [ ] Read status
* [ ] Scheduled notes
* [ ] Dark / Light theme
* [ ] Mobile responsiveness

---

## Notes

This project is designed for learning and experimentation.
Its main purpose is to practice Spring Boot, Spring Security, and JWT-based authentication in a real but simple application.