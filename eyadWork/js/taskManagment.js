// =============================================================
// TASK MANAGEMENT SYSTEM
// =============================================================


// =============================================================
// GLOBAL VARIABLES
// =============================================================

let currentEditingTaskId = null;
let selectedTaskName = "";
let selectedTaskId = null;


// =============================================================
// DISPLAY TASK PAGE
// =============================================================

function displayTask() {

    const content =
        document.getElementById("content");

    if (!content) {

        console.error(
            "Element #content not found."
        );

        return;
    }


    let user = null;

    try {

        user =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
            );

    } catch (error) {

        console.error(
            "Could not read loggedInUser:",
            error
        );

    }


    if (!user) {

        console.error(
            "No logged in user found."
        );

        return;
    }


    const role =
        String(
            user.role || ""
        )
        .trim()
        .toLowerCase();


    if (role === "employee") {

        displayEmployeePage(
            content,
            user
        );

        return;
    }


    if (role === "hr") {

        displayHrPage(
            content
        );

        return;
    }


    console.warn(
        "Unknown user role:",
        role
    );

}


// =============================================================
// GET CURRENT EMPLOYEE NAME
// =============================================================

function getCurrentEmployeeName(user) {

    if (!user) {
        return "";
    }

    return (
        user.name ||
        user.fullName ||
        user.full_name ||
        user.employeeName ||
        user.username ||
        ""
    )
    .toString()
    .trim();

}


// =============================================================
// DISPLAY EMPLOYEE PAGE
// =============================================================

function displayEmployeePage(
    content,
    user
) {

    const employeeName =
        getCurrentEmployeeName(user);


    const allTasks =
        getHrTasks();


    const employeeTasks =
        allTasks.filter(
            task => {

                if (!task.employee) {
                    return false;
                }

                return (
                    String(task.employee)
                        .trim()
                        .toLowerCase() ===
                    String(employeeName)
                        .trim()
                        .toLowerCase()
                );

            }
        );


    content.innerHTML = `

        <section class="content">

            <div class="title-row">

                <div>

                    <h1>
                        My tasks
                    </h1>

                </div>

                <span class="sample-data">
                    ${employeeTasks.length}
                    task${employeeTasks.length === 1 ? "" : "s"}
                </span>

            </div>


            <!-- =================================================
                 TABS
            ================================================== -->

            <div class="tabs">

                <button
                    type="button"
                    class="tab active"
                    data-status="All"
                >
                    All tasks (${employeeTasks.length})
                </button>

                <button
                    type="button"
                    class="tab"
                    data-status="In progress"
                >
                    In progress
                </button>

                <button
                    type="button"
                    class="tab"
                    data-status="Pending"
                >
                    Pending
                </button>

                <button
                    type="button"
                    class="tab"
                    data-status="Submitted"
                >
                    Submitted
                </button>

                <button
                    type="button"
                    class="tab"
                    data-status="Completed"
                >
                    Completed
                </button>

            </div>


            <!-- =================================================
                 FILTERS
            ================================================== -->

            <div class="filters">


                <select
                    id="employeeSort"
                >

                    <option value="newest">
                        Newest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>

                    <option value="title">
                        Title
                    </option>

                </select>

            </div>


            <!-- =================================================
                 TASK CONTAINER
            ================================================== -->

            <div
                class="task-grid"
                id="employeeTasksContainer"
            ></div>


            <!-- =================================================
                 VIEW TASK MODAL
            ================================================== -->

            <div
                class="edit-modal"
                id="viewTaskModal"
            >

                <div
                    class="edit-modal-content"
                    style="max-width:650px;"
                >

                    <div class="edit-modal-header">

                        <div>

                            <span class="edit-modal-label">
                                TASK DETAILS
                            </span>

                            <h2 id="viewTaskTitle">
                                Task
                            </h2>

                            <p>
                                Details of your assigned task.
                            </p>

                        </div>


                        <button
                            type="button"
                            class="close-edit-modal"
                            onclick="closeViewTaskModal()"
                        >
                            ×
                        </button>

                    </div>


                    <div
                        style="
                            display:flex;
                            flex-direction:column;
                            gap:22px;
                            padding-top:20px;
                        "
                    >

                        <div>

                            <label
                                style="
                                    display:block;
                                    font-weight:600;
                                    margin-bottom:8px;
                                "
                            >
                                Description
                            </label>

                            <p
                                id="viewTaskDescription"
                                style="
                                    margin:0;
                                    line-height:1.7;
                                "
                            ></p>

                        </div>


                        <div>

                            <label
                                style="
                                    display:block;
                                    font-weight:600;
                                    margin-bottom:8px;
                                "
                            >
                                Assigned employee
                            </label>

                            <p
                                id="viewTaskEmployee"
                                style="
                                    margin:0;
                                "
                            ></p>

                        </div>


                        <div>

                            <label
                                style="
                                    display:block;
                                    font-weight:600;
                                    margin-bottom:8px;
                                "
                            >
                                Status
                            </label>

                            <span
                                id="viewTaskStatus"
                                class="status pending"
                            >
                                Pending
                            </span>

                        </div>


                        <div>

                            <label
                                style="
                                    display:block;
                                    font-weight:600;
                                    margin-bottom:8px;
                                "
                            >
                                Created date
                            </label>

                            <p
                                id="viewTaskCreatedAt"
                                style="
                                    margin:0;
                                "
                            >
                                -
                            </p>

                        </div>


                        <div
                            style="
                                display:flex;
                                justify-content:flex-end;
                                margin-top:10px;
                            "
                        >

                            <button
                                type="button"
                                class="cancel-edit-btn"
                                onclick="closeViewTaskModal()"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 SUBMIT MODAL
            ================================================== -->

            <div
                class="submit-modal"
                id="submitModal"
            >

                <div class="submit-modal-content">

                    <div class="submit-modal-header">

                        <div>

                            <span class="modal-label">
                                TASK SUBMISSION
                            </span>

                            <h2>
                                Submit your work
                            </h2>

                            <p id="submitTaskName">
                                Submit your completed task.
                            </p>

                        </div>


                        <button
                            type="button"
                            class="close-modal"
                            onclick="closeSubmitModal()"
                        >
                            ×
                        </button>

                    </div>


                    <form id="submitForm">

                        <div class="submit-form-group">

                            <label>
                                Upload your file
                            </label>


                            <div class="file-upload">

                                <i class="bi bi-cloud-arrow-up"></i>

                                <span id="fileName">
                                    Click to upload your file
                                </span>

                                <input
                                    type="file"
                                    id="submitFile"
                                    onchange="showSelectedFile()"
                                >

                            </div>


                            <small>
                                Upload the file related to your task.
                            </small>

                        </div>


                        <div class="submit-form-group">

                            <label for="submitDescription">
                                Description
                            </label>

                            <textarea
                                id="submitDescription"
                                placeholder="Write a short description about your work..."
                            ></textarea>

                        </div>


                        <div class="submit-modal-actions">

                            <button
                                type="button"
                                class="cancel-submit"
                                onclick="closeSubmitModal()"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                class="confirm-submit"
                            >
                                Submit Work
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </section>

    `;


    // =========================================================
    // RENDER TASKS
    // =========================================================

    renderEmployeeTasks(
        employeeTasks
    );


    // =========================================================
    // STATUS SELECT FILTER
    // =========================================================

    const statusFilter =
        document.getElementById(
            "employeeStatusFilter"
        );


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                filterEmployeeTasks(
                    employeeTasks
                );

            }
        );

    }


    // =========================================================
    // SORT
    // =========================================================

    const sortSelect =
        document.getElementById(
            "employeeSort"
        );


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function () {

                filterEmployeeTasks(
                    employeeTasks
                );

            }
        );

    }


    // =========================================================
    // TABS
    // =========================================================

    const tabs =
        document.querySelectorAll(
            ".tabs .tab"
        );


    tabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                function () {

                    tabs.forEach(
                        item => {
                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    tab.classList.add(
                        "active"
                    );


                    const selectedStatus =
                        tab.dataset.status ||
                        "All";


                    if (statusFilter) {

                        statusFilter.value =
                            selectedStatus;

                    }


                    filterEmployeeTasks(
                        employeeTasks
                    );

                }
            );

        }
    );


    // =========================================================
    // RESTORE SUBMISSIONS
    // =========================================================

    restoreSubmittedTasks();

}


