/* =========================================================
   HR MANAGEMENT - VIEW EMPLOYEE
   ---------------------------------------------------------
   Supports:
   1. HR role      -> employee table, search, filters,
                      pagination, view, delete and PDF export.
   2. Employee role -> modern employee profile/details page.

   Data source:
       localStorage.loggedInUser
       localStorage.employees
   ========================================================= */

function displayViewEmployee() {

    const content = document.getElementById("content");

    if (!content) {
        console.error("Element #content was not found.");
        return;
    }


    /* ---------------------------------------------------------
       Read logged-in user safely
    --------------------------------------------------------- */

    let loggedInUser = null;

    try {

        loggedInUser = JSON.parse(
            localStorage.getItem("loggedInUser") || "null"
        );

    } catch (error) {

        console.error(
            "Invalid loggedInUser data:",
            error
        );
    }


    const role = String(
        loggedInUser?.role || ""
    )
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

            console.error(
                "Invalid employees data:",
                error
            );

            employees = [];
        }


        if (!Array.isArray(employees)) {
            employees = [];
        }


        let currentPage = 1;

        const employeesPerPage = 6;

        let searchValue = "";

        let departmentValue =
            "All departments";

        let statusValue =
            "All statuses";


        /* =====================================================
           HR HTML
        ===================================================== */

        content.innerHTML = `

            <section class="content">


                <div class="title-row">

                    <div>

                        <h1>
                            Employees
                        </h1>



                    </div>


                    <div class="header-actions">

                        <button
                            class="export-btn"
                            id="exportEmployeesPdfBtn"
                            type="button"
                        >

                            <i
                                class="bi bi-file-earmark-pdf"
                            ></i>

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

                            <i
                                class="bi bi-search"
                            ></i>


                            <input
                                type="text"
                                id="employeeSearch"
                                placeholder="Search by name or email"
                               
                            >

                        </div>


                        <div class="select-box">

                            <select
                                id="departmentFilter"
                            >

                                <option>
                                    All departments
                                </option>

                            </select>


                            <i
                                class="bi bi-chevron-down"
                            ></i>

                        </div>


                        <div
                            class="select-box status-select"
                        >

                            <select
                                id="statusFilter"
                            >

                                <option>
                                    All statuses
                                </option>

                                <option>
                                    Active
                                </option>

                                <option>
                                    Inactive
                                </option>

                            </select>


                            <i
                                class="bi bi-chevron-down"
                            ></i>

                        </div>

                    </div>


                    <div class="table-wrapper">

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


                    <div class="pagination-area">




                        <div
                            class="pagination"
                            id="pagination"
                        ></div>

                    </div>

                </div>

            </section>


            <!-- =================================================
                 EMPLOYEE DETAILS MODAL
            ================================================== -->

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
                            aria-label="Close"
                        >

                            <i
                                class="bi bi-x-lg"
                            ></i>

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

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-person"
                                ></i>

                                Full name

                            </span>


                            <strong
                                id="detailName"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-envelope"
                                ></i>

                                Email address

                            </span>


                            <strong
                                id="detailEmail"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-telephone"
                                ></i>

                                Phone number

                            </span>


                            <strong
                                id="detailPhone"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-briefcase"
                                ></i>

                                Job title

                            </span>


                            <strong
                                id="detailJobTitle"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-calendar3"
                                ></i>

                                Joining date

                            </span>


                            <strong
                                id="detailJoiningDate"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-building"
                                ></i>

                                Department

                            </span>


                            <strong
                                id="detailDepartment"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-people"
                                ></i>

                                Role

                            </span>


                            <strong
                                id="detailRole"
                            >
                                -
                            </strong>

                        </div>


                        <div class="modal-detail-item">

                            <span
                                class="detail-label"
                            >

                                <i
                                    class="bi bi-circle"
                                ></i>

                                Status

                            </span>


                            <strong
                                id="detailStatus"
                            >
                                -
                            </strong>

                        </div>

                    </div>


                    <div
                        class="employee-modal-footer"
                    >

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

        `;


        /* =====================================================
           HR ELEMENTS
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
           DEPARTMENTS
        ===================================================== */

        function createDepartmentOptions() {

            const departments = [
                ...new Set(

                    employees
                        .map(
                            employee =>
                                employee?.department
                        )

                        .filter(Boolean)

                        .map(
                            department =>
                                String(
                                    department
                                ).trim()
                        )

                        .filter(Boolean)

                )
            ].sort(
                (a, b) =>
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
                                ${escapeHTML(
                                    department
                                )}
                            </option>
                        `
                    );

                }
            );
        }


        /* =====================================================
           FILTER EMPLOYEES
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

                currentPage =
                    totalPages;

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

                            <div style="
                                padding:55px 20px;
                                text-align:center;
                                color:#8aa0b5;
                            ">

                                <i
                                    class="bi bi-people"
                                    style="
                                        display:block;
                                        margin-bottom:10px;
                                        font-size:36px;
                                    "
                                ></i>

                                No employees found.

                            </div>

                        </td>

                    </tr>

                `;

            } else {

                tableBody.innerHTML =
                    currentEmployees
                        .map(
                            employee => {

                                const status =
                                    String(
                                        employee?.status ||
                                        "Inactive"
                                    );


                                const statusClass =
                                    status.toLowerCase() ===
                                        "active"
                                        ? "active"
                                        : "inactive";


                                return `

                                    <tr>

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

                                                ${escapeHTML(
                                                    status
                                                )}

                                            </span>

                                        </td>


                                        <td>

                                            <div
                                                class="actions"
                                            >

                                                <button
                                                    class="view-btn"
                                                    type="button"
                                                    data-action="view"
                                                    data-id="${escapeHTML(
                                                        employee?.id ??
                                                        ""
                                                    )}"
                                                >
                                                    View
                                                </button>


                                                <button
                                                    class="icon-btn delete"
                                                    type="button"
                                                    data-action="delete"
                                                    data-id="${escapeHTML(
                                                        employee?.id ??
                                                        ""
                                                    )}"
                                                    title="Delete employee"
                                                    aria-label="Delete employee"
                                                >

                                                    <i
                                                        class="bi bi-trash3"
                                                    ></i>

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                `;

                            }
                        )
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


            renderPagination(
                totalPages
            );
        }


        /* =====================================================
           PAGINATION
        ===================================================== */

        function renderPagination(
            totalPages
        ) {

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

                    if (
                        currentPage > 1
                    ) {

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

        function viewEmployee(
            employeeId
        ) {

            const employee =
                employees.find(
                    item =>
                        String(
                            item?.id
                        ) ===
                        String(
                            employeeId
                        )
                );


            if (!employee) {

                console.error(
                    "Employee not found:",
                    employeeId
                );

                return;
            }


            const modal =
                document.getElementById(
                    "employeeDetailsModal"
                );


            const modalName =
                document.getElementById(
                    "modalEmployeeName"
                );


            const modalProfileName =
                document.getElementById(
                    "modalProfileName"
                );


            const modalProfileJob =
                document.getElementById(
                    "modalProfileJob"
                );


            const modalAvatar =
                document.getElementById(
                    "modalEmployeeAvatar"
                );


            const modalStatus =
                document.getElementById(
                    "modalProfileStatus"
                );


            const status =
                String(
                    employee?.status ||
                    "Inactive"
                );


            const statusClass =
                status.toLowerCase() ===
                    "active"
                    ? "active"
                    : "inactive";


            modalName.textContent =
                employee?.name ||
                "Employee Details";


            modalProfileName.textContent =
                employee?.name ||
                "Employee";


            modalProfileJob.textContent =
                employee?.jobTitle ||
                "Employee";


            modalAvatar.textContent =
                getInitials(
                    employee?.name
                );


            modalStatus.textContent =
                status;


            modalStatus.className =
                `modal-status ${statusClass}`;


            document.getElementById(
                "detailName"
            ).textContent =
                employee?.name ||
                "-";


            document.getElementById(
                "detailEmail"
            ).textContent =
                employee?.email ||
                "-";


            document.getElementById(
                "detailPhone"
            ).textContent =
                employee?.phone ||
                "-";


            document.getElementById(
                "detailJobTitle"
            ).textContent =
                employee?.jobTitle ||
                "-";


            document.getElementById(
                "detailJoiningDate"
            ).textContent =
                formatDate(
                    employee?.joiningDate
                );


            document.getElementById(
                "detailDepartment"
            ).textContent =
                employee?.department ||
                "-";


            document.getElementById(
                "detailRole"
            ).textContent =
                formatRole(
                    employee?.role
                );


            document.getElementById(
                "detailStatus"
            ).textContent =
                status;


            modal.classList.add(
                "show"
            );


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
                    action === "delete"
                ) {

                    const employee =
                        employees.find(
                            item =>
                                String(
                                    item?.id
                                ) ===
                                String(
                                    id
                                )
                        );


                    if (!employee) {
                        return;
                    }


                    const confirmed =
                        confirm(
                            `Are you sure you want to delete ${employee.name || "this employee"}?`
                        );


                    if (!confirmed) {
                        return;
                    }


                    employees =
                        employees.filter(
                            item =>
                                String(
                                    item?.id
                                ) !==
                                String(
                                    id
                                )
                        );


                    localStorage.setItem(
                        "employees",
                        JSON.stringify(
                            employees
                        )
                    );


                    createDepartmentOptions();


                    currentPage = 1;


                    renderEmployees();

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
                    event.key !==
                    "Escape"
                ) {
                    return;
                }


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
        );


        /* =====================================================
           ADD EMPLOYEE
        ===================================================== */




        /* =====================================================
           EXPORT EMPLOYEES TO PDF
        ===================================================== */

        async function loadPdfLibraries() {

            /* -------------------------------------------------
               Load jsPDF
            ------------------------------------------------- */

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


            /* -------------------------------------------------
               Load AutoTable
            ------------------------------------------------- */

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

                /* -----------------------------------------
                   Loading state
                ----------------------------------------- */

                if (button) {

                    button.disabled =
                        true;


                    button.innerHTML = `

                        <i
                            class="bi bi-hourglass-split"
                        ></i>

                        Generating...

                    `;
                }


                /* -----------------------------------------
                   Load PDF libraries
                ----------------------------------------- */

                await loadPdfLibraries();


                /* -----------------------------------------
                   Read ALL employees
                   directly from localStorage
                ----------------------------------------- */

                let allEmployees = [];


                try {

                    allEmployees =
                        JSON.parse(
                            localStorage.getItem(
                                "employees"
                            ) || "[]"
                        );

                } catch (error) {

                    console.error(
                        "Error reading employees:",
                        error
                    );

                    allEmployees = [];
                }


                if (
                    !Array.isArray(
                        allEmployees
                    )
                ) {

                    allEmployees = [];
                }


                /* -----------------------------------------
                   No employees
                ----------------------------------------- */

                if (
                    allEmployees.length === 0
                ) {

                    alert(
                        "There are no employees to export."
                    );

                    return;
                }


                /* -----------------------------------------
                   Create PDF
                ----------------------------------------- */

                const {
                    jsPDF
                } = window.jspdf;


                const doc =
                    new jsPDF({

                        orientation:
                            "landscape",

                        unit:
                            "mm",

                        format:
                            "a4"

                    });


                /* -----------------------------------------
                   PDF HEADER
                ----------------------------------------- */

                doc.setFontSize(
                    20
                );


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


                doc.setFontSize(
                    10
                );


                doc.setTextColor(
                    100,
                    116,
                    139
                );


                doc.setFont(
                    "helvetica",
                    "normal"
                );


                doc.text(
                    `Total Employees: ${allEmployees.length}`,
                    14,
                    26
                );


                const today =
                    new Date()
                        .toLocaleDateString(
                            "en-GB"
                        );


                doc.text(
                    `Generated: ${today}`,
                    14,
                    32
                );


                /* -----------------------------------------
                   TABLE DATA
                ----------------------------------------- */

                const tableData =
                    allEmployees.map(
                        employee => [

                            employee?.name ||
                                "-",

                            employee?.email ||
                                "-",

                            employee?.phone ||
                                "-",

                            employee?.jobTitle ||
                                "-",

                            employee?.department ||
                                "-",

                            formatRole(
                                employee?.role
                            ) || "-",

                            formatDate(
                                employee?.joiningDate
                            ) || "-",

                            employee?.status ||
                                "Inactive"

                        ]
                    );


                /* -----------------------------------------
                   CREATE PDF TABLE
                ----------------------------------------- */

                doc.autoTable({

                    startY:
                        39,


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


                    body:
                        tableData,


                    theme:
                        "grid",


                    styles: {

                        font:
                            "helvetica",

                        fontSize:
                            8,

                        cellPadding:
                            3,

                        textColor: [
                            55,
                            65,
                            81
                        ],

                        lineColor: [
                            226,
                            232,
                            240
                        ],

                        lineWidth:
                            0.2

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

                        fontStyle:
                            "bold",

                        fontSize:
                            8

                    },


                    alternateRowStyles: {

                        fillColor: [
                            248,
                            250,
                            252
                        ]

                    },


                    columnStyles: {

                        0: {
                            cellWidth:
                                35
                        },

                        1: {
                            cellWidth:
                                45
                        },

                        2: {
                            cellWidth:
                                30
                        },

                        3: {
                            cellWidth:
                                35
                        },

                        4: {
                            cellWidth:
                                30
                        },

                        5: {
                            cellWidth:
                                25
                        },

                        6: {
                            cellWidth:
                                30
                        },

                        7: {
                            cellWidth:
                                25
                        }

                    },


                    margin: {

                        left:
                            14,

                        right:
                            14

                    },


                    /* -------------------------------------
                       PDF FOOTER
                    ------------------------------------- */

                    didDrawPage:
                        function () {

                            const pageCount =
                                doc.internal
                                    .getNumberOfPages();


                            const currentPage =
                                doc.internal
                                    .getCurrentPageInfo()
                                    .pageNumber;


                            doc.setFontSize(
                                8
                            );


                            doc.setTextColor(
                                148,
                                163,
                                184
                            );


                            doc.text(
                                "HR Management System",
                                14,
                                202
                            );


                            doc.text(
                                `Page ${currentPage} of ${pageCount}`,
                                270,
                                202,
                                {
                                    align:
                                        "right"
                                }
                            );

                        }

                });


                /* -----------------------------------------
                   DOWNLOAD
                ----------------------------------------- */

                doc.save(
                    "HR_Employees.pdf"
                );


            } catch (error) {

                console.error(
                    "PDF generation error:",
                    error
                );


                alert(
                    "Unable to generate PDF. Please try again."
                );


            } finally {

                if (button) {

                    button.disabled =
                        false;


                    button.innerHTML = `

                        <i
                            class="bi bi-file-earmark-pdf"
                        ></i>

                        Download PDF

                    `;
                }
            }
        }


        /* =====================================================
           PDF BUTTON EVENT
        ===================================================== */

        const exportEmployeesPdfBtn =
            document.getElementById(
                "exportEmployeesPdfBtn"
            );


        if (
            exportEmployeesPdfBtn
        ) {

            exportEmployeesPdfBtn.addEventListener(
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


        const statusClass =
            String(
                employeeStatus
            ).toLowerCase() ===
                "active"
                ? "active"
                : "inactive";


        const initials =
            getInitials(
                employeeName
            );


        /* =====================================================
           MODERN EMPLOYEE PAGE
        ===================================================== */

        content.innerHTML = `

            <section
                class="content employee-page"
            >


                <!-- PAGE HEADER -->

                <div
                    class="employee-page-header"
                >

                    <div
                        class="employee-heading"
                    >

                        <h1>
                            Employee Details
                        </h1>

                    </div>

                </div>


                <!-- MAIN AREA -->

                <div
                    class="employee-details-layout"
                >


                    <!-- PROFILE -->

                    <section
                        class="employee-profile-section"
                    >

                        <div
                            class="employee-section-title"
                        >

                            <h3>
                                Profile
                            </h3>


                            <button
                                type="button"
                                class="profile-menu-btn"
                                aria-label="Profile options"
                            >

                                <i
                                    class="bi bi-three-dots-vertical"
                                ></i>

                            </button>

                        </div>


                        <div
                            class="modern-profile-card"
                        >


                            <!-- COVER -->

                            <div
                                class="profile-cover"
                            >

                                <div
                                    class="profile-cover-circle circle-one"
                                ></div>


                                <div
                                    class="profile-cover-circle circle-two"
                                ></div>

                            </div>


                            <!-- AVATAR -->

                            <div
                                class="modern-profile-avatar"
                            >

                                ${escapeHTML(
                                    initials
                                )}

                            </div>


                            <!-- PROFILE INFO -->

                            <div
                                class="modern-profile-info"
                            >

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
                                    class="profile-status ${statusClass}"
                                >

                                    <span
                                        class="profile-status-dot"
                                    ></span>


                                    ${escapeHTML(
                                        employeeStatus
                                    )}

                                </span>

                            </div>


                            <!-- CONTACT LIST -->

                            <div
                                class="profile-contact-list"
                            >


                                <div
                                    class="profile-contact-item"
                                >

                                    <span
                                        class="profile-contact-icon"
                                    >

                                        <i
                                            class="bi bi-envelope"
                                        ></i>

                                    </span>


                                    <div>

                                        <span>
                                            Email
                                        </span>

                                        <strong>

                                            ${escapeHTML(
                                                employeeEmail
                                            )}

                                        </strong>

                                    </div>

                                </div>


                                <div
                                    class="profile-contact-item"
                                >

                                    <span
                                        class="profile-contact-icon"
                                    >

                                        <i
                                            class="bi bi-telephone"
                                        ></i>

                                    </span>


                                    <div>

                                        <span>
                                            Phone
                                        </span>

                                        <strong>

                                            ${escapeHTML(
                                                employeePhone
                                            )}

                                        </strong>

                                    </div>

                                </div>


                                <div
                                    class="profile-contact-item"
                                >

                                    <span
                                        class="profile-contact-icon"
                                    >

                                        <i
                                            class="bi bi-calendar3"
                                        ></i>

                                    </span>


                                    <div>

                                        <span>
                                            Joined
                                        </span>

                                        <strong>

                                            ${escapeHTML(
                                                employeeJoiningDate
                                            )}

                                        </strong>

                                    </div>

                                </div>


                                <div
                                    class="profile-contact-item"
                                >

                                    <span
                                        class="profile-contact-icon"
                                    >

                                        <i
                                            class="bi bi-building"
                                        ></i>

                                    </span>


                                    <div>

                                        <span>
                                            Department
                                        </span>

                                        <strong>

                                            ${escapeHTML(
                                                employeeDepartment
                                            )}

                                        </strong>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </section>


                    <!-- EMPLOYEE DETAILS -->

                    <section
                        class="employee-information-section"
                    >


                        <div
                            class="employee-section-title details-title"
                        >

                            <div
                                class="details-title-left"
                            >

                                <span
                                    class="details-title-icon"
                                >

                                    <i
                                        class="bi bi-person-vcard"
                                    ></i>

                                </span>


                                <h3>
                                    Employee details
                                </h3>

                            </div>

                        </div>


                        <div
                            class="modern-details-card"
                        >


                            <div
                                class="modern-form-grid"
                            >


                                <!-- FULL NAME -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Full name
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-person"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeName
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- EMAIL -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Email address
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-envelope"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeEmail
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- PHONE -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Phone number
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-telephone"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeePhone
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- JOB TITLE -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Job title
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-briefcase"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeJobTitle
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- JOINING DATE -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Joining date
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-calendar3"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeJoiningDate
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- DEPARTMENT -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Department
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-building"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeDepartment
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- ROLE -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Role
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon"
                                        >

                                            <i
                                                class="bi bi-people"
                                            ></i>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeRole
                                            )}

                                        </span>

                                    </div>

                                </div>


                                <!-- STATUS -->

                                <div
                                    class="modern-field"
                                >

                                    <label>
                                        Status
                                    </label>


                                    <div
                                        class="modern-input-box"
                                    >

                                        <span
                                            class="field-icon status-icon ${statusClass}"
                                        >

                                            <span></span>

                                        </span>


                                        <span
                                            class="field-value"
                                        >

                                            ${escapeHTML(
                                                employeeStatus
                                            )}

                                        </span>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </section>

                </div>

            </section>

        `;


        /* =====================================================
           EDIT PROFILE
        ===================================================== */

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

            <div style="
                max-width:600px;
                margin:80px auto;
                padding:40px;
                text-align:center;
                background:#ffffff;
                border:1px solid #e1eaf2;
                border-radius:18px;
                box-shadow:0 10px 30px rgba(20,50,80,.08);
            ">

                <i
                    class="bi bi-person-exclamation"
                    style="
                        font-size:42px;
                        color:#3979b7;
                    "
                ></i>


                <h2
                    style="color:#183b5d;"
                >
                    Unable to load employee page
                </h2>


                <p
                    style="color:#71879c;"
                >
                    Please log in again and try again.
                </p>

            </div>

        </section>

    `;
}


/* =========================================================
   HELPER FUNCTIONS
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


/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(name) {

    if (!name) {
        return "EM";
    }


    const parts =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (
        parts.length === 0
    ) {
        return "EM";
    }


    if (
        parts.length === 1
    ) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (

        parts[0].charAt(0) +

        parts[
            parts.length - 1
        ].charAt(0)

    ).toUpperCase();
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
    dateValue
) {

    if (!dateValue) {
        return "-";
    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            dateValue
        );

    }


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}


/* =========================================================
   FORMAT ROLE
========================================================= */

function formatRole(role) {

    if (!role) {
        return "-";
    }


    const value =
        String(role).trim();


    if (!value) {
        return "-";
    }


    return (
        value.charAt(0).toUpperCase() +
        value.slice(1).toLowerCase()
    );
}


