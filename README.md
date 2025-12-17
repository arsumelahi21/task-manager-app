# README.md

# Task Manager – Full-Stack Assignment

A full-stack Task Manager web application built with **Next.js** and **Supabase**, allowing users to securely manage their tasks with authentication, role-based access control, and a modern Kanban-style UI.

## Features

### Authentication
- Email & password signup and login using **Supabase Auth**
- Secure session handling
- Protected routes (only authenticated users can access tasks)
- Logout functionality

### Task Management (CRUD)
- Create tasks via modal
- Edit tasks via modal
- Delete tasks with confirmation
- Drag & drop tasks between statuses
- Search tasks by **title and description**

### Task Board (Kanban)
- Columns: **Todo**, **In Progress**, **Done**
- Drag & drop powered by `@dnd-kit`
- Visual status indicators
- Empty states per column
- Skeleton loaders while data is loading

### Security
- Row Level Security (RLS) enforced at database level
- Each user can only access their own tasks
- Ownership handled via `auth.uid()`

---

## Tech Stack

**Frontend**
- Next.js (Pages Router)
- React
- TypeScript
- Tailwind CSS
- @dnd-kit (drag & drop)
- react-icons

**Backend**
- Supabase
  - Authentication
  - PostgreSQL database
  - Row Level Security (RLS)

---

## Database Schema

### `tasks` table

| Column       | Type       | Description                         |
|--------------|------------|-------------------------------------|
| id           | UUID       | Primary key                         |
| user_id      | UUID       | FK → `auth.users.id`                |
| title        | Text       | Task title                          |
| description  | Text       | Optional task description           |
| status       | Enum       | `todo` / `in-progress` / `done`     |
| created_at   | Timestamp  | Creation time                       |

### Security
- RLS enabled on `tasks`
- Policies restrict SELECT / INSERT / UPDATE / DELETE to task owner only

---

## Row Level Security (RLS)

RLS policies ensure that:
- Users can only see their own tasks
- Users cannot create or modify tasks belonging to others

Example policy:

```sql
create policy "Users can manage their own tasks"
on public.tasks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
````

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
mkdir task-manager
cd task-manager
git clone https://github.com/arsumelahi21/task-manager-app

```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the app

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## Architectural Decisions

* **Kanban board** chosen for intuitive task status management
* **Modals** used for create/edit actions to keep the board uncluttered
* **Page-level state management** for filtering and mutations
* **RLS over frontend checks** for real security guarantees
* **Skeleton loaders** to improve perceived performance

---

## Possible Improvements

* Pagination for large task lists
* Task due dates
* Activity history
* Team/shared boards

---

## AI Assistance Disclosure

AI assistance (ChatGPT) was used during development primarily for **UI/UX suggestions and design guidance**, as I do not come from a design background.  
All implementation, architectural decisions, and integration were done and understood by me.