// =============================================================
// FILTER EMPLOYEE TASKS
// =============================================================

function filterEmployeeTasks(
    originalTasks
) {

    const searchInput =
        document.getElementById(
            "employeeTaskSearch"
        );


    const statusFilter =
        document.getElementById(
            "employeeStatusFilter"
        );


    const sortSelect =
        document.getElementById(
            "employeeSort"
        );


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const status =
        statusFilter
            ? statusFilter.value
            : "All";


    const sort =
        sortSelect
            ? sortSelect.value
            : "newest";


    let filtered =
        [...originalTasks];


    // SEARCH

    if (search) {

        filtered =
            filtered.filter(
                task => {

                    const title =
                        String(
                            task.title || ""
                        )
                        .toLowerCase();


                    const description =
                        String(
                            task.description || ""
                        )
                        .toLowerCase();


                    return (
                        title.includes(search) ||
                        description.includes(search)
                    );

                }
            );

    }


    // STATUS

    if (
        status &&
        status !== "All"
    ) {

        filtered =
            filtered.filter(
                task => {

                    return (
                        String(
                            task.status || ""
                        )
                        .toLowerCase() ===
                        status.toLowerCase()
                    );

                }
            );

    }


    // SORT

    if (sort === "newest") {

        filtered.sort(
            (a, b) => {

                return (
                    new Date(
                        b.createdAt || 0
                    ) -
                    new Date(
                        a.createdAt || 0
                    )
                );

            }
        );

    }


    if (sort === "oldest") {

        filtered.sort(
            (a, b) => {

                return (
                    new Date(
                        a.createdAt || 0
                    ) -
                    new Date(
                        b.createdAt || 0
                    )
                );

            }
        );

    }


    if (sort === "title") {

        filtered.sort(
            (a, b) => {

                return String(
                    a.title || ""
                )
                .localeCompare(
                    String(
                        b.title || ""
                    )
                );

            }
        );

    }


    renderEmployeeTasks(
        filtered
    );

}


