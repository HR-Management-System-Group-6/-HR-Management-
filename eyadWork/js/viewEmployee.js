/* =========================================================
   HR MANAGEMENT - VIEW EMPLOYEES
   =========================================================
   HR:
   - View employees
   - Search
   - Department filter
   - Status filter
   - Block employee
   - View employee details
   - Pagination
   - Export PDF

   Employee:
   - View own profile
   - Edit profile

   Data:
   localStorage.employees
   localStorage.loggedInUser
   ========================================================= */

function displayViewEmployee() {

    const content = document.getElementById("content");

    if (!content) {
        console.error("Element #content was not found.");
        return;
    }

    let loggedInUser = null;

    try {
        loggedInUser = JSON.parse(
            localStorage.getItem("loggedInUser") || "null"
        );
    } catch (error) {
        console.error("Invalid loggedInUser data:", error);
    }

    const role = String(loggedInUser?.role || "")
        .trim()
        .toLowerCase();


    /* =========================================================
       HR PAGE
       ========================================================= */

    if (role === "hr") {

        let employees = [];

        try {
            employees = JSON.parse(
                localStorage.getItem("employees") || "[]"
            );
        } catch (error) {
            console.error("Invalid employees data:", error);
            employees = [];
        }

        if (!Array.isArray(employees)) {
            employees = [];
        }


        let currentPage = 1;
        const employeesPerPage = 100;

        let searchValue = "";
        let departmentValue = "All departments";
        let statusValue = "All statuses";


        /* =====================================================
           HTML
           ===================================================== */

        content.innerHTML = `

            <section class="content">

                <div class="title-row">

                    <div>

                        <div class="page-label">
                            Employee Management
                        </div>

                        <h1>
                            Employees
                        </h1>

                        <p>
                            Manage employee accounts and access.
                        </p>

                    </div>

                    <div class="header-actions">

                        <button
                            class="export-btn"
                            id="exportEmployeesPdfBtn"
                            type="button"
                        >
                            <i class="bi bi-file-earmark-pdf"></i>
                            Download PDF
                        </button>

                    </div>

                </div>


                <div class="employee-card">

                    <div class="card-header">

                        <h2>
                            All employees
                        </h2>

                        <span
                            class="employee-count"
                            id="employeeCount"
                        >
                            ${employees.length} employees
                        </span>

                    </div>


                    <div class="filters">

                        <div class="search-box">

                            <i class="bi bi-search"></i>

                            <input
                                type="text"
                                id="employeeSearch"
                                placeholder="Search by name or email"
                            >

                        </div>


                        <div class="select-box">

                            <select id="departmentFilter">

                                <option>
                                    All departments
                                </option>

                            </select>

                            <i class="bi bi-chevron-down"></i>

                        </div>


                        <div class="select-box status-select">

                            <select id="statusFilter">

                                <option>
                                    All statuses
                                </option>

                                <option>
                                    Active
                                </option>

                                <option>
                                    Inactive
                                </option>

                                <option>
                                    New
                                </option>

                                <option>
                                    Old
                                </option>

                                <option>
                                    Blocked
                                </option>

                            </select>

                            <i class="bi bi-chevron-down"></i>

                        </div>

                    </div>


                    <div class="table-wrapper">

                        <div class="table-scroll">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            EMPLOYEE
                                        </th>

                                        <th>
                                            DEPARTMENT
                                        </th>

                                        <th>
                                            POSITION
                                        </th>

                                        <th>
                                            STATUS
                                        </th>

                                        <th>
                                            ACTIONS
                                        </th>

                                    </tr>

                                </thead>

                                <tbody
                                    id="employeesTableBody"
                                ></tbody>

                            </table>

                        </div>

                    </div>


                    <div class="pagination-area">

                        <div
                            class="showing"
                            id="showingEmployees"
                        >
                            Showing employees
                        </div>

                        <div
                            class="pagination"
                            id="pagination"
                        ></div>

                    </div>

                </div>

            </section>


            <!-- =================================================
                 EMPLOYEE DETAILS MODAL
                 ================================================= -->

            <div
                class="employee-modal"
                id="employeeDetailsModal"
            >

                <div
                    class="employee-modal-overlay"
                ></div>


                <div
                    class="employee-modal-card"
                >

                    <div
                        class="employee-modal-header"
                    >

                        <div>

                            <span
                                class="modal-small-title"
                            >
                                EMPLOYEE INFORMATION
                            </span>

                            <h2
                                id="modalEmployeeName"
                            >
                                Employee Details
                            </h2>

                        </div>


                        <button
                            class="modal-close"
                            id="closeEmployeeModal"
                            type="button"
                        >

                            <i class="bi bi-x-lg"></i>

                        </button>

                    </div>


                    <div class="modal-profile">

                        <div
                            class="modal-avatar"
                            id="modalEmployeeAvatar"
                        >
                            EM
                        </div>


                        <div>

                            <h3
                                id="modalProfileName"
                            >
                                Employee
                            </h3>

                            <p
                                id="modalProfileJob"
                            >
                                Job Title
                            </p>

                            <span
                                class="modal-status"
                                id="modalProfileStatus"
                            >
                                Active
                            </span>

                        </div>

                    </div>


                    <div class="modal-details-grid">

                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-person"></i>
                                Full name
                            </span>

                            <strong id="detailName">
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-envelope"></i>
                                Email address
                            </span>

                            <strong id="detailEmail">
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-telephone"></i>
                                Phone number
                            </span>

                            <strong id="detailPhone">
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-briefcase"></i>
                                Job title
                            </span>

                            <strong id="detailJobTitle">
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-calendar3"></i>
                                Joining date
                            </span>

                            <strong id="detailJoiningDate">
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-building"></i>
                                Department
                            </span>

                            <strong id="detailDepartment">
                                -
                            </strong>

                        </div>


                        <!-- Date of Birth -->

                    <div class="modal-detail-item">

                        <span class="detail-label">
                            <i class="bi bi-calendar-heart"></i>
                            Date of Birth
                        </span>

                        <strong id="detailDateOfBirth">
                            -
                        </strong>

                    </div>


                    <!-- Gender -->

                    <div class="modal-detail-item">

                        <span class="detail-label">
                            <i class="bi bi-gender-ambiguous"></i>
                            Gender
                        </span>

                        <strong id="detailGender">
                            -
                        </strong>

                    </div>


                    <!-- Address -->

                    <div class="modal-detail-item">

                        <span class="detail-label">
                            <i class="bi bi-geo-alt"></i>
                            Address
                        </span>

                        <strong id="detailAddress">
                            -
                        </strong>

                    </div>


                    <!-- Salary -->

                    <div class="modal-detail-item">

                        <span class="detail-label">
                            <i class="bi bi-cash-stack"></i>
                            Salary
                        </span>

                        <strong id="detailSalary">
                            -
                        </strong>

                    </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-people"></i>
                                Role
                            </span>

                            <strong id="detailRole">
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span class="detail-label">
                                <i class="bi bi-circle"></i>
                                Status
                            </span>

                            <strong id="detailStatus">
                                -
                            </strong>

                        </div>

                    </div>


                    <div class="employee-modal-footer">

                        <button
                            class="modal-footer-btn"
                            id="modalCloseBtn"
                            type="button"
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

            <div
    class="employee-modal"
    id="editEmployeeModal"
>

    <div
        class="employee-modal-overlay"
        id="editEmployeeOverlay"
    ></div>


    <div
        class="employee-modal-card edit-modal-card"
    >

        <div
            class="employee-modal-header"
        >

            <div>

                <span class="modal-small-title">
                    EMPLOYEE MANAGEMENT
                </span>

                <h2>
                    Edit Employee
                </h2>

            </div>


            <button
                class="modal-close"
                id="closeEditModal"
                type="button"
            >
                <i class="bi bi-x-lg"></i>
            </button>

        </div>


        <form id="editEmployeeForm">

            <input
                type="hidden"
                id="editEmployeeId"
            >


            <div class="edit-form-grid">

                <div class="edit-form-group">

                    <label for="editName">
                        <i class="bi bi-person"></i>
                        Full name
                    </label>

                    <input
                        type="text"
                        id="editName"
                        required
                    >

                </div>


                <div class="edit-form-group">

                    <label for="editEmail">
                        <i class="bi bi-envelope"></i>
                        Email address
                    </label>

                    <input
                        type="email"
                        id="editEmail"
                        required
                    >

                </div>


                <div class="edit-form-group">

                    <label for="editPhone">
                        <i class="bi bi-telephone"></i>
                        Phone number
                    </label>

                    <input
                        type="text"
                        id="editPhone"
                    >

                </div>


                <div class="edit-form-group">

                    <label for="editJobTitle">
                        <i class="bi bi-briefcase"></i>
                        Job title
                    </label>

                    <input
                        type="text"
                        id="editJobTitle"
                    >

                </div>


                <div class="edit-form-group">

                    <label for="editJoiningDate">
                        <i class="bi bi-calendar3"></i>
                        Joining date
                    </label>

                    <input
                        type="date"
                        id="editJoiningDate"
                    >

                </div>


                <div class="edit-form-group">

                    <label for="editDepartment">
                        <i class="bi bi-building"></i>
                        Department
                    </label>

                    <input
                        type="text"
                        id="editDepartment"
                    >

                </div>


                <div class="edit-form-group">

                <label for="editDateOfBirth">
                    <i class="bi bi-calendar-heart"></i>
                    Date of Birth
                </label>

                <input
                    type="date"
                    id="editDateOfBirth"
                >

            </div>


            <div class="edit-form-group">

                <label for="editGender">
                    <i class="bi bi-gender-ambiguous"></i>
                    Gender
                </label>

                <select id="editGender">

                    <option value="">
                        Select Gender
                    </option>

                    <option value="Male">
                        Male
                    </option>

                    <option value="Female">
                        Female
                    </option>

                </select>

            </div>


            <div class="edit-form-group">

                <label for="editAddress">
                    <i class="bi bi-geo-alt"></i>
                    Address
                </label>

                <input
                    type="text"
                    id="editAddress"
                    placeholder="Enter address"
                >

            </div>


            <div class="edit-form-group">

                <label for="editSalary">
                    <i class="bi bi-cash-stack"></i>
                    Salary
                </label>

                <input
                    type="number"
                    id="editSalary"
                    min="0"
                    step="0.01"
                    placeholder="Enter salary"
                >

            </div>


                <div class="edit-form-group">

                    <label for="editRole">
                        <i class="bi bi-people"></i>
                        Role
                    </label>

                    <select id="editRole">

                        <option value="employee">
                            Employee
                        </option>

                        <option value="hr">
                            HR
                        </option>

                    </select>

                </div>


                <div class="edit-form-group">

                    <label for="editStatus">
                        <i class="bi bi-circle"></i>
                        Status
                    </label>

                    <select id="editStatus">

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                        <option value="New">
                            New
                        </option>

                        <option value="Blocked">
                            Blocked
                        </option>

                    </select>

                </div>

            </div>


            <div
                class="employee-modal-footer edit-modal-footer"
            >

                <button
                    class="modal-footer-btn"
                    id="cancelEditBtn"
                    type="button"
                >
                    Cancel
                </button>


                <button
                    class="save-edit-btn"
                    type="submit"
                >
                    <i class="bi bi-check2"></i>
                    Save Changes
                </button>

            </div>

        </form>

    </div>

</div>

        `;


        /* =====================================================
           ELEMENTS
           ===================================================== */

        const tableBody =
            document.getElementById(
                "employeesTableBody"
            );

        const pagination =
            document.getElementById(
                "pagination"
            );

        const employeeCount =
            document.getElementById(
                "employeeCount"
            );

        const showingEmployees =
            document.getElementById(
                "showingEmployees"
            );

        const searchInput =
            document.getElementById(
                "employeeSearch"
            );

        const departmentFilter =
            document.getElementById(
                "departmentFilter"
            );

        const statusFilter =
            document.getElementById(
                "statusFilter"
            );


        /* =====================================================
           DEPARTMENT OPTIONS
           ===================================================== */

        function createDepartmentOptions() {

            const departments = [
                ...new Set(
                    employees
                        .map(employee =>
                            employee?.department
                        )
                        .filter(Boolean)
                        .map(department =>
                            String(department).trim()
                        )
                        .filter(Boolean)
                )
            ].sort((a, b) =>
                a.localeCompare(b)
            );


            departmentFilter.innerHTML = `
                <option>
                    All departments
                </option>
            `;


            departments.forEach(
                department => {

                    departmentFilter.insertAdjacentHTML(
                        "beforeend",
                        `
                            <option>
                                ${escapeHTML(department)}
                            </option>
                        `
                    );

                }
            );

        }


        /* =====================================================
           FILTER
           ===================================================== */

        function getFilteredEmployees() {

            const search =
                searchValue.toLowerCase();


            return employees.filter(
                employee => {

                    const name =
                        String(
                            employee?.name || ""
                        ).toLowerCase();


                    const email =
                        String(
                            employee?.email || ""
                        ).toLowerCase();


                    const department =
                        String(
                            employee?.department || ""
                        );


                    const status =
                        String(
                            employee?.status ||
                            "Inactive"
                        );


                    const matchesSearch =
                        name.includes(search) ||
                        email.includes(search);


                    const matchesDepartment =
                        departmentValue ===
                            "All departments" ||
                        department ===
                            departmentValue;


                    const matchesStatus =
                        statusValue ===
                            "All statuses" ||
                        status.toLowerCase() ===
                            statusValue.toLowerCase();


                    return (
                        matchesSearch &&
                        matchesDepartment &&
                        matchesStatus
                    );

                }
            );

        }


        /* =====================================================
           RENDER EMPLOYEES
           ===================================================== */

        function renderEmployees() {

            const filteredEmployees =
                getFilteredEmployees();


            employeeCount.textContent =
                `${filteredEmployees.length} employees`;


            const totalPages =
                Math.ceil(
                    filteredEmployees.length /
                    employeesPerPage
                );


            if (totalPages === 0) {

                currentPage = 1;

            } else if (
                currentPage > totalPages
            ) {

                currentPage = totalPages;

            }


            const startIndex =
                (currentPage - 1) *
                employeesPerPage;


            const endIndex =
                startIndex +
                employeesPerPage;


            const currentEmployees =
                filteredEmployees.slice(
                    startIndex,
                    endIndex
                );


            if (
                currentEmployees.length === 0
            ) {

                tableBody.innerHTML = `

                    <tr>

                        <td colspan="5">

                            <div class="empty-employees">

                                <i class="bi bi-people"></i>

                                <span>
                                    No employees found.
                                </span>

                            </div>

                        </td>

                    </tr>

                `;

            } else {

                tableBody.innerHTML =
                    currentEmployees
                        .map(employee => {

                            const status =
                                String(
                                    employee?.status ||
                                    "Inactive"
                                );


                            const normalizedStatus =
                                status.toLowerCase();


                            let statusClass =
                                "inactive";


                            if (
                                normalizedStatus ===
                                "active"
                            ) {

                                statusClass =
                                    "active";

                            } else if (
                                normalizedStatus ===
                                "blocked"
                            ) {

                                statusClass =
                                    "blocked";

                            } else if (
                                normalizedStatus ===
                                "new"
                            ) {

                                statusClass =
                                    "new";

                            }


                            const isBlocked =
                                normalizedStatus ===
                                "blocked";


                            return `

                                <tr
                                    class="${
                                        isBlocked
                                            ? "blocked-row"
                                            : ""
                                    }"
                                >

                                    <td>

                                        <div
                                            class="employee-info"
                                        >

                                            <div
                                                class="employee-avatar"
                                            >
                                                ${escapeHTML(
                                                    getInitials(
                                                        employee?.name
                                                    )
                                                )}
                                            </div>


                                            <div>

                                                <strong>
                                                    ${escapeHTML(
                                                        employee?.name ||
                                                        "Unknown Employee"
                                                    )}
                                                </strong>

                                                <span>
                                                    ${escapeHTML(
                                                        employee?.email ||
                                                        "-"
                                                    )}
                                                </span>

                                            </div>

                                        </div>

                                    </td>


                                    <td>
                                        ${escapeHTML(
                                            employee?.department ||
                                            "-"
                                        )}
                                    </td>


                                    <td>
                                        ${escapeHTML(
                                            employee?.jobTitle ||
                                            "-"
                                        )}
                                    </td>


                                    <td>

                                        <span
                                            class="status ${statusClass}"
                                        >

                                            <span
                                                class="status-dot"
                                            ></span>

                                            ${escapeHTML(status)}

                                        </span>

                                    </td>


                                                <td>

                                                    <div class="actions">

                                                        <!-- VIEW -->
                                                        <button
                                                            class="view-btn"
                                                            type="button"
                                                            data-action="view"
                                                            data-id="${escapeHTML(
                                                                employee?.id ?? ""
                                                            )}"
                                                        >
                                                            <i class="bi bi-eye"></i>
                                                            View
                                                        </button>


                                                        <!-- EDIT -->
                                                        <button
                                                            class="icon-btn edit"
                                                            type="button"
                                                            data-action="edit"
                                                            data-id="${escapeHTML(
                                                                employee?.id ?? ""
                                                            )}"
                                                            title="Edit employee"
                                                        >
                                                            <i class="bi bi-pencil"></i>
                                                        </button>


                                                        <!-- BLOCK / UNBLOCK -->
                                                        ${
                                                            isBlocked
                                                                ? `
                                                                    <button
                                                                        class="icon-btn unblock"
                                                                        type="button"
                                                                        data-action="unblock"
                                                                        data-id="${escapeHTML(
                                                                            employee?.id ?? ""
                                                                        )}"
                                                                        title="Unblock employee"
                                                                    >
                                                                        <i class="bi bi-unlock"></i>
                                                                    </button>
                                                                `
                                                                : `
                                                                    <button
                                                                        class="icon-btn block"
                                                                        type="button"
                                                                        data-action="block"
                                                                        data-id="${escapeHTML(
                                                                            employee?.id ?? ""
                                                                        )}"
                                                                        title="Block employee"
                                                                    >
                                                                        <i class="bi bi-person-slash"></i>
                                                                    </button>
                                                                `
                                                        }

                                                    </div>

                                                </td>

                                </tr>

                            `;

                        })
                        .join("");

            }


            if (
                filteredEmployees.length === 0
            ) {

                showingEmployees.textContent =
                    "Showing 0 employees";

            } else {

                const showingStart =
                    startIndex + 1;


                const showingEnd =
                    Math.min(
                        endIndex,
                        filteredEmployees.length
                    );


                showingEmployees.textContent =
                    `Showing ${showingStart}–${showingEnd} of ${filteredEmployees.length} employees`;

            }


            renderPagination(totalPages);

        }


        /* =====================================================
           PAGINATION
           ===================================================== */

        function renderPagination(totalPages) {

            pagination.innerHTML = "";


            if (totalPages <= 1) {
                return;
            }


            const previousButton =
                document.createElement(
                    "button"
                );

            previousButton.className =
                "page-btn previous";

            previousButton.type =
                "button";

            previousButton.textContent =
                "Previous";

            previousButton.disabled =
                currentPage === 1;


            previousButton.addEventListener(
                "click",
                function () {

                    if (currentPage > 1) {

                        currentPage--;

                        renderEmployees();

                    }

                }
            );


            pagination.appendChild(
                previousButton
            );


            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {

                const pageButton =
                    document.createElement(
                        "button"
                    );

                pageButton.className =
                    "page-number";

                pageButton.type =
                    "button";

                pageButton.textContent =
                    page;


                if (
                    page === currentPage
                ) {

                    pageButton.classList.add(
                        "active-page"
                    );

                }


                pageButton.addEventListener(
                    "click",
                    function () {

                        currentPage =
                            page;

                        renderEmployees();

                    }
                );


                pagination.appendChild(
                    pageButton
                );

            }


            const nextButton =
                document.createElement(
                    "button"
                );

            nextButton.className =
                "page-btn";

            nextButton.type =
                "button";

            nextButton.textContent =
                "Next";

            nextButton.disabled =
                currentPage === totalPages;


            nextButton.addEventListener(
                "click",
                function () {

                    if (
                        currentPage <
                        totalPages
                    ) {

                        currentPage++;

                        renderEmployees();

                    }

                }
            );


            pagination.appendChild(
                nextButton
            );

        }


        /* =====================================================
           VIEW EMPLOYEE
           ===================================================== */

        function viewEmployee(employeeId) {

            const employee =
                employees.find(
                    item =>
                        String(item?.id) ===
                        String(employeeId)
                );


            if (!employee) {
                return;
            }


            const modal =
                document.getElementById(
                    "employeeDetailsModal"
                );


            const status =
                String(
                    employee?.status ||
                    "Inactive"
                );


            const normalizedStatus =
                status.toLowerCase();


            let statusClass =
                "inactive";


            if (
                normalizedStatus ===
                "active"
            ) {

                statusClass =
                    "active";

            } else if (
                normalizedStatus ===
                "blocked"
            ) {

                statusClass =
                    "blocked";

            } else if (
                normalizedStatus ===
                "new"
            ) {

                statusClass =
                    "new";

            }


            document.getElementById(
                "modalEmployeeName"
            ).textContent =
                employee?.name ||
                "Employee Details";


            document.getElementById(
                "modalProfileName"
            ).textContent =
                employee?.name ||
                "Employee";


            document.getElementById(
                "modalProfileJob"
            ).textContent =
                employee?.jobTitle ||
                "Employee";


            document.getElementById(
                "modalEmployeeAvatar"
            ).textContent =
                getInitials(
                    employee?.name
                );


            const modalStatus =
                document.getElementById(
                    "modalProfileStatus"
                );


            modalStatus.textContent =
                status;


            modalStatus.className =
                `modal-status ${statusClass}`;


            document.getElementById(
                "detailName"
            ).textContent =
                employee?.name || "-";


            document.getElementById(
                "detailEmail"
            ).textContent =
                employee?.email || "-";


            document.getElementById(
                "detailPhone"
            ).textContent =
                employee?.phone || "-";


            document.getElementById(
                "detailJobTitle"
            ).textContent =
                employee?.jobTitle || "-";


            document.getElementById(
                "detailJoiningDate"
            ).textContent =
                formatDate(
                    employee?.joiningDate
                );


            document.getElementById(
                "detailDepartment"
            ).textContent =
                employee?.department || "-";

                // Date of Birth
            document.getElementById(
                "detailDateOfBirth"
            ).textContent =
                formatDate(
                    employee?.dateOfBirth
                );


            // Gender
            document.getElementById(
                "detailGender"
            ).textContent =
                employee?.gender || "-";


            // Address
            document.getElementById(
                "detailAddress"
            ).textContent =
                employee?.address || "-";


            // Salary
            document.getElementById(
                "detailSalary"
            ).textContent =
                employee?.salary !== undefined &&
                employee?.salary !== null &&
                employee?.salary !== ""
                    ? `${Number(employee.salary).toLocaleString()}`
                    : "-";


            document.getElementById(
                "detailRole"
            ).textContent =
                formatRole(
                    employee?.role
                );


            const detailStatus =
                document.getElementById(
                    "detailStatus"
                );


            detailStatus.textContent =
                status;


            detailStatus.className =
                `detail-status-text ${statusClass}`;


            modal.classList.add("show");

            document.body.classList.add(
                "modal-open"
            );

        }


        /* =====================================================
           CLOSE MODAL
           ===================================================== */

        function closeEmployeeModal() {

            const modal =
                document.getElementById(
                    "employeeDetailsModal"
                );


            if (!modal) {
                return;
            }


            modal.classList.remove(
                "show"
            );


            document.body.classList.remove(
                "modal-open"
            );

        }


        /* =====================================================
   EDIT EMPLOYEE
   ===================================================== */

