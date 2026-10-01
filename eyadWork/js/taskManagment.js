function displayTask() {

    const content = document.getElementById("content");

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const role = user?.role?.toLowerCase();

  

    if (role === "employee") {

        content.innerHTML = `

        <section class="content">

            <div class="page-label">
                MY WORKSPACE / TASKS
            </div>

            <h1>My tasks</h1>

            <p class="description">
                View task information and submit your work.
            </p>


            <!-- FILTER TABS -->

            <div class="tabs">

                <button class="tab active">
                    All tasks (6)
                </button>

                <button class="tab">
                    In progress
                </button>

                <button class="tab">
                    Pending
                </button>

                <button class="tab">
                    Submitted
                </button>

                <button class="tab">
                    Completed
                </button>

            </div>


            <!-- FILTERS -->

            <div class="filters">

                <div class="search-box">

                    <i class="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search your tasks..."
                    >

                </div>


                <select>

                    <option>
                        All priorities
                    </option>

                    <option>
                        High priority
                    </option>

                    <option>
                        Medium priority
                    </option>

                    <option>
                        Low priority
                    </option>

                </select>


                <select>

                    <option>
                        Sort by due date
                    </option>

                    <option>
                        Newest
                    </option>

                    <option>
                        Oldest
                    </option>

                </select>

            </div>


            <!-- FEATURED TASK -->

            <div class="featured-task">

                <div class="task-left">

                    <span class="priority high">
                        HIGH PRIORITY
                    </span>

                    <h2>
                        Prepare onboarding checklist
                    </h2>

                    <p class="task-description">
                        Create a checklist for new team members.
                    </p>

                    <div class="task-meta">

                        <span>
                            Due: Oct 02, 2026
                        </span>

                        <span>
                            • Assigned by HR
                        </span>

                    </div>

                </div>


                <span
                    class="status in-progress"
                    data-task-status="Prepare onboarding checklist"
                >
                    In Progress
                </span>


                <div class="featured-actions">

                    <button class="btn secondary">
                        View Task ↑
                    </button>

                    <button
                        class="btn primary submit-task-btn"
                        onclick="openSubmitModal('Prepare onboarding checklist')"
                    >
                        Submit
                    </button>

                </div>


                <div class="task-details">

                    <span class="details-title">
                        TASK INFORMATION
                    </span>

                    <p>
                        Prepare a clear first-week checklist that helps new employees get started.
                    </p>

                    <ul>

                        <li>
                            01 List required documents and account setup steps.
                        </li>

                        <li>
                            02 Include team introductions and company policies.
                        </li>

                        <li>
                            03 Arrange the checklist in the order each step should be completed.
                        </li>

                    </ul>

                </div>

            </div>


            <!-- TASK GRID -->

            <div class="task-grid">


                <!-- TASK 1 -->

                <div class="task-card">

                    <div class="card-header">

                        <span class="priority medium">
                            Medium priority
                        </span>

                        <span
                            class="status pending"
                            data-task-status="Review attendance policy"
                        >
                            Pending
                        </span>

                    </div>

                    <h3>
                        Review attendance policy
                    </h3>

                    <p>
                        Read the policy and prepare your notes.
                    </p>

                    <div class="card-meta">

                        Due: Oct 03, 2026

                        <br>

                        Assigned by HR

                    </div>

                    <div class="card-actions">

                        <button class="btn secondary">
                            View Task
                        </button>

                        <button
                            class="btn primary submit-task-btn"
                            onclick="openSubmitModal('Review attendance policy')"
                        >
                            Submit
                        </button>

                    </div>

                </div>


                <!-- TASK 2 -->

                <div class="task-card">

                    <div class="card-header">

                        <span class="priority medium">
                            Medium priority
                        </span>

                        <span
                            class="status in-progress"
                            data-task-status="Update project documentation"
                        >
                            In Progress
                        </span>

                    </div>

                    <h3>
                        Update project documentation
                    </h3>

                    <p>
                        Revise the setup and handover guide.
                    </p>

                    <div class="card-meta">

                        Due: Oct 04, 2026

                        <br>

                        Assigned by HR

                    </div>

                    <div class="card-actions">

                        <button class="btn secondary">
                            View Task
                        </button>

                        <button
                            class="btn primary submit-task-btn"
                            onclick="openSubmitModal('Update project documentation')"
                        >
                            Submit
                        </button>

                    </div>

                </div>


                <!-- TASK 3 -->

                <div class="task-card">

                    <div class="card-header">

                        <span class="priority high-text">
                            High priority
                        </span>

                        <span
                            class="status submitted"
                            data-task-status="Submit monthly activity report"
                        >
                            Submitted
                        </span>

                    </div>

                    <h3>
                        Submit monthly activity report
                    </h3>

                    <p>
                        Summarise completed work and updates.
                    </p>

                    <div class="card-meta">

                        Due: Oct 05, 2026

                        <br>

                        Assigned by HR

                    </div>

                    <div class="card-actions">

                        <button class="btn secondary">
                            View Task
                        </button>

                        <button
                            class="btn completed-btn"
                            disabled
                        >
                            Submitted
                        </button>

                    </div>

                </div>


                <!-- TASK 4 -->

                <div class="task-card">

                    <div class="card-header">

                        <span class="priority low">
                            Low priority
                        </span>

                        <span
                            class="status completed"
                            data-task-status="Complete profile information"
                        >
                            Completed
                        </span>

                    </div>

                    <h3>
                        Complete profile information
                    </h3>

                    <p>
                        Check your details and contact number.
                    </p>

                    <div class="card-meta">

                        Due: Oct 06, 2026

                        <br>

                        Assigned by HR

                    </div>

                    <div class="card-actions">

                        <button class="btn secondary">
                            View Task
                        </button>

                        <button
                            class="btn completed-btn"
                            disabled
                        >
                            Completed
                        </button>

                    </div>

                </div>


                <!-- TASK 5 -->

                <div class="task-card">

                    <div class="card-header">

                        <span class="priority low">
                            Low priority
                        </span>

                        <span
                            class="status completed"
                            data-task-status="Review workplace guidelines"
                        >
                            Completed
                        </span>

                    </div>

                    <h3>
                        Review workplace guidelines
                    </h3>

                    <p>
                        Read the team communication guidelines.
                    </p>

                    <div class="card-meta">

                        Due: Oct 07, 2026

                        <br>

                        Assigned by HR

                    </div>

                    <div class="card-actions">

                        <button class="btn secondary">
                            View Task
                        </button>

                        <button
                            class="btn completed-btn"
                            disabled
                        >
                            Completed
                        </button>

                    </div>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- SUBMIT MODAL -->
            <!-- ================================================= -->

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


                        <!-- FILE -->

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


                        <!-- DESCRIPTION -->

                        <div class="submit-form-group">

                            <label for="submitDescription">
                                Description
                            </label>

                            <textarea
                                id="submitDescription"
                                placeholder="Write a short description about your work..."
                            ></textarea>

                        </div>


                        <!-- ACTIONS -->

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


        restoreSubmittedTasks();

    }


    // =========================================================
    // HR
    // =========================================================

    else if (role === "hr") {

        content.innerHTML = `

        <section class="content">


            <div class="page-label">
                SERVICES / TASK MANAGEMENT
            </div>


            <div class="title-row">

                <div>

                    <h1>
                        Task management
                    </h1>

                    <p>
                        Create tasks, assign an employee and keep work up to date.
                    </p>

                </div>


                <span class="sample-data">
                    Sample data
                </span>

            </div>


            <!-- TASK AREA -->

            <div class="task-layout">


                <!-- CREATE TASK -->

                <div class="card create-card">

                    <div class="card-header">

                        <h2>
                            Create task
                        </h2>

                        <p>
                            Add the details and choose an employee.
                        </p>

                    </div>


                    <form>

                        <!-- TITLE -->

                        <div class="form-group">

                            <label for="taskTitle">
                                Task title
                            </label>

                            <input
                                type="text"
                                id="taskTitle"
                                placeholder="Enter task title"
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
                            ></textarea>

                        </div>


                        <!-- EMPLOYEE -->

                        <div class="form-group">

                            <label for="employee">
                                Assigned employee
                            </label>

                            <div class="select-wrapper">

                                <select id="employee">

                                    <option value="">
                                        Select employee
                                    </option>

                                    <option value="Lujain Okour">
                                        Lujain Okour
                                    </option>

                                    <option value="Haya Ahmed">
                                        Haya Ahmed
                                    </option>

                                    <option value="Rana Saleh">
                                        Rana Saleh
                                    </option>

                                </select>

                            </div>

                        </div>


                        <!-- STATUS -->

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

                            <i class="bi bi-arrow-right"></i>

                        </button>

                    </form>

                </div>


                <!-- ALL TASKS -->

                <div class="card tasks-card">


                    <div class="tasks-header">

                        <div>

                            <h2>
                                All tasks
                            </h2>

                            <p>
                                View details or edit an existing task.
                            </p>

                        </div>

                        <span class="task-count">
                            3 tasks
                        </span>

                    </div>


                    <!-- TASK 1 -->

                    <div class="task-item">

                        <div class="task-info">

                            <h3>
                                Update employee handbook
                            </h3>

                            <p>
                                Review and update the handbook.
                            </p>

                            <span class="assigned">
                                Assigned to: Lujain Okour
                            </span>

                            <span class="status in-progress">
                                In progress
                            </span>

                        </div>


                        <div class="task-actions">

                            <button class="block-btn">
                                Block
                            </button>

                            <button
                                class="edit-btn"
                                onclick="openEditTaskModal(
                                    'Update employee handbook',
                                    'Review and update the handbook.',
                                    'Lujain Okour',
                                    'In progress'
                                )"
                            >
                                Edit
                            </button>

                        </div>

                    </div>


                    <!-- TASK 2 -->

                    <div class="task-item">

                        <div class="task-info">

                            <h3>
                                Prepare welcome materials
                            </h3>

                            <p>
                                Prepare resources for new employees.
                            </p>

                            <span class="assigned">
                                Assigned to: Haya Ahmed
                            </span>

                            <span class="status pending">
                                Pending
                            </span>

                        </div>


                        <div class="task-actions">

                            <button class="block-btn">
                                Block
                            </button>

                            <button
                                class="edit-btn"
                                onclick="openEditTaskModal(
                                    'Prepare welcome materials',
                                    'Prepare resources for new employees.',
                                    'Haya Ahmed',
                                    'Pending'
                                )"
                            >
                                Edit
                            </button>

                        </div>

                    </div>


                    <!-- TASK 3 -->

                    <div class="task-item">

                        <div class="task-info">

                            <h3>
                                Update contact directory
                            </h3>

                            <p>
                                Check the team contact information.
                            </p>

                            <span class="assigned">
                                Assigned to: Rana Saleh
                            </span>

                            <span class="status completed">
                                Completed
                            </span>

                        </div>


                        <div class="task-actions">

                            <button class="block-btn">
                                Block
                            </button>

                            <button
                                class="edit-btn"
                                onclick="openEditTaskModal(
                                    'Update contact directory',
                                    'Check the team contact information.',
                                    'Rana Saleh',
                                    'Completed'
                                )"
                            >
                                Edit
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            <div class="footer-text">
                HR Management System
            </div>


            <!-- ================================================= -->
            <!-- EDIT TASK MODAL -->
            <!-- ================================================= -->

            <div
                class="edit-modal"
                id="editTaskModal"
            >

                <div class="edit-modal-content">


                    <!-- HEADER -->

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


                    <!-- FORM -->

                    <form id="editTaskForm">


                        <!-- TASK TITLE -->

                        <div class="edit-form-group">

                            <label for="editTaskTitle">
                                Task title
                            </label>

                            <input
                                type="text"
                                id="editTaskTitle"
                                placeholder="Enter task title"
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
                                placeholder="Describe the work to be done..."
                                required
                            ></textarea>

                        </div>


                        <!-- ASSIGNED EMPLOYEE -->

                        <div class="edit-form-group">

                            <label for="editTaskEmployee">
                                Assigned employee
                            </label>

                            <div class="edit-select-wrapper">

                                <select id="editTaskEmployee">

                                    <option value="Lujain Okour">
                                        Lujain Okour
                                    </option>

                                    <option value="Haya Ahmed">
                                        Haya Ahmed
                                    </option>

                                    <option value="Rana Saleh">
                                        Rana Saleh
                                    </option>

                                </select>

                            </div>

                        </div>


                        <!-- STATUS -->

                        <div class="edit-form-group">

                            <label for="editTaskStatus">
                                Status
                            </label>

                            <div class="edit-select-wrapper">

                                <select id="editTaskStatus">

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In progress">
                                        In progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                </select>

                            </div>

                        </div>


                        <!-- ACTIONS -->

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


        // Restore HR task edits after page is created
        restoreEditedTasks();

    }

}