// =============================================================
// RENDER EMPLOYEE TASKS
// =============================================================

function renderEmployeeTasks(
    tasks
) {

    const container =
        document.getElementById(
            "employeeTasksContainer"
        );


    if (!container) {
        return;
    }


    if (
        !tasks ||
        tasks.length === 0
    ) {

        container.innerHTML = `

            <div
                class="task-card"
                style="
                    grid-column:1 / -1;
                    text-align:center;
                    padding:50px 20px;
                "
            >

                <i
                    class="bi bi-clipboard-x"
                    style="
                        font-size:45px;
                        display:block;
                        margin-bottom:15px;
                    "
                ></i>

                <h3>
                    No tasks found
                </h3>

                <p>
                    There are no tasks matching your filter.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = "";


    tasks.forEach(
        task => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "task-card";


            const status =
                task.status ||
                "Pending";


            const statusClass =
                getStatusClass(
                    status
                );


            const created =
                task.createdAt
                    ? formatTaskDate(
                        task.createdAt
                    )
                    : "-";


            let actionButton = "";


            // =================================================
            // COMPLETED
            // =================================================

            if (
                status === "Completed"
            ) {

                actionButton = `

                    <button
                        type="button"
                        class="btn completed-btn"
                        disabled
                    >
                        Completed
                    </button>

                `;

            }


            // =================================================
            // SUBMITTED
            // =================================================

            else if (
                status === "Submitted"
            ) {

                actionButton = `

                    <button
                        type="button"
                        class="btn completed-btn"
                        disabled
                    >
                        Submitted
                    </button>

                `;

            }


            // =================================================
            // OTHER STATUS
            // =================================================

            else {

                actionButton = `

                    <button
                        type="button"
                        class="btn primary submit-task-btn"
                        onclick="openSubmitModal(
                            '${escapeJs(task.id)}',
                            '${escapeJs(task.title)}'
                        )"
                    >
                        Submit
                    </button>

                `;

            }


            card.innerHTML = `

                <div class="card-header">

                    <span class="priority ${String(task.priority || "Medium").toLowerCase()}">
                        ${escapeHtml(task.priority || "Medium")}
                    </span>

                    <span class="status ${statusClass}">
                        ${escapeHtml(status)}
                    </span>

                </div>


                <h3>
                    ${escapeHtml(task.title)}
                </h3>


                <p>
                    ${escapeHtml(task.description)}
                </p>


                <div class="card-meta">

                    Assigned to:
                    ${escapeHtml(task.employee)}

                    <br>

                    Created:
                    ${created}

                </div>


                <div class="card-actions">

                    <button
                        type="button"
                        class="btn secondary"
                        onclick="openViewTaskModal(
                            '${escapeJs(task.id)}'
                        )"
                    >
                        View Task
                    </button>


                    ${actionButton}

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// =============================================================
// OPEN VIEW TASK MODAL
// =============================================================

function openViewTaskModal(
    taskId
) {

    const tasks =
        getHrTasks();


    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task) {

        alert(
            "Task not found."
        );

        return;
    }


    const modal =
        document.getElementById(
            "viewTaskModal"
        );


    if (!modal) {

        console.error(
            "viewTaskModal not found."
        );

        return;
    }


    const title =
        document.getElementById(
            "viewTaskTitle"
        );


    const description =
        document.getElementById(
            "viewTaskDescription"
        );


    const employee =
        document.getElementById(
            "viewTaskEmployee"
        );


    const status =
        document.getElementById(
            "viewTaskStatus"
        );


    const created =
        document.getElementById(
            "viewTaskCreatedAt"
        );


    if (title) {

        title.textContent =
            task.title || "-";

    }


    if (description) {

        description.textContent =
            task.description || "-";

    }


    if (employee) {

        employee.textContent =
            task.employee || "-";

    }


    if (status) {

        status.textContent =
            task.status || "Pending";


        status.className =
            "status " +
            getStatusClass(
                task.status
            );

    }


    if (created) {

        created.textContent =
            task.createdAt
                ? formatTaskDate(
                    task.createdAt
                )
                : "-";

    }


    modal.classList.add(
        "active"
    );

}


// =============================================================
// CLOSE VIEW TASK MODAL
// =============================================================

