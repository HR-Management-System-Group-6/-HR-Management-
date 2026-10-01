function displayFeedback() {

    let content = document.getElementById("content")
    /* نحدد الـ Role */
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const role = user?.role?.toLowerCase();
    
 if (role== "employee"){
    content.innerHTML = `
    
        <main class="main-area">

        <header class="topbar">

            <div class="breadcrumb">
                <span>Workspace</span>
                <span class="separator">/</span>
                
            </div>

            <div class="user-info" id="userInfo">
            </div>

        </header>

        <section class="content-area">

        <div id="employeeView" >
                <div class="page-header">
                    <span class="page-label">MY WORKSPACE / CONTACT US</span>
                    <h1>Feedback</h1>
                    <p>Reach HR by message or use the contact details below.</p>
                </div>

                <div class="feedback-grid">

                    <div class="feedback-left">

                        <h2 class="section-title">Contact information</h2>

                        <div class="contact-card">

                            <div class="contact-row">
                                <div class="contact-icon">
                                    <i class="bi bi-envelope"></i>
                                </div>
                                <div class="contact-text">
                                    <span>Email</span>
                                    <strong>hr@company.com</strong>
                                </div>
                                <i class="bi bi-chevron-right arrow"></i>
                            </div>

                            <div class="contact-row">
                                <div class="contact-icon">
                                    <i class="bi bi-telephone"></i>
                                </div>
                                <div class="contact-text">
                                    <span>Phone</span>
                                    <strong>+00 000 000 0000</strong>
                                </div>
                                <i class="bi bi-chevron-right arrow"></i>
                            </div>

                            <div class="contact-row">
                                <div class="contact-icon">
                                    <i class="bi bi-geo-alt"></i>
                                </div>
                                <div class="contact-text">
                                    <span>Address</span>
                                    <strong>Company address, City, Country</strong>
                                </div>
                                <i class="bi bi-chevron-right arrow"></i>
                            </div>

                            <div class="contact-row">
                                <div class="contact-icon">
                                    <i class="bi bi-clock"></i>
                                </div>
                                <div class="contact-text">
                                    <span>Working hours</span>
                                    <strong>Sunday – Thursday, 9:00 AM – 5:00 PM</strong>
                                </div>
                                <i class="bi bi-chevron-right arrow"></i>
                            </div>

                        </div>

                        <h2 class="section-title mt-30">Our location</h2>

                        <div class="map-wrapper">
                            <div class="map-placeholder">
                                <div class="map-pin">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </div>
                                <span class="map-label">Head office</span>

                                <div class="map-controls">
                                    <button>+</button>
                                    <button>−</button>
                                </div>
                            </div>

                            <div class="map-footer">
                                <span>
                                    <i class="bi bi-geo-alt"></i>
                                    Company address, City, Country
                                </span>
                                <button class="map-open-btn">Open in Maps</button>
                            </div>
                        </div>

                    </div>

                    <div class="feedback-right">

                        <h2 class="section-title">Send us a message</h2>

                        <form id="feedbackForm" class="feedback-form" novalidate>

                            <div class="form-row">

                                <div class="form-group">
                                    <label>Full name</label>
                                    <div class="input-locked">
                                        <input type="text" id="name" readonly>
                                        <i class="bi bi-lock-fill"></i>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Email address</label>
                                    <div class="input-locked">
                                        <input type="email" id="email" readonly>
                                        <i class="bi bi-lock-fill"></i>
                                    </div>
                                </div>

                            </div>

                            <p class="form-hint">
                                Your name and email come from your profile.
                            </p>

                            <div class="form-group mt-20">
                                <label for="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    class="form-control"
                                    placeholder="Short summary of your message"
                                >
                                <div class="error-message" id="subjectError"></div>
                            </div>

                            <div class="form-group">
                                <label for="message">Message *</label>
                                <textarea
                                    id="message"
                                    class="form-control"
                                    rows="6"
                                    placeholder="Write your message here..."
                                    maxlength="500"
                                ></textarea>
                                <div class="char-counter">
                                    <span id="charCount">0</span> / 500
                                </div>
                                <div class="error-message" id="messageError"></div>
                            </div>

                            <button type="submit" class="submit-btn">
                                <i class="bi bi-send"></i>
                                Send Message
                            </button>

                            <p class="form-footer">
                                Your message will be sent to HR.
                            </p>

                        </form>

                    </div>

                </div>

            </div> `
 }  


            else if(role =="hr")
            {
                content.innerHTML=`

            <div id="hrView">

                <div class="page-header">
                    <span class="page-label">MY WORKSPACE / FEEDBACK</span>
                    <h1>All Feedbacks</h1>
                    <p>View, search and manage all submitted feedbacks.</p>
                </div>

                <!-- Stats -->
                <div class="feedback-stats">
                    <div class="stat-card">
                        <span>Total</span>
                        <strong id="totalCount">0</strong>
                    </div>
                    <div class="stat-card">
                        <span>New</span>
                        <strong id="newCount">0</strong>
                    </div>
                    <div class="stat-card">
                        <span>Reviewed</span>
                        <strong id="reviewedCount">0</strong>
                    </div>
                </div>

                <!-- Filters -->
                <div class="feedback-filters">
                    <input
                        type="text"
                        id="searchInput"
                        class="form-control"
                        placeholder="Search by name, email or subject..."
                    >
                    <select id="filterStatus" class="form-control">
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                    </select>
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
                        <tbody id="feedbackTableBody">
                            <!-- JS fills -->
                        </tbody>
                    </table>
                </div>

            </div>

        </section>
            
    </main>
    `;
            }

  initFeedbackPage();

}

