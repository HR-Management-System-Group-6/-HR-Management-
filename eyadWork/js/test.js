/* =========================================================
   MEETING MANAGEMENT
========================================================= */


/* =========================================================
   LOCAL STORAGE KEYS
========================================================= */

const MEETINGS_KEY = "meetings";
const EMPLOYEES_KEY = "employees";
const CURRENT_USER_KEY = "currentUser";


/* =========================================================
   GET ELEMENTS
========================================================= */

const hrView = document.getElementById("hrView");
const employeeView = document.getElementById("employeeView");

const meetingForm = document.getElementById("meetingForm");

const employeeSelect = document.getElementById("employeeSelect");

const meetingsList = document.getElementById("meetingsList");
const employeeMeetings = document.getElementById("employeeMeetings");

const emptyState = document.getElementById("emptyState");
const employeeEmptyState = document.getElementById("employeeEmptyState");

const meetingCount = document.getElementById("meetingCount");

const statusFilter = document.getElementById("statusFilter");

const userNameElement = document.getElementById("userName");
const userRoleElement = document.getElementById("userRole");
const userAvatar = document.getElementById("userAvatar");

const pageDescription = document.getElementById("pageDescription");


/* MODAL */

const changeModal = document.getElementById("changeModal");

const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");

const changeRequestForm =
    document.getElementById("changeRequestForm");

const changeMeetingId =
    document.getElementById("changeMeetingId");

const newMeetingDate =
    document.getElementById("newMeetingDate");

const newMeetingTime =
    document.getElementById("newMeetingTime");

const changeReason =
    document.getElementById("changeReason");


/* TOAST */

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser() {

    const savedUser =
        localStorage.getItem(CURRENT_USER_KEY);

    if (savedUser) {

        try {

            return JSON.parse(savedUser);

        } catch (error) {

            console.log(
                "Invalid currentUser in localStorage"
            );
        }
    }


    /*
       Fallback user.
       Change this if your login system uses another key.
    */

    return {
        name: "Ahmad Khaled",
        email: "hr@example.com",
        role: "HR"
    };
}


const currentUser = getCurrentUser();


/* =========================================================
   STORAGE HELPERS
========================================================= */

function getMeetings() {

    const saved =
        localStorage.getItem(MEETINGS_KEY);

    if (!saved) {
        return [];
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Could not read meetings",
            error
        );

        return [];
    }
}


function saveMeetings(meetings) {

    localStorage.setItem(
        MEETINGS_KEY,
        JSON.stringify(meetings)
    );
}


function getEmployees() {

    const saved =
        localStorage.getItem(EMPLOYEES_KEY);

    if (!saved) {
        return [];
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Could not read employees",
            error
        );

        return [];
    }
}


/* =========================================================
   INITIALIZE USER UI
========================================================= */

function initializeUser() {

    const name =
        currentUser.name ||
        currentUser.fullName ||
        currentUser.username ||
        "User";

    const role =
        currentUser.role ||
        "Employee";

    userNameElement.textContent = name;

    userRoleElement.textContent = role;

    userAvatar.textContent =
        getInitials(name);


    /*
       HR / Employee view
    */

    const normalizedRole =
        String(role).toLowerCase();


    if (
        normalizedRole === "hr" ||
        normalizedRole === "admin" ||
        normalizedRole === "human resources"
    ) {

        showHRView();

    } else {

        showEmployeeView();
    }
}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

    if (!name) {
        return "US";
    }

    const parts =
        name.trim().split(/\s+/);

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


/* =========================================================
   SHOW HR VIEW
========================================================= */

function showHRView() {

    hrView.style.display = "block";

    employeeView.style.display = "none";

    pageDescription.textContent =
        "Schedule and manage meetings with your employees.";

    loadEmployees();

    renderHRMeetings();
}


/* =========================================================
   SHOW EMPLOYEE VIEW
========================================================= */

function showEmployeeView() {

    hrView.style.display = "none";

    employeeView.style.display = "block";

    pageDescription.textContent =
        "Review your meetings and respond to invitations.";

    renderEmployeeMeetings();
}


/* =========================================================
   LOAD EMPLOYEES
========================================================= */

