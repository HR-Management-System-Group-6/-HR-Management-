/* =========================================================
   DASHBOARD HOME
   HR + EMPLOYEE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       HELPERS
       ===================================================== */

    function readStorage(key, fallback = []) {

        try {

            const value =
                JSON.parse(
                    localStorage.getItem(key)
                );

            return value == null
                ? fallback
                : value;

        } catch (error) {

            console.error(
                "Storage error:",
                key,
                error
            );

            return fallback;
        }
    }


    function normalize(value) {

        return String(
            value ?? ""
        )
            .trim()
            .toLowerCase();

    }


    function escapeHTML(value) {

        return String(
            value ?? ""
        )
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function isArray(value) {

        return Array.isArray(value)
            ? value
            : [];
    }


    function formatDate(value) {

        if (!value) {
            return "Not scheduled";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "Not scheduled";
        }

        return date.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    }


    function getInitials(name) {

        const parts =
            String(
                name || "User"
            )
                .trim()
                .split(/\s+/)
                .filter(Boolean);

        if (!parts.length) {
            return "US";
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


    /* =====================================================
       LEAVE REQUESTS
       ===================================================== */

    function getAllLeaveRequests() {

        const allRequests = [];

        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);

            if (
                key &&
                key.startsWith(
                    "leaveRequests_"
                )
            ) {

                const requests =
                    readStorage(
                        key,
                        []
                    );

                if (
                    Array.isArray(
                        requests
                    )
                ) {

                    allRequests.push(
                        ...requests
                    );
                }
            }
        }

        return allRequests;
    }


    function belongsToUser(
        request,
        user
    ) {

        const values = [

            request.employeeId,
            request.employeeEmail,
            request.employeeName,
            request.employee,
            request.userId,
            request.email

        ]
            .filter(
                value =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""
            )
            .map(normalize);


        const userValues = [

            user.id,
            user.email,
            user.name

        ]
            .filter(
                value =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""
            )
            .map(normalize);


        return values.some(
            value =>
                userValues.includes(
                    value
                )
        );
    }


    function getEmployeeLeaveRequests(
        user
    ) {

        const storageKey =
            `leaveRequests_${
                user.id ||
                user.email ||
                user.name ||
                "employee"
            }`;


        const directRequests =
            isArray(
                readStorage(
                    storageKey,
                    []
                )
            );


        const allRequests =
            getAllLeaveRequests();


        const matchingRequests =
            allRequests.filter(
                request =>
                    belongsToUser(
                        request,
                        user
                    )
            );


        return [
            ...directRequests,
            ...matchingRequests
        ];
    }


    /* =====================================================
       TASK HELPERS
       ===================================================== */

    function isTaskBlocked(task) {

        return normalize(
            task.status
        ) === "blocked";
    }


    function isTaskCompleted(task) {

        const status =
            normalize(
                task.status
            );

        return (
            status === "completed" ||
            status === "submitted"
        );
    }


    function taskBelongsToUser(
        task,
        user
    ) {

        const taskEmployee =
            normalize(
                task.employee ||
                task.employeeName ||
                task.assignedEmployee ||
                task.user
            );


        const userName =
            normalize(
                user.name
            );


        const userEmail =
            normalize(
                user.email
            );


        const taskEmail =
            normalize(
                task.employeeEmail ||
                task.email
            );


        if (
            taskEmployee &&
            taskEmployee === userName
        ) {

            return true;
        }


        if (
            taskEmail &&
            taskEmail === userEmail
        ) {

            return true;
        }


        if (
            task.employeeId &&
            String(
                task.employeeId
            ) === String(
                user.id
            )
        ) {

            return true;
        }


        return false;
    }


    function getTaskTitle(task) {

        return (
            task.title ||
            task.name ||
            task.taskName ||
            "Untitled Task"
        );
    }


    function getTaskDate(task) {

        return (
            task.dueDate ||
            task.deadline ||
            task.createdAt ||
            task.date
        );
    }


    /* =====================================================
       MEETING HELPERS
       ===================================================== */

    function meetingBelongsToUser(
        meeting,
        user
    ) {

        const values = [

            meeting.employeeId,
            meeting.employeeEmail,
            meeting.employeeName,
            meeting.employee,
            meeting.recipientId,
            meeting.recipientEmail,
            meeting.recipient,
            meeting.recipientName,
            meeting.userId

        ];


        if (
            Array.isArray(
                meeting.employees
            )
        ) {

            meeting.employees.forEach(
                employee => {

                    if (
                        typeof employee ===
                        "object"
                    ) {

                        values.push(
                            employee.id
                        );

                        values.push(
                            employee.email
                        );

                        values.push(
                            employee.name
                        );

                    } else {

                        values.push(
                            employee
                        );
                    }
                }
            );
        }


        const userValues = [

            user.id,
            user.email,
            user.name

        ]
            .filter(Boolean)
            .map(normalize);


        return values.some(
            value =>
                value &&
                userValues.includes(
                    normalize(value)
                )
        );
    }


    function getUpcomingMeetings(
        meetings
    ) {

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        return meetings

            .filter(meeting => {

                const date =
                    new Date(
                        meeting.date ||
                        meeting.meetingDate ||
                        meeting.scheduledDate
                    );


                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {

                    return false;
                }


                const status =
                    normalize(
                        meeting.status
                    );


                if (
                    status === "rejected" ||
                    status === "cancelled"
                ) {

                    return false;
                }


                return date >= today;
            })


            .sort(
                (a, b) => {

                    return (
                        new Date(
                            a.date ||
                            a.meetingDate ||
                            a.scheduledDate
                        )
                        -
                        new Date(
                            b.date ||
                            b.meetingDate ||
                            b.scheduledDate
                        )
                    );
                }
            );
    }


    /* =====================================================
       STATUS BADGE
       ===================================================== */

    function statusBadge(
        status
    ) {

        const currentStatus =
            status ||
            "Pending";


        const normalized =
            normalize(
                currentStatus
            );


        let type =
            "pending";


        if (
            normalized === "completed" ||
            normalized === "approved" ||
            normalized === "accepted" ||
            normalized === "active" ||
            normalized === "submitted"
        ) {

            type = "success";
        }


        if (
            normalized === "blocked" ||
            normalized === "rejected" ||
            normalized === "cancelled"
        ) {

            type = "danger";
        }


        return `
            <span
                class="
                    dh-status
                    ${type}
                "
            >
                ${escapeHTML(
                    currentStatus
                )}
            </span>
        `;
    }


    /* =====================================================
       STAT CARD
       ===================================================== */

    function createStatCard(
        icon,
        title,
        value,
        description,
        color
    ) {

        return `
            <div class="dh-stat-card">

                <div
                    class="
                        dh-stat-icon
                        ${color}
                    "
                >
                    <i
                        class="
                            bi
                            bi-${icon}
                        "
                    ></i>
                </div>


                <div
                    class="
                        dh-stat-content
                    "
                >

                    <span>
                        ${escapeHTML(
                            title
                        )}
                    </span>

                    <strong>
                        ${escapeHTML(
                            value
                        )}
                    </strong>

                    <small>
                        ${escapeHTML(
                            description
                        )}
                    </small>

                </div>

            </div>
        `;
    }


    /* =====================================================
       PANEL
       ===================================================== */

    function createPanel(
        title,
        subtitle,
        content
    ) {

        return `
            <section class="dh-panel">

                <div class="dh-panel-header">

                    <div>

                        <h2>
                            ${escapeHTML(
                                title
                            )}
                        </h2>

                        <p>
                            ${escapeHTML(
                                subtitle
                            )}
                        </p>

                    </div>

                </div>

                ${content}

            </section>
        `;
    }


    /* =====================================================
       TASK TABLE
       ===================================================== */

    function createTaskTable(
        tasks,
        showEmployee = false
    ) {

        if (!tasks.length) {

            return `
                <div class="dh-empty">

                    <i
                        class="
                            bi
                            bi-inbox
                        "
                    ></i>

                    <p>
                        No tasks available yet.
                    </p>

                </div>
            `;
        }


        const rows =
            tasks
                .slice(0, 6)
                .map(task => {

                    const title =
                        getTaskTitle(
                            task
                        );

                    const date =
                        getTaskDate(
                            task
                        );


                    return `
                        <tr>

                            <td>
                                <strong>
                                    ${escapeHTML(
                                        title
                                    )}
                                </strong>
                            </td>

                            ${
                                showEmployee
                                ?
                                `
                                    <td>
                                        ${escapeHTML(
                                            task.employee ||
                                            task.employeeName ||
                                            "Unassigned"
                                        )}
                                    </td>
                                `
                                :
                                ""
                            }

                            <td>
                                ${statusBadge(
                                    task.status
                                )}
                            </td>

                            <td>
                                ${formatDate(
                                    date
                                )}
                            </td>

                        </tr>
                    `;
                })
                .join("");


        return `
            <div class="dh-table-wrapper">

                <table class="dh-table">

                    <thead>

                        <tr>

                            <th>
                                Task
                            </th>

                            ${
                                showEmployee
                                ?
                                `
                                    <th>
                                        Employee
                                    </th>
                                `
                                :
                                ""
                            }

                            <th>
                                Status
                            </th>

                            <th>
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>
        `;
    }


    /* =====================================================
       MEETING LIST
       ===================================================== */

    function createMeetingList(
        meetings
    ) {

        if (!meetings.length) {

            return `
                <div class="dh-empty">

                    <i
                        class="
                            bi
                            bi-calendar-x
                        "
                    ></i>

                    <p>
                        No upcoming meetings.
                    </p>

                </div>
            `;
        }


        return meetings
            .slice(0, 5)
            .map(meeting => {

                const title =
                    meeting.title ||
                    meeting.meetingTitle ||
                    "Meeting";


                const date =
                    meeting.date ||
                    meeting.meetingDate ||
                    meeting.scheduledDate;


                const time =
                    meeting.time ||
                    meeting.meetingTime ||
                    "";


                return `
                    <div class="dh-meeting">

                        <div
                            class="
                                dh-meeting-icon
                            "
                        >
                            <i
                                class="
                                    bi
                                    bi-camera-video
                                "
                            ></i>
                        </div>


                        <div
                            class="
                                dh-meeting-info
                            "
                        >

                            <strong>
                                ${escapeHTML(
                                    title
                                )}
                            </strong>

                            <small>
                                ${formatDate(
                                    date
                                )}

                                ${escapeHTML(
                                    time
                                )}
                            </small>

                        </div>


                        ${statusBadge(
                            meeting.status
                        )}

                    </div>
                `;

            })
            .join("");
    }


    /* =====================================================
       QUICK ACTION
       ===================================================== */

    function createQuickAction(
        label,
        icon,
        action
    ) {

        return `
            <button
                type="button"
                class="dh-action"
                data-dh-action="${action}"
            >

                <i
                    class="
                        bi
                        bi-${icon}
                    "
                ></i>

                <span>
                    ${escapeHTML(
                        label
                    )}
                </span>

                <i
                    class="
                        bi
                        bi-arrow-up-right
                    "
                ></i>

            </button>
        `;
    }


    /* =====================================================
       ACTION NAVIGATION
       ===================================================== */

    const dashboardNavigation = {

        tasks:
            "displayTask",

        leave:
            "displayLeave",

        meetings:
            "displayMeeting",

        employees:
            "displayEmployees",

        addEmployee:
            "displayAddEmployee"

    };


    function bindDashboardActions(
        root
    ) {

        root
            .querySelectorAll(
                "[data-dh-action]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const action =
                                button.dataset
                                    .dhAction;


                            const functionName =
                                dashboardNavigation[
                                    action
                                ];


                            if (
                                typeof window[
                                    functionName
                                ] === "function"
                            ) {

                                window[
                                    functionName
                                ]();

                            } else {

                                alert(
                                    "Please open this section using the sidebar."
                                );
                            }

                        }
                    );

                }
            );
    }


    /* =====================================================
       DISPLAY DASHBOARD HOME
       ===================================================== */

    window.displayDashboardHome =
        function () {

            const content =
                document.getElementById(
                    "content"
                );


            if (!content) {
                return;
            }


            /* =============================================
               GET LOGGED USER
            ============================================= */

            const user =
                readStorage(
                    "loggedInUser",
                    null
                );


            if (
                !user ||
                ![
                    "hr",
                    "employee"
                ].includes(
                    normalize(
                        user.role
                    )
                )
            ) {

                content.innerHTML = `

                    <section class="dashboard-home">

                        <div class="dh-empty">

                            <i
                                class="
                                    bi
                                    bi-lock
                                "
                            ></i>

                            <h2>
                                Please log in to access your dashboard.
                            </h2>

                        </div>

                    </section>

                `;

                return;
            }


            /* =============================================
               ROLE
            ============================================= */

            const isHR =
                normalize(
                    user.role
                ) === "hr";


            /* =============================================
               DATA
            ============================================= */

            const employees =
                isArray(
                    readStorage(
                        "employees",
                        []
                    )
                );


            const allTasks =
                isArray(
                    readStorage(
                        "hrTasks",
                        []
                    )
                );


            const tasks =
                allTasks.filter(
                    task =>
                        !isTaskBlocked(
                            task
                        )
                );


            const myTasks =
                tasks.filter(
                    task =>
                        taskBelongsToUser(
                            task,
                            user
                        )
                );


            const requests =
                isHR
                    ? getAllLeaveRequests()
                    : getEmployeeLeaveRequests(
                        user
                    );


            const meetings =
                isArray(
                    readStorage(
                        "meetings",
                        []
                    )
                );


            const relevantMeetings =
                isHR
                    ? meetings
                    : meetings.filter(
                        meeting =>
                            meetingBelongsToUser(
                                meeting,
                                user
                            )
                    );


            const futureMeetings =
                getUpcomingMeetings(
                    relevantMeetings
                );


            const visibleTasks =
                isHR
                    ? tasks
                    : myTasks;


            /* =============================================
               STATISTICS
            ============================================= */

            const completedTasks =
                visibleTasks.filter(
                    task =>
                        isTaskCompleted(
                            task
                        )
                ).length;


            const pendingTasks =
                visibleTasks.filter(
                    task => {

                        const status =
                            normalize(
                                task.status
                            );

                        return (
                            status ===
                                "pending" ||
                            status ===
                                "in progress" ||
                            status ===
                                "in-progress"
                        );

                    }
                ).length;


            const pendingLeaves =
                requests.filter(
                    request =>
                        normalize(
                            request.status
                        ) === "pending"
                ).length;


            const activeEmployees =
                employees.filter(
                    employee =>
                        normalize(
                            employee.status
                        ) !== "blocked"
                ).length;


            /* =============================================
               HERO
            ============================================= */

            const firstName =
                String(
                    user.name ||
                    "User"
                )
                    .trim()
                    .split(" ")[0];


            const hero =
                `

                <header class="dashboard-hero">

                    <div
                        class="
                            dashboard-hero-content
                        "
                    >

                        <span
                            class="
                                dashboard-label
                            "
                        >
                            ${
                                isHR
                                ?
                                "HR MANAGEMENT / OVERVIEW"
                                :
                                "EMPLOYEE WORKSPACE / OVERVIEW"
                            }
                        </span>


                        <h1>
                            Welcome back,
                            ${escapeHTML(
                                firstName
                            )}
                            👋
                        </h1>


                        <p>
                            ${
                                isHR
                                ?
                                "Manage your team, requests and company activities in one place."
                                :
                                "Here is your personal work summary and what needs your attention."
                            }
                        </p>

                    </div>


                    <div
                        class="
                            dashboard-hero-icon
                        "
                    >

                        <i
                            class="
                                bi
                                bi-${
                                    isHR
                                    ?
                                    "people"
                                    :
                                    "person"
                                }
                            "
                        ></i>

                    </div>

                </header>

            `;


            /* =============================================
               STAT CARDS
            ============================================= */

            const stats =
                isHR

                    ?

                    [

                        createStatCard(
                            "people",
                            "Total Employees",
                            employees.length,
                            "Registered team members",
                            "blue"
                        ),

                        createStatCard(
                            "person-check",
                            "Active Employees",
                            activeEmployees,
                            `${employees.length - activeEmployees} blocked`,
                            "green"
                        ),

                        createStatCard(
                            "calendar2-check",
                            "Pending Leaves",
                            pendingLeaves,
                            `${requests.length} total requests`,
                            "orange"
                        ),

                        createStatCard(
                            "clipboard-check",
                            "Active Tasks",
                            tasks.length,
                            `${completedTasks} completed or submitted`,
                            "purple"
                        )

                    ]

                    :

                    [

                        createStatCard(
                            "list-task",
                            "My Tasks",
                            myTasks.length,
                            "Assigned active tasks",
                            "blue"
                        ),

                        createStatCard(
                            "hourglass-split",
                            "Pending Tasks",
                            pendingTasks,
                            "Pending or in progress",
                            "orange"
                        ),

                        createStatCard(
                            "check-circle",
                            "Completed / Submitted",
                            completedTasks,
                            "Work progress",
                            "green"
                        ),

                        createStatCard(
                            "calendar2-week",
                            "My Leave Requests",
                            requests.length,
                            `${pendingLeaves} pending`,
                            "purple"
                        )

                    ];


            /* =============================================
               TASK PANEL
            ============================================= */

            const taskPanel =
                createPanel(

                    isHR
                        ? "Recent Team Tasks"
                        : "My Recent Tasks",

                    isHR
                        ? "Latest assignments across the team"
                        : "Your latest assigned work",

                    createTaskTable(
                        visibleTasks
                            .slice()
                            .reverse(),

                        isHR
                    )

                );


            /* =============================================
               MEETING PANEL
            ============================================= */

            const meetingPanel =
                createPanel(

                    "Upcoming Meetings",

                    `${futureMeetings.length} scheduled`,

                    createMeetingList(
                        futureMeetings
                    )

                );


            /* =============================================
               QUICK ACTIONS
            ============================================= */

            let quickActions = "";


            if (isHR) {

                quickActions =

                    createQuickAction(
                        "Add Employee",
                        "person-plus",
                        "addEmployee"
                    )

                    +

                    createQuickAction(
                        "Manage Tasks",
                        "clipboard-check",
                        "tasks"
                    )

                    +

                    createQuickAction(
                        "Leave Requests",
                        "calendar-check",
                        "leave"
                    )

                    +

                    createQuickAction(
                        "Meetings",
                        "camera-video",
                        "meetings"
                    );

            } else {

                quickActions =

                    createQuickAction(
                        "My Tasks",
                        "list-task",
                        "tasks"
                    )

                    +

                    createQuickAction(
                        "Request Leave",
                        "calendar-plus",
                        "leave"
                    )

                    +

                    createQuickAction(
                        "My Meetings",
                        "camera-video",
                        "meetings"
                    );

            }


            const quickActionsPanel =
                createPanel(

                    "Quick Actions",

                    "Jump to your daily tools",

                    `
                        <div class="dh-actions">

                            ${quickActions}

                        </div>
                    `

                );


            /* =============================================
               TASK PROGRESS
            ============================================= */

            const progress =
                visibleTasks.length

                    ?

                    Math.round(
                        (
                            completedTasks /
                            visibleTasks.length
                        ) * 100
                    )

                    :

                    0;


            const progressPanel =
                createPanel(

                    "Task Progress",

                    isHR
                        ? "Company task completion"
                        : "Your task completion",

                    `

                        <div
                            class="
                                dh-progress-number
                            "
                        >
                            ${progress}%
                        </div>


                        <div
                            class="
                                dh-progress-bar
                            "
                        >

                            <span
                                style="
                                    width: ${progress}%;
                                "
                            ></span>

                        </div>


                        <div
                            class="
                                dh-progress-text
                            "
                        >
                            ${completedTasks}
                            of
                            ${visibleTasks.length}
                            tasks completed or submitted
                        </div>

                    `

                );


            /* =============================================
               LEAVE PANEL
            ============================================= */

            const approvedLeaves =
                requests.filter(
                    request =>
                        normalize(
                            request.status
                        ) === "approved"
                ).length;


            const leavePanel =
                createPanel(

                    isHR
                        ? "Leave Requests Overview"
                        : "My Leave Status",

                    `${requests.length} requests total`,

                    `

                        <div class="dh-meeting">

                            <div
                                class="
                                    dh-meeting-icon
                                "
                            >

                                <i
                                    class="
                                        bi
                                        bi-clock-history
                                    "
                                ></i>

                            </div>


                            <div
                                class="
                                    dh-meeting-info
                                "
                            >

                                <strong>
                                    Pending requests
                                </strong>

                                <small>
                                    Awaiting review
                                </small>

                            </div>


                            <strong>
                                ${pendingLeaves}
                            </strong>

                        </div>


                        <div class="dh-meeting">

                            <div
                                class="
                                    dh-meeting-icon
                                "
                            >

                                <i
                                    class="
                                        bi
                                        bi-check-circle
                                    "
                                ></i>

                            </div>


                            <div
                                class="
                                    dh-meeting-info
                                "
                            >

                                <strong>
                                    Approved requests
                                </strong>

                                <small>
                                    Approved by HR
                                </small>

                            </div>


                            <strong>
                                ${approvedLeaves}
                            </strong>

                        </div>

                    `

                );


            /* =============================================
               FINAL HTML
            ============================================= */

            content.innerHTML = `

                <main class="dashboard-home">

                    ${hero}


                    <div class="dh-stat-grid">

                        ${stats.join("")}

                    </div>


                    <div class="dh-grid">

                        ${taskPanel}

                        ${meetingPanel}

                    </div>


                    <div class="dh-grid">

                        ${quickActionsPanel}

                        ${progressPanel}

                    </div>


                    <div class="dh-grid">

                        ${leavePanel}

                    </div>

                </main>

            `;


            /* =============================================
               BUTTON EVENTS
            ============================================= */

            bindDashboardActions(
                content
            );

        };

})();