/* INIT PAGE (بعد الرندر)*/
/*
function initFeedbackPage() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const isHR = user && user.role === "HR";  */

    /* 1) تعبئة بيانات المستخدم */
   /* setupUserInfo();

   
    if (isHR) {
        setupHRFilters();
        loadFeedbacks();
        updateStats();
    } else {
        setupFormValidation();
        setupCharCounter();
    }
}

function setupUserInfo() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    /* Topbar 
    const userInfo = document.getElementById("userInfo");
    if (userInfo) {

        const initials = (user.name || "U")
            .split(" ")
            .map(n => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

        userInfo.innerHTML = `
            <div class="avatar">${initials}</div>
            <div class="user-text">
                <strong>${user.name}</strong>
                <span>${user.role}</span>
            </div>
        `;
    }

    /* Form (فقط للموظف) 
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (nameInput) nameInput.value = user.name || "";
    if (emailInput) emailInput.value = user.email || "";
}

function setupFormValidation() {

    const form = document.getElementById("feedbackForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        clearErrors();

        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        let valid = true;

        if (subject.length < 3) {
            showError("subject", "subjectError", "Subject is required (min 3 characters).");
            valid = false;
        }

        if (message.length < 10) {
            showError("message", "messageError", "Message is required (min 10 characters).");
            valid = false;
        }

        if (!valid) return;

        /* نجيب المستخدم الحالي 
        const user = JSON.parse(localStorage.getItem("currentUser"));

        /* نبني الـ Feedback 
        const feedback = {
            id: Date.now(),
            name: user?.name || "Guest",
            email: user?.email || "guest@company.com",
            subject: subject,
            message: message,
            status: "new",
            date: new Date().toISOString().split("T")[0]
        };

        /* نحفظ 
        saveFeedback(feedback);

        /* نصفّر الفورم 
        form.reset();
        setupUserInfo(); /* نرجع نعبي الـ readonly */

        /* رسالة نجاح 
        showSuccess("✓ Message sent successfully!");
    });
}



function setupCharCounter() {

    const message = document.getElementById("message");
    const counter = document.getElementById("charCount");

    if (!message || !counter) return;

    message.addEventListener("input", () => {
        counter.textContent = message.value.length;
    });
}



function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
    });
    document.querySelectorAll(".form-control").forEach(el => {
        el.classList.remove("error");
    });
}

function showError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add("error");
    if (error) error.textContent = msg;
}

function showSuccess(msg) {
    const form = document.getElementById("feedbackForm");
    if (!form) return;

    let success = form.querySelector(".success-message");
    if (!success) {
        success = document.createElement("div");
        success.className = "success-message";
        form.appendChild(success);
    }

    success.textContent = msg;

    setTimeout(() => {
        success.textContent = "";
    }, 4000);
}


function getFeedbacks() {
    return JSON.parse(localStorage.getItem("feedbacks")) || [];
}

function saveFeedback(feedback) {
    const feedbacks = getFeedbacks();
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
}



function loadFeedbacks() {

    const tbody = document.getElementById("feedbackTableBody");
    if (!tbody) return;

    const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
    const status = document.getElementById("filterStatus")?.value || "";

    let feedbacks = getFeedbacks();

    /* Search 
    if (search) {
        feedbacks = feedbacks.filter(f =>
            (f.name || "").toLowerCase().includes(search) ||
            (f.email || "").toLowerCase().includes(search) ||
            (f.subject || "").toLowerCase().includes(search)
        );
    }

    /* Filter Status 
    if (status) {
        feedbacks = feedbacks.filter(f => f.status === status);
    }

    /* ترتيب من الأحدث للأقدم 
    feedbacks.sort((a, b) => b.id - a.id);

    /* إذا فاضي 
    if (feedbacks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">No feedbacks found.</div>
                </td>
            </tr>
        `;
        return;
    }

    /* نبني الجدول 
    tbody.innerHTML = feedbacks.map((f, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${f.name}</td>
            <td>${f.email}</td>
            <td>${f.subject}</td>
            <td>${f.date}</td>
            <td>
                <span class="status-badge ${f.status}">
                    ${f.status}
                </span>
            </td>
            <td>
                <button class="action-btn view" onclick="viewFeedback(${f.id})">View</button>
                <button class="action-btn toggle" onclick="toggleStatus(${f.id})">
                    ${f.status === "new" ? "Review" : "Unreview"}
                </button>
                <button class="action-btn delete" onclick="deleteFeedback(${f.id})">Delete</button>
            </td>
        </tr>
    `).join("");

    updateStats();
}


function updateStats() {

    const feedbacks = getFeedbacks();

    const totalEl = document.getElementById("totalCount");
    const newEl = document.getElementById("newCount");
    const reviewedEl = document.getElementById("reviewedCount");

    if (totalEl) totalEl.textContent = feedbacks.length;
    if (newEl) newEl.textContent = feedbacks.filter(f => f.status === "new").length;
    if (reviewedEl) reviewedEl.textContent = feedbacks.filter(f => f.status === "reviewed").length;
}


function setupHRFilters() {

    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");

    if (searchInput) searchInput.addEventListener("input", loadFeedbacks);
    if (filterStatus) filterStatus.addEventListener("change", loadFeedbacks);
}


/* تغيير الحالة 
function toggleStatus(id) {

    const feedbacks = getFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);
    if (index === -1) return;

    feedbacks[index].status =
        feedbacks[index].status === "new" ? "reviewed" : "new";

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    loadFeedbacks();
}

/* حذف 
function deleteFeedback(id) {

    if (!confirm("Are you sure you want to delete this feedback?")) return;

    let feedbacks = getFeedbacks();
    feedbacks = feedbacks.filter(f => f.id !== id);

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    loadFeedbacks();
}

/* عرض التفاصيل (Modal) 
function viewFeedback(id) {

    const feedbacks = getFeedbacks();
    const f = feedbacks.find(item => item.id === id);
    if (!f) return;

    /* ننشئ الـ Modal لو مش موجود 
    let modal = document.getElementById("feedbackModal");
    let content = document.getElementById("feedbackModalContent");

    if (!modal) {
        modal = document.createElement("div");
        modal.className = "feedback-modal";
        modal.id = "feedbackModal";
        modal.innerHTML = `<div class="feedback-modal-content" id="feedbackModalContent"></div>`;
        document.body.appendChild(modal);

        content = document.getElementById("feedbackModalContent");

        /* إغلاق عند الضغط على الخلفية 
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    content.innerHTML = `
        <button class="close-btn" onclick="closeModal()">×</button>
        <h3>${f.subject}</h3>

        <div class="modal-row">
            <span>From</span>
            <p>${f.name} (${f.email})</p>
        </div>

        <div class="modal-row">
            <span>Date</span>
            <p>${f.date}</p>
        </div>

        <div class="modal-row">
            <span>Status</span>
            <p><span class="status-badge ${f.status}">${f.status}</span></p>
        </div>

        <div class="modal-row">
            <span>Message</span>
            <p>${f.message}</p>
        </div>
    `;

    modal.classList.add("open");
}

function closeModal() {
    const modal = document.getElementById("feedbackModal");
    if (modal) modal.classList.remove("open");
}

*/



