# 🎓 University Assignment Approval System

A **full-stack, role-based university workflow system** designed to manage **assignment submission, multi-level approval, rejection, and resubmission** using a structured academic hierarchy.

The system enforces a **two-step approval process** where assignments move from **Student → Professor → HOD**, ensuring accountability and proper academic review.

---

## 🚀 Key Highlights

* Role-based access control (Admin, Student, Professor, HOD)
* Multi-level approval workflow
* Assignment rejection & resubmission support
* Department-wise segregation
* Secure authentication & authorization
* Scalable backend using Prisma ORM

---

## 🧠 Assignment Approval Workflow (Core Logic)

### 🔁 Complete Flow

1. **Student uploads assignment**
2. Assignment goes to **Professor** for first review
3. **Professor can:**

   * ✅ **Approve** → forwarded to **HOD**
   * ❌ **Reject** → returned to **Student for resubmission**
4. **HOD can:**

   * ✅ **Approve** → assignment marked as **Submitted**
   * ❌ **Reject** → returned to **Student for resubmission**
5. Once approved by **both Professor and HOD**:

   * Assignment is marked **Submitted**
   * Visible to **Student, Professor, and HOD**

> ⚠️ Both **Professor and HOD** have authority to **reject** and request **resubmission**.

---

## 👥 User Roles & Responsibilities

### 🛡️ Admin

System administrator with highest privileges.

* Create users (Student, Professor, HOD)
* Create & manage departments
* Assign users to departments
* Manage system configuration

---

### 🧑‍🎓 Student

Assignment submitter.

* Login to student dashboard
* Upload assignments
* View assignment status:

  * Pending (Professor)
  * Pending (HOD)
  * Approved
  * Rejected (Resubmission required)

---

### 👨‍🏫 Professor

First-level approver.

* View student assignment requests
* Approve assignments → forward to HOD
* Reject assignments with feedback
* Track assignment status

---

### 👨‍💼 HOD (Head of Department)

Final authority.

* Review professor-approved assignments
* Approve final submission
* Reject assignments & request resubmission
* Monitor department-level submissions

---

## 🧩 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* JWT Authentication

### Database

* PostgreSQL / MySQL (via Prisma)

---

## 📂 Project Structure

```text
University_Assignment_Approval_System/
├── frontend/
├── university-approval-backend/
└── README.md
```

---

## 🖥️ Frontend Structure (Vite + React + TS)

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── InputBox.tsx
│   │   ├── Heading.tsx
│   │   └── SubHeading.tsx
│   │
│   ├── pages/
│   │   ├── Signin.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── UploadAssignment.tsx
│   │   ├── ProfessorDashboard.tsx
│   │   ├── ApproveAssignment.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── CreateUser.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔌 Backend Structure (Node + Express + Prisma)

```text
university-approval-backend/
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── multer.ts
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── adminController.ts
│   │   ├── departmentController.ts
│   │   └── userController.ts
│   │
│   ├── middlewares/
│   │   ├── authMiddlewares/
│   │   └── errorHandler.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── adminRoutes.ts
│   │   ├── departmentRoutes.ts
│   │   └── userRoutes.ts
│   │
│   ├── scripts/
│   │   └── createAdmin.ts
│   │
│   ├── utils/
│   └── index.ts
│
├── package.json
├── tsconfig.json
├── SETUP_GUIDE.md
└── README.md
```

---

## 🔐 Authentication & Security

* JWT-based authentication
* Role-based route protection
* Middleware-driven authorization
* Centralized error handling

---

## 📡 API Overview (Sample)

| Method | Endpoint                   | Role          | Description       |
| ------ | -------------------------- | ------------- | ----------------- |
| POST   | `/auth/login`              | All           | User login        |
| POST   | `/admin/create-user`       | Admin         | Create users      |
| POST   | `/department/create`       | Admin         | Create department |
| POST   | `/user/upload-assignment`  | Student       | Upload assignment |
| PUT    | `/user/approve-assignment` | Professor/HOD | Approve           |
| PUT    | `/user/reject-assignment`  | Professor/HOD | Reject            |

---

## ⚙️ Setup Instructions

### Prerequisites

* Node.js (v16+)
* npm
* Database (PostgreSQL / MySQL)

---

### Backend Setup

```bash
cd university-approval-backend
npm install
npx prisma generate
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📌 Assignment Status States

| Status              | Meaning                   |
| ------------------- | ------------------------- |
| Pending (Professor) | Awaiting professor review |
| Pending (HOD)       | Approved by professor     |
| Approved            | Final submission complete |
| Rejected            | Resubmission required     |

---

## 🔮 Future Enhancements

* File preview support
* Email notifications
* Deadline & reminder system
* Audit logs
* Deployment (Docker / Cloud)

---

## 👨‍💻 Author

**Uday**
