/* =========================================================
   MEETING MANAGEMENT
   ========================================================= */

/* =========================================================
   DISPLAY MEETING PAGE
   ========================================================= */

function displayMeeting() {

    const content = document.getElementById("content");

    if (!content) return;

    const currentUser = getCurrentUser();

    if (!currentUser) {

        content.innerHTML = `
            <div class="meeting-empty-page">
                <i class="bi bi-person-x"></i>
                <h2>User not found</h2>
                <p>Please login again.</p>
            </div>
        `;

        return;
    }

    initializeMeetings();

    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    content.innerHTML = `

        <div class="meeting-page">

            <!-- ================= HEADER ================= -->

            <div class="meeting-page-header">

                <div>



                    <h1>Meetings</h1>


                </div>


                ${
                    isHR
                    ? `
                        <button
                            class="meeting-primary-btn"
                            onclick="scrollToMeetingForm()"
                        >
                            <i class="bi bi-plus-lg"></i>
                            New Meeting
                        </button>
                    `
                    : ""
                }

            </div>


            <!-- ================= STATS ================= -->

            <div class="meeting-stats">

                <div class="meeting-stat-card">

                    <div class="meeting-stat-icon blue">
                        <i class="bi bi-camera-video"></i>
                    </div>

                    <div>
                        <span>Total Meetings</span>
                        <strong id="meetingTotal">0</strong>
                    </div>

                </div>


                <div class="meeting-stat-card">

                    <div class="meeting-stat-icon orange">
                        <i class="bi bi-clock"></i>
                    </div>

                    <div>
                        <span>Pending</span>
                        <strong id="meetingPending">0</strong>
                    </div>

                </div>


                <div class="meeting-stat-card">

                    <div class="meeting-stat-icon green">
                        <i class="bi bi-check2-circle"></i>
                    </div>

                    <div>
                        <span>Accepted</span>
                        <strong id="meetingAccepted">0</strong>
                    </div>

                </div>


                <div class="meeting-stat-card">

                    <div class="meeting-stat-icon purple">
                        <i class="bi bi-calendar-event"></i>
                    </div>

                    <div>
                        <span>Upcoming</span>
                        <strong id="meetingUpcoming">0</strong>
                    </div>

                </div>

            </div>


            <!-- ================= MAIN LAYOUT ================= -->

            <div class="meeting-layout">


                <!-- =================================================
                     HR CREATE FORM
                     ================================================= -->

                ${
                    isHR

                    ? `

                        <section
                            class="meeting-create-card"
                            id="meetingCreateCard"
                        >

                            <div class="meeting-card-top">

                                <div>

                                    <span class="meeting-card-label">
                                        CREATE
                                    </span>

                                    <h2>
                                        Schedule a meeting
                                    </h2>

                                    <p>
                                        Send a meeting invitation to an employee.
                                    </p>

                                </div>


                                <div class="meeting-card-icon">

                                    <i class="bi bi-calendar-plus"></i>

                                </div>

                            </div>


                            <form
                                id="meetingForm"
                                class="meeting-form"
                                onsubmit="createMeeting(event)"
                            >

                                <!-- TITLE -->

                                <div class="meeting-form-group full">

                                    <label>
                                        Meeting title
                                        <span>*</span>
                                    </label>

                                    <div class="meeting-input-wrapper">

                                        

                                        <input
                                            type="text"
                                            id="meetingTitle"
                                            placeholder="e.g. Project discussion"
                                            required
                                        >

                                    </div>

                                </div>


                                <!-- EMPLOYEE -->

                                <div class="meeting-form-group full">

                                    <label>
                                        Employee
                                        <span>*</span>
                                    </label>

                                    <div class="meeting-input-wrapper">

                                        

                                        <select
                                            id="meetingRecipient"
                                            required
                                        >

                                            <option value="">
                                                Select employee
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                <!-- DATE / TIME -->

                                <div class="meeting-form-row">

                                    <div class="meeting-form-group">

                                        <label>
                                            Date
                                            <span>*</span>
                                        </label>

                                        <div class="meeting-input-wrapper">

                                            <i class="bi bi-calendar3"></i>

                                            <input
                                                type="date"
                                                id="meetingDate"
                                                required
                                            >

                                        </div>

                                    </div>


                                    <div class="meeting-form-group">

                                        <label>
                                            Time
                                            <span>*</span>
                                        </label>

                                        <div class="meeting-input-wrapper">

                                            <i class="bi bi-clock"></i>

                                            <input
                                                type="time"
                                                id="meetingTime"
                                                required
                                            >

                                        </div>

                                    </div>

                                </div>


                                <!-- DURATION -->

                                <div class="meeting-form-group full">

                                    <label>
                                        Duration
                                    </label>

                                    <div class="meeting-input-wrapper">

                                        

                                        <select id="meetingDuration">

                                            <option value="15">
                                                15 minutes
                                            </option>

                                            <option value="30" selected>
                                                30 minutes
                                            </option>

                                            <option value="45">
                                                45 minutes
                                            </option>

                                            <option value="60">
                                                1 hour
                                            </option>

                                            <option value="90">
                                                1.5 hours
                                            </option>

                                            <option value="120">
                                                2 hours
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                <!-- LINK -->

                                <div class="meeting-form-group full">

                                    <label>
                                        Meeting link
                                        <span>*</span>
                                    </label>

                                    <div class="meeting-input-wrapper">

                                        <i class="bi bi-link-45deg"></i>

                                        <input
                                            type="url"
                                            id="meetingLink"
                                            placeholder="https://meet.google.com/..."
                                            required
                                        >

                                    </div>

                                </div>


                                <!-- DESCRIPTION -->

                                <div class="meeting-form-group full">

                                    <label>
                                        Description
                                    </label>

                                    <div class="meeting-textarea-wrapper">

                                        <i class="bi bi-card-text"></i>

                                        <textarea
                                            id="meetingDescription"
                                            rows="4"
                                            placeholder="Add meeting details..."
                                        ></textarea>

                                    </div>

                                </div>


                                <!-- SUBMIT -->

                                <button
                                    type="submit"
                                    class="meeting-submit-btn"
                                >

                                    <i class="bi bi-send"></i>

                                    Send Meeting Request

                                </button>

                            </form>

                        </section>

                    `

                    :

                    `

                        <!-- =================================================
                             EMPLOYEE INFORMATION
                             ================================================= -->

                        <section
                            class="
                                meeting-create-card
                                meeting-employee-info-card
                            "
                        >

                            <div class="meeting-card-top">

                                <div>

                                    <span class="meeting-card-label">
                                        MEETINGS
                                    </span>

                                    <h2>
                                        Your meeting invitations
                                    </h2>

                                    <p>
                                        Meetings are scheduled by HR.
                                    </p>

                                </div>


                                <div class="meeting-card-icon">

                                    <i class="bi bi-calendar-check"></i>

                                </div>

                            </div>


                            <div class="meeting-employee-notice">

                                <div class="meeting-employee-notice-icon">

                                    <i class="bi bi-shield-check"></i>

                                </div>


                                <div>

                                    <h3>
                                        HR schedules your meetings
                                    </h3>

                                    <p>
                                        You will receive meeting invitations
                                        from HR here. You can accept the meeting,
                                        reject it, or request a different date
                                        and time.
                                    </p>

                                </div>

                            </div>


                            <div class="meeting-response-flow">

                                <div>

                                    <i class="bi bi-check-circle"></i>

                                    <span>
                                        Accept
                                    </span>

                                </div>


                                <div>

                                    <i class="bi bi-x-circle"></i>

                                    <span>
                                        Reject
                                    </span>

                                </div>


                                <div>

                                    <i class="bi bi-calendar2-event"></i>

                                    <span>
                                        Request change
                                    </span>

                                </div>

                            </div>

                        </section>

                    `
                }


                <!-- =================================================
                     MEETING LIST
                     ================================================= -->

                <section class="meeting-list-card">

                    <div class="meeting-list-header">

                        <div>

                            <span class="meeting-card-label">
                                SCHEDULE
                            </span>

                            <h2>
                                My Meetings
                            </h2>

                            <p>
                                View and manage your meeting requests.
                            </p>

                        </div>


                        <span
                            class="meeting-count"
                            id="meetingCount"
                        >
                            0 meetings
                        </span>

                    </div>


                    <!-- FILTERS -->

                    <div class="meeting-filters">

                        <button
                            class="meeting-filter active"
                            onclick="filterMeetings('all', this)"
                        >
                            All
                        </button>


                        <button
                            class="meeting-filter"
                            onclick="filterMeetings('pending', this)"
                        >
                            Pending
                        </button>


                        <button
                            class="meeting-filter"
                            onclick="filterMeetings('accepted', this)"
                        >
                            Accepted
                        </button>


                        <button
                            class="meeting-filter"
                            onclick="filterMeetings('rejected', this)"
                        >
                            Rejected
                        </button>


                        <button
                            class="meeting-filter"
                            onclick="filterMeetings('change_requested', this)"
                        >
                            Change Requested
                        </button>

                    </div>


                    <div
                        id="meetingList"
                        class="meeting-list"
                    ></div>

                </section>

            </div>

        </div>

    `;


    /* Initialize page */

    setMinimumDate();

    populateRecipients();

    renderMeetings();

    updateMeetingStats();

}


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    const possibleKeys = [

        "currentUser",

        "loggedInUser",

        "user",

        "userInfo"

    ];


    for (const key of possibleKeys) {

        const data =
            localStorage.getItem(key);

        if (!data) continue;


        try {

            const parsed =
                JSON.parse(data);

            if (
                parsed &&
                typeof parsed === "object"
            ) {

                return parsed;

            }

        }
        catch {

            if (data.includes("@")) {

                return {
                    email: data
                };

            }

        }

    }


    /* Fallback */

    const nameElement =
        document.getElementById("user");

    const roleElement =
        document.getElementById("role");


    if (nameElement) {

        return {

            name:
                nameElement.textContent.trim(),

            role:
                roleElement
                    ? roleElement.textContent.trim()
                    : "Employee"

        };

    }


    return null;

}


