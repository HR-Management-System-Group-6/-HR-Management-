// ======================================================
// HR EMPLOYEES - DATA
// ======================================================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    console.log("No logged in user found");
} else {
    console.log("Logged in user:", loggedInUser);
}
const hrEmployeesData = {

    lujain: {
        id: "lujain",
        initials: "LO",
        name: "Lujain Okour",
        email: "lujain@company.com",
        phone: "+962 79 000 0000",
        department: "Engineering",
        position: "Junior Developer",
        joined: "Jan 15, 2026",
        status: "Active",
        role: "Employee",

        basic: 800,
        incentives: 125,
        deductions: 95,
        net: 830
    },

    haya: {
        id: "haya",
        initials: "HA",
        name: "Haya Ahmed",
        email: "haya.ahmed@company.com",
        phone: "+962 79 000 0001",
        department: "Design",
        position: "UI Designer",
        joined: "Feb 03, 2026",
        status: "Active",
        role: "Employee",

        basic: 750,
        incentives: 90,
        deductions: 70,
        net: 770
    },

    omar: {
        id: "omar",
        initials: "OK",
        name: "Omar Khalil",
        email: "omar.khalil@company.com",
        phone: "+962 79 000 0002",
        department: "Human Resources",
        position: "HR Assistant",
        joined: "Mar 10, 2026",
        status: "Active",
        role: "Employee",

        basic: 700,
        incentives: 50,
        deductions: 65,
        net: 685
    },

    abdullah: {
        id: "abdullah",
        initials: "AN",
        name: "Abdullah Nasser",
        email: "abdullah.nasser@company.com",
        phone: "+962 79 000 0003",
        department: "Engineering",
        position: "QA Tester",
        joined: "Apr 21, 2026",
        status: "On leave",
        role: "Employee",

        basic: 720,
        incentives: 40,
        deductions: 80,
        net: 680
    },

    rana: {
        id: "rana",
        initials: "RH",
        name: "Rana Haddad",
        email: "rana.haddad@company.com",
        phone: "+962 79 000 0004",
        department: "Finance",
        position: "Accountant",
        joined: "May 12, 2026",
        status: "Active",
        role: "Employee",

        basic: 900,
        incentives: 150,
        deductions: 120,
        net: 930
    },

    sara: {
        id: "sara",
        initials: "SY",
        name: "Sara Yousef",
        email: "sara.yousef@company.com",
        phone: "+962 79 000 0005",
        department: "Marketing",
        position: "Marketing Officer",
        joined: "Jun 02, 2026",
        status: "Inactive",
        role: "Employee",

        basic: 680,
        incentives: 0,
        deductions: 55,
        net: 625
    }

};


// ======================================================
// HELPER - STATUS CLASS
// ======================================================

function getHRStatusClass(status) {

    if (status === "Active") {
        return "active";
    }

    if (status === "On leave") {
        return "leave";
    }

    if (status === "Inactive") {
        return "inactive";
    }

    return "";
}


// ======================================================
// HELPER - FORMAT MONEY
// ======================================================

function formatHRMoney(value) {

    return Number(value).toFixed(2);
}


// ======================================================
// PAGE 1
// HR PAYROLL / EMPLOYEES
// الصورة الأولى
// ======================================================

