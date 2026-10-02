/* =========================================================
   FEEDBACK PAGE
   Employee + HR
========================================================= */

function displayFeedback() {

    const content = document.getElementById("content");

    if (!content) {
        console.error("Element #content was not found.");
        return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        content.innerHTML = `
            <div class="feedback-login-message">
                <div class="feedback-login-icon">
                    <i class="bi bi-person-lock"></i>
                </div>
                <h2>Session expired</h2>
                <p>Please login again to access feedback.</p>
            </div>
        `;
        return;
    }

    const role = (user.role || "").toLowerCase();

    /* =====================================================
       EMPLOYEE VIEW
    ===================================================== */

    if (role === "employee") {

        content.innerHTML = `

            <main class="feedback-main">

                <div class="employee-feedback-page">

                    <!-- =========================================
                         HERO
                    ========================================== -->

                    <section class="feedback-hero">

                        <div class="feedback-hero-content">

                            <div class="feedback-breadcrumb">
                                <span class="breadcrumb-dot"></span>
                                <span>MY WORKSPACE</span>
                                <i class="bi bi-chevron-right"></i>
                                <span>FEEDBACK</span>
                            </div>

                            <div class="hero-title-row">

                                <div>
                                    <h1>Let's stay connected.</h1>

                                    <p>
                                        Have a question, suggestion, or need help?
                                        Send a message to the HR team and we'll get back to you.
                                    </p>
                                </div>

                                <div class="hero-icon">
                                    <i class="bi bi-chat-square-heart"></i>
                                </div>

                            </div>

                        </div>

                    </section>


                    <!-- =========================================
                         MAIN GRID
                    ========================================== -->

                    <section class="feedback-content-grid">

                        <!-- =====================================
                             LEFT SIDE
                        ====================================== -->

                        <div class="feedback-left-column">

                            <!-- Contact Card -->

                            <div class="feedback-section-heading">

  

                            </div>


                            <div class="modern-contact-card">

                                <!-- Email -->

                                <a
                                    href="mailto:hr@company.com"
                                    class="modern-contact-item"
                                >

                                    <div class="modern-contact-icon email-icon">
                                        <i class="bi bi-envelope"></i>
                                    </div>

                                    <div class="modern-contact-info">

                                        <span>Email</span>

                                        <strong>
                                            hr@company.com
                                        </strong>

                                        <small>
                                            Send us an email
                                        </small>

                                    </div>

                                    <div class="contact-arrow">
                                        <i class="bi bi-arrow-up-right"></i>
                                    </div>

                                </a>


                                <!-- Phone -->

                                <a
                                    href="tel:+000000000000"
                                    class="modern-contact-item"
                                >

                                    <div class="modern-contact-icon phone-icon">
                                        <i class="bi bi-telephone"></i>
                                    </div>

                                    <div class="modern-contact-info">

                                        <span>Phone</span>

                                        <strong>
                                            +00 000 000 0000
                                        </strong>

                                        <small>
                                            Call during working hours
                                        </small>

                                    </div>

                                    <div class="contact-arrow">
                                        <i class="bi bi-arrow-up-right"></i>
                                    </div>

                                </a>


                                <!-- Address -->

                                <div class="modern-contact-item">

                                    <div class="modern-contact-icon location-icon">
                                        <i class="bi bi-geo-alt"></i>
                                    </div>

                                    <div class="modern-contact-info">

                                        <span>Office</span>

                                        <strong>
                                            Company Headquarters
                                        </strong>

                                        <small>
                                            Company address, City, Country
                                        </small>

                                    </div>

                                    <div class="contact-arrow">
                                        <i class="bi bi-building"></i>
                                    </div>

                                </div>


                                <!-- Working Hours -->

                                <div class="modern-contact-item">

                                    <div class="modern-contact-icon time-icon">
                                        <i class="bi bi-clock"></i>
                                    </div>

                                    <div class="modern-contact-info">

                                        <span>Working hours</span>

                                        <strong>
                                            Sunday – Thursday
                                        </strong>

                                        <small>
                                            9:00 AM – 5:00 PM
                                        </small>

                                    </div>

                                    <div class="contact-arrow">
                                        <i class="bi bi-calendar3"></i>
                                    </div>

                                </div>

                            </div>


                            <!-- Office Card -->

                            <div class="office-card">

                                <div class="office-card-top">

                                    <div>

                                        <span class="section-eyebrow">
                                            OUR OFFICE
                                        </span>

                                        <h3>
                                            Visit our headquarters
                                        </h3>

                                    </div>

                                    <div class="office-status">
                                        <span></span>
                                        Available
                                    </div>

                                </div>


                                <div class="office-map">

                                    <div class="map-grid"></div>

                                    <div class="map-road road-one"></div>
                                    <div class="map-road road-two"></div>
                                    <div class="map-road road-three"></div>

                                    <div class="map-location">

                                        <div class="map-location-pulse"></div>

                                        <div class="map-location-pin">
                                            <i class="bi bi-geo-alt-fill"></i>
                                        </div>

                                    </div>

                                    <div class="map-tooltip">

                                        <strong>Head Office</strong>

                                        <span>
                                            Company Headquarters
                                        </span>

                                    </div>

                                </div>


                                <div class="office-footer">

                                    <div class="office-address">

                                        <i class="bi bi-geo-alt"></i>

                                        <span>
                                            Company address, City, Country
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        class="office-map-button"
                                        onclick="openCompanyMap()"
                                    >
                                        Open Maps
                                        <i class="bi bi-arrow-up-right"></i>
                                    </button>

                                </div>

                            </div>

                        </div>


                        <!-- =====================================
                             RIGHT SIDE - FORM
                        ====================================== -->

                        <div class="feedback-right-column">

                            <div class="message-card">

                                <!-- Form Header -->

                                <div class="message-card-header">

                                    <div class="message-header-icon">
                                        <i class="bi bi-send"></i>
                                    </div>

                                    <div>

                                        <span class="section-eyebrow">
                                            SEND FEEDBACK
                                        </span>

                                        <h2>
                                            Send us a message
                                        </h2>

                                        <p>
                                            Tell us what you need and we'll take care of it.
                                        </p>

                                    </div>

                                </div>


                                <!-- Form -->

                                <form
                                    id="feedbackForm"
                                    class="modern-feedback-form"
                                    novalidate
                                >

                                    <!-- User Information -->

                                    <div class="profile-info-box">

                                        <div class="profile-info-header">

                                            <div class="mini-profile-icon">
                                                <i class="bi bi-person"></i>
                                            </div>

                                            <div>

                                                <strong>
                                                    Your profile
                                                </strong>

                                                <span>
                                                    These details are automatically filled in.
                                                </span>

                                            </div>

                                            <i class="bi bi-shield-check profile-verified"></i>

                                        </div>


                                        <div class="profile-fields">

                                            <div class="modern-form-group">

                                                <label for="name">
                                                    Full name
                                                </label>

                                                <div class="locked-input">

                                                    <input
                                                        type="text"
                                                        id="name"
                                                        readonly
                                                    >

                                                    <i class="bi bi-lock-fill"></i>

                                                </div>

                                            </div>


                                            <div class="modern-form-group">

                                                <label for="email">
                                                    Email address
                                                </label>

                                                <div class="locked-input">

                                                    <input
                                                        type="email"
                                                        id="email"
                                                        readonly
                                                    >

                                                    <i class="bi bi-lock-fill"></i>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    <!-- Subject -->

                                    <div class="modern-form-group">

                                        <label for="subject">
                                            Subject
                                            <span>*</span>
                                        </label>

                                        <div class="input-wrapper">

                                            <i class="bi bi-chat-left-text"></i>

                                            <input
                                                type="text"
                                                id="subject"
                                                class="modern-input"
                                                placeholder="What is this message about?"
                                                maxlength="100"
                                            >

                                        </div>

                                        <div
                                            class="error-message"
                                            id="subjectError"
                                        ></div>

                                    </div>


                                    <!-- Message -->

                                    <div class="modern-form-group">

                                        <div class="label-row">

                                            <label for="message">
                                                Message
                                                <span>*</span>
                                            </label>

                                            <span class="required-hint">
                                                Required
                                            </span>

                                        </div>


                                        <div class="textarea-wrapper">

                                            <textarea
                                                id="message"
                                                class="modern-textarea"
                                                rows="7"
                                                maxlength="500"
                                                placeholder="Write your message here..."
                                            ></textarea>

                                            <div class="textarea-bottom">

                                                <span>
                                                    <i class="bi bi-pencil"></i>
                                                    Tell us how we can help
                                                </span>

                                                <span class="char-counter">
                                                    <strong id="charCount">0</strong>
                                                    / 500
                                                </span>

                                            </div>

                                        </div>

                                        <div
                                            class="error-message"
                                            id="messageError"
                                        ></div>

                                    </div>


                                    <!-- Submit -->

                                    <button
                                        type="submit"
                                        class="modern-submit-btn"
                                    >

                                        <span>
                                            Send Message
                                        </span>

                                        <i class="bi bi-arrow-right"></i>

                                    </button>


                                    <div class="form-security-note">

                                        <i class="bi bi-shield-check"></i>

                                        <span>
                                            Your message will be securely sent to the HR team.
                                        </span>

                                    </div>


                                    <div
                                        class="success-message"
                                        id="feedbackSuccess"
                                    ></div>

                                </form>

                            </div>

                        </div>

                    </section>

                </div>

            </main>
        `;
    }


    /* =====================================================
       HR VIEW
    ===================================================== */

    else if (role === "hr") {

        content.innerHTML = `

            <main class="feedback-main">

                <div class="employee-feedback-page">

                    <section class="feedback-hero hr-feedback-hero">

                        <div class="feedback-hero-content">

                            <div class="feedback-breadcrumb">
                                <span class="breadcrumb-dot"></span>
                                <span>MY WORKSPACE</span>
                                <i class="bi bi-chevron-right"></i>
                                <span>FEEDBACK</span>
                            </div>

                            <div class="hero-title-row">

                                <div>
                                    <h1>Feedback Center</h1>

                                    <p>
                                        View, search and manage employee feedback.
                                    </p>
                                </div>

                                <div class="hero-icon">
                                    <i class="bi bi-chat-square-text"></i>
                                </div>

                            </div>

                        </div>

                    </section>


                    <section id="hrView">

                        <!-- Stats -->

                        <div class="feedback-stats">

                            <div class="stat-card modern-stat total-stat">

                                <div class="stat-icon">
                                    <i class="bi bi-chat-square-text"></i>
                                </div>

                                <div>
                                    <span>Total feedback</span>
                                    <strong id="totalCount">0</strong>
                                </div>

                            </div>


                            <div class="stat-card modern-stat new-stat">

                                <div class="stat-icon">
                                    <i class="bi bi-envelope"></i>
                                </div>

                                <div>
                                    <span>New messages</span>
                                    <strong id="newCount">0</strong>
                                </div>

                            </div>


                            <div class="stat-card modern-stat reviewed-stat">

                                <div class="stat-icon">
                                    <i class="bi bi-check2-circle"></i>
                                </div>

                                <div>
                                    <span>Reviewed</span>
                                    <strong id="reviewedCount">0</strong>
                                </div>

                            </div>

                        </div>


                        <!-- Filters -->

                        <div class="feedback-filters modern-filters">

                            <div class="search-wrapper">

                                <i class="bi bi-search"></i>

                                <input
                                    type="text"
                                    id="searchInput"
                                    class="form-control"
                                    placeholder="Search by name, email or subject..."
                                >

                            </div>

                            <div class="select-wrapper">

                                <i class="bi bi-funnel"></i>

                                <select
                                    id="filterStatus"
                                    class="form-control"
                                >

                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="new">
                                        New
                                    </option>

                                    <option value="reviewed">
                                        Reviewed
                                    </option>

                                </select>

                            </div>

                        </div>


                        <!-- Table -->

                        <div class="feedback-table-wrapper">

                            <table class="feedback-table">

                                <thead>

                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>

                                <tbody id="feedbackTableBody"></tbody>

                            </table>

                        </div>

                    </section>

                </div>

            </main>
        `;
    }


    /* Initialize */

    initFeedbackPage();
}


