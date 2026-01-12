# N-to - Note Sharing Application

A modern note-taking and sharing application with Metro UI design, built with React, TanStack Router, and Spring Boot.

## 🎨 Features

### ✅ **User Management**
- User registration with email validation
- Secure login with BCrypt password hashing
- Unique user codes for easy sharing
- User profile management

### ✅ **Note Management**
- Create, read, update, and delete notes
- Rich note content with title and body
- View your own notes and shared notes separately
- Metro UI inspired tile-based layout

### ✅ **Note Sharing**
- Share notes with other users using their unique user code
- View all users who have access to your notes
- Remove sharing access anytime
- When note owner deletes a note, it's removed from all shared users

### ✅ **Security**
- Passwords are hashed with BCrypt (never stored in plain text)
- User authentication with session management
- Authorization checks for all operations
- Only note owners can edit, delete, or share notes

## 🏗️ Tech Stack

### **Frontend**
- **React** + **TypeScript**
- **TanStack Router** for routing
- **Ky** for HTTP requests
- **Metro UI** inspired design
- **CSS** with custom styling

### **Backend**
- **Spring Boot** 4.0.1
- **Spring Data JPA** for database operations
- **Spring Security** for authentication
- **PostgreSQL** database
- **Lombok** for boilerplate reduction
- **BCrypt** for password hashing

## 📁 Project Structure

```
N-to/
├── src/                          # Frontend
│   ├── components/
│   │   ├── pages/
│   │   │   ├── notes.tsx        # Notes management page
│   │   │   ├── notes.css
│   │   │   ├── profile.tsx      # User profile page
│   │   │   ├── profile.css
│   │   │   ├── auth.css         # Login/Signup styling
│   │   └── ui/
│   │       └── theme.css
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx            # Root redirect
│   │   ├── login.tsx            # Login page
│   │   ├── signup.tsx           # Signup page
│   │   └── dashboard.tsx        # Main dashboard
│   ├── services/
│   │   ├── api-client.ts        # HTTP client setup
│   │   ├── user-service.ts      # User API calls
│   │   ├── note-service.ts      # Note API calls
│   │   ├── types.ts             # TypeScript types
│   │   └── index.ts
│   └── router.tsx
│
└── nijen/                        # Backend (Spring Boot)
    └── src/main/java/noto/jp/nijen/
        ├── controller/
        │   ├── UserController.java
        │   └── NoteController.java
        ├── service/
        │   ├── UserService.java
        │   └── NoteService.java
        ├── repository/
        │   ├── UserRepository.java
        │   └── NoteRepository.java
        ├── entity/
        │   ├── Users.java
        │   ├── Note.java
        │   └── BaseEntity.java
        ├── dto/
        │   ├── UserDto.java
        │   ├── NoteResponseDto.java
        │   └── ... (other DTOs)
        ├── exception/
        │   ├── GlobalExceptionHandler.java
        │   └── ... (custom exceptions)
        ├── mapper/
        │   └── NoteMapper.java
        ├── util/
        │   └── PasswordHashUtil.java
        └── config/
            └── SecurityConfig.java
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **pnpm**
- **Java** 21+
- **PostgreSQL** database
- **Gradle** (included via wrapper)

### Backend Setup

1. **Configure Database** (`nijen/src/main/resources/application.yaml`):
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/noto_db
    username: your_username
    password: your_password
```

2. **Run Backend**:
```bash
cd nijen
./gradlew bootRun
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**:
```bash
pnpm install
```

2. **Start Development Server**:
```bash
pnpm dev
```

Frontend will start on `http://localhost:5173`

## 📖 API Endpoints

### **User Endpoints**
```
POST   /api/users              - Create user
POST   /api/users/login        - Login
GET    /api/users/{id}         - Get user by ID
GET    /api/users/code/{code}  - Get user by code
GET    /api/users              - Get all users
DELETE /api/users/{id}         - Delete user
```

### **Note Endpoints**
```
POST   /api/notes                      - Create note
PUT    /api/notes/{id}                 - Update note
DELETE /api/notes/{id}                 - Delete note (cascade)
GET    /api/notes/{id}                 - Get note by ID
GET    /api/notes/my-notes             - Get user's notes
GET    /api/notes/shared-with-me       - Get shared notes
GET    /api/notes/all                  - Get all accessible notes
POST   /api/notes/{id}/share           - Share note
DELETE /api/notes/{id}/share/{userId}  - Unshare note
```

## 🎯 Usage Flow

### 1. **Sign Up**
- Navigate to `/signup`
- Enter username, email, and password
- You'll receive a unique user code

### 2. **Login**
- Navigate to `/login`
- Enter email and password
- Redirected to dashboard

### 3. **Create Notes**
- Click "NEW NOTE" button
- Enter title and content
- Click "CREATE"

### 4. **Share Notes**
- Click "SHARE" button on your note
- Enter recipient's user code
- Click "SHARE"

### 5. **View Shared Notes**
- Click "SHARED WITH ME" tab
- View notes others have shared with you

### 6. **Delete Notes**
- Click "DELETE" button on your note
- Confirm deletion
- Note is removed from all shared users

## 🎨 Metro UI Design Features

- **Flat Design**: No gradients or shadows
- **Bold Typography**: Uppercase text with letter spacing
- **Sharp Corners**: No border radius
- **Grid Background**: Subtle grid pattern
- **Accent Colors**: Windows-inspired blue (#0078d4)
- **Fast Animations**: Quick transitions (0.15s)
- **Clear Hierarchy**: Strong visual organization

## 🔐 Security Features

1. **Password Hashing**: BCrypt with automatic salt
2. **Authentication**: Session-based with localStorage
3. **Authorization**: Owner-only operations
4. **Input Validation**: Backend validation with Jakarta
5. **Error Handling**: Global exception handler

## 📝 Database Schema

### **users**
- id (PK)
- userName
- email (unique)
- passwordHash
- userCode (unique, 8 chars)
- createdAt

### **notes**
- id (PK)
- title
- content
- owner_id (FK → users)
- createdAt

### **note_shared_users** (Join Table)
- note_id (FK → notes)
- user_id (FK → users)

## 🛠️ Development

### Build for Production

**Frontend**:
```bash
pnpm build
```

**Backend**:
```bash
cd nijen
./gradlew build
```

### Run Tests

**Backend**:
```bash
cd nijen
./gradlew test
```