function openEditEmployee(employeeId) {

    const employee =
        employees.find(
            item =>
                String(item?.id) ===
                String(employeeId)
        );


    if (!employee) {
        return;
    }


    document.getElementById(
        "editEmployeeId"
    ).value =
        employee?.id ?? "";


    document.getElementById(
        "editName"
    ).value =
        employee?.name ?? "";


    document.getElementById(
        "editEmail"
    ).value =
        employee?.email ?? "";


    document.getElementById(
        "editPhone"
    ).value =
        employee?.phone ?? "";


    document.getElementById(
        "editJobTitle"
    ).value =
        employee?.jobTitle ?? "";


    document.getElementById(
        "editJoiningDate"
    ).value =
        normalizeDateForInput(
            employee?.joiningDate
        );


    document.getElementById(
        "editDepartment"
    ).value =
        employee?.department ?? "";

        document.getElementById(
    "editDateOfBirth"
).value =
    normalizeDateForInput(
        employee?.dateOfBirth
    );


document.getElementById(
    "editGender"
).value =
    employee?.gender ?? "";


document.getElementById(
    "editAddress"
).value =
    employee?.address ?? "";


document.getElementById(
    "editSalary"
).value =
    employee?.salary ?? "";


    document.getElementById(
        "editRole"
    ).value =
        String(
            employee?.role ||
            "employee"
        ).toLowerCase();


    document.getElementById(
        "editStatus"
    ).value =
        employee?.status ||
        "Active";


    const modal =
        document.getElementById(
            "editEmployeeModal"
        );


    modal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );

}


