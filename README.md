**Employee Management System (EMS)**

A full-stack Employee Management System built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend.
The application supports role-based access control (Admin / User), employee CRUD operations, profile image upload, dashboard analytics, and authentication using JWT.

**Tech Stack Used**
**Frontend** - React (Vite),React Router DOM,Axios,Tailwind CSS,React Toastify,js-cookie,Chart.js / Recharts (Dashboard graphs)

**Backend**-Node.js,Express.js,MongoDB + Mongoose,JWT Authentication,Multer (Image upload),CORS,dotenv

**Step 1: Backend Setup**
cd backend
npm install
npm run dev
✔ Installs all backend dependencies
✔ Starts backend server (default: http://localhost:4000)

**Step 2: Frontend Setup**
cd frontend
npm install
npm run dev


✔ Installs frontend dependencies
✔ Starts frontend (Vite) app

📌 **Backend API Endpoints
🔑 Auth APIs**
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
👨‍💼 **Employee APIs**
Method	Endpoint	Description
GET	/api/employees	Get all employees (search, pagination)
POST	/api/employees	Create employee (Admin)
GET	/api/employees/:id	Get employee by ID
PUT	/api/employees/:id	Update employee (Admin)
DELETE	/api/employees/:id	Delete employee (Admin)
🖼️ **Employee Image APIs**
Method	Endpoint	Description
GET	/api/employees/:id/image	Get employee profile image
POST	/api/employees/:id/image	Upload profile image
DELETE	/api/employees/:id/image	Remove profile image