function closeViewTaskModal() {

    const modal =
        document.getElementById(
            "viewTaskModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );

}


// =============================================================
// DISPLAY HR PAGE
// =============================================================

function displayHrPage(
    content
) {

    content.innerHTML = `

        <section class="content">

            <div class="title-row">

                <div>

                    <h1>
                        Task management
                    </h1>

                </div>

            </div>


            <div class="task-layout">

                <!-- =================================================
                     CREATE TASK
                ================================================== -->

                <div class="card create-card">

                    <div class="card-header">

                        <h2>
                            Create task
                        </h2>

                    </div>


                    <form id="createTaskForm">

                        <div class="form-group">

                            <label for="taskTitle">
                                Task title
                            </label>

                            <input
                                type="text"
                                id="taskTitle"
                                placeholder="Enter task title"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label for="description">
                                Description
                            </label>

                            <textarea
                                id="description"
                                placeholder="Describe the work to be done..."
                                required
                            ></textarea>

                        </div>

                <div class="form-group">

                    <label for="priority">
                        Priority
                    </label>

                    <div class="select-wrapper">

                        <select id="priority" required>

                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium" selected>
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>

                        </select>

                    </div>

                </div>


                        <div class="form-group">

                            <label for="employee">
                                Assigned employee
                            </label>

                            <div class="select-wrapper">

                                <select
                                    id="employee"
                                    required
                                >

                                    <option value="">
                                        Select employee
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div class="form-group">

                            <label for="status">
                                Status
                            </label>

                            <div class="select-wrapper">

                                <select id="status">

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In progress">
                                        In progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Blocked">
                                        Blocked
                                    </option>

                                </select>

                            </div>

                        </div>


                        <button
                            type="submit"
                            class="create-btn"
                        >
                            <span>
                                Create Task
                            </span>
                        </button>

                    </form>

                </div>


                <!-- =================================================
                     ALL TASKS
                ================================================== -->

                <div class="card tasks-card">

                    <div class="tasks-header">

                        <div>

                            <h2>
                                All tasks
                            </h2>



                    <div class="task-filter">
                        <select id="taskStatusFilter" onchange="renderHrTasks()">
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In progress">In progress</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Completed">Completed</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>

                        </div>


                        <span
                            class="task-count"
                            id="taskCount"
                        >
                            0 tasks
                        </span>

                    </div>


                    <div
                        id="tasksContainer"
                    ></div>

                </div>

            </div>


            <!-- =================================================
                 EDIT MODAL
            ================================================== -->

            <div
                class="edit-modal"
                id="editTaskModal"
            >

                <div class="edit-modal-content">

                    <div class="edit-modal-header">

                        <div>

                            <span class="edit-modal-label">
                                TASK MANAGEMENT
                            </span>

                            <h2>
                                Edit task
                            </h2>

                            <p>
                                Update the task information below.
                            </p>

                        </div>


                        <button
                            type="button"
                            class="close-edit-modal"
                            onclick="closeEditTaskModal()"
                        >
                            ×
                        </button>

                    </div>


                    <form
                        id="editTaskForm"
                    >

                        <div class="edit-form-group">

                            <label for="editTaskTitle">
                                Task title
                            </label>

                            <input
                                type="text"
                                id="editTaskTitle"
                                required
                            >

                        </div>


                        <div class="edit-form-group">

                            <label for="editTaskDescription">
                                Description
                            </label>

                            <textarea
                                id="editTaskDescription"
                                required
                            ></textarea>

                        </div>


                        <div class="edit-form-group">

                            <label for="editTaskEmployee">
                                Assigned employee
                            </label>

                            <div class="edit-select-wrapper">

                                <select
                                    id="editTaskEmployee"
                                    required
                                ></select>

                            </div>

                        </div>


                        <div class="edit-form-group">

                            <label for="editTaskStatus">
                                Status
                            </label>

                            <div class="edit-select-wrapper">

                                <select
                                    id="editTaskStatus"
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In progress">
                                        In progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Blocked">
                                        Blocked
                                    </option>

                                    <option value="Submitted">
                                        Submitted
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div class="edit-modal-actions">

                            <button
                                type="button"
                                class="cancel-edit-btn"
                                onclick="closeEditTaskModal()"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                class="save-edit-btn"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </section>

    `;


    // =========================================================
    // LOAD EMPLOYEES
    // =========================================================

    loadEmployeesForTasks();


    // =========================================================
    // DISPLAY TASKS
    // =========================================================

    renderHrTasks();


    // =========================================================
    // CREATE TASK FORM
    // =========================================================

    const createForm =
        document.getElementById(
            "createTaskForm"
        );


    if (createForm) {

        createForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const title =
                    document
                        .getElementById(
                            "taskTitle"
                        )
                        .value
                        .trim();


                const description =
                    document
                        .getElementById(
                            "description"
                        )
                        .value
                        .trim();


                const employee =
                    document
                        .getElementById(
                            "employee"
                        )
                        .value;


                const status =
                    document
                        .getElementById(
                            "status"
                        )
                        .value;

                 const priority =
                    document
                        .getElementById("priority")
                        .value;


                if (!title) {

                    alert(
                        "Please enter task title."
                    );

                    return;
                }


                if (!description) {

                    alert(
                        "Please enter task description."
                    );

                    return;
                }


                if (!employee) {

                    alert(
                        "Please select an employee."
                    );

                    return;
                }


                const tasks =
                    getHrTasks();


                const newTask = {

                    id:
                        Date.now().toString(),

                    title:
                        title,

                    description:
                        description,

                    employee:
                        employee,

                    status:
                        status,

                    createdAt:
                        new Date().toISOString(),

                    priority:
                         priority,

                };


                tasks.push(
                    newTask
                );


                localStorage.setItem(
                    "hrTasks",
                    JSON.stringify(
                        tasks
                    )
                );


                renderHrTasks();


                createForm.reset();


                alert(
                    "Task created successfully."
                );

            }
        );

    }

}


