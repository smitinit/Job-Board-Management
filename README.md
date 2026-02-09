## Objective

To assess your ability to build a simple, interactive Next.js and a React.js application using modern web development best practices.

## Overview

You will develop a Job Board Application where users can:

1. View a list of job postings
2. Filter jobs by category
3. View details of a specific job
4. Apply for a job using a simple form

## Instructions

1. Project Setup
   - Initialize a Next.js project
   - Use TypeScript for type safety.
   - Use Tailwind CSS for styling.
   - Utilize ESLint & Prettier for code formatting and best practices.

2. Features to Implement
   - [2.1] Job Listing Page (/)
     - Fetch job listings from an external job API (e.g. JSearch API, Remotive API, or Adzuna API).
     - Display job title, company, location, and category.
     - Implement a search bar to filter jobs by title.
     - Implement category-based filtering using buttons or a dropdown.

   - [2.2] Job Details Page (/job/[id])
     - Show detailed information about the job when a user clicks on a job listing.
     - Include job title, description, company details, and an “Apply Now” button.

   - [2.3] Apply for Job (/apply/[id])
     - Create a simple form with the following fields:
       - Name (Required)
       - Email (Required, Valid Format)
       - Phone Number (Optional)
       - Resume Upload (PDF only, max 5MB)
     - Validate form inputs and show appropriate error messages.
     - Store submitted application data in local state or a JSON file (do not store in a database).
     - Display a confirmation message after successful submission.

3. Technical Requirements
   - Use React Hooks (useState, useEffect, useContext if needed).
   - Implement Next.js Routing (getStaticProps / getServerSideProps for data fetching).
   - Use Context API or a global state management library (Zustand, Recoil, or Redux Toolkit).
   - Follow Mobile-First Design principles.

4. Bonus Points (Optional Enhancements)
   - Implement Dark Mode toggle.
   - Use Framer Motion for subtle animations.
   - Deploy the app on Vercel.

## Deliverables

- A GitHub repository with a README explaining how to run the project.
- A deployed link (if using Vercel or Netlify).
- Code should be clean, readable, and well-commented.

## Evaluation Criteria

1. Code Quality – Proper structure, reusability, and readability.
2. Functionality – All core features should work as expected.
3. UI/UX – Clean design, responsiveness, and user experience.
4. Best Practices – Efficient state management, API handling, and accessibility.
5. Bonus Implementations – Any additional features implemented beyond the requirements.

## Remotive API

```
legacy
https://remotive.com/api/remote-jobs

Currently using JSearch API
```