/* =========================================================
   INIT
========================================================= */

function initFeedbackPage() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const role = user?.role?.toLowerCase();

    setupUserInfo();

    if (role === "hr") {

        setupHRFilters();

        loadFeedbacks();

        updateStats();

    } else if (role === "employee") {

        setupFormValidation();

        setupCharCounter();
    }
}


/* =========================================================
   USER INFO
========================================================= */

function setupUserInfo() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!user) return;


    const userInfo = document.getElementById("userInfo");

    if (userInfo) {

        const initials = (user.name || "U")
            .trim()
            .split(/\s+/)
            .map(name => name[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

        userInfo.innerHTML = `

            <div class="avatar">
                ${initials}
            </div>

            <div class="user-text">

                <strong>
                    ${user.name || "Employee"}
                </strong>

                <span>
                    ${user.role || "Employee"}
                </span>

            </div>
        `;
    }


    const nameInput = document.getElementById("name");

    const emailInput = document.getElementById("email");


    if (nameInput) {
        nameInput.value = user.name || "";
    }


    if (emailInput) {
        emailInput.value = user.email || "";
    }
}


/* =========================================================
   FORM VALIDATION
========================================================= */

function setupFormValidation() {

    const form = document.getElementById("feedbackForm");

    if (!form) return;


    form.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();


        const subjectElement =
            document.getElementById("subject");

        const messageElement =
            document.getElementById("message");


        const subject =
            subjectElement.value.trim();

        const message =
            messageElement.value.trim();


        let valid = true;


        /* Subject */

        if (subject.length < 3) {

            showError(
                "subject",
                "subjectError",
                "Subject is required and must contain at least 3 characters."
            );

            valid = false;
        }


        /* Message */

        if (message.length < 10) {

            showError(
                "message",
                "messageError",
                "Message is required and must contain at least 10 characters."
            );

            valid = false;
        }


        if (!valid) return;


        const user = JSON.parse(
            localStorage.getItem("loggedInUser")
        );


        const feedback = {

            id: Date.now(),

            name: user?.name || "Guest",

            email:
                user?.email ||
                "guest@company.com",

            subject: subject,

            message: message,

            status: "new",

            date:
                new Date()
                    .toISOString()
                    .split("T")[0]
        };


        saveFeedback(feedback);


        form.reset();

        setupUserInfo();

        const counter =
            document.getElementById("charCount");

        if (counter) {
            counter.textContent = "0";
        }


        showSuccess(
            "Message sent successfully!"
        );
    });
}