function displayHRPayrollEmployees() {

    const content = document.getElementById("content");

    if (!content) {
        return;
    }


    content.innerHTML = `

        <div class="main-content payroll-main payroll-page">

            <!-- PAGE HEADER -->

            <div class="payroll-header">

                <div>

                    <p class="small-path">
                        HR WORKSPACE / EMPLOYEES
                    </p>

                    <h1>
                        Employees
                    </h1>

                    <p class="subtitle">
                        View all employee information, salaries, and status in one place.
                    </p>

                </div>


                <button
                    type="button"
                    class="add-employee-btn"
                    id="hrPayrollAddEmployee"
                >
                    <i class="bi bi-plus-lg"></i>
                    Add Employee
                </button>

            </div>


            <!-- SUMMARY -->

            <section class="payroll-summary">

                <div class="payroll-stat">

                    <span>
                        Employees
                    </span>

                    <strong>
                        6
                    </strong>

                </div>


                <div class="payroll-stat">

                    <span>
                        Total basic salary
                    </span>

                    <strong>
                        4,550.00 JOD
                    </strong>

                </div>


                <div class="payroll-stat">

                    <span>
                        Total incentives
                    </span>

                    <strong>
                        +455.00 JOD
                    </strong>

                </div>


                <div class="payroll-stat">

                    <span>
                        Total deductions
                    </span>

                    <strong>
                        -485.00 JOD
                    </strong>

                </div>


                <div class="payroll-stat payroll-net">

                    <span>
                        Net payroll
                    </span>

                    <strong>
                        4,520.00 JOD
                    </strong>

                </div>

            </section>


            <!-- FILTERS -->

            <section class="payroll-filters">

                <div class="payroll-search">

                    <i class="bi bi-search"></i>

                    <input
                        type="text"
                        id="hrPayrollSearch"
                        placeholder="Search by name or email..."
                    >

                </div>


                <select id="hrPayrollDepartment">

                    <option value="all">
                        All departments
                    </option>

                    <option value="Engineering">
                        Engineering
                    </option>

                    <option value="Design">
                        Design
                    </option>

                    <option value="Human Resources">
                        Human Resources
                    </option>

                    <option value="Finance">
                        Finance
                    </option>

                    <option value="Marketing">
                        Marketing
                    </option>

                </select>


                <select id="hrPayrollStatus">

                    <option value="all">
                        All statuses
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="On leave">
                        On leave
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </section>


            <!-- TABLE -->

            <section class="payroll-table-card">

                <div class="payroll-table-title">

                    <h3>
                        All employees
                    </h3>

                    <span>
                        6 employees · Amounts in JOD
                    </span>

                </div>


                <div class="payroll-table-header">

                    <div>EMPLOYEE</div>

                    <div>JOB TITLE / DEPT</div>

                    <div>JOINED</div>

                    <div>STATUS</div>

                    <div>BASIC</div>

                    <div>INCENTIVES</div>

                    <div>DEDUCTIONS</div>

                    <div>NET</div>

                    <div>ACTION</div>

                </div>


                ${createHRPayrollRow(hrEmployeesData.lujain)}

                ${createHRPayrollRow(hrEmployeesData.haya)}

                ${createHRPayrollRow(hrEmployeesData.omar)}

                ${createHRPayrollRow(hrEmployeesData.abdullah)}

                ${createHRPayrollRow(hrEmployeesData.rana)}

                ${createHRPayrollRow(hrEmployeesData.sara)}

            </section>

        </div>

    `;


    setupHRPayrollEmployees();
}


// ======================================================
// CREATE PAYROLL ROW
// ======================================================

function createHRPayrollRow(employee) {

    const statusClass =
        getHRStatusClass(employee.status);


    return `

        <div
            class="payroll-row hr-payroll-row"
            data-name="${employee.name.toLowerCase()} ${employee.email.toLowerCase()}"
            data-department="${employee.department}"
            data-status="${employee.status}"
        >

            <div class="payroll-person">

                <div class="payroll-avatar">
                    ${employee.initials}
                </div>


                <div>

                    <strong>
                        ${employee.name}
                    </strong>

                    <span>
                        ${employee.email}
                    </span>

                    <span>
                        ${employee.phone}
                    </span>

                </div>

            </div>


            <div class="job-info">

                <strong>
                    ${employee.position}
                </strong>

                <span>
                    ${employee.department}
                </span>

            </div>


            <div>
                ${employee.joined}
            </div>


            <div>

                <span class="payroll-status ${statusClass}">
                    ${employee.status}
                </span>

            </div>


            <div>
                ${formatHRMoney(employee.basic)}
            </div>


            <div>
                ${employee.incentives > 0 ? "+" : ""}
                ${formatHRMoney(employee.incentives)}
            </div>


            <div>
                -${formatHRMoney(employee.deductions)}
            </div>


            <div class="net-money">
                ${formatHRMoney(employee.net)}
            </div>


            <div>

                <button
                    type="button"
                    class="payroll-view hr-payroll-view"
                    data-id="${employee.id}"
                >
                    View
                    <span>›</span>
                </button>

            </div>

        </div>

    `;
}


// ======================================================
// SETUP PAGE 1
// ======================================================