/* =====================================================
   CLOSE EDIT MODAL
   ===================================================== */

function closeEditEmployeeModal() {

    const modal =
        document.getElementById(
            "editEmployeeModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =====================================================
   DATE FOR INPUT
   ===================================================== */

function normalizeDateForInput(value) {

    if (!value) {
        return "";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(value)
            .slice(0, 10);

    }


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/* =====================================================
   SAVE EMPLOYEE CHANGES
   ===================================================== */

function saveEmployeeChanges(event) {

    event.preventDefault();


    const employeeId =
        document.getElementById(
            "editEmployeeId"
        ).value;


    const employee =
        employees.find(
            item =>
                String(item?.id) ===
                String(employeeId)
        );


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;

    }


    const name =
        document.getElementById(
            "editName"
        ).value.trim();


    const email =
        document.getElementById(
            "editEmail"
        ).value.trim();


    const phone =
        document.getElementById(
            "editPhone"
        ).value.trim();


    const jobTitle =
        document.getElementById(
            "editJobTitle"
        ).value.trim();


    const joiningDate =
        document.getElementById(
            "editJoiningDate"
        ).value;


    const department =
        document.getElementById(
            "editDepartment"
        ).value.trim();

        const dateOfBirth =
    document.getElementById(
        "editDateOfBirth"
    ).value;


const gender =
    document.getElementById(
        "editGender"
    ).value;


const address =
    document.getElementById(
        "editAddress"
    ).value.trim();


const salary =
    document.getElementById(
        "editSalary"
    ).value;


    const role =
        document.getElementById(
            "editRole"
        ).value;


    const status =
        document.getElementById(
            "editStatus"
        ).value;


    if (
        !name ||
        !email
    ) {

        alert(
            "Name and email are required."
        );

        return;

    }


    /* Update employee */

    employee.name =
        name;

    employee.email =
        email;

    employee.phone =
        phone;

    employee.jobTitle =
        jobTitle;

    employee.joiningDate =
        joiningDate;

    employee.department =
        department;

employee.dateOfBirth =
    dateOfBirth;

employee.gender =
    gender;

employee.address =
    address;

employee.salary =
    salary === ""
        ? ""
        : Number(salary);


    employee.role =
        role;

    employee.status =
        status;


    /* Save to localStorage */

    localStorage.setItem(
        "employees",
        JSON.stringify(
            employees
        )
    );


    /* Refresh department filter */

    createDepartmentOptions();


    /* Refresh table */

    currentPage = 1;

    renderEmployees();


    /* Close modal */

    closeEditEmployeeModal();


    alert(
        `${employee.name} has been updated successfully.`
    );

}


        /* =====================================================
           BLOCK EMPLOYEE
           ===================================================== */

        function blockEmployee(employeeId) {

            const employee =
                employees.find(
                    item =>
                        String(item?.id) ===
                        String(employeeId)
                );


            if (!employee) {
                return;
            }


            if (
                String(employee.status || "")
                    .toLowerCase() ===
                "blocked"
            ) {
                return;
            }


            const confirmed =
                confirm(
                    `Are you sure you want to block ${employee.name || "this employee"}?\n\nThis employee will no longer be able to log in.`
                );


            if (!confirmed) {
                return;
            }


            employee.status =
                "Blocked";


            localStorage.setItem(
                "employees",
                JSON.stringify(employees)
            );


            renderEmployees();


            alert(
                `${employee.name || "Employee"} has been blocked successfully.`
            );

        }


        /* =====================================================
           UNBLOCK EMPLOYEE
           ===================================================== */

        function unblockEmployee(employeeId) {

            const employee =
                employees.find(
                    item =>
                        String(item?.id) ===
                        String(employeeId)
                );


            if (!employee) {
                return;
            }


            const confirmed =
                confirm(
                    `Do you want to unblock ${employee.name || "this employee"}?`
                );


            if (!confirmed) {
                return;
            }


            employee.status =
                "Active";


            localStorage.setItem(
                "employees",
                JSON.stringify(employees)
            );


            renderEmployees();


            alert(
                `${employee.name || "Employee"} has been unblocked.`
            );

        }


        /* =====================================================
           TABLE ACTIONS
           ===================================================== */

        tableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "button"
                    );


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.action;


                const id =
                    button.dataset.id;


                if (
                    action === "view"
                ) {

                    viewEmployee(id);

                    return;
                }

                if (
                action === "edit"
            ) {

                openEditEmployee(id);

                return;
            }


                if (
                    action === "block"
                ) {

                    blockEmployee(id);

                    return;
                }


                if (
                    action === "unblock"
                ) {

                    unblockEmployee(id);

                    return;
                }

            }
        );


        /* =====================================================
           SEARCH
           ===================================================== */

        searchInput.addEventListener(
            "input",
            function () {

                searchValue =
                    this.value.trim();

                currentPage = 1;

                renderEmployees();

            }
        );


        /* =====================================================
           DEPARTMENT FILTER
           ===================================================== */

        departmentFilter.addEventListener(
            "change",
            function () {

                departmentValue =
                    this.value;

                currentPage = 1;

                renderEmployees();

            }
        );


        /* =====================================================
           STATUS FILTER
           ===================================================== */

        statusFilter.addEventListener(
            "change",
            function () {

                statusValue =
                    this.value;

                currentPage = 1;

                renderEmployees();

            }
        );


        /* =====================================================
           MODAL EVENTS
           ===================================================== */

        document
            .getElementById(
                "closeEmployeeModal"
            )
            .addEventListener(
                "click",
                closeEmployeeModal
            );


        document
            .getElementById(
                "modalCloseBtn"
            )
            .addEventListener(
                "click",
                closeEmployeeModal
            );


        document
            .querySelector(
                ".employee-modal-overlay"
            )
            .addEventListener(
                "click",
                closeEmployeeModal
            );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    const modal =
                        document.getElementById(
                            "employeeDetailsModal"
                        );


                    if (
                        modal &&
                        modal.classList.contains(
                            "show"
                        )
                    ) {

                        closeEmployeeModal();

                    }

                }

            }
        );


        /* =====================================================
   EDIT MODAL EVENTS
   ===================================================== */

