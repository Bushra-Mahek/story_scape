📘 StoryScape – Full Stack Blog Platform

A full-stack blog platform built using:

Frontend Server: Node.js + Express + EJS

Backend API: Node.js + Express

Database: PostgreSQL

Authentication: JWT

Session Handling: Express-session

File Uploads: Multer + Cloudinary

Architecture: Client → API → DB

🚀 Features
🔐 Authentication

User Registration

User Login (JWT based)

Protected routes

Session-based token storage

📝 Posts

Create post (with image upload)

Edit post (only owner)

Delete post (only owner)

View single post

View all posts

View posts by specific user

❤️ Likes System

Like / Unlike posts

Unique constraint prevents duplicate likes

Real-time like count update

Stored in separate likes table

🔔 Notification System (Unread Posts)

Tracks which posts a user has not yet viewed.

When user opens a post → entry inserted into post_views

Notifications page shows posts NOT present in post_views

Uses NOT EXISTS SQL query

Unique constraint prevents duplicate views

Indexed for performance

🔍 Search

Search by:

Title

Author

Content

Case-insensitive search (ILIKE)

Query parameter based routing

🏗 Database Schema
users
id SERIAL PRIMARY KEY
email TEXT UNIQUE
password TEXT
username TEXT
bio TEXT
profile_photo TEXT
posts
id SERIAL PRIMARY KEY
title TEXT
author TEXT
content TEXT
image TEXT
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
likes
id SERIAL PRIMARY KEY
post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
UNIQUE(post_id, user_id)
post_views (Notification System)
post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
PRIMARY KEY(post_id, user_id)
⚡ Important Engineering Decisions
Why UNIQUE(post_id, user_id)?

Prevents:

Duplicate likes

Duplicate read entries

Enforced at DB level (not app level).

Why NOT EXISTS for Unread Posts?
SELECT *
FROM posts
WHERE NOT EXISTS (
    SELECT 1
    FROM post_views
    WHERE post_views.post_id = posts.id
    AND post_views.user_id = $1
)

Efficient when indexed.

Indexing
CREATE INDEX idx_post_views_user_post
ON post_views(user_id, post_id);

CREATE INDEX idx_posts_created_at
ON posts(created_at DESC);

Improves unread and feed performance.

🧠 Architecture

Frontend Server (3000)
⬇ Axios
Backend API (4000)
⬇
PostgreSQL

Separation allows:

Clean API layer

Reusable backend

Scalable structure

🛡 Security

JWT verification middleware

Protected routes

Owner-based authorization for edit/delete

UNIQUE constraints to prevent duplication

Foreign keys with ON DELETE CASCADE

🧩 Future Improvements

Pagination

Infinite scroll

Redis caching

Full-text search

Rate limiting

Notifications badge count

Role-based authorization

Soft delete

Post categories & tags

Trending algorithm

📦 Installation
git clone <repo>
cd project
npm install

Create .env:

PORT=4000
JWT_SECRET=your_secret
SESSION_SECRET=your_session_secret
DATABASE_URL=postgres_connection_string

Run:

npm run dev
🎯 Learning Outcomes

This project demonstrates:

REST API design

Middleware-based authentication

Authorization patterns

SQL optimization

Index usage

Conflict handling (ON CONFLICT)

Notification system design

Separation of concerns

Full-stack integration