/* =========================================================
   CHARACTER COUNTER
========================================================= */

function setupCharCounter() {

    const message =
        document.getElementById("message");

    const counter =
        document.getElementById("charCount");

    if (!message || !counter) return;


    message.addEventListener(
        "input",
        function () {

            counter.textContent =
                message.value.length;
        }
    );
}


/* =========================================================
   ERRORS
========================================================= */

function clearErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(element => {

            element.textContent = "";

        });


    document
        .querySelectorAll(".modern-input, .modern-textarea")
        .forEach(element => {

            element.classList.remove("error");

        });
}


function showError(
    inputId,
    errorId,
    message
) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(errorId);


    if (input) {
        input.classList.add("error");
    }


    if (error) {
        error.textContent = message;
    }
}


/* =========================================================
   SUCCESS
========================================================= */

function showSuccess(message) {

    const success =
        document.getElementById("feedbackSuccess");

    if (!success) return;


    success.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${message}</span>
    `;

    success.classList.add("show");


    setTimeout(() => {

        success.classList.remove("show");

    }, 4500);
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getFeedbacks() {

    try {

        return JSON.parse(
            localStorage.getItem("feedbacks")
        ) || [];

    } catch (error) {

        console.error(
            "Could not read feedbacks:",
            error
        );

        return [];
    }
}


function saveFeedback(feedback) {

    const feedbacks =
        getFeedbacks();

    feedbacks.push(feedback);

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );
}


/* =========================================================
   HR - LOAD FEEDBACKS
========================================================= */

function loadFeedbacks() {

    const tbody =
        document.getElementById(
            "feedbackTableBody"
        );

    if (!tbody) return;


    const search =
        (
            document.getElementById(
                "searchInput"
            )?.value || ""
        ).toLowerCase();


    const status =
        document.getElementById(
            "filterStatus"
        )?.value || "";


    let feedbacks =
        getFeedbacks();


    if (search) {

        feedbacks =
            feedbacks.filter(f =>

                (f.name || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (f.email || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (f.subject || "")
                    .toLowerCase()
                    .includes(search)
            );
    }


    if (status) {

        feedbacks =
            feedbacks.filter(
                f => f.status === status
            );
    }


    feedbacks.sort(
        (a, b) => b.id - a.id
    );


    if (feedbacks.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="empty-state">

                        <div class="empty-state-icon">
                            <i class="bi bi-chat-square"></i>
                        </div>

                        <strong>
                            No feedback found
                        </strong>

                        <span>
                            There are no messages matching your search.
                        </span>

                    </div>

                </td>

            </tr>
        `;

        updateStats();

        return;
    }


    tbody.innerHTML =
        feedbacks.map((feedback, index) => {

            return `

                <tr>

                    <td>
                        <span class="row-number">
                            ${index + 1}
                        </span>
                    </td>

                    <td>

                        <div class="table-user">

                            <div class="table-avatar">
                                ${(feedback.name || "U")
                                    .split(" ")
                                    .map(n => n[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()}
                            </div>

                            <strong>
                                ${feedback.name || "Unknown"}
                            </strong>

                        </div>

                    </td>

                    <td>
                        ${feedback.email || "-"}
                    </td>

                    <td>
                        <strong class="table-subject">
                            ${feedback.subject || "-"}
                        </strong>
                    </td>

                    <td>
                        ${feedback.date || "-"}
                    </td>

                    <td>

                        <span
                            class="status-badge ${feedback.status}"
                        >
                            ${feedback.status}
                        </span>

                    </td>

                    <td>

                        <button
                            class="action-btn view"
                            onclick="viewFeedback(${feedback.id})"
                        >
                            <i class="bi bi-eye"></i>
                            View
                        </button>

                    </td>

                </tr>
            `;

        }).join("");


    updateStats();
}


