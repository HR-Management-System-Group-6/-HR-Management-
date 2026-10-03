# HR Management System

## 📌 Project Overview

The **HR Management System** is a responsive web application designed to help companies manage employees and HR-related services in one place.

The system provides different functionalities for **HR users** and **Employees**. HR can manage employees, tasks, leave requests, feedback, company policies, and meetings. Employees can manage their profile, assigned tasks, leave requests, feedback, and meetings.

The project is built using **HTML, CSS, Bootstrap, and JavaScript**, with **Local Storage** used to store sessions and application data, and **JSON files** used for employee and company policy data.

---

## 🎯 Project Objectives

- Build a professional and responsive HR Management System.
- Practice HTML5 and CSS3.
- Use Bootstrap for responsive design.
- Use JavaScript for functionality and validation.
- Use Local Storage to manage application data.
- Use JSON files to store and read data.
- Implement different permissions for HR and Employees.
- Practice teamwork using Git and GitHub.

---

## 👥 User Roles

### 👨‍💼 HR

HR users can:

- Manage all employees.
- Add new employees.
- Edit employee information.
- Delete employees.
- View employee information.
- Search and filter employees by:
  - Name
  - Email
  - Department
- Create tasks.
- Edit tasks.
- Delete tasks.
- Assign tasks to employees.
- Track task status.
- Review employee task solutions.
- View leave requests.
- Approve or reject leave requests.
- Filter leave requests by employee or status.
- View company policies.
- View employee feedback.
- Manage meetings.

### 👨‍💻 Employee

Employees can:

- Login using an account created by HR.
- View their own profile.
- Edit allowed profile information.
- View assigned tasks.
- Open and solve tasks.
- Submit task solutions to HR.
- Submit leave requests.
- View their own leave requests.
- View request status.
- View company policies.
- Send feedback to HR.
- View and manage meetings.

---

# 🔐 Login Page

The Login page contains:

- Email
- Password
- JavaScript validation
- Account verification
- Role detection
- Role-based redirection

After successful login, the user is redirected according to their role.

```text
Login
  ↓
Validate Email & Password
  ↓
Check User
  ↓
Check Role
  ↓
 ┌───────────────┐
 │               │
 HR          Employee
 │               │
 ↓               ↓
HR Dashboard   Employee Dashboard


## 🔗 Project Links

- [GitHub Repository](https://github.com/HR-Management-System-Group-6/-HR-Management-/tree/eyad)
- [Figma Design](https://www.figma.com/design/ob5jzDq9ZU3i6ANa2eLXv7/Untitled?node-id=0-1&t=rRbGSAqexeEIGuYj-1)
- [Trello Board](https://trello.com/invite/b/6abcc4c541e23642285da507/ATTI23c65adb32538367aabedd7cb6acda353EF42AF4/hr-website-page-assignments-🧭)



# 📂 Project Structure


HR-Management/
│
├── abdallahwork/
│   │
│   ├── css/
│   │   ├── about.css
│   │   ├── companypolicy.css
│   │   └── team.css
│   │
│   ├── data/
│   │   ├── companypolicy.json
│   │   └── test.json
│   │
│   ├── html/
│   │   ├── about.html
│   │   ├── companypolicy.html
│   │   └── team.html
│   │
│   ├── js/
│   │   ├── companypolicy.js
│   │   └── index.js
│   │
│   └── photo/
│
├── eyadWork/
│
├── Haya_Work/
│
├── lujain/
│
└── sara-work/