// =============================================================
// SUBMIT MODAL
// =============================================================

let selectedTaskName = "";


// =============================================================
// OPEN SUBMIT MODAL
// =============================================================

function openSubmitModal(taskName) {

    selectedTaskName = taskName;


    const modal =
        document.getElementById("submitModal");


    const taskNameElement =
        document.getElementById("submitTaskName");


    if (!modal) {
        return;
    }


    if (taskNameElement) {

        taskNameElement.textContent =
            "Submit your work for: " + taskName;

    }


    modal.classList.add("active");


    setTimeout(() => {

        const description =
            document.getElementById("submitDescription");


        if (description) {

            description.focus();

        }

    }, 100);

}


// =============================================================
// CLOSE SUBMIT MODAL
// =============================================================

function closeSubmitModal() {

    const modal =
        document.getElementById("submitModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("active");


    const form =
        document.getElementById("submitForm");


    if (form) {

        form.reset();

    }


    const fileName =
        document.getElementById("fileName");


    if (fileName) {

        fileName.textContent =
            "Click to upload your file";

    }


    selectedTaskName = "";

}


// =============================================================
// SHOW SELECTED FILE
// =============================================================

function showSelectedFile() {

    const fileInput =
        document.getElementById("submitFile");


    const fileName =
        document.getElementById("fileName");


    if (!fileInput || !fileName) {

        return;

    }


    if (fileInput.files.length > 0) {

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

        if (e.target.id !== "submitForm") {

            return;

        }


        e.preventDefault();


        const fileInput =
            document.getElementById("submitFile");


        const description =
            document
                .getElementById("submitDescription")
                .value
                .trim();


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


        const file =
            fileInput.files[0];


        const submission = {

            taskName:
                selectedTaskName,

            fileName:
                file.name,

            fileType:
                file.type,

            fileSize:
                file.size,

            description:
                description,

            submittedAt:
                new Date().toISOString(),

            status:
                "Submitted"

        };


        let submissions =
            JSON.parse(
                localStorage.getItem(
                    "taskSubmissions"
                )
            ) || [];


        const alreadySubmitted =
            submissions.some(
                item =>
                    item.taskName ===
                    selectedTaskName
            );


        if (alreadySubmitted) {

            alert(
                "This task has already been submitted."
            );

            closeSubmitModal();

            return;

        }


        submissions.push(
            submission
        );


        localStorage.setItem(
            "taskSubmissions",
            JSON.stringify(
                submissions
            )
        );


        updateTaskStatus(
            selectedTaskName
        );


        closeSubmitModal();


        alert(
            "Your work has been submitted successfully."
        );

    }
);


// =============================================================
// UPDATE EMPLOYEE TASK STATUS
// =============================================================

function updateTaskStatus(taskName) {

    const allTasks =
        document.querySelectorAll(
            ".featured-task, .task-card"
        );


    allTasks.forEach(task => {

        const title =
            task.querySelector(
                "h2, h3"
            );


        if (!title) {
            return;
        }


        const currentTaskName =
            title.textContent.trim();


        if (
            currentTaskName !==
            taskName
        ) {

            return;

        }


        const status =
            task.querySelector(
                ".status"
            );


        if (status) {

            status.textContent =
                "Submitted";


            status.className =
                "status submitted";

        }


        const submitButton =
            task.querySelector(
                ".submit-task-btn"
            );


        if (submitButton) {

            submitButton.textContent =
                "Submitted";


            submitButton.className =
                "btn completed-btn";


            submitButton.disabled =
                true;


            submitButton.removeAttribute(
                "onclick"
            );

        }

    });

}


// =============================================================
// RESTORE SUBMITTED TASKS
// =============================================================

function restoreSubmittedTasks() {

    const submissions =
        JSON.parse(
            localStorage.getItem(
                "taskSubmissions"
            )
        ) || [];


    if (
        submissions.length === 0
    ) {

        return;

    }


    submissions.forEach(
        submission => {

            updateTaskStatus(
                submission.taskName
            );

        }
    );

}


// =============================================================
// EDIT TASK MODAL
// =============================================================

let currentEditingTask = null;


// =============================================================
// OPEN EDIT TASK MODAL
// =============================================================

function openEditTaskModal(
    title,
    description,
    employee,
    status
) {

    currentEditingTask = {

        oldTitle:
            title

    };


    const modal =
        document.getElementById(
            "editTaskModal"
        );


    if (!modal) {

        return;

    }


    // Fill title

    const titleInput =
        document.getElementById(
            "editTaskTitle"
        );


    if (titleInput) {

        titleInput.value =
            title;

    }


    // Fill description

    const descriptionInput =
        document.getElementById(
            "editTaskDescription"
        );


    if (descriptionInput) {

        descriptionInput.value =
            description;

    }


    // Fill employee

    const employeeSelect =
        document.getElementById(
            "editTaskEmployee"
        );


    if (employeeSelect) {

        employeeSelect.value =
            employee;

    }


    // Fill status

    const statusSelect =
        document.getElementById(
            "editTaskStatus"
        );


    if (statusSelect) {

        statusSelect.value =
            status;

    }


    // Show modal

    modal.classList.add(
        "active"
    );


    setTimeout(() => {

        if (titleInput) {

            titleInput.focus();

        }

    }, 100);

}


// =============================================================
// CLOSE EDIT TASK MODAL
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


    currentEditingTask =
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
// SAVE EDITED TASK
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


        if (
            !currentEditingTask
        ) {

            return;

        }


        // =====================================================
        // GET VALUES
        // =====================================================

        const newTitle =
            document
                .getElementById(
                    "editTaskTitle"
                )
                .value
                .trim();


        const newDescription =
            document
                .getElementById(
                    "editTaskDescription"
                )
                .value
                .trim();


        const newEmployee =
            document
                .getElementById(
                    "editTaskEmployee"
                )
                .value;


        const newStatus =
            document
                .getElementById(
                    "editTaskStatus"
                )
                .value;


        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !newTitle ||
            !newDescription ||
            !newEmployee ||
            !newStatus
        ) {

            alert(
                "Please fill all fields."
            );

            return;

        }


        // =====================================================
        // FIND TASK
        // =====================================================

        const taskItems =
            document.querySelectorAll(
                ".task-item"
            );


        taskItems.forEach(
            task => {

                const titleElement =
                    task.querySelector(
                        ".task-info h3"
                    );


                if (!titleElement) {

                    return;

                }


                const currentTitle =
                    titleElement
                        .textContent
                        .trim();


                if (
                    currentTitle !==
                    currentEditingTask.oldTitle
                ) {

                    return;

                }


                // =================================================
                // UPDATE TITLE
                // =================================================

                titleElement.textContent =
                    newTitle;


                // =================================================
                // UPDATE DESCRIPTION
                // =================================================

                const descriptionElement =
                    task.querySelector(
                        ".task-info p"
                    );


                if (
                    descriptionElement
                ) {

                    descriptionElement.textContent =
                        newDescription;

                }


                // =================================================
                // UPDATE EMPLOYEE
                // =================================================

                const assignedElement =
                    task.querySelector(
                        ".assigned"
                    );


                if (
                    assignedElement
                ) {

                    assignedElement.textContent =
                        "Assigned to: " +
                        newEmployee;

                }


                // =================================================
                // UPDATE STATUS
                // =================================================

                const statusElement =
                    task.querySelector(
                        ".status"
                    );


                if (
                    statusElement
                ) {

                    statusElement.textContent =
                        newStatus;


                    statusElement.classList.remove(
                        "pending",
                        "in-progress",
                        "completed"
                    );


                    if (
                        newStatus ===
                        "Pending"
                    ) {

                        statusElement.classList.add(
                            "pending"
                        );

                    }

                    else if (
                        newStatus ===
                        "In progress"
                    ) {

                        statusElement.classList.add(
                            "in-progress"
                        );

                    }

                    else if (
                        newStatus ===
                        "Completed"
                    ) {

                        statusElement.classList.add(
                            "completed"
                        );

                    }

                }

            }
        );


        // =====================================================
        // SAVE TO LOCAL STORAGE
        // =====================================================

        saveEditedTask(
            currentEditingTask.oldTitle,
            newTitle,
            newDescription,
            newEmployee,
            newStatus
        );


        // =====================================================
        // CLOSE MODAL
        // =====================================================

        closeEditTaskModal();


        alert(
            "Task updated successfully."
        );

    }
);