function loadEmployees() {

    const employees =
        getEmployees();

    employeeSelect.innerHTML = `
        <option value="">
            Select employee
        </option>
    `;


    /*
       If your employees are stored in localStorage,
       they will appear here.
    */

    employees
        .filter(employee => {

            const role =
                String(employee.role || "")
                    .toLowerCase();

            return role !== "hr";

        })
        .forEach(employee => {

            const option =
                document.createElement("option");

            option.value =
                employee.email ||
                employee.id ||
                employee.name;

            option.textContent =
                employee.name ||
                employee.fullName ||
                employee.email;

            option.dataset.name =
                employee.name ||
                employee.fullName ||
                "";

            employeeSelect.appendChild(option);
        });


    /*
       Fallback examples if there are no employees.
       Remove this section if your employees array
       is always available.
    */

    if (employees.length === 0) {

        const demoEmployees = [
            {
                name: "Eyad Mansur",
                email: "eyad@example.com"
            },
            {
                name: "Lujain Okour",
                email: "lujain@example.com"
            },
            {
                name: "Ahmad Khaled",
                email: "ahmad@example.com"
            }
        ];


        demoEmployees.forEach(employee => {

            const option =
                document.createElement("option");

            option.value =
                employee.email;

            option.textContent =
                employee.name;

            option.dataset.name =
                employee.name;

            employeeSelect.appendChild(option);
        });
    }
}


/* =========================================================
   CREATE MEETING
========================================================= */

meetingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const selectedEmployee =
            employeeSelect.options[
                employeeSelect.selectedIndex
            ];


        if (!selectedEmployee ||
            !selectedEmployee.value) {

            showToast(
                "Please select an employee.",
                "error"
            );

            return;
        }


        const title =
            document
                .getElementById("meetingTitle")
                .value
                .trim();

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


        if (!title || !date || !time || !link) {

            showToast(
                "Please complete all required fields.",
                "error"
            );

            return;
        }


        const employeeEmail =
            selectedEmployee.value;

        const employeeName =
            selectedEmployee.dataset.name ||
            selectedEmployee.textContent;


        const meeting = {

            id:
                "meeting_" +
                Date.now(),

            title,

            description,

            employeeEmail,

            employeeName,

            date,

            time,

            duration,

            link,

            createdBy:
                currentUser.name ||
                currentUser.email,

            createdAt:
                new Date().toISOString(),

            status: "Pending",

            changeRequest: null
        };


        const meetings =
            getMeetings();

        meetings.unshift(meeting);

        saveMeetings(meetings);


        meetingForm.reset();


        showToast(
            "Meeting scheduled successfully.",
            "success"
        );


        renderHRMeetings();
    }
);


/* =========================================================
   RENDER HR MEETINGS
========================================================= */

function renderHRMeetings() {

    let meetings =
        getMeetings();


    const filter =
        statusFilter.value;


    if (filter !== "all") {

        meetings =
            meetings.filter(
                meeting =>
                    meeting.status === filter
            );
    }


    meetingCount.textContent =
        getMeetings().length;


    if (meetings.length === 0) {

        meetingsList.innerHTML = "";

        emptyState.style.display = "block";

        return;
    }


    emptyState.style.display = "none";


    meetingsList.innerHTML =
        meetings.map(
            meeting =>
                createHRMeetingHTML(meeting)
        ).join("");
}


/* =========================================================
   HR MEETING HTML
========================================================= */

function createHRMeetingHTML(meeting) {

    const statusClass =
        getStatusClass(meeting.status);


    const formattedDate =
        formatDate(meeting.date);


    return `

        <article class="meeting-item">

            <div class="meeting-main">

                <div class="meeting-info">

                    <div class="meeting-title">
                        ${escapeHTML(meeting.title)}
                    </div>

                    <div class="meeting-description">
                        ${
                            escapeHTML(
                                meeting.description ||
                                "No description provided."
                            )
                        }
                    </div>


                    <div class="meeting-meta">

                        <span class="meta-item">
                            👤
                            ${escapeHTML(
                                meeting.employeeName
                            )}
                        </span>

                        <span class="meta-item">
                            📅
                            ${formattedDate}
                        </span>

                        <span class="meta-item">
                            🕐
                            ${formatTime(meeting.time)}
                        </span>

                        <span class="meta-item">
                            ⏱
                            ${meeting.duration} min
                        </span>

                    </div>

                </div>


                <div class="meeting-actions">

                    <span
                        class="status-badge ${statusClass}"
                    >
                        ${meeting.status}
                    </span>

                </div>

            </div>


            ${
                meeting.changeRequest
                ?
                `
                <div class="change-request-box">

                    <strong>
                        Employee requested a change
                    </strong>

                    <p>
                        ${escapeHTML(
                            meeting.changeRequest.reason
                        )}
                    </p>

                    <small>
                        Suggested:
                        ${formatDate(
                            meeting.changeRequest.date
                        )}
                        at
                        ${formatTime(
                            meeting.changeRequest.time
                        )}
                    </small>

                </div>
                `
                :
                ""
            }

        </article>
    `;
}