function setupHRPayrollEmployees() {

    const searchInput =
        document.getElementById("hrPayrollSearch");

    const departmentFilter =
        document.getElementById("hrPayrollDepartment");

    const statusFilter =
        document.getElementById("hrPayrollStatus");

    const rows =
        document.querySelectorAll(".hr-payroll-row");

    const viewButtons =
        document.querySelectorAll(".hr-payroll-view");

    const addButton =
        document.getElementById("hrPayrollAddEmployee");


    function filterPayrollEmployees() {

        const searchValue =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const departmentValue =
            departmentFilter
                ? departmentFilter.value
                : "all";

        const statusValue =
            statusFilter
                ? statusFilter.value
                : "all";


        rows.forEach(function (row) {

            const name =
                row.dataset.name || "";

            const department =
                row.dataset.department || "";

            const status =
                row.dataset.status || "";


            const searchMatch =
                name.includes(searchValue);

            const departmentMatch =
                departmentValue === "all" ||
                department === departmentValue;

            const statusMatch =
                statusValue === "all" ||
                status === statusValue;


            if (
                searchMatch &&
                departmentMatch &&
                statusMatch
            ) {

                row.style.display = "grid";

            } else {

                row.style.display = "none";

            }

        });
    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterPayrollEmployees
        );
    }


    if (departmentFilter) {

        departmentFilter.addEventListener(
            "change",
            filterPayrollEmployees
        );
    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterPayrollEmployees
        );
    }


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const employeeId =
                    button.dataset.id;

                displayHREmployeeDetails(employeeId);
            }
        );

    });


    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                displayHREmployees();
            }
        );
    }
}


// ======================================================
// PAGE 2
// HR EMPLOYEES MANAGEMENT
// الصورة الثانية
// ======================================================

function displayHREmployees() {

    const content =
        document.getElementById("content");

    if (!content) {
        return;
    }


    content.innerHTML = `

        <div class="main-content hr-employees-page">

            <!-- PAGE HEADER -->

            <div class="payroll-header">

                <div>

                    <p class="small-path">
                        HR WORKSPACE / EMPLOYEES
                    </p>

                    <h1>
                        Employees
                    </h1>

                    <p class="subtitle">
                        View, search and manage all employee accounts.
                    </p>

                </div>


                <button
                    type="button"
                    class="add-employee-btn"
                    id="hrAddEmployeeBtn"
                >
                    <i class="bi bi-plus-lg"></i>
                    Add Employee
                </button>

            </div>


            <!-- EMPLOYEES -->

            <section class="hr-employees-section">

                <div class="hr-employees-heading">

                    <h3>
                        All employees
                    </h3>

                    <span>
                        12 employees
                    </span>

                </div>


                <div class="hr-employees-card">


                    <!-- FILTERS -->

                    <div class="hr-employee-filters">

                        <div class="payroll-search">

                            <i class="bi bi-search"></i>

                            <input
                                type="text"
                                id="hrEmployeeSearch"
                                placeholder="Search by name or email"
                            >

                        </div>


                        <select id="hrEmployeeDepartment">

                            <option value="all">
                                All departments
                            </option>

                            <option value="Engineering">
                                Engineering
                            </option>

                            <option value="Finance">
                                Finance
                            </option>

                            <option value="Marketing">
                                Marketing
                            </option>

                            <option value="Operations">
                                Operations
                            </option>

                            <option value="Human Resources">
                                Human Resources
                            </option>

                        </select>


                        <select id="hrEmployeeStatus">

                            <option value="all">
                                All statuses
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    <!-- TABLE HEADER -->

                    <div class="hr-employee-table-header">

                        <div>EMPLOYEE</div>

                        <div>DEPARTMENT</div>

                        <div>POSITION</div>

                        <div>STATUS</div>

                        <div>ACTIONS</div>

                    </div>


                    <!-- ROW 1 -->

                    ${createHREmployeeManagementRow({
                        id: "lujain",
                        initials: "LO",
                        name: "Lujain Okour",
                        email: "lujain@company.com",
                        department: "Engineering",
                        position: "Front-end Developer",
                        status: "Active"
                    })}


                    <!-- ROW 2 -->

                    ${createHREmployeeManagementRow({
                        id: "haya",
                        initials: "OH",
                        name: "Haya Ahmed",
                        email: "omar@company.com",
                        department: "Finance",
                        position: "Accountant",
                        status: "Active"
                    })}


                    <!-- ROW 3 -->

                    ${createHREmployeeManagementRow({
                        id: "rana",
                        initials: "RS",
                        name: "Rana Saleh",
                        email: "rana.s@company.com",
                        department: "Marketing",
                        position: "Content Specialist",
                        status: "Active"
                    })}


                    <!-- ROW 4 -->

                    ${createHREmployeeManagementRow({
                        id: "khaled",
                        initials: "KN",
                        name: "Khaled Nasser",
                        email: "khaled@company.com",
                        department: "Operations",
                        position: "Operations Coordinator",
                        status: "Inactive"
                    })}


                    <!-- ROW 5 -->

                    ${createHREmployeeManagementRow({
                        id: "dina",
                        initials: "DM",
                        name: "Dina Mansour",
                        email: "dina@company.com",
                        department: "Human Resources",
                        position: "HR Assistant",
                        status: "Active"
                    })}


                    <!-- ROW 6 -->

                    ${createHREmployeeManagementRow({
                        id: "yousef",
                        initials: "YA",
                        name: "Yousef Ali",
                        email: "yousef@company.com",
                        department: "Engineering",
                        position: "Back-end Developer",
                        status: "Active"
                    })}


                    <!-- PAGINATION -->

                    <div class="hr-pagination">

                        <span>
                            Showing 1–6 of 12 employees
                        </span>


                        <div class="pagination-buttons">

                            <button
                                type="button"
                                id="previousEmployeesBtn"
                                disabled
                            >
                                Previous
                            </button>


                            <button
                                type="button"
                                class="active-page"
                            >
                                1
                            </button>


                            <button
                                type="button"
                            >
                                2
                            </button>


                            <button
                                type="button"
                                id="nextEmployeesBtn"
                            >
                                Next
                            </button>

                        </div>

                    </div>


                </div>

            </section>

        </div>

    `;


    setupHREmployees();
}