// =============================================================
// SAVE EDITED TASK TO LOCAL STORAGE
// =============================================================

function saveEditedTask(
    oldTitle,
    title,
    description,
    employee,
    status
) {

    let editedTasks =
        JSON.parse(
            localStorage.getItem(
                "editedTasks"
            )
        ) || [];


    const existingIndex =
        editedTasks.findIndex(
            task =>
                task.oldTitle ===
                oldTitle
        );


    const editedTask = {

        oldTitle:
            oldTitle,

        title:
            title,

        description:
            description,

        employee:
            employee,

        status:
            status

    };


    if (
        existingIndex !== -1
    ) {

        editedTasks[
            existingIndex
        ] = editedTask;

    }

    else {

        editedTasks.push(
            editedTask
        );

    }


    localStorage.setItem(
        "editedTasks",
        JSON.stringify(
            editedTasks
        )
    );

}


// =============================================================
// RESTORE EDITED TASKS
// =============================================================

function restoreEditedTasks() {

    const editedTasks =
        JSON.parse(
            localStorage.getItem(
                "editedTasks"
            )
        ) || [];


    if (
        editedTasks.length === 0
    ) {

        return;

    }


    const taskItems =
        document.querySelectorAll(
            ".task-item"
        );


    editedTasks.forEach(
        editedTask => {

            taskItems.forEach(
                task => {

                    const titleElement =
                        task.querySelector(
                            ".task-info h3"
                        );


                    if (!titleElement) {

                        return;

                    }


                    if (
                        titleElement
                            .textContent
                            .trim() !==
                        editedTask.oldTitle
                    ) {

                        return;

                    }


                    // TITLE

                    titleElement.textContent =
                        editedTask.title;


                    // DESCRIPTION

                    const descriptionElement =
                        task.querySelector(
                            ".task-info p"
                        );


                    if (
                        descriptionElement
                    ) {

                        descriptionElement.textContent =
                            editedTask.description;

                    }


                    // EMPLOYEE

                    const assignedElement =
                        task.querySelector(
                            ".assigned"
                        );


                    if (
                        assignedElement
                    ) {

                        assignedElement.textContent =
                            "Assigned to: " +
                            editedTask.employee;

                    }


                    // STATUS

                    const statusElement =
                        task.querySelector(
                            ".status"
                        );


                    if (
                        statusElement
                    ) {

                        statusElement.textContent =
                            editedTask.status;


                        statusElement.classList.remove(
                            "pending",
                            "in-progress",
                            "completed"
                        );


                        if (
                            editedTask.status ===
                            "Pending"
                        ) {

                            statusElement.classList.add(
                                "pending"
                            );

                        }

                        else if (
                            editedTask.status ===
                            "In progress"
                        ) {

                            statusElement.classList.add(
                                "in-progress"
                            );

                        }

                        else if (
                            editedTask.status ===
                            "Completed"
                        ) {

                            statusElement.classList.add(
                                "completed"
                            );

                        }

                    }

                }
            );

        }
    );

}


// =============================================================
// CLOSE SUBMIT MODAL WHEN CLICKING OUTSIDE
// =============================================================

document.addEventListener(
    "click",
    function (e) {

        const submitModal =
            document.getElementById(
                "submitModal"
            );


        if (
            submitModal &&
            e.target === submitModal
        ) {

            closeSubmitModal();

        }


        const editModal =
            document.getElementById(
                "editTaskModal"
            );


        if (
            editModal &&
            e.target === editModal
        ) {

            closeEditTaskModal();

        }

    }
);


// =============================================================
// ESC KEY
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


        const submitModal =
            document.getElementById(
                "submitModal"
            );


        if (
            submitModal &&
            submitModal.classList.contains(
                "active"
            )
        ) {

            closeSubmitModal();

        }


        const editModal =
            document.getElementById(
                "editTaskModal"
            );


        if (
            editModal &&
            editModal.classList.contains(
                "active"
            )
        ) {

            closeEditTaskModal();

        }

    }
);