/* =========================================================
   FILTER
========================================================= */

statusFilter.addEventListener(
    "change",
    renderHRMeetings
);


/* =========================================================
   EMPLOYEE MEETINGS
========================================================= */

function renderEmployeeMeetings() {

    const meetings =
        getMeetings();


    const userEmail =
        String(
            currentUser.email || ""
        ).toLowerCase();


    const userName =
        String(
            currentUser.name ||
            currentUser.fullName ||
            ""
        ).toLowerCase();


    const myMeetings =
        meetings.filter(meeting => {

            const meetingEmail =
                String(
                    meeting.employeeEmail || ""
                ).toLowerCase();

            const meetingName =
                String(
                    meeting.employeeName || ""
                ).toLowerCase();


            return (
                meetingEmail === userEmail ||
                meetingName === userName
            );
        });


    meetingCount.textContent =
        myMeetings.length;


    if (myMeetings.length === 0) {

        employeeMeetings.innerHTML = "";

        employeeEmptyState.style.display =
            "block";

        return;
    }


    employeeEmptyState.style.display =
        "none";


    employeeMeetings.innerHTML =
        myMeetings.map(
            meeting =>
                createEmployeeMeetingHTML(meeting)
        ).join("");
}


/* =========================================================
   EMPLOYEE MEETING HTML
========================================================= */

function createEmployeeMeetingHTML(meeting) {

    const statusClass =
        getStatusClass(meeting.status);


    const isPending =
        meeting.status === "Pending";


    const isAccepted =
        meeting.status === "Accepted";


    return `

        <article
            class="employee-meeting"
            data-id="${meeting.id}"
        >

            <div class="employee-meeting-top">

                <div>

                    <h3>
                        ${escapeHTML(meeting.title)}
                    </h3>

                    <p class="employee-meeting-description">

                        ${
                            escapeHTML(
                                meeting.description ||
                                "No description provided."
                            )
                        }

                    </p>

                </div>


                <span
                    class="status-badge ${statusClass}"
                >
                    ${meeting.status}
                </span>

            </div>


            <div class="meeting-date-box">

                <div class="date-icon">
                    📅
                </div>

                <div class="date-info">

                    <strong>
                        ${formatDate(meeting.date)}
                    </strong>

                    <span>
                        ${formatTime(meeting.time)}
                        ·
                        ${meeting.duration} minutes
                    </span>

                </div>

            </div>


            <div class="meeting-date-box">

                <div class="date-icon">
                    👤
                </div>

                <div class="date-info">

                    <strong>
                        ${escapeHTML(meeting.createdBy)}
                    </strong>

                    <span>
                        Meeting organizer
                    </span>

                </div>

            </div>


            ${
                meeting.changeRequest
                ?
                `
                <div class="change-request-box">

                    <strong>
                        Change request
                    </strong>

                    <p>
                        ${escapeHTML(
                            meeting.changeRequest.reason
                        )}
                    </p>

                    <small>
                        Requested:
                        ${formatDate(
                            meeting.changeRequest.date
                        )}
                        at
                        ${formatTime(
                            meeting.changeRequest.time
                        )}
                    </small>

                </div>
                `
                :
                ""
            }


            ${
                isPending
                ?
                `
                <div class="employee-actions">

                    <button
                        class="small-btn accept-btn"
                        onclick="acceptMeeting('${meeting.id}')"
                    >
                        ✓ Accept
                    </button>

                    <button
                        class="small-btn reject-btn"
                        onclick="rejectMeeting('${meeting.id}')"
                    >
                        × Reject
                    </button>

                    <button
                        class="small-btn change-btn"
                        onclick="openChangeModal('${meeting.id}')"
                    >
                        ↻ Request Change
                    </button>

                </div>
                `
                :
                ""
            }


            ${
                isAccepted
                ?
                `
                <div class="employee-actions">

                    <a
                        href="${escapeAttribute(meeting.link)}"
                        target="_blank"
                        class="join-btn"
                    >
                        Join Meeting →
                    </a>

                    <button
                        class="small-btn change-btn"
                        onclick="openChangeModal('${meeting.id}')"
                    >
                        ↻ Request Change
                    </button>

                </div>
                `
                :
                ""
            }

        </article>

    `;
}