// ======================================================
// CREATE HR EMPLOYEE MANAGEMENT ROW
// ======================================================

function createHREmployeeManagementRow(employee) {

    const statusClass =
        getHRStatusClass(employee.status);


    return `

        <div
            class="hr-management-row"
            data-name="${employee.name.toLowerCase()} ${employee.email.toLowerCase()}"
            data-department="${employee.department}"
            data-status="${employee.status}"
        >

            <!-- EMPLOYEE -->

            <div class="hr-management-person">

                <div class="payroll-avatar">
                    ${employee.initials}
                </div>


                <div>

                    <strong>
                        ${employee.name}
                    </strong>

                    <span>
                        ${employee.email}
                    </span>

                </div>

            </div>


            <!-- DEPARTMENT -->

            <div>
                ${employee.department}
            </div>


            <!-- POSITION -->

            <div>
                ${employee.position}
            </div>


            <!-- STATUS -->

            <div>

                <span class="payroll-status ${statusClass}">
                    ${employee.status}
                </span>

            </div>


            <!-- ACTIONS -->

            <div class="hr-actions">

                <button
                    type="button"
                    class="hr-view-btn"
                    data-id="${employee.id}"
                >
                    View
                </button>


                <button
                    type="button"
                    class="hr-edit-btn"
                    data-id="${employee.id}"
                    aria-label="Edit employee"
                >
                    <i class="bi bi-pencil"></i>
                </button>


                <button
                    type="button"
                    class="hr-delete-btn"
                    data-id="${employee.id}"
                    aria-label="Delete employee"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>

        </div>

    `;
}


// ======================================================
// SETUP PAGE 2
// ======================================================

