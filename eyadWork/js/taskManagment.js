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


    // Do not show Blocked tasks to employee

    const employeeTasks =
        allTasks.filter(
            task => {

                if (
                    String(task.status || "")
                        .trim()
                        .toLowerCase() === "blocked"
                ) {

                    return false;

                }


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

                <select id="employeeSort">

                    <option value="newest">
                        Newest
                    </option>

                    <option value="oldest">
                        Oldest
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


    // Render tasks

    renderEmployeeTasks(
        employeeTasks
    );


    // Sort

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


    // Tabs

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


                    this.classList.add(
                        "active"
                    );


                    filterEmployeeTasks(
                        employeeTasks
                    );

                }
            );

        }
    );


    restoreSubmittedTasks();

}


// =============================================================
// FILTER EMPLOYEE TASKS
// =============================================================

function filterEmployeeTasks(
    originalTasks
) {

    const sortSelect =
        document.getElementById(
            "employeeSort"
        );


    const activeTab =
        document.querySelector(
            ".tabs .tab.active"
        );


    const status =
        activeTab
            ? activeTab.dataset.status
            : "All";


    const sort =
        sortSelect
            ? sortSelect.value
            : "newest";


    let filtered =
        [...originalTasks];


    // STATUS FILTER

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
            // EMPLOYEE STATUS EDITOR
            // =================================================

            const statusEditor = `

                <div class="employee-status-wrapper">

                    <label>
                        Status
                    </label>

                    <select
                        class="task-status-select"
                        onchange="
                            changeEmployeeTaskStatus(
                                '${escapeJs(task.id)}',
                                this.value
                            )
                        "
                    >

                        <option
                            value="Pending"
                            ${status === "Pending" ? "selected" : ""}
                        >
                            Pending
                        </option>


                        <option
                            value="In progress"
                            ${status === "In progress" ? "selected" : ""}
                        >
                            In progress
                        </option>





                        <option
                            value="Completed"
                            ${status === "Completed" ? "selected" : ""}
                        >
                            Completed
                        </option>

                    </select>

                </div>

            `;


            // =================================================
            // SUBMIT BUTTON
            // =================================================

            if (
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

            else if (
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

            else {

                actionButton = `

                    <button
                        type="button"
                        class="btn primary submit-task-btn"
                        onclick="
                            openSubmitModal(
                                '${escapeJs(task.id)}',
                                '${escapeJs(task.title)}'
                            )
                        "
                    >
                        Submit
                    </button>

                `;

            }


            card.innerHTML = `

                <div class="card-header">

                    <span
                        class="
                            priority
                            ${String(
                                task.priority ||
                                "Medium"
                            ).toLowerCase()}
                        "
                    >
                        ${escapeHtml(
                            task.priority ||
                            "Medium"
                        )}
                    </span>


                    <span
                        class="
                            status
                            ${statusClass}
                        "
                    >
                        ${escapeHtml(status)}
                    </span>

                </div>


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


                <div class="card-meta">

                    Assigned to:
                    ${escapeHtml(
                        task.employee
                    )}

                    <br>

                    Created:
                    ${created}

                </div>


                <div class="employee-status-area">

                    ${statusEditor}

                </div>


                <div class="card-actions">

                    <button
                        type="button"
                        class="btn secondary"
                        onclick="
                            openViewTaskModal(
                                '${escapeJs(task.id)}'
                            )
                        "
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
// CHANGE EMPLOYEE TASK STATUS
// =============================================================

function changeEmployeeTaskStatus(
    taskId,
    newStatus
) {

    const allowedStatuses = [

        "Pending",

        "In progress",

        "Submitted",

        "Completed"

    ];


    // Employee cannot set Blocked

    if (
        !allowedStatuses.includes(
            newStatus
        )
    ) {

        return;

    }


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


    task.status =
        newStatus;


    localStorage.setItem(
        "hrTasks",
        JSON.stringify(
            tasks
        )
    );


    // Refresh employee page

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


                        <!-- TASK TITLE -->

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


                        <!-- DESCRIPTION -->

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


                        <!-- PRIORITY -->

                        <div class="form-group">

                            <label for="priority">
                                Priority
                            </label>

                            <div class="select-wrapper">

                                <select
                                    id="priority"
                                    required
                                >

                                    <option value="Low">
                                        Low
                                    </option>

                                    <option
                                        value="Medium"
                                        selected
                                    >
                                        Medium
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                </select>

                            </div>

                        </div>



                        <div class="form-group">

                            <label>
                                Assigned employees
                            </label>

                            <div class="employee-dropdown" id="employee">

                                <button
                                    type="button"
                                    class="employee-dropdown-btn"
                                    id="employeeDropdownBtn"
                                >
                                    <span id="employeeSelectedText">
                                        Select employees
                                    </span>

                                    <i class="bi bi-chevron-down"></i>
                                </button>

                                <div
                                    class="employee-dropdown-menu"
                                    id="employeeDropdownMenu"
                                >
                                </div>

                            </div>

                            <small class="employee-help">
                                Select one or more employees.
                            </small>

                        </div>


                        <!-- NO STATUS HERE -->

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

                                <select
                                    id="taskStatusFilter"
                                    onchange="
                                        renderHrTasks()
                                    "
                                >

                                    <option value="All">
                                        All Status
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In progress">
                                        In progress
                                    </option>

                                    <option value="Submitted">
                                        Submitted
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
                            onclick="
                                closeEditTaskModal()
                            "
                        >
                            ×
                        </button>

                    </div>


                    <form
                        id="editTaskForm"
                    >


                        <!-- TITLE -->

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


                        <!-- DESCRIPTION -->

                        <div class="edit-form-group">

                            <label for="editTaskDescription">
                                Description
                            </label>

                            <textarea
                                id="editTaskDescription"
                                required
                            ></textarea>

                        </div>


                        <!-- EMPLOYEE -->

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


                        <!--
                            IMPORTANT:
                            NO STATUS FIELD HERE
                        -->


                        <div class="edit-modal-actions">

                            <button
                                type="button"
                                class="cancel-edit-btn"
                                onclick="
                                    closeEditTaskModal()
                                "
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


    // LOAD EMPLOYEES

    loadEmployeesForTasks();


    // DISPLAY TASKS

    renderHrTasks();


    // CREATE TASK

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


                const employeeCheckboxes =
                    document.querySelectorAll(
                        '#employee input[name="taskEmployees"]:checked'
                    );

                const selectedEmployees =
                    Array.from(employeeCheckboxes)
                        .map(checkbox => checkbox.value)
                        .filter(name => name);


                const priority =
                    document
                        .getElementById(
                            "priority"
                        )
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


                    if (selectedEmployees.length === 0) {

                        alert(
                            "Please select at least one employee."
                        );

                        return;
                    }


                    const tasks =
                        getHrTasks();


                    // Create one task for each selected employee

                    selectedEmployees.forEach(
                        (employee, index) => {

                            const newTask = {

                                id:
                                    (
                                        Date.now() +
                                        index
                                    ).toString(),

                                title:
                                    title,

                                description:
                                    description,

                                employee:
                                    employee,

                                status:
                                    "Pending",

                                createdAt:
                                    new Date().toISOString(),

                                priority:
                                    priority

                            };


                            tasks.push(
                                newTask
                            );

                        }
                    );


                    // Save all tasks

                    localStorage.setItem(
                        "hrTasks",
                        JSON.stringify(
                            tasks
                        )
                    );


                    renderHrTasks();


                    createForm.reset();


                    alert(
                        selectedEmployees.length === 1
                            ? "Task created successfully."
                            : `${selectedEmployees.length} tasks created successfully.`
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
                name =>
                    name
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
// CREATE EMPLOYEE CHECKBOXES

// CREATE EMPLOYEE DROPDOWN

// CREATE EMPLOYEE DROPDOWN

// CREATE EMPLOYEE DROPDOWN

if (employeeSelect) {

    employeeSelect.innerHTML = `

        <button
            type="button"
            class="employee-dropdown-btn"
            id="employeeDropdownBtn"
        >
            <span id="employeeSelectedText">
                Select employees
            </span>

            <i class="bi bi-chevron-down"></i>
        </button>


        <div
            class="employee-dropdown-menu"
            id="employeeDropdownMenu"
        >

            <label class="employee-check all-employees">

                <input
                    type="checkbox"
                    id="selectAllEmployees"
                    value="__ALL__"
                >

                <span>All Employees</span>

            </label>


            <div class="employee-divider"></div>


            ${names.map(
                name => `

                    <label class="employee-check">

                        <input
                            type="checkbox"
                            name="taskEmployees"
                            value="${escapeHtml(name)}"
                        >

                        <span>
                            ${escapeHtml(name)}
                        </span>

                    </label>

                `
            ).join("")}

        </div>
    `;


    const dropdownBtn =
        document.getElementById(
            "employeeDropdownBtn"
        );

    const dropdownMenu =
        document.getElementById(
            "employeeDropdownMenu"
        );

    const selectedText =
        document.getElementById(
            "employeeSelectedText"
        );

    const allCheckbox =
        document.getElementById(
            "selectAllEmployees"
        );

    const employeeCheckboxes =
        employeeSelect.querySelectorAll(
            'input[name="taskEmployees"]'
        );


    // OPEN / CLOSE

    dropdownBtn.addEventListener(
        "click",
        function (e) {

            e.stopPropagation();

            dropdownMenu.classList.toggle("show");

            dropdownBtn.classList.toggle("active");

        }
    );


    // ALL EMPLOYEES

    allCheckbox.addEventListener(
        "change",
        function () {

            employeeCheckboxes.forEach(
                checkbox => {

                    checkbox.checked =
                        allCheckbox.checked;

                }
            );

            updateEmployeeText();

        }
    );


    // INDIVIDUAL EMPLOYEES

    employeeCheckboxes.forEach(
        checkbox => {

            checkbox.addEventListener(
                "change",
                function () {

                    const allSelected =
                        Array.from(
                            employeeCheckboxes
                        ).every(
                            checkbox =>
                                checkbox.checked
                        );

                    allCheckbox.checked =
                        allSelected;

                    updateEmployeeText();

                }
            );

        }
    );


    // UPDATE TEXT

    function updateEmployeeText() {

        const selected =
            Array.from(
                employeeCheckboxes
            ).filter(
                checkbox =>
                    checkbox.checked
            );


        if (selected.length === 0) {

            selectedText.textContent =
                "Select employees";

        }
        else if (
            selected.length ===
            employeeCheckboxes.length
        ) {

            selectedText.textContent =
                "All employees";

        }
        else if (selected.length === 1) {

            selectedText.textContent =
                selected[0].value;

        }
        else {

            selectedText.textContent =
                `${selected.length} employees selected`;

        }

    }


    // CLOSE OUTSIDE

    document.addEventListener(
        "click",
        function (e) {

            if (
                !employeeSelect.contains(e.target)
            ) {

                dropdownMenu.classList.remove("show");

                dropdownBtn.classList.remove("active");

            }

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
        document.getElementById("tasksContainer");

    const countElement =
        document.getElementById("taskCount");

    if (!container) {
        return;
    }

    const allTasks =
        getHrTasks();

    const filter =
        document.getElementById("taskStatusFilter");

    const selectedStatus =
        filter
            ? filter.value
            : "All";

    const tasks =
        selectedStatus === "All"
            ? allTasks
            : allTasks.filter(task =>
                String(task.status || "Pending")
                    .toLowerCase() ===
                selectedStatus.toLowerCase()
            );


    /* =========================
       EMPTY
    ========================= */

    if (tasks.length === 0) {

        container.innerHTML = `
            <div class="empty-task-table">
                <i class="bi bi-clipboard-x"></i>

                <h3>No tasks yet</h3>

                <p>
                    Create a task using the form.
                </p>
            </div>
        `;

        if (countElement) {
            countElement.textContent = "0 tasks";
        }

        return;
    }


    /* =========================
       COUNT
    ========================= */

    if (countElement) {

        countElement.textContent =
            tasks.length +
            (tasks.length === 1
                ? " task"
                : " tasks");
    }


    /* =========================
       TABLE
    ========================= */

    container.innerHTML = `

        <div class="tasks-table-wrapper">

            <table class="tasks-table">

                <thead>

                    <tr>

                        <th>Task</th>

                        <th>Description</th>

                        <th>Assigned To</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody id="tasksTableBody">

                </tbody>

            </table>

        </div>

    `;


    const tbody =
        document.getElementById("tasksTableBody");


    tasks.forEach(task => {

        const status =
            task.status || "Pending";

        const statusClass =
            getStatusClass(status);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="table-task-title">

                    ${escapeHtml(task.title)}

                </div>

            </td>


            <td>

                <div class="table-description">

                    ${escapeHtml(task.description)}

                </div>

            </td>


            <td>

                <div class="table-employee">

                    <i class="bi bi-person"></i>

                    ${escapeHtml(task.employee)}

                </div>

            </td>


            <td>

                <span class="status ${statusClass}">

                    ${escapeHtml(status)}

                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        type="button"
                        class="table-edit-btn"
                        onclick="
                            openEditTaskModal(
                                '${escapeJs(task.id)}'
                            )
                        "
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="table-block-btn"
                        onclick="
                            blockTask(
                                '${escapeJs(task.id)}'
                            )
                        "
                    >

                        ${
                            status === "Blocked"
                                ? "Unblock"
                                : "Block"
                        }

                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });

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


    const description =
        document.getElementById(
            "editTaskDescription"
        );


    const employee =
        document.getElementById(
            "editTaskEmployee"
        );


    if (title) {

        title.value =
            task.title || "";

    }


    if (description) {

        description.value =
            task.description || "";

    }


    if (employee) {

        employee.value =
            task.employee || "";

    }


    // IMPORTANT:
    // There is NO status here.


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


    // DO NOT CHANGE STATUS HERE


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
        task.status ===
        "Blocked"
    ) {

        task.status =
            "Pending";

    }

    else {

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

    }

    else {

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


        let tasks =
            getHrTasks();


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


        const reader =
            new FileReader();


        reader.onload =
            function () {

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


                let submissions = [];


                try {

                    submissions =
                        JSON.parse(
                            localStorage.getItem(
                                "taskSubmissions"
                            )
                        ) || [];

                }

                catch (error) {

                    submissions = [];

                }


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

                }

                catch (error) {

                    console.error(
                        "Could not save submission:",
                        error
                    );

                    alert(
                        "The file is too large to save in localStorage."
                    );

                    return;

                }


                // Update real task

                tasks[taskIndex].status =
                    "Submitted";


                tasks[taskIndex].submittedAt =
                    submission.submittedAt;


                try {

                    localStorage.setItem(
                        "hrTasks",
                        JSON.stringify(
                            tasks
                        )
                    );

                }

                catch (error) {

                    console.error(
                        "Could not update hrTasks:",
                        error
                    );

                    return;

                }


                closeSubmitModal();


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

                }

                catch (error) {

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


                alert(
                    "Your work has been submitted successfully."
                );

            };


        reader.onerror =
            function () {

                alert(
                    "Could not read the selected file."
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);


// =============================================================
// RESTORE SUBMITTED TASKS
// =============================================================

function restoreSubmittedTasks() {

    // Status is stored directly in hrTasks.
    // Nothing else is required here.

    return;

}


// =============================================================
// REFRESH HR PAGE WHEN EMPLOYEE CHANGES STATUS
// =============================================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key !==
            "hrTasks"
        ) {

            return;
        }


        const tasksContainer =
            document.getElementById(
                "tasksContainer"
            );


        if (tasksContainer) {

            renderHrTasks();

        }

    }
);


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


        if (
            editModal &&
            editModal.classList.contains(
                "active"
            )
        ) {

            closeEditTaskModal();

        }


        if (
            viewModal &&
            viewModal.classList.contains(
                "active"
            )
        ) {

            closeViewTaskModal();

        }


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