/* =========================================================
   STORAGE
   ========================================================= */

function initializeMeetings() {

    if (
        !localStorage.getItem("meetings")
    ) {

        localStorage.setItem(
            "meetings",
            JSON.stringify([])
        );

    }

}


function getMeetings() {

    try {

        return JSON.parse(
            localStorage.getItem("meetings") || "[]"
        );

    }
    catch {

        return [];

    }

}


function saveMeetings(meetings) {

    localStorage.setItem(
        "meetings",
        JSON.stringify(meetings)
    );

}


/* =========================================================
   GET EMPLOYEES
   ========================================================= */

function getEmployees() {

    const possibleKeys = [

        "employees",

        "employeeData",

        "users"

    ];


    for (const key of possibleKeys) {

        const data =
            localStorage.getItem(key);

        if (!data) continue;


        try {

            const parsed =
                JSON.parse(data);

            if (Array.isArray(parsed)) {

                return parsed;

            }

        }
        catch (error) {

            console.log(
                "Could not read " + key,
                error
            );

        }

    }


    return [];

}


/* =========================================================
   POPULATE EMPLOYEE DROPDOWN
   HR ONLY
   ========================================================= */

function populateRecipients() {

    const select =
        document.getElementById(
            "meetingRecipient"
        );


    if (!select) return;


    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    /*
       VERY IMPORTANT:

       If current user is Employee,
       stop here.

       Employee should never get
       a recipient dropdown.
    */

    if (!isHR) return;


    const employees =
        getEmployees().filter(user => {

            return (
                String(user.role || "")
                    .trim()
                    .toLowerCase() !== "hr"
            );

        });


    employees.forEach(user => {

        const option =
            document.createElement("option");


        option.value =
            user.email ||
            user.id ||
            user.name;


        option.textContent =
            `${user.name || "Unknown User"}${
                user.email
                    ? ` — ${user.email}`
                    : ""
            }`;


        select.appendChild(option);

    });


    if (employees.length === 0) {

        const option =
            document.createElement("option");


        option.value = "";


        option.textContent =
            "No employees found";


        option.disabled = true;


        select.appendChild(option);

    }

}


