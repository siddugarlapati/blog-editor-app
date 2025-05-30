# Blog Editor App

A full-stack blog editor application built with Django (backend) and React (frontend), using PostgreSQL as the database. This project fulfills the requirements of the "Full Stack Assignment for Internship Hiring" by implementing a blog editor page with features like writing, editing, saving, and publishing blogs, along with an auto-save draft feature.

## Features
- **Blog Editor Page:**
  - Title field (text input)
  - Content field (rich text editor using React Quill)
  - Tags field (comma-separated input)
- **Functionality:**
  - Save as Draft button
  - Publish button
  - Auto-save draft feature (triggers every 5 seconds of inactivity using a timeout)
  - Display list of all blogs (published and drafts shown separately)
  - Edit and update existing drafts/posts (via API, though frontend editing UI can be added)
- **Bonus Features:**
  - Auto-save with 5-second inactivity detection using a simple timeout (debouncing can be enhanced with libraries like `lodash.debounce`)
  - Visual notifications for auto-save using `react-toastify` (toast messages)
  - Modular code with clean separation of concerns

## Tech Stack
- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React, React Quill (rich text editor), Tailwind CSS, Axios, React Toastify
- **Other:** Git, GitHub

## System Architecture
- **Frontend:** React app running on `http://localhost:3000`, making REST API calls to the backend.
- **Backend:** Django REST Framework API server running on `http://localhost:8000`, handling CRUD operations for blogs.
- **Database:** PostgreSQL database (`blog_db`) for storing blog data.