function setupHREmployees() {

    const searchInput =
        document.getElementById("hrEmployeeSearch");

    const departmentFilter =
        document.getElementById("hrEmployeeDepartment");

    const statusFilter =
        document.getElementById("hrEmployeeStatus");

    const rows =
        document.querySelectorAll(".hr-management-row");

    const viewButtons =
        document.querySelectorAll(".hr-view-btn");

    const editButtons =
        document.querySelectorAll(".hr-edit-btn");

    const deleteButtons =
        document.querySelectorAll(".hr-delete-btn");

    const addButton =
        document.getElementById("hrAddEmployeeBtn");


    // SEARCH + FILTERS

    function filterEmployees() {

        const searchValue =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const departmentValue =
            departmentFilter
                ? departmentFilter.value
                : "all";

        const statusValue =
            statusFilter
                ? statusFilter.value
                : "all";


        rows.forEach(function (row) {

            const employee =
                row.dataset.name || "";

            const department =
                row.dataset.department || "";

            const status =
                row.dataset.status || "";


            const searchMatch =
                employee.includes(searchValue);

            const departmentMatch =
                departmentValue === "all" ||
                department === departmentValue;

            const statusMatch =
                statusValue === "all" ||
                status === statusValue;


            if (
                searchMatch &&
                departmentMatch &&
                statusMatch
            ) {

                row.style.display = "grid";

            } else {

                row.style.display = "none";

            }

        });
    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterEmployees
        );
    }


    if (departmentFilter) {

        departmentFilter.addEventListener(
            "change",
            filterEmployees
        );
    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterEmployees
        );
    }


    // VIEW

    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const employeeId =
                    button.dataset.id;


                /*
                    بعض أسماء الصورة الثانية ليست موجودة
                    داخل بيانات الرواتب الأساسية.

                    لذلك إذا لم نجد الموظف نعرض Lujain
                    مؤقتاً بدل حدوث Error.
                */

                if (hrEmployeesData[employeeId]) {

                    displayHREmployeeDetails(employeeId);

                } else {

                    displayHREmployeeDetails("lujain");

                }

            }
        );

    });


    // EDIT

    editButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const employeeId =
                    button.dataset.id;

                console.log(
                    "Edit employee:",
                    employeeId
                );

            }
        );

    });


    // DELETE

    deleteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const employeeId =
                    button.dataset.id;

                console.log(
                    "Delete employee:",
                    employeeId
                );

            }
        );

    });


    // ADD

    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Add Employee clicked"
                );

            }
        );

    }

}


// ======================================================
// PAGE 3
// HR EMPLOYEE DETAILS
// الصورة الثالثة
// ======================================================

