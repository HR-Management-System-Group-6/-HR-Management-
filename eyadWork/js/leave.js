function displayLeave() {

    const content = document.getElementById("content");

    if (!content) {
        console.error("Element #content not found.");
        return;
    }

    // =====================================================
    // GET LOGGED IN USER
    // =====================================================

    let user = {};

    try {
        user =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            ) || {};
    } catch (error) {
        console.error(
            "Error reading loggedInUser:",
            error
        );
    }

    const role =
        String(user?.role || "").toLowerCase();


    // =====================================================
    // COMMON HELPERS
    // =====================================================

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function getInitials(name) {

        const parts =
            String(name || "Employee")
                .trim()
                .split(/\s+/)
                .filter(Boolean);

        if (parts.length === 0) {
            return "EM";
        }

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


    function formatDate(dateString) {

        if (!dateString) {
            return "-";
        }

        const date =
            new Date(
                dateString + "T00:00:00"
            );

        if (isNaN(date.getTime())) {
            return "-";
        }

        return date.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        );
    }


    function formatDateRange(
        startDate,
        endDate
    ) {

        if (!startDate || !endDate) {
            return "-";
        }

        if (startDate === endDate) {
            return formatDate(startDate);
        }

        const start =
            new Date(
                startDate + "T00:00:00"
            );

        const end =
            new Date(
                endDate + "T00:00:00"
            );

        if (
            start.getFullYear() ===
            end.getFullYear()
        ) {

            const startText =
                start.toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit"
                    }
                );

            const endText =
                end.toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    }
                );

            return `${startText} – ${endText}`;
        }

        return (
            `${formatDate(startDate)} – ${formatDate(endDate)}`
        );
    }


    function calculateDays(
        startDate,
        endDate
    ) {

        if (!startDate || !endDate) {
            return 0;
        }

        const start =
            new Date(
                startDate + "T00:00:00"
            );

        const end =
            new Date(
                endDate + "T00:00:00"
            );

        if (
            isNaN(start.getTime()) ||
            isNaN(end.getTime())
        ) {
            return 0;
        }

        const difference =
            end - start;

        return (
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1
        );
    }


    // =====================================================
    // EMPLOYEE
    // =====================================================

    if (role === "employee") {

        const userKey =
            user?.id ||
            user?.email ||
            user?.name ||
            "employee";

        const storageKey =
            `leaveRequests_${userKey}`;


        // =================================================
        // GET EMPLOYEE REQUESTS
        // =================================================

        let requests = [];

        try {

            requests =
                JSON.parse(
                    localStorage.getItem(storageKey)
                ) || [];

        } catch (error) {

            console.error(
                "Error reading employee leave requests:",
                error
            );

            requests = [];
        }


        // =================================================
        // NORMALIZE REQUEST DATA
        // =================================================

        requests =
            requests.map(request => {

                return {

                    ...request,

                    employeeId:
                        request.employeeId ||
                        user?.id ||
                        user?.email ||
                        user?.name,

                    employeeName:
                        request.employeeName ||
                        user?.name ||
                        "Unknown Employee",

                    employeeEmail:
                        request.employeeEmail ||
                        user?.email ||
                        "",

                    status:
                        request.status ||
                        "Pending"
                };
            });


        localStorage.setItem(
            storageKey,
            JSON.stringify(requests)
        );


        // =================================================
        // STATUS COUNT
        // =================================================

        function countStatus(status) {

            return requests.filter(
                request =>
                    String(
                        request.status || ""
                    ).toLowerCase() ===
                    status.toLowerCase()
            ).length;
        }


        // =================================================
        // EMPLOYEE HTML
        // =================================================

        content.innerHTML = `

            <section class="leave-page">

                <!-- HERO -->
                <div class="leave-hero">

                    <div class="hero-background-circle"></div>

                    <div class="hero-content">

                        <div class="hero-label">
                            <i class="bi bi-calendar-check"></i>
                            MY WORKSPACE / LEAVE
                        </div>

                        <h1>
                            Leave requests
                        </h1>

                        <p>
                            Request time off, manage your leave
                            and track every request in one place.
                        </p>

                    </div>


                    <div class="hero-user">

                        <div class="hero-avatar">
                            ${getInitials(user?.name)}
                        </div>

                        <div class="hero-user-info">

                            <strong>
                                ${escapeHtml(
                                    user?.name ||
                                    "Employee"
                                )}
                            </strong>

                            <span>
                                Employee
                            </span>

                        </div>

                        <i class="bi bi-person-check"></i>

                    </div>

                </div>


                <!-- STATISTICS -->

                <div class="leave-stats">

                    <div class="stat-card">

                        <div class="stat-icon blue">
                            <i class="bi bi-files"></i>
                        </div>

                        <div class="stat-info">

                            <span>
                                Total requests
                            </span>

                            <strong id="totalRequests">
                                ${requests.length}
                            </strong>

                        </div>

                    </div>


                    <div class="stat-card">

                        <div class="stat-icon orange">
                            <i class="bi bi-clock-history"></i>
                        </div>

                        <div class="stat-info">

                            <span>
                                Pending
                            </span>

                            <strong id="pendingRequests">
                                ${countStatus("Pending")}
                            </strong>

                        </div>

                    </div>


                    <div class="stat-card">

                        <div class="stat-icon green">
                            <i class="bi bi-check-circle"></i>
                        </div>

                        <div class="stat-info">

                            <span>
                                Approved
                            </span>

                            <strong id="approvedRequests">
                                ${countStatus("Approved")}
                            </strong>

                        </div>

                    </div>

                </div>


                <!-- MAIN CONTENT -->

                <div class="leave-layout">


                    <!-- NEW REQUEST -->

                    <div class="leave-card request-card">

                        <div class="card-top">

                            <div>

                                <span class="card-label">
                                    REQUEST TIME OFF
                                </span>

                                <h2>
                                    New request
                                </h2>

                                <p>
                                    Fill in the information below
                                    to submit a leave request.
                                </p>

                            </div>

                            <div class="card-icon">
                                <i class="bi bi-calendar-plus"></i>
                            </div>

                        </div>


                        <form id="leaveRequestForm">

                            <!-- LEAVE TYPE -->

                            <div class="form-group">

                                <label for="leaveType">
                                    Leave type
                                </label>

                                <div class="input-wrapper">

                                    <select id="leaveType">

                                        <option value="Annual leave">
                                            Annual leave
                                        </option>

                                        <option value="Sick leave">
                                            Sick leave
                                        </option>

                                        <option value="Emergency leave">
                                            Emergency leave
                                        </option>

                                        <option value="Unpaid leave">
                                            Unpaid leave
                                        </option>

                                    </select>

                                    <i class="bi bi-chevron-down arrow"></i>

                                </div>

                            </div>


                            <!-- DATES -->

                            <div class="date-grid">

                                <div class="form-group">

                                    <label for="startDate">
                                        Start date
                                    </label>

                                    <div class="input-wrapper">

                                        <input
                                            type="date"
                                            id="startDate"
                                        >

                                    </div>

                                </div>


                                <div class="form-group">

                                    <label for="endDate">
                                        End date
                                    </label>

                                    <div class="input-wrapper">

                                        <input
                                            type="date"
                                            id="endDate"
                                        >

                                    </div>

                                </div>

                            </div>


                            <!-- REASON -->

                            <div class="form-group">

                                <div class="reason-label">

                                    <label for="reason">
                                        Reason
                                    </label>

                                    <span>
                                        Optional
                                    </span>

                                </div>

                                <textarea
                                    id="reason"
                                    placeholder="Write a short reason..."
                                ></textarea>

                            </div>


                            <!-- INFO -->

                            <div class="request-info">

                                <i class="bi bi-info-circle"></i>

                                <span>
                                    Your request will be saved
                                    with <strong>Pending</strong>
                                    status until HR reviews it.
                                </span>

                            </div>


                            <!-- BUTTON -->

                            <button
                                type="submit"
                                id="submitRequest"
                                class="submit-btn"
                            >

                                <span>
                                    Submit request
                                </span>

                                <i class="bi bi-arrow-right"></i>

                            </button>

                        </form>

                    </div>


                    <!-- MY REQUESTS -->

                    <div class="leave-card requests-card">

                        <div class="card-top requests-top">

                            <div>

                                <span class="card-label">
                                    REQUEST HISTORY
                                </span>

                                <h2>
                                    My requests
                                </h2>

                                <p>
                                    Track the status of your
                                    submitted leave requests.
                                </p>

                            </div>

                            <div
                                class="request-count"
                                id="requestCount"
                            >
                                ${requests.length}
                                ${
                                    requests.length === 1
                                        ? "request"
                                        : "requests"
                                }
                            </div>

                        </div>


                        <div class="requests-table">

                            <div class="table-head">

                                <span>
                                    REQUEST
                                </span>

                                <span>
                                    DATES
                                </span>

                                <span>
                                    STATUS
                                </span>

                            </div>


                            <div id="requestsContainer">
                                ${renderEmployeeRequests(requests)}
                            </div>

                        </div>

                    </div>

                </div>

                <!-- =================================================
     LEAVE LIMIT MODAL
     ================================================= -->

<div class="leave-limit-overlay" id="leaveLimitModal">

    <div class="leave-limit-modal">

        <div class="leave-limit-icon">
            <i class="bi bi-calendar-x"></i>
        </div>

        <h2>Leave limit reached</h2>

        <p>
            You have already submitted the maximum
            of <strong>3 leave requests</strong>.
        </p>

        <span>
            You cannot submit another leave request.
        </span>

        <button
            type="button"
            id="closeLeaveLimitModal"
            class="leave-limit-btn"
        >
            <i class="bi bi-check-lg"></i>
            Got it
        </button>

    </div>

</div>

            </section>
        `;


        // =================================================
        // RENDER EMPLOYEE REQUESTS
        // =================================================

        function renderEmployeeRequests(
            requestList
        ) {

            if (
                !requestList ||
                requestList.length === 0
            ) {

                return `

                    <div class="empty-state">

                        <div class="empty-icon">
                            <i class="bi bi-calendar-x"></i>
                        </div>

                        <h3>
                            No requests yet
                        </h3>

                        <p>
                            Your leave requests will
                            appear here.
                        </p>

                    </div>

                `;
            }


            return requestList
                .slice()
                .reverse()
                .map(request => {

                    const status =
                        request.status ||
                        "Pending";

                    const statusClass =
                        status.toLowerCase();

                    let statusIcon =
                        "bi-clock-fill";

                    if (status === "Approved") {

                        statusIcon =
                            "bi-check-circle-fill";
                    }

                    if (status === "Rejected") {

                        statusIcon =
                            "bi-x-circle-fill";
                    }


                    const days =
                        calculateDays(
                            request.startDate,
                            request.endDate
                        );


                    return `

                        <div class="request-row">

                            <div class="request-info-cell">

                                <div class="request-icon">
                                    <i class="bi bi-calendar-event"></i>
                                </div>

                                <div class="request-text">

                                    <strong>
                                        ${escapeHtml(
                                            request.leaveType ||
                                            "-"
                                        )}
                                    </strong>

                                    <span>
                                        ${escapeHtml(
                                            request.reason ||
                                            "No reason provided"
                                        )}
                                    </span>

                                </div>

                            </div>


                            <div class="date-cell">

                                <strong>
                                    ${formatDateRange(
                                        request.startDate,
                                        request.endDate
                                    )}
                                </strong>

                                <span>
                                    ${days}
                                    ${
                                        days === 1
                                            ? "day"
                                            : "days"
                                    }
                                </span>

                            </div>


                            <div>

                                <span
                                    class="status ${statusClass}"
                                >

                                    <i
                                        class="bi ${statusIcon}"
                                    ></i>

                                    ${escapeHtml(status)}

                                </span>

                            </div>

                        </div>
                    `;

                })
                .join("");
        }


        // =================================================
        // UPDATE EMPLOYEE STATS
        // =================================================

        function updateStats() {

            const total =
                document.getElementById(
                    "totalRequests"
                );

            const pending =
                document.getElementById(
                    "pendingRequests"
                );

            const approved =
                document.getElementById(
                    "approvedRequests"
                );

            const count =
                document.getElementById(
                    "requestCount"
                );


            if (total) {

                total.textContent =
                    requests.length;
            }


            if (pending) {

                pending.textContent =
                    countStatus("Pending");
            }


            if (approved) {

                approved.textContent =
                    countStatus("Approved");
            }


            if (count) {

                count.textContent =
                    `${requests.length} ${
                        requests.length === 1
                            ? "request"
                            : "requests"
                    }`;
            }
        }


        // =================================================
        // TOAST
        // =================================================

        function showToast() {

            const old =
                document.querySelector(
                    ".leave-toast"
                );

            if (old) {
                old.remove();
            }


            const toast =
                document.createElement("div");

            toast.className =
                "leave-toast";


            toast.innerHTML = `

                <div class="toast-icon">
                    <i class="bi bi-check2"></i>
                </div>

                <div class="toast-content">

                    <strong>
                        Request submitted
                    </strong>

                    <span>
                        Your request was saved successfully.
                    </span>

                </div>

            `;


            document.body.appendChild(toast);


            setTimeout(() => {

                toast.classList.add("show");

            }, 20);


            setTimeout(() => {

                toast.classList.remove("show");

                setTimeout(() => {

                    toast.remove();

                }, 300);

            }, 3000);
        }


// =================================================
// LEAVE LIMIT MODAL
// =================================================

function showLeaveLimitModal() {

    const modal =
        document.getElementById("leaveLimitModal");

    if (!modal) {
        console.error("Leave limit modal not found!");
        return;
    }

    modal.style.display = "flex";

    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}


function closeLeaveLimitModal() {

    const modal =
        document.getElementById("leaveLimitModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    setTimeout(() => {

        modal.style.display = "none";

    }, 200);
}