// =============================================================
// GET HR TASKS
// =============================================================

function getHrTasks() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    "hrTasks"
                )
            ) || []
        );

    } catch (error) {

        console.error(
            "Could not read hrTasks:",
            error
        );

        return [];

    }

}


// =============================================================
// LOAD EMPLOYEES
// =============================================================

function loadEmployeesForTasks() {

    const employeeSelect =
        document.getElementById(
            "employee"
        );


    const editEmployeeSelect =
        document.getElementById(
            "editTaskEmployee"
        );


    if (
        !employeeSelect &&
        !editEmployeeSelect
    ) {

        return;
    }


    let employees = [];


    const storedEmployees =
        localStorage.getItem(
            "employees"
        );


    if (storedEmployees) {

        try {

            const parsed =
                JSON.parse(
                    storedEmployees
                );


            if (
                Array.isArray(parsed)
            ) {

                employees =
                    parsed;

            }

        } catch (error) {

            console.error(
                "Could not read employees:",
                error
            );

        }

    }


    // FALLBACK EMPLOYEES

    if (
        employees.length === 0
    ) {

        employees = [

            {
                name:
                    "Lujain Okour"
            },

            {
                name:
                    "Haya Ahmed"
            },

            {
                name:
                    "Rana Saleh"
            }

        ];

    }


    function getEmployeeName(
        employee
    ) {

        if (
            typeof employee ===
            "string"
        ) {

            return employee;
        }


        return (
            employee.name ||
            employee.fullName ||
            employee.full_name ||
            employee.employeeName ||
            employee.firstName ||
            ""
        );

    }


    const names =
        employees
            .map(
                getEmployeeName
            )
            .filter(
                name => name
            )
            .filter(
                (
                    name,
                    index,
                    array
                ) =>
                    array.indexOf(
                        name
                    ) === index
            );


    // CREATE SELECT

    if (employeeSelect) {

        employeeSelect.innerHTML = `

            <option value="">
                Select employee
            </option>

        `;


        names.forEach(
            name => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    name;


                option.textContent =
                    name;


                employeeSelect.appendChild(
                    option
                );

            }
        );

    }


    // EDIT SELECT

    if (editEmployeeSelect) {

        editEmployeeSelect.innerHTML =
            "";


        names.forEach(
            name => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    name;


                option.textContent =
                    name;


                editEmployeeSelect.appendChild(
                    option
                );

            }
        );

    }

}


// =============================================================
// RENDER HR TASKS
// =============================================================