function displayHREmployeeDetails(employeeId = "lujain") {

    const content =
        document.getElementById("content");

    if (!content) {
        return;
    }


    const employee =
        hrEmployeesData[employeeId] ||
        hrEmployeesData.lujain;


    const statusClass =
        getHRStatusClass(employee.status);


    content.innerHTML = `

        <div class="main-content employee-details-page">

            <!-- PAGE HEADER -->

            <div class="page-top">

                <div>

                    <p class="small-path">
                        HR WORKSPACE / EMPLOYEES / EMPLOYEE DETAILS
                    </p>


                    <h1>
                        Employee Details
                    </h1>


                    <p class="subtitle">
                        View this employee's information and salary details.
                    </p>

                </div>


                <button
                    type="button"
                    class="back-btn"
                    id="backToHREmployees"
                >
                    <i class="bi bi-arrow-left"></i>

                    Back to Employees
                </button>

            </div>


            <!-- EMPLOYEE INFORMATION -->

            <div class="employee-grid">


                <!-- PROFILE -->

                <section class="profile-section">

                    <h3>
                        Profile photo
                    </h3>


                    <div class="profile-card">

                        <div class="profile-avatar">
                            ${employee.initials}
                        </div>


                        <h2>
                            ${employee.name}
                        </h2>


                        <p>
                            ${employee.position}
                        </p>


                        <span class="payroll-status ${statusClass}">
                            ${employee.status}
                        </span>


                        <div class="profile-divider"></div>


                        <button
                            type="button"
                            class="edit-btn"
                            id="editHREmployeeBtn"
                        >
                            Edit Employee
                        </button>

                    </div>

                </section>


                <!-- DETAILS -->

                <section class="details-section">

                    <h3>
                        Employee details
                    </h3>


                    <div class="details-card">


                        <div class="field">

                            <label>
                                Full name
                            </label>

                            <div class="input-look">
                                ${employee.name}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Email address
                            </label>

                            <div class="input-look">
                                ${employee.email}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Phone number
                            </label>

                            <div class="input-look">
                                ${employee.phone}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Job title
                            </label>

                            <div class="input-look">
                                ${employee.position}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Department
                            </label>

                            <div class="input-look">
                                ${employee.department}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Joining date
                            </label>

                            <div class="input-look">
                                ${employee.joined}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Status
                            </label>

                            <div class="input-look">
                                ${employee.status}
                            </div>

                        </div>


                        <div class="field">

                            <label>
                                Role
                            </label>

                            <div class="input-look">
                                ${employee.role}
                            </div>

                        </div>


                    </div>

                </section>

            </div>


            <!-- SALARY DETAILS -->

            <section class="salary-section">

                <div class="salary-heading">

                    <h3>
                        Salary details
                    </h3>


                    <span class="sample-data">
                        Sample data
                    </span>

                </div>


                <div class="salary-card">


                    <p class="salary-note">
                        Visible to HR only. Pay period: October 2026.
                    </p>


                    <!-- SALARY SUMMARY -->

                    <div class="salary-summary">


                        <div class="summary-box">

                            <span>
                                Basic salary
                            </span>

                            <strong>
                                ${formatHRMoney(employee.basic)} JOD
                            </strong>

                        </div>


                        <div class="summary-box">

                            <span>
                                Total incentives
                            </span>

                            <strong>
                                +${formatHRMoney(employee.incentives)} JOD
                            </strong>

                        </div>


                        <div class="summary-box">

                            <span>
                                Total deductions
                            </span>

                            <strong>
                                −${formatHRMoney(employee.deductions)} JOD
                            </strong>

                        </div>


                        <div class="summary-box net">

                            <span>
                                Net salary
                            </span>

                            <strong>
                                ${formatHRMoney(employee.net)} JOD
                            </strong>

                        </div>


                    </div>


                    <p class="formula">
                        Net salary = Basic salary + Incentives − Deductions
                    </p>


                    <!-- INCENTIVES + DEDUCTIONS -->

                    <div class="salary-breakdown">


                        <!-- INCENTIVES -->

                        <div class="salary-breakdown-card">

                            <div class="breakdown-title">

                                <strong>
                                    Incentives
                                </strong>

                                <strong>
                                    ${formatHRMoney(employee.incentives)} JOD
                                </strong>

                            </div>


                            <div class="breakdown-row">

                                <span>
                                    Performance bonus
                                </span>

                                <strong>
                                    +60.00 JOD
                                </strong>

                            </div>


                            <div class="breakdown-row">

                                <span>
                                    Transport allowance
                                </span>

                                <strong>
                                    +40.00 JOD
                                </strong>

                            </div>


                            <div class="breakdown-row">

                                <span>
                                    Attendance bonus
                                </span>

                                <strong>
                                    +25.00 JOD
                                </strong>

                            </div>

                        </div>


                        <!-- DEDUCTIONS -->

                        <div class="salary-breakdown-card">

                            <div class="breakdown-title">

                                <strong>
                                    Deductions
                                </strong>

                                <strong>
                                    ${formatHRMoney(employee.deductions)} JOD
                                </strong>

                            </div>


                            <div class="breakdown-row">

                                <span>
                                    Social security
                                </span>

                                <strong>
                                    −60.00 JOD
                                </strong>

                            </div>


                            <div class="breakdown-row">

                                <span>
                                    Late arrivals
                                </span>

                                <strong>
                                    −15.00 JOD
                                </strong>

                            </div>


                            <div class="breakdown-row">

                                <span>
                                    Unpaid leave
                                </span>

                                <strong>
                                    −20.00 JOD
                                </strong>

                            </div>

                        </div>


                    </div>


                    <!-- PAYMENT INFORMATION -->

                    <div class="payment-info">


                        <div>

                            <span>
                                Pay period
                            </span>

                            <strong>
                                October 2026
                            </strong>

                        </div>


                        <div>

                            <span>
                                Payment date
                            </span>

                            <strong>
                                Oct 28, 2026
                            </strong>

                        </div>


                        <div>

                            <span>
                                Payment status
                            </span>

                            <strong>
                                Pending
                            </strong>

                        </div>


                    </div>


                </div>

            </section>

        </div>

    `;


    setupHREmployeeDetails(employeeId);
}


// ======================================================
// SETUP PAGE 3
// ======================================================

function setupHREmployeeDetails(employeeId) {

    const backButton =
        document.getElementById("backToHREmployees");

    const editButton =
        document.getElementById("editHREmployeeBtn");


    // BACK TO EMPLOYEES MANAGEMENT

    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                displayHREmployees();
            }
        );

    }


    // EDIT

    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Edit HR Employee:",
                    employeeId
                );

            }
        );

    }

}