/* =========================================================
   HR - STATS
========================================================= */

function updateStats() {

    const feedbacks =
        getFeedbacks();


    const total =
        document.getElementById(
            "totalCount"
        );

    const newCount =
        document.getElementById(
            "newCount"
        );

    const reviewed =
        document.getElementById(
            "reviewedCount"
        );


    if (total) {

        total.textContent =
            feedbacks.length;
    }


    if (newCount) {

        newCount.textContent =
            feedbacks.filter(
                f => f.status === "new"
            ).length;
    }


    if (reviewed) {

        reviewed.textContent =
            feedbacks.filter(
                f => f.status === "reviewed"
            ).length;
    }
}


/* =========================================================
   HR - FILTERS
========================================================= */

function setupHRFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const filterStatus =
        document.getElementById(
            "filterStatus"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            loadFeedbacks
        );
    }


    if (filterStatus) {

        filterStatus.addEventListener(
            "change",
            loadFeedbacks
        );
    }
}


/* =========================================================
   HR - VIEW FEEDBACK
========================================================= */

function viewFeedback(id) {

    const feedbacks =
        getFeedbacks();


    const feedback =
        feedbacks.find(
            item => item.id === id
        );


    if (!feedback) return;


    let modal =
        document.getElementById(
            "feedbackModal"
        );


    let modalContent =
        document.getElementById(
            "feedbackModalContent"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.className =
            "feedback-modal";

        modal.id =
            "feedbackModal";


        modal.innerHTML = `

            <div
                class="feedback-modal-content"
                id="feedbackModalContent"
            ></div>
        `;


        document.body.appendChild(modal);


        modalContent =
            document.getElementById(
                "feedbackModalContent"
            );


        modal.addEventListener(
            "click",
            function (e) {

                if (e.target === modal) {

                    closeModal();
                }
            }
        );
    }


    modalContent.innerHTML = `

        <button
            class="close-btn"
            onclick="closeModal()"
        >
            <i class="bi bi-x"></i>
        </button>


        <div class="modal-top-icon">
            <i class="bi bi-chat-left-text"></i>
        </div>


        <span class="modal-label">
            FEEDBACK MESSAGE
        </span>


        <h3>
            ${feedback.subject}
        </h3>


        <div class="modal-meta-grid">

            <div class="modal-meta">

                <span>From</span>

                <strong>
                    ${feedback.name}
                </strong>

                <small>
                    ${feedback.email}
                </small>

            </div>


            <div class="modal-meta">

                <span>Date</span>

                <strong>
                    ${feedback.date}
                </strong>

            </div>

        </div>


        <div class="modal-status-row">

            <span>Status</span>

            <span
                class="status-badge ${feedback.status}"
            >
                ${feedback.status}
            </span>

        </div>


        <div class="modal-message">

            <span>Message</span>

            <p>
                ${feedback.message}
            </p>

        </div>

    `;


    modal.classList.add("open");
}


function closeModal() {

    const modal =
        document.getElementById(
            "feedbackModal"
        );


    if (modal) {

        modal.classList.remove("open");
    }
}


/* =========================================================
   OPEN MAP
========================================================= */

function openCompanyMap() {

    const address =
        encodeURIComponent(
            "Company address, City, Country"
        );

    window.open(
        `https://maps.app.goo.gl/jKwK9ur93GPYqiYZ7`,
        "_blank"
    );
}


/* =========================================================
   ESCAPE KEY FOR MODAL
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();
        }
    }
);