/* INIT PAGE —  */
function initFeedbackPage() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const role = user?.role?.toLowerCase();

    /* 1) نعبي بيانات المستخدم */
    setupUserInfo();

    /* 2) حسب الـ Role */
    if (role === "hr") {
        setupHRFilters();
        loadFeedbacks();
        updateStats();
    } else if (role === "employee") {
        setupFormValidation();
        setupCharCounter();
    }
}


/* =========================================
   USER INFO — Topbar + Form
========================================= */
function setupUserInfo() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    /* Topbar */
    const userInfo = document.getElementById("userInfo");
    if (userInfo) {

        const initials = (user.name || "U")
            .split(" ")
            .map(n => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

        userInfo.innerHTML = `
            <div class="avatar">${initials}</div>
            <div class="user-text">
                <strong>${user.name}</strong>
                <span>${user.role}</span>
            </div>
        `;
    }

    /* Form (فقط للموظف) */
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (nameInput) nameInput.value = user.name || "";
    if (emailInput) emailInput.value = user.email || "";
}


/* =========================================
   FORM VALIDATION + SUBMIT
========================================= */
function setupFormValidation() {

    const form = document.getElementById("feedbackForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        clearErrors();

        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        let valid = true;

        if (subject.length < 3) {
            showError("subject", "subjectError", "Subject is required (min 3 characters).");
            valid = false;
        }

        if (message.length < 10) {
            showError("message", "messageError", "Message is required (min 10 characters).");
            valid = false;
        }

        if (!valid) return;

        /* نجيب المستخدم الحالي */
        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        /* نبني الـ Feedback */
        const feedback = {
            id: Date.now(),
            name: user?.name || "Guest",
            email: user?.email || "guest@company.com",
            subject: subject,
            message: message,
            status: "new",
            date: new Date().toISOString().split("T")[0]
        };

        /* نحفظ في Local Storage */
        saveFeedback(feedback);

        /* نصفّر الفورم */
        form.reset();
        setupUserInfo();

        /* رسالة نجاح */
        showSuccess("✓ Message sent successfully!");
    });
}