document
    .getElementById(
        "editEmployeeForm"
    )
    .addEventListener(
        "submit",
        saveEmployeeChanges
    );


document
    .getElementById(
        "closeEditModal"
    )
    .addEventListener(
        "click",
        closeEditEmployeeModal
    );


document
    .getElementById(
        "cancelEditBtn"
    )
    .addEventListener(
        "click",
        closeEditEmployeeModal
    );


document
    .getElementById(
        "editEmployeeOverlay"
    )
    .addEventListener(
        "click",
        closeEditEmployeeModal
    );

        /* =====================================================
           PDF
           ===================================================== */

        async function loadPdfLibraries() {

            if (!window.jspdf) {

                await new Promise(
                    (resolve, reject) => {

                        const script =
                            document.createElement(
                                "script"
                            );


                        script.src =
                            "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";


                        script.onload =
                            resolve;

                        script.onerror =
                            reject;


                        document.head.appendChild(
                            script
                        );

                    }
                );

            }


            if (
                window.jspdf &&
                !window.jspdf.jsPDF.prototype.autoTable
            ) {

                await new Promise(
                    (resolve, reject) => {

                        const script =
                            document.createElement(
                                "script"
                            );


                        script.src =
                            "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.4/jspdf.plugin.autotable.min.js";


                        script.onload =
                            resolve;

                        script.onerror =
                            reject;


                        document.head.appendChild(
                            script
                        );

                    }
                );

            }

        }


        async function exportEmployeesToPDF() {

            const button =
                document.getElementById(
                    "exportEmployeesPdfBtn"
                );


            try {

                if (button) {

                    button.disabled =
                        true;

                    button.innerHTML = `
                        <i class="bi bi-hourglass-split"></i>
                        Generating...
                    `;

                }


                await loadPdfLibraries();


                const allEmployees =
                    JSON.parse(
                        localStorage.getItem(
                            "employees"
                        ) || "[]"
                    );


                if (
                    !Array.isArray(allEmployees) ||
                    allEmployees.length === 0
                ) {

                    alert(
                        "There are no employees to export."
                    );

                    return;
                }


                const {
                    jsPDF
                } = window.jspdf;


                const doc =
                    new jsPDF({
                        orientation: "landscape",
                        unit: "mm",
                        format: "a4"
                    });


                doc.setFontSize(20);

                doc.setTextColor(
                    15,
                    39,
                    66
                );

                doc.setFont(
                    "helvetica",
                    "bold"
                );

                doc.text(
                    "HR Management - Employees",
                    14,
                    18
                );


                doc.setFontSize(10);

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                doc.setTextColor(
                    100,
                    116,
                    139
                );


                doc.text(
                    `Total Employees: ${allEmployees.length}`,
                    14,
                    26
                );


                doc.text(
                    `Generated: ${new Date().toLocaleDateString("en-GB")}`,
                    14,
                    32
                );


                const tableData =
                    allEmployees.map(
                        employee => [

                            employee?.name || "-",

                            employee?.email || "-",

                            employee?.phone || "-",

                            employee?.jobTitle || "-",

                            employee?.department || "-",

                            formatRole(
                                employee?.role
                            ),

                            formatDate(
                                employee?.joiningDate
                            ),

                            employee?.status || "Inactive"

                        ]
                    );


                doc.autoTable({

                    startY: 39,

                    head: [[
                        "Employee",
                        "Email",
                        "Phone",
                        "Job Title",
                        "Department",
                        "Role",
                        "Joining Date",
                        "Status"
                    ]],

                    body: tableData,

                    theme: "grid",

                    styles: {
                        font: "helvetica",
                        fontSize: 8,
                        cellPadding: 3,
                        textColor: [
                            55,
                            65,
                            81
                        ]
                    },

                    headStyles: {
                        fillColor: [
                            37,
                            99,
                            235
                        ],
                        textColor: [
                            255,
                            255,
                            255
                        ],
                        fontStyle: "bold"
                    },

                    alternateRowStyles: {
                        fillColor: [
                            248,
                            250,
                            252
                        ]
                    },

                    margin: {
                        left: 14,
                        right: 14
                    }

                });


                doc.save(
                    "HR_Employees.pdf"
                );

            } catch (error) {

                console.error(
                    "PDF generation error:",
                    error
                );

                alert(
                    "Unable to generate PDF."
                );

            } finally {

                if (button) {

                    button.disabled =
                        false;

                    button.innerHTML = `
                        <i class="bi bi-file-earmark-pdf"></i>
                        Download PDF
                    `;

                }

            }

        }


        const exportButton =
            document.getElementById(
                "exportEmployeesPdfBtn"
            );


        if (exportButton) {

            exportButton.addEventListener(
                "click",
                exportEmployeesToPDF
            );

        }


        /* =====================================================
           INITIALIZE
           ===================================================== */

        createDepartmentOptions();

        renderEmployees();

        return;

    }


    /* =========================================================
       EMPLOYEE PAGE
       ========================================================= */

    if (role === "employee") {

        const employee =
            loggedInUser || {};


        const employeeName =
            employee.name ||
            "Employee";


        const employeeEmail =
            employee.email ||
            "-";


        const employeePhone =
            employee.phone ||
            "-";


        const employeeJobTitle =
            employee.jobTitle ||
            "Employee";


        const employeeDepartment =
            employee.department ||
            "-";


            const employeeDateOfBirth =
            formatDate(
                employee.dateOfBirth
            );

        const employeeGender =
            employee.gender || "-";

        const employeeAddress =
            employee.address || "-";

        const employeeSalary =
            employee.salary !== undefined &&
            employee.salary !== null &&
            employee.salary !== ""
                ? Number(employee.salary).toLocaleString()
                : "-";


        const employeeJoiningDate =
            formatDate(
                employee.joiningDate
            );


        const employeeRole =
            formatRole(
                employee.role
            );


        const employeeStatus =
            employee.status ||
            "Active";


        const normalizedStatus =
            String(
                employeeStatus
            ).toLowerCase();


        let statusClass =
            "inactive";


        if (
            normalizedStatus ===
            "active"
        ) {

            statusClass =
                "active";

        } else if (
            normalizedStatus ===
            "blocked"
        ) {

            statusClass =
                "blocked";

        }


        content.innerHTML = `

            <section
                class="content employee-page"
            >

                <div
                    class="employee-page-header"
                >

                    <div>

                        <div class="page-label">
                            My Workspace
                        </div>

                        <h1>
                            Employee Details
                        </h1>

                        <p>
                            View your employee information.
                        </p>

                    </div>

                </div>


                <div
                    class="employee-profile-card"
                >

                    <div
                        class="employee-profile-top"
                    >

                        <div
                            class="large-profile-avatar"
                        >
                            ${escapeHTML(
                                getInitials(
                                    employeeName
                                )
                            )}
                        </div>


                        <div>

                            <h2>
                                ${escapeHTML(
                                    employeeName
                                )}
                            </h2>

                            <p>
                                ${escapeHTML(
                                    employeeJobTitle
                                )}
                            </p>

                            <span
                                class="modal-status ${statusClass}"
                            >
                                ${escapeHTML(
                                    employeeStatus
                                )}
                            </span>

                        </div>

                    </div>


                    <div
                        class="employee-profile-grid"
                    >

                        <div class="profile-field">

                            <span>
                                <i class="bi bi-person"></i>
                                Full Name
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeeName
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-envelope"></i>
                                Email
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeeEmail
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-telephone"></i>
                                Phone
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeePhone
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-briefcase"></i>
                                Job Title
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeeJobTitle
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-building"></i>
                                Department
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeeDepartment
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                        <span>
                            <i class="bi bi-calendar-heart"></i>
                            Date of Birth
                        </span>

                        <strong>
                            ${escapeHTML(
                                employeeDateOfBirth
                            )}
                        </strong>

                    </div>


                    <div class="profile-field">

                        <span>
                            <i class="bi bi-gender-ambiguous"></i>
                            Gender
                        </span>

                        <strong>
                            ${escapeHTML(
                                employeeGender
                            )}
                        </strong>

                    </div>


                    <div class="profile-field">

                        <span>
                            <i class="bi bi-geo-alt"></i>
                            Address
                        </span>

                        <strong>
                            ${escapeHTML(
                                employeeAddress
                            )}
                        </strong>

                    </div>


                    <div class="profile-field">

                        <span>
                            <i class="bi bi-cash-stack"></i>
                            Salary
                        </span>

                        <strong>
                            ${escapeHTML(
                                employeeSalary
                            )}
                        </strong>

                    </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-people"></i>
                                Role
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeeRole
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-calendar"></i>
                                Joining Date
                            </span>

                            <strong>
                                ${escapeHTML(
                                    employeeJoiningDate
                                )}
                            </strong>

                        </div>


                        <div class="profile-field">

                            <span>
                                <i class="bi bi-shield-check"></i>
                                Account Status
                            </span>

                            <strong
                                class="${statusClass}"
                            >
                                ${escapeHTML(
                                    employeeStatus
                                )}
                            </strong>

                        </div>

                    </div>




                </div>

            </section>

        `;


        const editProfileBtn =
            document.getElementById(
                "employeeEditProfileBtn"
            );


        if (editProfileBtn) {

            editProfileBtn.addEventListener(
                "click",
                function () {

                    if (
                        employee.id !==
                            undefined &&
                        employee.id !==
                            null
                    ) {

                        localStorage.setItem(
                            "editingEmployeeId",
                            String(
                                employee.id
                            )
                        );

                    }


                    window.location.href =
                        "addEmployee.html";

                }
            );

        }


        return;
    }


    /* =========================================================
       UNKNOWN ROLE
       ========================================================= */

    content.innerHTML = `

        <section class="content">

            <div class="error-card">

                <i
                    class="bi bi-person-exclamation"
                ></i>

                <h2>
                    Unable to load employee page
                </h2>

                <p>
                    Please log in again and try again.
                </p>

            </div>

        </section>

    `;

}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


function getInitials(name) {

    const value =
        String(
            name || ""
        ).trim();


    if (!value) {
        return "EM";
    }


    const parts =
        value
            .split(/\s+/)
            .filter(Boolean);


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


function formatDate(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(value);

    }


    return date.toLocaleDateString(
        "en-GB"
    );

}


function formatRole(role) {

    if (!role) {
        return "-";
    }


    const value =
        String(role);


    return value.charAt(0).toUpperCase() +
        value.slice(1).toLowerCase();

}