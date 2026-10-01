function displayLeave() {

    let content = document.getElementById("content");

    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    let user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    // =========================================
    // GET USER ROLE
    // =========================================

    let role = user?.role?.toLowerCase();


    // =====================================================
    // =====================================================
    // ===================== EMPLOYEE =======================
    // =====================================================
    // =====================================================

    if (role === "employee") {

        // =========================================
        // USER INFORMATION
        // =========================================

        let userKey =
            user?.id ||
            user?.email ||
            user?.name ||
            "employee";


        // Each employee has his own storage key
        let storageKey =
            `leaveRequests_${userKey}`;


        // =========================================
        // INITIAL REQUESTS
        // =========================================

        let initialRequests = [




        ];


        // =========================================
        // GET REQUESTS FROM LOCAL STORAGE
        // =========================================

        let requests = JSON.parse(
            localStorage.getItem(storageKey)
        );

        if (!requests) {

            requests = [];

            localStorage.setItem(
                storageKey,
                JSON.stringify(requests)
            );
        }


        // =========================================
        // MIGRATE OLD REQUESTS
        // =========================================
        // If old requests don't have employee
        // information, add it automatically.
        // =========================================

        if (requests) {

            requests = requests.map(request => {

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
                        ""

                };

            });


            // Save migrated requests

            localStorage.setItem(
                storageKey,
                JSON.stringify(requests)
            );
        }


        // =========================================
        // FIRST TIME
        // =========================================

        if (!requests) {

            requests = initialRequests;


            localStorage.setItem(

                storageKey,

                JSON.stringify(requests)

            );
        }


        // =========================================
        // DISPLAY EMPLOYEE PAGE
        // =========================================

        content.innerHTML = `

            <section class="content">

                <div class="page-heading">

                    <span class="small-title">
                        MY WORKSPACE / LEAVE
                    </span>

                    <h1>
                        Leave requests
                    </h1>

                    <p>
                        Request time off or an early departure
                        and track your requests.
                    </p>

                </div>


                <!-- ================= CARDS ================= -->

                <div class="cards-container">


                    <!-- ================= NEW REQUEST ================= -->

                    <div class="card request-card">

                        <h2>
                            New request
                        </h2>


                        <!-- Leave Type -->

                        <div class="form-group">

                            <label>
                                Leave type
                            </label>

                            <div class="select-wrapper">

                                <select id="leaveType">

                                    <option>
                                        Annual leave
                                    </option>

                                    <option>
                                        Sick leave
                                    </option>

                                    <option>
                                        Emergency leave
                                    </option>

                                    <option>
                                        Unpaid leave
                                    </option>

                                </select>

                                <i class="bi bi-chevron-down"></i>

                            </div>

                        </div>


                        <!-- Dates -->

                        <div class="date-row">

                            <div class="form-group">

                                <label>
                                    Start date
                                </label>

                                <div class="input-icon">

                                    <input
                                        type="date"
                                        id="startDate"
                                    >

                                </div>

                            </div>


                            <div class="form-group">

                                <label>
                                    End date
                                </label>

                                <div class="input-icon">

                                    <input
                                        type="date"
                                        id="endDate"
                                    >

                                </div>

                            </div>

                        </div>


                        <!-- Reason -->

                        <div class="form-group">

                            <label>
                                Reason
                            </label>

                            <textarea
                                id="reason"
                                placeholder="Write a short reason..."
                            ></textarea>

                        </div>


                        <!-- Submit -->

                        <button
                            class="submit-btn"
                            id="submitRequest"
                        >
                            Submit request
                        </button>

                    </div>


                    <!-- ================= MY REQUESTS ================= -->

                    <div class="card requests-card">

                        <div class="requests-header">

                            <h2>
                                My requests
                            </h2>

                            <span id="requestCount">
                                ${requests.length} requests
                            </span>

                        </div>


                        <div class="table-header">

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

            </section>

        `;


        // =========================================
        // SUBMIT REQUEST
        // =========================================

        document
            .getElementById("submitRequest")
            .addEventListener(
                "click",
                function () {

                    let leaveType =
                        document
                            .getElementById("leaveType")
                            .value;


                    let startDate =
                        document
                            .getElementById("startDate")
                            .value;


                    let endDate =
                        document
                            .getElementById("endDate")
                            .value;


                    let reason =
                        document
                            .getElementById("reason")
                            .value
                            .trim();


                    // =================================
                    // VALIDATION
                    // =================================

                    if (
                        !startDate ||
                        !endDate ||
                        !reason
                    ) {

                        alert(
                            "Please fill in all fields."
                        );

                        return;
                    }


                    // =================================
                    // DATE VALIDATION
                    // =================================

                    if (endDate < startDate) {

                        alert(
                            "End date cannot be before start date."
                        );

                        return;
                    }


                    // =================================
                    // CREATE NEW REQUEST
                    // =================================

                    let newRequest = {

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
                            reason,

                        status:
                            "Pending"

                    };


                    // =================================
                    // ADD REQUEST
                    // =================================

                    requests.push(
                        newRequest
                    );


                    // =================================
                    // SAVE
                    // =================================

                    localStorage.setItem(

                        storageKey,

                        JSON.stringify(requests)

                    );


                    // =================================
                    // UPDATE REQUESTS UI
                    // =================================

                    document
                        .getElementById(
                            "requestsContainer"
                        )
                        .innerHTML =
                        renderEmployeeRequests(
                            requests
                        );


                    // =================================
                    // UPDATE COUNT
                    // =================================

                    document
                        .getElementById(
                            "requestCount"
                        )
                        .textContent =
                        `${requests.length} requests`;


                    // =================================
                    // CLEAR FORM
                    // =================================

                    document
                        .getElementById(
                            "startDate"
                        )
                        .value = "";


                    document
                        .getElementById(
                            "endDate"
                        )
                        .value = "";


                    document
                        .getElementById(
                            "reason"
                        )
                        .value = "";


                    alert(
                        "Request submitted successfully!"
                    );

                }
            );


        // =========================================
        // EMPLOYEE REQUEST RENDER
        // =========================================

        function renderEmployeeRequests(
            requestList
        ) {

            if (
                !requestList ||
                requestList.length === 0
            ) {

                return `

                    <div
                        style="
                            padding:30px;
                            text-align:center;
                            color:#7892a8;
                        "
                    >
                        No requests yet.
                    </div>

                `;
            }


            return requestList
                .map(
                    function (
                        request,
                        index
                    ) {

                        let dates =
                            formatDateRange(
                                request.startDate,
                                request.endDate
                            );


                        let days =
                            calculateDays(
                                request.startDate,
                                request.endDate
                            );


                        let statusClass =
                            request.status
                                .toLowerCase();


                        let lastClass =
                            index ===
                            requestList.length - 1
                                ? "last"
                                : "";


                        return `

                            <div
                                class="request-row ${lastClass}"
                            >

                                <div
                                    class="request-name"
                                >

                                    <strong>
                                        ${request.leaveType}
                                    </strong>

                                    <span>
                                        ${request.reason}
                                    </span>

                                </div>


                                <div
                                    class="request-date"
                                >

                                    <strong>
                                        ${dates}
                                    </strong>

                                    <span>

                                        ${
                                            request.time
                                            ? request.time
                                            : `${days} ${
                                                days === 1
                                                    ? "day"
                                                    : "days"
                                            }`
                                        }

                                    </span>

                                </div>


                                <div>

                                    <span
                                        class="status ${statusClass}"
                                    >
                                        ${request.status}
                                    </span>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");
        }


        // =========================================
        // FORMAT DATE
        // =========================================

        function formatDate(
            dateString
        ) {

            let date =
                new Date(
                    dateString +
                    "T00:00:00"
                );


            return date.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                }
            );

        }


        // =========================================
        // FORMAT DATE RANGE
        // =========================================

        function formatDateRange(
            startDate,
            endDate
        ) {

            let start =
                new Date(
                    startDate +
                    "T00:00:00"
                );


            let end =
                new Date(
                    endDate +
                    "T00:00:00"
                );


            // Same day

            if (
                startDate ===
                endDate
            ) {

                return formatDate(
                    startDate
                );
            }


            // Same year

            if (
                start.getFullYear() ===
                end.getFullYear()
            ) {

                let startText =
                    start.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit"
                        }
                    );


                let endText =
                    end.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                        }
                    );


                return (
                    `${startText} – ${endText}`
                );
            }


            return (
                `${formatDate(startDate)} – ${formatDate(endDate)}`
            );

        }


        // =========================================
        // CALCULATE DAYS
        // =========================================

        function calculateDays(
            startDate,
            endDate
        ) {

            let start =
                new Date(
                    startDate +
                    "T00:00:00"
                );


            let end =
                new Date(
                    endDate +
                    "T00:00:00"
                );


            let difference =
                end - start;


            let days =
                Math.floor(
                    difference /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) + 1;


            return days;
        }

    }


    // =====================================================
    // =====================================================
    // ======================== HR ==========================
    // =====================================================
    // =====================================================

    else if (role === "hr") {


        // =========================================
        // GET ALL EMPLOYEE REQUESTS
        // =========================================

        function getAllRequests() {

            let allRequests = [];


            // Loop through localStorage

            for (
                let i = 0;
                i < localStorage.length;
                i++
            ) {

                let key =
                    localStorage.key(i);


                // Only employee leave requests

                if (
                    key &&
                    key.startsWith(
                        "leaveRequests_"
                    )
                ) {

                    let employeeRequests =
                        JSON.parse(
                            localStorage.getItem(key)
                        ) || [];


                    employeeRequests.forEach(
                        function (request) {

                            /*
                             * IMPORTANT:
                             *
                             * Every request gets
                             * a unique key.
                             *
                             * This prevents two
                             * employees having the
                             * same request id from
                             * causing conflicts.
                             */

                            allRequests.push({

                                ...request,

                                storageKey:
                                    key,

                                requestKey:
                                    `${key}_${request.id}`

                            });

                        }
                    );

                }

            }


            return allRequests;
        }


        // =========================================
        // GET ALL REQUESTS
        // =========================================

        let allRequests =
            getAllRequests();


        // =========================================
        // SELECT FIRST REQUEST
        // =========================================

        let selectedRequestKey =
            allRequests.length > 0
                ? allRequests[0].requestKey
                : null;


        // =========================================
        // DISPLAY HR PAGE
        // =========================================

        content.innerHTML = `

            <section class="content">

                <div class="page-label">
                    HR / LEAVE REQUESTS
                </div>


                <h1>
                    Leave requests
                </h1>


                <p class="description">
                    Review employee leave requests
                    and update their status.
                </p>


                <!-- ================= FILTERS ================= -->

                <div class="filters">

                    <div class="search-box">

                        <i class="bi bi-search"></i>

                        <input
                            type="text"
                            id="employeeSearch"
                            placeholder="Search by employee name..."
                        >

                    </div>


                    <div class="status-filter">

                        <select
                            id="statusFilter"
                        >

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

                </div>


                <!-- ================= REQUESTS TABLE ================= -->

                <div class="card requests-card">

                    <div class="card-header">

                        <h2>
                            Employee requests
                        </h2>

                        <span id="requestCount">
                            ${allRequests.length} requests
                        </span>

                    </div>


                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        EMPLOYEE
                                    </th>

                                    <th>
                                        LEAVE TYPE
                                    </th>

                                    <th>
                                        DATES
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        ACTION
                                    </th>

                                </tr>

                            </thead>


                            <tbody
                                id="requestsTableBody"
                            >
                            </tbody>

                        </table>

                    </div>

                </div>


                <!-- ================= REQUEST DETAILS ================= -->

                <div
                    class="card details-card"
                    id="detailsCard"
                >

                    <div class="details-header">

                        <h2>
                            Request details
                        </h2>

                        <span
                            class="details-status"
                            id="detailsStatus"
                        >
                            -
                        </span>

                    </div>


                    <div class="details-grid">

                        <div class="detail-item">

                            <label>
                                EMPLOYEE
                            </label>

                            <strong
                                id="detailEmployee"
                            >
                                -
                            </strong>

                        </div>


                        <div class="detail-item">

                            <label>
                                LEAVE TYPE
                            </label>

                            <strong
                                id="detailLeaveType"
                            >
                                -
                            </strong>

                        </div>


                        <div class="detail-item">

                            <label>
                                START DATE
                            </label>

                            <strong
                                id="detailStartDate"
                            >
                                -
                            </strong>

                        </div>


                        <div class="detail-item">

                            <label>
                                END DATE
                            </label>

                            <strong
                                id="detailEndDate"
                            >
                                -
                            </strong>

                        </div>

                    </div>


                    <div class="reason">

                        <label>
                            REASON
                        </label>

                        <p id="detailReason">
                            -
                        </p>

                    </div>


                    <div class="actions">

                        <button
                            class="reject-btn"
                            id="rejectBtn"
                        >
                            Reject
                        </button>


                        <button
                            class="approve-btn"
                            id="approveBtn"
                        >
                            Approve
                        </button>

                    </div>

                </div>

            </section>

        `;


        // =========================================
        // RENDER TABLE
        // =========================================

        function renderTable(
            requestList
        ) {

            let tbody =
                document.getElementById(
                    "requestsTableBody"
                );


            // No requests

            if (
                !requestList ||
                requestList.length === 0
            ) {

                tbody.innerHTML = `

                    <tr>

                        <td
                            colspan="5"
                            style="
                                text-align:center;
                                padding:30px;
                                color:#7592ad;
                            "
                        >
                            No requests found.
                        </td>

                    </tr>

                `;


                document
                    .getElementById(
                        "requestCount"
                    )
                    .textContent =
                    "0 requests";


                return;
            }


            // =====================================
            // COUNT
            // =====================================

            document
                .getElementById(
                    "requestCount"
                )
                .textContent =
                `${requestList.length} requests`;


            // =====================================
            // TABLE
            // =====================================

            tbody.innerHTML =
                requestList
                    .map(
                        function (request) {

                            let selectedClass =
                                request.requestKey ===
                                selectedRequestKey
                                    ? "selected"
                                    : "";


                            let statusClass =
                                request.status
                                    .toLowerCase();


                            return `

                                <tr
                                    class="${selectedClass}"
                                >

                                    <td>

                                        <strong>
                                            ${
                                                request.employeeName ||
                                                "Unknown Employee"
                                            }
                                        </strong>

                                    </td>


                                    <td>
                                        ${request.leaveType}
                                    </td>


                                    <td>

                                        ${
                                            formatDateRange(
                                                request.startDate,
                                                request.endDate
                                            )
                                        }

                                    </td>


                                    <td>

                                        <span
                                            class="status ${statusClass}"
                                        >
                                            ${request.status}
                                        </span>

                                    </td>


                                    <td>

                                        <button
                                            class="view-btn"
                                            data-request-key="${request.requestKey}"
                                        >

                                            View

                                            <i
                                                class="bi bi-arrow-right"
                                            ></i>

                                        </button>

                                    </td>

                                </tr>

                            `;

                        }
                    )
                    .join("");


            // =====================================
            // VIEW BUTTONS
            // =====================================

            document
                .querySelectorAll(
                    ".view-btn"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                let requestKey =
                                    this.dataset
                                        .requestKey;


                                selectedRequestKey =
                                    requestKey;


                                let request =
                                    allRequests.find(
                                        function (
                                            req
                                        ) {

                                            return (
                                                req.requestKey ===
                                                requestKey
                                            );

                                        }
                                    );


                                if (request) {

                                    showRequestDetails(
                                        request
                                    );


                                    renderTable(
                                        getFilteredRequests()
                                    );

                                }

                            }
                        );

                    }
                );

        }


        // =========================================
        // SHOW REQUEST DETAILS
        // =========================================

        function showRequestDetails(
            request
        ) {

            document
                .getElementById(
                    "detailEmployee"
                )
                .textContent =
                request.employeeName ||
                "Unknown Employee";


            document
                .getElementById(
                    "detailLeaveType"
                )
                .textContent =
                request.leaveType;


            document
                .getElementById(
                    "detailStartDate"
                )
                .textContent =
                formatDate(
                    request.startDate
                );


            document
                .getElementById(
                    "detailEndDate"
                )
                .textContent =
                formatDate(
                    request.endDate
                );


            document
                .getElementById(
                    "detailReason"
                )
                .textContent =
                request.reason;


            document
                .getElementById(
                    "detailsStatus"
                )
                .textContent =
                request.status;


            // =====================================
            // BUTTONS
            // =====================================

            let approveBtn =
                document.getElementById(
                    "approveBtn"
                );


            let rejectBtn =
                document.getElementById(
                    "rejectBtn"
                );


            if (
                request.status ===
                "Approved"
            ) {

                approveBtn.disabled =
                    true;

                rejectBtn.disabled =
                    false;

            }

            else if (
                request.status ===
                "Rejected"
            ) {

                approveBtn.disabled =
                    false;

                rejectBtn.disabled =
                    true;

            }

            else {

                approveBtn.disabled =
                    false;

                rejectBtn.disabled =
                    false;

            }

        }


        // =========================================
        // APPROVE BUTTON
        // =========================================

        document
            .getElementById(
                "approveBtn"
            )
            .addEventListener(
                "click",
                function () {

                    updateRequestStatus(
                        selectedRequestKey,
                        "Approved"
                    );

                }
            );


        // =========================================
        // REJECT BUTTON
        // =========================================

        document
            .getElementById(
                "rejectBtn"
            )
            .addEventListener(
                "click",
                function () {

                    updateRequestStatus(
                        selectedRequestKey,
                        "Rejected"
                    );

                }
            );


        // =========================================
        // UPDATE REQUEST STATUS
        // =========================================

        function updateRequestStatus(
            requestKey,
            newStatus
        ) {

            // Find selected request

            let request =
                allRequests.find(
                    function (req) {

                        return (
                            req.requestKey ===
                            requestKey
                        );

                    }
                );


            if (!request) {

                return;
            }


            // =====================================
            // GET EMPLOYEE REQUESTS
            // =====================================

            let employeeRequests =
                JSON.parse(
                    localStorage.getItem(
                        request.storageKey
                    )
                ) || [];


            // =====================================
            // FIND REQUEST INSIDE STORAGE
            // =====================================

            let requestIndex =
                employeeRequests.findIndex(
                    function (req) {

                        return (
                            String(req.id) ===
                            String(request.id)
                        );

                    }
                );


            if (
                requestIndex === -1
            ) {

                return;
            }


            // =====================================
            // UPDATE STATUS
            // =====================================

            employeeRequests[
                requestIndex
            ].status =
                newStatus;


            // =====================================
            // SAVE TO LOCAL STORAGE
            // =====================================

            localStorage.setItem(

                request.storageKey,

                JSON.stringify(
                    employeeRequests
                )

            );


            // =====================================
            // UPDATE CURRENT REQUEST
            // =====================================

            request.status =
                newStatus;


            // =====================================
            // SHOW DETAILS
            // =====================================

            showRequestDetails(
                request
            );


            // =====================================
            // REFRESH TABLE
            // =====================================

            renderTable(
                getFilteredRequests()
            );

        }


        // =========================================
        // GET FILTERED REQUESTS
        // =========================================

        function getFilteredRequests() {

            let search =
                document
                    .getElementById(
                        "employeeSearch"
                    )
                    .value
                    .toLowerCase()
                    .trim();


            let status =
                document
                    .getElementById(
                        "statusFilter"
                    )
                    .value;


            return allRequests.filter(
                function (request) {

                    let employeeName =
                        (
                            request.employeeName ||
                            ""
                        )
                        .toLowerCase();


                    let matchesName =
                        employeeName.includes(
                            search
                        );


                    let matchesStatus =
                        status === "All" ||
                        request.status ===
                        status;


                    return (
                        matchesName &&
                        matchesStatus
                    );

                }
            );

        }


        // =========================================
        // SEARCH
        // =========================================

        document
            .getElementById(
                "employeeSearch"
            )
            .addEventListener(
                "input",
                function () {

                    let filtered =
                        getFilteredRequests();


                    renderTable(
                        filtered
                    );

                }
            );


        // =========================================
        // STATUS FILTER
        // =========================================

        document
            .getElementById(
                "statusFilter"
            )
            .addEventListener(
                "change",
                function () {

                    let filtered =
                        getFilteredRequests();


                    renderTable(
                        filtered
                    );

                }
            );


        // =========================================
        // FORMAT DATE
        // =========================================

        function formatDate(
            dateString
        ) {

            let date =
                new Date(
                    dateString +
                    "T00:00:00"
                );


            return date.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                }
            );

        }


        // =========================================
        // FORMAT DATE RANGE
        // =========================================

        function formatDateRange(
            startDate,
            endDate
        ) {

            let start =
                new Date(
                    startDate +
                    "T00:00:00"
                );


            let end =
                new Date(
                    endDate +
                    "T00:00:00"
                );


            // Same date

            if (
                startDate ===
                endDate
            ) {

                return formatDate(
                    startDate
                );

            }


            // Same year

            if (
                start.getFullYear() ===
                end.getFullYear()
            ) {

                let startText =
                    start.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit"
                        }
                    );


                let endText =
                    end.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                        }
                    );


                return (
                    `${startText} – ${endText}`
                );

            }


            return (
                `${formatDate(startDate)} – ${formatDate(endDate)}`
            );

        }


        // =========================================
        // INITIAL TABLE
        // =========================================

        renderTable(
            allRequests
        );


        // =========================================
        // INITIAL DETAILS
        // =========================================

        if (
            allRequests.length > 0
        ) {

            showRequestDetails(
                allRequests[0]
            );

        }

    }


    // =====================================================
    // ===================== NO ROLE ========================
    // =====================================================

    else {

        console.log(
            "User role not found"
        );

        window.location.href =
            "login.html";

    }

}