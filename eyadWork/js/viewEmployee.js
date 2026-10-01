


function displayViewEmployee()
{

let content = document.getElementById("content")

    let user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    let role = user?.role?.toLowerCase();

if(role == "hr")
{

content.innerHTML = 
`
        <section class="content">

            <div class="page-label">
                HR WORKSPACE / EMPLOYEES
            </div>


            <!-- TITLE -->
            <div class="title-row">

                <div>
                    <h1>Employees</h1>

                    <p>
                        View, search and manage all employee accounts.
                    </p>
                </div>

                <button class="add-btn">
                    <i class="bi bi-plus-lg"></i>
                    Add Employee
                </button>

            </div>


            <!-- EMPLOYEE CARD -->
            <div class="employee-card">

                <div class="card-header">

                    <h2>All employees</h2>

                    <span class="employee-count">
                        12 employees
                    </span>

                </div>


                <!-- FILTERS -->
                <div class="filters">

                    <div class="search-box">

                        <i class="bi bi-search"></i>

                        <input
                            type="text"
                            placeholder="Search by name or email"
                        >

                    </div>


                    <div class="select-box">

                        <select>
                            <option>All departments</option>
                            <option>Engineering</option>
                            <option>Finance</option>
                            <option>Marketing</option>
                            <option>Operations</option>
                            <option>Human Resources</option>
                        </select>

                        <i class="bi bi-chevron-down"></i>

                    </div>


                    <div class="select-box status-select">

                        <select>
                            <option>All statuses</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>

                        <i class="bi bi-chevron-down"></i>

                    </div>

                </div>


                <!-- TABLE -->
                <div class="table-wrapper">

                    <table>

                        <thead>
                            <tr>
                                <th>EMPLOYEE</th>
                                <th>DEPARTMENT</th>
                                <th>POSITION</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>

                            <!-- Employee 1 -->
                            <tr>

                                <td>
                                    <div class="employee-info">

                                        <div class="employee-avatar">
                                            LO
                                        </div>

                                        <div>
                                            <strong>Lujain Okour</strong>
                                            <span>lujain@company.com</span>
                                        </div>

                                    </div>
                                </td>

                                <td>Engineering</td>

                                <td>Front-end Developer</td>

                                <td>
                                    <span class="status active">
                                        <span class="status-dot"></span>
                                        Active
                                    </span>
                                </td>

                                <td>
                                    <div class="actions">

                                        <button class="view-btn">
                                            View
                                        </button>

                                        <button class="icon-btn">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button class="icon-btn delete">
                                            <i class="bi bi-trash3"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>


                            <!-- Employee 2 -->
                            <tr>

                                <td>
                                    <div class="employee-info">

                                        <div class="employee-avatar">
                                            OH
                                        </div>

                                        <div>
                                            <strong>Haya Ahmed</strong>
                                            <span>omar@company.com</span>
                                        </div>

                                    </div>
                                </td>

                                <td>Finance</td>

                                <td>Accountant</td>

                                <td>
                                    <span class="status active">
                                        <span class="status-dot"></span>
                                        Active
                                    </span>
                                </td>

                                <td>
                                    <div class="actions">

                                        <button class="view-btn">
                                            View
                                        </button>

                                        <button class="icon-btn">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button class="icon-btn delete">
                                            <i class="bi bi-trash3"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>


                            <!-- Employee 3 -->
                            <tr>

                                <td>
                                    <div class="employee-info">

                                        <div class="employee-avatar">
                                            RS
                                        </div>

                                        <div>
                                            <strong>Rana Saleh</strong>
                                            <span>rana@company.com</span>
                                        </div>

                                    </div>
                                </td>

                                <td>Marketing</td>

                                <td>Content Specialist</td>

                                <td>
                                    <span class="status active">
                                        <span class="status-dot"></span>
                                        Active
                                    </span>
                                </td>

                                <td>
                                    <div class="actions">

                                        <button class="view-btn">
                                            View
                                        </button>

                                        <button class="icon-btn">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button class="icon-btn delete">
                                            <i class="bi bi-trash3"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>


                            <!-- Employee 4 -->
                            <tr>

                                <td>
                                    <div class="employee-info">

                                        <div class="employee-avatar">
                                            KN
                                        </div>

                                        <div>
                                            <strong>Khaled Nasser</strong>
                                            <span>khaled@company.com</span>
                                        </div>

                                    </div>
                                </td>

                                <td>Operations</td>

                                <td>Operations Coordinator</td>

                                <td>
                                    <span class="status inactive">
                                        <span class="status-dot"></span>
                                        Inactive
                                    </span>
                                </td>

                                <td>
                                    <div class="actions">

                                        <button class="view-btn">
                                            View
                                        </button>

                                        <button class="icon-btn">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button class="icon-btn delete">
                                            <i class="bi bi-trash3"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>


                            <!-- Employee 5 -->
                            <tr>

                                <td>
                                    <div class="employee-info">

                                        <div class="employee-avatar">
                                            DM
                                        </div>

                                        <div>
                                            <strong>Dina Mansour</strong>
                                            <span>dina@company.com</span>
                                        </div>

                                    </div>
                                </td>

                                <td>Human Resources</td>

                                <td>HR Assistant</td>

                                <td>
                                    <span class="status active">
                                        <span class="status-dot"></span>
                                        Active
                                    </span>
                                </td>

                                <td>
                                    <div class="actions">

                                        <button class="view-btn">
                                            View
                                        </button>

                                        <button class="icon-btn">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button class="icon-btn delete">
                                            <i class="bi bi-trash3"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>


                            <!-- Employee 6 -->
                            <tr>

                                <td>
                                    <div class="employee-info">

                                        <div class="employee-avatar">
                                            YA
                                        </div>

                                        <div>
                                            <strong>Yousef Ali</strong>
                                            <span>yousef@company.com</span>
                                        </div>

                                    </div>
                                </td>

                                <td>Engineering</td>

                                <td>Back-end Developer</td>

                                <td>
                                    <span class="status active">
                                        <span class="status-dot"></span>
                                        Active
                                    </span>
                                </td>

                                <td>
                                    <div class="actions">

                                        <button class="view-btn">
                                            View
                                        </button>

                                        <button class="icon-btn">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button class="icon-btn delete">
                                            <i class="bi bi-trash3"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <!-- ================= PAGINATION ================= -->
                <div class="pagination-area">

                    <span class="showing">
                        Showing 1–6 of 12 employees
                    </span>

                    <div class="pagination">

                        <button class="page-btn previous" disabled>
                            Previous
                        </button>

                        <button class="page-number active-page">
                            1
                        </button>

                        <button class="page-number">
                            2
                        </button>

                        <button class="page-btn">
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </section>

`

}


if (role=="employee")
{
    content.innerHTML = 
    `
            <section class="content">

            <div class="page-label">
                HR WORKSPACE / EMPLOYEES / EMPLOYEE DETAILS
            </div>


            <!-- TITLE -->
            <div class="title-row">

                <div>
                    <h1>Employee Details</h1>

                    <p>
                        View this employee's information and salary details.
                    </p>
                </div>

                <button class="back-btn">
                    <i class="bi bi-arrow-left"></i>
                    Back to Employees
                </button>

            </div>


            <!-- EMPLOYEE CONTENT -->
            <div class="employee-layout">


                <!-- ================= PROFILE ================= -->
                <div class="profile-section">

                    <h3>Profile photo</h3>

                    <div class="profile-card">

                        <div class="profile-avatar">
                            LO
                        </div>

                        <h2>Lujain Okour</h2>

                        <p class="job-title">
                            Junior Developer
                        </p>

                        <span class="status-badge">
                            Active
                        </span>

                        <div class="profile-divider"></div>

                        <button class="edit-btn">
                            Edit Employee
                        </button>

                    </div>

                </div>


                <!-- ================= DETAILS ================= -->
                <div class="details-section">

                    <h3>Employee details</h3>

                    <div class="details-card">

                        <div class="form-grid">

                            <!-- Full Name -->
                            <div class="field">
                                <label>Full name</label>

                                <div class="input-box">
                                    Lujain Okour
                                </div>
                            </div>


                            <!-- Email -->
                            <div class="field">
                                <label>Email address</label>

                                <div class="input-box">
                                    lujain.okour@company.com
                                </div>
                            </div>


                            <!-- Phone -->
                            <div class="field">
                                <label>Phone number</label>

                                <div class="input-box">
                                    +962 79 000 0000
                                </div>
                            </div>


                            <!-- Job Title -->
                            <div class="field">
                                <label>Job title</label>

                                <div class="input-box">
                                    Junior Developer
                                </div>
                            </div>


                            <!-- Department -->
                            <div class="field">
                                <label>Department</label>

                                <div class="input-box">
                                    Engineering
                                </div>
                            </div>


                            <!-- Joining Date -->
                            <div class="field">
                                <label>Joining date</label>

                                <div class="input-box">
                                    Jan 15, 2026
                                </div>
                            </div>


                            <!-- Status -->
                            <div class="field">
                                <label>Status</label>

                                <div class="input-box">
                                    Active
                                </div>
                            </div>


                            <!-- Role -->
                            <div class="field">
                                <label>Role</label>

                                <div class="input-box">
                                    Employee
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    `
}




}