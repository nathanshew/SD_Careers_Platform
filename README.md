# Careers Platform - Frontend (Next.js)

## Overview

This project is developed using **Next.js**, with automatic routing based on the file structure within the `src/app/` directory. Each folder corresponds to a URL path, and every `page.tsx` file within those folders defines the content for that specific route.

For example:
- The `page.tsx` file in `/src/app/about/` will render when you navigate to `/about` in the browser.

---

## Key Routing Folders

- `src/app/positions/page.tsx` → `/positions`

### Components

- Page-specific components are housed in the `src/app/components/(page)` directory.

---

## Local Setup and Execution

1. Fork the repository: [NUS Fintech Society Careers Platform](https://github.com/NUS-Fintech-Society/SD_Careers_Platform)
2. Clone the repository: `git clone (URL)`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

---

## GitHub Workflow

1. Stage changes: `git add *`
2. Commit with a message: `git commit -m "(message)"`
3. Push to the repository: `git push`
4. Submit a pull request