/* =========================================
   CHAR COUNTER
========================================= */
function setupCharCounter() {

    const message = document.getElementById("message");
    const counter = document.getElementById("charCount");

    if (!message || !counter) return;

    message.addEventListener("input", () => {
        counter.textContent = message.value.length;
    });
}


/* =========================================
   HELPERS
========================================= */
function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
    });
    document.querySelectorAll(".form-control").forEach(el => {
        el.classList.remove("error");
    });
}

function showError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add("error");
    if (error) error.textContent = msg;
}

function showSuccess(msg) {
    const form = document.getElementById("feedbackForm");
    if (!form) return;

    let success = form.querySelector(".success-message");
    if (!success) {
        success = document.createElement("div");
        success.className = "success-message";
        form.appendChild(success);
    }

    success.textContent = msg;

    setTimeout(() => {
        success.textContent = "";
    }, 4000);
}


/* =========================================
   LOCAL STORAGE
========================================= */
function getFeedbacks() {
    return JSON.parse(localStorage.getItem("feedbacks")) || [];
}

function saveFeedback(feedback) {
    const feedbacks = getFeedbacks();
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
}


/* =========================================
   HR — LOAD FEEDBACKS
========================================= */
function loadFeedbacks() {

    const tbody = document.getElementById("feedbackTableBody");
    if (!tbody) return;

    const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
    const status = document.getElementById("filterStatus")?.value || "";

    let feedbacks = getFeedbacks();

    /* Search */
    if (search) {
        feedbacks = feedbacks.filter(f =>
            (f.name || "").toLowerCase().includes(search) ||
            (f.email || "").toLowerCase().includes(search) ||
            (f.subject || "").toLowerCase().includes(search)
        );
    }

    /* Filter Status */
    if (status) {
        feedbacks = feedbacks.filter(f => f.status === status);
    }

    /* ترتيب من الأحدث للأقدم */
    feedbacks.sort((a, b) => b.id - a.id);

    /* إذا فاضي */
    if (feedbacks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">No feedbacks found.</div>
                </td>
            </tr>
        `;
        return;
    }

    /* نبني الجدول */
    tbody.innerHTML = feedbacks.map((f, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${f.name}</td>
            <td>${f.email}</td>
            <td>${f.subject}</td>
            <td>${f.date}</td>
            <td>
                <span class="status-badge ${f.status}">
                    ${f.status}
                </span>
            </td>
                        <td>
                <button class="action-btn view" onclick="viewFeedback(${f.id})">View</button>
            </td>
        </tr>
    `).join("");

    updateStats();
}


