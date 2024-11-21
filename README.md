
# Node.js Developer Assignment Submission

## Candidate Details
- **Name**: Vivek Sarkar
- **Email**: viveksarkar00097@gmail.com

---

## Project Overview
This project demonstrates a full-stack application with CRUD functionality, showcasing seamless interaction between frontend and backend services.

---

## Technologies Used

### Frontend
- **React**: Component-based library for creating interactive UIs.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN UI**: Pre-built UI components for enhanced user experience.

### Backend
- **Express.js**: Lightweight and flexible web framework for Node.js.
- **Prisma**: ORM (Object Relational Mapping) for database queries.
- **PostgreSQL**: Relational database for structured data storage.
- **Cloudinary**: Used for storing and managing media assets.

---

## Features Implemented

### Frontend Features
- **Responsive UI**: Built using Tailwind CSS and ShadCN UI components.
- **Dynamic Forms**: Allows data input for CRUD operations.
- **Routing**: Implemented using React Router for a seamless single-page application experience.

### Backend Features
- **API Development**: RESTful APIs built with Express.js for managing CRUD operations.
- **Database Interaction**: Prisma used to interact with PostgreSQL for efficient data handling.
- **Media Storage**: Cloudinary used for storing images and videos.

---
<img width="1470" alt="Screenshot 2024-11-21 at 9 26 29 PM" src="https://github.com/user-attachments/assets/c86a200a-e869-4eea-bf3f-2ab71f6d5408">
<img width="1470" alt="Screenshot 2024-11-21 at 9 26 48 PM" src="https://github.com/user-attachments/assets/06db316d-cc4d-453c-b44a-bce5ba171937">
<img width="1470" alt="Screenshot 2024-11-21 at 9 26 52 PM" src="https://github.com/user-attachments/assets/ee588cc8-c671-4c43-a33b-dfdfa8f5a7c6">

## Implementation Details

### Frontend
- **Setup**: Created using Vite for optimized development.
- **Component Architecture**: Follows a modular design for reusable components.
- **State Management**: Utilized React's Context API for global state.

### Backend
- **Structure**: Layered architecture with clear separation between routes, controllers, and services.
- **Database Models**: Defined using Prisma schema for tables such as `Users`, `Products`, etc.
- **API Endpoints**:
  - **GET**: Fetch data from the database.
  - **POST**: Add new entries.
  - **PUT**: Update existing entries.
  - **DELETE**: Remove records.

### Media Storage
- Integrated with **Cloudinary** using its SDK for secure and scalable storage of assets like images and videos.

---

## Steps to Run the Project

### Prerequisites
- Node.js (v16 or above)
- PostgreSQL database
- Cloudinary account

### Setup Instructions

1. **Clone Repository**:
   ```bash
   git clone https://github.com/viveksarkar0/BookReviewApp
   cd BookReviewApp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file and add the following:
   ```env
   DATABASE_URL=your_postgres_database_url
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Run Database Migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the Application**:
   - **Backend**:
     ```bash
     npm start
     ```
   - **Frontend**:
     ```bash
     npm run dev
     ```

---

## GitHub Repository and Live Demo
- **GitHub Repository**: [BookReviewApp](https://github.com/viveksarkar0/BookReviewApp)
- **Backend Deployment**: [Render Backend](https://backend-66r2.onrender.com)

---

## Additional Notes
- Focused on writing clean, maintainable code with comments for clarity.
- Followed best practices for security, including input validation and error handling.
- Used **ESLint** and **Prettier** for consistent code formatting.

---

Thank you for the opportunity!  
**Vivek Sarkar**