function renderHrTasks() {

    const container =
        document.getElementById(
            "tasksContainer"
        );


    const countElement =
        document.getElementById(
            "taskCount"
        );


    if (!container) {
        return;
    }


const allTasks = getHrTasks();

const filter =
    document.getElementById("taskStatusFilter");

const selectedStatus =
    filter ? filter.value : "All";

const tasks =
    selectedStatus === "All"
        ? allTasks
        : allTasks.filter(task =>
            String(task.status || "Pending")
                .toLowerCase() ===
            selectedStatus.toLowerCase()
        );


    if (
        tasks.length === 0
    ) {

        container.innerHTML = `

            <div
                class="task-item"
                style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    min-height:100px;
                "
            >

                <div class="task-info">

                    <h3>
                        No tasks yet
                    </h3>

                    <p>
                        Create a task using the form.
                    </p>

                </div>

            </div>

        `;


        if (countElement) {

            countElement.textContent =
                "0 tasks";

        }


        return;
    }


    if (countElement) {

        countElement.textContent =
            tasks.length +
            (
                tasks.length === 1
                    ? " task"
                    : " tasks"
            );

    }


    container.innerHTML =
        "";


    tasks.forEach(
        task => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "task-item";


            const status =
                task.status ||
                "Pending";


            const statusClass =
                getStatusClass(
                    status
                );


            item.innerHTML = `

                <div class="task-info">

                    <h3>
                        ${escapeHtml(
                            task.title
                        )}
                    </h3>


                    <p>
                        ${escapeHtml(
                            task.description
                        )}
                    </p>


                    <span class="assigned">
                        Assigned to:
                        ${escapeHtml(
                            task.employee
                        )}
                    </span>


                    <span
                        class="status ${statusClass}"
                    >
                        ${escapeHtml(
                            status
                        )}
                    </span>

                </div>


                <div class="task-actions">

                    <button
                        type="button"
                        class="edit-btn"
                        onclick="openEditTaskModal(
                            '${escapeJs(task.id)}'
                        )"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="edit-btn"
                        onclick="blockTask(
                            '${escapeJs(task.id)}'
                        )"
                    >
                        ${
                            status === "Blocked"
                                ? "Unblock"
                                : "Block"
                        }
                    </button>

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


// =============================================================
// GET STATUS CLASS
// =============================================================

function getStatusClass(
    status
) {

    const value =
        String(
            status || ""
        )
        .toLowerCase();


    if (
        value === "in progress"
    ) {

        return "in-progress";

    }


    if (
        value === "completed"
    ) {

        return "completed";

    }


    if (
        value === "submitted"
    ) {

        return "submitted";

    }


    if (
        value === "blocked"
    ) {

        return "blocked";

    }


    return "pending";

}


// =============================================================
// OPEN EDIT MODAL
// =============================================================

function openEditTaskModal(
    taskId
) {

    currentEditingTaskId =
        String(taskId);


    const tasks =
        getHrTasks();


    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task) {

        alert(
            "Task not found."
        );

        return;
    }


    const modal =
        document.getElementById(
            "editTaskModal"
        );


    if (!modal) {

        alert(
            "Edit modal was not found."
        );

        return;
    }


    loadEmployeesForTasks();


    const title =
        document.getElementById(
            "editTaskTitle"
        );


    if (title) {

        title.value =
            task.title || "";

    }


    const description =
        document.getElementById(
            "editTaskDescription"
        );


    if (description) {

        description.value =
            task.description || "";

    }


    const employee =
        document.getElementById(
            "editTaskEmployee"
        );


    if (employee) {

        employee.value =
            task.employee || "";

    }


    const status =
        document.getElementById(
            "editTaskStatus"
        );


    if (status) {

        status.value =
            task.status || "Pending";

    }


    modal.classList.add(
        "active"
    );

}


// =============================================================
// SAVE EDITED TASK
// =============================================================

function saveEditedTask() {

    if (
        !currentEditingTaskId
    ) {

        alert(
            "No task selected."
        );

        return;
    }


    const title =
        document
            .getElementById(
                "editTaskTitle"
            )
            ?.value
            .trim();


    const description =
        document
            .getElementById(
                "editTaskDescription"
            )
            ?.value
            .trim();


    const employee =
        document
            .getElementById(
                "editTaskEmployee"
            )
            ?.value;


    const status =
        document
            .getElementById(
                "editTaskStatus"
            )
            ?.value;


    if (!title) {

        alert(
            "Please enter task title."
        );

        return;
    }


    if (!description) {

        alert(
            "Please enter task description."
        );

        return;
    }


    if (!employee) {

        alert(
            "Please select an employee."
        );

        return;
    }


    if (!status) {

        alert(
            "Please select a status."
        );

        return;
    }


    const tasks =
        getHrTasks();


    const index =
        tasks.findIndex(
            task =>
                String(task.id) ===
                String(
                    currentEditingTaskId
                )
        );


    if (
        index === -1
    ) {

        alert(
            "Task not found in localStorage."
        );

        return;
    }


    tasks[index].title =
        title;


    tasks[index].description =
        description;


    tasks[index].employee =
        employee;


    tasks[index].status =
        status;


    localStorage.setItem(
        "hrTasks",
        JSON.stringify(
            tasks
        )
    );


    renderHrTasks();


    closeEditTaskModal();


    alert(
        "Task updated successfully."
    );

}


// =============================================================
// EDIT FORM SUBMIT
// =============================================================

document.addEventListener(
    "submit",
    function (e) {

        if (
            e.target.id !==
            "editTaskForm"
        ) {

            return;
        }


        e.preventDefault();


        saveEditedTask();

    }
);


// =============================================================
// CLOSE EDIT MODAL
// =============================================================

function closeEditTaskModal() {

    const modal =
        document.getElementById(
            "editTaskModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    currentEditingTaskId =
        null;


    const form =
        document.getElementById(
            "editTaskForm"
        );


    if (form) {

        form.reset();

    }

}


// =============================================================
// BLOCK / UNBLOCK
// =============================================================

function blockTask(
    taskId
) {

    const tasks =
        getHrTasks();


    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task) {
        return;
    }


    if (
        task.status === "Blocked"
    ) {

        task.status =
            "Pending";

    } else {

        task.status =
            "Blocked";

    }


    localStorage.setItem(
        "hrTasks",
        JSON.stringify(
            tasks
        )
    );


    renderHrTasks();

}


// =============================================================
// OPEN SUBMIT MODAL
// =============================================================

function openSubmitModal(
    taskId,
    taskName
) {

    selectedTaskId =
        String(taskId);


    selectedTaskName =
        taskName;


    const modal =
        document.getElementById(
            "submitModal"
        );


    const taskNameElement =
        document.getElementById(
            "submitTaskName"
        );


    if (!modal) {
        return;
    }


    if (taskNameElement) {

        taskNameElement.textContent =
            "Submit your work for: " +
            taskName;

    }


    modal.classList.add(
        "active"
    );


    setTimeout(
        function () {

            const description =
                document.getElementById(
                    "submitDescription"
                );


            if (description) {

                description.focus();

            }

        },
        100
    );

}


// =============================================================
// CLOSE SUBMIT MODAL
// =============================================================

function closeSubmitModal() {

    const modal =
        document.getElementById(
            "submitModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    const form =
        document.getElementById(
            "submitForm"
        );


    if (form) {

        form.reset();

    }


    const fileName =
        document.getElementById(
            "fileName"
        );


    if (fileName) {

        fileName.textContent =
            "Click to upload your file";

    }


    selectedTaskName =
        "";


    selectedTaskId =
        null;

}


// =============================================================
// SHOW SELECTED FILE
// =============================================================

function showSelectedFile() {

    const fileInput =
        document.getElementById(
            "submitFile"
        );


    const fileName =
        document.getElementById(
            "fileName"
        );


    if (
        !fileInput ||
        !fileName
    ) {

        return;
    }


    if (
        fileInput.files.length > 0
    ) {

        fileName.textContent =
            fileInput.files[0].name;

    } else {

        fileName.textContent =
            "Click to upload your file";

    }

}


// =============================================================
// SUBMIT EMPLOYEE WORK
// =============================================================

document.addEventListener(
    "submit",
    function (e) {

        if (
            e.target.id !==
            "submitForm"
        ) {

            return;
        }


        e.preventDefault();


        const fileInput =
            document.getElementById(
                "submitFile"
            );


        const descriptionInput =
            document.getElementById(
                "submitDescription"
            );


        const description =
            descriptionInput
                ? descriptionInput.value.trim()
                : "";


        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !fileInput ||
            fileInput.files.length === 0
        ) {

            alert(
                "Please upload a file."
            );

            return;
        }


        if (!description) {

            alert(
                "Please write a short description."
            );

            return;
        }


        if (!selectedTaskId) {

            alert(
                "Task not found."
            );

            return;
        }


        const file =
            fileInput.files[0];


        // =====================================================
        // GET TASKS
        // =====================================================

        let tasks =
            getHrTasks();


        // =====================================================
        // FIND TASK BY ID
        // =====================================================

        const taskIndex =
            tasks.findIndex(
                task =>
                    String(task.id) ===
                    String(selectedTaskId)
            );


        if (
            taskIndex === -1
        ) {

            alert(
                "Task not found in localStorage."
            );

            return;
        }


        // =====================================================
        // CHECK TASK STATUS
        // =====================================================

        if (
            tasks[taskIndex].status ===
            "Submitted"
        ) {

            alert(
                "This task has already been submitted."
            );

            closeSubmitModal();

            return;
        }


        // =====================================================
        // READ FILE
        // =====================================================

        const reader =
            new FileReader();


        reader.onload =
            function () {

                // =============================================
                // CREATE SUBMISSION
                // =============================================

                const submission = {

                    taskId:
                        selectedTaskId,

                    taskName:
                        selectedTaskName,

                    fileName:
                        file.name,

                    fileType:
                        file.type,

                    fileSize:
                        file.size,

                    fileData:
                        reader.result,

                    description:
                        description,

                    submittedAt:
                        new Date()
                            .toISOString(),

                    status:
                        "Submitted"

                };


                // =============================================
                // GET OLD SUBMISSIONS
                // =============================================

                let submissions = [];


                try {

                    submissions =
                        JSON.parse(
                            localStorage.getItem(
                                "taskSubmissions"
                            )
                        ) || [];

                } catch (error) {

                    submissions = [];

                }


                // =============================================
                // CHECK DUPLICATE BY TASK ID
                // =============================================

                const alreadySubmitted =
                    submissions.some(
                        item =>
                            String(
                                item.taskId
                            ) ===
                            String(
                                selectedTaskId
                            )
                    );


                if (
                    alreadySubmitted
                ) {

                    alert(
                        "This task has already been submitted."
                    );

                    closeSubmitModal();

                    return;
                }


                // =============================================
                // SAVE SUBMISSION
                // =============================================

                submissions.push(
                    submission
                );


                try {

                    localStorage.setItem(
                        "taskSubmissions",
                        JSON.stringify(
                            submissions
                        )
                    );

                } catch (error) {

                    console.error(
                        "Could not save submission:",
                        error
                    );


                    alert(
                        "The file is too large to save in localStorage."
                    );

                    return;
                }


                // =============================================
                // IMPORTANT:
                // UPDATE THE REAL TASK STATUS
                // =============================================

                tasks[taskIndex].status =
                    "Submitted";


                tasks[taskIndex].submittedAt =
                    submission.submittedAt;


                // =============================================
                // SAVE UPDATED TASKS
                // =============================================

                try {

                    localStorage.setItem(
                        "hrTasks",
                        JSON.stringify(
                            tasks
                        )
                    );

                } catch (error) {

                    console.error(
                        "Could not update hrTasks:",
                        error
                    );

                    return;
                }


                // =============================================
                // CLOSE MODAL
                // =============================================

                closeSubmitModal();


                // =============================================
                // REFRESH EMPLOYEE PAGE
                // =============================================

                const content =
                    document.getElementById(
                        "content"
                    );


                let user = null;


                try {

                    user =
                        JSON.parse(
                            localStorage.getItem(
                                "loggedInUser"
                            )
                        );

                } catch (error) {

                    user = null;

                }


                if (
                    content &&
                    user
                ) {

                    displayEmployeePage(
                        content,
                        user
                    );

                }


                // =============================================
                // SUCCESS
                // =============================================

                alert(
                    "Your work has been submitted successfully."
                );

            };


        // =====================================================
        // FILE READER ERROR
        // =====================================================

        reader.onerror =
            function () {

                alert(
                    "Could not read the selected file."
                );

            };


        // =====================================================
        // READ FILE AS BASE64
        // =====================================================

        reader.readAsDataURL(
            file
        );

    }
);


// =============================================================
// UPDATE EMPLOYEE TASK STATUS
// =============================================================

function updateTaskStatus(
    taskId
) {

    const cards =
        document.querySelectorAll(
            ".task-card"
        );


    cards.forEach(
        card => {

            const button =
                card.querySelector(
                    ".submit-task-btn"
                );


            if (!button) {
                return;
            }


            // This function is mainly kept for compatibility.
            // The real task status is now saved in hrTasks.

            button.textContent =
                "Submitted";


            button.className =
                "btn completed-btn";


            button.disabled =
                true;


            button.removeAttribute(
                "onclick"
            );


            const status =
                card.querySelector(
                    ".status"
                );


            if (status) {

                status.textContent =
                    "Submitted";


                status.className =
                    "status submitted";

            }

        }
    );

}


// =============================================================
// RESTORE SUBMITTED TASKS
// =============================================================

function restoreSubmittedTasks() {

    /*
        The task status is now stored directly inside hrTasks.

        So we do not need to change only the visual card.
        displayEmployeePage() reads the updated hrTasks
        and automatically displays Submitted.
    */

    const tasks =
        getHrTasks();


    const submittedTasks =
        tasks.filter(
            task =>
                task.status ===
                "Submitted"
        );


    if (
        submittedTasks.length === 0
    ) {

        return;
    }


    // Nothing else is required here because
    // renderEmployeeTasks() reads task.status.
}


// =============================================================
// FORMAT DATE
// =============================================================

function formatTaskDate(
    dateValue
) {

    if (!dateValue) {

        return "-";
    }


    const date =
        new Date(
            dateValue
        );


    if (
        isNaN(
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
            year:
                "numeric",

            month:
                "short",

            day:
                "numeric"
        }
    );

}


// =============================================================
// ESCAPE HTML
// =============================================================

function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value || "";


    return div.innerHTML;

}


// =============================================================
// ESCAPE JAVASCRIPT
// =============================================================

function escapeJs(
    value
) {

    return String(
        value || ""
    )
    .replace(
        /\\/g,
        "\\\\"
    )
    .replace(
        /'/g,
        "\\'"
    )
    .replace(
        /"/g,
        '\\"'
    )
    .replace(
        /\n/g,
        "\\n"
    )
    .replace(
        /\r/g,
        "\\r"
    );

}


// =============================================================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// =============================================================

document.addEventListener(
    "click",
    function (e) {

        const editModal =
            document.getElementById(
                "editTaskModal"
            );


        const viewModal =
            document.getElementById(
                "viewTaskModal"
            );


        const submitModal =
            document.getElementById(
                "submitModal"
            );


        // EDIT

        if (
            editModal &&
            e.target === editModal
        ) {

            closeEditTaskModal();

        }


        // VIEW

        if (
            viewModal &&
            e.target === viewModal
        ) {

            closeViewTaskModal();

        }


        // SUBMIT

        if (
            submitModal &&
            e.target === submitModal
        ) {

            closeSubmitModal();

        }

    }
);


// =============================================================
// ESCAPE KEY
// =============================================================

document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key !==
            "Escape"
        ) {

            return;
        }


        const editModal =
            document.getElementById(
                "editTaskModal"
            );


        const viewModal =
            document.getElementById(
                "viewTaskModal"
            );


        const submitModal =
            document.getElementById(
                "submitModal"
            );


        // EDIT

        if (
            editModal &&
            editModal.classList.contains(
                "active"
            )
        ) {

            closeEditTaskModal();

        }


        // VIEW

        if (
            viewModal &&
            viewModal.classList.contains(
                "active"
            )
        ) {

            closeViewTaskModal();

        }


        // SUBMIT

        if (
            submitModal &&
            submitModal.classList.contains(
                "active"
            )
        ) {

            closeSubmitModal();

        }

    }
);


// =============================================================
// START
// =============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayTask();

    }
);