/* =========================================================
   CREATE MEETING
   HR ONLY
   ========================================================= */

function createMeeting(event) {

    event.preventDefault();


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        showMeetingToast(
            "Please login first.",
            "error"
        );

        return;

    }


    /*
       SECURITY CHECK

       Only HR can create meetings.
    */

    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    if (!isHR) {

        showMeetingToast(
            "Only HR can schedule and send meetings.",
            "error"
        );

        return;

    }


    const title =
        document
            .getElementById("meetingTitle")
            .value
            .trim();


    const recipient =
        document
            .getElementById("meetingRecipient")
            .value;


    const date =
        document
            .getElementById("meetingDate")
            .value;


    const time =
        document
            .getElementById("meetingTime")
            .value;


    const duration =
        document
            .getElementById("meetingDuration")
            .value;


    const link =
        document
            .getElementById("meetingLink")
            .value
            .trim();


    const description =
        document
            .getElementById("meetingDescription")
            .value
            .trim();


    if (
        !title ||
        !recipient ||
        !date ||
        !time ||
        !link
    ) {

        showMeetingToast(
            "Please complete all required fields.",
            "error"
        );

        return;

    }


    const meeting = {

        id: Date.now(),

        title: title,

        description: description,

        date: date,

        time: time,

        duration: duration,

        link: link,

        /*
           New meeting always starts
           as pending.
        */

        status: "pending",

        createdBy:
            currentUser.email ||
            currentUser.name,

        creatorName:
            currentUser.name ||
            "HR",

        creatorRole: "HR",

        recipient: recipient,

        createdAt:
            new Date().toISOString(),

        responseNote: "",

        changeRequestedDate: "",

        changeRequestedTime: ""

    };


    const meetings =
        getMeetings();


    meetings.unshift(meeting);


    saveMeetings(meetings);


    const form =
        document.getElementById(
            "meetingForm"
        );


    if (form) {
        form.reset();
    }


    showMeetingToast(
        "Meeting request sent successfully.",
        "success"
    );


    renderMeetings();

    updateMeetingStats();

}


