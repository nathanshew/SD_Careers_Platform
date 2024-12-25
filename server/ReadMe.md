## User Guide

### Pre-requisite
Ensure you are in the **server directory** before proceeding.

---

### Step 1: Install Dependencies
Install all required dependencies by running the following command:
```bash npm install```

---

### Step 2: Create `.env` File
1. Create a `.env` file in the **server directory**.
2. Use the details outlined in **env.md** as a reference.

Note: Ensure your **local PostgreSQL database** is set up before proceeding.

---

### Step 3: Push Database Schema
Push the database schema to your PostgreSQL database:
```bash npx prisma db push```

---

### Step 4: Migrate Database
Apply database migrations:
```bash npx prisma migrate dev```

---

### Step 5: Seed Database
Seed the database with initial data:
```bash npx prisma db seed```

---

### Step 6: Run Backend Server
Start the backend server:
```bash npm run dev```

---

### Notes
- Ensure your PostgreSQL server is running before executing database commands.
- If any errors occur, check the logs and verify your `.env` configurations.