/* =========================================================
   ACCEPT MEETING
========================================================= */

function acceptMeeting(id) {

    const meetings =
        getMeetings();


    const meeting =
        meetings.find(
            item => item.id === id
        );


    if (!meeting) {
        return;
    }


    meeting.status =
        "Accepted";


    meeting.respondedAt =
        new Date().toISOString();


    saveMeetings(meetings);


    showToast(
        "Meeting accepted successfully.",
        "success"
    );


    renderEmployeeMeetings();
}


/* =========================================================
   REJECT MEETING
========================================================= */

function rejectMeeting(id) {

    const confirmed =
        confirm(
            "Are you sure you want to reject this meeting?"
        );


    if (!confirmed) {
        return;
    }


    const meetings =
        getMeetings();


    const meeting =
        meetings.find(
            item => item.id === id
        );


    if (!meeting) {
        return;
    }


    meeting.status =
        "Rejected";


    meeting.respondedAt =
        new Date().toISOString();


    saveMeetings(meetings);


    showToast(
        "Meeting rejected.",
        "success"
    );


    renderEmployeeMeetings();
}


/* =========================================================
   OPEN CHANGE MODAL
========================================================= */

function openChangeModal(id) {

    changeMeetingId.value =
        id;


    const meeting =
        getMeetings().find(
            item => item.id === id
        );


    if (!meeting) {
        return;
    }


    newMeetingDate.value =
        meeting.date;

    newMeetingTime.value =
        meeting.time;


    changeReason.value = "";


    changeModal.classList.add(
        "show"
    );
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeChangeModal() {

    changeModal.classList.remove(
        "show"
    );
}


closeModal.addEventListener(
    "click",
    closeChangeModal
);


cancelModal.addEventListener(
    "click",
    closeChangeModal
);


changeModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            changeModal
        ) {

            closeChangeModal();
        }
    }
);


/* =========================================================
   CHANGE REQUEST
========================================================= */

changeRequestForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            changeMeetingId.value;


        const meetings =
            getMeetings();


        const meeting =
            meetings.find(
                item => item.id === id
            );


        if (!meeting) {
            return;
        }


        meeting.status =
            "Change Requested";


        meeting.changeRequest = {

            date:
                newMeetingDate.value,

            time:
                newMeetingTime.value,

            reason:
                changeReason.value.trim(),

            requestedAt:
                new Date().toISOString()
        };


        saveMeetings(meetings);


        closeChangeModal();


        showToast(
            "Change request sent to HR.",
            "success"
        );


        renderEmployeeMeetings();
    }
);


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(status) {

    switch (status) {

        case "Accepted":
            return "status-accepted";

        case "Rejected":
            return "status-rejected";

        case "Change Requested":
            return "status-change";

        default:
            return "status-pending";
    }
}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


/* =========================================================
   TIME FORMAT
========================================================= */

function formatTime(timeString) {

    if (!timeString) {
        return "-";
    }


    const parts =
        timeString.split(":");


    let hours =
        parseInt(parts[0], 10);

    const minutes =
        parts[1];


    const period =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    return `${hours}:${minutes} ${period}`;
}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHTML(value) {

    if (value === undefined ||
        value === null) {

        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(
    message,
    type = "success"
) {

    toastMessage.textContent =
        message;


    toast.className =
        "toast show " + type;


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );
}


/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


logoutBtn.addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        /*
           If your project uses another
           localStorage key for login,
           change it here.
        */

        localStorage.removeItem(
            CURRENT_USER_KEY
        );


        window.location.href =
            "login.html";
    }
);


/* =========================================================
   SET MIN DATE
========================================================= */

function setMinimumDate() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const meetingDate =
        document.getElementById(
            "meetingDate"
        );


    const newDate =
        document.getElementById(
            "newMeetingDate"
        );


    if (meetingDate) {

        meetingDate.min =
            today;
    }


    if (newDate) {

        newDate.min =
            today;
    }
}


/* =========================================================
   INITIALIZE
========================================================= */

setMinimumDate();

initializeUser();