const closeLeaveLimitBtn =
    document.getElementById(
        "closeLeaveLimitModal"
    );


if (closeLeaveLimitBtn) {

    closeLeaveLimitBtn.addEventListener(
        "click",
        closeLeaveLimitModal
    );
}

        // =================================================
        // SUBMIT REQUEST
        // =================================================

        const form =
            document.getElementById(
                "leaveRequestForm"
            );

        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


             // =================================================
            // CHECK LEAVE REQUEST LIMIT
            // =================================================



                const MAX_LEAVE_REQUESTS = 3;

                // Read the latest requests directly from localStorage
                let latestRequests = [];

                try {
                    latestRequests =
                        JSON.parse(
                            localStorage.getItem(storageKey)
                        ) || [];
                } catch (error) {
                    latestRequests = [];
                }

                console.log(
                    "Current leave requests:",
                    latestRequests.length
                );

                // Stop the 4th request
                if (latestRequests.length >= MAX_LEAVE_REQUESTS) {

                    showLeaveLimitModal();

                    return;
                }

                // Keep the main requests array synchronized
                requests = latestRequests;

                    const leaveType =
                        document.getElementById(
                            "leaveType"
                        ).value;


                    const startDate =
                        document.getElementById(
                            "startDate"
                        ).value;


                    const endDate =
                        document.getElementById(
                            "endDate"
                        ).value;


                    const reason =
                        document.getElementById(
                            "reason"
                        ).value.trim();


                    // Validation

                    if (!startDate || !endDate) {

                        alert(
                            "Please select start and end dates."
                        );

                        return;
                    }


                    if (endDate < startDate) {

                        alert(
                            "End date cannot be before start date."
                        );

                        return;
                    }


                    // Create request

                    const newRequest = {

                        id: Date.now(),

                        employeeId:
                            user?.id ||
                            user?.email ||
                            user?.name,

                        employeeName:
                            user?.name ||
                            "Unknown Employee",

                        employeeEmail:
                            user?.email ||
                            "",

                        leaveType:
                            leaveType,

                        startDate:
                            startDate,

                        endDate:
                            endDate,

                        reason:
                            reason ||
                            "No reason provided.",

                        status:
                            "Pending"
                    };


                    // Add request

                    requests.push(
                        newRequest
                    );


                    // Save request

                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(requests)
                    );


                    // Refresh requests

                    const container =
                        document.getElementById(
                            "requestsContainer"
                        );

                    if (container) {

                        container.innerHTML =
                            renderEmployeeRequests(
                                requests
                            );
                    }


                    updateStats();


                    // Clear form

                    form.reset();


                    // Toast

                    showToast();

                }
            );
        }

    }


    // =====================================================
    // HR
    // =====================================================

    else if (role === "hr") {

        let allRequests = [];

        let selectedRequestKey = null;


        // =================================================
        // GET ALL LEAVE REQUESTS
        // =================================================

        function getAllRequests() {

            const result = [];


            /*
                IMPORTANT:

                Every employee stores requests like:

                leaveRequests_employee@example.com
                leaveRequests_ahmad@example.com
                leaveRequests_sara@example.com

                We read ALL keys that start with:

                leaveRequests_

                Then combine all requests
                into one array for HR.
            */


            for (
                let i = 0;
                i < localStorage.length;
                i++
            ) {

                const key =
                    localStorage.key(i);


                if (
                    !key ||
                    !key.startsWith(
                        "leaveRequests_"
                    )
                ) {
                    continue;
                }


                let employeeRequests = [];


                try {

                    employeeRequests =
                        JSON.parse(
                            localStorage.getItem(key)
                        ) || [];

                } catch (error) {

                    console.error(
                        "Error reading:",
                        key,
                        error
                    );

                    employeeRequests = [];
                }


                if (
                    !Array.isArray(
                        employeeRequests
                    )
                ) {
                    continue;
                }


                employeeRequests.forEach(
                    request => {

                        if (!request) {
                            return;
                        }


                        /*
                            Create unique key.

                            This is important because
                            different employees can have
                            the same request id.
                        */

                        const requestId =
                            request.id ||
                            Date.now();


                        result.push({

                            ...request,

                            id:
                                requestId,

                            employeeName:
                                request.employeeName ||
                                "Unknown Employee",

                            employeeEmail:
                                request.employeeEmail ||
                                "",

                            employeeId:
                                request.employeeId ||
                                key.replace(
                                    "leaveRequests_",
                                    ""
                                ),

                            status:
                                request.status ||
                                "Pending",

                            storageKey:
                                key,

                            requestKey:
                                `${key}_${requestId}`

                        });

                    }
                );

            }


            /*
                Sort newest first
            */

            result.sort(
                (a, b) =>
                    Number(b.id || 0) -
                    Number(a.id || 0)
            );


            return result;
        }


        // =================================================
        // LOAD ALL REQUESTS
        // =================================================

        allRequests =
            getAllRequests();


        if (allRequests.length > 0) {

            selectedRequestKey =
                allRequests[0].requestKey;
        }


        // =================================================
        // HR HTML
        // =================================================

content.innerHTML = `

<section class="hr-leave-page">

    <!-- =========================================
         REQUESTS PAGE
    ========================================== -->

    <div id="leaveRequestsPage">

        <!-- PAGE HEADER -->

        <div class="hr-heading">

            <span>
                HR / LEAVE MANAGEMENT
            </span>

            <h1>
                Leave requests
            </h1>

            <p>
                Review employee leave requests, check details,
                and manage approval status from one place.
            </p>

        </div>


        <!-- FILTERS -->

        <div class="hr-filters">

            <div class="hr-search">

                <i class="bi bi-search"></i>

                <input
                    id="employeeSearch"
                    type="text"
                    placeholder="Search by employee, email or leave type..."
                >

            </div>


            <select id="statusFilter">

                <option value="All">
                    All statuses
                </option>

                <option value="Pending">
                    Pending
                </option>

                <option value="Approved">
                    Approved
                </option>

                <option value="Rejected">
                    Rejected
                </option>

            </select>

        </div>


        <!-- REQUEST TABLE -->

        <div class="hr-table-card">

            <div class="hr-card-header">

                <div>

                    <span>
                        EMPLOYEE LEAVE MANAGEMENT
                    </span>

                    <h2>
                        All leave requests
                    </h2>

                </div>


                <strong id="requestCount">
                    ${allRequests.length}
                    ${
                        allRequests.length === 1
                            ? "request"
                            : "requests"
                    }
                </strong>

            </div>


            <div class="hr-table-wrapper">

                <table class="hr-table">

                    <thead>

                        <tr>

                            <th>
                                Employee
                            </th>

                            <th>
                                Leave type
                            </th>

                            <th>
                                Dates
                            </th>

                            <th>
                                Days
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody id="requestsTableBody"></tbody>

                </table>

            </div>

        </div>

    </div>



    <!-- =========================================
         DETAILS PAGE
    ========================================== -->

    <div
        id="leaveDetailsPage"
        class="leave-details-page"
        style="display: none;"
    >

        <!-- BACK BUTTON -->

        <button
            type="button"
            id="backToRequests"
            class="back-to-requests"
        >

            <i class="bi bi-arrow-left"></i>

            <span>
                Back to requests
            </span>

        </button>


        <!-- DETAILS CARD -->

        <div class="hr-details">

            <div class="details-heading">

                <div>

                    <span>
                        REQUEST DETAILS
                    </span>

                    <h2>
                        Leave information
                    </h2>

                </div>


                <span
                    id="detailsStatus"
                    class="status pending"
                >
                    Pending
                </span>

            </div>


            <div class="details-grid">

                <div>

                    <span>
                        EMPLOYEE
                    </span>

                    <strong id="detailEmployee">
                        -
                    </strong>

                </div>


                <div>

                    <span>
                        EMAIL
                    </span>

                    <strong id="detailEmail">
                        -
                    </strong>

                </div>


                <div>

                    <span>
                        LEAVE TYPE
                    </span>

                    <strong id="detailLeaveType">
                        -
                    </strong>

                </div>


                <div>

                    <span>
                        START DATE
                    </span>

                    <strong id="detailStartDate">
                        -
                    </strong>

                </div>


                <div>

                    <span>
                        END DATE
                    </span>

                    <strong id="detailEndDate">
                        -
                    </strong>

                </div>


                <div>

                    <span>
                        TOTAL DAYS
                    </span>

                    <strong id="detailDays">
                        -
                    </strong>

                </div>

            </div>


            <!-- REASON -->

            <div class="detail-reason">

                <span>
                    REASON
                </span>

                <p id="detailReason">
                    No reason provided.
                </p>

            </div>


            <!-- ACTIONS -->

            <div class="hr-actions">

                <button
                    id="rejectBtn"
                    class="reject-btn"
                    type="button"
                >

                    <i class="bi bi-x-lg"></i>

                    Reject

                </button>


                <button
                    id="approveBtn"
                    class="approve-btn"
                    type="button"
                >

                    <i class="bi bi-check-lg"></i>

                    Approve

                </button>

            </div>

        </div>

    </div>

</section>

`;

        // =================================================
        // FILTER REQUESTS
        // =================================================

        function getFilteredRequests() {

            const searchInput =
                document.getElementById(
                    "employeeSearch"
                );

            const statusInput =
                document.getElementById(
                    "statusFilter"
                );


            const search =
                searchInput
                    ? searchInput.value
                        .toLowerCase()
                        .trim()
                    : "";


            const status =
                statusInput
                    ? statusInput.value
                    : "All";


            return allRequests.filter(
                request => {

                    const name =
                        String(
                            request.employeeName ||
                            ""
                        ).toLowerCase();


                    const email =
                        String(
                            request.employeeEmail ||
                            ""
                        ).toLowerCase();


                    const leaveType =
                        String(
                            request.leaveType ||
                            ""
                        ).toLowerCase();


                    const matchesSearch =
                        name.includes(search) ||
                        email.includes(search) ||
                        leaveType.includes(search);


                    const matchesStatus =
                        status === "All" ||
                        String(
                            request.status ||
                            "Pending"
                        ).toLowerCase() ===
                        status.toLowerCase();


                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );
        }


        // =================================================
        // RENDER TABLE
        // =================================================

        function renderTable(list) {

            const tbody =
                document.getElementById(
                    "requestsTableBody"
                );


            const count =
                document.getElementById(
                    "requestCount"
                );


            if (!tbody) {
                return;
            }


            if (count) {

                count.textContent =
                    `${list.length} ${
                        list.length === 1
                            ? "request"
                            : "requests"
                    }`;
            }


            if (list.length === 0) {

                tbody.innerHTML = `

                    <tr>

                        <td
                            colspan="6"
                            class="hr-empty"
                        >

                            <div class="empty-icon">
                                <i class="bi bi-calendar-x"></i>
                            </div>

                            <strong>
                                No leave requests found
                            </strong>

                            <span>
                                There are no requests
                                matching your filters.
                            </span>

                        </td>

                    </tr>

                `;

                return;
            }


            tbody.innerHTML =
                list.map(request => {

                    const selected =
                        request.requestKey ===
                        selectedRequestKey
                            ? "selected"
                            : "";


                    const status =
                        request.status ||
                        "Pending";


                    const statusClass =
                        status.toLowerCase();


                    const days =
                        calculateDays(
                            request.startDate,
                            request.endDate
                        );


                    return `

                        <tr
                            class="${selected}"
                        >

                            <!-- EMPLOYEE -->

                            <td>

                                <div
                                    class="employee-cell"
                                >

                                    <div
                                        class="employee-avatar"
                                    >
                                        ${getInitials(
                                            request.employeeName
                                        )}
                                    </div>


                                    <div>

                                        <strong>
                                            ${escapeHtml(
                                                request.employeeName ||
                                                "Unknown Employee"
                                            )}
                                        </strong>

                                        <span>
                                            ${escapeHtml(
                                                request.employeeEmail ||
                                                ""
                                            )}
                                        </span>

                                    </div>

                                </div>

                            </td>


                            <!-- LEAVE TYPE -->

                            <td>

                                <strong>
                                    ${escapeHtml(
                                        request.leaveType ||
                                        "-"
                                    )}
                                </strong>

                            </td>


                            <!-- DATES -->

                            <td>

                                <span>
                                    ${formatDateRange(
                                        request.startDate,
                                        request.endDate
                                    )}
                                </span>

                            </td>


                            <!-- DAYS -->

                            <td>

                                <span>
                                    ${days}
                                    ${
                                        days === 1
                                            ? " day"
                                            : " days"
                                    }
                                </span>

                            </td>


                            <!-- STATUS -->

                            <td>

                                <span
                                    class="status ${statusClass}"
                                >
                                    ${escapeHtml(status)}
                                </span>

                            </td>


                            <!-- ACTION -->

                            <td>

                                <button
                                    class="view-btn"
                                    data-key="${escapeHtml(
                                        request.requestKey
                                    )}"
                                >

                                    View

                                    <i
                                        class="bi bi-arrow-right"
                                    ></i>

                                </button>

                            </td>

                        </tr>

                    `;

                }).join("");


            // =================================================
            // VIEW BUTTONS
            // =================================================

// =================================================
// VIEW BUTTONS
// =================================================

document
    .querySelectorAll(".view-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                selectedRequestKey =
                    this.dataset.key;


                const request =
                    allRequests.find(
                        item =>
                            item.requestKey ===
                            selectedRequestKey
                    );


                if (request) {

                    // Show selected request details
                    showDetails(request);

                    // Hide requests page
                    const requestsPage =
                        document.getElementById(
                            "leaveRequestsPage"
                        );

                    if (requestsPage) {

                        requestsPage.style.display =
                            "none";
                    }


                    // Show details page
                    const detailsPage =
                        document.getElementById(
                            "leaveDetailsPage"
                        );

                    if (detailsPage) {

                        detailsPage.style.display =
                            "block";

                        // Restart animation
                        detailsPage.classList.remove(
                            "active"
                        );

                        void detailsPage.offsetWidth;

                        detailsPage.classList.add(
                            "active"
                        );
                    }


                    // Scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }
        );

    });
        }


        // =================================================
        // SHOW DETAILS
        // =================================================

// =================================================
// SHOW DETAILS
// =================================================

function showDetails(request) {

    if (!request) {
        return;
    }


    const employee =
        document.getElementById(
            "detailEmployee"
        );

    const email =
        document.getElementById(
            "detailEmail"
        );

    const leaveType =
        document.getElementById(
            "detailLeaveType"
        );

    const start =
        document.getElementById(
            "detailStartDate"
        );

    const end =
        document.getElementById(
            "detailEndDate"
        );

    const days =
        document.getElementById(
            "detailDays"
        );

    const reason =
        document.getElementById(
            "detailReason"
        );

    const statusElement =
        document.getElementById(
            "detailsStatus"
        );


    // EMPLOYEE

    if (employee) {

        employee.textContent =
            request.employeeName ||
            "Unknown Employee";
    }


    // EMAIL

    if (email) {

        email.textContent =
            request.employeeEmail ||
            "-";
    }


    // LEAVE TYPE

    if (leaveType) {

        leaveType.textContent =
            request.leaveType ||
            "-";
    }


    // START DATE

    if (start) {

        start.textContent =
            formatDate(
                request.startDate
            );
    }


    // END DATE

    if (end) {

        end.textContent =
            formatDate(
                request.endDate
            );
    }


    // TOTAL DAYS

    if (days) {

        const totalDays =
            calculateDays(
                request.startDate,
                request.endDate
            );

        days.textContent =
            totalDays > 0
                ? `${totalDays} ${
                    totalDays === 1
                        ? "day"
                        : "days"
                }`
                : "-";
    }


    // REASON

    if (reason) {

        reason.textContent =
            request.reason ||
            "No reason provided.";
    }


    // STATUS

    if (statusElement) {

        const status =
            request.status ||
            "Pending";


        statusElement.textContent =
            status;


        statusElement.className =
            `status ${
                status.toLowerCase()
            }`;
    }


    // =================================================
    // BUTTON STATES
    // =================================================

    const approve =
        document.getElementById(
            "approveBtn"
        );

    const reject =
        document.getElementById(
            "rejectBtn"
        );


    if (approve) {

        approve.disabled =
            request.status ===
            "Approved";
    }


    if (reject) {

        reject.disabled =
            request.status ===
            "Rejected";
    }

}


// =================================================
// BACK TO REQUESTS
// =================================================

const backToRequests =
    document.getElementById(
        "backToRequests"
    );


if (backToRequests) {

    backToRequests.addEventListener(
        "click",
        function () {

            const detailsPage =
                document.getElementById(
                    "leaveDetailsPage"
                );

            const requestsPage =
                document.getElementById(
                    "leaveRequestsPage"
                );


            // Hide details

            if (detailsPage) {

                detailsPage.style.display =
                    "none";

                detailsPage.classList.remove(
                    "active"
                );
            }


            // Show table

            if (requestsPage) {

                requestsPage.style.display =
                    "block";

                requestsPage.classList.remove(
                    "page-back"
                );

                void requestsPage.offsetWidth;

                requestsPage.classList.add(
                    "page-back"
                );
            }


            // Scroll top

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


        // =================================================
        // UPDATE REQUEST STATUS
        // =================================================

        function updateRequestStatus(
            newStatus
        ) {

            if (!selectedRequestKey) {

                alert(
                    "Please select a leave request first."
                );

                return;
            }


            const request =
                allRequests.find(
                    item =>
                        item.requestKey ===
                        selectedRequestKey
                );


            if (!request) {

                alert(
                    "Request not found."
                );

                return;
            }


            // =================================================
            // READ EMPLOYEE REQUESTS
            // =================================================

            let employeeRequests = [];


            try {

                employeeRequests =
                    JSON.parse(
                        localStorage.getItem(
                            request.storageKey
                        )
                    ) || [];

            } catch (error) {

                console.error(
                    "Error reading employee requests:",
                    error
                );

                employeeRequests = [];
            }


            if (
                !Array.isArray(
                    employeeRequests
                )
            ) {

                employeeRequests = [];
            }


            // =================================================
            // FIND REQUEST
            // =================================================

            const index =
                employeeRequests.findIndex(
                    item =>
                        String(item.id) ===
                        String(request.id)
                );


            if (index === -1) {

                alert(
                    "Original request was not found."
                );

                return;
            }


            // =================================================
            // UPDATE STATUS
            // =================================================

            employeeRequests[index].status =
                newStatus;


            // =================================================
            // SAVE BACK TO EMPLOYEE STORAGE
            // =================================================

            localStorage.setItem(
                request.storageKey,
                JSON.stringify(
                    employeeRequests
                )
            );


            // =================================================
            // UPDATE CURRENT ARRAY
            // =================================================

            request.status =
                newStatus;


            // =================================================
            // REFRESH EVERYTHING
            // =================================================

            showDetails(
                request
            );


            renderTable(
                getFilteredRequests()
            );
        }


        // =================================================
        // APPROVE BUTTON
        // =================================================

        const approveBtn =
            document.getElementById(
                "approveBtn"
            );


        if (approveBtn) {

            approveBtn.addEventListener(
                "click",
                function () {

                    updateRequestStatus(
                        "Approved"
                    );

                }
            );
        }


        // =================================================
        // REJECT BUTTON
        // =================================================

        const rejectBtn =
            document.getElementById(
                "rejectBtn"
            );


        if (rejectBtn) {

            rejectBtn.addEventListener(
                "click",
                function () {

                    updateRequestStatus(
                        "Rejected"
                    );

                }
            );
        }


        // =================================================
        // SEARCH
        // =================================================

        const search =
            document.getElementById(
                "employeeSearch"
            );


        if (search) {

            search.addEventListener(
                "input",
                function () {

                    const filtered =
                        getFilteredRequests();


                    renderTable(
                        filtered
                    );

                }
            );
        }


        // =================================================
        // STATUS FILTER
        // =================================================

        const statusFilter =
            document.getElementById(
                "statusFilter"
            );


        if (statusFilter) {

            statusFilter.addEventListener(
                "change",
                function () {

                    const filtered =
                        getFilteredRequests();


                    renderTable(
                        filtered
                    );

                }
            );
        }


        // =================================================
        // INITIAL TABLE
        // =================================================

        renderTable(
            allRequests
        );



    }


    // =====================================================
    // NO ROLE
    // =====================================================

    else {

        console.log(
            "User role not found"
        );

        window.location.href =
            "login.html";
    }

}