/* =========================================
   HR — STATS
========================================= */
function updateStats() {

    const feedbacks = getFeedbacks();

    const totalEl = document.getElementById("totalCount");
    const newEl = document.getElementById("newCount");
    const reviewedEl = document.getElementById("reviewedCount");

    if (totalEl) totalEl.textContent = feedbacks.length;
    if (newEl) newEl.textContent = feedbacks.filter(f => f.status === "new").length;
    if (reviewedEl) reviewedEl.textContent = feedbacks.filter(f => f.status === "reviewed").length;
}


/* =========================================
   HR — FILTERS
========================================= */
function setupHRFilters() {

    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");

    if (searchInput) searchInput.addEventListener("input", loadFeedbacks);
    if (filterStatus) filterStatus.addEventListener("change", loadFeedbacks);
}


/* =========================================
   HR — ACTIONS
========================================= */

/* تغيير الحالة 
function toggleStatus(id) {

    const feedbacks = getFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);
    if (index === -1) return;

    feedbacks[index].status =
        feedbacks[index].status === "new" ? "reviewed" : "new";

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    loadFeedbacks();
}

/* حذف 
function deleteFeedback(id) {

    if (!confirm("Are you sure you want to delete this feedback?")) return;

    let feedbacks = getFeedbacks();
    feedbacks = feedbacks.filter(f => f.id !== id);

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    loadFeedbacks();
} */

/* عرض التفاصيل (Modal) */
function viewFeedback(id) {

    const feedbacks = getFeedbacks();
    const f = feedbacks.find(item => item.id === id);
    if (!f) return;

    /* ننشئ الـ Modal لو مش موجود */
    let modal = document.getElementById("feedbackModal");
    let content = document.getElementById("feedbackModalContent");

    if (!modal) {
        modal = document.createElement("div");
        modal.className = "feedback-modal";
        modal.id = "feedbackModal";
        modal.innerHTML = `<div class="feedback-modal-content" id="feedbackModalContent"></div>`;
        document.body.appendChild(modal);

        content = document.getElementById("feedbackModalContent");

        /* إغلاق عند الضغط على الخلفية */
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    content.innerHTML = `
        <button class="close-btn" onclick="closeModal()">×</button>
        <h3>${f.subject}</h3>

        <div class="modal-row">
            <span>From</span>
            <p>${f.name} (${f.email})</p>
        </div>

        <div class="modal-row">
            <span>Date</span>
            <p>${f.date}</p>
        </div>

        <div class="modal-row">
            <span>Status</span>
            <p><span class="status-badge ${f.status}">${f.status}</span></p>
        </div>

        <div class="modal-row">
            <span>Message</span>
            <p>${f.message}</p>
        </div>
    `;

    modal.classList.add("open");
}

function closeModal() {
    const modal = document.getElementById("feedbackModal");
    if (modal) modal.classList.remove("open");
}