/* =========================================================
   RENDER MEETINGS
   ========================================================= */

let currentMeetingFilter = "all";


function renderMeetings(
    filter = currentMeetingFilter
) {

    currentMeetingFilter =
        filter;


    const container =
        document.getElementById(
            "meetingList"
        );


    if (!container) return;


    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const allMeetings =
        getMeetings();


    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    /*
       Show only:

       HR:
       meetings created by HR

       Employee:
       meetings sent to employee
    */

    let meetings =
        allMeetings.filter(meeting => {

            return (
                meeting.createdBy === currentUserKey ||
                meeting.recipient === currentUserKey
            );

        });


    /* Filter */

    if (filter !== "all") {

        meetings =
            meetings.filter(
                meeting =>
                    meeting.status === filter
            );

    }


    const count =
        document.getElementById(
            "meetingCount"
        );


    if (count) {

        count.textContent =
            `${meetings.length} ${
                meetings.length === 1
                    ? "meeting"
                    : "meetings"
            }`;

    }


    /* Empty */

    if (meetings.length === 0) {

        container.innerHTML = `

            <div class="meeting-empty">

                <div class="meeting-empty-icon">

                    <i class="bi bi-calendar-x"></i>

                </div>

                <h3>
                    No meetings found
                </h3>

                <p>

                    ${
                        filter === "all"
                        ? "You don't have any meetings yet."
                        : "There are no meetings with this status."
                    }

                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        meetings
            .map(meeting =>
                createMeetingCard(
                    meeting,
                    currentUser
                )
            )
            .join("");

}


/* =========================================================
   CREATE MEETING CARD
   ========================================================= */

function createMeetingCard(
    meeting,
    currentUser
) {

    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    const isCreator =
        meeting.createdBy ===
        currentUserKey;


    const isReceiver =
        meeting.recipient ===
        currentUserKey;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    const statusInfo =
        getStatusInfo(
            meeting.status
        );


    const dateObject =
        new Date(
            `${meeting.date}T${meeting.time}`
        );


    const formattedDate =
        dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );


    const formattedTime =
        dateObject.toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    let actionButtons = "";


    /*
       EMPLOYEE ACTIONS ONLY

       HR cannot Accept / Reject /
       Request Change.
    */

    if (
        !isHR &&
        isReceiver &&
        meeting.status === "pending"
    ) {

        actionButtons = `

            <div class="meeting-actions">

                <button
                    class="meeting-action accept"
                    onclick="acceptMeeting(${meeting.id})"
                >

                    <i class="bi bi-check-lg"></i>

                    Accept

                </button>


                <button
                    class="meeting-action reject"
                    onclick="rejectMeeting(${meeting.id})"
                >

                    <i class="bi bi-x-lg"></i>

                    Reject

                </button>


                <button
                    class="meeting-action change"
                    onclick="openChangeModal(${meeting.id})"
                >

                    <i class="bi bi-calendar2-event"></i>

                    Request Change

                </button>

            </div>

        `;

    }


    /*
       Join button only after employee
       accepts the meeting.
    */

    const linkButton = `

        <a
            href="${escapeHtml(meeting.link)}"
            target="_blank"
            rel="noopener noreferrer"
            class="meeting-join-btn"
        >

            <i class="bi bi-camera-video"></i>

            Join Meeting

        </a>

    `;


    return `

        <article class="meeting-item">

            <div class="meeting-item-accent"></div>


            <div class="meeting-item-content">


                <!-- ================= TOP ================= -->

                <div class="meeting-item-top">

                    <div class="meeting-title-area">

                        <div class="meeting-small-icon">

                            <i class="bi bi-camera-video"></i>

                        </div>


                        <div>

                            <h3>
                                ${escapeHtml(meeting.title)}
                            </h3>


                            <span class="meeting-created-by">

                                ${
                                    isCreator
                                    ? "Created by you"
                                    : `From ${escapeHtml(
                                        meeting.creatorName
                                      )}`
                                }

                            </span>

                        </div>

                    </div>


                    <span
                        class="
                            meeting-status
                            ${statusInfo.class}
                        "
                    >

                        <span></span>

                        ${statusInfo.text}

                    </span>

                </div>


                <!-- ================= INFO ================= -->

                <div class="meeting-info-grid">


                    <div class="meeting-info">

                        <div class="meeting-info-icon">

                            <i class="bi bi-calendar3"></i>

                        </div>


                        <div>

                            <span>
                                Date
                            </span>

                            <strong>
                                ${formattedDate}
                            </strong>

                        </div>

                    </div>



                    <div class="meeting-info">

                        <div class="meeting-info-icon">

                            <i class="bi bi-clock"></i>

                        </div>


                        <div>

                            <span>
                                Time
                            </span>

                            <strong>
                                ${formattedTime}
                            </strong>

                        </div>

                    </div>



                    <div class="meeting-info">

                        <div class="meeting-info-icon">

                            <i class="bi bi-hourglass"></i>

                        </div>


                        <div>

                            <span>
                                Duration
                            </span>

                            <strong>
                                ${meeting.duration} min
                            </strong>

                        </div>

                    </div>



                    <div class="meeting-info">

                        <div class="meeting-info-icon">

                            <i class="bi bi-person"></i>

                        </div>


                        <div>

                            <span>

                                ${
                                    isCreator
                                    ? "Sent to"
                                    : "From"
                                }

                            </span>


                            <strong>

                                ${
                                    isCreator
                                    ? escapeHtml(
                                        meeting.recipient
                                      )
                                    : escapeHtml(
                                        meeting.creatorName
                                      )
                                }

                            </strong>

                        </div>

                    </div>


                </div>


                <!-- ================= DESCRIPTION ================= -->

                ${
                    meeting.description

                    ? `

                        <div class="meeting-description">

                            <i class="bi bi-info-circle"></i>

                            <p>
                                ${escapeHtml(
                                    meeting.description
                                )}
                            </p>

                        </div>

                    `

                    : ""
                }


                <!-- ================= CHANGE REQUEST ================= -->

                ${
                    meeting.status === "change_requested"

                    ? `

                        <div class="meeting-change-note">

                            <i class="bi bi-arrow-repeat"></i>


                            <div>

                                <strong>
                                    Change requested
                                </strong>


                                <p>

                                    ${
                                        meeting.responseNote
                                        ? escapeHtml(
                                            meeting.responseNote
                                          )
                                        : "The employee requested a different meeting time."
                                    }

                                </p>

                            </div>

                        </div>

                    `

                    : ""
                }


                <!-- ================= REJECTED ================= -->

                ${
                    meeting.status === "rejected"

                    ? `

                        <div class="meeting-rejected-note">

                            <i class="bi bi-x-circle"></i>

                            <span>
                                This meeting was rejected.
                            </span>

                        </div>

                    `

                    : ""
                }


                <!-- ================= FOOTER ================= -->

                <div class="meeting-item-footer">


                    <div class="meeting-created-date">

                        <i class="bi bi-calendar-check"></i>

                        Created

                        ${formatCreatedDate(
                            meeting.createdAt
                        )}

                    </div>


                    <div class="meeting-card-actions">

                        ${
                            meeting.status === "accepted"
                            ? linkButton
                            : ""
                        }


                        ${actionButtons}

                    </div>

                </div>


            </div>

        </article>

    `;

}


/* =========================================================
   STATUS
   ========================================================= */

function getStatusInfo(status) {

    const statuses = {

        pending: {

            text: "Pending",

            class: "pending"

        },


        accepted: {

            text: "Accepted",

            class: "accepted"

        },


        rejected: {

            text: "Rejected",

            class: "rejected"

        },


        change_requested: {

            text: "Change Requested",

            class: "change-requested"

        }

    };


    return (
        statuses[status] ||
        statuses.pending
    );

}


/* =========================================================
   ACCEPT MEETING
   EMPLOYEE ONLY
   ========================================================= */

function acceptMeeting(id) {

    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    /*
       HR cannot accept.
    */

    if (isHR) {

        showMeetingToast(
            "Only employees can respond to a meeting invitation.",
            "error"
        );

        return;

    }


    const meetings =
        getMeetings();


    const meeting =
        meetings.find(
            m => m.id === id
        );


    if (!meeting) return;


    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    /*
       Employee can only respond
       to a meeting sent to them.
    */

    if (
        meeting.recipient !== currentUserKey ||
        meeting.status !== "pending"
    ) {

        showMeetingToast(
            "You are not allowed to respond to this meeting.",
            "error"
        );

        return;

    }


    meeting.status =
        "accepted";


    meeting.responseNote =
        "Meeting accepted.";


    saveMeetings(meetings);


    showMeetingToast(
        "Meeting accepted successfully.",
        "success"
    );


    renderMeetings();

    updateMeetingStats();

}


/* =========================================================
   REJECT MEETING
   EMPLOYEE ONLY
   ========================================================= */

function rejectMeeting(id) {

    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    /*
       HR cannot reject.
    */

    if (isHR) {

        showMeetingToast(
            "Only employees can respond to a meeting invitation.",
            "error"
        );

        return;

    }


    const meetings =
        getMeetings();


    const meeting =
        meetings.find(
            m => m.id === id
        );


    if (!meeting) return;


    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    if (
        meeting.recipient !== currentUserKey ||
        meeting.status !== "pending"
    ) {

        showMeetingToast(
            "You are not allowed to respond to this meeting.",
            "error"
        );

        return;

    }


    meeting.status =
        "rejected";


    meeting.responseNote =
        "Meeting rejected.";


    saveMeetings(meetings);


    showMeetingToast(
        "Meeting rejected.",
        "success"
    );


    renderMeetings();

    updateMeetingStats();

}


/* =========================================================
   OPEN CHANGE MODAL
   EMPLOYEE ONLY
   ========================================================= */

function openChangeModal(id) {

    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    /*
       HR cannot request a change.
    */

    if (isHR) {

        showMeetingToast(
            "Only employees can request a meeting change.",
            "error"
        );

        return;

    }


    const meetings =
        getMeetings();


    const meeting =
        meetings.find(
            m => m.id === id
        );


    if (!meeting) return;


    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    if (
        meeting.recipient !== currentUserKey ||
        meeting.status !== "pending"
    ) {

        showMeetingToast(
            "You are not allowed to request a change for this meeting.",
            "error"
        );

        return;

    }


    const oldModal =
        document.getElementById(
            "meetingChangeModal"
        );


    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");


    modal.id =
        "meetingChangeModal";


    modal.className =
        "meeting-modal-overlay";


    modal.innerHTML = `

        <div class="meeting-modal">


            <button
                class="meeting-modal-close"
                onclick="closeChangeModal()"
            >

                <i class="bi bi-x-lg"></i>

            </button>


            <div class="meeting-modal-icon">

                <i class="bi bi-calendar2-event"></i>

            </div>


            <h2>
                Request a new time
            </h2>


            <p>
                Tell HR when you would prefer
                to have this meeting.
            </p>


            <div class="meeting-modal-form">


                <!-- DATE -->

                <div class="meeting-form-group">

                    <label>
                        New date
                    </label>


                    <div class="meeting-input-wrapper">

                        <i class="bi bi-calendar3"></i>


                        <input
                            type="date"
                            id="changeMeetingDate"
                            value="${meeting.date}"
                            required
                        >

                    </div>

                </div>


                <!-- TIME -->

                <div class="meeting-form-group">

                    <label>
                        New time
                    </label>


                    <div class="meeting-input-wrapper">

                        <i class="bi bi-clock"></i>


                        <input
                            type="time"
                            id="changeMeetingTime"
                            value="${meeting.time}"
                            required
                        >

                    </div>

                </div>


                <!-- NOTE -->

                <div class="meeting-form-group">

                    <label>
                        Note
                    </label>


                    <div class="meeting-textarea-wrapper">

                        <i class="bi bi-chat-left-text"></i>


                        <textarea
                            id="changeMeetingNote"
                            rows="3"
                            placeholder="Why would you like to change the time?"
                        ></textarea>

                    </div>

                </div>


            </div>


            <div class="meeting-modal-actions">


                <button
                    class="meeting-modal-cancel"
                    onclick="closeChangeModal()"
                >

                    Cancel

                </button>


                <button
                    class="meeting-modal-submit"
                    onclick="submitChangeRequest(${id})"
                >

                    <i class="bi bi-send"></i>

                    Send Request

                </button>


            </div>


        </div>

    `;


    document.body.appendChild(modal);


    setTimeout(() => {

        modal.classList.add("show");

    }, 10);

}


/* =========================================================
   SUBMIT CHANGE REQUEST
   EMPLOYEE ONLY
   ========================================================= */

function submitChangeRequest(id) {

    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    if (isHR) {

        showMeetingToast(
            "Only employees can request a meeting change.",
            "error"
        );

        return;

    }


    const dateInput =
        document.getElementById(
            "changeMeetingDate"
        );


    const timeInput =
        document.getElementById(
            "changeMeetingTime"
        );


    const noteInput =
        document.getElementById(
            "changeMeetingNote"
        );


    const newDate =
        dateInput
            ? dateInput.value
            : "";


    const newTime =
        timeInput
            ? timeInput.value
            : "";


    const note =
        noteInput
            ? noteInput.value.trim()
            : "";


    if (
        !newDate ||
        !newTime
    ) {

        showMeetingToast(
            "Please select a new date and time.",
            "error"
        );

        return;

    }


    const meetings =
        getMeetings();


    const meeting =
        meetings.find(
            m => m.id === id
        );


    if (!meeting) return;


    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    /*
       Employee can only change
       meetings sent to them.
    */

    if (
        meeting.recipient !== currentUserKey ||
        meeting.status !== "pending"
    ) {

        showMeetingToast(
            "You are not allowed to request a change for this meeting.",
            "error"
        );

        return;

    }


    meeting.status =
        "change_requested";


    meeting.changeRequestedDate =
        newDate;


    meeting.changeRequestedTime =
        newTime;


    meeting.responseNote =
        note ||
        `Requested new time: ${newDate} at ${newTime}`;


    saveMeetings(meetings);


    closeChangeModal();


    showMeetingToast(
        "Change request sent to HR.",
        "success"
    );


    renderMeetings();

    updateMeetingStats();

}


/* =========================================================
   FILTER
   ========================================================= */

function filterMeetings(
    filter,
    button
) {

    document
        .querySelectorAll(
            ".meeting-filter"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    renderMeetings(filter);

}


/* =========================================================
   UPDATE STATS
   ========================================================= */

function updateMeetingStats() {

    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const currentUserKey =
        currentUser.email ||
        currentUser.name;


    const meetings =
        getMeetings().filter(meeting => {

            return (
                meeting.createdBy ===
                    currentUserKey

                ||

                meeting.recipient ===
                    currentUserKey
            );

        });


    const total =
        meetings.length;


    const pending =
        meetings.filter(
            meeting =>
                meeting.status === "pending"
        ).length;


    const accepted =
        meetings.filter(
            meeting =>
                meeting.status === "accepted"
        ).length;


    const now =
        new Date();


    const upcoming =
        meetings.filter(meeting => {

            const date =
                new Date(
                    `${meeting.date}T${meeting.time}`
                );


            return (
                date >= now &&
                meeting.status === "accepted"
            );

        }).length;


    setText(
        "meetingTotal",
        total
    );


    setText(
        "meetingPending",
        pending
    );


    setText(
        "meetingAccepted",
        accepted
    );


    setText(
        "meetingUpcoming",
        upcoming
    );

}


/* =========================================================
   SET TEXT
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   SET MINIMUM DATE
   ========================================================= */

function setMinimumDate() {

    const input =
        document.getElementById(
            "meetingDate"
        );


    if (!input) return;


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    input.min =
        `${year}-${month}-${day}`;

}


/* =========================================================
   SCROLL TO FORM
   HR ONLY
   ========================================================= */

function scrollToMeetingForm() {

    const currentUser =
        getCurrentUser();


    if (!currentUser) return;


    const isHR =
        String(currentUser.role || "")
            .trim()
            .toLowerCase() === "hr";


    if (!isHR) {

        showMeetingToast(
            "Only HR can schedule meetings.",
            "error"
        );

        return;

    }


    const card =
        document.getElementById(
            "meetingCreateCard"
        );


    if (!card) return;


    card.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =========================================================
   CLOSE CHANGE MODAL
   ========================================================= */

function closeChangeModal() {

    const modal =
        document.getElementById(
            "meetingChangeModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    setTimeout(() => {

        if (modal) {
            modal.remove();
        }

    }, 250);

}


/* =========================================================
   TOAST
   ========================================================= */

function showMeetingToast(
    message,
    type = "success"
) {

    const old =
        document.querySelector(
            ".meeting-toast"
        );


    if (old) {
        old.remove();
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `meeting-toast ${type}`;


    toast.innerHTML = `

        <div class="meeting-toast-icon">

            <i class="bi ${
                type === "success"
                ? "bi-check-lg"
                : "bi-exclamation-lg"
            }"></i>

        </div>


        <span>
            ${escapeHtml(message)}
        </span>

    `;


    document.body.appendChild(
        toast
    );


    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 10);


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   FORMAT CREATED DATE
   ========================================================= */

function formatCreatedDate(date) {

    if (!date) return "";


    const d =
        new Date(date);


    return d.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric"
        }
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

    if (
        value === undefined ||
        value === null
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